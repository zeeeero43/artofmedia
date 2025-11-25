#!/bin/bash
################################################################################
# ART.OF.MEDIA BACKUP SCRIPT
#
# This script creates backups of your website files and can be run manually
# or automated via cron.
#
# USAGE:
#   ./backup.sh
#
# CRON SETUP (daily backup at 2 AM):
#   0 2 * * * /var/www/artofmedia-marketing.de/backup.sh
################################################################################

set -e

# === CONFIGURATION ===
DOMAIN="artofmedia-marketing.de"
PROJECT_PATH="/var/www/$DOMAIN"
BACKUP_DIR="/root/backups"
RETENTION_DAYS=7  # Keep backups for 7 days

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

print_step() {
    echo -e "\n${CYAN}==============================================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}==============================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="artofmedia-backup-$TIMESTAMP"

print_step "STARTING BACKUP - $TIMESTAMP"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p $BACKUP_DIR
    print_success "Created backup directory: $BACKUP_DIR"
fi

print_info "Creating compressed backup..."

# Create backup with progress
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
    --exclude='node_modules' \
    --exclude='*.log' \
    --exclude='.git' \
    -C $(dirname $PROJECT_PATH) $(basename $PROJECT_PATH)

BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)
print_success "Backup created: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)"

# Create a manifest file
cat > "$BACKUP_DIR/$BACKUP_NAME.manifest" <<EOF
Backup Manifest
===============
Backup Date: $TIMESTAMP
Domain: $DOMAIN
Project Path: $PROJECT_PATH
Backup Size: $BACKUP_SIZE

Contents:
- Frontend (React build)
- Backend (Node.js server)
- PM2 configuration
- Nginx configuration
- Environment files

Excluded:
- node_modules
- Log files
- Git repository

Restore Instructions:
1. Extract: tar -xzf $BACKUP_NAME.tar.gz -C /var/www/
2. Install dependencies: cd $PROJECT_PATH/backend && npm install --production
3. Restart services: pm2 restart all && systemctl reload nginx
EOF

print_success "Manifest created: $BACKUP_NAME.manifest"

# Backup Nginx configuration separately
if [ -f "/etc/nginx/sites-available/$DOMAIN" ]; then
    cp "/etc/nginx/sites-available/$DOMAIN" "$BACKUP_DIR/nginx-$DOMAIN-$TIMESTAMP.conf"
    print_success "Nginx config backed up"
fi

# Backup PM2 ecosystem
if [ -f "$PROJECT_PATH/ecosystem.config.js" ]; then
    cp "$PROJECT_PATH/ecosystem.config.js" "$BACKUP_DIR/pm2-ecosystem-$TIMESTAMP.js"
    print_success "PM2 config backed up"
fi

# Clean old backups
print_info "Cleaning old backups (older than $RETENTION_DAYS days)..."
DELETED_COUNT=$(find $BACKUP_DIR -name "artofmedia-backup-*.tar.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
if [ $DELETED_COUNT -gt 0 ]; then
    print_success "Deleted $DELETED_COUNT old backup(s)"
else
    print_info "No old backups to delete"
fi

# Clean old manifests and configs
find $BACKUP_DIR -name "*.manifest" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "nginx-*.conf" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "pm2-ecosystem-*.js" -mtime +$RETENTION_DAYS -delete

# List all current backups
print_step "CURRENT BACKUPS"
ls -lh $BACKUP_DIR/artofmedia-backup-*.tar.gz 2>/dev/null | awk '{print $9, "("$5")"}'

TOTAL_BACKUPS=$(ls -1 $BACKUP_DIR/artofmedia-backup-*.tar.gz 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh $BACKUP_DIR | cut -f1)

print_info "Total backups: $TOTAL_BACKUPS"
print_info "Total size: $TOTAL_SIZE"

print_step "BACKUP COMPLETE"
print_success "Backup saved to: $BACKUP_DIR/$BACKUP_NAME.tar.gz"

# Optional: Send notification
# Uncomment and configure if you want email notifications
# echo "Backup completed successfully: $BACKUP_NAME ($BACKUP_SIZE)" | mail -s "Backup Complete - Art.of.Media" admin@artofmedia-marketing.de

exit 0
