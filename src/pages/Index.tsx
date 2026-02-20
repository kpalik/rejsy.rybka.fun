import Hero from "@/components/Hero";
import CruiseCard from "@/components/CruiseCard";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

import canaryImg from "@/assets/canary-islands.jpg";
import greeceImg from "@/assets/greece-sailing.jpg";
import croatiaImg from "@/assets/croatia-sailing.jpg";

const cruises = [
  {
    title: "Wyspy Kanaryjskie",
    subtitle: "Rejs Zimowy",
    image: canaryImg,
    date: "07.02 – 14.02.2026",
    targetDate: new Date("2026-02-07"),
    location: "Teneryfa, Hiszpania",
    price: "500",
    spots: 7,
    totalSpots: 10,
    yacht: "Bavaria Cruiser 51",
    description:
      "Start z Marina San Miguel na Teneryfie Południowej. Trasa w kierunku Gran Canaria lub La Gomera — w zależności od pogody. Doskonały rejs na odkrycie nowych terenów i nowych szlaków.",
  },
  {
    title: "Grecja — Rejs 1",
    subtitle: "Rejs Wakacyjny",
    image: greeceImg,
    date: "15.08 – 22.08.2026",
    targetDate: new Date("2026-08-15"),
    location: "Marina Kalamaki, Ateny",
    price: "700",
    spots: 12,
    totalSpots: 20,
    yacht: "Oceanis 46 + Sun Odyssey 515",
    description:
      "Kotwicowiska, zatoczki, regaty, pływanie rano i wieczorem, jazda pontonem, SUP i na maxa fun! Dwa jachty pod okiem kapitanów Michała i Grześka.",
  },
  {
    title: "Chorwacja",
    subtitle: "Rejs Wakacyjny",
    image: croatiaImg,
    date: "22.08 – 29.08.2026",
    targetDate: new Date("2026-08-22"),
    location: "Marina Kalamaki → Adriatyk",
    price: "700",
    spots: 8,
    totalSpots: 20,
    yacht: "Oceanis 46 + Sun Odyssey 515",
    description:
      "Kontynuacja letniej przygody! Kotwicowiska, kryształowo czysta woda Adriatyku, malownicze wyspy i niezapomniane widoki z pokładu jachtu.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Cruises */}
      <section id="rejsy" className="py-20 md:py-28 bg-sand-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-body uppercase tracking-[0.2em] text-primary mb-2">
              Sezon 2026
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Wybierz swój rejs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cruises.map((cruise, i) => (
              <CruiseCard key={i} {...cruise} index={i} />
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
