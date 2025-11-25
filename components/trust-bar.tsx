
import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "TechIndustries", "GlobalSolutions", "FutureBuild", "AlphaCons", "CreativeLabs", "NordicDesign"
];

export const TrustBar: React.FC = () => {
  return (
    <section className="py-12 border-b border-neutral-100 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-mono uppercase tracking-widest text-neutral-600">
          Vertrauen von Marktführern
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex space-x-24 animate-marquee whitespace-nowrap py-4"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <span key={index} className="text-2xl font-display font-bold text-neutral-300 uppercase tracking-tighter select-none hover:text-neutral-950 transition-colors duration-300 cursor-default">
              {logo}
            </span>
          ))}
        </motion.div>
        
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
};
