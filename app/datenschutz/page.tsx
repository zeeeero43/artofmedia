
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Server, Cookie, FileText, Lock, UserCheck, AlertCircle } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ContactModal } from '../../components/contact-modal';
import { SEOHead } from '../../components/seo-head';

export default function DatenschutzPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const Section = ({ icon: Icon, title, children, delay = 0 }: { icon: React.ElementType, title: string, children: React.ReactNode, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-12"
    >
      <div className="border-l-4 border-brand pl-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="text-brand" size={24} />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-950">
            {title}
          </h2>
        </div>
        <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="bg-white min-h-screen text-neutral-950 font-sans selection:bg-brand selection:text-neutral-950">
      {/* SEO Meta Tags */}
      <SEOHead
        title="Datenschutzerklärung"
        description="Datenschutzerklärung gemäß DSGVO von art.of.media marketing. Informationen zur Verarbeitung personenbezogener Daten."
        canonical="https://artofmedia-marketing.de/datenschutz"
        noindex={true}
      />

      <Navigation showBack={true} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl leading-[0.9] mb-6 sm:mb-8 tracking-tighter text-neutral-900">
              DATENSCHUTZ
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
              Datenschutzerklärung gemäß Art. 13 und 14 DSGVO
            </p>
            <p className="text-sm text-neutral-400 mt-4">
              Stand: November 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto max-w-4xl">

          {/* 1. Verantwortlicher */}
          <Section icon={UserCheck} title="1. Verantwortlicher" delay={0.1}>
            <p className="font-bold text-neutral-950 text-lg">art.of.media marketing</p>
            <p>Ugurkan Metan</p>
            <div className="flex items-start gap-3 mt-4">
              <MapPin className="text-brand shrink-0 mt-1" size={18} />
              <div>
                <p>Grabenstraße 39</p>
                <p>47057 Duisburg</p>
                <p>Deutschland</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Phone className="text-brand shrink-0" size={18} />
              <a href="tel:+491758000447" className="hover:text-brand transition-colors">
                +49 (0) 175 8000 447
              </a>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Mail className="text-brand shrink-0" size={18} />
              <a href="mailto:info@artofmedia-marketing.de" className="hover:text-brand transition-colors">
                info@artofmedia-marketing.de
              </a>
            </div>
          </Section>

          {/* 2. Übersicht der Verarbeitungen */}
          <Section icon={FileText} title="2. Übersicht der Verarbeitungen" delay={0.15}>
            <p>
              Die nachfolgende Ubersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Bestandsdaten (z.B. Namen, Adressen)</li>
              <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z.B. Eingaben in Formularen)</li>
              <li>Nutzungsdaten (z.B. besuchte Seiten, Zugriffszeit)</li>
              <li>Meta-/Kommunikationsdaten (z.B. IP-Adressen, Browserinformationen)</li>
            </ul>
          </Section>

          {/* 3. Rechtsgrundlagen */}
          <Section icon={Shield} title="3. Rechtsgrundlagen" delay={0.2}>
            <p>Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung gegeben.</li>
              <li><strong>Vertragserfüllung (Art. 6 Abs. 1 S. 1 lit. b DSGVO)</strong> - Die Verarbeitung ist für die Erfüllung eines Vertrags erforderlich.</li>
              <li><strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c DSGVO)</strong> - Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich.</li>
              <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</strong> - Die Verarbeitung ist zur Wahrung berechtigter Interessen erforderlich.</li>
            </ul>
          </Section>

          {/* 4. Hosting */}
          <Section icon={Server} title="4. Hosting" delay={0.25}>
            <p>
              Unsere Website wird bei <strong>Hostinger</strong> gehostet. Die Server befinden sich in <strong>Deutschland</strong>.
            </p>
            <p className="mt-4">
              Bei jedem Zugriff auf unsere Website werden automatisch Informationen in sogenannten Server-Logfiles gespeichert:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>IP-Adresse (anonymisiert)</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
            <p className="mt-4">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und Optimierung des Angebots).
            </p>
            <p className="mt-2">
              <strong>Speicherdauer:</strong> Die Logfiles werden nach spätestens 7 Tagen gelöscht.
            </p>
          </Section>

          {/* 5. SSL/TLS-Verschlüsselung */}
          <Section icon={Lock} title="5. SSL/TLS-Verschlüsselung" delay={0.3}>
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p className="mt-4">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </Section>

          {/* 6. Lokale Ressourcen */}
          <Section icon={Server} title="6. Lokale Ressourcen" delay={0.35}>
            <p>
              Im Sinne des Datenschutzes werden alle technischen Ressourcen dieser Website lokal von unserem Server bereitgestellt:
            </p>

            <div className="mt-6 p-4 bg-white rounded border border-brand/30">
              <h4 className="font-bold text-neutral-950 mb-2 flex items-center gap-2">
                <Shield size={16} className="text-brand" />
                Keine externen CDN-Verbindungen
              </h4>
              <ul className="text-sm space-y-2">
                <li><strong>Schriftarten (Inter, Syne):</strong> Lokal gehostet - keine Verbindung zu Google Fonts</li>
                <li><strong>CSS-Framework (Tailwind):</strong> Lokal kompiliert - kein CDN</li>
                <li><strong>JavaScript-Bibliotheken:</strong> Lokal gebündelt - keine externen CDNs</li>
              </ul>
            </div>

            <p className="mt-4 text-sm text-neutral-600">
              <strong>Vorteil für Sie:</strong> Beim Besuch unserer Website werden keine Daten an Drittanbieter wie Google, Cloudflare oder andere CDN-Dienste übermittelt. Alle Ressourcen werden direkt von unserem deutschen Server (Hostinger) geladen.
            </p>
          </Section>

          {/* 7. Kontaktaufnahme */}
          <Section icon={Mail} title="7. Kontaktaufnahme" delay={0.4}>
            <p>
              Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail oder Telefon) werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung verarbeitet.
            </p>

            <div className="mt-6 p-4 bg-white rounded border border-neutral-200">
              <h4 className="font-bold text-neutral-950 mb-2">Kontaktformular</h4>
              <p className="text-sm">
                Wenn Sie unser Kontaktformular nutzen, werden folgende Daten verarbeitet:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer (optional)</li>
                <li>Ihre Nachricht</li>
                <li>IP-Adresse (für Missbrauchsschutz)</li>
              </ul>
              <p className="text-sm mt-4">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen)
              </p>
              <p className="text-sm mt-2">
                <strong>Speicherdauer:</strong> Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet wurde, es sei denn, gesetzliche Aufbewahrungspflichten stehen dem entgegen.
              </p>
            </div>
          </Section>

          {/* 8. Cookies */}
          <Section icon={Cookie} title="8. Cookies und Einwilligung" delay={0.45}>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerat gespeichert werden. Einige Cookies sind technisch notwendig, andere dienen der Analyse oder dem Marketing.
            </p>

            <div className="mt-6 p-4 bg-white rounded border border-neutral-200">
              <h4 className="font-bold text-neutral-950 mb-2">Cookie-Banner (TDDDG-konform)</h4>
              <p className="text-sm">
                Beim ersten Besuch unserer Website wird Ihnen ein Cookie-Banner angezeigt. Dort können Sie wählen, welche Cookies Sie akzeptieren möchten. Ihre Einwilligung können Sie jederzeit widerrufen.
              </p>
              <p className="text-sm mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für nicht notwendige Cookies, B 25 TDDDG
              </p>
            </div>

            <div className="mt-4 p-4 bg-white rounded border border-neutral-200">
              <h4 className="font-bold text-neutral-950 mb-2">Notwendige Cookies</h4>
              <p className="text-sm">
                Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.
              </p>
              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Zweck</th>
                    <th className="text-left py-2">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 font-mono text-xs">cc_cookie</td>
                    <td className="py-2">Speichert Ihre Cookie-Einstellungen</td>
                    <td className="py-2">6 Monate</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-white rounded border border-neutral-200">
              <h4 className="font-bold text-neutral-950 mb-2">Analyse-Cookies (optional)</h4>
              <p className="text-sm">
                Diese Cookies werden nur gesetzt, wenn Sie dem zustimmen. Sie helfen uns zu verstehen, wie Besucher unsere Website nutzen.
              </p>
              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Anbieter</th>
                    <th className="text-left py-2">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 font-mono text-xs">_ga</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">2 Jahre</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 font-mono text-xs">_gid</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">24 Stunden</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-white rounded border border-neutral-200">
              <h4 className="font-bold text-neutral-950 mb-2">Marketing-Cookies (optional)</h4>
              <p className="text-sm">
                Diese Cookies werden nur gesetzt, wenn Sie dem zustimmen. Sie dienen der Ausspielung relevanter Werbung.
              </p>
              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Anbieter</th>
                    <th className="text-left py-2">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 font-mono text-xs">_gcl_au</td>
                    <td className="py-2">Google Ads</td>
                    <td className="py-2">90 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 9. Betroffenenrechte */}
          <Section icon={UserCheck} title="9. Ihre Rechte als Betroffener" delay={0.5}>
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>

            <div className="space-y-4 mt-6">
              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Auskunftsrecht (Art. 15 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, Auskunft uber die von uns verarbeiteten personenbezogenen Daten zu verlangen.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Recht auf Berichtigung (Art. 16 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer Daten zu verlangen.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Recht auf Löschung (Art. 17 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Recht auf Einschränkung (Art. 18 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Widerspruchsrecht (Art. 21 DSGVO)</h4>
                <p className="text-sm mt-1">Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einzulegen.</p>
              </div>

              <div className="p-4 bg-white rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-950">Beschwerderecht (Art. 77 DSGVO)</h4>
                <p className="text-sm mt-1">
                  Sie haben das Recht, sich bei einer Aufsichtsbehorde zu beschweren. Die für uns zustandige Aufsichtsbehorde ist:
                </p>
                <p className="text-sm mt-2">
                  <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong><br />
                  Postfach 20 04 44<br />
                  40102 Düsseldorf<br />
                  <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">www.ldi.nrw.de</a>
                </p>
              </div>
            </div>
          </Section>

          {/* 10. Datensicherheit */}
          <Section icon={Shield} title="10. Datensicherheit" delay={0.55}>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>SSL/TLS-Verschlüsselung aller Datenübertragungen</li>
              <li>Regelmäßige Sicherheitsupdates</li>
              <li>Zugriffsbeschränkungen auf personenbezogene Daten</li>
              <li>Firewall und DDoS-Schutz</li>
            </ul>
          </Section>

          {/* 11. Änderungen */}
          <Section icon={AlertCircle} title="11. Änderungen dieser Datenschutzerklarung" delay={0.6}>
            <p>
              Wir behalten uns vor, diese Datenschutzerklarung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen unserer Dienste anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.
            </p>
            <p className="mt-4 font-bold text-neutral-950">
              Stand: November 2025
            </p>
          </Section>

        </div>
      </section>

      <Footer showMainCta={false} onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
