#!/usr/bin/env bash
# =============================================================================
# Oakridge Collegiate Academy — Database Disaster Recovery & Restore Script
# Usage: ./scripts/restore-db.sh <path-to-backup-file.sql.gz>
# =============================================================================

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <path-to-backup-file.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "[ERROR] Backup file not found: ${BACKUP_FILE}"
  exit 1
fi

echo "================================================================="
echo "WARNING: RESTORING THIS BACKUP WILL OVERWRITE EXISTING DATA!"
echo "Target File: ${BACKUP_FILE}"
echo "================================================================="

if [ "${FORCE_RESTORE:-false}" != "true" ]; then
  read -r -p "Are you sure you want to proceed with database restoration? [y/N]: " confirmation
  if [[ ! "$confirmation" =~ ^[Yy]$ ]]; then
    echo "Restoration aborted by operator."
    exit 0
  fi
fi

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Beginning restoration sequence..."

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Restoring via DATABASE_URL..."
  gunzip -c "${BACKUP_FILE}" | psql "${DATABASE_URL}" --single-transaction
elif [ -n "${DB_HOST:-}" ] && [ -n "${DB_NAME:-}" ]; then
  export PGPASSWORD="${DB_PASSWORD:-}"
  echo "Restoring to host: ${DB_HOST}:${DB_PORT:-5432}, database: ${DB_NAME}..."
  gunzip -c "${BACKUP_FILE}" | psql -h "${DB_HOST}" -p "${DB_PORT:-5432}" -U "${DB_USER:-postgres}" -d "${DB_NAME}" --single-transaction
else
  echo "[ERROR] Database connection parameters missing. Provide DATABASE_URL or DB_HOST, DB_NAME, DB_USER, DB_PASSWORD."
  exit 1
fi

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Restoration completed successfully."
