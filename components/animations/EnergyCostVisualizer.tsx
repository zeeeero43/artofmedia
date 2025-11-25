import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, TrendingDown, Euro } from 'lucide-react';

// Counter Helper Component
const Counter = ({ target, duration, prefix = "" }: { target: number, duration: number, prefix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) start = 0; // Loop
      setCount(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{prefix}{Math.floor(count).toLocaleString()}</>;
};

/**
 * EnergyCostVisualizer
 * Compares energy costs between traditional bulbs and LED
 * Shows dramatic savings with LED technology
 */
export const EnergyCostVisualizer = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex items-center justify-between relative overflow-hidden shadow-xl">

      {/* LEFT: Traditional Lighting - High Cost */}
      <div className="flex flex-col items-center gap-4 z-20 flex-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
          Alte Beleuchtung
        </div>

        {/* Traditional Bulb Icon */}
        <motion.div
          className="relative"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Lightbulb size={48} className="text-yellow-600" strokeWidth={1.5} />

          {/* Heat Waves */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{
                y: [-10, -30],
                opacity: [0.5, 0],
                scale: [1, 1.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            >
              <div className="text-orange-500 text-xs">~</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cost Display - High */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 bg-red-950 rounded-lg px-4 py-3 border-2 border-red-800 min-w-[140px]">
            <Euro size={18} className="text-red-500 shrink-0" />
            <motion.div
              className="text-xl font-sans font-bold text-red-500 tabular-nums"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Counter target={450} duration={6} />
            </motion.div>
          </div>
          <div className="text-xs text-red-400 font-medium">pro Monat</div>
        </div>

        <div className="text-xs text-neutral-600 mt-2 text-center">
          400W Verbrauch
        </div>
      </div>

      {/* CENTER: Comparison Arrow */}
      <div className="flex flex-col items-center gap-3 z-30">
        <TrendingDown size={32} className="text-brand" strokeWidth={2.5} />

        <motion.div
          className="text-brand text-sm font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          -85%
        </motion.div>

        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
          Ersparnis
        </div>
      </div>

      {/* RIGHT: LED - Low Cost */}
      <div className="flex flex-col items-center gap-4 z-20 flex-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-brand mb-2">
          LED Premium
        </div>

        {/* LED Icon with Glow */}
        <motion.div
          className="relative"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(0, 255, 41, 0.5))',
              'drop-shadow(0 0 20px rgba(0, 255, 41, 0.8))',
              'drop-shadow(0 0 10px rgba(0, 255, 41, 0.5))'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap size={48} className="text-brand" strokeWidth={2} />

          {/* Energy Particles */}
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              animate={{
                x: [0, 20 * (i % 2 ? 1 : -1)],
                y: [0, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            >
              <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Cost Display - Low */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 bg-neutral-950 rounded-lg px-4 py-3 border-2 border-brand min-w-[140px]">
            <Euro size={18} className="text-brand shrink-0" />
            <motion.div
              className="text-xl font-sans font-bold text-brand tabular-nums"
            >
              <Counter target={65} duration={6} />
            </motion.div>
          </div>
          <div className="text-xs text-brand font-medium">pro Monat</div>
        </div>

        <div className="text-xs text-neutral-500 mt-2 text-center">
          60W Verbrauch
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};
