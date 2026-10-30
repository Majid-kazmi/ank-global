#!/bin/bash
# =================================================================
# ANK GLOBAL - AUTOMATED POSTGRESQL BACKUP SCRIPT
# Runs via cron or Coolify backup schedule on Hetzner VPS
# =================================================================

set -e

BACKUP_DIR="${BACKUP_DIR:-/var/backups/ankglobal}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/ankglobal_db_${TIMESTAMP}.sql.gz"

CONTAINER_NAME="${CONTAINER_NAME:-ankglobal_postgres}"
POSTGRES_USER="${POSTGRES_USER:-ankglobal_user}"
POSTGRES_DB="${POSTGRES_DB:-ankglobal_db}"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting backup of ${POSTGRES_DB} from container ${CONTAINER_NAME}..."

docker exec -t "${CONTAINER_NAME}" pg_dump -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" --clean --if-exists | gzip > "${BACKUP_FILE}"

FILESIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "[$(date)] Backup completed successfully: ${BACKUP_FILE} (${FILESIZE})"

# Retention: Delete backups older than 30 days
find "${BACKUP_DIR}" -type f -name "ankglobal_db_*.sql.gz" -mtime +30 -exec rm -f {} \;
echo "[$(date)] Cleaned up backups older than 30 days."
