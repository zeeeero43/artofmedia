# Art.of.Media - Quick Reference Card

Schnelle Referenz für die häufigsten Befehle und Operationen.

## Deployment (Erstes Mal)

```bash
# 1. Skript hochladen
scp deploy.sh root@VPS-IP:/tmp/

# 2. Auf VPS ausführen
ssh root@VPS-IP
bash /tmp/deploy.sh

# 3. Projekt bauen und hochladen
cd /home/kaan/artofmedia
npm run build
scp -r dist/* root@VPS-IP:/var/www/artofmedia-marketing.de/frontend/dist/
scp -r server/* root@VPS-IP:/var/www/artofmedia-marketing.de/backend/

# 4. Backend starten
ssh root@VPS-IP
cd /var/www/artofmedia-marketing.de/backend
npm install --production
sudo -u appuser pm2 start /var/www/artofmedia-marketing.de/ecosystem.config.js
sudo -u appuser pm2 save
pm2 startup systemd -u appuser --hp /home/appuser
```

## Updates (Zero-Downtime)

```bash
# update.sh konfigurieren (einmalig)
nano update.sh  # VPS_HOST und VPS_USER setzen

# Update durchführen
./update.sh
```

## PM2 Befehle

```bash
# Status aller Prozesse
sudo -u appuser pm2 status

# Logs anzeigen (live)
sudo -u appuser pm2 logs

# Logs der letzten 100 Zeilen
sudo -u appuser pm2 logs --lines 100

# Nur Fehler
sudo -u appuser pm2 logs --err

# Prozess neustarten
sudo -u appuser pm2 restart artofmedia-backend

# Alle neustarten
sudo -u appuser pm2 restart all

# Reload (Zero-Downtime)
sudo -u appuser pm2 reload artofmedia-backend

# Prozess stoppen
sudo -u appuser pm2 stop artofmedia-backend

# Monitoring
sudo -u appuser pm2 monit

# Detaillierte Info
sudo -u appuser pm2 info artofmedia-backend

# Prozess löschen
sudo -u appuser pm2 delete artofmedia-backend

# Alle Logs löschen
sudo -u appuser pm2 flush
```

## Nginx Befehle

```bash
# Konfiguration testen
nginx -t

# Reload (kein Downtime)
systemctl reload nginx

# Restart
systemctl restart nginx

# Status
systemctl status nginx

# Stoppen
systemctl stop nginx

# Starten
systemctl start nginx

# Logs live ansehen
tail -f /var/www/artofmedia-marketing.de/logs/nginx-access.log
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log

# Fehler-Log filtern
grep "error" /var/www/artofmedia-marketing.de/logs/nginx-error.log

# Konfiguration bearbeiten
nano /etc/nginx/sites-available/artofmedia-marketing.de
```

## SSL/Certbot

```bash
# Zertifikate anzeigen
certbot certificates

# Manuell erneuern
certbot renew

# Force renewal
certbot renew --force-renewal

# Dry-run (Test)
certbot renew --dry-run

# Auto-renewal Status
systemctl status certbot.timer

# Auto-renewal aktivieren
systemctl enable certbot.timer
systemctl start certbot.timer
```

## Logs

```bash
# Backend-Logs
sudo -u appuser pm2 logs artofmedia-backend

# Nginx Access-Log (letzte 50 Zeilen)
tail -n 50 /var/www/artofmedia-marketing.de/logs/nginx-access.log

# Nginx Error-Log (live)
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log

# System-Logs (Nginx)
journalctl -u nginx -f

# System-Logs (letzte Stunde)
journalctl -u nginx --since "1 hour ago"

# Alle Logs zusammen
tail -f /var/www/artofmedia-marketing.de/logs/*.log
```

## Firewall (UFW)

```bash
# Status anzeigen
ufw status

# Verbose Status
ufw status verbose

# Port öffnen
ufw allow 8080/tcp

# Port schließen
ufw delete allow 8080/tcp

# Firewall neu laden
ufw reload

# Firewall deaktivieren (VORSICHT!)
ufw disable

# Firewall aktivieren
ufw enable

# Regel nach Nummer löschen
ufw status numbered
ufw delete 5
```

## Fail2ban

