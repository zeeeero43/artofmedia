# Art.of.Media - Deployment Guide

Complete guide for deploying the art.of.media website to a fresh Ubuntu VPS.

## Prerequisites

- **VPS**: Ubuntu 22.04 or 24.04 LTS with at least 1GB RAM
- **Domain**: artofmedia-marketing.de DNS pointed to your VPS IP
- **Access**: SSH root access to the VPS
- **Local**: Node.js 20+ installed on your development machine

## Quick Start

### Step 1: Initial VPS Setup

From your VPS:

```bash
# 1. Copy the deployment script to your VPS
scp deploy.sh root@your-vps-ip:/tmp/

# 2. SSH into your VPS
ssh root@your-vps-ip

# 3. Run the deployment script
bash /tmp/deploy.sh
```

The script will take 5-10 minutes and will:
- Install Node.js 20 LTS, Nginx, PM2, Certbot, Fail2ban
- Configure firewall (UFW)
- Set up Nginx with security headers
- Obtain SSL certificate from Let's Encrypt
- Create PM2 configuration
- Configure automatic security measures

### Step 2: Upload Your Project

From your **local machine** (not the VPS):

```bash
# 1. Build the project locally
cd /home/kaan/artofmedia
npm install
npm run build

# 2. Upload frontend (built files)
scp -r dist/* root@your-vps-ip:/var/www/artofmedia-marketing.de/frontend/dist/

# 3. Upload backend
scp -r server/* root@your-vps-ip:/var/www/artofmedia-marketing.de/backend/
scp package.json package-lock.json root@your-vps-ip:/var/www/artofmedia-marketing.de/backend/
```

### Step 3: Configure Environment Variables

SSH into your VPS and create the .env file:

```bash
ssh root@your-vps-ip
nano /var/www/artofmedia-marketing.de/backend/.env
```

Add your configuration (see `.env.production.example`):

```env
NODE_ENV=production
PORT=3001

# SMTP settings for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

EMAIL_FROM=contact@artofmedia-marketing.de
EMAIL_TO=admin@artofmedia-marketing.de

CORS_ORIGIN=https://artofmedia-marketing.de,https://www.artofmedia-marketing.de
```

Save and exit (Ctrl+X, Y, Enter).

### Step 4: Start the Backend

```bash
# Install dependencies
cd /var/www/artofmedia-marketing.de/backend
npm install --production

# Start with PM2
sudo -u appuser pm2 start /var/www/artofmedia-marketing.de/ecosystem.config.js
sudo -u appuser pm2 save

# Enable PM2 startup on boot
pm2 startup systemd -u appuser --hp /home/appuser
```

### Step 5: Verify Deployment

```bash
# Check PM2 status
sudo -u appuser pm2 status

# Check PM2 logs
sudo -u appuser pm2 logs artofmedia-backend

# Check Nginx status
systemctl status nginx

# Check SSL certificate
certbot certificates

# Test your website
curl -I https://artofmedia-marketing.de
```

Visit: **https://artofmedia-marketing.de**

## Updating Your Website

Use the provided update script for zero-downtime deployments:

### One-Time Setup

Edit `update.sh` and set your VPS details:

```bash
VPS_HOST="your-vps-ip"  # Your VPS IP or hostname
VPS_USER="root"         # Your SSH user
```

Make it executable:

```bash
chmod +x update.sh
```

### Deploy Updates

From your local machine:

```bash
cd /home/kaan/artofmedia
./update.sh
```

This will:
1. Build your project locally
2. Create backup on VPS
3. Upload new files
4. Deploy with zero downtime
5. Restart backend if needed

## Manual Update Process

If you prefer manual control:

### Frontend Only Update

```bash
# Local machine
cd /home/kaan/artofmedia
npm run build
rsync -avz --delete dist/ root@your-vps:/var/www/artofmedia-marketing.de/frontend/dist/
```

### Backend Update

```bash
# Upload files
scp -r server/* root@your-vps:/var/www/artofmedia-marketing.de/backend/

# On VPS
ssh root@your-vps
cd /var/www/artofmedia-marketing.de/backend
npm install --production
sudo -u appuser pm2 reload artofmedia-backend
```

## Common Tasks

### View Logs

```bash
# PM2 logs (backend)
sudo -u appuser pm2 logs artofmedia-backend

# Nginx access logs
tail -f /var/www/artofmedia-marketing.de/logs/nginx-access.log

# Nginx error logs
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log

# System logs
journalctl -u nginx -f
```

### PM2 Management

```bash
# List all processes
sudo -u appuser pm2 list

# Restart backend
sudo -u appuser pm2 restart artofmedia-backend

# Stop backend
sudo -u appuser pm2 stop artofmedia-backend

# Monitor in real-time
sudo -u appuser pm2 monit

# View detailed info
sudo -u appuser pm2 info artofmedia-backend
```

### Nginx Management

```bash
# Test configuration
nginx -t

# Reload configuration (no downtime)
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View status
systemctl status nginx
```

