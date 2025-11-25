import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface NavigationProps {
  showBack?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-detect if we should show back button based on current route
  const shouldShowBack = showBack || (location.pathname !== '/');

  return (
    <nav className={`fixed ${shouldShowBack ? 'top-0' : 'top-12'} left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none`}>
      <div className="font-display font-bold text-xl tracking-tight pointer-events-auto cursor-pointer flex items-center gap-3" onClick={() => navigate('/')}>
        {shouldShowBack && <ArrowLeft size={20} className="text-white" />}
        art.of.media
      </div>
    </nav>
  );
};