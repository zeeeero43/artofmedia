import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TypographyVisualizer: React.FC = () => {
  const fontStyles = [
    { className: 'font-sans', name: 'Sans Serif' },
    { className: 'font-serif', name: 'Serif' },
    { className: 'font-mono', name: 'Monospace' },
    { className: 'font-display', name: 'Display' },
  ];

  const [currentFont, setCurrentFont] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fontStyles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[280px] bg-neutral-100 rounded-sm overflow-hidden relative flex items-center justify-center p-8 md:p-12 border border-neutral-200">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFont}
            className={`text-3xl md:text-4xl font-bold text-neutral-950 text-center ${fontStyles[currentFont].className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Schriftart Auswahl
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
