# Testing Checkliste - SEO & PageSpeed Optimierung
## art.of.media marketing

---

## PRE-LAUNCH TESTING (Lokal)

### 1. Build erstellen und testen

```bash
# Build erstellen
npm run build

# Production Preview starten
npm run preview
```

**URL:** http://localhost:4173 (oder Port in der Konsole angezeigt)

### 2. Lighthouse Test (Chrome DevTools)

**So geht's:**
1. Chrome öffnen → http://localhost:4173
2. F12 drücken (DevTools öffnen)
3. Tab "Lighthouse" auswählen
4. "Desktop" UND "Mobile" testen
5. Alle Kategorien aktivieren
6. "Analyze page load" klicken

**Ziel-Scores:**
- ✅ Performance Desktop: 95-100
- ✅ Performance Mobile: 90-95
- ✅ SEO: 100
- ✅ Best Practices: 95-100
- ✅ Accessibility: 90-95

### 3. Manuelle Tests

#### Meta-Tags prüfen:
1. Seite öffnen
2. Rechtsklick → "Seitenquelltext anzeigen"
3. Prüfen:
   - ✅ `<title>` vorhanden und korrekt
   - ✅ Meta Description vorhanden
   - ✅ Open Graph Tags vorhanden
   - ✅ Canonical URL gesetzt
   - ✅ JSON-LD Structured Data im `<head>`

#### Navigation testen:
- ✅ Alle Links funktionieren
- ✅ 404-Seite erreichbar (ungültige URL eingeben)
- ✅ Impressum & Datenschutz erreichbar
- ✅ Service-Seiten laden korrekt

#### Mobile Responsive:
1. Chrome DevTools → Device Toolbar (Strg+Shift+M)
2. Verschiedene Geräte testen:
   - ✅ iPhone SE (375px)
   - ✅ iPhone 14 Pro (393px)
   - ✅ iPad (768px)
   - ✅ Desktop (1920px)

#### Bilder-Loading:
1. DevTools → Network Tab
2. Throttling auf "Slow 3G" setzen
3. Seite neu laden
4. Prüfen:
   - ✅ Bilder laden lazy (erst beim Scrollen)
   - ✅ Hero-Image lädt sofort (priority)
   - ✅ WebP-Format wird verwendet

---

## POST-LAUNCH TESTING (Online)

### 1. PageSpeed Insights

**URL:** https://pagespeed.web.dev/

1. Domain eingeben: `https://artofmedia-marketing.de`
2. Desktop UND Mobile analysieren
3. Core Web Vitals prüfen:
   - ✅ LCP < 2.5s
   - ✅ FID < 100ms
   - ✅ CLS < 0.1

### 2. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

1. URL eingeben
2. Prüfen:
   - ✅ LocalBusiness Schema erkannt
   - ✅ Keine Fehler im Structured Data
   - ✅ Alle Felder korrekt ausgefüllt

### 3. Mobile-Friendly Test

**URL:** https://search.google.com/test/mobile-friendly

1. URL eingeben
2. Ergebnis: ✅ "Page is mobile-friendly"

### 4. Sitemap Validation

**URL:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

1. Sitemap URL eingeben: `https://artofmedia-marketing.de/sitemap.xml`
2. Prüfen:
   - ✅ Alle URLs erreichbar (Status 200)
   - ✅ Keine 404-Fehler
   - ✅ Valides XML-Format

### 5. Google Search Console (nach Launch)

**URL:** https://search.google.com/search-console

**Setup:**
1. Property hinzufügen (Domain oder URL-Präfix)
2. Inhaberschaft bestätigen (HTML-Tag oder DNS)
3. Sitemap einreichen:
   - Sitemaps → "Neue Sitemap hinzufügen"
   - URL: `sitemap.xml`
   - Absenden

**Monitoring (nach 1-2 Wochen):**
- ✅ Indexierungsstatus prüfen
- ✅ Core Web Vitals Report ansehen
- ✅ Mobile Usability prüfen
- ✅ Structured Data ohne Fehler

---

## SEO-VALIDIERUNG

### 1. Title & Description Check

**Tool:** Manuell oder https://www.siteliner.com/

Für jede Seite prüfen:
```
Homepage:
✅ Title: "Marketing Agentur Duisburg | Webdesign & Werbetechnik | art.of.media"
✅ Description: "Marketing-Agentur in Duisburg für Webdesign, E-Commerce..."
✅ Länge: Title 50-60 Zeichen, Description 150-160 Zeichen

Impressum:
✅ Title: "Impressum | art.of.media marketing"
✅ noindex: ja

Datenschutz:
✅ Title: "Datenschutzerklärung | art.of.media marketing"
✅ noindex: ja
```

### 2. Structured Data Validation

**Tool:** https://validator.schema.org/

1. Seitenquelltext öffnen
2. JSON-LD aus `<head>` kopieren (zwischen `<script type="application/ld+json">...</script>`)
3. In Validator einfügen
4. Validieren: ✅ Keine Fehler

**Erwartete Schemas:**
- ✅ LocalBusiness
- ✅ WebSite
- ✅ Service (auf Service-Seiten)

### 3. Open Graph Preview

