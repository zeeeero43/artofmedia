import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';

export const InvisibleSignVisualizer: React.FC = () => {
  return (
    <div className="w-full h-[320px] bg-neutral-950 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      {/* Street scene background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950" />

      {/* Grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />

      <div className="flex gap-16 items-center relative z-10">
        {/* Bad Sign - Invisible */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 mb-2">
            <EyeOff size={14} className="text-neutral-600" />
            <div className="text-xs font-bold uppercase text-neutral-600">Standard-Werbung</div>
          </div>

          {/* Dull, gray sign */}
          <motion.div
            className="relative w-32 h-24 bg-neutral-800 rounded border border-neutral-700 flex items-center justify-center"
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-neutral-600 font-bold text-sm opacity-50">Hier</span>
          </motion.div>

          {/* People walking by - not looking */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-6 h-10 bg-neutral-700 rounded-full relative"
                animate={{
                  x: [0, 80, 80],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "linear",
                }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-600 rounded-full" />
              </motion.div>
            ))}
          </div>

          <div className="text-xs text-neutral-600 font-bold">0 Aufmerksamkeit</div>
        </div>

        {/* Good Sign - Eye-catching LED */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-brand" />
            <div className="text-xs font-bold uppercase text-brand">LED-Werbung</div>
          </div>

          {/* Bright, glowing LED sign */}
          <motion.div
            className="relative w-32 h-24 bg-neutral-900 rounded border-2 border-brand flex items-center justify-center overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 255, 41, 0.3)",
                "0 0 40px rgba(0, 255, 41, 0.6)",
                "0 0 20px rgba(0, 255, 41, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="text-brand font-bold text-lg z-10"
              animate={{
                textShadow: [
                  "0 0 10px rgba(0, 255, 41, 0.8)",
                  "0 0 20px rgba(0, 255, 41, 1)",
                  "0 0 10px rgba(0, 255, 41, 0.8)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              HIER
            </motion.span>

            {/* Light rays */}
            <motion.div
              className="absolute inset-0 bg-brand/10"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* People stopping and looking */}
          <div className="flex gap-2 items-end">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{
                  x: [0, 30, 30],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              >
                <div className="w-6 h-10 bg-white/90 rounded-full relative">
                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-800 rounded-full"
                    animate={{
                      x: [0, 15, 15],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8 + 1,
                    }}
                  />
                  {/* Eye looking at sign */}
                  <motion.div
                    className="absolute top-3 left-3 w-1 h-1 bg-brand rounded-full"
                    animate={{
                      opacity: [0, 1, 1],
                      scale: [0, 1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8 + 1.5,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-brand" />
            <div className="text-xs text-brand font-bold">100% Sichtbarkeit</div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        Aufmerksamkeits-Simulation
      </div>
    </div>
  );
};
