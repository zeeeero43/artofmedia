import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ProductionFlowVisualizer: React.FC = () => {
  const stages = [
    { title: 'Druck', color: '#00FF29' },
    { title: 'Schnitt', color: '#737373' },
    { title: 'Finish', color: '#E5E5E5' },
  ];

  return (
    <div className="w-full h-[350px] bg-neutral-900 rounded-sm overflow-hidden relative flex items-center justify-center p-6 md:p-8 border border-neutral-800">
      <div className="flex items-center justify-center gap-3 md:gap-4 w-full max-w-3xl">
        {stages.map((stage, i) => (
          <React.Fragment key={i}>
            {/* Stage Box */}
            <motion.div
              className="flex-1 flex flex-col items-center gap-4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Visual */}
              <div className="w-full aspect-square bg-neutral-800 rounded-lg border border-neutral-700 relative overflow-hidden flex items-center justify-center">
                {/* Stage 1: Color Layers */}
                {i === 0 && (
                  <div className="relative w-full h-full flex flex-col justify-center gap-1 p-4">
                    {[0, 1, 2, 3].map((layer) => (
                      <motion.div
                        key={layer}
                        className="h-3 rounded-sm"
                        style={{
                          backgroundColor: `rgba(0, 255, 41, ${1 - layer * 0.2})`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.5 + layer * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Stage 2: Cutting Path */}
                {i === 1 && (
                  <svg className="w-full h-full p-4" viewBox="0 0 100 100">
                    <motion.path
                      d="M 20 20 L 80 20 L 80 80 L 20 80 Z"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="240"
                      initial={{ strokeDashoffset: 240 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 2,
                        delay: i * 0.5,
                        ease: "linear",
                      }}
                    />
                  </svg>
                )}

                {/* Stage 3: Assembly */}
                {i === 2 && (
                  <div className="relative w-full h-full p-4">
                    {[0, 1, 2].map((piece) => (
                      <motion.div
                        key={piece}
                        className="absolute w-8 h-8 bg-neutral-600 rounded-sm"
                        style={{
                          top: `${20 + piece * 25}%`,
                          left: `${20 + piece * 25}%`,
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.5 + piece * 0.2,
                          type: "spring",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Stage Title */}
              <motion.span
                className="text-white font-bold text-xs md:text-sm uppercase tracking-wider"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.5 + 0.3,
                }}
              >
                {stage.title}
              </motion.span>
            </motion.div>

            {/* Arrow */}
            {i < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.5 + 0.4,
                }}
              >
                <ArrowRight className="w-5 h-5 text-brand" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};
