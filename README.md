# Welcome to your Lovable project.

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Testowanie lokalne z funkcjami Netlify i Airtable

Część funkcjonalności (np. formularz zgłoszeniowy) wymaga funkcji backendowych Netlify. Dane są wysyłane do Airtable z poziomu funkcji backendowej (PAT nie jest widoczny na froncie).

1. Upewnij się, że masz zainstalowane zależności: `npm install`.
2. Utwórz lokalny plik `.env` i ustaw zmienne (plik `.env` jest ignorowany przez git):
   ```sh
   AIRTABLE_PAT_LOCAL=patXXXXXXXXXXXXXX
   AIRTABLE_BASE_ID_LOCAL=appXXXXXXXXXXXXXX
   AIRTABLE_TABLE_ID_LOCAL=TwojaNazwaTabeliLubtblXXXXXXXXXXXXXX
   ```
3. Uruchom projekt przez Netlify CLI (zamiast `npm run dev`):
   ```sh
   npm run dev:netlify
   ```
   Komenda uruchomi Vite oraz funkcje pod `localhost:8888`.

### Troubleshooting: Port już zajęty

Jeśli widzisz błąd `Could not acquire required 'port': '8888'`, oznacza to, że port jest już zajęty przez inny proces.

**Szybkie rozwiązanie - zabij procesy na portach:**

```powershell
# Znajdź i zabij proces na porcie 8888 (Netlify Dev)
$process = Get-NetTCPConnection -LocalPort 8888 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }

# Znajdź i zabij proces na porcie 8080 (Vite)
$process = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }
```

**Lub użyj skryptu npm:**

```sh
npm run clean:ports
```

### Zmienne środowiskowe na Netlify (produkcja)

W panelu Netlify (`Site configuration -> Environment variables`) ustaw:

```sh
AIRTABLE_PAT_PROD=patXXXXXXXXXXXXXX
AIRTABLE_BASE_ID_PROD=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_ID_PROD=TwojaNazwaTabeliLubtblXXXXXXXXXXXXXX
```

Funkcja `submit-registration` automatycznie wykrywa środowisko:
- lokalnie (`netlify dev`) używa zmiennych `*_LOCAL`,
- na produkcji używa zmiennych `*_PROD`.

Opcjonalnie można też użyć wspólnych fallbacków (`AIRTABLE_PAT`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID`).


**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
