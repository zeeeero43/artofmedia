# Art.of.Media - VPS Deployment Quick Start

Dieses Repository enthält alle notwendigen Skripte und Konfigurationen für das vollautomatische Deployment der art.of.media Website auf einem frischen Ubuntu VPS.

## Schnellstart (5 Minuten zum Live-Gehen)

### Voraussetzungen

- Ubuntu 22.04/24.04 LTS VPS (min. 1GB RAM)
- Domain `artofmedia-marketing.de` zeigt auf die VPS-IP
- Root/SSH-Zugriff auf den VPS
- Node.js 20+ auf Ihrem lokalen Rechner

### Schritt 1: Deployment-Skript hochladen und ausführen

```bash
# Vom lokalen Rechner
scp deploy.sh root@ihre-vps-ip:/tmp/

# Auf den VPS einloggen
ssh root@ihre-vps-ip

# Skript ausführen (dauert 5-10 Minuten)
bash /tmp/deploy.sh
```

Das Skript installiert und konfiguriert automatisch:
- Node.js 20 LTS
- Nginx mit Security Headers
- SSL-Zertifikat (Let's Encrypt)
- PM2 Process Manager
- Fail2ban
- UFW Firewall

### Schritt 2: Projekt hochladen

```bash
# Lokal bauen
cd /home/kaan/artofmedia
npm install
npm run build

# Frontend hochladen
scp -r dist/* root@ihre-vps-ip:/var/www/artofmedia-marketing.de/frontend/dist/

# Backend hochladen
scp -r server/* root@ihre-vps-ip:/var/www/artofmedia-marketing.de/backend/
scp package.json package-lock.json root@ihre-vps-ip:/var/www/artofmedia-marketing.de/backend/
```

### Schritt 3: Umgebungsvariablen konfigurieren

```bash
# Auf VPS
ssh root@ihre-vps-ip
nano /var/www/artofmedia-marketing.de/backend/.env
```

Fügen Sie hinzu:
```env
NODE_ENV=production
PORT=3001

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort

EMAIL_FROM=contact@artofmedia-marketing.de
EMAIL_TO=admin@artofmedia-marketing.de

CORS_ORIGIN=https://artofmedia-marketing.de,https://www.artofmedia-marketing.de
```

### Schritt 4: Backend starten

```bash
cd /var/www/artofmedia-marketing.de/backend
npm install --production

sudo -u appuser pm2 start /var/www/artofmedia-marketing.de/ecosystem.config.js
sudo -u appuser pm2 save
pm2 startup systemd -u appuser --hp /home/appuser
```

### Schritt 5: Überprüfen

```bash
# PM2 Status
sudo -u appuser pm2 status

# Logs ansehen
sudo -u appuser pm2 logs

# Website testen
curl -I https://artofmedia-marketing.de
```

Ihre Website ist jetzt live unter: **https://artofmedia-marketing.de**

## Verfügbare Skripte

### 1. `deploy.sh` - Initiales VPS Setup
Vollautomatisches Setup eines frischen Ubuntu VPS mit allen notwendigen Services.

**Verwendung:**
```bash
sudo bash deploy.sh
```

### 2. `update.sh` - Zero-Downtime Updates
Automatisches Update Ihrer Website ohne Ausfallzeit.

**Einmalige Konfiguration:**
```bash
# Bearbeiten Sie update.sh und setzen Sie:
VPS_HOST="ihre-vps-ip"
VPS_USER="root"

chmod +x update.sh
```

**Verwendung:**
```bash
./update.sh
```

Das Skript:
- Baut Ihr Projekt lokal
- Erstellt Backup auf dem VPS
- Lädt neue Dateien hoch
- Deployed mit Zero-Downtime
- Startet Backend neu falls nötig

### 3. `monitoring.sh` - System Health Check
Überprüft den Status aller Services und der Website.

**Verwendung:**
```bash
./monitoring.sh
```

**Als Cron-Job einrichten (alle 5 Minuten):**
```bash
# Auf dem VPS
crontab -e

# Hinzufügen:
*/5 * * * * /var/www/artofmedia-marketing.de/monitoring.sh >> /var/log/artofmedia-monitor.log 2>&1
```

Überprüft:
- Website-Verfügbarkeit
- SSL-Zertifikat
- Nginx Status
- PM2 Prozesse
- Backend API
- Festplattenspeicher
- RAM-Nutzung
- Firewall
- Fail2ban

### 4. `backup.sh` - Automatische Backups
Erstellt komprimierte Backups Ihrer Website.

**Verwendung:**
```bash
sudo ./backup.sh
```

**Als täglicher Cron-Job (2 Uhr morgens):**
```bash
# Auf dem VPS
crontab -e

# Hinzufügen:
0 2 * * * /var/www/artofmedia-marketing.de/backup.sh
```

Backups werden gespeichert in: `/root/backups/`

## Wichtige Dateien

```
artofmedia/
├── deploy.sh                    # Haupt-Deployment-Skript
├── update.sh                    # Update-Skript
├── monitoring.sh                # Health-Check-Skript
├── backup.sh                    # Backup-Skript
├── .env.production.example      # Beispiel für Umgebungsvariablen
├── DEPLOYMENT.md                # Detaillierte Dokumentation
└── README-DEPLOYMENT.md         # Diese Datei
```

## Häufige Befehle

### PM2 Management
```bash
sudo -u appuser pm2 list          # Alle Prozesse anzeigen
sudo -u appuser pm2 restart all   # Alle neustarten
sudo -u appuser pm2 logs          # Logs anzeigen
sudo -u appuser pm2 monit         # Echtzeit-Monitoring
```

### Nginx Management
```bash
nginx -t                          # Konfiguration testen
systemctl reload nginx            # Neu laden (kein Downtime)
systemctl restart nginx           # Neustart
tail -f /var/www/artofmedia-marketing.de/logs/nginx-access.log
```

### SSL-Zertifikat
```bash
certbot certificates              # Zertifikate anzeigen
certbot renew                     # Manuell erneuern
systemctl status certbot.timer    # Auto-Renewal-Status
```

### Logs ansehen
```bash
# Backend-Logs
sudo -u appuser pm2 logs artofmedia-backend

# Nginx-Logs
tail -f /var/www/artofmedia-marketing.de/logs/nginx-access.log
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log

# System-Logs
journalctl -u nginx -f
```

## Projektstruktur auf dem VPS

```
/var/www/artofmedia-marketing.de/
├── frontend/
│   └── dist/                     # React Build (statische Dateien)
├── backend/
│   ├── server.js                 # Express Backend
│   ├── .env                      # Umgebungsvariablen
│   └── node_modules/
├── logs/
│   ├── nginx-access.log
│   ├── nginx-error.log
│   ├── pm2-out.log
│   └── pm2-error.log
├── ecosystem.config.js           # PM2 Konfiguration
└── backup.sh                     # Backup-Skript
```

## Nginx-Konfiguration Highlights

Die Nginx-Konfiguration enthält:

- **SSL/TLS**: Automatisch konfiguriert durch Certbot
- **HTTPS Redirect**: Alle HTTP-Anfragen → HTTPS
- **Security Headers**: HSTS, X-Frame-Options, CSP, etc.
- **Reverse Proxy**: `/api/*` → Backend auf Port 3001
- **Compression**: Gzip für alle Text-Dateien
- **Caching**: Aggressive Caching für statische Assets
- **Rate Limiting**: Schutz vor API-Missbrauch
- **Hotlink Protection**: Bilder-Schutz

## PM2-Konfiguration

- **Cluster Mode**: 2 Instanzen für Hochverfügbarkeit
- **Auto-Restart**: Bei Crashes automatischer Neustart
- **Memory Limit**: Neustart bei >500MB RAM
- **Log Rotation**: Automatisch
- **Startup Script**: Startet automatisch beim Server-Neustart

## Sicherheitsfeatures

- **Firewall (UFW)**: Nur Ports 22, 80, 443 offen
- **Fail2ban**: Schutz vor Brute-Force-Angriffen
- **SSL**: A+ Rating mit HSTS
- **Security Headers**: Moderne Browser-Sicherheit
- **Rate Limiting**: API-Schutz
- **Hidden Nginx Version**: Keine Versionsinformationen
- **Protected Files**: .env, .git, etc. nicht zugreifbar

## Troubleshooting

### Website nicht erreichbar
```bash
# Nginx-Status prüfen
systemctl status nginx

# Backend-Status prüfen
sudo -u appuser pm2 status

# Logs checken
sudo -u appuser pm2 logs
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log
```

### Backend startet nicht
```bash
# Logs ansehen
sudo -u appuser pm2 logs artofmedia-backend --lines 100

# Manuell testen
cd /var/www/artofmedia-marketing.de/backend
node server.js
```

### SSL-Probleme
```bash
# Zertifikat-Status
certbot certificates

# Manuell erneuern
certbot renew --force-renewal

# DNS prüfen
dig artofmedia-marketing.de
```

### 502 Bad Gateway
```bash
# Backend läuft nicht - starten
sudo -u appuser pm2 start ecosystem.config.js

# Port 3001 prüfen
netstat -tulpn | grep 3001
```

## Performance-Optimierung

### Aktivierte Features
- Gzip-Kompression
- Browser-Caching (1 Jahr für Assets)
- Keep-Alive Connections
- Cluster Mode (2 Instanzen)

### Optional aktivierbar
- Brotli-Kompression (bessere Kompression)
- HTTP/3 (QUIC)
- Redis-Caching
- CDN-Integration

## Support & Dokumentation

Detaillierte Informationen finden Sie in:
- `DEPLOYMENT.md` - Vollständige Deployment-Dokumentation
- `ecosystem.config.js` - PM2-Konfiguration
- `/etc/nginx/sites-available/artofmedia-marketing.de` - Nginx-Config

## Checkliste vor Go-Live

- [ ] DNS-Records korrekt gesetzt (A und CNAME)
- [ ] SSL-Zertifikat erfolgreich erhalten
- [ ] Firewall aktiv und konfiguriert
- [ ] Fail2ban läuft
- [ ] PM2 Startup-Skript konfiguriert
- [ ] Umgebungsvariablen gesetzt
- [ ] Kontaktformular getestet
- [ ] Alle Seiten laden korrekt
- [ ] Mobile Ansicht überprüft
- [ ] Security Headers aktiv (securityheaders.com testen)
- [ ] Backup-Skript eingerichtet
- [ ] Monitoring aktiv

## Kontakt & Hilfe

Bei Problemen:
1. Logs prüfen (PM2 und Nginx)
2. Monitoring-Skript ausführen: `./monitoring.sh`
3. Dokumentation in DEPLOYMENT.md konsultieren

---

**Tech Stack:**
- Frontend: React 19 + Vite + TypeScript + Tailwind CSS v4
- Backend: Node.js + Express
- Server: Ubuntu 22.04/24.04 LTS
- Web Server: Nginx
- Process Manager: PM2
- SSL: Let's Encrypt (Certbot)

**Version:** 1.0.0
**Letzte Aktualisierung:** 2025-11-25
