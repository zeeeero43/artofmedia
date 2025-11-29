import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const colors = [
  { name: 'Grün', hex: '#00FF29', shadow: 'rgba(0,255,41,0.6)' },
  { name: 'Blau', hex: '#3B82F6', shadow: 'rgba(59,130,246,0.6)' },
  { name: 'Rot', hex: '#EF4444', shadow: 'rgba(239,68,68,0.6)' },
  { name: 'Lila', hex: '#A855F7', shadow: 'rgba(168,85,247,0.6)' },
  { name: 'Gelb', hex: '#FBBF24', shadow: 'rgba(251,191,36,0.6)' },
  { name: 'Pink', hex: '#EC4899', shadow: 'rgba(236,72,153,0.6)' }
];

export const ColorChangingLEDVisualizer: React.FC = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const currentColor = colors[currentColorIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-72 bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden shadow-xl relative">

      {/* Background Glow */}
      <motion.div
        animate={{
          backgroundColor: currentColor.shadow,
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 blur-3xl"
      />

      {/* Main LED Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={currentColorIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <motion.h2
            animate={{
              color: currentColor.hex,
              textShadow: [
                `0 0 20px ${currentColor.shadow}`,
                `0 0 40px ${currentColor.shadow}, 0 0 60px ${currentColor.shadow}`,
                `0 0 20px ${currentColor.shadow}`
              ]
            }}
            transition={{ textShadow: { duration: 2, repeat: Infinity } }}
            className="font-display font-bold text-6xl md:text-7xl tracking-tighter"
          >
            LOGO
          </motion.h2>

          {/* LED Tubes/Strips underneath */}
          <div className="mt-6 flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: currentColor.hex,
                  boxShadow: `0 0 20px ${currentColor.shadow}`
                }}
                transition={{ delay: i * 0.1 }}
                className="w-12 h-2 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Color Name Display */}
      <motion.div
        key={`label-${currentColorIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="bg-black/60 backdrop-blur px-4 py-2 rounded border border-white/20">
          <span className="text-sm font-bold" style={{ color: currentColor.hex }}>
            {currentColor.name}
          </span>
        </div>
      </motion.div>

      {/* App Control Indicator */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-brand/30 flex items-center gap-2">
        <Smartphone size={14} className="text-brand" />
        <span className="text-xs font-mono text-brand font-bold">APP STEUERBAR</span>
      </div>

      {/* Color Picker Visual */}
      <div className="absolute top-4 left-4 flex gap-1">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentColorIndex ? 1.3 : 1,
              opacity: index === currentColorIndex ? 1 : 0.5,
              boxShadow: index === currentColorIndex
                ? `0 0 10px ${color.shadow}`
                : '0 0 0px rgba(0,0,0,0)'
            }}
            className="w-4 h-4 rounded-full border-2 border-white/30"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};
