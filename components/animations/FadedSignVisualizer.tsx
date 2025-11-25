import React from 'react';
import { motion } from 'framer-motion';

export const FadedSignVisualizer: React.FC = () => {
  return (
    <div className="w-full h-64 bg-neutral-200 rounded-lg border border-neutral-300 overflow-hidden shadow-xl relative">
      {/* Split Screen */}
      <div className="flex h-full">
        {/* Left: Your faded sign */}
        <div className="w-1/2 bg-neutral-300 flex flex-col items-center justify-center border-r-2 border-neutral-400 relative">
          <span className="absolute top-4 text-neutral-500 text-xs font-bold uppercase">Dein Schild</span>
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-16 bg-neutral-400 border border-neutral-500 rounded flex items-center justify-center text-neutral-500 font-bold text-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent" />
            LOGO
          </motion.div>
          <div className="mt-4 text-xs text-neutral-500">Verblasst, alt</div>
        </div>

        {/* Right: Fresh competitor sign */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center relative">
          <span className="absolute top-4 text-neutral-900 text-xs font-bold uppercase">Konkurrenz</span>
          <motion.div
            animate={{
              boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 30px rgba(0,255,41,0.6)", "0 0 0px rgba(0,255,41,0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-16 bg-brand border-2 border-brand rounded flex items-center justify-center text-neutral-950 font-bold text-sm shadow-xl"
          >
            LOGO
          </motion.div>
          <div className="mt-4 text-xs text-brand font-bold">Neu, frisch</div>
        </div>
      </div>
    </div>
  );
};
