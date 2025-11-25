#!/bin/bash
################################################################################
# ART.OF.MEDIA VPS Deployment Script
#
# This script automates the complete deployment of the art.of.media website
# on a fresh Ubuntu 22.04/24.04 LTS VPS.
#
# USAGE:
#   1. Copy this script to your VPS: scp deploy.sh user@your-vps:/tmp/
#   2. SSH into your VPS: ssh user@your-vps
#   3. Run as root: sudo bash /tmp/deploy.sh
#
# WHAT IT DOES:
#   - Installs Node.js 20 LTS, Nginx, PM2, Certbot, Fail2ban
#   - Configures UFW firewall
#   - Sets up Nginx with SSL, security headers, and reverse proxy
#   - Configures PM2 for backend process management
#   - Deploys your React frontend and Node.js backend
#
# REQUIREMENTS:
#   - Fresh Ubuntu 22.04/24.04 LTS VPS
#   - Domain DNS already pointing to this server
#   - Root/sudo access
################################################################################

set -e  # Exit on any error
set -o pipefail  # Catch errors in pipes

# === CONFIGURATION VARIABLES ===
DOMAIN="artofmedia-marketing.de"
WWW_DOMAIN="www.$DOMAIN"
PROJECT_PATH="/var/www/$DOMAIN"
EMAIL="admin@$DOMAIN"
NODE_VERSION="20"
BACKEND_PORT="3001"
APP_USER="appuser"

# === COLOR CODES FOR OUTPUT ===
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'  # No Color

