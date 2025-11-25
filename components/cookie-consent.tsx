import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export const CookieConsentBanner = () => {
  useEffect(() => {
    CookieConsent.run({
      // DSGVO-konform: opt-in Modus
      mode: 'opt-in',
      autoShow: true,

      // Cookie-Kategorien
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          enabled: false,
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: '_gid' }
            ]
          }
        },
        marketing: {
          enabled: false,
          autoClear: {
            cookies: [
              { name: /^_gcl/ }
            ]
          }
        }
      },

      // UI Optionen
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom right',
          equalWeightButtons: false,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false
        }
      },

      // Deutsche Texte
      language: {
        default: 'de',
        translations: {
          de: {
            consentModal: {
              title: 'Wir verwenden Cookies',
              description: 'Wir nutzen Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten. Einige Cookies sind notwendig für den Betrieb der Seite, während andere uns helfen, die Nutzung zu analysieren und unser Marketing zu verbessern.',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              showPreferencesBtn: 'Einstellungen verwalten',
              footer: '<a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutz</a>'
            },
            preferencesModal: {
              title: 'Cookie-Einstellungen',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              savePreferencesBtn: 'Auswahl speichern',
              closeIconLabel: 'Schließen',
              serviceCounterLabel: 'Dienst|Dienste',
              sections: [
                {
                  title: 'Cookie-Nutzung',
                  description: 'Wir verwenden Cookies, um grundlegende Funktionen zu ermöglichen und dein Erlebnis zu verbessern. Du kannst für jede Kategorie entscheiden, ob du sie zulassen möchtest.'
                },
                {
                  title: 'Notwendige Cookies <span class="pm__badge">Immer aktiv</span>',
                  description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. Sie speichern z.B. deine Cookie-Einstellungen.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analyse Cookies',
                  description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Alle Daten werden anonymisiert erfasst.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Name',
                      domain: 'Domain',
                      description: 'Beschreibung',
                      expiration: 'Ablauf'
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: 'artofmedia-marketing.de',
                        description: 'Google Analytics - Unterscheidung von Nutzern',
                        expiration: '2 Jahre'
                      },
                      {
                        name: '_gid',
                        domain: 'artofmedia-marketing.de',
                        description: 'Google Analytics - Unterscheidung von Nutzern',
                        expiration: '24 Stunden'
                      }
                    ]
                  }
                },
                {
                  title: 'Marketing Cookies',
                  description: 'Diese Cookies werden verwendet, um Werbung relevanter für dich zu gestalten. Sie können von uns oder unseren Werbepartnern gesetzt werden.',
                  linkedCategory: 'marketing',
                  cookieTable: {
                    headers: {
                      name: 'Name',
                      domain: 'Domain',
                      description: 'Beschreibung',
                      expiration: 'Ablauf'
                    },
                    body: [
                      {
                        name: '_gcl_au',
                        domain: 'artofmedia-marketing.de',
                        description: 'Google Ads - Conversion Tracking',
                        expiration: '90 Tage'
                      }
                    ]
                  }
                },
                {
                  title: 'Weitere Informationen',
                  description: 'Bei Fragen zu unseren Cookie-Richtlinien oder deinen Daten kontaktiere uns bitte unter <a class="cc__link" href="mailto:info@artofmedia-marketing.de">info@artofmedia-marketing.de</a>.'
                }
              ]
            }
          }
        }
      }
    });
  }, []);

  return null;
};
