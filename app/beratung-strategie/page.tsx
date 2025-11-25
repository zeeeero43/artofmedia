
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Lightbulb, HelpCircle, Target, TrendingUp, X, MessageSquare, Compass, MapPin, Calendar, Users, Instagram, Facebook, Globe, Mail, Megaphone } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
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

// --- SIMPLE ANIMATIONS ---

// 1. Verwirrung - zu viele Optionen
const ConfusionAnimation = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center p-8 relative overflow-hidden shadow-xl">
       {/* Icon in der Mitte */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
             <Users size={24} className="text-neutral-500" />
          </div>
       </div>

       {/* Fragen verteilt drumherum */}
       {[
         { text: 'TikTok?', x: '15%', y: '20%' },
         { text: 'Google Ads?', x: '70%', y: '25%' },
         { text: 'Instagram?', x: '25%', y: '60%' },
         { text: 'Facebook?', x: '65%', y: '65%' },
         { text: 'SEO?', x: '45%', y: '15%' },
         { text: 'YouTube?', x: '10%', y: '45%' },
         { text: 'E-Mail?', x: '80%', y: '50%' },
       ].map((item, i) => (
         <motion.div
           key={i}
           className="absolute text-sm font-bold text-neutral-600"
           style={{
             left: item.x,
             top: item.y
           }}
           animate={{
             opacity: [0.3, 0.8, 0.3],
             scale: [0.9, 1.1, 0.9]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             delay: i * 0.2
           }}
         >
           {item.text}
         </motion.div>
       ))}

       {/* Text unten */}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-30">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Zu viele Optionen</div>
       </div>
    </div>
  );
};

