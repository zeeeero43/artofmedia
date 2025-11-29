
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { ServiceCategory } from '../types';

interface SwitcherProps {
  activeMode: ServiceCategory;
  onChange: (mode: ServiceCategory) => void;
}

export const Switcher: React.FC<SwitcherProps> = ({ activeMode, onChange }) => {
  return (
    <div className="w-full relative group">
      {/* Industrial Bezel */}
      <div className="relative flex p-1 bg-neutral-100 border border-neutral-200 rounded-sm">
        
        {/* The Sliding Mechanism */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 bg-white border border-neutral-200 shadow-sm z-0 rounded-sm"
          style={{
            left: activeMode === 'digital' ? '4px' : '50%',
            width: 'calc(50% - 4px)',
            x: activeMode === 'physical' ? '-2px' : '0px' 
          }}
        />

        {/* Button: Digital */}
        <button
          onClick={() => onChange('digital')}
          className="flex-1 relative z-10 py-3 sm:py-4 md:py-5 flex items-center justify-center gap-2 sm:gap-3 group/btn"
        >
          <div className={cn("w-2 h-2 rounded-full transition-all duration-300", activeMode === 'digital' ? "bg-brand shadow-[0_0_10px_#00FF29]" : "bg-neutral-300 group-hover/btn:bg-neutral-400")} />
          <span className={cn("font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-tight transition-colors duration-300", activeMode === 'digital' ? "text-neutral-900" : "text-neutral-500")}>
            Digital
          </span>
        </button>

        {/* Center Divider */}
        <div className="w-[1px] bg-neutral-200 my-2 z-0" />

        {/* Button: Physical */}
        <button
          onClick={() => onChange('physical')}
          className="flex-1 relative z-10 py-3 sm:py-4 md:py-5 flex items-center justify-center gap-2 sm:gap-3 group/btn"
        >
          <span className={cn("font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-tight transition-colors duration-300", activeMode === 'physical' ? "text-neutral-900" : "text-neutral-500")}>
            Physisch
          </span>
          <div className={cn("w-2 h-2 rounded-full transition-all duration-300", activeMode === 'physical' ? "bg-brand shadow-[0_0_10px_#00FF29]" : "bg-neutral-300 group-hover/btn:bg-neutral-400")} />
        </button>
      </div>
    </div>
  );
};
