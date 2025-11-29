import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const CarWrappingShowcase: React.FC = () => {
  const [phase, setPhase] = useState(0); // 0: before, 1: wrapping, 2: after

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[320px] bg-gradient-to-b from-neutral-100 to-neutral-200 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-300">
      {/* Workshop Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Car Silhouette */}
        <div className="relative">
          <svg
            width="280"
            height="140"
            viewBox="0 0 280 140"
            className="drop-shadow-lg"
          >
            {/* Car body base - bleibt weiß */}
            <motion.path
              d="M 40 100 L 25 75 L 40 55 L 70 48 L 100 45 L 180 45 L 210 48 L 240 55 L 255 75 L 240 100 Z"
              fill="#FFFFFF"
              stroke="#262626"
              strokeWidth="2"
            />

            {/* Car roof/cabin */}
            <motion.path
              d="M 85 48 L 95 25 L 185 25 L 195 48"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
            />
            <motion.path
              d="M 85 48 L 95 25 L 185 25 L 195 48 Z"
              fill="#FFFFFF"
              stroke="#262626"
              strokeWidth="2"
            />

            {/* Windows */}
            <path
              d="M 100 30 L 105 46 L 135 46 L 135 30 Z"
              fill="#A3E3FF"
              opacity="0.7"
            />
            <path
              d="M 145 30 L 145 46 L 175 46 L 180 30 Z"
              fill="#A3E3FF"
              opacity="0.7"
            />

            {/* Wheels */}
            <circle cx="75" cy="100" r="18" fill="#262626" />
            <circle cx="75" cy="100" r="10" fill="#525252" />
            <circle cx="75" cy="100" r="4" fill="#262626" />
            <circle cx="205" cy="100" r="18" fill="#262626" />
            <circle cx="205" cy="100" r="10" fill="#525252" />
            <circle cx="205" cy="100" r="4" fill="#262626" />

            {/* Door lines */}
            <line x1="140" y1="48" x2="140" y2="95" stroke="#D4D4D4" strokeWidth="1" />

            {/* Headlights */}
            <ellipse cx="245" cy="72" rx="6" ry="8" fill="#FEF08A" opacity="0.8" />
            <ellipse cx="35" cy="72" rx="6" ry="8" fill="#FCA5A5" opacity="0.8" />
          </svg>

          {/* Werbefolierung - art.of.media Schriftzug */}
          <AnimatePresence>
            {(phase === 1 || phase === 2) && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{
                  opacity: 1,
                  clipPath: phase === 1 ? "inset(0 0% 0 0)" : "inset(0 0% 0 0)"
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: phase === 1 ? 2 : 0.3, ease: "linear" }}
              >
                <svg width="160" height="30" viewBox="0 0 160 30">
                  {/* art.of.media text */}
                  <motion.text
                    x="80"
                    y="22"
                    textAnchor="middle"
                    className="font-display font-bold"
                    fill="#00FF29"
                    fontSize="16"
                    letterSpacing="-0.5"
                  >
                    art.of.media
                  </motion.text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wrapping animation overlay */}
          <AnimatePresence>
            {phase === 1 && (
              <>
                {/* Wrapping tool/squeegee */}
                <motion.div
                  className="absolute top-[45%] left-[15%] w-1 h-8 bg-neutral-800 rounded-full"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: [0, 180], opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "linear" }}
                />

                {/* Sparkle effects */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: "40%",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -15],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.4,
                      repeat: 2,
                    }}
                  >
                    <Sparkles size={14} className="text-brand" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Shine effect for finished car */}
          {phase === 2 && (
            <motion.div
              className="absolute inset-0"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent blur-sm" />
            </motion.div>
          )}
        </div>

        {/* Status Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {phase === 0 && (
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-neutral-500">Vorher</div>
                <div className="text-sm text-neutral-600">Fahrzeug ohne Werbung</div>
              </div>
            )}
            {phase === 1 && (
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-brand">Beschriftung läuft...</div>
                <div className="flex gap-1 justify-center">
                  <motion.div
                    className="w-2 h-2 bg-brand rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-brand rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-brand rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            )}
            {phase === 2 && (
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-brand">Nachher</div>
                <div className="text-sm text-neutral-950 font-bold">Fahrzeugbeschriftung</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: i === phase ? "#00FF29" : "#D4D4D4",
                scale: i === phase ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
        Fahrzeugbeschriftung
      </div>
    </div>
  );
};
