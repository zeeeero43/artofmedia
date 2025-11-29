
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Eye, MousePointer2, Banknote, Hourglass, UserMinus, ShoppingCart, User, X, BarChart3, AlertTriangle, MousePointerClick, RefreshCw, Lock, Smartphone, Frown, Meh, Angry, TrendingUp, Star, Quote, Globe, ArrowUpRight, Zap, Target, Search, MapPin, DollarSign, TrendingDown, ChevronDown, Package } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
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

// --- CUSTOM GOOGLE MARKETING ANIMATIONS ---

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

// 1. Ad Budget Burn - Geld fließt in Google Ads, niedrige CTR, keine Conversions
const AdBudgetBurn = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 p-8 flex items-center justify-between relative overflow-hidden shadow-xl">

       {/* LEFT: Dein Budget */}
       <div className="flex flex-col items-center gap-4 z-20">
          <div className="text-center">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Dein Budget</div>
             <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-4 py-3 border border-neutral-700 min-w-[140px]">
                <DollarSign size={20} className="text-red-500 shrink-0" />
                <motion.div
                  className="text-lg font-sans font-bold text-red-500 tabular-nums whitespace-nowrap"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  -€<Counter target={3000} duration={8} prefix="" />
                </motion.div>
             </div>
             <div className="text-xs text-neutral-500 mt-2">Google Ads Kosten</div>
          </div>
       </div>

       {/* CENTER: Google Ads Box mit CTR */}
       <div className="flex flex-col items-center gap-2 z-20">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex flex-col items-center gap-2">
             <Zap className="text-brand" size={24} />
             <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">CTR</div>
             <motion.div
                className="text-2xl font-bold text-red-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
             >
                2.3%
             </motion.div>
          </div>

          {/* Flow Arrows */}
          <motion.div
             className="text-red-500 text-3xl font-bold"
             animate={{ x: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
             transition={{ duration: 1.5, repeat: Infinity }}
          >
             ↓
          </motion.div>
       </div>

       {/* RIGHT: Conversions (bleibt bei 0) */}
       <div className="flex flex-col items-center gap-4 z-20">
          <div className="text-center">
             <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Conversions</div>
             <div className="flex items-center gap-2 bg-neutral-950 rounded-lg px-4 py-3 border-2 border-neutral-700 min-w-[140px]">
                <X size={20} className="text-neutral-600 shrink-0" />
                <div className="text-lg font-sans font-bold text-neutral-600 tabular-nums whitespace-nowrap">
                  0
                </div>
             </div>
             <div className="text-xs text-neutral-600 mt-2">Keine Kunden</div>
          </div>
       </div>

       {/* Background Glow (Red = Danger) */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

// 2. Keyword Mismatch - Falsche Keywords, schlechte Position
const KeywordMismatch = () => {
  return (
    <div className="w-full h-64 bg-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-xl">
       {/* Browser Header */}
       <div className="absolute top-0 left-0 w-full h-6 bg-neutral-300 border-b border-neutral-400 flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
       </div>

       {/* Google Search Bar */}
       <div className="w-full max-w-md mb-8">
          <div className="bg-white rounded-full px-6 py-3 flex items-center gap-3 border-2 border-neutral-400 shadow-lg">
             <Search size={20} className="text-neutral-600" />
             <motion.div
                className="text-sm text-neutral-900 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                günstige nike schuhe kaufen...
             </motion.div>
          </div>
       </div>

       {/* Search Results with Positions */}
       <div className="w-full max-w-md space-y-2">
          {/* Competitors Position 1-3 */}
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-brand text-neutral-950 flex items-center justify-center text-xs font-bold">1</div>
             <div className="flex-1 bg-white border border-brand/30 rounded px-4 py-2 text-xs font-bold text-neutral-900 shadow-sm">
                Konkurrenz: Nike Schuhe 30% Rabatt
             </div>
          </div>

          {/* Position 8 - Deine Anzeige */}
          <motion.div
             className="flex items-center gap-3 opacity-30"
             animate={{ opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 2, repeat: Infinity }}
          >
             <div className="w-8 h-8 rounded-full bg-neutral-400 text-white flex items-center justify-center text-xs font-bold">8</div>
             <div className="flex-1 bg-white border border-neutral-300 rounded px-4 py-2 text-xs font-medium text-neutral-500">
                Deine Anzeige: Schuhe online kaufen
             </div>
          </motion.div>
       </div>

       {/* Warning Label */}
       <div className="absolute bottom-4 right-4 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Zu breit gefasst
       </div>
    </div>
  );
};

// 3. SERP Competition - Kunde scrollt an dir vorbei zur Konkurrenz
const SERPCompetition = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex flex-col overflow-hidden shadow-xl relative">
       {/* Google Header Simulation */}
       <div className="w-full bg-neutral-800 border-b border-neutral-700 px-4 py-2 flex items-center gap-2">
          <Globe size={16} className="text-brand" />
          <span className="text-xs text-neutral-400 font-mono">Google Suchergebnisse</span>
       </div>

       {/* Search Results */}
       <div className="flex-1 bg-neutral-950 p-4 space-y-3 relative overflow-hidden">
          {/* Position 1-3: Konkurrenz (Highlighted) */}
          <motion.div
             className="bg-brand/10 border border-brand/30 rounded p-3"
             animate={{
                boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 20px rgba(0,255,41,0.3)", "0 0 0px rgba(0,255,41,0)"]
             }}
             transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
             <div className="flex items-start gap-2 mb-1">
                <span className="bg-brand text-neutral-950 text-[10px] font-bold px-2 py-0.5 rounded">Anzeige</span>
                <Star className="text-brand" size={12} />
             </div>
             <div className="text-white text-sm font-bold mb-1">Konkurrenz - Position #1</div>
             <div className="text-neutral-400 text-xs">Perfekte Keywords • Optimierte Landingpage</div>
          </motion.div>

          {/* Deine Anzeige - Position 8 (grau, wird ignoriert) */}
          <div className="bg-neutral-900 border border-neutral-800 rounded p-3 opacity-30">
             <div className="flex items-start gap-2 mb-1">
                <span className="bg-neutral-700 text-neutral-500 text-[10px] font-bold px-2 py-0.5 rounded">Anzeige</span>
             </div>
             <div className="text-neutral-600 text-sm font-bold mb-1">Deine Anzeige - Position #8</div>
             <div className="text-neutral-900 text-xs">Generische Keywords • Langsame Seite</div>
          </div>
       </div>

       {/* Cursor: Startet unten, wischt hoch, steht still, klickt */}
       <motion.div
         className="absolute left-1/2 z-[100] pointer-events-none"
         animate={{
            y: ["200px", "200px", "85px", "85px", "200px"],
         }}
         transition={{
            duration: 6,
            times: [0, 0.1, 0.4, 0.75, 1],
            repeat: Infinity,
            ease: "easeInOut"
         }}
       >
          <div className="relative w-6 h-6">
             <MousePointer2 className="text-white drop-shadow-md fill-black" size={24} />
             {/* Click Ripple - wie original, aber nur einmal pro Zyklus */}
             <motion.div
                animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 0.4, delay: 2.2, repeat: Infinity, repeatDelay: 5.6 }}
                className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-brand"
             />
          </div>
       </motion.div>

       {/* Success Indicator - erscheint NACH dem Klick (bei 3.4s = 57%) */}
       <motion.div
          animate={{
             opacity: [0, 0, 1, 1, 0, 0],
             y: [0, 0, 0, -15, -25, -25]
          }}
          transition={{
             duration: 6,
             times: [0, 0.56, 0.6, 0.7, 0.78, 1],
             repeat: Infinity
          }}
          className="absolute top-14 left-1/2 -translate-x-1/2 text-brand font-bold text-sm z-50 pointer-events-none whitespace-nowrap"
       >
          ✓ Conversion
       </motion.div>
    </div>
  );
};

