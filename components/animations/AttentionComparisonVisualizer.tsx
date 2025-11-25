import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Store } from 'lucide-react';

/**
 * AttentionComparisonVisualizer
 * Shows comparison between boring standard sign (left) and glowing LED sign (right)
 * Eye icons demonstrate how attention is drawn to the LED side
 */
export const AttentionComparisonVisualizer = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex items-center justify-between gap-8 relative overflow-hidden shadow-xl">

      {/* LEFT: Boring Standard Sign - No Attention */}
      <div className="flex flex-col items-center gap-4 flex-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-2">
          Standard Schild
        </div>

        {/* Gray Boring Sign */}
        <motion.div
          className="relative bg-neutral-700 border-2 border-neutral-600 rounded-lg px-6 py-8 flex items-center justify-center min-w-[120px]"
          animate={{ opacity: [0.5, 0.6, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Store size={32} className="text-neutral-500" strokeWidth={1.5} />
        </motion.div>

        <div className="text-xs text-neutral-600 mt-2 text-center">
          Grau, langweilig, unsichtbar
        </div>
      </div>

      {/* CENTER: Eye Movement Animation */}
      <div className="flex flex-col items-center gap-3 z-20">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="relative"
            animate={{
              x: [-20, 20, 20, -20],
              rotate: [0, 15, 15, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            <Eye
              size={24}
              className="text-neutral-500"
              strokeWidth={2}
            />
            {/* Pupil that looks right */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-neutral-950 rounded-full"
              animate={{
                x: [-5, 2, 2, -5],
                y: [-1, -1, -1, -1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}

        {/* Arrow Indicator */}
        <motion.div
          className="text-brand text-2xl font-black"
          animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          →
        </motion.div>
      </div>

      {/* RIGHT: LED Sign - Maximum Attention */}
      <div className="flex flex-col items-center gap-4 flex-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-brand mb-2">
          LED Premium
        </div>

        {/* Glowing LED Sign */}
        <motion.div
          className="relative bg-neutral-950 border-2 border-brand rounded-lg px-6 py-8 flex items-center justify-center min-w-[120px]"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 41, 0.3)',
              '0 0 40px rgba(0, 255, 41, 0.6)',
              '0 0 20px rgba(0, 255, 41, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Store size={32} className="text-brand" strokeWidth={2} />

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-brand opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="text-xs text-brand mt-2 text-center font-bold">
          Hell, auffällig, unvergesslich
        </div>
      </div>

      {/* Background Glow (Brand Green = Success) */}
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};
