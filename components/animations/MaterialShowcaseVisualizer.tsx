import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const MaterialShowcaseVisualizer: React.FC = () => {
  const materials = [
    { name: 'Hochglanzfolie', color: '#00FF29' },
    { name: 'Mattfolie', color: '#737373' },
    { name: 'Papier Premium', color: '#E5E5E5' },
    { name: 'Strukturfolie', color: '#A3A3A3' },
  ];

  const [currentMaterial, setCurrentMaterial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMaterial((prev) => (prev + 1) % materials.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[320px] bg-neutral-900 rounded-sm overflow-hidden relative flex items-center justify-center p-8 border border-neutral-800">
      <div className="flex flex-col items-center gap-6">
        {/* Material Sample */}
        <motion.div
          key={currentMaterial}
          className="w-48 h-48 rounded-lg border-2 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{
            borderColor: materials[currentMaterial].color,
            backgroundColor: `${materials[currentMaterial].color}20`,
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold" style={{ color: materials[currentMaterial].color }}>
              {materials[currentMaterial].name}
            </div>
          </motion.div>
        </motion.div>

        {/* Material Indicators */}
        <div className="flex gap-2">
          {materials.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: i === currentMaterial ? '#00FF29' : '#525252',
                scale: i === currentMaterial ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