// 4. ROI Growth Chart - Performance Comparison
const ROIGrowthChart = () => {
  return (
    <div className="w-full h-[300px] bg-neutral-950 rounded-lg border border-neutral-800 p-8 flex items-end gap-8 relative overflow-hidden shadow-2xl">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

       {/* Bar 1: Vorher (Standard) */}
       <div className="flex-1 flex flex-col items-center gap-3 relative z-10">
          <div className="w-full flex flex-col gap-2">
             {/* CPC Bar */}
             <div className="relative">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 font-bold">CPC</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-neutral-800">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "80%" }}
                     transition={{ duration: 1.5, ease: "circOut" }}
                     className="h-full bg-red-500/60 flex items-center justify-end px-2"
                   >
                      <span className="text-white text-xs font-bold">€5.20</span>
                   </motion.div>
                </div>
             </div>

             {/* CTR Bar */}
             <div className="relative">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 font-bold">CTR</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-neutral-800">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "25%" }}
                     transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                     className="h-full bg-neutral-600 flex items-center justify-end px-2"
                   >
                      <span className="text-white text-xs font-bold">2.8%</span>
                   </motion.div>
                </div>
             </div>

             {/* Conversions Bar */}
             <div className="relative">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 font-bold">Conversions</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-neutral-800">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "15%" }}
                     transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
                     className="h-full bg-neutral-700 flex items-center justify-end px-2"
                   >
                      <span className="text-white text-xs font-bold">8</span>
                   </motion.div>
                </div>
             </div>
          </div>

          <div className="text-center mt-2">
             <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Standard</div>
          </div>
       </div>

       {/* Bar 2: Nachher (Optimiert) */}
       <div className="flex-1 flex flex-col items-center gap-3 relative z-10">
          <div className="w-full flex flex-col gap-2">
             {/* CPC Bar */}
             <div className="relative">
                <div className="text-[10px] text-brand uppercase tracking-wider mb-1 font-bold">CPC</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-brand/30 shadow-[0_0_10px_rgba(0,255,41,0.1)]">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "35%" }}
                     transition={{ duration: 1.5, ease: "circOut", delay: 0.6 }}
                     className="h-full bg-brand flex items-center justify-end px-2 relative"
                   >
                      <span className="text-neutral-950 text-xs font-bold">€1.90</span>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-40" />
                   </motion.div>
                </div>
             </div>

             {/* CTR Bar */}
             <div className="relative">
                <div className="text-[10px] text-brand uppercase tracking-wider mb-1 font-bold">CTR</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-brand/30 shadow-[0_0_10px_rgba(0,255,41,0.1)]">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "85%" }}
                     transition={{ duration: 1.5, ease: "circOut", delay: 0.8 }}
                     className="h-full bg-brand flex items-center justify-end px-2 relative"
                   >
                      <span className="text-neutral-950 text-xs font-bold">12.4%</span>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-40" />
                   </motion.div>
                </div>
             </div>

             {/* Conversions Bar */}
             <div className="relative">
                <div className="text-[10px] text-brand uppercase tracking-wider mb-1 font-bold">Conversions</div>
                <div className="h-8 bg-neutral-900 rounded overflow-hidden border border-brand/30 shadow-[0_0_10px_rgba(0,255,41,0.1)]">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 1.5, ease: "circOut", delay: 1.0 }}
                     className="h-full bg-brand flex items-center justify-end px-2 relative"
                   >
                      <span className="text-neutral-950 text-xs font-bold">47</span>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-40" />
                   </motion.div>
                </div>
             </div>
          </div>

          <div className="text-center mt-2">
             <div className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1 justify-center">
                <span className="bg-brand text-neutral-950 text-[10px] px-2 py-0.5 rounded">PRO</span>
                Optimiert
             </div>
          </div>
       </div>

       {/* Glow Effect */}
       <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

