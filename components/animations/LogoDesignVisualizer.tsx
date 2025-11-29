import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogoDesignVisualizer: React.FC = () => {
  const designStages = [
    { text: 'art.of.media', font: 'font-sans', color: '#737373', size: 'text-2xl md:text-3xl', tracking: 'tracking-normal', weight: 'font-normal' },
    { text: 'art.of.media', font: 'font-serif', color: '#A3A3A3', size: 'text-2xl md:text-3xl', tracking: 'tracking-wide', weight: 'font-medium' },
    { text: 'ART.OF.MEDIA', font: 'font-mono', color: '#D4D4D4', size: 'text-xl md:text-2xl', tracking: 'tracking-widest', weight: 'font-bold' },
    { text: 'art.of.media', font: 'font-display', color: '#00FF29', size: 'text-3xl md:text-4xl', tracking: 'tracking-tight', weight: 'font-bold' },
  ];

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % designStages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] bg-neutral-900 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            className={`${designStages[currentStage].font} ${designStages[currentStage].size} ${designStages[currentStage].tracking} ${designStages[currentStage].weight}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{
              color: designStages[currentStage].color,
              textShadow: designStages[currentStage].color === '#00FF29' ? '0 0 30px rgba(0, 255, 41, 0.6)' : 'none',
            }}
          >
            {designStages[currentStage].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