**Tool:** https://www.opengraph.xyz/

1. URL eingeben
2. Prüfen:
   - ✅ Bild wird angezeigt (1200x630px)
   - ✅ Title korrekt
   - ✅ Description korrekt
   - ✅ Vorschau sieht professionell aus

**Oder:** LinkedIn/Facebook Post Preview verwenden

---

## PERFORMANCE-MONITORING

### 1. Core Web Vitals (Field Data)

**Tool:** Google Search Console (nach 28 Tagen)

- ✅ LCP: "Good" (grün)
- ✅ FID: "Good" (grün)
- ✅ CLS: "Good" (grün)

### 2. GTmetrix (Optional)

**URL:** https://gtmetrix.com/

1. URL eingeben
2. Location: "Frankfurt, Germany" wählen
3. Ergebnisse:
   - ✅ Performance Grade: A (90%+)
   - ✅ Structure Grade: A (90%+)
   - ✅ Fully Loaded Time: < 3s

### 3. WebPageTest (Optional)

**URL:** https://www.webpagetest.org/

1. URL eingeben
2. Location: "Frankfurt, Germany"
3. Connection: "Cable" oder "4G"
4. Ergebnisse:
   - ✅ First Byte: < 0.5s
   - ✅ Start Render: < 1.5s
   - ✅ Speed Index: < 2.5s

---

## ACCESSIBILITY CHECK

### 1. WAVE Tool

**URL:** https://wave.webaim.org/

1. URL eingeben
2. Prüfen:
   - ✅ Keine Errors
   - ✅ Wenige Alerts (< 5)
   - ✅ Alle Bilder haben Alt-Texte

### 2. axe DevTools (Chrome Extension)

1. Extension installieren
2. Seite öffnen
3. axe ausführen
4. Ergebnis: ✅ Keine critical issues

---

## SECURITY CHECK

### 1. SSL/TLS Prüfung

**Tool:** https://www.ssllabs.com/ssltest/

1. Domain eingeben
2. Ergebnis: ✅ "A" oder höher

### 2. Security Headers

**Tool:** https://securityheaders.com/

1. URL eingeben
2. Prüfen:
   - ✅ X-Content-Type-Options: nosniff
   - ✅ X-Frame-Options: SAMEORIGIN
   - ✅ X-XSS-Protection: 1; mode=block
   - ✅ Note: A- oder höher

---

## BROWSER-KOMPATIBILITÄT

### Desktop Browser testen:
- ✅ Chrome (neueste Version)
- ✅ Firefox (neueste Version)
- ✅ Safari (Mac)
- ✅ Edge (neueste Version)

### Mobile Browser testen:
- ✅ Chrome Mobile (Android)
- ✅ Safari (iOS)
- ✅ Samsung Internet

**Prüfpunkte:**
- ✅ Layout korrekt
- ✅ Animationen funktionieren
- ✅ Navigation funktioniert
- ✅ Formulare funktionieren

---

## FINAL CHECKLIST (VOR LAUNCH)

### Inhalt:
- ✅ Alle Texte Korrektur gelesen
- ✅ Keine Lorem Ipsum
- ✅ Kontaktdaten korrekt (Telefon, E-Mail, Adresse)
- ✅ Impressum & Datenschutz aktuell

### Technik:
- ✅ Alle Links funktionieren (keine 404)
- ✅ Bilder laden korrekt
- ✅ Fonts laden korrekt
- ✅ Cookie-Banner funktioniert
- ✅ Kontaktformular funktioniert (Backend-Test)

### SEO:
- ✅ Sitemap.xml erreichbar
- ✅ Robots.txt erreichbar
- ✅ Meta-Tags auf allen Seiten
- ✅ Structured Data validiert
- ✅ H1 auf jeder Seite vorhanden

### Performance:
- ✅ Lighthouse Score > 90
- ✅ Build-Größe < 500KB (gzipped)
- ✅ Time to Interactive < 3s
- ✅ Keine Console Errors

---

## POST-LAUNCH MONITORING (erste 30 Tage)

### Woche 1:
- ✅ Google Search Console eingerichtet
- ✅ Sitemap eingereicht
- ✅ Indexierung gestartet
- ✅ Core Web Vitals überwachen

### Woche 2-4:
- ✅ Erste Rankings prüfen (Google "site:artofmedia-marketing.de")
- ✅ Analytics-Daten prüfen (Falls GA4 eingerichtet)
- ✅ Search Console Berichte prüfen

### Monat 2-3:
- ✅ Keyword-Rankings tracken
- ✅ Backlinks aufbauen
- ✅ Content hinzufügen (Blog, Case Studies)
- ✅ Google My Business optimieren

---

## TOOLS & RESSOURCEN

### Kostenlose SEO-Tools:
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

### Performance-Tools:
- Lighthouse (Chrome DevTools)
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

### Accessibility-Tools:
- WAVE: https://wave.webaim.org/
- axe DevTools (Chrome Extension)

### Security-Tools:
- SSL Labs: https://www.ssllabs.com/ssltest/
- Security Headers: https://securityheaders.com/

---

**Viel Erfolg beim Launch!**

Bei Fragen: info@artofmedia-marketing.de
