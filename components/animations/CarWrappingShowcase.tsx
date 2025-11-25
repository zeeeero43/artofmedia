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
            width="200"
            height="120"
            viewBox="0 0 200 120"
            className="drop-shadow-lg"
          >
            {/* Car body base */}
            <motion.path
              d="M 30 80 L 20 60 L 30 45 L 50 40 L 70 38 L 130 38 L 150 40 L 170 45 L 180 60 L 170 80 Z"
              fill={phase === 0 ? "#FFFFFF" : phase === 1 ? "#E5E5E5" : "#00FF29"}
              stroke="#262626"
              strokeWidth="2"
              animate={{
                fill: phase === 0 ? "#FFFFFF" : phase === 1 ? ["#FFFFFF", "#00FF29"] : "#00FF29",
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Car windows */}
            <motion.path
              d="M 60 42 L 70 42 L 75 50 L 60 50 Z"
              fill={phase === 2 ? "#00FF29" : "#A3A3A3"}
              opacity="0.6"
              animate={{
                fill: phase === 2 ? "#00FF29" : "#A3A3A3",
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.path
              d="M 130 42 L 125 50 L 140 50 L 140 42 Z"
              fill={phase === 2 ? "#00FF29" : "#A3A3A3"}
              opacity="0.6"
              animate={{
                fill: phase === 2 ? "#00FF29" : "#A3A3A3",
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Wheels */}
            <circle cx="55" cy="80" r="15" fill="#262626" />
            <circle cx="55" cy="80" r="8" fill="#525252" />
            <circle cx="145" cy="80" r="15" fill="#262626" />
            <circle cx="145" cy="80" r="8" fill="#525252" />
          </svg>

          {/* Wrapping animation overlay */}
          <AnimatePresence>
            {phase === 1 && (
              <>
                {/* Wrapping tool/squeegee */}
                <motion.div
                  className="absolute top-8 left-0 w-1 h-20 bg-neutral-800 rounded-full"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: [0, 200], opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "linear" }}
                />

                {/* Sparkle effects */}
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${i * 25}%`,
                      top: `${30 + Math.random() * 20}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -20],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.3,
                      repeat: 2,
                    }}
                  >
                    <Sparkles size={16} className="text-brand" />
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
                <div className="text-sm text-neutral-600">Standard Lack</div>
              </div>
            )}
            {phase === 1 && (
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-brand">Folierung läuft...</div>
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
                <div className="text-sm text-neutral-950 font-bold">Premium Car-Wrapping</div>
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
        Car-Wrapping Process
      </div>
    </div>
  );
};
