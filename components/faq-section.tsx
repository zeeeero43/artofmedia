
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Arbeitet ihr auch deutschlandweit?",
    a: "Ja. Digital arbeiten wir überall in Deutschland, Österreich und Schweiz. Für Werbetechnik kommen unsere Montageteams zu dir."
  },
  {
    q: "Welche Budgets sind erforderlich?",
    a: "Der genaue Preis hängt vom Umfang deines Projekts ab. Im kostenlosen Erstgespräch besprechen wir, was für dich sinnvoll ist und erstellen ein individuelles Angebot."
  },
  {
    q: "Wie schnell können wir starten?",
    a: "Nach dem Kick-Off bekommst du innerhalb von 5 Werktagen die ersten Konzepte. Ein kompletter Relaunch dauert 6-8 Wochen."
  },
  {
    q: "Gibt es Wartungsverträge?",
    a: "Ja. Performance braucht Pflege. Wir bieten Verträge für Updates, Sicherheit und Content-Pflege an."
  },
  {
    q: "Ich habe schon ein Logo - geht das?",
    a: "Kein Problem. Wir arbeiten mit deinem bestehenden Design und machen es fit für digitale Performance."
  },
  {
    q: "Bietet ihr auch Hosting an?",
    a: "Ja. Schnelles Hosting mit CDN und Schutz vor Ausfällen inklusive."
  }
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section className="py-32 px-6 w-full border-t border-neutral-950 bg-white">
      <div className="container mx-auto max-w-[1600px]">
        
        <div className="mb-20">
           <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">
             Support
           </span>
           <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl uppercase text-neutral-700 tracking-tighter leading-[0.9]">
             Häufige Fragen
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0">
          {faqs.map((item, idx) => (
            <div key={idx} className="border-t border-black self-start">
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full py-8 flex justify-between items-start text-left group"
              >
                <span className="font-display font-bold text-xl md:text-2xl text-neutral-700 group-hover:text-brand transition-colors pr-8">
                  {item.q}
                </span>
                <span className="mt-1 text-neutral-700 group-hover:text-brand transition-colors">
                    {activeIndex === idx ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-12 text-lg text-neutral-500 leading-relaxed max-w-xl">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="border-t border-black mt-0" />
      </div>
    </section>
  );
};
