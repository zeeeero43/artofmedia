'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, AlertTriangle, CheckCircle2, Clock, Gauge, TrendingDown, ArrowRight } from 'lucide-react';

interface PageSpeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

type ModalState = 'input' | 'loading' | 'results' | 'error';

interface PageSpeedResult {
  performanceScore: number;
  seoScore: number;
  loadTime: number;
  problems: Problem[];
  remainingProblemsCount?: number;
}

interface Problem {
  title: string;
  severity: 'critical' | 'high' | 'medium';
  lossDescription: string;
}

export const PageSpeedModal: React.FC<PageSpeedModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [state, setState] = useState<ModalState>('input');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState<PageSpeedResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Performance messen...',
    'Core Web Vitals checken...',
    'Probleme identifizieren...',
    'Ergebnisse auswerten...'
  ];

  const validateUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const analyzeWebsite = async () => {
    if (!validateUrl(url)) {
      setError('Bitte gib eine gültige URL ein (z.B. example.com)');
      return;
    }

    setError('');
    setState('loading');
    setLoadingStep(0);

    // Simulate loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 1500);

    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY || 'YOUR_API_KEY_HERE';
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&key=${apiKey}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=mobile`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      clearInterval(stepInterval);

      // Parse PageSpeed results
      const categories = data.lighthouseResult.categories;
      const performanceScore = Math.round(categories.performance.score * 100);
      const seoScore = Math.round(categories.seo.score * 100);
      const metrics = data.lighthouseResult.audits;

      // Calculate load time using LCP (Largest Contentful Paint)
      const loadTime = metrics['largest-contentful-paint']?.numericValue
        ? (metrics['largest-contentful-paint'].numericValue / 1000).toFixed(1)
        : (metrics['speed-index']?.numericValue / 1000).toFixed(1) || 0;

      // Extract problems from ALL audits
      const allAudits = data.lighthouseResult.audits;
      const problemsList: Problem[] = [];

      // Define problem mappings with emotional German descriptions
      const problemMappings: Record<string, { title: string; lossDesc: (score: number) => string }> = {
        'render-blocking-resources': {
          title: 'Deine Seite lädt zu langsam',
          lossDesc: (score) => score < 50 ? 'Besucher klicken weg, bevor sie überhaupt sehen was du anbietest.' : 'Potenzielle Kunden verlieren die Geduld und gehen zur Konkurrenz.'
        },
        'unused-css-rules': {
          title: 'Zu viel unnötiger Code',
          lossDesc: () => 'Die Seite ist überladen. Jede Sekunde Wartezeit kostet dich Kunden.'
        },
        'unused-javascript': {
          title: 'Zu viel unnötiger Code bremst dich aus',
          lossDesc: () => 'Besucher warten und warten. Bis sie es satt haben und abspringen.'
        },
        'modern-image-formats': {
          title: 'Deine Bilder sind viel zu groß',
          lossDesc: (score) => score < 40 ? 'Mobile Nutzer sehen nur einen weißen Screen. Und klicken weg.' : 'Google bestraft langsame Seiten. Du verlierst Rankings und Traffic.'
        },
        'offscreen-images': {
          title: 'Bilder laden, die keiner sieht',
          lossDesc: () => 'Du verschwendest Ladezeit für Bilder außerhalb des sichtbaren Bereichs.'
        },
        'unminified-css': {
          title: 'Code nicht komprimiert',
          lossDesc: () => 'Deine Dateien sind unnötig groß. Jedes Kilobyte verlangsamt die Seite.'
        },
        'unminified-javascript': {
          title: 'JavaScript nicht komprimiert',
          lossDesc: () => 'Riesige Dateien bremsen deine Website aus. Besucher warten zu lange.'
        },
        'server-response-time': {
          title: 'Dein Server ist zu langsam',
          lossDesc: () => 'Besucher starren auf einen leeren Screen. Die meisten verlassen die Seite sofort.'
        },
        'uses-text-compression': {
          title: 'Text-Dateien nicht komprimiert',
          lossDesc: () => 'Einfache Optimierung, die keiner gemacht hat. Kostet dich jeden Tag Kunden.'
        },
        'uses-responsive-images': {
          title: 'Bilder nicht für Handys optimiert',
          lossDesc: () => 'Mobile Nutzer laden riesige Desktop-Bilder. Das dauert ewig und frisst ihr Datenvolumen.'
        },
        'largest-contentful-paint': {
          title: 'Hauptinhalt erscheint viel zu spät',
          lossDesc: () => 'Besucher sehen lange nichts. 40% springen ab, bevor deine Seite überhaupt geladen ist.'
        },
        'total-blocking-time': {
          title: 'Seite reagiert nicht auf Klicks',
          lossDesc: () => 'Besucher versuchen zu klicken, aber nichts passiert. Frustrierend. Sie gehen.'
        }
      };

      // Count ALL problems first (for accurate count)
      // Include failed audits from all categories: Performance, SEO, Accessibility, Best Practices
      let totalProblemsCount = 0;
      for (const [key, audit] of Object.entries(allAudits)) {
        // Count audits that:
        // 1. Have a score and failed (score < 1.0 and score !== null)
        // 2. Are relevant (not manual or notApplicable)
        if (audit.score !== null && audit.score < 1.0 && audit.scoreDisplayMode !== 'notApplicable') {
          totalProblemsCount++;
        }
      }

      // Find top problems with mapped descriptions
      for (const [key, audit] of Object.entries(allAudits)) {
        if (problemMappings[key] && audit.score !== null && audit.score < 0.9) {
          const mapping = problemMappings[key];
          let severity: 'critical' | 'high' | 'medium' = 'medium';

          if (audit.score < 0.5) severity = 'critical';
          else if (audit.score < 0.75) severity = 'high';

          problemsList.push({
            title: mapping.title,
            severity,
            lossDescription: mapping.lossDesc(performanceScore)
          });
        }
      }

      // Sort by severity and take top 2
      const severityOrder = { critical: 0, high: 1, medium: 2 };
      problemsList.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
      const top2Problems = problemsList.slice(0, 2);
      const remainingProblemsCount = Math.max(0, totalProblemsCount - 2);

      // If less than 2 problems, add generic ones based on score
      if (top2Problems.length < 2 && performanceScore < 90) {
        const genericProblems: Problem[] = [
          {
            title: 'Suboptimale Performance kostet dich Kunden',
            severity: performanceScore < 50 ? 'critical' : 'high',
            lossDescription: 'Deine Conversion-Rate ist deutlich niedriger als sie sein könnte.'
          },
          {
            title: 'Verbesserungspotential wird verschenkt',
            severity: 'medium',
            lossDescription: 'Jeden Tag entgehen dir potenzielle Umsätze.'
          }
        ];
        top2Problems.push(...genericProblems.slice(0, 2 - top2Problems.length));
      }

      setResults({
        performanceScore,
        seoScore,
        loadTime: parseFloat(loadTime),
        problems: top2Problems,
        remainingProblemsCount
      });

      setState('results');
    } catch (err) {
      clearInterval(stepInterval);
      console.error('PageSpeed API Error:', err);
      setState('error');
    }
  };

  const handleClose = () => {
    setUrl('');
    setError('');
    setState('input');
    setResults(null);
    onClose();
  };

  const handleContactClick = () => {
    handleClose();
    if (onOpenContact) onOpenContact();
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 text-neutral-400 hover:text-neutral-950 transition-colors"
            >
              <X size={24} />
            </button>

            {/* LEFT: Info Section */}
            <div className="w-full md:w-2/5 bg-neutral-950 p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 mb-4 text-brand">
                    <Zap size={24} />
                  </div>
                  <h2 className="font-display font-black text-2xl md:text-3xl mb-4 leading-tight">
                    Kostenloser<br />Website-Check
                  </h2>
                  <p className="text-neutral-400 leading-relaxed">
                    Finde in 30 Sekunden heraus, warum deine Website nicht verkauft.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-300">Performance-Analyse mit Google PageSpeed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-300">Mobile Performance-Check</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-300">Sofortiges Ergebnis - keine Wartezeit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Content Section */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
              {/* INPUT STATE */}
              {state === 'input' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center"
                >
                  <h3 className="font-display font-bold text-2xl mb-2 text-neutral-950">
                    Teste deine Website
                  </h3>
                  <p className="text-neutral-500 mb-8">
                    Gib einfach deine URL ein und wir analysieren deine Performance.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                        Website URL
                      </label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && analyzeWebsite()}
                        placeholder="example.com"
                        className="w-full border-b-2 border-neutral-200 py-3 text-lg focus:outline-none focus:border-brand transition-colors"
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>

                    <button
                      onClick={analyzeWebsite}
                      className="w-full bg-brand text-neutral-950 py-4 font-bold uppercase text-sm tracking-widest hover:bg-neutral-950 hover:text-brand transition-all hover:shadow-[0_0_20px_rgba(0,255,41,0.3)] flex items-center justify-center gap-2"
                    >
                      Website analysieren <ArrowRight size={18} />
                    </button>

                    <p className="text-xs text-neutral-400 text-center">
                      Die Analyse dauert ca. 10-15 Sekunden
                    </p>
                  </div>
                </motion.div>
              )}

              {/* LOADING STATE */}
              {state === 'loading' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  {/* Animated Website Mockup */}
                  <div className="relative w-full max-w-md h-64 bg-neutral-100 rounded-lg border-2 border-neutral-200 mb-8 overflow-hidden">
                    {/* Browser Header */}
                    <div className="h-8 bg-neutral-200 border-b border-neutral-300 flex items-center px-3 gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>

                    {/* Website Content Placeholder */}
                    <div className="p-6 space-y-3">
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-3/4 h-4 bg-neutral-300 rounded"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        className="w-full h-3 bg-neutral-300 rounded"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        className="w-5/6 h-3 bg-neutral-300 rounded"
                      />
                    </div>

                    {/* Scanning Effect */}
                    <motion.div
                      animate={{ y: [0, 256, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"
                      style={{ top: 0 }}
                    />

                    {/* Glow Effect */}
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/30 blur-3xl rounded-full pointer-events-none"
                    />
                  </div>

                  {/* Loading Text */}
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-sm font-bold uppercase tracking-widest text-neutral-600 mb-4"
                  >
                    {loadingSteps[loadingStep]}
                  </motion.p>

                  {/* Progress Dots */}
                  <div className="flex gap-2">
                    {loadingSteps.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: i === loadingStep ? [1, 1.3, 1] : 1,
                          backgroundColor: i <= loadingStep ? '#00FF29' : '#e5e5e5'
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-2 h-2 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* RESULTS STATE */}
              {state === 'results' && results && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-2 text-neutral-950">
                      Deine Ergebnisse
                    </h3>
                    <p className="text-neutral-500">
                      Hier sind die wichtigsten Erkenntnisse zu deiner Website.
                    </p>
                  </div>

                  {/* Score & Load Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Performance Score */}
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Gauge size={16} className="text-neutral-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Performance Score
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`font-bold text-3xl ${
                            results.performanceScore >= 90
                              ? 'text-green-500'
                              : results.performanceScore >= 50
                              ? 'text-yellow-500'
                              : 'text-red-500'
                          }`}
                        >
                          {results.performanceScore}
                        </span>
                        <span className="text-neutral-400 text-sm">/100</span>
                      </div>
                    </div>

                    {/* Ladezeit mit Farbcodierung */}
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Clock size={16} className="text-neutral-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Mobile Ladezeit
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`font-bold text-3xl ${
                            results.loadTime <= 2.5
                              ? 'text-green-500'
                              : results.loadTime <= 4
                              ? 'text-yellow-500'
                              : 'text-red-500'
                          }`}
                        >
                          {results.loadTime}
                        </span>
                        <span className="text-neutral-400 text-sm">s</span>
                      </div>
                    </div>
                  </div>

                  {/* Top 2 Problems */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingDown size={20} className="text-red-500" />
                        <h4 className="font-bold text-lg text-neutral-950">
                          Die größten Probleme
                        </h4>
                      </div>
                      {results.remainingProblemsCount !== undefined && results.remainingProblemsCount > 0 && (
                        <span className="text-sm text-neutral-500 font-medium">
                          + {results.remainingProblemsCount} weitere {results.remainingProblemsCount === 1 ? 'Problem' : 'Probleme'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {results.problems.map((problem, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white border-2 border-neutral-200 p-4 rounded-lg hover:border-brand transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              problem.severity === 'critical'
                                ? 'bg-red-100 text-red-600'
                                : problem.severity === 'high'
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              <AlertTriangle size={18} />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-neutral-950 mb-1">
                                {problem.title}
                              </h5>
                              <p className="text-sm text-neutral-600">
                                {problem.lossDescription}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-neutral-950 p-6 rounded-lg">
                    <p className="text-white mb-4 font-medium">
                      <span className="text-brand font-bold">Willst du diese Probleme lösen?</span>
                      <br />Wir zeigen dir, wie deine Website 3x mehr verkauft.
                    </p>
                    <button
                      onClick={handleContactClick}
                      className="w-full bg-brand text-neutral-950 py-4 font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      Kostenlose Analyse buchen <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {state === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-red-50 p-4 rounded-full mb-6">
                    <AlertTriangle size={48} className="text-red-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2 text-neutral-950">
                    Analyse fehlgeschlagen
                  </h3>
                  <p className="text-neutral-500 mb-8 max-w-md">
                    Die Website konnte nicht analysiert werden. Das kann verschiedene Gründe haben.
                  </p>
                  <div className="space-y-3 w-full max-w-sm">
                    <button
                      onClick={() => setState('input')}
                      className="w-full bg-neutral-200 text-neutral-950 py-3 font-bold uppercase text-sm tracking-widest hover:bg-neutral-300 transition-colors"
                    >
                      Nochmal versuchen
                    </button>
                    <button
                      onClick={handleContactClick}
                      className="w-full bg-brand text-neutral-950 py-3 font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors"
                    >
                      Direkt Gespräch buchen
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
