
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { SEOHead } from '../../components/seo-head';

export default function ImpressumPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      {/* SEO Meta Tags */}
      <SEOHead
        title="Impressum"
        description="Impressum und Kontaktdaten von art.of.media marketing - Ugurkan Metan, Grabenstraße 39, 47057 Duisburg."
        canonical="https://artofmedia-marketing.de/impressum"
        noindex={true}
      />

      {/* Navigation */}
      <Navigation showBack={true} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.9] mb-8 tracking-tighter text-neutral-950">
              IMPRESSUM
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-4xl">

          {/* Anbieter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="border-l-4 border-brand pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Angaben zum Anbieter
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p className="font-bold text-neutral-950 text-xl">art.of.media marketing</p>
                <p>Ugurkan Metan</p>
                <div className="flex items-start gap-3 mt-4">
                  <MapPin className="text-brand shrink-0 mt-1" size={20} />
                  <div>
                    <p>Grabenstraße 39</p>
                    <p>47057 Duisburg</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kontakt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="border-l-4 border-brand pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Kontakt
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <div className="flex items-center gap-3">
                  <Phone className="text-brand shrink-0" size={20} />
                  <a href="tel:+491758000447" className="hover:text-brand transition-colors">
                    +49 (0) 175 8000 447
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-brand shrink-0" size={20} />
                  <a href="mailto:info@artofmedia-marketing.de" className="hover:text-brand transition-colors">
                    info@artofmedia-marketing.de
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Steuernummer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="border-l-4 border-brand pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Umsatzsteuer-ID
              </h2>
              <div className="space-y-2 text-lg text-neutral-700">
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                </p>
                <p className="font-bold text-neutral-950">DE365816336</p>
              </div>
            </div>
          </motion.div>

          {/* EU-Streitschlichtung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="border-l-4 border-brand pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                EU-Streitschlichtung
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:underline font-medium"
                >
                  https://ec.europa.eu/consumers/odr/
                  <ExternalLink size={16} />
                </a>
                <p className="text-neutral-600">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Verbraucherstreitbeilegung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="border-l-4 border-brand pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Haftung für Inhalte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="border-l-4 border-neutral-300 pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Haftung für Inhalte
              </h2>
              <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                  Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                  erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                  Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Haftung für Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12"
          >
            <div className="border-l-4 border-neutral-300 pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Haftung für Links
              </h2>
              <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                  Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
                  nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                  Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Urheberrecht */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="border-l-4 border-neutral-300 pl-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-neutral-950">
                Urheberrecht
              </h2>
              <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                  nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                  Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                  gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                  bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <Footer showMainCta={false} onContactClick={() => setIsContactOpen(true)} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
