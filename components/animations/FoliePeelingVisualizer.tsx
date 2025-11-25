import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check } from 'lucide-react';

export const FoliePeelingVisualizer: React.FC = () => {
  return (
    <div className="w-full h-[320px] bg-neutral-900 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      <div className="flex gap-8 items-center">
        {/* Bad Foil - Peeling */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-red-500" />
            <div className="text-xs font-bold uppercase text-neutral-500">Billig-Folie</div>
          </div>

          <div className="relative w-40 h-32 bg-neutral-800 rounded overflow-hidden border border-neutral-700">
            {/* Car/Window Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800" />

            {/* Peeling Foil Layer */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 128">
              {/* Main foil */}
              <motion.path
                d="M 0 0 L 160 0 L 160 128 L 0 128 Z"
                fill="#EF4444"
                opacity="0.8"
                initial={{ d: "M 0 0 L 160 0 L 160 128 L 0 128 Z" }}
                animate={{
                  d: [
                    "M 0 0 L 160 0 L 160 128 L 0 128 Z",
                    "M 0 0 L 160 0 L 140 110 L 20 120 Z",
                    "M 0 0 L 160 0 L 120 100 L 40 110 Z",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />

              {/* Peeling corner */}
              <motion.path
                d="M 140 110 L 160 128 L 140 128 Z"
                fill="#DC2626"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
              />
            </svg>

            {/* Bubbles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-red-400/30 border border-red-400/50"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <div className="text-xs text-red-500 font-bold">Blasen & Ablösung</div>
        </div>

        {/* Good Foil - Perfect Application */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Check size={14} className="text-brand" />
            <div className="text-xs font-bold uppercase text-brand">Premium-Folie</div>
          </div>

          <div className="relative w-40 h-32 bg-neutral-800 rounded overflow-hidden border-2 border-brand/30">
            {/* Car/Window Base with perfect foil */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-brand to-green-600"
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />

            {/* Quality indicators */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand animate-pulse" />
          </div>

          <div className="text-xs text-brand font-bold">Perfekte Haftung</div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        Haltbarkeits-Vergleich
      </div>
    </div>
  );
};
