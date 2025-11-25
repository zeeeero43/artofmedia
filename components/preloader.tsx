
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onFinish: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const words = [
    "Sichtbarkeit",
    "Dominanz",
    "Wachstum",
    "art.of.media"
  ];

  useEffect(() => {
    // Logic runs every time the component mounts (every reload)
    
    // Slower pace: 850ms per word
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 850); 

    // Total duration calculation + Buffer
    const timeout = setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
      // Trigger the parent callback after animation is effectively done
      setTimeout(() => {
         onFinish();
      }, 1000); // Wait for exit animation to complete
    }, (words.length * 850) + 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 1, 
              ease: [0.76, 0, 0.24, 1] // Custom bezier for a very smooth "heavy curtain" lift
            } 
          }}
          className="fixed inset-0 z-[10000] bg-neutral-950 flex flex-col items-center justify-center text-white overflow-hidden"
        >
          <div className="relative flex items-center justify-center overflow-hidden h-32 w-full px-4">
             <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className={`font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-center ${index === words.length - 1 ? "text-brand" : "text-white"}`}
                >
                  {words[index]}
                </motion.h1>
             </AnimatePresence>
          </div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="mt-12 flex items-center gap-3"
          >
             <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
             <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                Lade Experience...
             </span>
          </motion.div>
          
          {/* Background Noise */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
