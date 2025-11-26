
import React, { useRef } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';
import { MetricItem } from '../types';

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current));

  React.useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

export const TrustSection: React.FC = () => {
  const metrics = [
    { label: "Jahre Erfahrung", value: 15, suffix: "+" },
    { label: "Projekte", value: 100, suffix: "+" },
    { label: "Retention Rate", value: 98, suffix: "%" },
  ];

  return (
    <section className="py-32 px-6 w-full bg-neutral-950 relative overflow-hidden text-white">
      {/* Background Chart Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path 
              d="M0 100 C 20 80, 40 100, 60 40 S 80 0, 100 20" 
              fill="none" 
              stroke="#00FF29" 
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path 
              d="M0 100 C 30 90, 50 80, 70 30 S 90 10, 100 0" 
              fill="none" 
              stroke="#00FF29" 
              strokeWidth="0.2"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            />
         </svg>
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 border-b border-neutral-800 pb-8">
           <h2 className="font-display font-bold text-4xl md:text-5xl text-center md:text-left">
             Ergebnisse,<br/><span className="text-brand">die skalieren.</span>
           </h2>
           <p className="text-neutral-400 max-w-md text-center md:text-right mt-6 md:mt-0 font-mono text-sm">
             Wir messen unseren Erfolg an Ihrem ROI.<br/>
             Daten lügen nicht.
           </p>
        </div>

        {/* Dashboard Grid - Centered 3 Cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col group items-center md:items-start text-center md:text-left"
            >
              {/* Technical Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-4 bg-neutral-800 group-hover:bg-brand transition-colors" />
                <span className="font-mono text-sm uppercase tracking-widest text-neutral-500 group-hover:text-brand transition-colors">
                  {metric.label}
                </span>
              </div>

              {/* Massive Number */}
              <div className="font-display font-light text-7xl xl:text-8xl text-white tracking-tighter flex items-baseline">
                <AnimatedCounter value={metric.value} />
                <span className="text-brand ml-1 font-normal text-4xl align-top mt-2">{metric.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
