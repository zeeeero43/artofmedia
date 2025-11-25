import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
  Flag,
  Lightbulb,
  Printer,
  Car,
  Shield,
  Palette,
  Square,
  Sun,
  Layers,
  Circle,
  Hexagon,
  Zap,
  Play,
  Monitor,
  Building,
} from 'lucide-react';

type ServiceCategory = 'print' | 'folie' | 'werbe';

interface Service {
  icon: React.ReactElement;
  name: string;
}

interface ServiceGridProps {
  onContactClick?: () => void;
}

const serviceData: Record<ServiceCategory, { title: string; subtitle: string; color: string; services: Service[] }> = {
  print: {
    title: 'Print',
    subtitle: 'Die feine Art zu drucken',
    color: '#00FF29',
    services: [
      { icon: <FileText size={24} />, name: 'Magazine' },
      { icon: <FileText size={24} />, name: 'Broschüren' },
      { icon: <FileText size={24} />, name: 'Einladungskarten' },
      { icon: <Circle size={24} />, name: 'Aufkleber' },
      { icon: <FileText size={24} />, name: 'Bonuskarten' },
      { icon: <Square size={24} />, name: 'Aufsteller' },
      { icon: <FileText size={24} />, name: 'Eintrittskarten' },
      { icon: <Printer size={24} />, name: 'Visitenkarten' },
    ],
  },
  folie: {
    title: 'Folie',
    subtitle: 'Hochwertige Folierung & Verklebung',
    color: '#3B82F6',
    services: [
      { icon: <Palette size={24} />, name: 'Plotter-& Farbfolie' },
      { icon: <Printer size={24} />, name: 'Digitaldruck' },
      { icon: <Layers size={24} />, name: 'Glasdekor' },
      { icon: <Car size={24} />, name: 'Car-Wrapping' },
      { icon: <Sun size={24} />, name: 'Sonnenschutz' },
      { icon: <Shield size={24} />, name: 'Steinschlag' },
      { icon: <Layers size={24} />, name: 'Transparent' },
      { icon: <Sparkles size={24} />, name: 'Spezialfolien' },
    ],
  },
  werbe: {
    title: 'Werbetechnik',
    subtitle: 'Klassiker der Werbetechnik',
    color: '#EF4444',
    services: [
      { icon: <Hexagon size={24} />, name: 'Werbeschilder' },
      { icon: <FileText size={24} />, name: 'Wandbuchstaben' },
      { icon: <Flag size={24} />, name: 'Planen' },
      { icon: <Square size={24} />, name: 'Roll-Ups' },
      { icon: <Flag size={24} />, name: 'Fahnen' },
      { icon: <Layers size={24} />, name: 'Bodenbeläge' },
      { icon: <Square size={24} />, name: 'Wandbilder' },
      { icon: <FileText size={24} />, name: 'Banner' },
    ],
  },
};

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('print');
  const currentData = serviceData[activeCategory];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        {(Object.keys(serviceData) as ServiceCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-4 font-display font-bold text-lg uppercase tracking-wide transition-all relative overflow-hidden ${
              activeCategory === category
                ? 'bg-neutral-950 text-white border-2 border-brand shadow-[0_0_20px_rgba(0,255,41,0.3)]'
                : 'bg-neutral-100 text-neutral-600 border-2 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-neutral-950 -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{serviceData[category].title}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Title & Subtitle */}
          <div className="text-center mb-12">
            <h3 className="font-display font-black text-4xl md:text-5xl mb-4 text-neutral-950">
              {currentData.title}
            </h3>
            <p className="text-xl text-neutral-600 font-medium">{currentData.subtitle}</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentData.services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 border-neutral-200 p-6 flex flex-col items-center gap-4 hover:border-brand hover:shadow-lg transition-all group cursor-pointer"
              >
                <motion.div
                  className="text-neutral-400 group-hover:text-brand transition-colors"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <span className="text-sm font-bold text-neutral-700 text-center group-hover:text-neutral-950 transition-colors">
                  {service.name}
                </span>

                {/* Hover indicator */}
                <motion.div
                  className="w-8 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-center"
                />
              </motion.div>
            ))}
          </div>

          {/* CTA below grid */}
          <div className="text-center mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600 mb-6 text-lg">
              Finde nicht was du suchst? Wir bieten auch individuelle Lösungen an.
            </p>
            <motion.button
              onClick={onContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand text-neutral-950 px-10 py-4 font-display font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_30px_rgba(0,255,41,0.3)] transition-all"
            >
              Beratungsgespräch vereinbaren
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
