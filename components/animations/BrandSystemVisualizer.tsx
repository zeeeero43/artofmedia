import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BrandSystemVisualizer: React.FC = () => {
  const gridItems = [
    'Logo', 'Color', 'Type',
    'Icons', 'Photo', 'Pattern',
    'Layout', 'Motion', 'Voice',
  ];

  // Photo ist bei Index 4, von dort ausgehend die Reihenfolge
  const activationOrder = [4, 1, 3, 5, 7, 0, 2, 6, 8]; // Start von Mitte, dann kreuzförmig nach außen

  const [activeBoxes, setActiveBoxes] = useState<number[]>([4]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < activationOrder.length) {
        setActiveBoxes(activationOrder.slice(0, currentIndex + 1));
      } else {
        // Reset
        setActiveBoxes([4]);
        currentIndex = 0;
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] bg-neutral-950 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl relative">
        {gridItems.map((item, i) => {
          const isActive = activeBoxes.includes(i);
          const isCenter = i === 4;

          return (
            <motion.div
              key={i}
              className={`
                aspect-square rounded-xl border-2
                flex items-center justify-center transition-all duration-500
                ${isActive ? 'border-brand bg-brand/10' : 'border-neutral-800 bg-neutral-900'}
              `}
              style={{ borderRadius: '12px' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                type: "spring",
                stiffness: 150,
              }}
            >
              {/* Item Content */}
              <motion.span
                className={`
                  text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-500
                  ${isActive ? 'text-brand' : 'text-neutral-400'}
                `}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {item}
              </motion.span>

              {/* Glow */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.3] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 41, 0.4)',
                    borderRadius: '12px',
                  }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Connecting Lines from center */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Lines from Photo (center) to other boxes */}
          {activeBoxes.length > 1 && activeBoxes.slice(1).map((targetIndex, i) => {
            const centerRow = 1, centerCol = 1; // Photo at grid position [1,1]
            const targetRow = Math.floor(targetIndex / 3);
            const targetCol = targetIndex % 3;

            const x1 = 33.33 * centerCol + 16.67;
            const y1 = 33.33 * centerRow + 16.67;
            const x2 = 33.33 * targetCol + 16.67;
            const y2 = 33.33 * targetRow + 16.67;

            return (
              <motion.line
                key={targetIndex}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#00FF29"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
