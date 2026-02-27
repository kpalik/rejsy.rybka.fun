import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import { MapPin, Calendar, Users, Ship, Euro } from "lucide-react";

interface CruiseCardProps {
  title: string;
  subtitle: string;
  image: string;
  date: string;
  targetDate: Date;
  location: string;
  price: string;
  spots: number;
  totalSpots: number;
  yacht: string;
  description: string;
  index: number;
}

const CruiseCard = ({
  title,
  subtitle,
  image,
  date,
  targetDate,
  location,
  price,
  spots,
  totalSpots,
  yacht,
  description,
  index,
}: CruiseCardProps) => {
  const spotsLeft = totalSpots - spots;
  const urgency = spotsLeft <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-ocean hover:shadow-card-hover transition-all duration-500 border border-border"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-body font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {subtitle}
          </span>
        </div>

        {/* Spots badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block text-xs font-body font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${spotsLeft === totalSpots && ["Karaiby", "Tajlandia", "Włochy"].some(k => title.includes(k))
              ? "bg-muted text-muted-foreground"
              : spotsLeft === 0
                ? "bg-muted text-muted-foreground"
                : urgency
                  ? "bg-sunset text-primary-foreground animate-pulse"
                  : "bg-accent text-accent-foreground"
              }`}
          >
            {spotsLeft === totalSpots && ["Karaiby", "Tajlandia", "Włochy"].some(k => title.includes(k)) ? "W planowaniu" : spotsLeft === 0 ? "Brak miejsc" : urgency ? `Ostatnie ${spotsLeft} miejsca!` : `${spotsLeft} wolnych miejsc`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-display font-bold text-card-foreground mb-2">{title}</h3>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="flex items-center gap-2 text-muted-foreground font-body">
            <Calendar size={18} className="text-primary" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground font-body">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground font-body">
            <Ship size={18} className="text-primary" />
            <span className="text-sm">{yacht}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground font-body">
            <Users size={18} className="text-primary" />
            <span className="text-sm">{totalSpots} osób</span>
          </div>
        </div>

        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Price + Countdown */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Euro size={20} className="text-secondary" />
              <span className="text-3xl font-display font-bold text-card-foreground">{price}</span>
              <span className="text-sm text-muted-foreground font-body">/os.</span>
            </div>
            <span className="text-xs text-muted-foreground font-body">
              Czarter + kasa okrętowa
            </span>
          </div>

          <CountdownTimer targetDate={targetDate} label="Do rejsu pozostało" />

          {/* Progress bar for spots */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-muted-foreground font-body mb-1">
              <span>Zajęte miejsca</span>
              <span>{spots}/{totalSpots}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(spots / totalSpots) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`h-full rounded-full ${urgency ? "bg-sunset" : "bg-primary"}`}
              />
            </div>
          </div>

          {spotsLeft === totalSpots && ["Karaiby", "Tajlandia", "Włochy"].some(k => title.includes(k)) ? (
            <div className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 bg-muted text-muted-foreground font-body text-sm font-semibold rounded-xl text-center">
              Zapisy wkrótce
            </div>
          ) : spotsLeft === 0 ? (
            <Link
              to={`/galeria/${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 bg-muted text-muted-foreground font-body text-sm font-semibold rounded-xl text-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
            >
              Ten rejs to już historia, otwórz galerię
            </Link>
          ) : title.includes("Grecja") ? (
            <Link
              to={`/zapisy/${title.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 bg-primary text-primary-foreground font-body font-semibold rounded-xl shadow-ocean hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300"
            >
              Zapisz się na rejs ⛵
            </Link>
          ) : (
            <a
              href="https://rybka.fun/zgloszenie/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 bg-primary text-primary-foreground font-body font-semibold rounded-xl shadow-ocean hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300"
            >
              Zapisz się na rejs ⛵
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CruiseCard;