```bash
# Status
fail2ban-client status

# SSH-Jail Status
fail2ban-client status sshd

# Nginx-Jail Status
fail2ban-client status nginx-limit-req

# IP entsperren
fail2ban-client unban 1.2.3.4

# Alle IPs entsperren
fail2ban-client unban --all

# Fail2ban neustarten
systemctl restart fail2ban

# Logs ansehen
tail -f /var/log/fail2ban.log
```

## Systeminfo & Monitoring

```bash
# Monitoring-Skript ausführen
./monitoring.sh

# Disk Space
df -h

# Disk Usage nach Verzeichnis
du -sh /var/www/artofmedia-marketing.de/*

# Memory Usage
free -h

# CPU & Memory (interaktiv)
htop

# Prozesse nach Memory sortiert
ps aux --sort=-%mem | head

# Prozesse nach CPU sortiert
ps aux --sort=-%cpu | head

# Netzwerk-Verbindungen
netstat -tulpn

# Port 3001 prüfen
netstat -tulpn | grep 3001

# Offene Dateien
lsof -i :3001

# System-Load
uptime

# System-Info
uname -a
```

## Backup & Restore

```bash
# Backup erstellen
sudo ./backup.sh

# Backups anzeigen
ls -lh /root/backups/

# Backup herunterladen
scp root@VPS-IP:/root/backups/artofmedia-backup-*.tar.gz ./

# Backup extrahieren
tar -xzf artofmedia-backup-*.tar.gz -C /tmp/

# Restore
tar -xzf backup.tar.gz -C /var/www/
cd /var/www/artofmedia-marketing.de/backend
npm install --production
sudo -u appuser pm2 restart all
systemctl reload nginx
```

## Testing

```bash
# Website HTTP-Status
curl -I https://artofmedia-marketing.de

# Website mit Details
curl -v https://artofmedia-marketing.de

# Backend API testen
curl http://localhost:3001/api/health

# Response-Time messen
time curl -s https://artofmedia-marketing.de > /dev/null

# DNS-Auflösung
dig artofmedia-marketing.de

# SSL-Test
openssl s_client -connect artofmedia-marketing.de:443 -servername artofmedia-marketing.de

# Headers überprüfen
curl -I https://artofmedia-marketing.de | grep -E "(X-|Strict|Content-Security)"
```

## Dateioperationen

```bash
# Berechtigungen setzen
chown -R appuser:appuser /var/www/artofmedia-marketing.de

# Frontend-Berechtigungen
chown -R www-data:www-data /var/www/artofmedia-marketing.de/frontend/dist

# Ausführbar machen
chmod +x script.sh

# .env bearbeiten
nano /var/www/artofmedia-marketing.de/backend/.env

# Dateien synchronisieren
rsync -avz --delete local/ root@VPS:/remote/

# Große Dateien finden
find /var/www -type f -size +100M
```

## Troubleshooting Quick-Fixes

```bash
# Website down?
systemctl status nginx
sudo -u appuser pm2 status

# 502 Bad Gateway?
sudo -u appuser pm2 restart artofmedia-backend

# Backend crashed?
sudo -u appuser pm2 logs
sudo -u appuser pm2 restart artofmedia-backend

# Out of memory?
free -h
sudo -u appuser pm2 restart all

# Disk full?
df -h
# Logs löschen
sudo -u appuser pm2 flush
find /var/log -type f -name "*.log" -mtime +7 -delete

# Port belegt?
netstat -tulpn | grep 3001
# Prozess killen
kill -9 PID

# Nginx config error?
nginx -t
nano /etc/nginx/sites-available/artofmedia-marketing.de
systemctl reload nginx

# SSL-Fehler?
certbot renew --force-renewal

# Permissions-Fehler?
chown -R appuser:appuser /var/www/artofmedia-marketing.de
```

## Wichtige Pfade

```bash
# Projekt
/var/www/artofmedia-marketing.de/

# Frontend
/var/www/artofmedia-marketing.de/frontend/dist/

# Backend
/var/www/artofmedia-marketing.de/backend/

# Logs
/var/www/artofmedia-marketing.de/logs/

# Nginx Config
/etc/nginx/sites-available/artofmedia-marketing.de

# PM2 Config
/var/www/artofmedia-marketing.de/ecosystem.config.js

# SSL-Zertifikate
/etc/letsencrypt/live/artofmedia-marketing.de/

# Backups
/root/backups/

# App-User Home
/home/appuser/
```

## Environment Variables (.env)

