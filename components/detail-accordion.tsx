import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const benefitData = [
  {
    id: "01",
    title: "Platz 1 bei Google.",
    subtitle: "SEO Dominanz",
    desc: "Wir bringen dich vor deine Konkurrenz, damit das Telefon klingelt.",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=2127&auto=format&fit=crop",
    modal: {
      headline: "Unsichtbar = Irrelevant.",
      text: "90% der Nutzer klicken auf die ersten 3 Ergebnisse. Wenn du dort nicht stehst, existierst du für sie nicht. Wir analysieren Keywords, optimieren Ladezeiten und bauen Backlinks, die deine Domain Authority massiv steigern.",
      points: ["Keyword Analyse", "Technische Optimierung", "Backlink Aufbau"],
      cta: "SEO Audit anfordern"
    }
  },
  {
    id: "02",
    title: "Werbung, die Geld bringt.",
    subtitle: "Performance Ads",
    desc: "Wir verbrennen kein Budget. Wir generieren direkten Umsatz.",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop",
    modal: {
      headline: "Schluss mit Budget-Verbrennung.",
      text: "Wir schalten Kampagnen, die auf ROAS (Return on Ad Spend) optimiert sind. Präzises Targeting statt Gießkannen-Prinzip. Jeder Euro muss zurückkommen - und zwar mit Freunden.",
      points: ["Zielgruppen-Targeting", "A/B Testing", "Conversion Tracking"],
      cta: "Kampagne starten"
    }
  },
  {
    id: "03",
    title: "Macht Eindruck.",
    subtitle: "Werbetechnik",
    desc: "Deine Marke im öffentlichen Raum. Sichtbarkeit, die nicht übersehen wird.",
    image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop",
    modal: {
      headline: "Deine Marke im Raum.",
      text: "Vom leuchtenden Pylon an der Straße bis zur kompletten Fassaden-Folierung. Wir sorgen dafür, dass man dich physisch nicht übersehen kann. Langlebig, wetterfest und extrem auffällig.",
      points: ["Lichtwerbung", "Flotten-Folierung", "Gebäude-Beschilderung"],
      cta: "Angebot einholen"
    }
  },
  {
    id: "04",
    title: "Qualität zum Anfassen.",
    subtitle: "Print & Veredelung",
    desc: "Print, der Qualität kommuniziert, bevor man den Text liest.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1974&auto=format&fit=crop",
    modal: {
      headline: "Haptik schlägt Digital.",
      text: "In einer digitalen Welt fällt analoge Exzellenz auf. Hochwertige Papiere, Prägungen und Veredelungen, die Wertigkeit kommunizieren, bevor man den Text liest. Das ist Premium.",
      points: ["Heißfolienprägung", "Spezialpapiere", "Großformatdruck"],
      cta: "Musterpaket anfragen"
    }
  }
];

interface AccordionItemProps {
  item: typeof benefitData[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onContactClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  index,
  isExpanded,
  onToggle,
  onContactClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      className="relative border-b border-neutral-200 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Collapsed State - Always Visible */}
      <motion.div
        layout="position"
        className="relative cursor-pointer"
        onClick={onToggle}
      >
        <div className="relative py-8 md:py-12 px-6 md:px-12 flex items-center justify-between gap-8">

          {/* Left: Number + Content */}
          <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0">
            {/* 3D Floating Number */}
            <motion.div
              className="relative shrink-0 w-24 md:w-32"
              style={{
                rotateX: isExpanded ? 0 : rotateX,
                rotateY: isExpanded ? 0 : rotateY,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <div
                className={cn(
                  "relative font-display font-bold text-4xl sm:text-6xl md:text-7xl transition-all duration-500 text-center tabular-nums",
                  isExpanded ? "text-brand" : "text-neutral-200",
                  isHovered && !isExpanded && "text-neutral-300"
                )}
              >
                {item.id}
                {/* Neon Glow Effect */}
                {isExpanded && (
                  <motion.div
                    className="absolute inset-0 text-brand blur-xl opacity-50 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.id}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                layout="position"
                className="space-y-2"
              >
                <span className={cn(
                  "text-brand font-mono text-xs uppercase tracking-widest block transition-opacity duration-300",
                  isExpanded && "opacity-50"
                )}>
                  {item.subtitle}
                </span>
                <h3 className={cn(
                  "font-display font-bold text-2xl md:text-3xl text-neutral-900 leading-tight transition-all duration-300",
                  isExpanded && "text-neutral-900"
                )}>
                  {item.title}
                </h3>
                {!isExpanded && (
                  <motion.p
                    className="text-neutral-600 text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.desc}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right: Expand Indicator */}
          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              isExpanded
                ? "border-brand bg-brand text-neutral-950"
                : "border-neutral-300 bg-white text-neutral-600",
              isHovered && !isExpanded && "border-neutral-950 bg-neutral-950 text-white"
            )}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded State - Content Reveal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-12 pb-8 md:pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left: Image with Diagonal Reveal */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative h-[280px] sm:h-[340px] md:h-[400px] rounded-sm overflow-hidden group"
                >
                  {/* Image */}
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Diagonal Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-brand/20 to-neutral-950/60"
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />

                </motion.div>

                {/* Right: Content */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  <div>
                    <h4 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-4 leading-tight">
                      {item.modal.headline}
                    </h4>
                    <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                      {item.modal.text}
                    </p>
                  </div>

                  {/* Feature Points */}
                  <div className="space-y-3">
                    {item.modal.points.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-brand shrink-0" />
                        <span className="font-medium text-neutral-800 text-sm md:text-base">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactClick();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-neutral-950 text-white py-4 px-6 rounded-sm font-bold uppercase tracking-wide hover:bg-brand hover:text-neutral-950 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {item.modal.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Highlight Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

interface DeepDiveGridProps {
  onContactClick: () => void;
}

export const DeepDiveGrid: React.FC<DeepDiveGridProps> = ({ onContactClick }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-32 px-4 w-full bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                             linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">
            Dein Vorteil
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl uppercase text-neutral-900 leading-[0.9]">
            Warum wir?
          </h2>
          <motion.p
            className="text-neutral-600 text-base md:text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Klicke auf einen Punkt, um mehr zu erfahren.
          </motion.p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-0">
          {benefitData.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
              onContactClick={onContactClick}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
