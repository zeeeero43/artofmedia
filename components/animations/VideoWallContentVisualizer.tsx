import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Megaphone } from 'lucide-react';

type ContentType = 'sports' | 'event' | 'ad';

interface Content {
  type: ContentType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

const contentData: Content[] = [
  {
    type: 'sports',
    icon: <Trophy size={32} />,
    title: 'FC BAYERN',
    subtitle: '3:1 LIVE',
    color: '#dc2626'
  },
  {
    type: 'event',
    icon: <Calendar size={32} />,
    title: 'SOMMERFEST',
    subtitle: 'SA 18:00 UHR',
    color: '#2563eb'
  },
  {
    type: 'ad',
    icon: <Megaphone size={32} />,
    title: '20% RABATT',
    subtitle: 'NUR HEUTE',
    color: '#00FF29'
  }
];

export const VideoWallContentVisualizer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contentData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = contentData[currentIndex];

  return (
    <div className="w-full h-72 bg-neutral-950 rounded-lg border-2 border-neutral-800 overflow-hidden shadow-2xl relative">

      {/* Video Wall Frame/Bezel */}
      <div className="absolute inset-0 border-8 border-neutral-900 rounded-lg pointer-events-none z-10" />

      {/* LED Pixels Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-20"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      />

      {/* Content Display */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-center w-full"
            style={{ color: currentContent.color }}
          >
            {/* Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 flex justify-center"
            >
              {currentContent.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="font-display font-black text-4xl md:text-5xl mb-2 tracking-tight"
              style={{
                textShadow: `0 0 20px ${currentContent.color}, 0 0 40px ${currentContent.color}`
              }}
            >
              {currentContent.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-bold tracking-widest"
            >
              {currentContent.subtitle}
            </motion.p>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-4 h-1 w-32 mx-auto rounded-full"
              style={{
                backgroundColor: currentContent.color,
                boxShadow: `0 0 10px ${currentContent.color}`
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {contentData.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              backgroundColor: index === currentIndex ? '#00FF29' : '#404040'
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>

      {/* Label */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-brand/30">
        <span className="text-xs font-mono text-brand font-bold">LED VIDEOWAND</span>
      </div>

      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-lg blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: currentContent.color }}
      />
    </div>
  );
};
