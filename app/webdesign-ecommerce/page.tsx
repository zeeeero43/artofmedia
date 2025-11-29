
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Eye, MousePointer2, Banknote, Hourglass, UserMinus, ShoppingCart, User, X, BarChart3, AlertTriangle, MousePointerClick, RefreshCw, Lock, Smartphone, Frown, Meh, Angry, TrendingUp, Star, Quote, Globe, ArrowUpRight } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { PageSpeedModal } from '../../components/pagespeed-modal';
import { SEOHead, createBreadcrumbSchema, createServiceSchema } from '../../components/seo-head';
import { Breadcrumb } from '../../components/breadcrumb';

// Reusable FAQ Component
const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-8 flex justify-between items-center text-left hover:text-brand transition-colors group"
      >
        <span className="font-display font-bold text-xl md:text-2xl text-neutral-950 group-hover:text-brand transition-colors pr-8">
            {q}
        </span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-brand' : 'text-neutral-400'}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg text-neutral-600 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- OPTIMIZED GERMAN ANIMATIONS ---

// 1. Geld verbrennen: Geld RAUS → Nichts ZURÜCK (Simpler Flow)
const MoneyBurnSimple = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex items-center justify-between relative overflow-hidden shadow-xl">

       {/* LEFT: Dein Geld (wird WENIGER) */}
       <div className="flex flex-col items-center gap-4 z-20">
          <div className="text-center">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Deine Ausgaben</div>
             <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-4 py-3 border border-neutral-700 min-w-[140px]">
                <Banknote size={20} className="text-red-500 shrink-0" />
                <motion.div
                  className="text-lg font-sans font-bold text-red-500 tabular-nums whitespace-nowrap"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  -€<Counter target={5000} duration={8} prefix="" />
                </motion.div>
             </div>
             <div className="text-xs text-neutral-500 mt-2">Google Ads Rechnung</div>
          </div>
       </div>

       {/* CENTER: Flow Arrow */}
       <div className="flex-1 flex items-center justify-center relative">
          <motion.div
             className="flex items-center gap-2"
             animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
             transition={{ duration: 2, repeat: Infinity }}
          >
             <div className="text-red-500 text-4xl font-bold">→</div>
          </motion.div>

          {/* Burning Money Particles */}
          {[1, 2, 3, 4].map((i) => (
             <motion.div
                key={i}
                className="absolute"
                style={{ left: `${20 + i * 15}%` }}
                animate={{
                   y: [0, -40, -60],
                   opacity: [0, 1, 0],
                   scale: [1, 1.2, 0.5]
                }}
                transition={{
                   duration: 2.5,
                   repeat: Infinity,
                   delay: i * 0.5,
                   ease: "easeOut"
                }}
             >
                <Banknote size={20} className="text-red-500/60" />
             </motion.div>
          ))}
       </div>

       {/* RIGHT: Dein Umsatz (bleibt bei NULL) */}
       <div className="flex flex-col items-center gap-4 z-20">
          <div className="text-center">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Dein Umsatz</div>
             <div className="flex items-center gap-2 bg-neutral-950 rounded-lg px-4 py-3 border-2 border-neutral-700 min-w-[140px]">
                <X size={20} className="text-neutral-600 shrink-0" />
                <div className="text-lg font-sans font-bold text-neutral-600 tabular-nums whitespace-nowrap">
                  €0
                </div>
             </div>
             <div className="text-xs text-neutral-600 mt-2">Nichts verkauft</div>
          </div>
       </div>

       {/* Background Glow (Red = Danger) */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

// Counter Helper
const Counter = ({ target, duration, prefix = "" }: { target: number, duration: number, prefix?: string }) => {
   const [count, setCount] = useState(0);
   useEffect(() => {
     let start = 0;
     const increment = target / (duration * 60);
     const timer = setInterval(() => {
       start += increment;
       if (start >= target) start = 0; // Loop
       setCount(start);
     }, 1000 / 60);
     return () => clearInterval(timer);
   }, [target, duration]);
   return <>{prefix}{Math.floor(count).toLocaleString()}</>;
};

// 2. Zeit verschwenden: Realistisches "Hängenbleiben" mit wütendem Emoji
const LoadingSimple = () => {
  return (
    <div className="w-full h-64 bg-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-xl">
       <div className="absolute top-0 left-0 w-full h-6 bg-neutral-300 border-b border-neutral-400 flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
       </div>

       <div className="flex flex-col items-center gap-6 w-full max-w-[200px]">
          {/* Face Morphing: Meh -> Angry when stuck */}
          <div className="relative w-16 h-16 text-neutral-400">
             <motion.div
               animate={{ opacity: [1, 1, 0, 0, 1] }} // Visible at start/end
               transition={{ duration: 6, times: [0, 0.4, 0.45, 0.95, 1], repeat: Infinity }}
               className="absolute inset-0"
             >
                <Meh size={64} />
             </motion.div>
             <motion.div
               animate={{ 
                 opacity: [0, 0, 1, 1, 0], 
                 scale: [0.8, 0.8, 1.2, 1.2, 0.8],
                 rotate: [0, 0, -10, 10, -10, 10, 0], // Shake head
                 color: ["#9ca3af", "#9ca3af", "#ef4444", "#ef4444", "#9ca3af"] 
               }} 
               transition={{ duration: 6, times: [0, 0.4, 0.45, 0.95, 1], repeat: Infinity }}
               className="absolute inset-0 text-red-500"
             >
                <Angry size={64} />
             </motion.div>
          </div>

          {/* Loading Bar Stuck - Realistic Stutter */}
          <div className="w-full h-4 bg-neutral-300 rounded-full overflow-hidden border border-neutral-400">
             <motion.div 
               className="h-full bg-neutral-800"
               animate={{ width: ["0%", "30%", "30%", "32%", "32%", "35%", "35%"] }} // Stuck around 30-35%
               transition={{ 
                 duration: 6, 
                 times: [0, 0.1, 0.4, 0.5, 0.7, 0.8, 1],
                 repeat: Infinity 
               }}
             />
          </div>
          
          <motion.span 
             animate={{ opacity: [1, 0.5, 1] }}
             transition={{ duration: 0.8, repeat: Infinity }}
             className="font-mono text-sm font-bold uppercase tracking-widest text-neutral-500"
          >
             Lädt...
          </motion.span>
       </div>
    </div>
  );
};

// 3. Kunde weg: Präziser Klick
const CompetitorMoveSimple = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex overflow-hidden shadow-xl relative">
       {/* Left: Your Site (Bad) */}
       <div className="w-1/2 border-r border-neutral-800 bg-neutral-950 p-4 flex flex-col items-center justify-center opacity-50 grayscale">
          <span className="text-neutral-500 text-xs font-bold uppercase mb-4">Deine Seite</span>
          <div className="w-24 h-10 border border-neutral-700 rounded flex items-center justify-center text-[10px] text-neutral-600 select-none">
             Fehler 404
          </div>
       </div>

       {/* Right: Competitor (Good) */}
       <div className="w-1/2 bg-neutral-900 p-4 flex flex-col items-center justify-center relative z-0">
          <span className="text-brand text-xs font-bold uppercase mb-4">Konkurrenz</span>
          
          {/* Button */}
          <motion.div 
            animate={{ 
                scale: [1, 1, 1, 0.9, 1, 1],
                backgroundColor: ["#00FF29", "#00FF29", "#00FF29", "#00CC21", "#00FF29", "#00FF29"]
            }}
            transition={{ 
                duration: 4, 
                times: [0, 0.6, 0.65, 0.7, 0.75, 1], 
                repeat: Infinity 
            }}
            className="relative z-10 w-24 h-10 bg-brand rounded flex items-center justify-center text-xs text-neutral-950 font-bold shadow-[0_0_15px_rgba(0,255,41,0.3)]"
          >
             Kaufen
          </motion.div>
          
          {/* Purchase Success Feedback (Higher Z-Index) */}
          <motion.div
             animate={{ opacity: [0, 0, 0, 0, 1, 0], y: [0, 0, 0, 0, -30, -40] }}
             transition={{ duration: 4, times: [0, 0.7, 0.71, 0.72, 0.8, 1], repeat: Infinity }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 text-brand font-bold text-lg z-50 pointer-events-none whitespace-nowrap"
          >
             + Umsatz
          </motion.div>
       </div>

       {/* Cursor Animation - Precision Movement */}
       <motion.div
         className="absolute z-[100] top-0 left-0 pointer-events-none"
         animate={{ 
            x: ["20%", "20%", "75%", "75%", "75%", "20%"], // From left center to right center (75% is visually centered in right half)
            y: ["50%", "50%", "50%", "50%", "50%", "50%"], // Stay vertically centered
            scale: [1, 1, 1, 0.9, 1, 1] // Click scale
         }}
         transition={{ 
            duration: 4, 
            times: [0, 0.2, 0.5, 0.7, 0.9, 1], 
            repeat: Infinity,
            ease: "easeInOut"
         }}
         style={{ width: '100%', height: '100%' }}
       >
          {/* Center the cursor tip on the coordinate */}
          <div className="relative w-6 h-6 -translate-x-[2px] -translate-y-[2px]"> 
             <MousePointer2 className="text-white drop-shadow-md fill-black absolute top-0 left-0" size={24} />
             {/* Click Ripple */}
             <motion.div 
                animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 2.8 }} 
                className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-white/50 opacity-0"
             />
          </div>
       </motion.div>
    </div>
  );
};


