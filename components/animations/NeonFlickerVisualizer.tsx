import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

/**
 * NeonFlickerVisualizer
 * Shows a neon/LED text with authentic flickering effect
 * Demonstrates the dynamic, attention-grabbing nature of LED lighting
 */
export const NeonFlickerVisualizer = () => {
  return (
    <div className="w-full h-64 bg-neutral-950 rounded-lg border border-neutral-800 p-8 flex flex-col items-center justify-center gap-6 relative overflow-hidden shadow-xl">

      {/* Top Label */}
      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 absolute top-6 left-1/2 -translate-x-1/2">
        LED Leuchtkraft
      </div>

      {/* Main Neon Text with Flicker */}
      <motion.div
        className="relative text-center"
        animate={{
          opacity: [1, 0.95, 1, 0.9, 1, 0.98, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 1],
        }}
      >
        {/* Text with Glow */}
        <motion.h3
          className="font-display font-black text-5xl md:text-6xl text-brand relative z-10"
          style={{
            textShadow: '0 0 20px rgba(0, 255, 41, 0.8), 0 0 40px rgba(0, 255, 41, 0.5)',
          }}
          animate={{
            textShadow: [
              '0 0 20px rgba(0, 255, 41, 0.8), 0 0 40px rgba(0, 255, 41, 0.5)',
              '0 0 30px rgba(0, 255, 41, 0.9), 0 0 60px rgba(0, 255, 41, 0.6)',
              '0 0 20px rgba(0, 255, 41, 0.8), 0 0 40px rgba(0, 255, 41, 0.5)',
              '0 0 25px rgba(0, 255, 41, 0.85), 0 0 50px rgba(0, 255, 41, 0.55)',
              '0 0 20px rgba(0, 255, 41, 0.8), 0 0 40px rgba(0, 255, 41, 0.5)',
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            times: [0, 0.2, 0.4, 0.7, 1],
          }}
        >
          GEÖFFNET
        </motion.h3>

        {/* Glow Background */}
        <motion.div
          className="absolute inset-0 bg-brand blur-3xl opacity-30 rounded-full"
          animate={{
            scale: [1, 1.2, 1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            times: [0, 0.2, 0.4, 0.7, 1],
          }}
        />
      </motion.div>

      {/* Sub Text */}
      <div className="flex items-center gap-2 text-neutral-400">
        <Zap size={16} className="text-brand" />
        <span className="text-sm font-medium">24/7 sichtbar</span>
        <Zap size={16} className="text-brand" />
      </div>

      {/* Electric Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          >
            <div className="w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_rgba(0,255,41,0.8)]" />
          </motion.div>
        ))}
      </div>

      {/* Electrical Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <motion.path
          d="M 20 50 Q 100 80 180 50"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FF29" stopOpacity="0" />
            <stop offset="50%" stopColor="#00FF29" stopOpacity="1" />
            <stop offset="100%" stopColor="#00FF29" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom Label */}
      <div className="text-xs text-neutral-600 absolute bottom-6 text-center">
        Authentischer Neon-Effekt zieht Blicke an
      </div>
    </div>
  );
};
