import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

export const FadingPrintVisualizer: React.FC = () => {
  return (
    <div className="w-full h-[320px] bg-neutral-100 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-200">
      {/* Sun Animation */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Sun size={32} className="text-yellow-500" />
      </motion.div>

      <div className="flex gap-8 items-center">
        {/* Bad Print - Fading */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-xs font-bold uppercase text-neutral-500 mb-2">Billig-Druck</div>
          <motion.div
            className="w-32 h-40 bg-gradient-to-b from-red-500 to-red-600 rounded shadow-lg relative overflow-hidden flex items-center justify-center"
            animate={{
              opacity: [1, 0.3, 0.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1],
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                times: [0, 0.4, 0.6, 1],
              }}
            />
            <motion.span
              className="text-white font-bold text-xl z-10"
              animate={{
                opacity: [1, 0.2, 0.2, 1],
                color: ["#FFFFFF", "#FFE5E5", "#FFE5E5", "#FFFFFF"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                times: [0, 0.4, 0.6, 1],
              }}
            >
              LOGO
            </motion.span>
          </motion.div>
          <motion.div
            className="text-xs text-red-500 font-bold"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
          >
            Verblasst nach 3 Monaten
          </motion.div>
        </div>

        {/* Good Print - Lasting */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-xs font-bold uppercase text-brand mb-2">Premium-Druck</div>
          <div className="w-32 h-40 bg-gradient-to-b from-brand to-green-600 rounded shadow-2xl flex items-center justify-center border-2 border-brand/30">
            <span className="text-neutral-950 font-bold text-xl">LOGO</span>
            <motion.div
              className="absolute inset-0 rounded"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(0, 255, 41, 0)",
                  "0 0 20px rgba(0, 255, 41, 0.3)",
                  "0 0 0px rgba(0, 255, 41, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-xs text-brand font-bold">10+ Jahre Haltbarkeit</div>
        </div>
      </div>

      {/* Timeline indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-[10px] font-mono text-neutral-400 uppercase">Zeit →</span>
        <motion.div
          className="w-32 h-1 bg-neutral-300 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-brand"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
};
