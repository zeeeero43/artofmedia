
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrambleText } from './ui/scramble-text';

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-20 pb-20 overflow-hidden z-10">
      
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-[1400px]"
      >
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
              Websites, die verkaufen • Marken, die auffallen
            </span>
          </div>
        </motion.div>

        {/* Massive Headline */}
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-neutral-950 mb-8 sm:mb-12 uppercase max-w-6xl mx-auto">
          <span className="block">MARKETING</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 to-neutral-700">
            <ScrambleText text="AGENTUR" speed={50} delay={200} />
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4 tracking-normal text-neutral-600">
            Duisburg
          </span>
        </h1>

        {/* Subline */}
        <p className="max-w-3xl text-lg md:text-xl font-medium text-neutral-500 leading-relaxed">
          Webdesign, E-Commerce & Werbetechnik. Digital und Physisch. Websites, die verkaufen – Marken, die auffallen.
        </p>

      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Scrollen</span>
        <div className="w-[1px] h-16 bg-neutral-200 overflow-hidden">
           <motion.div 
             className="w-full h-full bg-brand"
             animate={{ y: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
           />
        </div>
      </motion.div>
    </section>
  );
};
