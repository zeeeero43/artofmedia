# Art.of.Media - System-Architektur & Deployment-Flow

## System-Architektur

```
                                    INTERNET
                                       |
                                       v
                        +---------------------------+
                        |   DNS (artofmedia-        |
                        |   marketing.de)           |
                        +---------------------------+
                                       |
                                       v
                        +---------------------------+
                        |   FIREWALL (UFW)          |
                        |   Ports: 22, 80, 443      |
                        +---------------------------+
                                       |
                                       v
                        +---------------------------+
                        |   NGINX (Port 80/443)     |
                        |   - SSL Termination       |
                        |   - Static Files          |
                        |   - Reverse Proxy         |
                        |   - Security Headers      |
                        |   - Compression           |
                        |   - Rate Limiting         |
                        +---------------------------+
                                |              |
                    +-----------+              +------------+
                    |                                       |
                    v                                       v
        +----------------------+              +-------------------------+
        |  STATIC FILES        |              |  BACKEND API            |
        |  /frontend/dist/     |              |  http://localhost:3001  |
        |                      |              |                         |
        |  - React App         |              |  PM2 (Cluster Mode)     |
        |  - HTML/CSS/JS       |              |  - 2 Instances          |
        |  - Images            |              |  - Auto-Restart         |
        |  - Fonts             |              |  - Load Balancing       |
        +----------------------+              +-------------------------+
                                                          |
                                                          v
                                              +-------------------------+
                                              |  Node.js Express        |
                                              |  - Contact Form API     |
                                              |  - Email Service        |
                                              +-------------------------+
                                                          |
                                                          v
                                              +-------------------------+
                                              |  SMTP Server            |
                                              |  (Gmail/SendGrid)       |
                                              +-------------------------+
```

## Datenfluss

### 1. Statische Inhalte (Frontend)
```
Browser Request
    → HTTPS (Port 443)
    → Nginx
    → Serve from /var/www/artofmedia-marketing.de/frontend/dist/
    → Return with Cache Headers
```

### 2. API-Anfragen (Backend)
```
Browser Request (fetch('/api/contact'))
    → HTTPS (Port 443)
    → Nginx (Reverse Proxy)
    → localhost:3001/api/contact
    → PM2 → Node.js Express
    → Process Request
    → Send Email via SMTP
    → Return JSON Response
    → Nginx → Browser
```

## Verzeichnisstruktur

```
/var/www/artofmedia-marketing.de/
│
├── frontend/
│   └── dist/                        # React Production Build
│       ├── index.html
│       ├── assets/
│       │   ├── index-[hash].js
│       │   ├── index-[hash].css
│       │   └── logo-[hash].png
│       └── favicon.ico
│
├── backend/
│   ├── server.js                    # Express Server Entry
│   ├── routes/
│   │   └── contact.js
│   ├── services/
│   │   └── email.js
│   ├── .env                         # Environment Variables
│   ├── package.json
│   └── node_modules/
│
├── logs/
│   ├── nginx-access.log
│   ├── nginx-error.log
│   ├── pm2-out.log
│   └── pm2-error.log
│
├── ecosystem.config.js              # PM2 Configuration
├── backup.sh
├── monitoring.sh
└── update.sh
```

## Nginx-Routing-Logik

```nginx
# Request Flow Decision Tree

Request arrives
    |
    ├─ Protocol HTTP (Port 80)?
    │   └─> Redirect to HTTPS
    │
    └─ Protocol HTTPS (Port 443)
        |
        ├─ Path starts with /api/?
        │   └─> Proxy to http://localhost:3001
        │       - Add security headers
        │       - Apply rate limiting (10 req/s)
        │       - Set proper timeout (60s)
        │
        ├─ Path matches static assets (js|css|img)?
        │   └─> Serve from disk
        │       - Apply hotlink protection (images)
        │       - Set cache: 1 year
        │       - Gzip compression
        │
        ├─ Path /.well-known/acme-challenge/?
        │   └─> Serve from /var/www/html (Certbot)
        │
        ├─ Path /health?
        │   └─> Return 200 "healthy"
        │
        └─ All other paths
            └─> try_files $uri /index.html
                (React Router SPA handling)
```

## PM2 Process Management

```
PM2 Daemon (systemd service)
    |
    └─> PM2 Process Manager
        |
        ├─> artofmedia-backend Instance #1 (Worker 1)
        │   - Port: 3001 (shared)
        │   - Memory limit: 500MB
        │   - Auto-restart on crash
        │   - Watch mode: OFF (production)
        │
        └─> artofmedia-backend Instance #2 (Worker 2)
            - Port: 3001 (shared)
            - Memory limit: 500MB
            - Auto-restart on crash
            - Watch mode: OFF (production)

Load Balancing: Round-robin between instances
Health Checks: Every 10 seconds
Max Restarts: 10 within startup time
Restart Delay: 4 seconds
```

