import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';

export const DarkAtNightVisualizer: React.FC = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-xl relative">
      {/* Time indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10">
        <AnimatePresence mode="wait">
          {isNight ? (
            <motion.div key="night" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <Moon size={14} className="text-blue-400" />
              <span className="text-xs font-mono text-blue-400">20:00 Uhr</span>
            </motion.div>
          ) : (
            <motion.div key="day" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <Sun size={14} className="text-yellow-400" />
              <span className="text-xs font-mono text-yellow-400">14:00 Uhr</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex h-full">
        {/* Left: Your shop (dark at night) */}
        <motion.div
          animate={{
            backgroundColor: isNight ? "#171717" : "#404040"
          }}
          className="w-1/2 flex flex-col items-center justify-center border-r border-neutral-800 relative"
        >
          <div className="absolute top-1/4 text-xs font-bold uppercase text-neutral-600">Dein Laden</div>
          <motion.div
            animate={{ opacity: isNight ? 0.2 : 1 }}
            className="w-24 h-16 bg-neutral-700 border border-neutral-600 rounded flex items-center justify-center text-neutral-500 text-sm font-bold"
          >
            LOGO
          </motion.div>
          {isNight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 text-red-500 text-xs font-bold"
            >
              UNSICHTBAR
            </motion.div>
          )}
        </motion.div>

        {/* Right: Competitor with LED (always visible) */}
        <motion.div
          animate={{
            backgroundColor: isNight ? "#0a0a0a" : "#262626"
          }}
          className="w-1/2 flex flex-col items-center justify-center relative"
        >
          <div className="absolute top-1/4 text-xs font-bold uppercase text-neutral-400">Konkurrenz</div>
          <motion.div
            animate={{
              boxShadow: isNight
                ? ["0 0 20px rgba(0,255,41,0.6)", "0 0 40px rgba(0,255,41,0.8)", "0 0 20px rgba(0,255,41,0.6)"]
                : "0 0 10px rgba(0,255,41,0.3)"
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-16 bg-brand border-2 border-brand rounded flex items-center justify-center text-neutral-950 text-sm font-bold"
          >
            <Zap size={16} className="mr-1" />
            LED
          </motion.div>
          {isNight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 text-brand text-xs font-bold"
            >
              LEUCHTET
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
