import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Snowflake, Shield } from 'lucide-react';

export const WeatherResistanceVisualizer: React.FC = () => {
  const [weather, setWeather] = useState<'rain' | 'snow'>('rain');

  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => prev === 'rain' ? 'snow' : 'rain');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-72 bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-xl relative">

      {/* Split Screen Container */}
      <div className="flex h-full">

        {/* LEFT: Traditional Neon (Failing) */}
        <div className="w-1/2 relative bg-neutral-800 border-r border-neutral-700">
          {/* Weather particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(weather === 'rain' ? 40 : 30)].map((_, i) => (
              weather === 'rain' ? (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: Math.random() * 100 + '%' }}
                  animate={{ y: '120%' }}
                  transition={{
                    duration: Math.random() * 0.5 + 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-0.5 h-8 bg-blue-300/60"
                  style={{ left: Math.random() * 100 + '%' }}
                />
              ) : (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: Math.random() * 100 + '%' }}
                  animate={{
                    y: '120%',
                    rotate: [0, 360]
                  }}
                  transition={{
                    y: { duration: Math.random() * 2 + 2, repeat: Infinity },
                    rotate: { duration: 2, repeat: Infinity },
                    delay: Math.random() * 2
                  }}
                  className="absolute"
                  style={{ left: Math.random() * 100 + '%' }}
                >
                  <Snowflake size={12} className="text-white/80" />
                </motion.div>
              )
            ))}
          </div>

          {/* Sign - Flickering/Failing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                opacity: [0.3, 0.1, 0.5, 0.2, 0.4, 0.1],
                textShadow: [
                  '0 0 5px rgba(239,68,68,0.3)',
                  '0 0 2px rgba(239,68,68,0.1)',
                  '0 0 8px rgba(239,68,68,0.4)',
                  '0 0 0px rgba(239,68,68,0)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-display font-bold text-4xl text-red-500"
            >
              LOGO
            </motion.div>

            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="mt-4 text-xs text-red-400 font-bold"
            >
              FLACKERT
            </motion.div>
          </div>

          {/* Label */}
          <div className="absolute top-3 left-3 text-xs font-bold uppercase text-neutral-500">
            Traditionell
          </div>
        </div>

        {/* RIGHT: LED (Weather Resistant) */}
        <div className="w-1/2 relative bg-neutral-950">
          {/* Weather particles (same as left) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(weather === 'rain' ? 40 : 30)].map((_, i) => (
              weather === 'rain' ? (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: Math.random() * 100 + '%' }}
                  animate={{ y: '120%' }}
                  transition={{
                    duration: Math.random() * 0.5 + 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-0.5 h-8 bg-blue-300/60"
                  style={{ left: Math.random() * 100 + '%' }}
                />
              ) : (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: Math.random() * 100 + '%' }}
                  animate={{
                    y: '120%',
                    rotate: [0, 360]
                  }}
                  transition={{
                    y: { duration: Math.random() * 2 + 2, repeat: Infinity },
                    rotate: { duration: 2, repeat: Infinity },
                    delay: Math.random() * 2
                  }}
                  className="absolute"
                  style={{ left: Math.random() * 100 + '%' }}
                >
                  <Snowflake size={12} className="text-white/80" />
                </motion.div>
              )
            ))}
          </div>

          {/* Sign - Bright and Stable */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                textShadow: [
                  '0 0 20px rgba(0,255,41,0.6)',
                  '0 0 30px rgba(0,255,41,0.8)',
                  '0 0 20px rgba(0,255,41,0.6)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-display font-bold text-4xl text-brand"
            >
              LOGO
            </motion.div>

            <div className="mt-4 text-xs text-brand font-bold">
              100% HELL
            </div>

            {/* Glow underneath */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-32 h-16 bg-brand/30 blur-2xl rounded-full"
            />
          </div>

          {/* IP65 Badge */}
          <div className="absolute top-3 right-3 bg-brand/20 border border-brand/40 px-2 py-1 rounded flex items-center gap-1">
            <Shield size={12} className="text-brand" />
            <span className="text-xs font-bold text-brand">IP65</span>
          </div>

          {/* Label */}
          <div className="absolute top-3 left-3 text-xs font-bold uppercase text-brand">
            LED Premium
          </div>
        </div>
      </div>

      {/* Weather indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
        {weather === 'rain' ? (
          <>
            <CloudRain size={14} className="text-blue-400" />
            <span className="text-xs font-mono text-blue-400 font-bold">REGEN</span>
          </>
        ) : (
          <>
            <Snowflake size={14} className="text-white" />
            <span className="text-xs font-mono text-white font-bold">SCHNEE</span>
          </>
        )}
      </div>
    </div>
  );
};
