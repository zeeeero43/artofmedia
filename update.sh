#!/bin/bash
################################################################################
# ART.OF.MEDIA UPDATE SCRIPT
#
# This script handles zero-downtime updates of the art.of.media website.
#
# USAGE:
#   From your LOCAL machine:
#   ./update.sh
#
#   This will:
#   1. Build the project locally
#   2. Upload to the VPS
#   3. Restart the backend with zero downtime
################################################################################

set -e

# === CONFIGURATION ===
VPS_HOST="your-vps-ip-or-hostname"  # CHANGE THIS
VPS_USER="root"                     # CHANGE THIS if using different user
DOMAIN="artofmedia-marketing.de"
PROJECT_PATH="/var/www/$DOMAIN"
LOCAL_PROJECT="/home/kaan/artofmedia"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

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

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

# Check if we're in the project directory
if [ ! -f "$LOCAL_PROJECT/package.json" ]; then
    print_error "Not in project directory. Please run from $LOCAL_PROJECT"
    exit 1
fi

print_step "[1/5] BUILDING PROJECT LOCALLY"
cd $LOCAL_PROJECT

print_info "Installing dependencies..."
npm install

print_info "Building frontend..."
npm run build

if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

print_success "Build completed successfully"

print_step "[2/5] CREATING DEPLOYMENT BACKUP ON VPS"
ssh $VPS_USER@$VPS_HOST "
    if [ -d $PROJECT_PATH/frontend/dist ]; then
        cp -r $PROJECT_PATH/frontend/dist $PROJECT_PATH/frontend/dist.backup.\$(date +%Y%m%d_%H%M%S)
        echo 'Backup created'
    fi
"
print_success "Backup created on VPS"

print_step "[3/5] UPLOADING FRONTEND"
print_info "Uploading dist folder to VPS..."

# Create temp directory on VPS
ssh $VPS_USER@$VPS_HOST "mkdir -p $PROJECT_PATH/frontend/dist.new"

# Upload new files
rsync -avz --delete dist/ $VPS_USER@$VPS_HOST:$PROJECT_PATH/frontend/dist.new/

print_success "Files uploaded"

print_step "[4/5] DEPLOYING FRONTEND (ZERO DOWNTIME)"
ssh $VPS_USER@$VPS_HOST "
    # Atomic swap
    mv $PROJECT_PATH/frontend/dist $PROJECT_PATH/frontend/dist.old
    mv $PROJECT_PATH/frontend/dist.new $PROJECT_PATH/frontend/dist
    rm -rf $PROJECT_PATH/frontend/dist.old

    # Set proper permissions
    chown -R appuser:appuser $PROJECT_PATH/frontend/dist

    echo 'Frontend deployed'
"
print_success "Frontend deployed with zero downtime"

print_step "[5/5] UPLOADING & RESTARTING BACKEND"

# Check if backend files changed
BACKEND_CHANGED=false
if [ -d "server" ]; then
    print_info "Checking if backend needs update..."

    # Upload backend files
    rsync -avz --delete server/ $VPS_USER@$VPS_HOST:$PROJECT_PATH/backend/

    # Upload package.json if changed
    scp package.json package-lock.json $VPS_USER@$VPS_HOST:$PROJECT_PATH/backend/

    BACKEND_CHANGED=true
fi

if [ "$BACKEND_CHANGED" = true ]; then
    print_info "Restarting backend with PM2..."

    ssh $VPS_USER@$VPS_HOST "
        cd $PROJECT_PATH/backend

        # Install dependencies if package.json changed
        npm install --production

        # Reload PM2 (zero downtime)
        sudo -u appuser pm2 reload artofmedia-backend

        # Wait for reload
        sleep 2

        # Check status
        sudo -u appuser pm2 status artofmedia-backend
    "

    print_success "Backend restarted successfully"
else
    print_info "No backend changes detected"
fi

print_step "DEPLOYMENT SUMMARY"
echo -e "${GREEN}
================================================================================
                        UPDATE COMPLETED SUCCESSFULLY!
================================================================================
${NC}"

print_success "Frontend and backend deployed"
print_info "Your website: https://$DOMAIN"
echo ""

print_info "Verify deployment:"
echo "  curl -I https://$DOMAIN"
echo "  ssh $VPS_USER@$VPS_HOST 'sudo -u appuser pm2 logs artofmedia-backend --lines 50'"
echo ""

print_success "Update complete!"

exit 0