## Sicherheitsschichten

```
Layer 1: Network Level
    └─> UFW Firewall
        - Only ports 22, 80, 443 open
        - Default deny incoming

Layer 2: Application Level
    └─> Fail2ban
        - SSH brute-force protection
        - Nginx auth failure detection
        - Auto-ban after 5 failed attempts

Layer 3: Web Server Level
    └─> Nginx
        - Rate limiting (10-30 req/s)
        - SSL/TLS with modern ciphers
        - Security headers (HSTS, CSP, etc.)
        - Hidden server version
        - Deny access to sensitive files

Layer 4: Application Level
    └─> Node.js Express
        - CORS validation
        - Input sanitization
        - Environment variable isolation
        - Error handling (no stack traces)

Layer 5: Monitoring & Response
    └─> Monitoring Script
        - Health checks every 5 minutes
        - Alert on failures
        - Log analysis
```

## Deployment-Flow

### Initial Deployment
```
1. deploy.sh auf VPS ausführen
    ├─> System-Update
    ├─> Software-Installation (Node, Nginx, PM2, etc.)
    ├─> Firewall-Konfiguration
    ├─> Nginx-Setup mit Security
    ├─> SSL-Zertifikat von Let's Encrypt
    └─> PM2-Konfiguration

2. Projekt hochladen
    ├─> Frontend: dist/ → /var/www/.../frontend/dist/
    └─> Backend: server/ → /var/www/.../backend/

3. Environment konfigurieren
    └─> .env-Datei mit SMTP-Credentials

4. Backend starten
    ├─> npm install --production
    ├─> pm2 start ecosystem.config.js
    └─> pm2 startup (Auto-Start)

5. Verifizierung
    ├─> curl https://artofmedia-marketing.de
    ├─> pm2 status
    └─> Logs prüfen
```

### Update-Flow (Zero-Downtime)
```
1. update.sh lokal ausführen
    ├─> npm run build (lokal)
    └─> Warten auf Build-Completion

2. Backup auf VPS
    └─> dist/ → dist.backup.[timestamp]

3. Upload
    ├─> rsync dist/ → dist.new/
    └─> rsync server/ → backend/

4. Atomic Swap
    ├─> mv dist → dist.old
    ├─> mv dist.new → dist
    └─> rm -rf dist.old

5. Backend Reload
    ├─> npm install (falls package.json geändert)
    └─> pm2 reload artofmedia-backend
        - Rolling restart
        - Eine Instanz bleibt aktiv
        - Zero-Downtime

6. Verifizierung
    └─> pm2 status & curl Test
```

## SSL/TLS-Konfiguration

```
Certificate Provider: Let's Encrypt
    - Domain: artofmedia-marketing.de
    - SAN: www.artofmedia-marketing.de
    - Validity: 90 days
    - Auto-renewal: certbot.timer (systemd)

TLS Configuration:
    - Protocols: TLSv1.2, TLSv1.3
    - Ciphers: HIGH:!aNULL:!MD5
    - Session Cache: 10 minutes
    - OCSP Stapling: Enabled (by Certbot)
    - HSTS: max-age=31536000 (1 year)

Renewal Process:
    1. certbot.timer runs daily
    2. Checks if renewal needed (<30 days)
    3. Obtains new certificate
    4. Updates Nginx config
    5. Reloads Nginx (no downtime)
```

## Monitoring & Logging

### Log-Dateien
```
/var/www/artofmedia-marketing.de/logs/
├── nginx-access.log      # Alle HTTP-Anfragen
├── nginx-error.log       # Nginx-Fehler
├── pm2-out.log          # Backend stdout
└── pm2-error.log        # Backend stderr

/var/log/
├── nginx/               # System Nginx logs
├── fail2ban.log         # Banned IPs
└── syslog               # System logs
```

### Monitoring-Metriken
```
monitoring.sh überprüft:
    ├─> Website-Verfügbarkeit (HTTP 200)
    ├─> Response Time (<3s warning)
    ├─> SSL-Zertifikat (>30 Tage)
    ├─> Nginx Status (running)
    ├─> PM2 Prozesse (online)
    ├─> Backend API (responding)
    ├─> Disk Space (<80%)
    ├─> Memory Usage (<80%)
    ├─> Firewall Status (active)
    └─> Fail2ban Status (active)

Alerts bei:
    ├─> Website Down
    ├─> SSL-Ablauf <7 Tage
    ├─> PM2 Process Error
    ├─> Backend Nicht erreichbar
    ├─> Disk >90%
    └─> Memory >90%
```

