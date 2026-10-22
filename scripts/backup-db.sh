#!/usr/bin/env bash
# =============================================================================
# Oakridge Collegiate Academy — Automated Database Backup Script
# Usage: ./scripts/backup-db.sh
# Cron example (Daily at 02:00 AM UTC):
# 0 2 * * * /bin/bash /opt/oakridge/scripts/backup-db.sh >> /var/log/oakridge-db-backup.log 2>&1
# =============================================================================

set -euo pipefail

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups/database}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/oakridge_backup_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Starting Oakridge Academy database backup..."

# Verify required credentials
if [ -n "${DATABASE_URL:-}" ]; then
  echo "Using DATABASE_URL connection string..."
  pg_dump "${DATABASE_URL}" --clean --if-exists --no-owner --no-privileges | gzip > "${BACKUP_FILE}"
elif [ -n "${DB_HOST:-}" ] && [ -n "${DB_NAME:-}" ]; then
  export PGPASSWORD="${DB_PASSWORD:-}"
  echo "Connecting to host: ${DB_HOST}:${DB_PORT:-5432}, database: ${DB_NAME}..."
  pg_dump -h "${DB_HOST}" -p "${DB_PORT:-5432}" -U "${DB_USER:-postgres}" -d "${DB_NAME}" --clean --if-exists --no-owner --no-privileges | gzip > "${BACKUP_FILE}"
else
  echo "[ERROR] Database connection parameters missing. Provide DATABASE_URL or DB_HOST, DB_NAME, DB_USER, DB_PASSWORD."
  exit 1
fi

FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Backup completed successfully: ${BACKUP_FILE} (${FILE_SIZE})"

# Prune backups older than RETENTION_DAYS
echo "Pruning backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -type f -name "oakridge_backup_*.sql.gz" -mtime +"${RETENTION_DAYS}" -delete
echo "Backup routine finished."
