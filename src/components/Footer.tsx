import { Anchor, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-gradient py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Anchor size={28} className="text-primary-foreground" />
            <span className="font-display font-bold text-xl text-primary-foreground">
              Rybka.fun
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/70 font-body text-sm">
            <Mail size={16} />
            <span>Skontaktuj się z nami na rybka.fun</span>
          </div>
          <p className="text-primary-foreground/50 font-body text-sm">
            © 2026 Rybka.fun — Rejsy Żeglarskie
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
