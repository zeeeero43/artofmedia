
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Eye, MousePointer2, Banknote, Hourglass, UserMinus, ShoppingCart, User, X, BarChart3, AlertTriangle, MousePointerClick, RefreshCw, Lock, Smartphone, Frown, Meh, Angry, TrendingUp, Star, Quote, Globe, ArrowUpRight, MessageSquare, Cpu, Zap } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { PageSpeedModal } from '../../components/pagespeed-modal';
import { SEOHead, createBreadcrumbSchema, createServiceSchema } from '../../components/seo-head';

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

// --- KI-SPECIFIC ANIMATIONS ---

// 1. Zeit-Vergleich: Manuell (10 Min) vs KI (2 Sek)
const TimeComparisonAnimation = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex overflow-hidden shadow-xl relative">
       {/* Left: Manual (Slow) */}
       <div className="w-1/2 border-r border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center">
          <div className="text-center w-full">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Manuell</div>

             {/* Person Icon */}
             <motion.div
                className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                <User size={24} className="text-neutral-400" />
             </motion.div>

             {/* Timer */}
             <div className="flex items-center justify-center gap-2 mb-2">
                <Hourglass size={16} className="text-red-400" />
                <motion.div className="text-3xl font-sans font-bold text-red-400 tabular-nums">
                   <Counter target={600} duration={12} prefix="" />s
                </motion.div>
             </div>
             <div className="text-xs text-neutral-600">10 Minuten pro Anfrage</div>
          </div>
       </div>

       {/* Right: KI (Fast) */}
       <div className="w-1/2 bg-neutral-900 p-6 flex flex-col items-center justify-center relative">
          <div className="text-center w-full relative z-10">
             <div className="text-[10px] font-mono uppercase tracking-widest text-brand mb-4">Mit KI</div>

             {/* KI Icon */}
             <motion.div
                className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4"
                animate={{
                   boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 20px rgba(0,255,41,0.4)", "0 0 0px rgba(0,255,41,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                <Cpu size={24} className="text-brand" />
             </motion.div>

             {/* Fixed Time */}
             <div className="flex items-center justify-center gap-2 mb-2">
                <Zap size={16} className="text-brand" />
                <div className="text-3xl font-sans font-bold text-brand tabular-nums">
                   2s
                </div>
             </div>
             <div className="text-xs text-neutral-400">Sofort beantwortet</div>
          </div>

          {/* Checkmark */}
          <motion.div
             className="absolute top-6 right-6"
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ delay: 2, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
          >
             <Check className="w-6 h-6 text-brand" />
          </motion.div>
       </div>
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

// 2. 24/7 Verfügbarkeit: Nacht OFFLINE vs ONLINE
const NightSupportAnimation = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex overflow-hidden shadow-xl relative">
       {/* Left: Offline (Mensch schläft) */}
       <div className="w-1/2 border-r border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center">
          <div className="text-center w-full">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Ohne KI</div>

             {/* Nighttime */}
             <motion.div
                className="mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
             >
                <div className="text-4xl">🌙</div>
             </motion.div>

             {/* Time */}
             <div className="text-xl font-display font-bold text-neutral-400 mb-3 tabular-nums">
                23:00 Uhr
             </div>

             {/* Status: OFFLINE */}
             <motion.div
                className="inline-flex items-center gap-2 bg-red-500/20 border-2 border-red-500 px-4 py-2 rounded-lg"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
             >
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-bold uppercase tracking-widest text-red-400">OFFLINE</span>
             </motion.div>

             <div className="text-xs text-neutral-600 mt-3">Kunde wartet...</div>
          </div>
       </div>

       {/* Right: Online (KI antwortet) */}
       <div className="w-1/2 bg-neutral-900 p-6 flex flex-col items-center justify-center relative">
          <div className="text-center w-full relative z-10">
             <div className="text-[10px] font-mono uppercase tracking-widest text-brand mb-4">Mit KI</div>

             {/* Same Nighttime */}
             <motion.div
                className="mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
             >
                <div className="text-4xl">🌙</div>
             </motion.div>

             {/* Same Time */}
             <div className="text-xl font-display font-bold text-neutral-200 mb-3 tabular-nums">
                23:00 Uhr
             </div>

             {/* Status: ONLINE */}
             <motion.div
                className="inline-flex items-center gap-2 bg-brand/20 border-2 border-brand px-4 py-2 rounded-lg"
                animate={{
                   boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 15px rgba(0,255,41,0.4)", "0 0 0px rgba(0,255,41,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                <motion.div
                   className="w-2 h-2 rounded-full bg-brand"
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm font-bold uppercase tracking-widest text-brand">ONLINE</span>
             </motion.div>

             <div className="text-xs text-neutral-400 mt-3">KI antwortet sofort</div>
          </div>
       </div>
    </div>
  );
};

// 3. Skalierung: Mehr Menschen vs gleiche KI
const ScalingAnimation = () => {
  const [requests, setRequests] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev === 10 ? 100 : 10);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const peopleNeeded = Math.ceil(requests / 10);

  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex overflow-hidden shadow-xl relative">
       {/* Left: Manual Scaling (More People Needed) */}
       <div className="w-1/2 border-r border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center">
          <div className="text-center w-full">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Ohne KI</div>

             {/* Request Counter */}
             <div className="flex items-center justify-center gap-2 mb-4">
                <BarChart3 size={16} className="text-neutral-400" />
                <motion.div
                   key={requests}
                   initial={{ scale: 1.2, color: "#00FF29" }}
                   animate={{ scale: 1, color: "#a3a3a3" }}
                   className="text-2xl font-display font-black text-neutral-400 tabular-nums"
                >
                   {requests}
                </motion.div>
                <span className="text-xs text-neutral-500">Anfragen</span>
             </div>

             {/* People Icons (Increasing) */}
             <div className="flex flex-wrap gap-2 justify-center items-center min-h-[60px]">
                {Array.from({ length: Math.min(peopleNeeded, 10) }).map((_, i) => (
                   <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-red-400"
                   >
                      <User size={20} />
                   </motion.div>
                ))}
                {peopleNeeded > 10 && (
                   <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-lg font-bold text-red-400"
                   >
                      +{peopleNeeded - 10}
                   </motion.span>
                )}
             </div>

             <div className="text-xs text-neutral-600 mt-3">
                {peopleNeeded} {peopleNeeded === 1 ? 'Person' : 'Personen'} nötig
             </div>
          </div>
       </div>

       {/* Right: KI Scaling (Same Resources) */}
       <div className="w-1/2 bg-neutral-900 p-6 flex flex-col items-center justify-center relative">
          <div className="text-center w-full relative z-10">
             <div className="text-[10px] font-mono uppercase tracking-widest text-brand mb-4">Mit KI</div>

             {/* Same Request Counter */}
             <div className="flex items-center justify-center gap-2 mb-4">
                <BarChart3 size={16} className="text-brand" />
                <motion.div
                   key={`ki-${requests}`}
                   initial={{ scale: 1.2 }}
                   animate={{ scale: 1 }}
                   className="text-2xl font-display font-black text-brand tabular-nums"
                >
                   {requests}
                </motion.div>
                <span className="text-xs text-neutral-400">Anfragen</span>
             </div>

             {/* Fixed Team: 1 Person + KI */}
             <div className="flex gap-3 justify-center items-center min-h-[60px]">
                <div className="text-neutral-200">
                   <User size={24} />
                </div>
                <div className="text-2xl font-bold text-neutral-600">+</div>
                <motion.div
                   className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center"
                   animate={{
                      boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 20px rgba(0,255,41,0.4)", "0 0 0px rgba(0,255,41,0)"]
                   }}
                   transition={{ duration: 2, repeat: Infinity }}
                >
                   <Cpu size={20} className="text-brand" />
                </motion.div>
             </div>

             <div className="text-xs text-neutral-400 mt-3">
                Immer 1 Person + KI
             </div>
          </div>
       </div>
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

               {/* TARGET CTA - Noch tiefer positioniert */}
               <motion.div
                 className="mt-16 md:mt-20 w-28 md:w-32 h-8 md:h-10 bg-brand/20 border border-brand rounded flex items-center justify-center relative"
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

      {/* Heatmap Overlay Effect - auf dem Button positioniert */}
      <motion.div
         className="absolute top-[270px] left-[140px] md:top-[300px] md:left-[145px] w-24 h-24 md:w-32 md:h-32 bg-brand/30 rounded-full blur-2xl pointer-events-none mix-blend-screen"
         animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1] }}
         transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-brand uppercase tracking-widest">
         Fokus-Simulation
      </div>
    </div>
  );
};


