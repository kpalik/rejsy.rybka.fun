import { motion } from "framer-motion";
import heroImage from "@/assets/hero-sailing.jpg";
import { Anchor, Wind, Waves } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Jacht żaglowy na turkusowym morzu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-gradient opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] text-primary-foreground/20"
      >
        <Anchor size={48} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[15%] text-primary-foreground/15"
      >
        <Wind size={40} />
      </motion.div>
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-[20%] text-primary-foreground/10"
      >
        <Waves size={56} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary-foreground/80 font-body uppercase tracking-[0.3em] text-sm mb-4">
            ⛵ Rybka.fun — Rejsy Żeglarskie 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-800 text-primary-foreground leading-tight mb-6">
            Złap Wiatr
            <br />
            <span className="italic">w Żagle</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-body font-light max-w-2xl mx-auto mb-10">
            Wyspy Kanaryjskie, Grecja, Chorwacja — trzy niezapomniane przygody czekają na Ciebie.
            Zarezerwuj miejsce zanim zabraknie kabin!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#rejsy"
            className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-body font-semibold text-lg rounded-full shadow-ocean hover:shadow-card-hover transition-all duration-300 hover:scale-105"
          >
            Odkryj Rejsy
          </a>
          <a
            href="#faq"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-body font-medium text-lg rounded-full hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Masz pytania?
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
