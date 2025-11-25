#!/bin/bash
################################################################################
# ART.OF.MEDIA MONITORING SCRIPT
#
# This script checks the health of your deployed website.
# Can be run manually or set up as a cron job.
#
# USAGE:
#   ./monitoring.sh
#
# CRON SETUP (check every 5 minutes):
#   */5 * * * * /path/to/monitoring.sh >> /var/log/artofmedia-monitor.log 2>&1
################################################################################

# === CONFIGURATION ===
DOMAIN="artofmedia-marketing.de"
BACKEND_PORT="3001"
EMAIL_ALERT="admin@artofmedia-marketing.de"  # Email for alerts
WEBHOOK_URL=""  # Optional: Slack/Discord webhook for notifications

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

print_header() {
    echo -e "\n${CYAN}======================================${NC}"
    echo -e "${CYAN}  Art.of.Media Health Check${NC}"
    echo -e "${CYAN}  $TIMESTAMP${NC}"
    echo -e "${CYAN}======================================${NC}\n"
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

# Send alert function
send_alert() {
    local message=$1

    # Email alert (requires mailutils)
    if command -v mail &> /dev/null; then
        echo "$message" | mail -s "Art.of.Media Alert - $TIMESTAMP" $EMAIL_ALERT
    fi

    # Webhook alert (Slack/Discord)
    if [ -n "$WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\"}" \
            "$WEBHOOK_URL" 2>/dev/null
    fi
}

# Initialize status
OVERALL_STATUS=0

print_header

# ============================================
# 1. WEBSITE AVAILABILITY CHECK
# ============================================
echo "1. Checking Website Availability..."

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" https://$DOMAIN)

if [ "$HTTP_CODE" = "200" ]; then
    print_success "Website is UP (HTTP $HTTP_CODE)"
    print_info "Response time: ${RESPONSE_TIME}s"

    # Alert if response time is slow
    if (( $(echo "$RESPONSE_TIME > 3.0" | bc -l) )); then
        print_warning "Response time is slow (>${RESPONSE_TIME}s)"
        send_alert "WARNING: Website response time is slow: ${RESPONSE_TIME}s"
    fi
else
    print_error "Website is DOWN (HTTP $HTTP_CODE)"
    OVERALL_STATUS=1
    send_alert "CRITICAL: Website is DOWN! HTTP Status: $HTTP_CODE"
fi

# ============================================
# 2. SSL CERTIFICATE CHECK
# ============================================
echo -e "\n2. Checking SSL Certificate..."

if command -v openssl &> /dev/null; then
    CERT_EXPIRY=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

    if [ -n "$CERT_EXPIRY" ]; then
        EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s)
        CURRENT_EPOCH=$(date +%s)
        DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))

        if [ $DAYS_UNTIL_EXPIRY -gt 30 ]; then
            print_success "SSL Certificate valid ($DAYS_UNTIL_EXPIRY days remaining)"
        elif [ $DAYS_UNTIL_EXPIRY -gt 7 ]; then
            print_warning "SSL Certificate expires in $DAYS_UNTIL_EXPIRY days"
            send_alert "WARNING: SSL Certificate expires in $DAYS_UNTIL_EXPIRY days"
        else
            print_error "SSL Certificate expires in $DAYS_UNTIL_EXPIRY days!"
            OVERALL_STATUS=1
            send_alert "CRITICAL: SSL Certificate expires in $DAYS_UNTIL_EXPIRY days!"
        fi
    else
        print_error "Unable to retrieve SSL certificate"
        OVERALL_STATUS=1
    fi
else
    print_warning "OpenSSL not installed, skipping certificate check"
fi

# ============================================
# 3. NGINX STATUS CHECK
# ============================================
echo -e "\n3. Checking Nginx Status..."

if systemctl is-active --quiet nginx; then
    print_success "Nginx is running"

    # Check Nginx config
    if nginx -t &> /dev/null; then
        print_success "Nginx configuration is valid"
    else
        print_error "Nginx configuration has errors"
        OVERALL_STATUS=1
        send_alert "CRITICAL: Nginx configuration is invalid!"
    fi
else
    print_error "Nginx is not running"
    OVERALL_STATUS=1
    send_alert "CRITICAL: Nginx service is down!"
fi

# ============================================
# 4. PM2 STATUS CHECK
# ============================================
echo -e "\n4. Checking PM2 Processes..."

