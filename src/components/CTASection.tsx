import { motion } from "framer-motion";
import { Anchor } from "lucide-react";
import { RegistrationModal } from "./RegistrationModal";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Anchor size={48} className="mx-auto text-primary mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Nie czekaj, zapisz się!
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            Liczba kabin jest ograniczona. Zarezerwuj swoje miejsce już dziś i przeżyj
            niezapomnianą przygodę na morzu.
          </p>
          <RegistrationModal>
            <button
              className="inline-flex items-center justify-center px-10 py-5 bg-secondary text-secondary-foreground font-body font-bold text-lg rounded-full shadow-ocean hover:shadow-card-hover hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Rezerwuję miejsce ⛵
            </button>
          </RegistrationModal>
        </motion.div>
      </div>
    </section>
  );
};


export default CTASection;
