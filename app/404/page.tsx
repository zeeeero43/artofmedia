
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle, Code, Zap } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [glitchText, setGlitchText] = useState('404');

  // Glitch effect for the 404 number
  useEffect(() => {
    const glitchChars = '404ФΘЧЭЯԘ⁴⁰⁴';
    let interval: NodeJS.Timeout;

    const startGlitch = () => {
      let iterations = 0;
      interval = setInterval(() => {
        setGlitchText(prev => {
          if (iterations < 3) {
            iterations++;
            return glitchChars[Math.floor(Math.random() * glitchChars.length)] +
                   glitchChars[Math.floor(Math.random() * glitchChars.length)] +
                   glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return '404';
        });
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setGlitchText('404');
      }, 400);
    };

    // Initial glitch
    startGlitch();

    // Random glitches
    const randomGlitch = setInterval(() => {
      if (Math.random() > 0.7) {
        startGlitch();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(randomGlitch);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white font-sans overflow-hidden">

      {/* Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

        {/* Scanline Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent h-32 pointer-events-none"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Navigation */}
      <div className="relative z-30">
        <Navigation onNavigate={handleNavigate} showBack={false} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* 404 Number with Glitch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8"
          >
            <h1 className="font-display font-black text-[8rem] md:text-[10rem] lg:text-[12rem] leading-[0.8] tracking-tighter">
              <span className="relative inline-block">
                <span className="text-brand drop-shadow-[0_0_40px_rgba(0,255,41,0.6)]">
                  {glitchText}
                </span>
                {/* Glitch Layers */}
                <span
                  className="absolute top-0 left-0 text-brand opacity-70 mix-blend-screen"
                  style={{
                    transform: 'translate(-2px, 2px)',
                    filter: 'blur(1px)'
                  }}
                  aria-hidden="true"
                >
                  {glitchText}
                </span>
                <span
                  className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen"
                  style={{
                    transform: 'translate(2px, -2px)',
                    filter: 'blur(1px)'
                  }}
                  aria-hidden="true"
                >
                  {glitchText}
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Error Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="relative">
              <AlertTriangle className="text-brand" size={32} strokeWidth={2} />
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="text-brand" size={32} strokeWidth={2} />
              </motion.div>
            </div>
          </motion.div>

          {/* Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-white">
              SEITE NICHT GEFUNDEN
            </h2>
            <div className="w-[1px] h-16 bg-brand mx-auto mb-6" />
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Diese Seite existiert nicht (mehr) oder wurde verschoben.
              <br />
              <span className="text-brand font-medium">Aber keine Sorge</span> — wir helfen dir zurück auf den richtigen Weg.
            </p>
          </motion.div>

          {/* Action Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {/* Home Button Card */}
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-brand rounded-lg p-8 text-left transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 group-hover:bg-brand/20 border border-brand/20 group-hover:border-brand flex items-center justify-center transition-all duration-300">
                    <Home className="text-brand" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Zur Startseite</h3>
                </div>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Zurück zur Homepage und alle Services entdecken
                </p>
              </div>
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowLeft className="text-brand rotate-180" size={24} />
              </motion.div>
            </motion.button>

            {/* Contact Button Card */}
            <motion.button
              onClick={() => setIsContactOpen(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-brand rounded-lg p-8 text-left transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 group-hover:bg-brand/20 border border-brand/20 group-hover:border-brand flex items-center justify-center transition-all duration-300">
                    <Zap className="text-brand" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Kontakt</h3>
                </div>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Direkt mit uns sprechen und Projekt starten
                </p>
              </div>
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowLeft className="text-brand rotate-180" size={24} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-neutral-800 pt-8"
          >
            <p className="text-sm uppercase tracking-widest text-neutral-600 mb-6">Beliebte Seiten</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { label: 'Webdesign & E-Commerce', path: '/webdesign-ecommerce' },
                { label: 'KI-Automatisierungen', path: '/ki-automatisierungen' },
                { label: 'Beratung & Strategie', path: '/beratung-strategie' },
                { label: 'Print & Folie', path: '/print-folie' },
                { label: 'Licht & Leuchttechnik', path: '/licht-leuchttechnik' },
              ].map((link, index) => (
                <motion.button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-brand/50 rounded-full text-sm text-neutral-400 hover:text-brand transition-all duration-300"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-neutral-800"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-600">
              <Code size={14} />
              <span>ERROR_CODE: PAGE_NOT_FOUND</span>
              <span className="text-neutral-800">|</span>
              <span>STATUS: 404</span>
              <span className="text-neutral-800">|</span>
              <span className="text-brand">art.of.media</span>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer showMainCta={false} onContactClick={() => setIsContactOpen(true)} />
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default NotFoundPage;
