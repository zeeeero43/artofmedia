import React from 'react';

export const Topbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-neutral-950 border-b border-neutral-800 py-3 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-3 text-white">
          {/* Green Dot Indicator */}
          <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />

          {/* Desktop: Full Text */}
          <span className="hidden md:flex items-center gap-3 text-sm font-sans text-neutral-300">
            <span className="text-white font-semibold">15+ Jahre Erfahrung</span>
            <span className="text-neutral-600">•</span>
            <span className="text-white font-semibold">100+ erfolgreiche Projekte</span>
            <span className="text-neutral-600">•</span>
            <span className="text-brand font-semibold">Kostenlose Erstberatung</span>
          </span>

          {/* Mobile: Short Version */}
          <span className="flex md:hidden text-sm font-sans text-brand font-semibold">
            Kostenlose Erstberatung
          </span>
        </div>
      </div>
    </div>
  );
};
