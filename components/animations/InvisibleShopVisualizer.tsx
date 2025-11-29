import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const InvisibleShopVisualizer: React.FC = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex items-center justify-center relative overflow-hidden shadow-xl">
      <div className="flex gap-8 items-end">
        {/* Shops with signs */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-32 bg-neutral-700 rounded-t-lg border border-neutral-600 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-6 bg-brand rounded text-[8px] font-bold text-neutral-950 flex items-center justify-center shadow-lg">
              SHOP A
            </div>
          </div>
          <div className="text-xs text-neutral-500 font-mono">Sichtbar</div>
        </div>

        {/* YOUR SHOP - NO SIGN (pulsing alert) */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-20 h-32 bg-neutral-800 rounded-t-lg border-2 border-red-500/50 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>
          <div className="text-xs text-red-500 font-mono font-bold">DEIN LADEN</div>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-32 bg-neutral-700 rounded-t-lg border border-neutral-600 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-6 bg-brand rounded text-[8px] font-bold text-neutral-950 flex items-center justify-center shadow-lg">
              SHOP B
            </div>
          </div>
          <div className="text-xs text-neutral-500 font-mono">Sichtbar</div>
        </div>
      </div>

      {/* Background text */}
      <div className="absolute bottom-4 right-4 text-neutral-900 text-xs font-mono">
        Kein Schild = Unsichtbar
      </div>
    </div>
  );
};
