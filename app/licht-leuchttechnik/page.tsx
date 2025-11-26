import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Award, Users, Clock, Shield, Star, Building, Monitor, Trophy, Smartphone } from 'lucide-react';
import { TrustBar } from '../../components/trust-bar';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { SEOHead, createBreadcrumbSchema, createServiceSchema } from '../../components/seo-head';
import { Breadcrumb } from '../../components/breadcrumb';
import { DarkAtNightVisualizer } from '../../components/animations/DarkAtNightVisualizer';
import { EnergyCostVisualizer } from '../../components/animations/EnergyCostVisualizer';
import { FadedSignVisualizer } from '../../components/animations/FadedSignVisualizer';
import { AttentionComparisonVisualizer } from '../../components/animations/AttentionComparisonVisualizer';
import { LEDBrightnessVisualizer } from '../../components/animations/LEDBrightnessVisualizer';
import { NeonFlickerVisualizer } from '../../components/animations/NeonFlickerVisualizer';
import { VideoWallContentVisualizer } from '../../components/animations/VideoWallContentVisualizer';
import { ColorChangingLEDVisualizer } from '../../components/animations/ColorChangingLEDVisualizer';
import { WeatherResistanceVisualizer } from '../../components/animations/WeatherResistanceVisualizer';

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