# === HELPER FUNCTIONS ===
print_step() {
    echo -e "\n${CYAN}==============================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${CYAN}==============================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

print_step "[1/9] SYSTEM UPDATE & TIMEZONE CONFIGURATION"
apt update -qq
apt upgrade -y -qq
timedatectl set-timezone Europe/Berlin
print_success "System updated and timezone set to Europe/Berlin"

print_step "[2/9] INSTALLING CORE PACKAGES"

# Install Node.js 20 LTS
if ! command -v node &> /dev/null; then
    print_info "Installing Node.js ${NODE_VERSION} LTS..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs
    print_success "Node.js $(node -v) installed"
else
    print_info "Node.js already installed: $(node -v)"
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    print_info "Installing Nginx..."
    apt install -y nginx
    print_success "Nginx installed"
else
    print_info "Nginx already installed"
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    print_info "Installing Certbot..."
    apt install -y certbot python3-certbot-nginx
    print_success "Certbot installed"
else
    print_info "Certbot already installed"
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    print_info "Installing PM2..."
    npm install -g pm2
    print_success "PM2 installed"
else
    print_info "PM2 already installed"
fi

# Install Fail2ban
if ! command -v fail2ban-client &> /dev/null; then
    print_info "Installing Fail2ban..."
    apt install -y fail2ban
    systemctl enable fail2ban
    systemctl start fail2ban
    print_success "Fail2ban installed and started"
else
    print_info "Fail2ban already installed"
fi

# Install additional utilities
apt install -y git curl wget unzip ufw

print_step "[3/9] FIREWALL CONFIGURATION"
print_info "Configuring UFW firewall..."

# Reset UFW to default state
ufw --force reset

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (IMPORTANT: Do this first!)
ufw allow 22/tcp comment 'SSH'

# Allow HTTP and HTTPS
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Enable UFW
ufw --force enable

print_success "Firewall configured (ports 22, 80, 443 open)"
ufw status

print_step "[4/9] CREATING APPLICATION USER"
if id "$APP_USER" &>/dev/null; then
    print_info "User $APP_USER already exists"
else
    useradd -m -s /bin/bash $APP_USER
    print_success "Created application user: $APP_USER"
fi

print_step "[5/9] PROJECT DIRECTORY SETUP"
# Create project directory
if [ ! -d "$PROJECT_PATH" ]; then
    mkdir -p $PROJECT_PATH
    print_success "Created project directory: $PROJECT_PATH"
else
    print_info "Project directory already exists"
fi

# Create subdirectories
mkdir -p $PROJECT_PATH/frontend
mkdir -p $PROJECT_PATH/backend
mkdir -p $PROJECT_PATH/logs

# Set ownership
chown -R $APP_USER:$APP_USER $PROJECT_PATH

print_warning "IMPORTANT: You need to upload your project files!"
print_info "Commands to upload from your local machine:"
echo -e "${YELLOW}
# Option 1: Using SCP (from your local machine)
scp -r /home/kaan/artofmedia/dist root@your-vps:$PROJECT_PATH/frontend/
scp -r /home/kaan/artofmedia/server root@your-vps:$PROJECT_PATH/backend/
scp /home/kaan/artofmedia/package*.json root@your-vps:$PROJECT_PATH/backend/

# Option 2: Using Git (on the VPS)
# cd $PROJECT_PATH/backend
# git clone your-repo-url .
# npm install --production
${NC}"

print_step "[6/9] NGINX CONFIGURATION"

# Backup existing config if present
if [ -f /etc/nginx/sites-available/$DOMAIN ]; then
    cp /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-available/$DOMAIN.backup.$(date +%Y%m%d_%H%M%S)
    print_info "Existing config backed up"
fi

print_info "Creating Nginx configuration..."

cat > /etc/nginx/sites-available/$DOMAIN <<'NGINX_EOF'
# Rate limiting configuration
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=30r/s;

# Upstream backend server
upstream backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name artofmedia-marketing.de www.artofmedia-marketing.de;

    # Allow Certbot ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name artofmedia-marketing.de www.artofmedia-marketing.de;

    # SSL certificates (will be configured by Certbot)
    # ssl_certificate /etc/letsencrypt/live/artofmedia-marketing.de/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/artofmedia-marketing.de/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self';" always;

    # Hide Nginx version
    server_tokens off;

    # Root directory for static files
    root /var/www/artofmedia-marketing.de/frontend/dist;
    index index.html;

    # Logging
    access_log /var/www/artofmedia-marketing.de/logs/nginx-access.log;
    error_log /var/www/artofmedia-marketing.de/logs/nginx-error.log warn;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Brotli compression (if available)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # API proxy to Node.js backend
    location /api/ {
        # Rate limiting
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;

        # Proxy settings
        proxy_pass http://backend;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
        # Hotlink protection
        valid_referers none blocked artofmedia-marketing.de www.artofmedia-marketing.de;
        if ($invalid_referer) {
            return 403;
        }

        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.(css|js|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.(pdf|doc|docx)$ {
        expires 1d;
        add_header Cache-Control "public, must-revalidate";
    }

    # React Router: serve index.html for all routes
    location / {
        limit_req zone=general_limit burst=50 nodelay;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Deny access to sensitive files
    location ~* (\.env|\.git|\.gitignore|package\.json|package-lock\.json|composer\.json|composer\.lock)$ {
        deny all;
        return 404;
    }

    # Health check endpoint (optional)
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
NGINX_EOF

print_success "Nginx configuration created"

# Create symlink
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
if nginx -t; then
    print_success "Nginx configuration test passed"
    systemctl reload nginx
    print_success "Nginx reloaded"
else
    print_error "Nginx configuration test failed"
    exit 1
fi

print_step "[7/9] PM2 ECOSYSTEM CONFIGURATION"

cat > $PROJECT_PATH/ecosystem.config.js <<'PM2_EOF'
module.exports = {
  apps: [{
    name: 'artofmedia-backend',
    cwd: '/var/www/artofmedia-marketing.de/backend',
    script: 'server.js',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/www/artofmedia-marketing.de/logs/pm2-error.log',
    out_file: '/var/www/artofmedia-marketing.de/logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};
PM2_EOF

chown $APP_USER:$APP_USER $PROJECT_PATH/ecosystem.config.js
print_success "PM2 ecosystem configuration created"

print_step "[8/9] SSL CERTIFICATE SETUP"

print_warning "IMPORTANT: Make sure your domain DNS is already pointing to this server!"
print_info "Checking if domain resolves to this server..."

SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)

print_info "Server IP: $SERVER_IP"
print_info "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    print_warning "Domain IP does not match server IP!"
    print_warning "Please update your DNS records and run this command manually later:"
    echo -e "${YELLOW}certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos -m $EMAIL --redirect${NC}"
else
    print_info "DNS looks good! Obtaining SSL certificate..."

    # Obtain SSL certificate
    certbot --nginx -d $DOMAIN -d $WWW_DOMAIN \
        --non-interactive \
        --agree-tos \
        -m $EMAIL \
        --redirect

    print_success "SSL certificate obtained and configured"

    # Test auto-renewal
    certbot renew --dry-run
    print_success "SSL auto-renewal test passed"
fi

# Verify certbot timer is active
if systemctl is-active --quiet certbot.timer; then
    print_success "Certbot auto-renewal timer is active"
else
    systemctl enable certbot.timer
    systemctl start certbot.timer
    print_success "Certbot auto-renewal timer enabled"
fi

print_step "[9/9] FAIL2BAN CONFIGURATION"

# Configure Fail2ban for Nginx
cat > /etc/fail2ban/jail.local <<'FAIL2BAN_EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = admin@artofmedia-marketing.de
sendername = Fail2Ban
action = %(action_mwl)s

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/www/artofmedia-marketing.de/logs/nginx-error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/www/artofmedia-marketing.de/logs/nginx-error.log
maxretry = 10

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/www/artofmedia-marketing.de/logs/nginx-access.log
maxretry = 2
FAIL2BAN_EOF

systemctl restart fail2ban
print_success "Fail2ban configured and restarted"

# === FINAL SETUP INSTRUCTIONS ===
print_step "DEPLOYMENT COMPLETE! NEXT STEPS:"

echo -e "${GREEN}
================================================================================
                    ART.OF.MEDIA DEPLOYMENT SUMMARY
================================================================================
${NC}"

print_success "System configured successfully!"
echo ""

print_info "PROJECT PATHS:"
echo "  - Project root: $PROJECT_PATH"
echo "  - Frontend: $PROJECT_PATH/frontend/dist"
echo "  - Backend: $PROJECT_PATH/backend"
echo "  - Logs: $PROJECT_PATH/logs"
echo ""

print_info "SERVICES STATUS:"
systemctl is-active --quiet nginx && print_success "Nginx: Running" || print_error "Nginx: Stopped"
systemctl is-active --quiet fail2ban && print_success "Fail2ban: Running" || print_error "Fail2ban: Stopped"
systemctl is-active --quiet certbot.timer && print_success "Certbot auto-renewal: Active" || print_warning "Certbot timer: Inactive"
echo ""

print_warning "TO COMPLETE THE DEPLOYMENT:"
echo ""
echo "1. UPLOAD YOUR PROJECT FILES (from your local machine):"
echo -e "${CYAN}"
echo "   # Build your project locally first:"
echo "   cd /home/kaan/artofmedia"
echo "   npm install"
echo "   npm run build"
echo ""
echo "   # Upload frontend (dist folder):"
echo "   scp -r dist/* root@your-vps:$PROJECT_PATH/frontend/dist/"
echo ""
echo "   # Upload backend:"
echo "   scp -r server/* root@your-vps:$PROJECT_PATH/backend/"
echo "   scp package.json package-lock.json root@your-vps:$PROJECT_PATH/backend/"
echo -e "${NC}"
echo ""

echo "2. CREATE ENVIRONMENT FILE ON SERVER:"
echo -e "${CYAN}"
echo "   ssh root@your-vps"
echo "   nano $PROJECT_PATH/backend/.env"
echo ""
echo "   # Add your environment variables:"
echo "   NODE_ENV=production"
echo "   PORT=3001"
echo "   SMTP_HOST=your-smtp-host"
echo "   SMTP_PORT=587"
echo "   SMTP_USER=your-smtp-user"
echo "   SMTP_PASS=your-smtp-password"
echo "   EMAIL_FROM=contact@artofmedia-marketing.de"
echo "   EMAIL_TO=admin@artofmedia-marketing.de"
echo -e "${NC}"
echo ""

echo "3. INSTALL BACKEND DEPENDENCIES & START PM2:"
echo -e "${CYAN}"
echo "   cd $PROJECT_PATH/backend"
echo "   npm install --production"
echo "   sudo -u $APP_USER pm2 start $PROJECT_PATH/ecosystem.config.js"
echo "   sudo -u $APP_USER pm2 save"
echo "   pm2 startup systemd -u $APP_USER --hp /home/$APP_USER"
echo -e "${NC}"
echo ""

echo "4. VERIFY DEPLOYMENT:"
echo -e "${CYAN}"
echo "   # Check Nginx status:"
echo "   systemctl status nginx"
echo ""
echo "   # Check PM2 processes:"
echo "   sudo -u $APP_USER pm2 status"
echo "   sudo -u $APP_USER pm2 logs"
echo ""
echo "   # Check logs:"
echo "   tail -f $PROJECT_PATH/logs/nginx-access.log"
echo "   tail -f $PROJECT_PATH/logs/pm2-error.log"
echo -e "${NC}"
echo ""

print_info "USEFUL COMMANDS:"
echo -e "${CYAN}"
echo "  # PM2 Management:"
echo "  pm2 list              # List all processes"
echo "  pm2 restart all       # Restart all processes"
echo "  pm2 logs              # View logs"
echo "  pm2 monit             # Monitor processes"
echo ""
echo "  # Nginx:"
echo "  nginx -t              # Test configuration"
echo "  systemctl reload nginx # Reload config"
echo "  systemctl restart nginx # Restart Nginx"
echo ""
echo "  # SSL Certificate:"
echo "  certbot certificates  # List certificates"
echo "  certbot renew         # Renew certificates"
echo ""
echo "  # Firewall:"
echo "  ufw status           # Check firewall status"
echo "  fail2ban-client status # Check Fail2ban status"
echo -e "${NC}"
echo ""

print_info "SECURITY RECOMMENDATIONS:"
echo "  1. Change default SSH port in /etc/ssh/sshd_config"
echo "  2. Disable root login (PermitRootLogin no)"
echo "  3. Enable SSH key authentication only"
echo "  4. Keep system updated: apt update && apt upgrade"
echo "  5. Monitor logs regularly"
echo "  6. Set up automated backups"
echo ""

print_info "YOUR WEBSITE:"
echo -e "  ${GREEN}https://$DOMAIN${NC}"
echo -e "  ${GREEN}https://$WWW_DOMAIN${NC}"
echo ""

echo -e "${GREEN}================================================================================${NC}"
print_success "Deployment script completed successfully!"
echo -e "${GREEN}================================================================================${NC}"
echo ""

exit 0
