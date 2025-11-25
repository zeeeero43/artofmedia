
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface FooterProps {
  showMainCta?: boolean;
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ showMainCta = true, onContactClick }) => {
  return (
    <footer className={cn("relative z-20 bg-neutral-950 text-white pb-12 px-6 overflow-hidden", showMainCta ? "pt-32" : "pt-12")}>
      <div className="container mx-auto max-w-7xl relative">
        
        {showMainCta && (
          <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-6 sm:mb-8 uppercase">
              GENUG<br/>THEORIE.<br/>
              <span className="text-brand">LASS UNS<br/>STARTEN.</span>
            </h2>
            
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Du bekommst kein Verkaufsgespräch. Du bekommst eine Beratung, in der wir deine aktuelle Situation analysieren und Möglichkeiten zeigen.
            </p>

            <button 
              onClick={onContactClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl md:text-2xl uppercase tracking-wide hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer shadow-[0_0_30px_rgba(0,255,41,0.2)] hover:shadow-[0_0_60px_rgba(0,255,41,0.5)] transform hover:-translate-y-1"
            >
              <span>KOSTENLOSES GESPRÄCH BUCHEN</span>
            </button>

            <div className="mt-8 text-neutral-300 text-xs md:text-sm font-mono uppercase tracking-[0.2em]">
                DAUER: 30 MIN • 100% MEHRWERT • 0% DRUCK
            </div>
          </div>
        )}

        <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-12", showMainCta ? "border-t border-neutral-800 pt-12" : "")}>
          <div className="col-span-1 md:col-span-2">
             <span className="font-display font-bold text-2xl block mb-6">art.of.media</span>
             <p className="text-neutral-300 max-w-sm">
               Agentur für digitale Dominanz und physische Markenarchitektur.
             </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6">Kontakt</h3>
            <ul className="space-y-4 text-neutral-300">
              <li>
                <a href="mailto:info@artofmedia-marketing.de" className="hover:text-brand transition-colors">
                  info@artofmedia-marketing.de
                </a>
              </li>
              <li>
                <a href="tel:+491758000447" className="hover:text-brand transition-colors">
                  +49 (0) 175 8000 447
                </a>
              </li>
              <li>Duisburg</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6">Rechtliches</h3>
            <ul className="space-y-4 text-neutral-300">
              <li><Link to="/impressum" className="hover:text-brand transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-brand transition-colors">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center md:text-left text-neutral-400 text-xs font-mono uppercase tracking-widest">
          &copy; 2025 art.of.media marketing. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};