// --- EXISTING NEURO DESIGN VISUALIZER ---
const NeuroVisualizer = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[400px] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800 group">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Mockup Website Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/4 bg-neutral-950 border border-neutral-800 rounded flex flex-col p-4 shadow-xl">
         {/* Wireframe Header */}
         <div className="flex justify-between items-center mb-6 md:mb-8 opacity-30">
            <div className="w-16 md:w-20 h-2 bg-white rounded-full" />
            <div className="flex gap-2">
               <div className="w-6 md:w-8 h-2 bg-white rounded-full" />
               <div className="w-6 md:w-8 h-2 bg-white rounded-full" />
            </div>
         </div>

         {/* Wireframe Content */}
         <div className="flex gap-4 h-full">
            <div className="w-1/2 flex flex-col justify-center space-y-3 md:space-y-4">
               <div className="w-3/4 h-3 md:h-4 bg-white/20 rounded animate-pulse" />
               <div className="w-full h-1.5 md:h-2 bg-white/10 rounded" />
               <div className="w-5/6 h-1.5 md:h-2 bg-white/10 rounded" />
               <div className="w-4/5 h-1.5 md:h-2 bg-white/10 rounded" />
               <div className="w-full h-1.5 md:h-2 bg-white/10 rounded" />
               <div className="w-3/4 h-1.5 md:h-2 bg-white/10 rounded" />

               {/* TARGET CTA */}
               <motion.div
                 className="mt-4 md:mt-6 w-28 md:w-32 h-8 md:h-10 bg-brand/20 border border-brand rounded flex items-center justify-center relative"
                 animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 20px rgba(0,255,41,0.5)", "0 0 0px rgba(0,255,41,0)"]
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: 2 }}
               >
                  <div className="w-12 md:w-16 h-1.5 md:h-2 bg-brand rounded" />
               </motion.div>
            </div>
            <div className="w-1/2 bg-neutral-800 rounded relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
            </div>
         </div>
      </div>


      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-brand uppercase tracking-widest">
         Fokus-Simulation
      </div>
    </div>
  );
};