if command -v pm2 &> /dev/null; then
    PM2_STATUS=$(sudo -u appuser pm2 jlist 2>/dev/null)

    if [ -n "$PM2_STATUS" ]; then
        # Check if artofmedia-backend is running
        BACKEND_STATUS=$(echo $PM2_STATUS | grep -o '"name":"artofmedia-backend"' | wc -l)

        if [ $BACKEND_STATUS -gt 0 ]; then
            # Get process status
            ONLINE_COUNT=$(echo $PM2_STATUS | grep -o '"status":"online"' | wc -l)
            ERROR_COUNT=$(echo $PM2_STATUS | grep -o '"status":"errored"' | wc -l)
            STOPPED_COUNT=$(echo $PM2_STATUS | grep -o '"status":"stopped"' | wc -l)

            if [ $ONLINE_COUNT -gt 0 ] && [ $ERROR_COUNT -eq 0 ] && [ $STOPPED_COUNT -eq 0 ]; then
                print_success "PM2 processes running ($ONLINE_COUNT instances online)"
            else
                print_error "PM2 processes have issues (Online: $ONLINE_COUNT, Errors: $ERROR_COUNT, Stopped: $STOPPED_COUNT)"
                OVERALL_STATUS=1
                send_alert "CRITICAL: PM2 backend has errors! Online: $ONLINE_COUNT, Errors: $ERROR_COUNT, Stopped: $STOPPED_COUNT"
            fi

            # Check restart count (high restarts indicate issues)
            RESTART_COUNT=$(echo $PM2_STATUS | grep -o '"restart_time":[0-9]*' | head -1 | grep -o '[0-9]*')
            if [ -n "$RESTART_COUNT" ] && [ $RESTART_COUNT -gt 10 ]; then
                print_warning "High restart count detected: $RESTART_COUNT"
                send_alert "WARNING: Backend has restarted $RESTART_COUNT times"
            fi
        else
            print_error "Backend process not found in PM2"
            OVERALL_STATUS=1
            send_alert "CRITICAL: artofmedia-backend process not found in PM2!"
        fi
    else
        print_error "Unable to get PM2 status"
        OVERALL_STATUS=1
    fi
else
    print_warning "PM2 not installed"
fi

# ============================================
# 5. BACKEND API CHECK
# ============================================
echo -e "\n5. Checking Backend API..."

API_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$BACKEND_PORT/api/health 2>/dev/null || echo "000")

if [ "$API_RESPONSE" = "200" ] || [ "$API_RESPONSE" = "404" ]; then
    print_success "Backend is responding on port $BACKEND_PORT"
else
    print_error "Backend not responding (HTTP $API_RESPONSE)"
    OVERALL_STATUS=1
    send_alert "CRITICAL: Backend API is not responding! HTTP: $API_RESPONSE"
fi

# ============================================
# 6. DISK SPACE CHECK
# ============================================
echo -e "\n6. Checking Disk Space..."

DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ $DISK_USAGE -lt 80 ]; then
    print_success "Disk usage: ${DISK_USAGE}%"
elif [ $DISK_USAGE -lt 90 ]; then
    print_warning "Disk usage high: ${DISK_USAGE}%"
    send_alert "WARNING: Disk usage is at ${DISK_USAGE}%"
else
    print_error "Disk usage critical: ${DISK_USAGE}%"
    OVERALL_STATUS=1
    send_alert "CRITICAL: Disk usage is at ${DISK_USAGE}%!"
fi

# ============================================
# 7. MEMORY CHECK
# ============================================
echo -e "\n7. Checking Memory Usage..."

MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')

if [ $MEMORY_USAGE -lt 80 ]; then
    print_success "Memory usage: ${MEMORY_USAGE}%"
elif [ $MEMORY_USAGE -lt 90 ]; then
    print_warning "Memory usage high: ${MEMORY_USAGE}%"
else
    print_error "Memory usage critical: ${MEMORY_USAGE}%"
    send_alert "WARNING: Memory usage is at ${MEMORY_USAGE}%"
fi

# ============================================
# 8. FIREWALL STATUS
# ============================================
echo -e "\n8. Checking Firewall Status..."

if systemctl is-active --quiet ufw; then
    if ufw status | grep -q "Status: active"; then
        print_success "Firewall is active"
    else
        print_warning "Firewall is not active"
    fi
else
    print_warning "UFW firewall not running"
fi

# ============================================
# 9. FAIL2BAN STATUS
# ============================================
echo -e "\n9. Checking Fail2ban Status..."

if systemctl is-active --quiet fail2ban; then
    print_success "Fail2ban is active"

    # Check for banned IPs
    BANNED_COUNT=$(fail2ban-client status sshd 2>/dev/null | grep "Currently banned" | grep -o '[0-9]*' || echo "0")
    if [ $BANNED_COUNT -gt 0 ]; then
        print_info "Currently banned IPs: $BANNED_COUNT"
    fi
else
    print_warning "Fail2ban is not running"
fi

# ============================================
# 10. LOG FILE SIZE CHECK
# ============================================
echo -e "\n10. Checking Log File Sizes..."

LOG_DIR="/var/www/$DOMAIN/logs"
if [ -d "$LOG_DIR" ]; then
    LARGE_LOGS=$(find $LOG_DIR -type f -size +100M)

    if [ -z "$LARGE_LOGS" ]; then
        print_success "Log files are reasonable size"
    else
        print_warning "Large log files detected:"
        echo "$LARGE_LOGS" | while read file; do
            SIZE=$(du -h "$file" | cut -f1)
            print_info "  $file - $SIZE"
        done
        print_info "Consider setting up log rotation"
    fi
fi

# ============================================
# SUMMARY
# ============================================
echo -e "\n${CYAN}======================================${NC}"
if [ $OVERALL_STATUS -eq 0 ]; then
    print_success "All checks passed! System is healthy."
else
    print_error "Some checks failed. Please investigate."
fi
echo -e "${CYAN}======================================${NC}\n"

exit $OVERALL_STATUS
