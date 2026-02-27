#!/bin/bash

GALLERY_DIR="gallery"

echo "Rozpoczynam obserwowanie katalogów w $GALLERY_DIR/*/src w poszukiwaniu nowych zdjęć..."
echo "Dodano również synchronizację: usunięte zdjęcia z public/gallery/*/ zostaną automatycznie usunięte z galerii w kodzie."
echo "Aby dodać nową galerię, stwórz np. 'gallery/grecja/src' i wrzuć tam zdjęcia."
echo "(Naciśnij Ctrl+C aby zatrzymać)"

while true; do
  # 1. Obsługa dodawania nowych zdjęć
  for src_dir in "$GALLERY_DIR"/*/src; do
    if [ ! -d "$src_dir" ]; then
      continue
    fi
    
    gallery_name=$(basename $(dirname "$src_dir"))
    safe_name=$(echo "$gallery_name" | tr -d '-_ ')
    var_name="${safe_name}Images"
    
    DEST_DIR="public/gallery/$gallery_name"
    THUMB_DIR="$DEST_DIR/thumb"
    TS_FILE="src/lib/${var_name}.ts"
    
    mkdir -p "$DEST_DIR" "$THUMB_DIR"
    
    if [ ! -f "$TS_FILE" ]; then
      echo "export const $var_name = [" > "$TS_FILE"
      echo "];" >> "$TS_FILE"
    fi
    
    if [ -n "$(ls -A "$src_dir" 2>/dev/null)" ]; then
      for file in "$src_dir"/*; do
        if [ -f "$file" ]; then
          filename=$(basename "$file")
          name="${filename%.*}"
          
          if [[ "$filename" == .* ]]; then
            continue
          fi
          
          echo "Przetwarzanie nowego zdjęcia w galerii '$gallery_name': $filename"
          
          sips -s format jpeg -Z 1920 "$file" --out "$DEST_DIR/$name.jpg" >/dev/null 2>&1
          sips -s format jpeg -Z 600 "$file" --out "$THUMB_DIR/$name.jpg" >/dev/null 2>&1
          
          if ! grep -q "\"$name.jpg\"" "$TS_FILE"; then
             # Bezpieczne usunięcie zamkniecia tablicy `];`
             sed -i '' '/^[[:space:]]*\];/d' "$TS_FILE"
             echo "  \"$name.jpg\"," >> "$TS_FILE"
             echo "];" >> "$TS_FILE"
          fi
          
          rm -f "$file"
          echo "✅ Dodano $name.jpg do galerii $gallery_name!"
        fi
      done
    fi
  done

  # 2. Synchronizacja usuwania
  for dest_dir in public/gallery/*; do
    if [ ! -d "$dest_dir" ]; then
      continue
    fi
    
    gallery_name=$(basename "$dest_dir")
    safe_name=$(echo "$gallery_name" | tr -d '-_ ')
    var_name="${safe_name}Images"
    TS_FILE="src/lib/${var_name}.ts"
    
    if [ -f "$TS_FILE" ]; then
      # Przeszukujemy plik TS i zbieramy brakujące obrazki
      missing_files=()
      while read -r line; do
        if [[ "$line" == *".jpg"* ]]; then
          img_file=$(echo "$line" | grep -o '"[^"]*"' | tr -d '"')
          if [ -n "$img_file" ] && [ ! -f "$dest_dir/$img_file" ]; then
            missing_files+=("$img_file")
          fi
        fi
      done < "$TS_FILE"
      
      # Dopiero po zebraniu braków usuwamy je z pliku (aby nie modyfikować pliku podczas czytania)
      for img_file in "${missing_files[@]}"; do
        echo "🗑️ Wykryto usunięcie: $img_file z galerii $gallery_name. Aktualizuję kod..."
        rm -f "$dest_dir/thumb/$img_file"
        sed -i '' "/\"$img_file\"/d" "$TS_FILE"
        echo "✅ Usunięto wpis o $img_file ze źródła."
      done
    fi
  done

  sleep 3
done