export default function KIAutomatisierungenPage() {
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
    { name: 'KI Automatisierung', url: 'https://artofmedia-marketing.de/ki-automatisierungen' }
  ]);

  const serviceSchema = createServiceSchema(
    'KI Automatisierung & Chatbots',
    'KI-gestützte Automatisierung für Unternehmen in Duisburg. Chatbots, Workflow-Automation und intelligente Prozesse für mehr Effizienz.',
    'https://artofmedia-marketing.de/ki-automatisierungen'
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie lange dauert die Implementierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KI-Chatbot: 1-2 Wochen. Workflow Automatisierung: 2-3 Wochen. KI-Sekretärin: 3-4 Wochen. Alles wird auf dein Business angepasst und trainiert."
        }
      },
      {
        "@type": "Question",
        "name": "Ersetzt die KI mein Team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. Die KI erledigt repetitive Aufgaben, die dein Team hassen. Dein Team fokussiert sich auf das, was nur Menschen können: Kreativität, Strategie, Beziehungen."
        }
      },
      {
        "@type": "Question",
        "name": "Was passiert, wenn die KI einen Fehler macht?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die KI wird auf dein Business trainiert und lernt ständig dazu. Bei kritischen Entscheidungen leitet sie automatisch an dein Team weiter. Du hast immer die Kontrolle."
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
        title="KI Automatisierung Duisburg | Workflows & Chatbots | art.of.media"
        description="KI-gestützte Automatisierung für Ihr Unternehmen in Duisburg. Chatbots, Workflow-Automation & intelligente Prozesse. Kostenlose Beratung!"
        canonical="https://artofmedia-marketing.de/ki-automatisierungen"
        keywords="KI Automatisierung, Chatbot erstellen, Workflow Automatisierung, KI Chatbot, Marketing Automation, KI Sekretärin, Duisburg"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-ki.jpg"
      />

      {/* FIXED PROGRESS BAR (Funnel Indicator) */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      {/* NAV: Reusing Global Navigation */}
      <Navigation showBack={true} />

      {/* 1. HERO */}
      <section className="relative pt-40 md:pt-48 pb-32 px-6 overflow-hidden bg-white">
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
            KI-Gestützte Automatisierung
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-3xl sm:text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tighter text-neutral-950"
          >
            KI ARBEITET.<br />
            DU NICHT.
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Während deine Konkurrenz schläft, arbeitet ihre KI. <span className="text-neutral-950 font-bold bg-brand/20 px-1">Chatbots die verkaufen</span>. Workflows die sich selbst erledigen. <span className="text-neutral-950 font-bold bg-brand/20 px-1">Support der nie Pause macht</span>.
          </motion.p>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactOpen(true)}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Kostenloses KI-Potenzial-Audit <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Wir zeigen dir in 15 Minuten, welche Prozesse du automatisieren kannst.
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
             <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl leading-[0.9]">
                WARUM DU NICHT <span className="text-red-500">SKALIERST.</span>
             </h2>
          </div>

          <div className="space-y-40">
            {/* STAGE 1: TIME */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Hourglass size={14} className="inline mr-2" /> Stufe 1: Zeit verbrennen
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Dein Team macht Arbeit, die eine KI in 2 Sekunden erledigt"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Support-Emails beantworten. Termine koordinieren. Daten eingeben. 40 Stunden pro Woche für Aufgaben, die kein Mensch machen sollte.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <TimeComparisonAnimation />
               </div>
            </div>

            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -z-10" />

            {/* STAGE 2: LEADS */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <NightSupportAnimation />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <UserMinus size={14} className="inline mr-2" /> Stufe 2: Kunden verlieren
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Während du schläfst, sucht dein Kunde woanders"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   23:00 Uhr - Kunde schreibt. 09:00 Uhr - Du antwortest. 09:01 Uhr - Er hat schon gekauft. Beim Konkurrenten mit Chatbot.
                 </p>
               </div>
            </div>

            {/* STAGE 3: SCALING */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <TrendingUp size={14} className="inline mr-2" /> Stufe 3: Unmöglich skalieren
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Mehr Kunden = Mehr Chaos"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Du willst wachsen? Dann brauchst du mehr Personal. Mehr Gehälter. Mehr Management. Mehr Probleme. Es gibt einen besseren Weg.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <ScalingAnimation />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE DIFFERENCE (Split Screen) */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Der Unterschied</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-950 uppercase">
              MANUELL VS. KI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
             {/* LEFT: BAD (Manual) */}
             <motion.div
                whileHover={{ y: -8, scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-100 p-8 md:p-12 rounded-lg border border-neutral-200 flex flex-col h-full"
             >
                <div className="mb-8 pb-8 border-b border-neutral-200">
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Alte Methode</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-neutral-400">Manuelle Prozesse</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "Team arbeitet 9-17 Uhr. Kunden schreiben um 22 Uhr. Keine Antwort.",
                      "10 Minuten pro Anfrage. 50 Anfragen = 500 Minuten Arbeit.",
                      "Mehr Kunden? Dann brauchst du mehr Menschen. Mehr Gehälter.",
                      "Menschen machen Fehler. Vergessen Follow-Ups. Übersehen Anfragen.",
                      "Kosten steigen proportional. Doppelte Anfragen = Doppelte Kosten."
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-neutral-600 font-medium">
                         <X className="text-red-400 shrink-0 mt-1" size={24} />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>

             {/* RIGHT: GOOD (KI) */}
             <motion.div
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 text-white relative overflow-hidden flex flex-col h-full transform md:-translate-y-4 shadow-2xl"
             >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 pb-8 border-b border-neutral-800 relative z-10">
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Die Zukunft</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-white">KI-Automatisierung</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Arbeitet 24/7/365. Keine Pausen. Keine Urlaube. Keine kranken Tage.",
                      "Bearbeitet 1000 Anfragen parallel. In Echtzeit. Ohne Wartezeit.",
                      "Mehr Kunden? Kein Problem. Unbegrenzte Skalierung ohne Mehrkosten.",
                      "100% Konsistenz. Kein vergessener Follow-Up. Keine übersehene Anfrage.",
                      "ROI nach 3 Monaten. Danach: Reiner Gewinn. Für immer."
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
                   <h3 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white leading-none mb-4">
                      80% <br/><span className="text-neutral-400 text-2xl md:text-3xl font-sans font-normal">Zeitersparnis</span>
                   </h3>
                   <p className="text-neutral-400">Durchschnittliche Zeit-Reduktion nach KI-Implementierung.</p>
                </div>

                {/* Chart Side */}
                <div className="w-full md:w-2/3 space-y-8">
                    {/* Bar 1: Manuell */}
                    <div className="relative">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500">
                          <span>Manuelle Arbeit</span>
                          <span>40 Std. / Woche</span>
                       </div>
                       <div className="h-10 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-neutral-700"
                          />
                       </div>
                    </div>

                    {/* Bar 2: Mit KI */}
                    <div className="relative">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-white">
                          <span className="flex items-center gap-2">Mit KI-Automatisierung <span className="bg-brand text-black text-[10px] px-2 rounded-full">SMART</span></span>
                          <span className="text-brand">8 Std. / Woche</span>
                       </div>
                       <div className="h-14 bg-neutral-900 rounded-full overflow-hidden border border-brand/30 shadow-[0_0_15px_rgba(0,255,41,0.1)]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "20%" }}
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

      {/* 5. KI IN ACTION */}
      <section className="py-32 px-6 bg-neutral-950 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
               Live Demo
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl mb-6 leading-tight">
               KI IN ACTION
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
               So sieht es aus, wenn deine KI für dich arbeitet. Automatisch. Intelligent. 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Chatbot Example */}
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex flex-col"
             >
                <div className="mb-6">
                   <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare size={24} className="text-brand" />
                   </div>
                   <h3 className="font-display font-bold text-2xl mb-2">KI-Chatbot</h3>
                   <p className="text-neutral-400 text-sm">Beantwortet Fragen sofort</p>
                </div>

                <div className="flex-grow space-y-4">
                   {/* Chat Messages */}
                   <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-neutral-800 rounded-lg p-4 text-sm"
                   >
                      <div className="text-neutral-500 text-xs mb-1">Kunde • 23:47 Uhr</div>
                      <div className="text-white">Habt ihr noch Plätze frei im März?</div>
                   </motion.div>

                   <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="bg-brand/20 border border-brand/30 rounded-lg p-4 text-sm ml-4"
                   >
                      <div className="text-brand text-xs mb-1">KI-Assistent • 23:47 Uhr</div>
                      <div className="text-white">Ja! Im März haben wir noch 3 Termine verfügbar. Soll ich dir die Optionen zeigen?</div>
                   </motion.div>

                   <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 text-brand text-xs"
                   >
                      <Check size={14} />
                      <span>Antwortzeit: 0.3 Sekunden</span>
                   </motion.div>
                </div>
             </motion.div>

             {/* Workflow Automation Example */}
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex flex-col"
             >
                <div className="mb-6">
                   <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4">
                      <RefreshCw size={24} className="text-brand" />
                   </div>
                   <h3 className="font-display font-bold text-2xl mb-2">Auto-Workflows</h3>
                   <p className="text-neutral-400 text-sm">Erledigt Aufgaben automatisch</p>
                </div>

                <div className="flex-grow space-y-4">
                   {/* Workflow Steps */}
                   {[
                      { label: "Anfrage erhalten", time: "09:00", done: true },
                      { label: "Daten validiert", time: "09:00", done: true },
                      { label: "Email gesendet", time: "09:00", done: true },
                      { label: "CRM aktualisiert", time: "09:01", done: true },
                      { label: "Follow-Up geplant", time: "09:01", done: false }
                   ].map((step, i) => (
                      <motion.div
                         key={i}
                         initial={{ opacity: 0, x: -10 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 + i * 0.1 }}
                         className="flex items-center gap-3"
                      >
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.done ? 'bg-brand' : 'bg-neutral-800 border border-neutral-700'}`}>
                            {step.done && <Check size={14} className="text-neutral-950" />}
                         </div>
                         <div className="flex-grow">
                            <div className={`text-sm ${step.done ? 'text-white' : 'text-neutral-500'}`}>{step.label}</div>
                            <div className="text-xs text-neutral-600">{step.time} Uhr</div>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </motion.div>

             {/* AI Secretary Example */}
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex flex-col"
             >
                <div className="mb-6">
                   <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4">
                      <User size={24} className="text-brand" />
                   </div>
                   <h3 className="font-display font-bold text-2xl mb-2">KI-Sekretärin</h3>
                   <p className="text-neutral-400 text-sm">Koordiniert & organisiert</p>
                </div>

                <div className="flex-grow space-y-4">
                   {/* Task List */}
                   {[
                      { task: "Termine koordiniert", count: 12 },
                      { task: "Emails sortiert", count: 47 },
                      { task: "Rechnungen erstellt", count: 8 },
                      { task: "Follow-Ups versendet", count: 23 }
                   ].map((item, i) => (
                      <motion.div
                         key={i}
                         initial={{ opacity: 0, scale: 0.9 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 + i * 0.1 }}
                         className="bg-neutral-800 rounded-lg p-4"
                      >
                         <div className="flex items-center justify-between">
                            <span className="text-sm text-white">{item.task}</span>
                            <span className="text-brand font-bold text-lg">{item.count}</span>
                         </div>
                      </motion.div>
                   ))}

                   <div className="pt-4 border-t border-neutral-800">
                      <div className="text-xs text-neutral-500 mb-1">Heute gespart:</div>
                      <div className="text-2xl font-bold text-brand">3.2 Stunden</div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 6. SCOPE & OFFERS - 3 KI SERVICES */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl mb-6">WÄHLE DEINE KI-LÖSUNG</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
               Jede Lösung zahlt sich innerhalb von 3 Monaten aus. Danach: Reiner Gewinn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CARD 1: KI-CHATBOT */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="flex flex-col relative p-8 border-2 border-neutral-950 bg-white text-neutral-950 shadow-xl group"
            >
              <div className="mb-6">
                 <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-neutral-950" />
                 </div>
                 <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">24/7 Support</span>
              </div>
              <h3 className="font-display font-bold text-3xl mb-4">KI-Chatbot</h3>
              <p className="text-sm font-bold text-neutral-600 mb-8">
                → Beantwortet Fragen sofort. Qualifiziert Leads. Verkauft während du schläfst.
              </p>
              <div className="space-y-3 mb-12 flex-grow">
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Antwortet in unter 1 Sekunde</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Trainiert auf dein Business</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Erkennt Kaufabsicht</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Leitet an dein Team weiter</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Mehrsprachig verfügbar</li>
              </div>
              <button
                onClick={handleContactClick}
                className="w-full py-4 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-neutral-950 hover:text-white transition-colors"
              >
                DEMO ANFORDERN
              </button>
            </motion.div>

            {/* CARD 2: WORKFLOW AUTOMATISIERUNG (Featured) */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.3)" }}
               className="flex flex-col p-8 border-2 border-brand bg-neutral-950 text-white shadow-[0_0_40px_rgba(0,255,41,0.2)] group relative overflow-hidden transform md:-translate-y-4"
            >
              <div className="absolute top-0 right-0 bg-brand text-neutral-950 text-xs font-bold px-4 py-2 uppercase tracking-widest">Beliebt</div>

              <div className="mb-6 relative z-10">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <RefreshCw size={24} className="text-white" />
                 </div>
                 <span className="bg-white text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Autopilot</span>
              </div>
              <h3 className="font-display font-bold text-3xl mb-4 text-brand relative z-10">Workflow Automatisierung</h3>
              <p className="text-sm font-bold text-neutral-400 mb-8 relative z-10">
                 → Deine Prozesse laufen automatisch ab. Keine manuelle Arbeit mehr.
              </p>
              <div className="space-y-3 mb-12 flex-grow relative z-10">
                <li className="flex gap-3 text-base font-medium text-neutral-300"><Check size={18} className="text-brand shrink-0" /> Email-Automatisierung</li>
                <li className="flex gap-3 text-base font-medium text-neutral-300"><Check size={18} className="text-brand shrink-0" /> CRM-Integration</li>
                <li className="flex gap-3 text-base font-medium text-neutral-300"><Check size={18} className="text-brand shrink-0" /> Automatische Follow-Ups</li>
                <li className="flex gap-3 text-base font-medium text-neutral-300"><Check size={18} className="text-brand shrink-0" /> Daten-Synchronisation</li>
                <li className="flex gap-3 text-base font-medium text-neutral-300"><Check size={18} className="text-brand shrink-0" /> Reporting & Analytics</li>
              </div>
              <button
                onClick={handleContactClick}
                className="w-full py-4 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors relative z-10"
              >
                DEMO ANFORDERN
              </button>
            </motion.div>

            {/* CARD 3: KI-SEKRETÄRIN */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
               className="flex flex-col relative p-8 border-2 border-neutral-950 bg-white text-neutral-950 shadow-xl group"
            >
              <div className="mb-6">
                 <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <User size={24} className="text-neutral-950" />
                 </div>
                 <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Personal Assistant</span>
              </div>
              <h3 className="font-display font-bold text-3xl mb-4">KI-Sekretärin</h3>
              <p className="text-sm font-bold text-neutral-600 mb-8">
                → Organisiert deinen Alltag. Koordiniert Termine. Sortiert Emails.
              </p>
              <div className="space-y-3 mb-12 flex-grow">
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Terminkoordination</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Email-Management</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Rechnungserstellung</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Erinnerungen & Follow-Ups</li>
                <li className="flex gap-3 text-base font-medium"><Check size={18} className="text-brand shrink-0" /> Dokumentenverwaltung</li>
              </div>
              <button
                onClick={handleContactClick}
                className="w-full py-4 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-neutral-950 hover:text-white transition-colors"
              >
                DEMO ANFORDERN
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: CASE STUDY BROWSER WINDOWS */}
      <section className="py-24 px-6 bg-neutral-900 border-t border-neutral-800 text-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
           <div className="mb-20 text-center">
              <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">Echte Ergebnisse</span>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-white uppercase leading-[0.9]">
                 KI-Erfolge,<br/>die zählen.
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case 1: E-Commerce Chatbot */}
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="group col-span-1 md:col-span-2 relative h-[500px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 {/* Browser Header */}
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 flex-1 h-6 bg-neutral-900 rounded text-[10px] text-neutral-600 flex items-center justify-center font-mono">
                       electronics-shop.de
                    </div>
                 </div>
                 {/* Content */}
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556742400-b5d7c3e45594?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">+167% Konversion</span>
                          <span className="bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20">KI-Chatbot</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">E-Commerce Revolution</h3>
                       <p className="text-neutral-400">"Der Chatbot beantwortet 400 Fragen pro Tag. Nachts verkauft er mehr als mein Team tagsüber."</p>
                    </div>
                 </div>
              </motion.div>

              {/* Case 2: Service Business Automation */}
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="group col-span-1 h-[500px] bg-neutral-950 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              >
                 {/* Browser Header */}
                 <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 </div>
                 {/* Content */}
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">32 Std./Woche gespart</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">Workflow Automation</h3>
                       <p className="text-neutral-400">"Alles läuft automatisch. Anfragen, Follow-Ups, Rechnungen. Ich fokussiere mich nur noch auf Strategie."</p>
                    </div>
                 </div>
              </motion.div>

              {/* Case 3: Agency Secretary */}
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
                    <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                       <h3 className="text-2xl font-display font-bold text-white mb-1">Marketing Agentur</h3>
                       <p className="text-brand text-sm font-bold">KI-Sekretärin spart €4.200/Monat</p>
                    </div>
                 </div>
              </motion.div>

               {/* Case 4: Real-time Metrics */}
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
                    {/* KI Metrics Visualization */}
                    <div className="flex gap-12 text-center">
                        <div>
                           <div className="text-6xl font-display font-black text-brand mb-2">24/7</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Verfügbar</div>
                        </div>
                        <div>
                           <div className="text-6xl font-display font-black text-brand mb-2">0.3s</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Antwortzeit</div>
                        </div>
                        <div>
                           <div className="text-6xl font-display font-black text-brand mb-2">∞</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Kapazität</div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                         <div className="inline-block bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20 mb-2">
                           Live Metrics
                         </div>
                       <h3 className="text-2xl font-display font-bold text-white mb-1">KI arbeitet anders</h3>
                    </div>
                 </div>
              </motion.div>

           </div>
        </div>
      </section>

       {/* 7. FAQ */}
       <section className="py-24 px-6 bg-white border-t border-neutral-200">
          <div className="container mx-auto max-w-4xl">
             <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
             <div className="space-y-0 border-t border-neutral-200">
                <FaqItem q="Wie lange dauert die Implementierung?" a="KI-Chatbot: 1-2 Wochen. Workflow Automatisierung: 2-3 Wochen. KI-Sekretärin: 3-4 Wochen. Alles wird auf dein Business angepasst und trainiert." />
                <FaqItem q="Ersetzt die KI mein Team?" a="Nein. Die KI erledigt repetitive Aufgaben, die dein Team hassen. Dein Team fokussiert sich auf das, was nur Menschen können: Kreativität, Strategie, Beziehungen." />
                <FaqItem q="Was passiert, wenn die KI einen Fehler macht?" a="Die KI wird auf dein Business trainiert und lernt ständig dazu. Bei kritischen Entscheidungen leitet sie automatisch an dein Team weiter. Du hast immer die Kontrolle." />
                <FaqItem q="Funktioniert das für meine Branche?" a="Ja. Egal ob E-Commerce, Dienstleistung, B2B oder Beratung - überall gibt es repetitive Prozesse, die automatisiert werden können. Wir analysieren deine Workflows kostenlos." />
                <FaqItem q="Was kostet KI-Automatisierung?" a="Das hängt vom Umfang ab und wird individuell kalkuliert. Im kostenlosen Erstgespräch analysieren wir deine Prozesse und erstellen ein maßgeschneidertes Angebot. ROI nach durchschnittlich 3 Monaten." />
                <FaqItem q="Brauche ich technisches Wissen?" a="Nein. Wir richten alles ein, trainieren die KI, und übergeben ein fertiges System. Du interagierst mit einem simplen Dashboard. Kein Code. Keine Technik." />
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
       <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="KI Automatisierungen" />
    </main>
  );
}