// 5. Intention Heatmap - Google Search Results Style
const IntentionHeatmap = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[400px] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Mockup Google Search Results */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[85%] bg-neutral-950 border border-neutral-800 rounded flex flex-col p-4 shadow-xl">
         {/* Search Bar Header */}
         <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-neutral-800 rounded-full px-4 py-2 flex items-center gap-2">
               <Search size={14} className="text-brand" />
               <div className="w-24 h-2 bg-white/20 rounded" />
            </div>
         </div>

         {/* Search Results - Untereinander wie bei Google */}
         <div className="flex flex-col gap-2 flex-1">
            {/* Result 1 - Transactional Intent (STARK - Kaufbereit) - OBEN */}
            <motion.div
               className="bg-brand/10 rounded p-2 border-2 border-brand relative"
               animate={{
                  boxShadow: ["0 0 0px rgba(0,255,41,0)", "0 0 25px rgba(0,255,41,0.5)", "0 0 0px rgba(0,255,41,0)"]
               }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               <div className="w-1/4 h-1.5 bg-brand/60 rounded mb-1" />
               <div className="w-1/3 h-1 bg-white/10 rounded mb-1" />
               <div className="w-2/5 h-1 bg-white/10 rounded mb-1" />
               <div className="w-1/2 h-1 bg-white/10 rounded mb-1" />
               <div className="w-3/5 h-1 bg-white/10 rounded" />
               <motion.div
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
               />
            </motion.div>

            {/* Result 2 - Info Intent (schwach) */}
            <div className="bg-neutral-800/50 rounded p-2 border border-neutral-700/50">
               <div className="w-1/5 h-1.5 bg-blue-500/30 rounded mb-1" />
               <div className="w-1/4 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/3 h-1 bg-white/5 rounded mb-1" />
               <div className="w-2/5 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/2 h-1 bg-white/5 rounded" />
            </div>

            {/* Result 3 - Nav Intent (mittel) */}
            <div className="bg-neutral-800/50 rounded p-2 border border-neutral-700/50">
               <div className="w-1/5 h-1.5 bg-yellow-500/30 rounded mb-1" />
               <div className="w-1/4 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/3 h-1 bg-white/5 rounded mb-1" />
               <div className="w-2/5 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/2 h-1 bg-white/5 rounded" />
            </div>

            {/* Result 4 - weitere Anzeige */}
            <div className="bg-neutral-800/50 rounded p-2 border border-neutral-700/50">
               <div className="w-1/6 h-1.5 bg-neutral-600/30 rounded mb-1" />
               <div className="w-1/5 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/4 h-1 bg-white/5 rounded mb-1" />
               <div className="w-1/3 h-1 bg-white/5 rounded mb-1" />
               <div className="w-2/5 h-1 bg-white/5 rounded" />
            </div>
         </div>
      </div>

      {/* Glow Effect - oben beim grünen Result */}
      <motion.div
         className="absolute top-[25%] left-1/2 -translate-x-1/2 w-48 h-24 bg-brand/40 rounded-full blur-3xl pointer-events-none"
         animate={{ opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Label */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-brand uppercase tracking-widest">
         Intent-Recognition
      </div>
    </div>
  );
};


export default function GoogleMarketingPage() {
  const { scrollYProgress } = useScroll();
  const scaleBar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll to top instantly when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleContactClick = () => setIsContactOpen(true);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://artofmedia-marketing.de/' },
    { name: 'Google Marketing', url: 'https://artofmedia-marketing.de/google-marketing' }
  ]);

  const serviceSchema = createServiceSchema(
    'Google Ads, SEO & Maps Optimierung',
    'Zertifizierte Google Ads Agentur in Duisburg. SEO, Google Ads und Performance Marketing für mehr Kunden und bessere Rankings.',
    'https://artofmedia-marketing.de/google-marketing'
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, serviceSchema]
  };

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      <SEOHead
        title="Google Ads Agentur Duisburg | SEO & Online Marketing | art.of.media"
        description="Zertifizierte Google Ads Agentur in Duisburg. SEO, Google Ads & Performance Marketing für mehr Kunden. Kostenlose Analyse!"
        canonical="https://artofmedia-marketing.de/google-marketing"
        keywords="Google Ads Agentur Duisburg, SEO Duisburg, Google Maps Optimierung, SEA, Suchmaschinenoptimierung, Online Marketing"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-google.jpg"
      />

      {/* FIXED PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      {/* NAV */}
      <Navigation showBack={true} />

      {/* Breadcrumb Navigation */}
      <div className="pt-20 bg-white">
        <Breadcrumb items={[{ name: 'Google Marketing' }]} />
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
            Google Zertifizierte Experten
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.9] mb-8 tracking-tighter text-neutral-900"
          >
            DEINE <span className="text-brand">GOOGLE ADS</span> KOSTEN<br />
            GELD, ABER KEINE<br/>
            <span className="text-brand">KUNDEN</span>?
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Die meisten Google Ads verbrennen Budget ohne ROI.
            Wir optimieren deine Kampagnen für <span className="text-neutral-950 font-bold bg-brand/20 px-1">maximale Sichtbarkeit</span>
            und <span className="text-neutral-950 font-bold bg-brand/20 px-1">messbaren Umsatz</span>.
          </motion.p>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Kostenloses Google Ads Audit <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Wir analysieren deine aktuellen Kampagnen kostenlos und zeigen dir, wo du Geld verschwendest.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. THE PROBLEM (3-Stage Narrative) */}
      <section className="py-32 px-6 bg-neutral-950 text-white relative overflow-hidden">
        {/* Background Pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">

          <div className="mb-24 text-center">
             <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                Die Wahrheit
             </span>
             <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl leading-[0.9]">
                WARUM DEIN GOOGLE ADS<br/><span className="text-red-500">BUDGET VERSCHWINDET.</span>
             </h2>
          </div>

          <div className="space-y-40 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -z-10" />

            {/* STAGE 1: BUDGET BURN */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <DollarSign size={14} className="inline mr-2" /> Stufe 1: Budget verbrennen
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Du zahlst für Klicks, die nicht konvertieren."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   €3.000 im Monat für Google Ads, aber deine CTR ist bei 2%. Impressionen kosten dich Geld – Kunden kommen keine.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2 md:translate-x-4">
                  <AdBudgetBurn />
               </div>
            </div>

            {/* STAGE 2: KEYWORD MISMATCH */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <KeywordMismatch />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Search size={14} className="inline mr-2" /> Stufe 2: Falsche Keywords
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Während du für teure Keywords bezahlst..."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   ...suchen deine Kunden mit Long-Tail Keywords. Deine Anzeige erscheint auf Position 8. Die Konkurrenz bekommt den Klick.
                 </p>
               </div>
            </div>

            {/* STAGE 3: LOST TO COMPETITOR */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <TrendingDown size={14} className="inline mr-2" /> Stufe 3: Konkurrenz gewinnt
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Und am Ende kauft er bei der Konkurrenz."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Position 1-3 bekommen 75% aller Klicks. Position 8? Unsichtbar. Dein Budget verschwindet, während die Konkurrenz Kunden gewinnt.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <SERPCompetition />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE DIFFERENCE (Split Screen Comparison) */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Google Ads Vergleich</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-900 uppercase">
              WAS IST DER UNTERSCHIED?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
             {/* LEFT: Standard Google Ads */}
             <motion.div
                whileHover={{ y: -8, scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-100 p-8 md:p-12 rounded-lg border border-neutral-200 flex flex-col h-full"
             >
                <div className="mb-8 pb-8 border-b border-neutral-200">
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Standard Kampagnen</div>
                   <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-400">Normale Google Ads</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "Automatische Kampagnen. Keine Kontrolle über Budget-Verteilung.",
                      "Breite Keywords. Hohe Kosten, niedrige Relevanz.",
                      "CTR 2-4%. Die meisten Nutzer scrollen an dir vorbei.",
                      "200-500€ pro Conversion. Teuer und ineffizient."
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-neutral-600 font-medium">
                         <X className="text-red-400 shrink-0 mt-1" size={24} />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>

             {/* RIGHT: art.of.media Google Ads */}
             <motion.div
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 text-white relative overflow-hidden flex flex-col h-full transform md:-translate-y-4 shadow-2xl"
             >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 pb-8 border-b border-neutral-800 relative z-10">
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Unsere Strategie</div>
                   <h3 className="font-display font-bold text-3xl md:text-4xl text-white">Optimierte Kampagnen</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Zielgruppenanalyse + Custom Strategie. Jedes Budget wird präzise eingesetzt.",
                      "Long-Tail Keywords. Höhere Conversion-Rate, niedrigere Kosten.",
                      "CTR 8-15%. Deine Anzeigen werden geklickt und konvertieren.",
                      "10-120€ pro Conversion. Mehr Kunden, weniger Kosten."
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-white font-medium text-lg">
                         <div className="bg-brand/20 p-1 rounded-full text-brand shrink-0 mt-0.5"><Check size={18} /></div>
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>
          </div>

          {/* PERFORMANCE CHART */}
          <div className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 opacity-50" />

             <div className="relative z-10">
                <div className="text-center mb-12">
                   <div className="flex items-center justify-center gap-2 text-brand font-bold uppercase tracking-widest text-xs mb-4">
                      <BarChart3 size={16} /> Performance-Steigerung
                   </div>
                   <h3 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white leading-none mb-4">
                      +340% <br/><span className="text-neutral-400 text-2xl md:text-3xl font-sans font-normal">ROAS Verbesserung</span>
                   </h3>
                   <p className="text-neutral-400">Durchschnittliches Ergebnis nach 60 Tagen Optimierung.</p>
                </div>

                <ROIGrowthChart />
             </div>
          </div>

        </div>
      </section>

      {/* 5. GOOGLE SERVICES (3 Service Cards) */}
      <section className="py-32 px-6 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Ganzheitliche Google-Strategie</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-900 uppercase mb-6">
              Google Marketing<br/>Services
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Von professionellen Google Ads über SEO bis hin zu Google Maps Optimierung – wir sorgen für deine optimale Präsenz im digitalen Raum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Google Ads (SEA) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-lg border-2 border-neutral-200 hover:border-brand transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="text-brand" size={32} strokeWidth={2} />
                  </motion.div>
                </div>

                <h3 className="font-display font-bold text-3xl mb-4 text-neutral-950">Google Ads (SEA)</h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Zertifizierte Experten kümmern sich um strategische Planung und kontinuierliche Optimierung für maximalen ROI.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Zielgruppen- & Wettbewerberanalyse",
                    "Präzise Keyword-Recherchen",
                    "Maßgeschneiderte Anzeigentexte",
                    "Kontinuierliches Monitoring",
                    "Detaillierte Reportings",
                    "Maximaler ROI & minimierte Kosten"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-900">
                      <Check className="text-brand shrink-0" size={16} strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContactClick}
                  className="w-full py-3 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-wider hover:bg-neutral-950 hover:text-brand transition-all border-2 border-brand flex items-center justify-center gap-2 group/btn"
                >
                  Google Ads starten
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Service 2: SEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-lg border-2 border-neutral-200 hover:border-brand transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                  <TrendingUp className="text-brand" size={32} strokeWidth={2} />
                </div>

                <h3 className="font-display font-bold text-3xl mb-4 text-neutral-950">SEO - Suchmaschinen-optimierung</h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Erreiche deine Kunden organisch. Wir optimieren für relevante Suchbegriffe und sorgen für Top-Rankings.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "SEO-Texte & Content-Optimierung",
                    "Strategischer Linkaufbau",
                    "Local SEO für lokale Unternehmen",
                    "Technisches SEO",
                    "Umfassende Keyword-Recherchen",
                    "Langfristige Ranking-Verbesserung"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-900">
                      <Check className="text-brand shrink-0" size={16} strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContactClick}
                  className="w-full py-3 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-wider hover:bg-neutral-950 hover:text-brand transition-all border-2 border-brand flex items-center justify-center gap-2 group/btn"
                >
                  SEO-Strategie entwickeln
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Service 3: Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-lg border-2 border-neutral-200 hover:border-brand transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                  <MapPin className="text-brand" size={32} strokeWidth={2} />
                </div>

                <h3 className="font-display font-bold text-3xl mb-4 text-neutral-950">Google Maps Optimierung</h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Lokale Sichtbarkeit maximieren. Wir sorgen für prominente Platzierung auf Google Maps und mehr Kundenanfragen.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Google My Business-Setup",
                    "Lokale Keyword-Optimierung",
                    "Bewertungsmanagement & -aufbau",
                    "Google Posts & Updates",
                    "NAP-Konsistenz (Name, Adresse, Telefon)",
                    "Lokale Backlinks & Citations"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-900">
                      <Check className="text-brand shrink-0" size={16} strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContactClick}
                  className="w-full py-3 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-wider hover:bg-neutral-950 hover:text-brand transition-all border-2 border-brand flex items-center justify-center gap-2 group/btn"
                >
                  Maps-Optimierung starten
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. PSYCHOLOGY OF SEARCH (Intention Recognition) */}
      <section className="py-32 px-6 bg-white border-y border-neutral-200 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

             <div className="order-2 md:order-1">
                <IntentionHeatmap />
             </div>

             <div className="order-1 md:order-2 flex flex-col justify-center">
                <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                   Suchverhalten verstehen
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-8 leading-tight">
                   INTENTION<br/>RECOGNITION.
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                   Nicht jede Suchanfrage ist gleich. Ein Nutzer, der nach "Nike Schuhe Test" sucht, ist in der <span className="font-bold text-neutral-950">Informationsphase</span>.
                   Jemand, der "Nike Air Max kaufen" eingibt, ist <span className="font-bold text-neutral-950">kaufbereit</span>.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                   Wir zeigen deine Anzeigen genau dann, wenn der Kunde kaufbereit ist – nicht wenn er nur recherchiert.
                   Das maximiert deine Conversion-Rate und minimiert Streuverluste.
                </p>
                <p className="text-lg text-neutral-950 font-bold leading-relaxed mb-8">
                   <span className="bg-brand/20 px-1">Richtiger Zeitpunkt = Mehr Conversions = Weniger Kosten.</span>
                </p>

                <div className="flex gap-4 flex-wrap">
                   <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 font-bold text-sm uppercase tracking-wide shadow-sm flex items-center gap-2">
                      <Target size={16} className="text-brand" /> Intent-Targeting
                   </div>
                   <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 font-bold text-sm uppercase tracking-wide shadow-sm flex items-center gap-2">
                      <Zap size={16} className="text-brand" /> Conversion-Fokus
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING PACKAGES */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl mb-6 uppercase">Wähle dein Paket</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
               Wir verkaufen keine Stunden. Wir verkaufen Ergebnisse.
               Wähle das passende Fundament für dein Online-Wachstum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* STARTER PACKAGE */}
            <motion.div
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="flex flex-col relative p-10 border-2 border-neutral-950 bg-white text-neutral-950 shadow-xl group"
            >
              <div className="mb-6">
                 <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Fokus: Einsteiger</span>
              </div>
              <h3 className="font-display font-bold text-4xl mb-4">Starter Paket</h3>
              <p className="text-sm font-bold text-neutral-600 mb-8 min-h-[3rem]">
                → Perfekt für: Kleine Unternehmen, lokale Services
              </p>
              <div className="space-y-4 mb-12 flex-grow">
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> 1 Google Ads Kampagne</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Keyword-Recherche (50 Keywords)</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Wöchentliche Reports</li>
                <li className="flex gap-3 text-lg font-medium"><Check size={20} className="text-brand" /> Budget-Optimierung</li>
              </div>
              <button
                onClick={handleContactClick}
                className="w-full py-5 bg-brand text-neutral-950 font-bold uppercase text-sm tracking-widest hover:bg-neutral-950 hover:text-white transition-colors"
              >
                KOSTENLOSES AUDIT
              </button>
            </motion.div>

            {/* GROWTH PACKAGE */}
            <motion.div
               whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 60px rgba(0, 255, 41, 0.3)" }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="flex flex-col p-10 border-2 border-brand bg-neutral-950 text-white shadow-[0_0_40px_rgba(0,255,41,0.2)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-brand text-neutral-950 text-xs font-bold px-4 py-2 uppercase tracking-widest">Beliebt</div>

              <div className="mb-6 relative z-10">
                 <span className="bg-white text-neutral-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">Fokus: Wachstum</span>
              </div>
              <h3 className="font-display font-bold text-4xl mb-4 text-brand relative z-10">Growth Paket</h3>
              <p className="text-sm font-bold text-neutral-400 mb-8 min-h-[3rem] relative z-10">
                 → Perfekt für: Skalierung, Multi-Channel Marketing
              </p>
              <div className="space-y-4 mb-12 flex-grow relative z-10">
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Zap size={20} className="text-brand" /> Multi-Channel (Ads + SEO + Maps)</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Umfassende Strategie</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Tägliche Optimierung</li>
                <li className="flex gap-3 text-lg font-medium text-neutral-300"><Check size={20} className="text-brand" /> Dedicated Account Manager</li>
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

      {/* 8. CASE STUDIES - TEMPORARILY HIDDEN */}
      {false && <section className="py-24 px-6 bg-neutral-900 border-t border-neutral-800 text-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
           <div className="mb-20 text-center">
              <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">Echte Ergebnisse</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl text-white uppercase leading-[0.9]">
                 Kampagnen, die<br/>performen.
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case 1: E-Commerce Google Ads */}
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
                       fashion-store.de
                    </div>
                 </div>
                 {/* Content */}
                 <div className="relative flex-grow overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">+340% ROAS</span>
                          <span className="bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20">60 Tage</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">E-Commerce Skalierung</h3>
                       <p className="text-neutral-400">"Von 8 auf 47 Conversions pro Woche. Die Kampagnen sind perfekt optimiert."</p>
                    </div>
                 </div>
              </motion.div>

              {/* Case 2: Local Service Google Maps */}
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
                 <div className="relative flex-grow overflow-hidden bg-neutral-900 flex items-center justify-center">
                    <div className="text-center z-10">
                       <MapPin className="text-brand mx-auto mb-4" size={48} />
                       <div className="text-6xl font-display font-bold text-brand mb-2">12</div>
                       <div className="text-neutral-400 text-sm uppercase tracking-widest">Buchungen / Tag</div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">Von 2 → 12</span>
                       </div>
                       <h3 className="text-3xl font-display font-bold mb-2">Local Service Boost</h3>
                       <p className="text-neutral-400">"Google Maps Optimierung hat unser Geschäft transformiert."</p>
                    </div>
                 </div>
              </motion.div>

              {/* Case 3: B2B SEO */}
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
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                       <div className="flex gap-4 mb-4">
                          <span className="bg-brand text-neutral-950 text-xs font-bold px-3 py-1 rounded shadow-lg shadow-brand/20">+500% Traffic</span>
                       </div>
                       <h3 className="text-2xl font-display font-bold text-white mb-1">B2B SEO Dominanz</h3>
                       <p className="text-brand text-sm font-bold">Organische Rankings</p>
                    </div>
                 </div>
              </motion.div>

               {/* Case 4: Multi-Channel Performance */}
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
                    {/* Performance Metrics */}
                    <div className="flex gap-12 text-center flex-wrap justify-center px-8">
                        <div>
                           <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-brand mb-2">8.4%</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Conversion Rate</div>
                        </div>
                        <div>
                           <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-brand mb-2">-60%</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">CPC Reduktion</div>
                        </div>
                        <div>
                           <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-brand mb-2">#1-3</div>
                           <div className="text-neutral-500 text-xs uppercase tracking-widest">Positionen</div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                         <div className="inline-block bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/20 mb-2">
                           Multi-Channel Strategy
                         </div>
                       <h3 className="text-2xl font-display font-bold text-white mb-1">Performance-Perfektion</h3>
                    </div>
                 </div>
              </motion.div>

           </div>
        </div>
      </section>}

       {/* 9. FAQ */}
       <section className="py-24 px-6 bg-white border-t border-neutral-200">
          <div className="container mx-auto max-w-4xl">
             <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
             <div className="space-y-0 border-t border-neutral-200">
                <FaqItem
                  q="Wie lange dauert es bis zu ersten Ergebnissen?"
                  a="Bei Google Ads: 7-14 Tage bis zur ersten Optimierung, messbare Verbesserungen nach 30-60 Tagen. Bei SEO: Erste Rankings nach 2-3 Monaten, signifikante Ergebnisse nach 4-6 Monaten. Google Maps: 2-4 Wochen für vollständige Optimierung."
                />
                <FaqItem
                  q="Was passiert mit meinem aktuellen Google Ads Konto?"
                  a="Wir übernehmen dein bestehendes Konto und optimieren es. Alle historischen Daten bleiben erhalten. Falls du noch kein Konto hast, richten wir ein neues professionell ein."
                />
                <FaqItem
                  q="Welches Budget brauche ich für Google Ads?"
                  a="Minimum €200-1000/Monat für sinnvolle Tests und Optimierung. Je nach Branche und Wettbewerb kann ein höheres Budget notwendig sein. Wir beraten dich im Strategiegespräch individuell."
                />
                <FaqItem
                  q="Funktioniert das auch lokal (nur eine Stadt)?"
                  a="Absolut! Local SEO und Google Maps Optimierung sind perfekt für lokale Unternehmen. Wir können deine Anzeigen auf PLZ-Bereiche oder Städte eingrenzen und deine Google Maps Präsenz maximieren."
                />
                <FaqItem
                  q="Was ist der Unterschied zwischen SEO und SEA?"
                  a="SEA (Google Ads) sind bezahlte Anzeigen – schnelle Ergebnisse, aber laufende Kosten. SEO ist organische Optimierung – dauert länger, aber nachhaltig und kosteneffizient langfristig. Ideal ist eine Kombination aus beidem."
                />
                <FaqItem
                  q="Wie oft bekomme ich Reports?"
                  a="Starter Paket: Wöchentliche Reports. Growth Paket: Wöchentliche Reports + monatliche Strategie-Calls. Alle Reports sind klar verständlich und zeigen konkrete Zahlen: CTR, CPC, Conversions, ROAS."
                />
             </div>
          </div>
       </section>

       {/* 10. FOOTER CTA */}
       <Footer showMainCta={true} onContactClick={handleContactClick} />

       <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Google Marketing (Ads, SEO, Maps)" />
    </main>
  );
}
