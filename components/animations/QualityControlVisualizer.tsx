import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const QualityControlVisualizer: React.FC = () => {
  const badges = [
    'Passgenau',
    'Blasenfrei',
    'Perfekt',
  ];

  return (
    <div className="w-full h-[300px] bg-neutral-950 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      <div className="grid grid-cols-2 gap-6 md:gap-8 w-full max-w-3xl">
        {/* Before (In Progress) */}
        <motion.div
          className="relative aspect-[4/3] bg-neutral-800 rounded-sm border border-neutral-700 flex items-center justify-center"
          initial={{ rotate: -2, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          animate={{
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className="text-neutral-500 text-xs md:text-sm font-mono uppercase">Vorher</span>
        </motion.div>

        {/* After (Perfect) */}
        <motion.div
          className="relative aspect-[4/3] bg-neutral-800 rounded-sm border-2 border-brand flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 150,
          }}
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 41, 0.3)',
          }}
        >
          <span className="text-brand text-xs md:text-sm font-mono uppercase font-bold">Nachher</span>
        </motion.div>
      </div>

      {/* Quality Badges */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 bg-brand text-neutral-950 px-3 md:px-4 py-1.5 md:py-2 rounded-full"
            initial={{ scale: 0, y: 20 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 1 + i * 0.15,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Check className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
            <span className="text-xs font-bold uppercase tracking-wide">
              {badge}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
