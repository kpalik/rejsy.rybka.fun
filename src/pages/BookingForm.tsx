import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ship, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { cruises } from "../lib/cruises";
import heroImage from "@/assets/hero-sailing.jpg";

const BookingForm = () => {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cruise = id ? cruises.find(c => c.title.toLowerCase().replace(/\s+/g, '-') === id) : null;

    // Zdekodujmy lub stwórzmy ładną nazwę na podstawie ID
    const displayTitle = cruise ? cruise.title : id
        ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : "Rejs";
    const cruiseDate = cruise ? cruise.date : "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Zgłoszenie wysłane!", {
                description: "Dziękujemy za zapis. Odezwiemy się wkrótce z dalszymi instrukcjami."
            });
            // Optionally navigate back or reset form
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <div className="relative min-h-screen font-body text-foreground overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src={cruise?.image || heroImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ocean-gradient opacity-70" />
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
            </div>

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 h-20 flex flex-col md:flex-row items-center justify-between">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 text-2xl font-display font-bold text-primary tracking-tight"
                    >
                        <Ship className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Rybka.fun</span>
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold mt-2 md:mt-0"
                    >
                        <ArrowLeft size={16} />
                        Powrót na stronę główną
                    </Link>
                </div>
            </nav>

            {/* Form Content */}
            <main className="relative z-10 pt-32 pb-20 px-4 md:px-6 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-lg bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-display font-bold text-card-foreground mb-2">Zapisz się na rejs</h1>
                        <p className="text-muted-foreground">
                            Formularz zgłoszeniowy na rejs: <br />
                            <span className="font-semibold text-primary block mt-1 text-lg">
                                {displayTitle} {cruiseDate && <span className="text-muted-foreground text-base font-normal ml-2">({cruiseDate})</span>}
                            </span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-card-foreground">Imię i nazwisko <span className="text-destructive">*</span></label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Jan Kowalski"
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-card-foreground">E-mail <span className="text-destructive">*</span></label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="jan.kowalski@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-semibold text-card-foreground">Numer telefonu <span className="text-destructive">*</span></label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="+48 123 456 789"
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-card-foreground">Poznajmy się (kilka słów o sobie)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Napisz kilka słów o Twoim doświadczeniu, czego oczekujesz itp..."
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-primary-foreground transition-all duration-300
                ${isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-ocean hover:shadow-card-hover hover:-translate-y-0.5'}
              `}
                        >
                            {isSubmitting ? (
                                "Przesyłanie..."
                            ) : (
                                <>
                                    <Send size={18} />
                                    Wyślij zgłoszenie
                                </>
                            )}
                        </button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Twoje dane są u nas w dobrych rękach. Skontaktujemy się z Tobą najszybciej jak to możliwe, aby potwierdzić rezerwację i omówić szczegóły.
                        </p>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default BookingForm;
