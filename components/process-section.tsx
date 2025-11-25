
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ServiceCategory, ProcessStep } from '../types';
import { cn } from '../lib/utils';
import { LogoDesignVisualizer } from './animations/LogoDesignVisualizer';
import { ColorPaletteVisualizer } from './animations/ColorPaletteVisualizer';
import { TypographyVisualizer } from './animations/TypographyVisualizer';
import { BrandSystemVisualizer } from './animations/BrandSystemVisualizer';
import { DataVerificationVisualizer } from './animations/DataVerificationVisualizer';
import { MaterialShowcaseVisualizer } from './animations/MaterialShowcaseVisualizer';
import { ProductionFlowVisualizer } from './animations/ProductionFlowVisualizer';
import { QualityControlVisualizer } from './animations/QualityControlVisualizer';

const processData: Record<ServiceCategory, ProcessStep[]> = {
  digital: [
    {
      id: 'd1',
      number: '01',
      title: 'Logo-Design',
      description: 'Wir wählen ein Logo-Design, das einfach, prägnant und flexibel ist.'
    },
    {
      id: 'd2',
      number: '02',
      title: 'Farbpalette',
      description: 'Farben spielen eine entscheidende Rolle und sollen Emotionen wecken.'
    },
    {
      id: 'd3',
      number: '03',
      title: 'Schriftarten',
      description: 'Auswahl der richtigen Fonts für Konsistenz und Wiedererkennbarkeit.'
    },
    {
      id: 'd4',
      number: '04',
      title: 'Corporate Identity',
      description: 'Die Grundlage für ein durchgängiges Erscheinungsbild von Web bis Print.'
    }
  ],
  physical: [
    {
      id: 'p1',
      number: '01',
      title: 'Daten-Audit',
      description: 'Detaillierte Prüfung der Druckdaten, Vektoren und Farbräume.'
    },
    {
      id: 'p2',
      number: '02',
      title: 'Material-Wahl',
      description: 'Gemeinsame Auswahl von Hochleistungsfolien, Papieren und Veredelungen.'
    },
    {
      id: 'p3',
      number: '03',
      title: 'Produktion',
      description: 'High-End Druck, Plottung und Verarbeitung an modernsten Maschinen.'
    },
    {
      id: 'p4',
      number: '04',
      title: 'Montage & Finish',
      description: 'Fachgerechte Installation vor Ort und finale Qualitätskontrolle.'
    }
  ]
};

const getVisualizer = (stepId: string) => {
  const visualizers: Record<string, React.ReactElement> = {
    'd1': <LogoDesignVisualizer />,
    'd2': <ColorPaletteVisualizer />,
    'd3': <TypographyVisualizer />,
    'd4': <BrandSystemVisualizer />,
    'p1': <DataVerificationVisualizer />,
    'p2': <MaterialShowcaseVisualizer />,
    'p3': <ProductionFlowVisualizer />,
    'p4': <QualityControlVisualizer />
  };
  return visualizers[stepId] || null;
};

interface ProcessSectionProps {
  activeMode: ServiceCategory;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ activeMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-40 px-6 w-full border-t border-neutral-200">
      <div className="container mx-auto max-w-5xl relative">
        
        <div className="text-center mb-24">
           <span className="text-brand font-mono text-sm uppercase tracking-widest mb-6 block">
             Workflow: {activeMode}
           </span>
           <h2 className="font-display font-black text-5xl md:text-7xl text-neutral-950 uppercase">
             Der Prozess
           </h2>
        </div>

        <div className="relative">
          {/* Central Line Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-neutral-200 md:transform md:-translate-x-1/2" />
          
          {/* Filling Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-brand md:transform md:-translate-x-1/2 z-10"
          />

          <div className="relative z-20 space-y-24 md:space-y-32">
            <AnimatePresence mode="wait">
              {processData[activeMode].map((step, index) => (
                <ProcessItem key={step.id} step={step} index={index} activeMode={activeMode} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessItem: React.FC<{ step: ProcessStep; index: number, activeMode: string }> = ({ step, index, activeMode }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "center center"]
  });

  const dotScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "flex flex-col md:flex-row items-start md:items-center w-full pl-12 md:pl-0",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Text Side */}
      <div className={cn("w-full md:w-1/2 p-0", isEven ? "md:pl-20" : "md:pr-20 md:text-right")}>
        <span className="font-mono font-bold text-brand mb-2 block text-xs tracking-widest uppercase">
          Schritt {step.number}
        </span>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-950 mb-4">
          {step.title}
        </h3>
        <p className="text-neutral-500 text-lg leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-2 border-neutral-300 rounded-full -ml-2 md:ml-0 md:transform md:-translate-x-1/2 flex items-center justify-center shadow-sm group z-30">
        <motion.div
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="w-2 h-2 bg-brand rounded-full"
        />
      </div>

      {/* Visualizer Side */}
      <div className={cn("w-full md:w-1/2 mt-8 md:mt-0", isEven ? "md:pr-20" : "md:pl-20")}>
        {getVisualizer(step.id)}
      </div>
    </motion.div>
  );
};