// 2. Kein Plan - Random Aktion
const NoStructureAnimation = () => {
  return (
    <div className="w-full h-64 bg-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-xl">
       <div className="relative">
          {/* Random scattered actions */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['Post', 'Flyer', 'Ad', 'Story', 'Video', 'E-Mail'].map((action, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, i % 2 ? 5 : -5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="w-20 h-16 bg-white border-2 border-neutral-300 rounded flex items-center justify-center text-xs font-bold text-neutral-400"
              >
                {action}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center text-neutral-600 font-mono text-sm uppercase tracking-wider"
          >
            Keine Struktur
          </motion.div>
       </div>
    </div>
  );
};

// 3. Keine Klarheit - welche Richtung?
const NoDirectionAnimation = () => {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-800 flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-xl">
      {/* Compass spinning confused */}
      <motion.div
        animate={{
          rotate: [0, 90, 180, 270, 360, 270, 180, 90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 rounded-full border-4 border-neutral-700 flex items-center justify-center relative"
      >
        <Compass size={40} className="text-neutral-600" />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-12 text-red-500 text-xs font-mono uppercase tracking-widest"
        >
          ???
        </motion.div>
      </motion.div>

      <div className="mt-8 text-center text-neutral-500 font-mono text-sm uppercase tracking-wider">
        Keine Richtung
      </div>
    </div>
  );
};

// 4. KONZEPT ENTWICKLUNG VISUALIZER
const ConceptDevelopmentVisualizer = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const stages = [
    { icon: MessageSquare, label: 'Gespräch' },
    { icon: Lightbulb, label: 'Ideen' },
    { icon: Target, label: 'Konzept' },
    { icon: Megaphone, label: 'Umsetzung' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev >= stages.length - 1) return -1;
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[400px] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 flex items-center justify-between">
        {stages.map((stage, index) => {
          const isActive = index <= activeIndex;
          return (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 z-10"
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? 'rgba(0, 255, 41, 0.2)' : 'rgb(38, 38, 38)',
                    borderColor: isActive ? '#00FF29' : 'rgb(64, 64, 64)',
                    boxShadow: isActive ? '0 0 20px 5px rgba(0, 255, 41, 0.3)' : '0 0 0 0 rgba(0, 255, 41, 0)'
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center"
                >
                  <stage.icon size={28} className={isActive ? 'text-brand' : 'text-neutral-500'} />
                </motion.div>
                <motion.div
                  animate={{ color: isActive ? '#ffffff' : 'rgb(115, 115, 115)' }}
                  transition={{ duration: 0.5 }}
                  className="text-xs md:text-sm font-bold uppercase tracking-wider"
                >
                  {stage.label}
                </motion.div>
              </motion.div>

              {index < stages.length - 1 && (
                <div className="flex-1 h-1 mx-2 md:mx-4 relative bg-neutral-700 overflow-hidden">
                  <motion.div
                    animate={{
                      scaleX: index < activeIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-brand origin-left"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// 5. KANAL-AUSWAHL VISUALIZER
const ChannelSelectionVisualizer = () => {
  const channels = [
    { icon: Instagram, name: 'Instagram', match: true },
    { icon: Facebook, name: 'Facebook', match: false },
    { icon: Globe, name: 'Website', match: true },
    { icon: Mail, name: 'Newsletter', match: true },
  ];

  return (
    <div className="relative w-full h-[350px] md:h-[400px] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
        <div className="grid grid-cols-2 gap-6">
          {channels.map((channel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`p-6 rounded-lg border-2 ${
                channel.match
                  ? 'bg-brand/10 border-brand'
                  : 'bg-neutral-800/50 border-neutral-700'
              } flex flex-col items-center gap-3`}
            >
              <channel.icon size={32} className={channel.match ? 'text-brand' : 'text-neutral-600'} />
              <div className={`text-sm font-bold ${channel.match ? 'text-white' : 'text-neutral-500'}`}>
                {channel.name}
              </div>
              {channel.match && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                >
                  <Check size={20} className="text-brand" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-brand text-sm font-mono uppercase tracking-wider"
        >
          Die richtigen Kanäle für dich
        </motion.div>
      </div>
    </div>
  );
};


export default function BeratungStrategie() {
  const { scrollYProgress } = useScroll();
  const scaleBar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleContactClick = () => setIsContactOpen(true);

  // SEO Data
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://artofmedia-marketing.de/' },
    { name: 'Beratung & Strategie', url: 'https://artofmedia-marketing.de/beratung-strategie' }
  ]);

  const serviceSchema = createServiceSchema(
    'Marketing Beratung & Strategie',
    'Strategische Marketing-Beratung in Duisburg. Wir entwickeln Ihre digitale Strategie für messbaren Erfolg und nachhaltige Wettbewerbsvorteile.',
    'https://artofmedia-marketing.de/beratung-strategie'
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Für wen ist die Beratung geeignet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für alle, die mit Marketing starten wollen oder keine klare Richtung haben. Egal ob Selbstständig, kleines Team oder größeres Unternehmen - wenn du nicht weißt, wo du anfangen sollst, können wir helfen."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet ein Marketing-Konzept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Erstgespräch ist kostenlos. Für ein vollständiges Konzept sprechen wir über den Umfang - je nachdem, wie tief wir gehen. Lass uns einfach reden, dann finden wir was passt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein erstes Gespräch: 30-45 Minuten. Ein vollständiges Konzept: ca. 1-2 Wochen, je nachdem wie schnell wir gemeinsam arbeiten können."
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
        title="Marketing Beratung Duisburg | Strategie & Konzept | art.of.media"
        description="Strategische Marketing-Beratung in Duisburg. Wir entwickeln Ihre digitale Strategie für messbaren Erfolg. Jetzt Termin vereinbaren!"
        canonical="https://artofmedia-marketing.de/beratung-strategie"
        keywords="Marketing Beratung Duisburg, Marketing Strategie, Digitale Strategie, Marketingkonzept, Kommunikationsplanung, Medienauswahl"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-beratung.jpg"
      />

      {/* FIXED PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      <Navigation showBack={true} />

      {/* 1. HERO */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-white">
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
            Marketing-Beratung
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tighter text-neutral-950"
          >
            WO ANFANGEN<br />
            MIT MARKETING?
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Wir helfen dir, <span className="text-neutral-950 font-bold bg-brand/20 px-1">ein klares Konzept</span> zu entwickeln
            und die <span className="text-neutral-950 font-bold bg-brand/20 px-1">richtigen Kanäle</span> zu finden.
          </motion.p>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Kostenloses Erstgespräch <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Wir sprechen über deine Ziele - und entwickeln gemeinsam einen Plan, wie du dorthin kommst.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. THE PROBLEM */}
      <section className="py-32 px-6 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">

          <div className="mb-24 text-center">
             <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                Das Problem
             </span>
             <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9]">
                MARKETING IST <span className="text-red-500">VERWIRREND.</span>
             </h2>
          </div>

          <div className="space-y-40">
            {/* STAGE 1: Zu viele Optionen */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <HelpCircle size={14} className="inline mr-2" /> Problem 1: Überforderung
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Soll ich TikTok machen? Oder doch lieber Google Ads?"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Alle reden von Social Media, SEO, Content Marketing. Du weißt nicht, was für dein Business wirklich Sinn macht.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <ConfusionAnimation />
               </div>
            </div>

            {/* STAGE 2: Kein Plan */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <NoStructureAnimation />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Target size={14} className="inline mr-2" /> Problem 2: Keine Struktur
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Heute ein Post, morgen ein Flyer - aber kein roter Faden"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Du versuchst alles gleichzeitig. Ohne Konzept. Ohne Planung. Das fühlt sich anstrengend an - und bringt wenig.
                 </p>
               </div>
            </div>

            {/* STAGE 3: Keine Richtung */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Compass size={14} className="inline mr-2" /> Problem 3: Keine Klarheit
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Wohin soll das eigentlich alles führen?"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Keine klaren Ziele. Keine Strategie. Du arbeitest, aber du weißt nicht genau, wofür. Das ist frustrierend.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <NoDirectionAnimation />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE SOLUTION */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Die Lösung</span>
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-950 uppercase">
              WIR HELFEN DIR, KLARHEIT ZU SCHAFFEN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
             {/* LEFT: BAD */}
             <motion.div
                whileHover={{ y: -8, scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-100 p-8 md:p-12 rounded-lg border border-neutral-200 flex flex-col h-full"
             >
                <div className="mb-8 pb-8 border-b border-neutral-200">
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Vorher</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-neutral-400">Ohne Plan</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "Überfordert von den vielen Marketing-Optionen",
                      "Keine klare Richtung oder Strategie",
                      "Random Posts hier und da - ohne Zusammenhang",
                      "Kein Gefühl, ob das, was du machst, funktioniert"
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-neutral-600 font-medium">
                         <X className="text-red-400 shrink-0 mt-1" size={24} />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>

             {/* RIGHT: GOOD */}
             <motion.div
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 text-white relative overflow-hidden flex flex-col h-full transform md:-translate-y-4 shadow-2xl"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 pb-8 border-b border-neutral-800 relative z-10">
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Mit uns</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-white">Klares Konzept</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Wir finden gemeinsam raus, welche Kanäle zu dir passen",
                      "Du bekommst ein strukturiertes Marketing-Konzept",
                      "Klare Schritte: Was machst du wann und wo?",
                      "Du weißt endlich, in welche Richtung es geht"
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-white font-medium text-lg">
                         <div className="bg-brand/20 p-1 rounded-full text-brand shrink-0 mt-0.5"><Check size={18} /></div>
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>
          </div>

        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="py-32 px-6 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">So arbeiten wir</span>
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-950 uppercase">
              GEMEINSAM ZUM KONZEPT
            </h2>
          </div>

          <div className="space-y-24">
            {/* Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display font-black text-3xl md:text-4xl mb-6">
                  Wir entwickeln zusammen
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Keine 200-Seiten PDFs. Kein Berater-Blabla. Wir setzen uns mit dir hin und entwickeln
                  <span className="font-bold text-neutral-950"> Schritt für Schritt dein Marketing-Konzept</span>.
                </p>
                <ul className="space-y-4">
                  {[
                    { step: '01', text: 'Gespräch: Was willst du erreichen?' },
                    { step: '02', text: 'Ideen sammeln: Was passt zu dir?' },
                    { step: '03', text: 'Konzept erstellen: Klare Struktur entwickeln' },
                    { step: '04', text: 'Kampagnenplanung: Wann machst du was?' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="font-mono font-bold text-brand text-sm">{item.step}</span>
                      <span className="text-neutral-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ConceptDevelopmentVisualizer />
              </div>
            </div>

            {/* Channel Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <ChannelSelectionVisualizer />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-display font-black text-3xl md:text-4xl mb-6">
                  Die richtigen Kanäle finden
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Nicht jeder braucht TikTok. Nicht jeder braucht Google Ads. Wir schauen gemeinsam:
                  <span className="font-bold text-neutral-950"> Wo ist deine Zielgruppe wirklich?</span>
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Medienauswahl, Kommunikationsplanung - wir helfen dir zu verstehen, welche Kanäle
                  für dein Business Sinn machen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFFER SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6">WIE KÖNNEN WIR HELFEN?</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
               Von einem ersten Orientierungsgespräch bis zur vollständigen Konzept-Entwicklung -
               wir passen uns an, was du brauchst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: MessageSquare,
                title: 'Erstgespräch',
                desc: 'Du bist noch unsicher? Wir sprechen erstmal über deine Situation und schauen, wo wir helfen können.',
                features: ['Kostenlos', '30-45 Minuten', 'Unverbindlich', 'Erste Richtung'],
                cta: 'Termin vereinbaren'
              },
              {
                icon: Lightbulb,
                title: 'Marketing-Konzept',
                desc: 'Wir entwickeln mit dir ein vollständiges Marketing-Konzept - von der Idee bis zur Umsetzungsplanung.',
                features: ['Konzept-Entwicklung', 'Kanal-Auswahl', 'Kommunikationsplanung', 'Kampagnenplan'],
                cta: 'Anfrage senden',
                featured: true
              }
            ].map((offer, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02, boxShadow: offer.featured ? "0 25px 60px rgba(0, 255, 41, 0.3)" : "0 20px 40px rgba(0, 0, 0, 0.15)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex flex-col p-8 rounded-lg border-2 relative ${
                  offer.featured
                    ? 'bg-neutral-950 border-brand text-white shadow-[0_0_40px_rgba(0,255,41,0.2)]'
                    : 'bg-white border-neutral-200 text-neutral-950'
                }`}
              >
                {offer.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-neutral-950 text-xs font-bold px-4 py-1 uppercase tracking-widest rounded-full">
                    Empfohlen
                  </div>
                )}

                <div className={`w-12 h-12 rounded-full ${offer.featured ? 'bg-brand/20' : 'bg-neutral-100'} flex items-center justify-center mb-6`}>
                  <offer.icon size={24} className={offer.featured ? 'text-brand' : 'text-neutral-950'} />
                </div>

                <h3 className={`font-display font-bold text-2xl mb-3 ${offer.featured ? 'text-white' : 'text-neutral-950'}`}>
                  {offer.title}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${offer.featured ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {offer.desc}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm">
                      <Check size={16} className={offer.featured ? 'text-brand' : 'text-neutral-950'} />
                      <span className={offer.featured ? 'text-neutral-300' : 'text-neutral-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContactClick}
                  className={`w-full py-4 font-bold uppercase text-sm tracking-widest transition-colors ${
                    offer.featured
                      ? 'bg-brand text-neutral-950 hover:bg-white'
                      : 'bg-neutral-950 text-white hover:bg-brand hover:text-neutral-950'
                  }`}
                >
                  {offer.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-neutral-500 mb-4">
              Fragen? Einfach anrufen:
            </p>
            <a href="tel:+491758000447" className="inline-flex items-center gap-2 text-brand font-bold text-xl hover:underline">
              +49 (0) 175 8000 447
            </a>
          </div>
        </div>
      </section>

      {/* 7. SIMPLE EXAMPLES */}
      <section className="py-24 px-6 bg-neutral-900 border-t border-neutral-800 text-white">
        <div className="container mx-auto max-w-6xl">
           <div className="mb-16 text-center">
              <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">Was wir machen</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase leading-tight">
                 VON DER IDEE<br/>ZUR KAMPAGNE
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Layout-Entwicklung',
                  desc: 'Logo, Schrift, Corporate Identity - wir entwickeln mit dir deine visuelle Identität.',
                  icon: '🎨'
                },
                {
                  title: 'Medienauswahl',
                  desc: 'Social Media, Print, Website? Wir helfen dir zu verstehen, welche Kanäle passen.',
                  icon: '📱'
                },
                {
                  title: 'Kampagnenplanung',
                  desc: 'Wann postest du was? Wie hängt alles zusammen? Wir erstellen dir einen klaren Plan.',
                  icon: '📅'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-neutral-950 border border-neutral-800 p-8 rounded-lg"
                >
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-white">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

       {/* 8. FAQ */}
       <section className="py-24 px-6 bg-white border-t border-neutral-200">
          <div className="container mx-auto max-w-4xl">
             <h2 className="font-display font-black text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
             <div className="space-y-0 border-t border-neutral-200">
                <FaqItem
                  q="Für wen ist die Beratung geeignet?"
                  a="Für alle, die mit Marketing starten wollen oder keine klare Richtung haben. Egal ob Selbstständig, kleines Team oder größeres Unternehmen - wenn du nicht weißt, wo du anfangen sollst, können wir helfen."
                />
                <FaqItem
                  q="Was kostet ein Marketing-Konzept?"
                  a="Das Erstgespräch ist kostenlos. Für ein vollständiges Konzept sprechen wir über den Umfang - je nachdem, wie tief wir gehen. Lass uns einfach reden, dann finden wir was passt."
                />
                <FaqItem
                  q="Wie lange dauert es?"
                  a="Ein erstes Gespräch: 30-45 Minuten. Ein vollständiges Konzept: ca. 1-2 Wochen, je nachdem wie schnell wir gemeinsam arbeiten können."
                />
                <FaqItem
                  q="Müsst ihr das Konzept auch umsetzen?"
                  a="Nein, das entscheidest du. Wir können dir das Konzept entwickeln und du setzt es mit deinem Team um. Oder wir begleiten dich bei der Umsetzung - je nachdem, was du brauchst."
                />
                <FaqItem
                  q="Was ist, wenn ich schon Marketing mache, aber es läuft nicht?"
                  a="Dann schauen wir gemeinsam, wo das Problem liegt. Manchmal sind es die falschen Kanäle, manchmal fehlt die Struktur. Im Erstgespräch finden wir schnell raus, was nicht passt."
                />
             </div>
          </div>
       </section>

       {/* 9. FOOTER CTA */}
       <Footer showMainCta={true} onContactClick={handleContactClick} />

       <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Beratung & Strategie" />
    </main>
  );
}
