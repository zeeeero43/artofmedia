import React from 'react';
import { motion } from 'framer-motion';

export const ColorPaletteVisualizer: React.FC = () => {
  const palettes = [
    ['#00FF29', '#0A0A0A', '#F5F5F5', '#737373', '#E5E5E5'],
    ['#FF0080', '#1A1A1A', '#FFFFFF', '#8B8B8B', '#D0D0D0'],
    ['#00D4FF', '#050505', '#FAFAFA', '#666666', '#CCCCCC'],
    ['#FFD700', '#0F0F0F', '#F0F0F0', '#707070', '#DADADA'],
  ];

  return (
    <div className="w-full h-[300px] bg-white rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-200">
      <div className="flex gap-3 md:gap-4 w-full max-w-3xl justify-center">
        {[0, 1, 2, 3, 4].map((boxIndex) => (
          <motion.div
            key={boxIndex}
            className="w-16 h-16 md:w-20 md:h-20 rounded-sm"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              backgroundColor: palettes.map(p => p[boxIndex]),
            }}
            transition={{
              opacity: { duration: 0.4, delay: boxIndex * 0.1 },
              scale: { duration: 0.4, delay: boxIndex * 0.1, type: "spring" },
              backgroundColor: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              backgroundColor: palettes[0][boxIndex],
            }}
          />
        ))}
      </div>
    </div>
  );
};
