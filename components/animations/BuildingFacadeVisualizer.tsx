import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Zap } from 'lucide-react';

export const BuildingFacadeVisualizer: React.FC = () => {
  const [phase, setPhase] = useState<'before' | 'lighting'>('before');

  // Letters that will light up one by one
  const letters = ['A', 'R', 'T', '.', 'M', 'E', 'D', 'I', 'A'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => prev === 'before' ? 'lighting' : 'before');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-72 bg-gradient-to-b from-neutral-900 to-black rounded-lg border border-neutral-800 overflow-hidden shadow-xl relative">

      {/* Sky/Background */}
      <motion.div
        animate={{
          backgroundColor: phase === 'before' ? '#262626' : '#0a0a0a'
        }}
        className="absolute inset-0"
      />

      {/* Stars (only visible at night) */}
      {phase === 'lighting' && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`
              }}
            />
          ))}
        </div>
      )}

      {/* Building Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-neutral-950 border-t-2 border-neutral-800">
        {/* Windows */}
        <div className="grid grid-cols-8 gap-2 p-4">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: phase === 'before'
                  ? (Math.random() > 0.7 ? '#fbbf24' : '#171717')
                  : (Math.random() > 0.5 ? '#fbbf24' : '#171717')
              }}
              className="w-full h-6 rounded-sm"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* LED Letters on Facade */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: phase === 'lighting' ? 1 : 0,
                scale: phase === 'lighting' ? 1 : 0.8,
                boxShadow: phase === 'lighting'
                  ? [
                      '0 0 20px rgba(0,255,41,0.6)',
                      '0 0 40px rgba(0,255,41,0.8)',
                      '0 0 20px rgba(0,255,41,0.6)'
                    ]
                  : '0 0 0px rgba(0,255,41,0)'
              }}
              transition={{
                delay: phase === 'lighting' ? index * 0.15 : 0,
                duration: 0.4,
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              className="w-6 h-8 bg-brand border-2 border-brand/50 rounded flex items-center justify-center text-neutral-950 font-bold text-sm"
            >
              {letter}
            </motion.div>
          ))}
        </div>

        {/* Glow effect underneath letters */}
        {phase === 'lighting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-12 bg-brand/20 blur-2xl rounded-full"
          />
        )}
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded border border-white/10">
        <AnimatePresence mode="wait">
          {phase === 'before' ? (
            <motion.div
              key="before"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Building size={14} className="text-neutral-400" />
              <span className="text-xs font-mono text-neutral-400">Ohne LED</span>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Zap size={14} className="text-brand" />
              <span className="text-xs font-mono text-brand">Mit LED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <AnimatePresence mode="wait">
          {phase === 'before' ? (
            <motion.div
              key="before-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-neutral-500 font-bold"
            >
              Unsichtbar nach Ladenschluss
            </motion.div>
          ) : (
            <motion.div
              key="after-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-brand font-bold"
            >
              24/7 Sichtbar & Präsent
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