export default function LichtLeuchttechnikPage() {
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
    { name: 'LED Leuchtreklame', url: 'https://artofmedia-marketing.de/licht-leuchttechnik' }
  ]);

  const serviceSchema = createServiceSchema(
    'LED Leuchtreklame & Lichtwerbung',
    'Individuelle LED-Leuchtreklame und Lichtwerbung aus Duisburg. Von der Planung bis zur Montage - 24/7 Sichtbarkeit für Ihr Unternehmen.',
    'https://artofmedia-marketing.de/licht-leuchttechnik'
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, serviceSchema]
  };

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      <SEOHead
        title="LED Leuchtreklame Duisburg | Lichtwerbung & Neon | art.of.media"
        description="Individuelle LED-Leuchtreklame & Lichtwerbung aus Duisburg. Von der Planung bis zur Montage. Jetzt unverbindlich anfragen!"
        canonical="https://artofmedia-marketing.de/licht-leuchttechnik"
        keywords="LED Leuchtreklame Duisburg, Lichtwerbung, LED Schild, Leuchtreklame, Neon Schild, LED Buchstaben, Außenwerbung"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-led.jpg"
      />

      {/* FIXED PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-neutral-100 w-full z-[100]">
        <motion.div style={{ scaleX: scaleBar }} className="h-full bg-brand origin-left shadow-[0_0_10px_#00FF29]" />
      </div>

      {/* NAV */}
      <Navigation showBack={true} />

      {/* Breadcrumb Navigation */}
      <div className="pt-20 bg-white">
        <Breadcrumb items={[{ name: 'LED Lichttechnik' }]} />
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
            24/7 Sichtbarkeit
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 tracking-tighter text-neutral-950"
          >
            DEINE <span className="text-brand">WERBUNG</span><br />
            IST NACHTS <span className="text-brand">UNSICHTBAR</span>?
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Während deine Konkurrenz 24/7 leuchtet, gehst du im Dunkeln unter. Wir verwandeln dein Logo in <span className="text-neutral-950 font-bold bg-brand/20 px-1">leuchtende Kunst</span> – mit <span className="text-neutral-950 font-bold bg-brand/20 px-1">LED-Technologie</span>, die niemals schläft.
          </motion.p>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="group relative w-full md:w-auto bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Jetzt kostenloses Konzept erhalten <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <p className="mt-6 text-sm md:text-base text-neutral-500 max-w-lg mx-auto font-medium">
               Zeig uns dein Logo - wir erstellen eine 3D-Visualisierung, wie es als Leuchtschrift aussieht. 100% kostenlos.
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
                WARUM DU IM DUNKELN <span className="text-red-500">GELD VERLIERST.</span>
             </h2>
          </div>

          {/* Problem 1 */}
          <div className="mb-32 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2 order-2 md:order-1">
               <DarkAtNightVisualizer />
             </div>

             <div className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left">
               <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                 🌙 Problem 1: Unsichtbar
               </div>
               <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                 "Nach 18 Uhr existierst du nicht mehr."
               </h3>
               <p className="text-neutral-400 text-xl leading-relaxed">
                 Dein Laden schließt um 18 Uhr. Dein Schild geht aus. Aber Menschen laufen vorbei – den ganzen Abend, die ganze Nacht. Deine Konkurrenz hat Leuchtschrift. Die bekommen die Aufmerksamkeit. Du nicht.
               </p>
             </div>
          </div>

          {/* Problem 2 */}
          <div className="mb-32 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2 order-1 text-center md:text-left">
               <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                 💸 Problem 2: Geld verbrennen
               </div>
               <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                 "Alte Leuchtmittel fressen Strom. LED spart massiv Kosten."
               </h3>
               <p className="text-neutral-400 text-xl leading-relaxed">
                 Traditionelle Neon-Röhren und Halogen-Strahler sind Energiefresser. LED-Technologie verbraucht einen Bruchteil davon – und spart dir Jahr für Jahr Betriebskosten.
               </p>
             </div>

             <div className="w-full md:w-1/2 order-2">
               <EnergyCostVisualizer />
             </div>
          </div>

          {/* Problem 3 */}
          <div className="mb-32 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2 order-2 md:order-1">
               <FadedSignVisualizer />
             </div>

             <div className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left">
               <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                 ⚠️ Problem 3: Kaputt & peinlich
               </div>
               <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                 "Flackernde Leuchtreklame schreit: 'Wir sind unprofessionell!'"
               </h3>
               <p className="text-neutral-400 text-xl leading-relaxed">
                 Alte Neon-Röhren flackern. Buchstaben fallen aus. Der Elektriker kommt alle 6 Monate und kostet ein Vermögen. Deine Marke leidet.
               </p>
             </div>
          </div>

          {/* Problem 4 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2 order-1 text-center md:text-left">
               <div className="inline-block bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                 👁️ Problem 4: Keine Wirkung
               </div>
               <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white leading-tight">
                 "Standard-Schilder verschwinden in der Masse."
               </h3>
               <p className="text-neutral-400 text-xl leading-relaxed">
                 Ein flaches, unbeleuchtetes Schild am Tag? Eines von hundert. Leuchtende 3D-Buchstaben mit Halo-Effekt? Die sieht man aus 500 Metern.
               </p>
             </div>

             <div className="w-full md:w-1/2 order-2">
               <AttentionComparisonVisualizer />
             </div>
          </div>

        </div>
      </section>

      {/* 4. THE SOLUTION */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Die Lösung</span>
            <h2 className="font-display font-black text-2xl sm:text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-neutral-950 uppercase">
              LED-TECHNOLOGIE:<br/>DIE ZUKUNFT.
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
                   <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Standard Beleuchtung</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-neutral-400">Alte Technik</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                   {[
                      "Hoher Stromverbrauch",
                      "Kurze Lebensdauer",
                      "Hohe Wartungskosten",
                      "Verblasst schnell"
                   ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-neutral-600 font-medium">
                         <X className="text-red-400 shrink-0 mt-1" size={24} />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </motion.div>

             {/* RIGHT: GOOD (LED) */}
             <motion.div
                whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 255, 41, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-950 p-8 md:p-12 rounded-lg border border-neutral-800 text-white relative overflow-hidden flex flex-col h-full transform md:-translate-y-4 shadow-2xl"
             >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 pb-8 border-b border-neutral-800 relative z-10">
                   <div className="text-sm font-bold uppercase tracking-widest text-brand mb-2">LED Premium</div>
                   <h3 className="font-display font-black text-3xl md:text-4xl text-white">art.of.media</h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                   {[
                      "Minimaler Stromverbrauch",
                      "Lange Lebensdauer",
                      "Wartungsfrei",
                      "Farben bleiben brillant"
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

      {/* 5. 24/7 VISUALIZER */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Tag & Nacht</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              DEINE MARKE LEUCHTET 24/7
            </h2>
            <p className="text-xl text-neutral-600">LED-Technologie, die niemals schläft.</p>
          </div>

          <LEDBrightnessVisualizer />
        </div>
      </section>

      {/* 7. WEATHER RESISTANCE */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Wetterfest</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              FUNKTIONIERT BEI<br/>JEDEM WETTER
            </h2>
            <p className="text-xl text-neutral-600">IP65 zertifiziert: Regen, Schnee, Hitze - alles kein Problem.</p>
          </div>

          <WeatherResistanceVisualizer />
        </div>
      </section>

      {/* 8. VIDEO WALL SHOWCASE */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Dynamische Inhalte</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              VIDEOWÄNDE<br/>FÜR MAXIMALE AUFMERKSAMKEIT
            </h2>
            <p className="text-xl text-neutral-600">Perfekt für Messen, Events, Sport & Hotels.</p>
          </div>

          <VideoWallContentVisualizer />
        </div>
      </section>

      {/* 9. COLOR CHANGING LED */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Smart Features</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              FARBEN ÄNDERN<br/>PER APP
            </h2>
            <p className="text-xl text-neutral-600">RGB-Steuerung: Passe Farben an Events, Jahreszeiten oder Stimmung an.</p>
          </div>

          <ColorChangingLEDVisualizer />
        </div>
      </section>

      {/* 10. NEON FLICKER EFFECT */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Authentischer Look</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl mb-4">
              ECHTER NEON-EFFEKT<br/>OHNE NACHTEILE
            </h2>
            <p className="text-xl text-neutral-600">LED-Technologie mit authentischem Flicker-Effekt.</p>
          </div>

          <NeonFlickerVisualizer />
        </div>
      </section>

      {/* 11. KAUFEN ODER MIETEN */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Flexible Optionen</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-neutral-950 uppercase leading-[0.9]">
              KAUF ODER MIETE?<br/>DU ENTSCHEIDEST.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* KAUF */}
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white border-2 border-neutral-200 p-10 rounded-lg"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Fokus: Langfristig</div>
              <h3 className="font-display font-black text-3xl mb-6">Einmal zahlen.<br/>Für immer behalten.</h3>

              <ul className="space-y-4 mb-8">
                {[
                  "Einmalige Investition (steuerlich absetzbar)",
                  "15+ Jahre Lebensdauer garantiert",
                  "Volle Kontrolle & Eigentum",
                  "Keine monatlichen Kosten"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <Check className="text-brand shrink-0 mt-1" size={20} />
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleContactClick}
                className="w-full bg-neutral-950 text-white py-4 font-display font-bold uppercase hover:bg-brand hover:text-neutral-950 transition-all"
              >
                Kaufangebot anfordern
              </button>
            </motion.div>

            {/* MIETE */}
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,255,41,0.2)" }}
              className="bg-neutral-950 border-2 border-brand text-white p-10 rounded-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Fokus: Flexibilität</div>
                <h3 className="font-display font-black text-3xl mb-6">Null Anschaffungskosten.<br/>Volle Power.</h3>

                <ul className="space-y-4 mb-8">
                  {[
                    "Keine Anfangsinvestition",
                    "Flexible Laufzeiten (3-36 Monate)",
                    "Wartung & Service inklusive",
                    "Ideal für Events, Messen, Pop-Ups"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="text-brand shrink-0 mt-1" size={20} />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContactClick}
                  className="w-full bg-brand text-neutral-950 py-4 font-display font-bold uppercase hover:bg-white transition-all"
                >
                  Mietangebot anfordern
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-24 px-6 bg-white border-t border-neutral-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl mb-12 text-center uppercase">Häufige Fragen</h2>
          <div className="space-y-0 border-t border-neutral-200">
            <FaqItem
              q="Was kostet Leuchtschrift?"
              a="Das hängt von Größe, Material und Montage ab. Nach einem kostenlosen Erstgespräch bekommst du ein detailliertes Angebot – transparent, ohne versteckte Kosten."
            />
            <FaqItem
              q="Wie lange hält LED-Technik?"
              a="Unsere Premium-LED-Module haben eine Lebensdauer von 50.000+ Betriebsstunden. Das sind bei 12h Betrieb/Tag etwa 15 Jahre. Wir geben 10 Jahre Garantie auf alle Komponenten."
            />
                        <FaqItem
              q="Könnt ihr auch nur mieten?"
              a="Ja! Perfekt für Messen, Events oder wenn du erst testen willst. Flexible Laufzeiten ab 1 Monat, Wartung inklusive. Nach Mietende holen wir alles wieder ab."
            />
            <FaqItem
              q="Wartung – was muss ich beachten?"
              a="LED-Technik ist wartungsfrei. Kein Glühbirnen-Wechsel, kein Flackern. Bei Bedarf reinigen wir die Fronten (optional, alle 2 Jahre). Das war's."
            />
            <FaqItem
              q="Funktioniert das auch im Winter?"
              a="Absolut. Unsere Installationen sind IP65-zertifiziert: Wasserdicht, staubdicht, funktionieren von -20°C bis +50°C. Schnee, Regen, Hitze – alles kein Problem."
            />
          </div>
        </div>
      </section>

      {/* 14. FOOTER CTA */}
      <Footer showMainCta={true} onContactClick={handleContactClick} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Werbetechnik & Print" />
    </main>
  );
}
