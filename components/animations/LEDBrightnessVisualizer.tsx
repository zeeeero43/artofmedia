import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * LEDBrightnessVisualizer
 * Shows brightness comparison between day (sun) and night (moon)
 * Demonstrates LED visibility in all lighting conditions
 */
export const LEDBrightnessVisualizer = () => {
  return (
    <div className="w-full h-64 bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-lg border border-neutral-800 p-8 flex items-stretch gap-0 relative overflow-hidden shadow-xl">

      {/* LEFT HALF: Daytime - Bright */}
      <div className="flex-1 relative flex flex-col items-center justify-center border-r border-neutral-700">
        {/* Sky Gradient - Day */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200 opacity-90" />

        {/* Sun */}
        <motion.div
          className="relative z-10 mb-4"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          <Sun size={48} className="text-yellow-400" strokeWidth={2} />

          {/* Sun Rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-yellow-300 origin-top"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>

        {/* LED Sign - Visible in Day */}
        <motion.div
          className="relative z-10 bg-neutral-950 border-2 border-brand rounded-lg px-8 py-4"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 41, 0.6)',
              '0 0 30px rgba(0, 255, 41, 0.8)',
              '0 0 20px rgba(0, 255, 41, 0.6)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="font-display font-black text-2xl text-brand">OFFEN</div>

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-brand opacity-30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs font-bold text-neutral-700 bg-white/80 px-3 py-1 rounded-full">
          Tag
        </div>

        {/* Cloud */}
        <motion.div
          className="absolute top-8 right-4 z-10"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="flex gap-1">
            <div className="w-6 h-4 bg-white/70 rounded-full" />
            <div className="w-8 h-4 bg-white/70 rounded-full -ml-2" />
            <div className="w-6 h-4 bg-white/70 rounded-full -ml-2" />
          </div>
        </motion.div>
      </div>

      {/* RIGHT HALF: Nighttime - Dark */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        {/* Sky Gradient - Night */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950 opacity-95" />

        {/* Moon */}
        <motion.div
          className="relative z-10 mb-4"
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        >
          <Moon size={40} className="text-neutral-400" strokeWidth={1.5} />

          {/* Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${-20 + (i % 3) * 15}px`,
                left: `${-25 + (i % 4) * 20}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </motion.div>

        {/* LED Sign - EXTREMELY Visible at Night */}
        <motion.div
          className="relative z-10 bg-neutral-950 border-2 border-brand rounded-lg px-8 py-4"
          animate={{
            boxShadow: [
              '0 0 30px rgba(0, 255, 41, 0.8)',
              '0 0 50px rgba(0, 255, 41, 1)',
              '0 0 30px rgba(0, 255, 41, 0.8)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="font-display font-black text-2xl text-brand">OFFEN</div>

          {/* Stronger Night Glow */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-brand opacity-50 blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Light Rays */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-brand to-transparent origin-left"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 90}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs font-bold text-brand bg-neutral-950/80 px-3 py-1 rounded-full border border-brand/30">
          Nacht
        </div>

        {/* Atmospheric Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Center Divider Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-neutral-950 border-2 border-brand px-4 py-2 rounded-lg shadow-lg">
        <div className="text-xs font-bold text-brand uppercase tracking-wider">24/7 Sichtbar</div>
      </div>
    </div>
  );
};