export default function WebdesignPage() {
  const { scrollYProgress } = useScroll();
  const scaleBar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPageSpeedOpen, setIsPageSpeedOpen] = useState(false);

  // Scroll to top instantly when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleContactClick = () => setIsContactOpen(true);
  const handlePageSpeedClick = () => setIsPageSpeedOpen(true);

  // SEO Data
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://artofmedia-marketing.de/' },
    { name: 'Webdesign & E-Commerce', url: 'https://artofmedia-marketing.de/webdesign-ecommerce' }
  ]);

  const serviceSchema = createServiceSchema(
    'Webdesign & E-Commerce',
    'Professionelles Webdesign und E-Commerce Lösungen aus Duisburg. Moderne Websites, Online-Shops und Conversion-Optimierung für maximalen Umsatz.',
    'https://artofmedia-marketing.de/webdesign-ecommerce'
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie lange dauert es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unternehmens-Website: 2-3 Wochen. Online Shop: 4-6 Wochen. Du musst nichts technisches machen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist, wenn mir das Design nicht gefällt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir designen nicht nach unserem Geschmack, sondern nach dem, was bei deinen Kunden funktioniert. Wir zeigen dir vorher Entwürfe."
        }
      },
      {
        "@type": "Question",
        "name": "Funktioniert das auch für meine Branche?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Egal ob Handwerker, Anwalt, Berater oder Online-Shop - die Prinzipien sind gleich: Vertrauen aufbauen, Einwände auflösen, zum Kauf führen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist nach dem Launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Du kannst alles selbst ändern (Texte, Bilder). Bei technischen Problemen: Wir sind da."
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, serviceSchema, faqSchema]
  };

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      <SEOHead
        title="Webdesign & E-Commerce Duisburg | art.of.media"
        description="Professionelles Webdesign & E-Commerce aus Duisburg. Moderne Websites, Online-Shops & Conversion-Optimierung. Jetzt kostenlos beraten lassen!"
        canonical="https://artofmedia-marketing.de/webdesign-ecommerce"
        keywords="Webdesign Duisburg, E-Commerce Duisburg, Online Shop erstellen, Webdesign Agentur, Conversion Optimierung, Website erstellen lassen"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-webdesign.jpg"
      />

      {/* FIXED PROGRESS BAR (Funnel Indicator) */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      {/* NAV: Reusing Global Navigation */}
      <Navigation showBack={true} />

      {/* Breadcrumb Navigation */}
      <div className="pt-20 bg-white">
        <Breadcrumb items={[{ name: 'Webdesign & E-Commerce' }]} />
      </div>

      {/* 1. HERO */}
      <section className="relative pt-12 pb-32 px-6 overflow-hidden bg-white">
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
             <motion.div 
                animate={{ y: [0, -40] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]" 
             />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 border border-brand/30 bg-brand/5 text-neutral-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Umsatz-Optimierte Websites
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tighter text-neutral-900"
          >
            DEINE <span className="text-brand">WEBSITE</span><br />
            VERKAUFT NICHT?
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Die meisten Websites sind digitale Visitenkarten, die Geld verbrennen. 
            Wir bauen <span className="text-neutral-950 font-bold bg-brand/20 px-1">Verkaufsmaschinen</span>. 
            Optimiert für Google. Gebaut für <span className="text-neutral-950 font-bold bg-brand/20 px-1">Umsatz</span>.
          </motion.p>
          
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePageSpeedClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Jetzt Webseite checken kostenlos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
            
            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Gib deine Aktuelle Webseite ein - wir zeigen dir in 30 Sekunden warum du zu wenig Kunden hast.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. THE PROBLEM (Vertical Narrative Flow with Simple German Animations) */}
      <section className="py-32 px-6 bg-neutral-950 text-white relative overflow-hidden">
        {/* Background Pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          
          <div className="mb-24 text-center">
             <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                Die Realität
             </span>
             <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl leading-[0.9]">
                WARUM DU GELD <span className="text-red-500">VERBRENNST.</span>
             </h2>
          </div>

          <div className="space-y-40 relative">
            {/* STAGE 1: MONEY */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Banknote size={14} className="inline mr-2" /> Stufe 1: Geld verbrennen
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Du zahlst für Klicks, die nicht kaufen."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Dein Ad-Budget steigt, aber auf deiner Website passiert nichts. Google Ads Rechnungen kommen pünktlich – deine Kunden nicht.
                 </p>
               </div>
               
               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <MoneyBurnSimple />
               </div>
            </div>

            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -z-10" />

            {/* STAGE 2: TIME */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <LoadingSimple />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Hourglass size={14} className="inline mr-2" /> Stufe 2: Zeit verschwenden
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Während deine Seite lädt, ist der Kunde schon weg"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Lange Ladezeiten sind der Tod jeder Conversion. Wenn der Screen weiß bleibt, ist der Kunde weg.
                 </p>
               </div>
            </div>

            {/* STAGE 3: LOST */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <UserMinus size={14} className="inline mr-2" /> Stufe 3: Kunde weg
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Und am Ende kauft er woanders."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Frustration durch schlechtes Layout. Der Kunde erinnert sich nur an eins: Dass es nicht funktioniert hat.
                 </p>
               </div>
               
               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <CompetitorMoveSimple />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE DIFFERENCE (Split Screen) */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Wettbewerbsvorteil</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-900 uppercase">
              WAS IST DER UNTERSCHIED?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
             {/* LEFT: BAD (Standard) */}
             <motion.div
                whileHover={{ y: -8, scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-100 p-8 md:p-12 rounded-lg border border-neutral-200 flex flex-col h-full"
             >
                <div className="mb-8 pb-8 border-b border-neutral-200">
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Die Konkurrenz</div>
                   <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-400">Normale Website</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "WordPress-Templates. Deine Konkurrenz hat die gleiche Website.",
                      "Alte Technik. Google bestraft langsame Seiten mit schlechten Rankings.",
                      "Design ohne Strategie. Sieht hübsch aus, verkauft nichts.",
                      "Besucher sind verwirrt. Finden den Kaufen-Button nicht. Gehen woanders hin."
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-neutral-600 font-medium">
                         <X className="text-red-400 shrink-0 mt-1" size={24} />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>

             {/* RIGHT: GOOD (art.of.media) */}
             <motion.div
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 text-white relative overflow-hidden flex flex-col h-full transform md:-translate-y-4 shadow-2xl"
             >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 pb-8 border-b border-neutral-800 relative z-10">
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Unsere Lösung</div>
                   <h3 className="font-display font-bold text-3xl md:text-4xl text-white">Verkaufs-Website</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Maßgeschneidert für dein Business. Einzigartig. Unverwechselbar.",
                      "Modernste Technologie. Google liebt dich. Kunden finden dich automatisch.",
                      "Jedes Element hat einen Zweck: Verkaufen. Kein Schnickschnack.",
                      "Klarer Weg zum Ziel. Besucher wissen sofort, was sie tun sollen."
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-white font-medium text-lg">
                         <div className="bg-brand/20 p-1 rounded-full text-brand shrink-0 mt-0.5"><Check size={18} /></div>
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>
          </div>

          {/* CHART VISUALIZATION */}
          <div className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 opacity-50" />

             <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-24">
                {/* Text Side */}
                <div className="w-full md:w-1/3 text-center md:text-left">
                   <div className="flex items-center justify-center md:justify-start gap-2 text-brand font-bold uppercase tracking-widest text-xs mb-4">
                      <BarChart3 size={16} /> Messbares Ergebnis
                   </div>
                   <h3 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white leading-none mb-4">
                      300% <br/><span className="text-neutral-400 text-2xl md:text-3xl font-sans font-normal">Mehr Leads</span>
                   </h3>
                   <p className="text-neutral-400">Durchschnittliche Performance-Steigerung nach 3 Monaten.</p>
                </div>

                {/* Chart Side */}
                <div className="w-full md:w-2/3 space-y-8">
                    {/* Bar 1: Normale Website */}
                    <div className="relative">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500">
                          <span>Normale Website</span>
                          <span>2-3 Anfragen / Woche</span>
                       </div>
                       <div className="h-10 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "20%" }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-neutral-700"
                          />
                       </div>
                    </div>

                    {/* Bar 2: art.of.media */}
                    <div className="relative">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-white">
                          <span className="flex items-center gap-2">art.of.media <span className="bg-brand text-black text-[10px] px-2 rounded-full">PRO</span></span>
                          <span className="text-brand">8-12 Anfragen / Woche</span>
                       </div>
                       <div className="h-14 bg-neutral-900 rounded-full overflow-hidden border border-brand/30 shadow-[0_0_15px_rgba(0,255,41,0.1)]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                            className="h-full bg-brand relative"
                          >
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-40 animate-[slide_1s_linear_infinite]" />
                          </motion.div>
                       </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. NEURO DESIGN (Psychology) */}
      <section className="py-32 px-6 bg-neutral-50 border-y border-neutral-200 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
             
             <div className="order-2 md:order-1">
                <NeuroVisualizer />
             </div>
             
             <div className="order-1 md:order-2 flex flex-col justify-center">
                <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                   Verkaufspsychologie
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-8 leading-tight">
                   DESIGN, DAS<br/>VERKAUFT.
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                   Menschen treffen Entscheidungen in Sekunden. 
                   Entweder deine Website führt sie zur richtigen Stelle – oder sie verlassen deine Seite verwirrt.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                   Wir designen so, dass der Blick automatisch dorthin geht, wo er sein soll: Zum Angebot. Zum Preis. Zum Kaufen-Button.
                </p>
                <p className="text-lg text-neutral-950 font-bold leading-relaxed mb-8">
                   <span className="bg-brand/20 px-1">Weniger Ablenkung = Mehr Umsatz.</span>
                </p>
                
                <div className="flex gap-4">
                   <div className="px-4 py-3 bg-white border border-neutral-200 font-bold text-sm uppercase tracking-wide shadow-sm flex items-center gap-2">
                      <Eye size={16} className="text-brand" /> Fokus-Lenkung
                   </div>
                   <div className="px-4 py-3 bg-white border border-neutral-200 font-bold text-sm uppercase tracking-wide shadow-sm flex items-center gap-2">
                      <MousePointer2 size={16} className="text-brand" /> Conversion
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. SCOPE & OFFERS - 2 COLUMNS (Focus Section) */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl mb-6">WÄHLE DEINEN FOKUS</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
               Wir verkaufen keine Stunden. Wir verkaufen Ergebnisse. 
               Wähle das Fundament für dein Wachstum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* CARD 1: CORPORATE (Standard High End) */}
            <motion.div
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="flex flex-col relative p-10 border-2 border-neutral-950 bg-white text-neutral-950 shadow-xl group"
            >
              <div className="mb-6">
                 <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Fokus: Marke</span>
              </div>
              <h3 className="font-display font-bold text-4xl mb-4">Unternehmens-Website</h3>
              <p className="text-sm font-bold text-neutral-600 mb-8 min-h-[3rem]">
                → Perfekt für: Vertrauen aufbauen, Google-Rankings dominieren
              </p>
              <div className="space-y-4 mb-12 flex-grow">
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Bis zu 10 Unterseiten</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Einfach selbst Texte ändern</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Optimiert für Google</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Modernes Design</li>
              </div>
              <button 
                onClick={handleContactClick}
                className="w-full py-5 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-neutral-950 hover:text-white transition-colors"
              >
                KOSTENLOSES STRATEGIEGESPRÄCH
              </button>
            </motion.div>

            {/* CARD 2: ONLINE SHOP (Brand Green, Inverted) */}
            <motion.div
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 60px rgba(0, 255, 41, 0.3)" }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="flex flex-col p-10 border-2 border-brand bg-neutral-950 text-white shadow-[0_0_40px_rgba(0,255,41,0.2)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-brand text-neutral-950 text-xs font-bold px-4 py-2 uppercase tracking-widest">E-Commerce</div>
              
              <div className="mb-6 relative z-10">
                 <span className="bg-white text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Fokus: Verkauf</span>
              </div>
              <h3 className="font-display font-bold text-4xl mb-4 text-brand relative z-10">Online Shop</h3>
              <p className="text-sm font-bold text-neutral-400 mb-8 min-h-[3rem] relative z-10">
                 → Perfekt für: Viele Produkte, automatisch verkaufen
              </p>
              <div className="space-y-4 mb-12 flex-grow relative z-10">
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><ShoppingCart size={20} className="text-brand" /> Design & Einrichtung</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Warenwirtschaft Anbindung</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Optimierter Kaufprozess</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Mehrsprachigkeit</li>
              </div>
              <button 
                onClick={handleContactClick}
                className="w-full py-5 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors relative z-10"
              >
                KOSTENLOSES STRATEGIEGESPRÄCH
              </button>
              
              {/* Green Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: CASE STUDY BROWSER WINDOWS - TEMPORARILY HIDDEN
      <section className="py-24 px-6 bg-neutral-900 border-t border-neutral-800 text-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
           <div className="mb-20 text-center">
              <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">Echte Ergebnisse</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl text-white uppercase leading-[0.9]">
                 Websites, die<br/>performen.
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              Case 1: Shop
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="group col-span-1 md:col-span-2 relative h-[500px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 Browser Header
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 flex-1 h-6 bg-neutral-900 rounded text-[10px] text-neutral-600 flex items-center justify-center font-mono">
                       fashion-brand.com
                    </div>
                 </div>
                 Content
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">+214% Umsatz</span>
                          <span className="bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20">Shopify Migration</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">Fashion Label Relaunch</h3>
                       <p className="text-neutral-400">"Der neue Checkout ist extrem schnell. Die Kunden lieben es."</p>
                    </div>
                 </div>
              </motion.div>

              Case 2: Ranking
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="group col-span-1 h-[500px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 Browser Header
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 </div>
                 Content
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">Platz #1</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">SEO Dominanz</h3>
                       <p className="text-neutral-400">"Wir sind bei allen Keywords ganz oben. Der Traffic ist explodiert."</p>
                    </div>
                 </div>
              </motion.div>

              Case 3: Corporate
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="group col-span-1 h-[400px] md:h-[400px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                 </div>
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                       <h3 className="text-2xl font-display font-bold text-white mb-1">Corporate Design</h3>
                       <p className="text-brand text-sm font-bold">Rebranding & Web</p>
                    </div>
                 </div>
              </motion.div>

               Case 4: Speed
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.5 }}
                 className="group col-span-1 md:col-span-2 h-[400px] md:h-[400px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                 </div>
                 <div className="relative flex-grow overflow-hidden flex items-center justify-center bg-neutral-900">
                    Speed Visualization
                    <div className="flex gap-12 text-center">
                        <div>
                           <div className="text-6xl font-display font-bold text-brand mb-2">100</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Performance</div>
                        </div>
                        <div>
                           <div className="text-6xl font-display font-bold text-brand mb-2">100</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">SEO</div>
                        </div>
                        <div>
                           <div className="text-6xl font-display font-bold text-brand mb-2">0.4s</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Ladezeit</div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                         <div className="inline-block bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20 mb-2">
                           Next.js Highspeed
                         </div>
                       <h3 className="text-2xl font-display font-bold text-white mb-1">Technische Perfektion</h3>
                    </div>
                 </div>
              </motion.div>

           </div>
        </div>
      </section>
      */}

       {/* 7. FAQ */}
       <section className="py-24 px-6 bg-white border-t border-neutral-200">
          <div className="container mx-auto max-w-4xl">
             <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
             <div className="space-y-0 border-t border-neutral-200">
                <FaqItem q="Wie lange dauert es?" a="Unternehmens-Website: 2-3 Wochen. Online Shop: 4-6 Wochen. Du musst nichts technisches machen." />
                <FaqItem q="Was ist, wenn mir das Design nicht gefällt?" a="Wir designen nicht nach unserem Geschmack, sondern nach dem, was bei deinen Kunden funktioniert. Wir zeigen dir vorher Entwürfe." />
                <FaqItem q="Funktioniert das auch für meine Branche?" a="Ja. Egal ob Handwerker, Anwalt, Berater oder Online-Shop - die Prinzipien sind gleich: Vertrauen aufbauen, Einwände auflösen, zum Kauf führen." />
                <FaqItem q="Was ist nach dem Launch?" a="Du kannst alles selbst ändern (Texte, Bilder). Bei technischen Problemen: Wir sind da." />
             </div>
          </div>
       </section>

       {/* 8. FOOTER CTA */}
       <Footer showMainCta={true} onContactClick={handleContactClick} />

       <PageSpeedModal
         isOpen={isPageSpeedOpen}
         onClose={() => setIsPageSpeedOpen(false)}
         onOpenContact={handleContactClick}
       />
       <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Webdesign & E-Commerce" />
    </main>
  );
}
