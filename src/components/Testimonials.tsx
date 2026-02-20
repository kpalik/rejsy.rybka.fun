import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anna K.",
    text: "Najlepsza przygoda w moim życiu! Kapitan Michał jest niesamowity, a widoki z pokładu zapierają dech.",
    rating: 5,
    cruise: "Chorwacja 2025",
  },
  {
    name: "Tomek W.",
    text: "Myślałem, że żeglowanie nie jest dla mnie. Po tygodniu na jachcie planuję już kolejny rejs!",
    rating: 5,
    cruise: "Grecja 2024",
  },
  {
    name: "Kasia M.",
    text: "Świetna organizacja, pyszne jedzenie i niezapomniane zachody słońca. Polecam każdemu!",
    rating: 5,
    cruise: "Wyspy Kanaryjskie 2025",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-ocean-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-body uppercase tracking-[0.2em] text-primary-foreground/70 mb-2">
            Opinie
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
            Co mówią uczestnicy
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-primary-foreground/90 font-body italic leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-bold text-primary-foreground">{t.name}</p>
                <p className="text-sm text-primary-foreground/60 font-body">{t.cruise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
