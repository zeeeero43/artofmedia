
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MapPin, Phone, Mail, Clock, Star, Building2, Truck, Lightbulb, Globe, Palette, Bot, ChevronRight } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { SEOHead, createLocalBusinessSchema, createBreadcrumbSchema, createServiceSchema } from '../../components/seo-head';
import { Link } from 'react-router-dom';

// FAQ Component
const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand transition-colors group"
      >
        <span className="font-display font-bold text-lg md:text-xl text-neutral-950 group-hover:text-brand transition-colors pr-8">
          {q}
        </span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-brand' : 'text-neutral-400'}`}>+</span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-neutral-600 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, link, keywords }: {
  icon: React.ElementType,
  title: string,
  description: string,
  link: string,
  keywords: string[]
}) => (
  <Link to={link}>
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 255, 41, 0.15)" }}
      className="group bg-white border border-neutral-200 p-8 h-full hover:border-brand transition-all duration-300"
    >
      <div className="bg-brand/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-brand transition-colors">
        <Icon className="text-brand group-hover:text-neutral-950 transition-colors" size={28} />
      </div>
      <h3 className="font-display font-bold text-xl mb-3 group-hover:text-brand transition-colors">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {keywords.map((kw, i) => (
          <span key={i} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1">{kw}</span>
        ))}
      </div>
      <span className="text-brand font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
        Mehr erfahren <ChevronRight size={16} />
      </span>
    </motion.div>
  </Link>
);

export default function MarketingAgenturDuisburgPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // SEO Structured Data
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://artofmedia-marketing.de/' },
    { name: 'Marketing Agentur Duisburg', url: 'https://artofmedia-marketing.de/marketing-agentur-duisburg' }
  ]);

  const localBusinessSchema = createLocalBusinessSchema();

  const serviceSchemas = [
    createServiceSchema('Webdesign', 'Professionelles Webdesign und E-Commerce Lösungen in Duisburg', 'https://artofmedia-marketing.de/webdesign-ecommerce'),
    createServiceSchema('KI Automatisierung', 'KI-gestützte Marketing-Automatisierung für Unternehmen in Duisburg', 'https://artofmedia-marketing.de/ki-automatisierungen'),
    createServiceSchema('Werbetechnik', 'Werbetechnik, Schilder und Fahrzeugbeschriftung in Duisburg', 'https://artofmedia-marketing.de/print-folie'),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet eine Marketing Agentur in Duisburg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Kosten variieren je nach Projekt. Eine professionelle Website beginnt ab ca. 2.500€, Werbetechnik-Projekte ab 500€. Wir erstellen immer ein individuelles Angebot nach einem kostenlosen Beratungsgespräch."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Leistungen bietet art.of.media in Duisburg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir bieten Webdesign & E-Commerce, KI-Automatisierung, Google Ads & SEO, Werbetechnik (Schilder, Fahrzeugbeschriftung), LED-Lichttechnik und strategische Marketing-Beratung - alles aus einer Hand in Duisburg."
        }
      },
      {
        "@type": "Question",
        "name": "Warum eine lokale Marketing Agentur in Duisburg wählen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Als lokale Agentur in Duisburg kennen wir den regionalen Markt, können persönliche Termine vor Ort anbieten und reagieren schnell. Für Werbetechnik-Projekte bieten wir Montage direkt in Duisburg und Umgebung."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert ein Website-Projekt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine professionelle Unternehmenswebsite erstellen wir in 2-3 Wochen. Online-Shops benötigen 4-6 Wochen. Nach einem Briefing-Gespräch nennen wir Ihnen den genauen Zeitrahmen."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet art.of.media auch Fahrzeugbeschriftung in Duisburg an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wir sind spezialisiert auf Fahrzeugbeschriftung und Car Wrapping in Duisburg. Von der Teilfolierung bis zur Vollverklebung - wir beraten Sie vor Ort und führen die Montage professionell durch."
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema, ...serviceSchemas, faqSchema]
  };

  const services = [
    {
      icon: Globe,
      title: "Webdesign & E-Commerce",
      description: "Moderne Websites und Online-Shops, die verkaufen. Optimiert für Google und Conversion.",
      link: "/webdesign-ecommerce",
      keywords: ["Webdesign Duisburg", "Online Shop", "WordPress"]
    },
    {
      icon: Bot,
      title: "KI Automatisierung",
      description: "Intelligente Chatbots und Workflow-Automatisierung für mehr Effizienz.",
      link: "/ki-automatisierungen",
      keywords: ["KI Chatbot", "Automation", "Workflows"]
    },
    {
      icon: Palette,
      title: "Beratung & Strategie",
      description: "Strategische Marketing-Beratung für nachhaltiges Wachstum.",
      link: "/beratung-strategie",
      keywords: ["Marketing Beratung", "Strategie", "Konzept"]
    },
    {
      icon: Building2,
      title: "Werbetechnik & Print",
      description: "Schilder, Fahrzeugbeschriftung, Folierung und Werbebanner.",
      link: "/print-folie",
      keywords: ["Werbetechnik Duisburg", "Fahrzeugbeschriftung", "Schilder"]
    },
    {
      icon: Lightbulb,
      title: "LED Lichttechnik",
      description: "Leuchtende Werbung: LED-Schilder, Leuchtreklame und Neon.",
      link: "/licht-leuchttechnik",
      keywords: ["LED Leuchtreklame", "Lichtwerbung", "Neon"]
    },
    {
      icon: Truck,
      title: "Google Marketing",
      description: "Google Ads, SEO und lokale Suchmaschinenoptimierung.",
      link: "/google-marketing",
      keywords: ["Google Ads Duisburg", "SEO", "Local SEO"]
    }
  ];

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      <SEOHead
        title="Marketing Agentur Duisburg | Webdesign, Werbetechnik & KI | art.of.media"
        description="Ihre Marketing Agentur in Duisburg: Webdesign, E-Commerce, Werbetechnik, Fahrzeugbeschriftung, KI-Automatisierung & Google Ads. Persönliche Beratung vor Ort. Jetzt kostenlos anfragen!"
        canonical="https://artofmedia-marketing.de/marketing-agentur-duisburg"
        keywords="Marketing Agentur Duisburg, Werbeagentur Duisburg, Webdesign Duisburg, Werbetechnik Duisburg, Fahrzeugbeschriftung Duisburg, Google Ads Duisburg, SEO Duisburg, KI Automatisierung, Leuchtreklame Duisburg, Schilder Duisburg"
        structuredData={structuredData}
        ogImage="https://artofmedia-marketing.de/og-duisburg.jpg"
      />

      <Navigation showBack={true} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-neutral-950 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/20 via-neutral-950 to-neutral-950" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 mb-8 border border-brand/30 bg-brand/10 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <MapPin size={14} className="text-brand" />
              Ihre lokale Agentur in Duisburg
            </div>

            {/* H1 - Primary Keyword */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tighter">
              MARKETING AGENTUR<br/>
              <span className="text-brand">DUISBURG</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              <strong className="text-white">Webdesign, Werbetechnik, KI-Automatisierung</strong> und <strong className="text-white">Google Marketing</strong> –
              alles aus einer Hand. Persönliche Beratung vor Ort in Duisburg.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="bg-brand text-neutral-950 px-10 py-5 font-display font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_40px_rgba(0,255,41,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Kostenlose Beratung <ArrowRight size={20} />
              </motion.button>
              <a
                href="tel:+491758000447"
                className="border-2 border-white/20 text-white px-10 py-5 font-display font-bold text-lg uppercase tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} /> +49 175 8000 447
              </a>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-brand" />
                <span>100% Lokal in Duisburg</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-brand" />
                <span>Persönlicher Ansprechpartner</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-brand" />
                <span>Montage vor Ort</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR - Local Focus */}
      <section className="py-8 px-6 bg-white border-b border-neutral-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl font-display font-bold text-brand">50+</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Projekte in Duisburg</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-200" />
            <div>
              <div className="text-3xl font-display font-bold text-brand">5.0</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                <Star size={12} className="fill-brand text-brand" /> Google Bewertung
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-200" />
            <div>
              <div className="text-3xl font-display font-bold text-brand">24h</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Antwortzeit</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-200" />
            <div>
              <div className="text-3xl font-display font-bold text-brand">NRW</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Servicegebiet</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Unsere Leistungen</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-6">
              FULL-SERVICE MARKETING<br/>IN DUISBURG
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Von der <strong>Website</strong> über <strong>Werbetechnik</strong> bis zur <strong>KI-Automatisierung</strong> –
              wir bieten alle Marketing-Leistungen aus einer Hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY DUISBURG SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Lokale Expertise</span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl mb-8 leading-tight">
                WARUM EINE<br/>
                <span className="text-brand">LOKALE AGENTUR</span><br/>
                IN DUISBURG?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-brand/10 w-12 h-12 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Persönliche Beratung vor Ort</h3>
                    <p className="text-neutral-600">Treffen Sie uns in unserem Büro in Duisburg oder wir kommen zu Ihnen – persönlich, nicht nur digital.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brand/10 w-12 h-12 flex items-center justify-center shrink-0">
                    <Truck className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Montage & Service in Duisburg</h3>
                    <p className="text-neutral-600">Für Werbetechnik-Projekte bieten wir professionelle Montage direkt vor Ort in Duisburg und Umgebung.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brand/10 w-12 h-12 flex items-center justify-center shrink-0">
                    <Clock className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Schnelle Reaktionszeiten</h3>
                    <p className="text-neutral-600">Als lokaler Partner reagieren wir schnell – innerhalb von 24 Stunden haben Sie eine Antwort.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brand/10 w-12 h-12 flex items-center justify-center shrink-0">
                    <Building2 className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Kenntnis des lokalen Marktes</h3>
                    <p className="text-neutral-600">Wir kennen Duisburg, die Region und verstehen die Bedürfnisse lokaler Unternehmen.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-neutral-950 p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full" />

              <div className="relative z-10">
                <h3 className="font-display font-bold text-3xl mb-6">Besuchen Sie uns</h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-brand shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Adresse</div>
                      <div className="text-neutral-400">
                        Grabenstraße 39<br/>
                        47057 Duisburg
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="text-brand shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Telefon</div>
                      <a href="tel:+491758000447" className="text-neutral-400 hover:text-brand transition-colors">
                        +49 (0) 175 8000 447
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="text-brand shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-bold">E-Mail</div>
                      <a href="mailto:info@artofmedia-marketing.de" className="text-neutral-400 hover:text-brand transition-colors">
                        info@artofmedia-marketing.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-brand shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Öffnungszeiten</div>
                      <div className="text-neutral-400">
                        Mo - Fr: 09:00 - 18:00 Uhr
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full bg-brand text-neutral-950 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Termin vereinbaren
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES / RESULTS - TEMPORARILY HIDDEN */}
      {false && <section className="py-24 px-6 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Erfolgsgeschichten</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl">
              ERGEBNISSE FÜR<br/>UNTERNEHMEN IN DUISBURG
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Result 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-neutral-900 border border-neutral-800 p-8"
            >
              <div className="text-5xl font-display font-bold text-brand mb-4">+340%</div>
              <h3 className="font-bold text-xl mb-2">Mehr Website-Anfragen</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Lokaler Handwerksbetrieb in Duisburg nach Website-Relaunch und Google Ads Kampagne.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-brand/20 text-brand px-2 py-1">Webdesign</span>
                <span className="text-xs bg-brand/20 text-brand px-2 py-1">Google Ads</span>
              </div>
            </motion.div>

            {/* Result 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-neutral-900 border border-neutral-800 p-8"
            >
              <div className="text-5xl font-display font-bold text-brand mb-4">15</div>
              <h3 className="font-bold text-xl mb-2">Fahrzeuge beschriftet</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Komplette Fahrzeugflotte eines Duisburger Unternehmens – Design, Produktion und Montage.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-brand/20 text-brand px-2 py-1">Fahrzeugbeschriftung</span>
              </div>
            </motion.div>

            {/* Result 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-neutral-900 border border-neutral-800 p-8"
            >
              <div className="text-5xl font-display font-bold text-brand mb-4">Platz 1</div>
              <h3 className="font-bold text-xl mb-2">Google Ranking</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Lokaler Dienstleister auf Position 1 bei Google für sein Hauptkeyword in Duisburg.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-brand/20 text-brand px-2 py-1">SEO</span>
                <span className="text-xs bg-brand/20 text-brand px-2 py-1">Local SEO</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-brand font-mono text-xs uppercase tracking-widest mb-4 block">Häufige Fragen</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl">
              FAQ: MARKETING AGENTUR<br/>IN DUISBURG
            </h2>
          </div>

          <div className="border-t border-neutral-200">
            <FaqItem
              q="Was kostet eine Marketing Agentur in Duisburg?"
              a="Die Kosten variieren je nach Projekt. Eine professionelle Website beginnt ab ca. 2.500€, Werbetechnik-Projekte ab 500€. Wir erstellen immer ein individuelles Angebot nach einem kostenlosen Beratungsgespräch."
            />
            <FaqItem
              q="Welche Leistungen bietet art.of.media in Duisburg?"
              a="Wir bieten Webdesign & E-Commerce, KI-Automatisierung, Google Ads & SEO, Werbetechnik (Schilder, Fahrzeugbeschriftung), LED-Lichttechnik und strategische Marketing-Beratung - alles aus einer Hand in Duisburg."
            />
            <FaqItem
              q="Warum eine lokale Marketing Agentur in Duisburg wählen?"
              a="Als lokale Agentur in Duisburg kennen wir den regionalen Markt, können persönliche Termine vor Ort anbieten und reagieren schnell. Für Werbetechnik-Projekte bieten wir Montage direkt in Duisburg und Umgebung."
            />
            <FaqItem
              q="Wie lange dauert ein Website-Projekt?"
              a="Eine professionelle Unternehmenswebsite erstellen wir in 2-3 Wochen. Online-Shops benötigen 4-6 Wochen. Nach einem Briefing-Gespräch nennen wir Ihnen den genauen Zeitrahmen."
            />
            <FaqItem
              q="Bietet art.of.media auch Fahrzeugbeschriftung in Duisburg an?"
              a="Ja, wir sind spezialisiert auf Fahrzeugbeschriftung und Car Wrapping in Duisburg. Von der Teilfolierung bis zur Vollverklebung - wir beraten Sie vor Ort und führen die Montage professionell durch."
            />
            <FaqItem
              q="Kann ich einen Termin vor Ort in Duisburg machen?"
              a="Selbstverständlich! Besuchen Sie uns in der Grabenstraße 39, 47057 Duisburg oder vereinbaren Sie einen Termin - wir kommen auch gerne zu Ihnen ins Unternehmen."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl mb-6">
            BEREIT FÜR<br/>
            <span className="text-brand">MEHR WACHSTUM?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Lassen Sie uns in einem kostenlosen Gespräch herausfinden, wie wir Ihr Unternehmen in Duisburg nach vorne bringen können.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactOpen(true)}
            className="bg-brand text-neutral-950 px-12 py-6 font-display font-bold text-xl uppercase tracking-wide hover:shadow-[0_0_60px_rgba(0,255,41,0.4)] transition-all"
          >
            Jetzt kostenlos beraten lassen
          </motion.button>

          <p className="mt-8 text-neutral-500 text-sm">
            Keine versteckten Kosten. Keine Verpflichtungen. 100% unverbindlich.
          </p>
        </div>
      </section>

      <Footer showMainCta={false} onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} selectedInterest="Allgemeine Anfrage" />
    </main>
  );
}
