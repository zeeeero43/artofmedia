import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X, Sparkles, Shield, Clock, Award, Users, Eye, AlertTriangle } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { ProcessSection } from '../../components/process-section';
import { ServiceGrid } from '../../components/service-grid';
import { FadingPrintVisualizer } from '../../components/animations/FadingPrintVisualizer';
import { FoliePeelingVisualizer } from '../../components/animations/FoliePeelingVisualizer';
import { CarWrappingShowcase } from '../../components/animations/CarWrappingShowcase';
import { InvisibleShopVisualizer } from '../../components/animations/InvisibleShopVisualizer';
import { FadedSignVisualizer } from '../../components/animations/FadedSignVisualizer';
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

export default function PrintFoliePage() {
  const { scrollYProgress } = useScroll();
  const scaleBar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll to top instantly when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleContactClick = () => setIsContactOpen(true);

  // SEO Data
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://artofmedia-marketing.de/' },
    { name: 'Werbetechnik & Print', url: 'https://artofmedia-marketing.de/print-folie' }
  ]);

  const serviceSchema = createServiceSchema(
    'Werbetechnik, Print & Folierung',
    'Professionelle Werbetechnik aus Duisburg. Schilder, Fahrzeugbeschriftung, Folierung, Print und Werbeanlagen in Premium-Qualität.',
    'https://artofmedia-marketing.de/print-folie'
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie lange hält das?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unsere Werbetechnik-Lösungen sind auf Langlebigkeit ausgelegt. Standard-Folien halten 5-7 Jahre, Premium-Druck und Folie 10+ Jahre. Wir geben auf alle hochwertigen Installationen 10 Jahre Garantie."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet ihr auch Montage an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja! Wir übernehmen die komplette professionelle Montage vor Ort – von Car-Wrapping über Glasdekor bis zu Werbeschildern und Planen. So garantieren wir ein perfektes Ergebnis ohne Blasen, Falten oder Ablösungen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert die Produktion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard-Schilder, Print und Folienarbeiten: 1-2 Wochen. Car-Wrapping: 3-5 Tage. Große Werbeanlagen: 2-4 Wochen. Bei Eilaufträgen geht's auch schneller."
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
        title="Werbetechnik Duisburg | Schilder, Folien & Beschriftung | art.of.media"
        description="Professionelle Werbetechnik aus Duisburg. Schilder, Fahrzeugbeschriftung, Folierung & Print. Kostenlose Beratung vor Ort!"
        canonical="https://artofmedia-marketing.de/print-folie"
        keywords="Werbetechnik Duisburg, Fahrzeugbeschriftung, Car Wrapping, Schilder, Folierung, Werbeschild, Print Duisburg"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-print.jpg"
      />

      {/* FIXED PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      {/* NAV */}
      <Navigation showBack={true} />

      {/* Breadcrumb Navigation */}
      <div className="pt-20 bg-white">
        <Breadcrumb items={[{ name: 'Print & Folie' }]} />
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
            Physische Markenpräsenz
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 tracking-tighter text-neutral-950"
          >
            DEINE <span className="text-brand">WERBUNG</span><br />
            IST UNSICHTBAR?
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Billig-Druck verblasst. Schlechte Folien lösen sich ab. Ohne Schild bist du unsichtbar.
            Wir liefern <span className="text-neutral-950 font-bold bg-brand/20 px-1">Premium-Qualität</span> –
            von <span className="text-neutral-950 font-bold bg-brand/20 px-1">Print bis Werbetechnik</span>.
          </motion.p>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Jetzt kostenloses Angebot holen <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Beschreib uns dein Projekt - wir zeigen dir in 24h was möglich ist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. THE PROBLEM (Vertical Narrative Flow) */}
      <section className="py-32 px-6 bg-neutral-950 text-white relative overflow-hidden">
        {/* Background Pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">

          <div className="mb-24 text-center">
             <span className="text-brand font-mono text-xs uppercase tracking-widest mb-6 block">
                Die Realität
             </span>
             <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl leading-[0.9]">
                WARUM DEINE WERBUNG <span className="text-red-500">VERSAGT.</span>
             </h2>
          </div>

          <div className="space-y-40 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -z-10" />

            {/* PROBLEM 1: BILLIG-DRUCK */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Sparkles size={14} className="inline mr-2" /> Problem 1: Billig-Druck
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Nach 3 Monaten ist dein Logo schon verblasst."
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Online-Druckereien verwenden minderwertige Tinten und Materialien. Deine Werbung sieht nach wenigen Wochen unprofessionell aus.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <FadingPrintVisualizer />
               </div>
            </div>

            {/* PROBLEM 2: SCHLECHTE FOLIEN */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <FoliePeelingVisualizer />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Shield size={14} className="inline mr-2" /> Problem 2: Schlechte Folien
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Billig-Folien lösen sich ab und bilden Blasen"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Minderwertige Folien halten nicht, was sie versprechen. Nach kurzer Zeit entstehen Blasen, Risse und die Verklebung löst sich.
                 </p>
               </div>
            </div>

            {/* PROBLEM 3: KEIN SCHILD */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <Eye size={14} className="inline mr-2" /> Problem 3: Kein Schild
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Kein Schild = Nicht existent"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Wenn man dich nicht sieht, existierst du nicht. Deine Konkurrenz hat ein Schild – du nicht. Rate mal, wo die Kunden hingehen.
                 </p>
               </div>

               <div className="w-full md:w-1/2 order-1 md:order-2">
                  <InvisibleShopVisualizer />
               </div>
            </div>

            {/* PROBLEM 4: VERBLASSTE SCHILDER */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="w-full md:w-1/2 order-1">
                  <FadedSignVisualizer />
               </div>

               <div className="w-full md:w-1/2 order-2 text-center md:text-left">
                 <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                   <AlertTriangle size={14} className="inline mr-2" /> Problem 4: Verblasst
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                   "Alte Schilder sagen: 'Wir sind nicht mehr relevant.'"
                 </h3>
                 <p className="text-neutral-400 text-xl leading-relaxed">
                   Verblasste Farben, abblätternde Folie. Während deine Konkurrenz modern aussieht, wirkst du wie aus den 90ern.
                 </p>
               </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THE DIFFERENCE (Split Screen) */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Qualitätsunterschied</span>
            <h2 className="font-display font-black text-2xl sm:text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-950 uppercase">
              DER UNTERSCHIED?<br/>QUALITÄT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             {/* LEFT: BAD (Standard) */}
             <motion.div
                whileHover={{ y: -8, scale: 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-100 p-8 md:p-12 rounded-lg border border-neutral-200 flex flex-col h-full"
             >
                <div className="mb-8 pb-8 border-b border-neutral-200">
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Standard-Anbieter</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-neutral-400">Billig-Produktion</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "Online-Templates. Deine Konkurrenz hat das gleiche Design.",
                      "Minderwertige Materialien. Verblasst nach wenigen Monaten.",
                      "Keine Beratung. Du bist auf dich allein gestellt.",
                      "Selbstmontage. Blasen, Falten und unprofessionelles Ergebnis."
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
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Unsere Qualität</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-white">Premium-Produktion</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Maßgeschneiderte Designs. Einzigartig für deine Marke.",
                      "Premium-Materialien. 10+ Jahre Haltbarkeit garantiert.",
                      "Persönliche Beratung. Wir begleiten dich von A bis Z.",
                      "Professionelle Montage. Perfektes Ergebnis durch Experten vor Ort."
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

      {/* 5. PROCESS SECTION */}
      <ProcessSection activeMode="physical" />

      {/* 6. CAR WRAPPING SHOWCASE */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Transformation</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              VON STANDARD<br/>ZU PREMIUM
            </h2>
            <p className="text-xl text-neutral-600">Sieh selbst, was mit professioneller Folierung möglich ist.</p>
          </div>

          <CarWrappingShowcase />
        </div>
      </section>

      {/* 7. SERVICE CATEGORIES */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Unser Angebot</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-neutral-950 uppercase leading-[0.9]">
              DEINE WERBUNG,<br/>DEINE WAHL.
            </h2>
            <p className="text-xl text-neutral-500 mt-6 max-w-2xl mx-auto">
              Von Print über Folierung bis zu Werbetechnik – wir haben die Lösung für dein Projekt.
            </p>
          </div>

          <ServiceGrid onContactClick={handleContactClick} />
        </div>
      </section>

      {/* 8. WHY US (Trust Factors) */}
      <section className="py-32 px-6 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl mb-6">
              WARUM ART.OF.MEDIA?
            </h2>
            <p className="text-xl text-neutral-400">Qualität hat einen Namen.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award size={40} />,
                title: "Premium Materialien",
                description: "Wir verwenden nur hochwertigste Folien, Tinten und Materialien mit 10+ Jahren Haltbarkeit."
              },
              {
                icon: <Users size={40} />,
                title: "Persönliche Beratung",
                description: "Dein fester Ansprechpartner begleitet dich vom ersten Gespräch bis zur finalen Montage."
              },
              {
                icon: <Clock size={40} />,
                title: "Schnelle Umsetzung",
                description: "Von der Anfrage bis zum fertigen Produkt – wir arbeiten effizient und zuverlässig."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900 border border-neutral-800 p-8 hover:border-brand transition-colors group"
              >
                <div className="text-brand mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 px-6 bg-white border-t border-neutral-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
          <div className="space-y-0 border-t border-neutral-200">
            <FaqItem
              q="Wie lange hält das?"
              a="Unsere Werbetechnik-Lösungen sind auf Langlebigkeit ausgelegt. Standard-Folien halten 5-7 Jahre, Premium-Druck und Folie 10+ Jahre. Wir geben auf alle hochwertigen Installationen 10 Jahre Garantie."
            />
            <FaqItem
              q="Bietet ihr auch Montage an?"
              a="Ja! Wir übernehmen die komplette professionelle Montage vor Ort – von Car-Wrapping über Glasdekor bis zu Werbeschildern und Planen. So garantieren wir ein perfektes Ergebnis ohne Blasen, Falten oder Ablösungen."
            />
                        <FaqItem
              q="Wie lange dauert die Produktion?"
              a="Standard-Schilder, Print und Folienarbeiten: 1-2 Wochen. Car-Wrapping: 3-5 Tage. Große Werbeanlagen: 2-4 Wochen. Bei Eilaufträgen geht's auch schneller."
            />
            <FaqItem
              q="Was ist der Unterschied zwischen Standard und Premium?"
              a="Standard-Materialien kosten weniger, verblassen aber nach 2-3 Jahren. Unsere Premium-Materialien sind UV-beständig, wetterfest und TÜV-geprüft – sie halten 10+ Jahre und sehen aus wie am ersten Tag. Das ist der Unterschied zwischen 'sieht billig aus' und 'wirkt professionell'."
            />
            <FaqItem
              q="Bietet ihr auch individuelle Lösungen an?"
              a="Ja! Jedes Projekt ist einzigartig. Wir entwickeln maßgeschneiderte Lösungen für deine spezifischen Anforderungen – von individuellen Designs bis zu speziellen Materialien und Formaten."
            />
          </div>
        </div>
      </section>

      {/* 10. FOOTER CTA */}
      <Footer showMainCta={true} onContactClick={handleContactClick} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Werbetechnik & Print" />
    </main>
  );
}
