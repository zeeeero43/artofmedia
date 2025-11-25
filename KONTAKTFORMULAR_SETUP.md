# Kontaktformular Setup Guide

Das Kontaktformular ist jetzt vollständig implementiert und sendet E-Mails über SMTP.

## 🚀 Schnellstart

### 1. SMTP-Zugangsdaten konfigurieren

Öffne die `.env.local` Datei und trage deine SMTP-Daten ein:

```env
# SMTP Configuration for Contact Form
SMTP_HOST=smtp.gmail.com                    # Dein SMTP Server
SMTP_PORT=587                               # Port (587 für TLS, 465 für SSL)
SMTP_SECURE=false                           # false für Port 587, true für 465
SMTP_USER=deine-email@gmail.com            # Deine E-Mail Adresse
SMTP_PASS=dein-app-passwort               # Dein App-Passwort (NICHT dein normales Passwort!)
SMTP_FROM_NAME=art.of.media               # Absender-Name
SMTP_FROM_EMAIL=deine-email@gmail.com     # Absender E-Mail
SMTP_TO_EMAIL=info@artofmedia.com         # Empfänger E-Mail (wohin die Anfragen gehen)
```

### 2. Gmail App-Passwort einrichten (falls du Gmail nutzt)

Gmail erlaubt keine normale Anmeldung mit deinem Passwort. Du musst ein **App-Passwort** erstellen:

1. Gehe zu [Google Account Settings](https://myaccount.google.com/)
2. **Sicherheit** → **2-Faktor-Authentifizierung** (muss aktiviert sein!)
3. Scrolle runter zu **App-Passwörter**
4. Klicke auf **App-Passwörter generieren**
5. Wähle "Mail" und "Sonstiges Gerät"
6. Kopiere das 16-stellige Passwort
7. Füge es als `SMTP_PASS` in die `.env.local` ein

**Wichtig:** Verwende KEIN Leerzeichen im App-Passwort!

### 3. Andere E-Mail-Anbieter

#### Outlook/Office 365
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine-email@outlook.com
SMTP_PASS=dein-passwort
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine-email@yahoo.com
SMTP_PASS=dein-app-passwort
```

#### Eigener SMTP-Server
```env
SMTP_HOST=mail.deine-domain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=dein-benutzername
SMTP_PASS=dein-passwort
```

## 🎯 Backend starten

### Terminal 1: Frontend (Vite)
```bash
npm run dev
```
Läuft auf: `http://localhost:3001`

### Terminal 2: Backend (Express)
```bash
npm run server
```
Läuft auf: `http://localhost:3001` (Backend API)

**Wichtig:** Beide Server müssen gleichzeitig laufen!

## 📧 E-Mail-Format

Die E-Mails werden schön formatiert versendet mit:

- **Betreff:** "Neue Kontaktanfrage von [Name] - [Interesse]"
- **Inhalt:**
  - Name
  - E-Mail (als anklickbarer Link)
  - Telefon (falls angegeben)
  - Interesse (ausgewählte Option)
  - Nachricht
  - Zeitstempel

Die E-Mail verwendet art.of.media Branding mit der grünen Farbe (#00FF29).

## 🔍 Testing

### Test 1: Backend-Server prüfen
```bash
curl http://localhost:3001/api/health
```
Erwartete Antwort: `{"status":"ok","timestamp":"..."}`

### Test 2: Formular testen
1. Öffne `http://localhost:3001` im Browser
2. Klicke auf einen CTA-Button
3. Fülle das Kontaktformular aus
4. Klicke auf "Absenden"
5. Du solltest "Nachricht erfolgreich gesendet!" sehen
6. Prüfe dein E-Mail-Postfach (SMTP_TO_EMAIL)

## 🐛 Troubleshooting

### "SMTP Configuration Error"
- **Problem:** SMTP-Zugangsdaten sind falsch
- **Lösung:** Prüfe `.env.local` und stelle sicher, dass alle Werte korrekt sind

### "Verbindung zum Server fehlgeschlagen"
- **Problem:** Backend läuft nicht
- **Lösung:** Starte `npm run server` in einem zweiten Terminal

### Gmail: "Invalid login"
- **Problem:** Du verwendest dein normales Gmail-Passwort
- **Lösung:** Erstelle ein App-Passwort (siehe Schritt 2 oben)

### "535 Authentication failed"
- **Problem:** Falsche Zugangsdaten oder 2FA nicht aktiviert
- **Lösung:** Bei Gmail: Aktiviere 2FA und erstelle App-Passwort

### E-Mails kommen nicht an
- **Problem:** Möglicherweise im Spam-Ordner
- **Lösung:** Prüfe den Spam-Ordner des Empfängers

## 📁 Dateien

- **`server.js`** - Backend API Server (Express + Nodemailer)
- **`components/contact-modal.tsx`** - Frontend Kontaktformular mit State Management
- **`.env.local`** - SMTP-Konfiguration (NICHT in Git committen!)
- **`.env.example`** - Template für Entwickler

## 🔒 Sicherheit

- ✅ `.env.local` ist in `.gitignore` (wird NICHT committed)
- ✅ E-Mail-Validierung im Backend
- ✅ CORS aktiviert für Frontend-Backend Kommunikation
- ✅ Required-Fields Validierung
- ✅ Fehlerbehandlung mit User-Feedback

## 🚀 Deployment (Produktion)

Für die Produktion musst du:

1. **Environment Variables** auf deinem Server setzen
2. **Backend separat deployen** (z.B. auf Vercel Functions, AWS Lambda, oder eigenem Node.js Server)
3. **API URL** im Frontend anpassen (aktuell: `http://localhost:3001/api/contact`)

Beispiel für Produktion in `contact-modal.tsx`:
```typescript
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.artofmedia.com/api/contact'
  : 'http://localhost:3001/api/contact';

const response = await fetch(API_URL, { ... });
```

## ✅ Checkliste

- [ ] SMTP-Zugangsdaten in `.env.local` eingetragen
- [ ] Gmail App-Passwort erstellt (falls Gmail)
- [ ] Backend mit `npm run server` gestartet
- [ ] Frontend mit `npm run dev` gestartet
- [ ] Testformular ausgefüllt und gesendet
- [ ] Test-E-Mail erfolgreich empfangen
- [ ] Spam-Ordner geprüft

---

**Bei Fragen oder Problemen, checke die Console-Logs:**
- Browser Console für Frontend-Fehler (F12)
- Terminal für Backend-Logs
