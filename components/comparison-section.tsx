
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { ServiceCategory } from '../types';
import { cn } from '../lib/utils';

interface ComparisonSectionProps {
  activeMode: ServiceCategory;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ activeMode }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchStart = () => { isDragging.current = true; };
  const onTouchEnd = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const content = {
    digital: {
      title: "Website Transformation",
      beforeLabel: "Standard Template",
      afterLabel: "High-Performance",
      beforeImg: "/images/comparison/digital-before.webp",
      afterImg: "/images/comparison/digital-after.jpg"
    },
    physical: {
      title: "Fleet Branding",
      beforeLabel: "Ohne Branding",
      afterLabel: "Mobile Brand Awareness",
      beforeImg: "/images/comparison/physical-before.webp",
      afterImg: "/images/comparison/physical-after.webp"
    }
  };

  const current = content[activeMode];

  return (
    <section className="py-32 px-6 bg-neutral-50 border-t border-neutral-200 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        
        <div className="text-center mb-16">
           <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">
             Transformation
           </span>
           <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl uppercase text-neutral-900 leading-[0.9]">
             Der Unterschied
           </h2>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl cursor-ew-resize select-none group"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          {/* Image Right (After) - Base Layer */}
          <div className="absolute inset-0">
            <img
              src={current.afterImg}
              alt={`${current.title} - After transformation showing ${current.afterLabel} with professional modern design`}
              width="1920"
              height="1080"
              loading="lazy"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-8 right-8 bg-brand text-neutral-950 px-4 py-2 rounded-full font-bold uppercase text-xs tracking-widest">
              {current.afterLabel}
            </div>
          </div>

          {/* Image Left (Before) - Clipped Layer */}
          <div
            className="absolute inset-0 overflow-hidden border-r-4 border-brand"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={current.beforeImg}
              alt={`${current.title} - Before transformation showing ${current.beforeLabel}`}
              width="1920"
              height="1080"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover filter grayscale brightness-75"
              style={{ width: '100vw', maxWidth: 'unset' }}
              draggable={false}
            />
            {/* Correct positioning of image to counteract clipping */}
             <div className="absolute inset-0 w-full h-full overflow-hidden">
                 {/* We need a different approach for the clipped image to stay static. 
                     The easiest way in React without complex math is setting the image width to the container width 
                     but inside the clipped div. However, getting container width dynamically is tricky.
                     Instead, we use object-cover on both.
                 */}
             </div>
             <div className="absolute top-8 left-8 bg-neutral-900 text-white px-4 py-2 rounded-full font-bold uppercase text-xs tracking-widest">
              {current.beforeLabel}
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-transparent z-20 flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,41,0.5)] -ml-1">
              <MoveHorizontal size={24} className="text-neutral-950" />
            </div>
          </div>

          {/* Instruction Overlay (Fades out on interaction) */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500",
            sliderPosition !== 50 ? "opacity-0" : "opacity-100"
          )}>
            <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest">
              Ziehen zum Vergleichen
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
