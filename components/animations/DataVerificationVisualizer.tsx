import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const DataVerificationVisualizer: React.FC = () => {
  const checkItems = [
    'Druckdaten',
    'Vektoren',
    'Farbräume',
    'Auflösung',
  ];

  return (
    <div className="w-full h-[280px] bg-neutral-900 rounded-sm overflow-hidden relative flex items-center justify-center p-8 md:p-12 border border-neutral-800">
      <div className="flex flex-col gap-3 w-full max-w-md">
        {checkItems.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 bg-neutral-800/50 p-3 rounded-lg border border-neutral-700"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: i * 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Checkbox */}
            <motion.div
              className="w-6 h-6 rounded border-2 border-brand bg-brand/20 flex items-center justify-center shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.4 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.4 + 0.3,
                  ease: "easeOut",
                }}
              >
                <Check className="w-4 h-4 text-brand" strokeWidth={3} />
              </motion.div>
            </motion.div>

            {/* Label */}
            <motion.span
              className="text-white font-medium text-sm md:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.4 + 0.2,
              }}
            >
              {item}
            </motion.span>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.4 + 0.4,
              }}
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 41, 0.2)',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
