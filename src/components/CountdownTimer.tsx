import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
  label: string;
}

const CountdownTimer = ({ targetDate, label }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "dni" },
    { value: timeLeft.hours, label: "godz" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sek" },
  ];

  return (
    <div className="text-center">
      <p className="text-sm font-body uppercase tracking-widest text-muted-foreground mb-3">
        {label}
      </p>
      <div className="flex gap-3 justify-center">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center bg-ocean-deep/90 rounded-lg px-3 py-2 min-w-[60px] shadow-ocean"
          >
            <span className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-primary-foreground/70 uppercase tracking-wider">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