## Backup-Strategie

```
backup.sh erstellt:
    ├─> Komprimiertes Archiv (tar.gz)
    │   - Frontend (dist/)
    │   - Backend (ohne node_modules)
    │   - Konfigurationsdateien
    │
    ├─> Manifest-Datei
    │   - Backup-Datum
    │   - Inhaltsverzeichnis
    │   - Restore-Anweisungen
    │
    └─> Separate Configs
        - Nginx-Konfiguration
        - PM2 Ecosystem

Retention Policy:
    - Aufbewahrung: 7 Tage
    - Speicherort: /root/backups/
    - Automatische Bereinigung alter Backups

Restore-Prozess:
    1. tar -xzf backup.tar.gz -C /var/www/
    2. npm install --production
    3. pm2 restart all
    4. systemctl reload nginx
```

## Performance-Optimierungen

### Nginx
```
- Gzip Compression (Level 6)
- Connection Keep-Alive (65s)
- Worker Processes: auto (CPU cores)
- Worker Connections: 1024
- Sendfile: on
- TCP_nopush: on
- TCP_nodelay: on
```

### Caching-Strategie
```
Static Assets (1 Jahr):
    - JavaScript/CSS mit Hash
    - Bilder
    - Schriftarten

HTML (No Cache):
    - index.html
    - Cache-Control: no-cache, must-revalidate

API (No Cache):
    - Alle /api/* Anfragen
```

### PM2 Cluster
```
- 2 Instanzen (Multi-Core-Nutzung)
- Load Balancing (Round-Robin)
- Graceful Reload (Zero-Downtime)
- Memory Limit (500MB pro Instanz)
- Auto-Restart bei Crash
```

## Skalierungsmöglichkeiten

### Vertikale Skalierung (Same Server)
```
1. PM2 Instanzen erhöhen
    - ecosystem.config.js: instances: 4

2. Nginx Worker erhöhen
    - worker_processes: auto

3. RAM upgraden
    - Mehr PM2 Instanzen
    - Größerer Nginx-Cache
```

### Horizontale Skalierung (Multiple Servers)
```
1. Load Balancer (z.B. HAProxy)
    └─> VPS 1 (App Server)
    └─> VPS 2 (App Server)

2. Shared Database (PostgreSQL/MongoDB)

3. Shared File Storage (S3/Object Storage)

4. Redis für Sessions/Caching

5. CDN für Static Assets
```

## Troubleshooting-Flow

```
Problem: Website nicht erreichbar
    |
    ├─> Check: curl https://artofmedia-marketing.de
    │   └─> Timeout?
    │       └─> Check: systemctl status nginx
    │           └─> Not running?
    │               └─> systemctl start nginx
    │
    ├─> Check: 502 Bad Gateway?
    │   └─> Check: pm2 status
    │       └─> Not running?
    │           └─> pm2 start ecosystem.config.js
    │
    └─> Check: 504 Gateway Timeout?
        └─> Check: pm2 logs
            └─> Application errors?
                └─> Fix code & pm2 restart

Problem: Backend-Fehler
    |
    ├─> Check: pm2 logs artofmedia-backend
    │   └─> Errors visible?
    │       └─> Fix und pm2 restart
    │
    └─> Check: .env configuration
        └─> SMTP credentials correct?

Problem: SSL-Fehler
    |
    └─> Check: certbot certificates
        └─> Expired?
            └─> certbot renew --force-renewal
```

## Best Practices

### Sicherheit
- Regelmäßige Updates: `apt update && apt upgrade`
- SSH Key-basierte Authentifizierung
- SSH-Port ändern (nicht 22)
- Root-Login deaktivieren
- Firewall aktiv halten
- Logs regelmäßig prüfen

### Performance
- CDN für statische Assets nutzen
- Image-Optimierung (WebP, Lazy-Loading)
- Code-Splitting (React)
- Database-Queries optimieren
- Redis-Caching für häufige Anfragen

### Monitoring
- UptimeRobot einrichten
- Google Analytics integrieren
- Error Tracking (Sentry)
- PM2 Plus für erweiterte Metriken
- Regelmäßige Performance-Tests

### Wartung
- Tägliche Backups
- Wöchentliche Log-Analyse
- Monatliche Security-Updates
- Quartalsweise Performance-Reviews
- Jährliche SSL-Zertifikats-Prüfung

---

**Dokumentation Version:** 1.0.0
**Letzte Aktualisierung:** 2025-11-25
**Projekt:** art.of.media