```bash
# .env bearbeiten
nano /var/www/artofmedia-marketing.de/backend/.env

# Notwendige Variablen:
NODE_ENV=production
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=contact@artofmedia-marketing.de
EMAIL_TO=admin@artofmedia-marketing.de
CORS_ORIGIN=https://artofmedia-marketing.de,https://www.artofmedia-marketing.de

# Nach Änderungen:
sudo -u appuser pm2 restart artofmedia-backend
```

## One-Liners

```bash
# Alles neustarten
sudo -u appuser pm2 restart all && systemctl reload nginx

# Status-Check
systemctl status nginx && sudo -u appuser pm2 status

# Alle Logs live
tail -f /var/www/artofmedia-marketing.de/logs/*.log

# Schneller Deploy (Frontend only)
npm run build && rsync -avz dist/ root@VPS:/var/www/artofmedia-marketing.de/frontend/dist/

# Komplett-Restart (nach Änderungen)
cd /var/www/artofmedia-marketing.de/backend && npm install --production && sudo -u appuser pm2 reload artofmedia-backend

# Log-Cleanup
sudo -u appuser pm2 flush && find /var/www/artofmedia-marketing.de/logs -type f -exec truncate -s 0 {} \;

# System-Health-Check
df -h && free -h && systemctl status nginx && sudo -u appuser pm2 status

# Security-Check
ufw status && fail2ban-client status && certbot certificates
```

## Cron Jobs einrichten

```bash
# Crontab bearbeiten
crontab -e

# Tägliches Backup (2 Uhr morgens)
0 2 * * * /var/www/artofmedia-marketing.de/backup.sh

# Monitoring alle 5 Minuten
*/5 * * * * /var/www/artofmedia-marketing.de/monitoring.sh >> /var/log/artofmedia-monitor.log 2>&1

# Wöchentliche Logs bereinigen (Sonntag 3 Uhr)
0 3 * * 0 find /var/www/artofmedia-marketing.de/logs -type f -mtime +7 -delete

# SSL-Renewal-Check (täglich 3 Uhr)
0 3 * * * certbot renew --quiet
```

## Nützliche Aliases

```bash
# In ~/.bashrc einfügen
echo 'alias pm2-status="sudo -u appuser pm2 status"' >> ~/.bashrc
echo 'alias pm2-logs="sudo -u appuser pm2 logs"' >> ~/.bashrc
echo 'alias pm2-restart="sudo -u appuser pm2 restart artofmedia-backend"' >> ~/.bashrc
echo 'alias nginx-reload="nginx -t && systemctl reload nginx"' >> ~/.bashrc
echo 'alias nginx-restart="systemctl restart nginx"' >> ~/.bashrc
echo 'alias logs-all="tail -f /var/www/artofmedia-marketing.de/logs/*.log"' >> ~/.bashrc
echo 'alias site-check="curl -I https://artofmedia-marketing.de"' >> ~/.bashrc
source ~/.bashrc
```

## Notfall-Kontakte & Links

```bash
# Website
https://artofmedia-marketing.de

# SSL-Test
https://www.ssllabs.com/ssltest/analyze.html?d=artofmedia-marketing.de

# Security Headers Test
https://securityheaders.com/?q=artofmedia-marketing.de

# PageSpeed Test
https://pagespeed.web.dev/analysis?url=https://artofmedia-marketing.de

# Uptime Monitoring (einrichten)
https://uptimerobot.com/
```

## Support-Kommandos für Fehleranalyse

```bash
# Komplett-Status-Report erstellen
cat > /tmp/status-report.txt <<EOF
=== System Info ===
$(uname -a)
$(date)

=== Disk Space ===
$(df -h)

=== Memory ===
$(free -h)

=== Nginx Status ===
$(systemctl status nginx)

=== PM2 Status ===
$(sudo -u appuser pm2 status)

=== Last 50 Nginx Errors ===
$(tail -n 50 /var/www/artofmedia-marketing.de/logs/nginx-error.log)

=== Last 50 PM2 Errors ===
$(sudo -u appuser pm2 logs --err --lines 50)

=== Firewall Status ===
$(ufw status)

=== SSL Certificate ===
$(certbot certificates)
EOF

# Report anzeigen
cat /tmp/status-report.txt

# Report herunterladen
scp root@VPS:/tmp/status-report.txt ./
```

---

**Tipp:** Speichern Sie diese Datei als Lesezeichen oder drucken Sie sie aus für schnellen Zugriff!

**Letzte Aktualisierung:** 2025-11-25
