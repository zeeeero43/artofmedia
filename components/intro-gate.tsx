
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Layers, ArrowRight, MousePointer2 } from 'lucide-react';
import { ServiceCategory } from '../types';

interface IntroGateProps {
  onChoose: (mode: ServiceCategory) => void;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onChoose }) => {
  const [hoveredSide, setHoveredSide] = useState<ServiceCategory | null>(null);
  const [selectedSide, setSelectedSide] = useState<ServiceCategory | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleChoice = (mode: ServiceCategory) => {
    setSelectedSide(mode);
    setIsExiting(true);
    setTimeout(() => {
      onChoose(mode);
    }, 800); // Wait for exit animation
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9000] flex flex-col md:flex-row overflow-hidden bg-neutral-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.5 } }}
    >
      {/* GUIDING QUESTION - Top Overlay */}
      <motion.div 
        className="absolute top-24 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white"
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -50 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Wählen Sie Ihren Bereich
        </span>
        <h2 className="font-display font-black text-2xl md:text-4xl uppercase tracking-tight text-center px-4">
          Wie können wir Ihnen helfen?
        </h2>
      </motion.div>

      {/* DIGITAL SIDE (LEFT) */}
      <motion.div 
        className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800"
        onMouseEnter={() => setHoveredSide('digital')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice('digital')}
        animate={{ 
          width: window.innerWidth >= 768 
            ? (hoveredSide === 'digital' || selectedSide === 'digital' ? '60%' : (hoveredSide === 'physical' || selectedSide === 'physical' ? '40%' : '50%')) 
            : '100%',
          flex: window.innerWidth < 768 
            ? (hoveredSide === 'digital' ? 2 : (hoveredSide === 'physical' ? 1 : 1))
            : 'unset',
          filter: isExiting && selectedSide !== 'digital' ? "grayscale(100%) brightness(0.5)" : "grayscale(0%) brightness(1)"
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background - Pure Black */}
        <div className="absolute inset-0 bg-black" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
           <motion.div 
             animate={{ 
                y: isExiting ? -50 : 0, 
                opacity: isExiting ? 0 : 1,
                scale: selectedSide === 'digital' ? 1.1 : 0.9
             }}
             transition={{ duration: 0.4 }}
           >
             {/* Icon & Label */}
             <div className="flex flex-col items-center gap-4 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Monitor size={48} strokeWidth={1} className="text-brand drop-shadow-[0_0_15px_rgba(0,255,41,0.5)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand border border-brand/30 px-3 py-1 rounded-full">
                  Online Marketing & Web
                </span>
             </div>

             <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-4 group-hover:text-brand transition-colors">
               Virtuelle<br/>Dominanz
             </h2>
             <p className="text-neutral-400 max-w-xs mx-auto text-sm md:text-base font-medium mb-8 group-hover:text-white transition-colors">
               Ich brauche mehr Sichtbarkeit, Leads und eine bessere Website.
             </p>
             
             <motion.span 
               className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-8 py-4 rounded-full group-hover:bg-brand group-hover:text-neutral-950 group-hover:border-brand transition-all"
               animate={{
                 backgroundColor: selectedSide === 'digital' ? '#00FF29' : '',
                 color: selectedSide === 'digital' ? '#000000' : '',
                 borderColor: selectedSide === 'digital' ? '#00FF29' : ''
               }}
             >
               Digitales Wachstum starten <ArrowRight size={14} />
             </motion.span>
           </motion.div>
        </div>
        
        {/* Slide Up Curtain Effect on Exit */}
        <motion.div 
          className="absolute inset-0 bg-brand z-50"
          initial={{ y: "100%" }}
          animate={{ y: isExiting ? "-100%" : "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>


      {/* PHYSICAL SIDE (RIGHT) */}
      <motion.div 
        className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden"
        onMouseEnter={() => setHoveredSide('physical')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice('physical')}
        animate={{ 
            width: window.innerWidth >= 768 
              ? (hoveredSide === 'physical' || selectedSide === 'physical' ? '60%' : (hoveredSide === 'digital' || selectedSide === 'digital' ? '40%' : '50%')) 
              : '100%',
            flex: window.innerWidth < 768 
              ? (hoveredSide === 'physical' ? 2 : (hoveredSide === 'digital' ? 1 : 1))
              : 'unset',
            filter: isExiting && selectedSide !== 'physical' ? "grayscale(100%) brightness(0.5)" : "grayscale(0%) brightness(1)"
          }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background - Pure Black */}
        <div className="absolute inset-0 bg-black" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
          <motion.div
            animate={{ 
                y: isExiting ? 50 : 0, 
                opacity: isExiting ? 0 : 1,
                scale: selectedSide === 'physical' ? 1.1 : 0.9
             }}
            transition={{ duration: 0.4 }}
          >
             {/* Icon & Label */}
             <div className="flex flex-col items-center gap-4 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Layers size={48} strokeWidth={1} className="text-white drop-shadow-md" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-3 py-1 rounded-full">
                  Werbetechnik & Print
                </span>
             </div>

             <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-4 group-hover:text-brand transition-colors">
               Physische<br/>Präsenz
             </h2>
             <p className="text-neutral-300 max-w-xs mx-auto text-sm md:text-base font-medium mb-8 group-hover:text-white transition-colors">
               Ich brauche Fahrzeugfolierung, Leuchtreklame oder Druckprodukte.
             </p>

             <motion.span 
               className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-8 py-4 rounded-full group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white transition-all"
               animate={{
                 backgroundColor: selectedSide === 'physical' ? '#ffffff' : '',
                 color: selectedSide === 'physical' ? '#000000' : '',
                 borderColor: selectedSide === 'physical' ? '#ffffff' : ''
               }}
             >
               Marke erlebbar machen <ArrowRight size={14} />
             </motion.span>
           </motion.div>
        </div>

        {/* Slide Down Curtain Effect on Exit */}
        <motion.div 
          className="absolute inset-0 bg-neutral-950 z-50"
          initial={{ y: "-100%" }}
          animate={{ y: isExiting ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Central VS Line */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference"
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.5 : 1 }}
      >
         <div className="w-[1px] h-24 bg-white/50" />
      </motion.div>

    </motion.div>
  );
};