### SSL Certificate Management

```bash
# View certificates
certbot certificates

# Renew certificates (happens automatically)
certbot renew

# Test renewal
certbot renew --dry-run

# Check auto-renewal timer
systemctl status certbot.timer
```

## Security

### Firewall Status

```bash
# View firewall rules
ufw status verbose

# Allow additional port (if needed)
ufw allow 8080/tcp
```

### Fail2ban

```bash
# Check status
fail2ban-client status

# View banned IPs for SSH
fail2ban-client status sshd

# Unban an IP
fail2ban-client unban 1.2.3.4
```

### SSH Hardening (Recommended)

After successful deployment:

```bash
# Edit SSH config
nano /etc/ssh/sshd_config
```

Recommended changes:
```
Port 2222                    # Change from default 22
PermitRootLogin no          # Disable root login
PasswordAuthentication no   # Use SSH keys only
```

Don't forget to:
1. Update UFW: `ufw allow 2222/tcp`
2. Remove old rule: `ufw delete allow 22/tcp`
3. Restart SSH: `systemctl restart sshd`

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
sudo -u appuser pm2 logs artofmedia-backend --lines 100

# Check if port 3001 is available
netstat -tulpn | grep 3001

# Test backend directly
curl http://localhost:3001/api/health
```

### Nginx 502 Bad Gateway

```bash
# Check if backend is running
sudo -u appuser pm2 status

# Check Nginx error logs
tail -f /var/www/artofmedia-marketing.de/logs/nginx-error.log

# Restart both services
sudo -u appuser pm2 restart all
systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Renew manually
certbot renew --force-renewal

# Verify DNS
dig artofmedia-marketing.de
```

### Permission Issues

```bash
# Fix ownership
chown -R appuser:appuser /var/www/artofmedia-marketing.de

# Fix Nginx permissions
chown -R www-data:www-data /var/www/artofmedia-marketing.de/frontend/dist
```

## Monitoring

### Website Health Check

```bash
# Check HTTP response
curl -I https://artofmedia-marketing.de

# Check backend API
curl https://artofmedia-marketing.de/api/health

# Monitor response time
time curl -s https://artofmedia-marketing.de > /dev/null
```

### System Resources

```bash
# CPU and memory usage
htop

# Disk usage
df -h

# PM2 monitoring
sudo -u appuser pm2 monit
```

### Set Up Monitoring (Optional)

Consider setting up:
- **UptimeRobot**: Free website monitoring
- **PM2 Plus**: Advanced PM2 monitoring
- **Sentry**: Error tracking for Node.js backend
- **Google Analytics**: Website analytics

## Backup Strategy

### Automated Backups

Create a backup script:

```bash
nano /root/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup website files
tar -czf $BACKUP_DIR/website-$DATE.tar.gz /var/www/artofmedia-marketing.de

# Keep only last 7 backups
find $BACKUP_DIR -name "website-*.tar.gz" -mtime +7 -delete
```

Add to crontab:
```bash
crontab -e
```

Add line:
```
0 2 * * * /root/backup.sh
```

### Manual Backup

```bash
# Create backup
tar -czf ~/artofmedia-backup-$(date +%Y%m%d).tar.gz /var/www/artofmedia-marketing.de

# Download to local machine
scp root@your-vps:~/artofmedia-backup-*.tar.gz ./
```

## Performance Optimization

### Enable Brotli Compression (Optional)

```bash
# Install Brotli module for Nginx
apt install nginx-module-brotli

# Edit Nginx config
nano /etc/nginx/nginx.conf
```

Add at the top:
```nginx
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;
```

### Enable HTTP/3 (Optional, for advanced users)

Requires Nginx compiled with QUIC support.

## Support

### Useful Resources

- Nginx documentation: https://nginx.org/en/docs/
- PM2 documentation: https://pm2.keymetrics.io/docs/
- Certbot documentation: https://certbot.eff.org/docs/
- Node.js best practices: https://github.com/goldbergyoni/nodebestpractices

### Common Commands Cheat Sheet

```bash
# Quick health check
systemctl status nginx
sudo -u appuser pm2 status
ufw status

# Quick restart
sudo -u appuser pm2 restart all
systemctl reload nginx

# View all logs
sudo -u appuser pm2 logs
tail -f /var/www/artofmedia-marketing.de/logs/*.log

# Certificate info
certbot certificates
```

## Production Checklist

Before going live:

- [ ] DNS properly configured (A and CNAME records)
- [ ] SSL certificate obtained and auto-renewal working
- [ ] Firewall enabled with only necessary ports
- [ ] Fail2ban running and configured
- [ ] PM2 startup script configured
- [ ] Environment variables properly set
- [ ] Contact form tested and working
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified
- [ ] Browser caching working (check headers)
- [ ] Security headers present (check with securityheaders.com)
- [ ] Backup script configured
- [ ] Monitoring set up

## License

This deployment configuration is part of the art.of.media project.

---

**Last Updated**: 2025-11-25
**Version**: 1.0.0
