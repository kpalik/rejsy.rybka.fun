import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "Czy transport jest zorganizowany?",
    a: "Transport organizujemy we własnym zakresie — to najlepsza i najbardziej elastyczna opcja. Chętnie pomożemy z poradami dotyczącymi lotów i dojazdów do mariny.",
  },
  {
    q: "Co ze sobą zabrać?",
    a: "Lekkie, wygodne ubrania, krem z filtrem, okulary przeciwsłoneczne, miękką torbę (nie walizka!), buty na zmianę na pokład i dobry humor. Szczegółową listę wysyłamy przed rejsem.",
  },
  {
    q: "Czy są ograniczenia wiekowe?",
    a: "Nie ma formalnych ograniczeń. Rejsy są otwarte dla dorosłych w każdym wieku. Dzieci mogą uczestniczyć pod opieką rodzica — skontaktuj się z nami, aby omówić szczegóły.",
  },
  {
    q: "Czy umiejętności żeglarskie są wymagane?",
    a: "Absolutnie nie! Rejs prowadzą doświadczeni kapitanowie. Możesz się uczyć żeglarstwa w trakcie lub po prostu odpoczywać — wybór należy do Ciebie.",
  },
  {
    q: "Jak radzić sobie z chorobą morską?",
    a: "Większość osób nie odczuwa choroby morskiej na jachtach żaglowych. Na wszelki wypadek polecamy tabletki na chorobę lokomocyjną i opaski akupresurowe. Pływamy też blisko brzegu, więc fale są łagodne.",
  },
  {
    q: "Czy są spotkania przedrejsowe?",
    a: "Tak! Organizujemy spotkanie online lub osobiste przed każdym rejsem, aby poznać się nawzajem, omówić plan i odpowiedzieć na wszelkie pytania.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-sand-gradient">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-body uppercase tracking-[0.2em] text-primary mb-2">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Masz pytania? 🙂
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-body font-semibold text-card-foreground hover:text-primary transition-colors"
              >
                <span>{item.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-5 text-muted-foreground font-body leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
