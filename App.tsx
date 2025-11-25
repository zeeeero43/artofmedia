
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/hero-section';
import { ServiceBento } from './components/service-bento';
import { Switcher } from './components/switcher';
import { ProcessSection } from './components/process-section';
import { TrustSection } from './components/content-sections';
import { TrustBar } from './components/trust-bar';
import { DeepDiveGrid } from './components/detail-accordion';
import { Testimonials } from './components/testimonials';
import { FAQSection } from './components/faq-section';
import { ComparisonSection } from './components/comparison-section';
import { ServiceCategory } from './types';
import { MessageSquare } from 'lucide-react';
import { Preloader } from './components/preloader';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { ContactModal } from './components/contact-modal';
import { Topbar } from './components/topbar';
import { CookieConsentBanner } from './components/cookie-consent';
import { SEOHead, createLocalBusinessSchema, createWebsiteSchema } from './components/seo-head';

// Lazy-loaded page components for code-splitting
const WebdesignEcommercePage = lazy(() => import('./app/webdesign-ecommerce/page'));
const KIAutomatisierungenPage = lazy(() => import('./app/ki-automatisierungen/page'));
const BeratungStrategiePage = lazy(() => import('./app/beratung-strategie/page'));
const PrintFoliePage = lazy(() => import('./app/print-folie/page'));
const LichtLeuchttechnikPage = lazy(() => import('./app/licht-leuchttechnik/page'));
const GoogleMarketingPage = lazy(() => import('./app/google-marketing/page'));
const NotFoundPage = lazy(() => import('./app/404/page'));
const ImpressumPage = lazy(() => import('./app/impressum/page'));
const DatenschutzPage = lazy(() => import('./app/datenschutz/page'));
const MarketingAgenturDuisburgPage = lazy(() => import('./app/marketing-agentur-duisburg/page'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  // Global State
  const [hasPreloaderFinished, setHasPreloaderFinished] = useState(false);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
  const [mode, setMode] = useState<ServiceCategory>('digital');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { scrollY } = useScroll();
  
  // SESSION LOGIC: Check if user has already visited in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedArtOfMedia');
    
    if (hasVisited) {
      // Skip animations
      setHasPreloaderFinished(true);
      setHasEnteredSite(true);
      // Default to digital if skipped, or could store mode too
    } else {
      // First visit: Do nothing, let default state run (isLoading = true)
    }
  }, []);
  
  // Show CTA only after scrolling past Hero
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 800) {
      setShowFloatingCTA(true);
    } else {
      setShowFloatingCTA(false);
    }
  });

  // Handler when Preloader is done
  const handlePreloaderFinish = () => {
    setHasPreloaderFinished(true);
    setHasEnteredSite(true);
    sessionStorage.setItem('hasVisitedArtOfMedia', 'true');
  };

  // Home Page Component
  const HomePage = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        createLocalBusinessSchema(),
        createWebsiteSchema()
      ]
    };

    return (
      <main className="relative w-full min-h-screen bg-white text-neutral-950 font-sans selection:bg-brand selection:text-black">
        {/* SEO Meta Tags */}
        <SEOHead
          title="Marketing Agentur Duisburg | Webdesign & Werbetechnik"
          description="Marketing-Agentur in Duisburg für Webdesign, E-Commerce, KI-Automatisierung und Werbetechnik. Digital und Physisch. Strategie und Umsetzung, die messbar Umsatz bringt."
          canonical="https://artofmedia-marketing.de"
          keywords="Marketing Agentur Duisburg, Webdesign Duisburg, Werbetechnik Duisburg, KI Automatisierung, E-Commerce, Fahrzeugbeschriftung, LED Lichttechnik"
          structuredData={structuredData}
        />

        {/* 1. Preloader - Conditional based on state */}
        {!hasPreloaderFinished && !hasEnteredSite && (
           <Preloader onFinish={handlePreloaderFinish} />
        )}

      
      {/* 3. Main Site Content */}
      <div className={`transition-opacity duration-1000 ${hasEnteredSite ? 'opacity-100' : 'opacity-0'}`}>

          {/* Global Swiss Grid Texture - Fixed Background */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          {/* Topbar */}
          <Topbar />

          {/* Navigation */}
          <Navigation />

          {/* 1. Hero */}
          <HeroSection />

          {/* 2. Trust Bar - Immediate Authority */}
          <div className="relative z-10 bg-white border-b border-neutral-200">
            <TrustBar />
          </div>

          {/* 3. Intro Statement (Editorial Style) */}
          <section className="relative z-10 py-24 md:py-32 px-6 bg-white border-b border-neutral-200">
             <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl leading-tight mb-6 sm:mb-8">
                  "Unsichtbar sein<br/>kostet Geld."
                </h2>
                <div className="w-[1px] h-16 bg-brand mx-auto mb-8" />
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Die meisten Websites sehen gut aus, verkaufen aber nicht.
                  Wir bauen digitale Systeme und physische Markenpräsenz, die messbar Umsatz bringen.
                </p>
             </div>
          </section>

          {/* 4. Mode Switcher Section */}
          <section className="relative z-10 py-16 px-6 bg-neutral-50 border-b border-neutral-200">
             <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                   <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-neutral-950 mb-4">
                      Unsere Leistungen
                   </h3>
                   <p className="text-neutral-600 text-base md:text-lg">
                      Wähle deinen Fokus: Digital oder Physisch
                   </p>
                </div>
                <div className="max-w-2xl mx-auto">
                   <Switcher activeMode={mode} onChange={setMode} />
                </div>
             </div>
          </section>

          {/* 5. Service Bento Grid */}
          <div className="relative z-10 bg-white">
            <ServiceBento activeMode={mode} />
          </div>

          {/* 6. BENEFIT GRID (Deep Dive) */}
          <div className="relative z-10 bg-white border-t border-neutral-200">
            <DeepDiveGrid onContactClick={() => setIsContactOpen(true)} />
          </div>

          {/* 7. Interactive Process Timeline */}
          <div className="relative z-10 bg-white">
            <ProcessSection activeMode={mode} />
          </div>

          {/* 8. TRANSFORMATION SLIDER (Before/After) */}
          <div className="relative z-10 bg-white border-t border-neutral-200">
             <ComparisonSection activeMode={mode} />
          </div>

          {/* 9. DASHBOARD STATS */}
          <div className="relative z-10 bg-white border-t border-neutral-200">
             <TrustSection />
          </div>

          {/* 10. VISUAL TESTIMONIALS */}
          <div className="relative z-10 bg-white border-t border-neutral-200">
            <Testimonials />
          </div>

          {/* 11. MASSIVE FAQ */}
          <div className="relative z-10 bg-white border-t border-neutral-200">
            <FAQSection />
          </div>

          {/* 12. Inverted Impact Footer */}
          <Footer onContactClick={() => setIsContactOpen(true)} />

          {/* Floating Conversion Button */}
          <AnimatePresence>
            {showFloatingCTA && (
              <motion.button
                onClick={() => setIsContactOpen(true)}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-brand text-neutral-950 rounded-full shadow-[0_0_20px_rgba(0,255,41,0.4)] flex items-center justify-center cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Global Contact Modal */}
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </main>
    );
  };

  return (
    <>
      <CookieConsentBanner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/webdesign-ecommerce" element={<WebdesignEcommercePage />} />
          <Route path="/ki-automatisierungen" element={<KIAutomatisierungenPage />} />
          <Route path="/beratung-strategie" element={<BeratungStrategiePage />} />
          <Route path="/print-folie" element={<PrintFoliePage />} />
          <Route path="/licht-leuchttechnik" element={<LichtLeuchttechnikPage />} />
          <Route path="/google-marketing" element={<GoogleMarketingPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/marketing-agentur-duisburg" element={<MarketingAgenturDuisburgPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
