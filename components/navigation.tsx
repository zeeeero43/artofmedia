import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  showBack?: boolean;
  onNavigate?: (path: string) => void;
}

const menuLinks = [
  { label: 'Webdesign & E-Commerce', path: '/webdesign-ecommerce' },
  { label: 'Google Marketing', path: '/google-marketing' },
  { label: 'KI Automatisierungen', path: '/ki-automatisierungen' },
  { label: 'Beratung & Strategie', path: '/beratung-strategie' },
  { label: 'Print & Folie', path: '/print-folie' },
  { label: 'Licht & Leuchttechnik', path: '/licht-leuchttechnik' },
];

export const Navigation: React.FC<NavigationProps> = ({ showBack = false, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-detect if we should show back button based on current route
  const shouldShowBack = showBack || (location.pathname !== '/');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className={`fixed ${shouldShowBack ? 'top-0' : 'top-12'} left-0 w-full z-50 px-4 sm:px-6 md:px-12 py-6 sm:py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none`}>
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg sm:text-xl tracking-tight pointer-events-auto cursor-pointer flex items-center gap-2 sm:gap-3"
          onClick={() => onNavigate?.('/')}
        >
          {shouldShowBack && <ArrowLeft size={18} className="text-white sm:w-5 sm:h-5" />}
          art.of.media
        </Link>

        {/* Desktop Navigation Links - Hidden but accessible for SEO */}
        <div className="hidden md:flex items-center gap-6 pointer-events-auto">
          {menuLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden pointer-events-auto p-2 -mr-2"
          aria-label="Menü öffnen"
        >
          <Menu size={24} className="text-white" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-neutral-950 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-800">
                <span className="font-display font-bold text-lg text-white">Menü</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-white hover:text-brand transition-colors"
                  aria-label="Menü schließen"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="px-6 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Services
                  </span>
                </div>
                {menuLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-left px-6 py-4 text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-brand bg-brand/10'
                          : 'text-white hover:text-brand hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-6 mx-6 border-t border-neutral-800" />

                {/* Legal Links */}
                <div className="px-6 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Rechtliches
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/impressum"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left px-6 py-3 text-base text-neutral-400 hover:text-white transition-colors"
                  >
                    Impressum
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <Link
                    to="/datenschutz"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left px-6 py-3 text-base text-neutral-400 hover:text-white transition-colors"
                  >
                    Datenschutz
                  </Link>
                </motion.div>
              </nav>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-neutral-800">
                <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest mb-2">
                  Kontakt
                </div>
                <a
                  href="tel:+491758000447"
                  className="block text-white hover:text-brand transition-colors mb-1"
                >
                  +49 (0) 175 8000 447
                </a>
                <a
                  href="mailto:info@artofmedia-marketing.de"
                  className="block text-neutral-400 hover:text-brand transition-colors text-sm"
                >
                  info@artofmedia-marketing.de
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
