#!/bin/bash
# =================================================================
# ANK GLOBAL - POSTGRESQL RESTORE SCRIPT
# =================================================================

set -e

if [ -z "$1" ]; then
    echo "Usage: ./restore.sh <path_to_backup_file.sql.gz>"
    exit 1
fi

BACKUP_FILE="$1"
CONTAINER_NAME="${CONTAINER_NAME:-ankglobal_postgres}"
POSTGRES_USER="${POSTGRES_USER:-ankglobal_user}"
POSTGRES_DB="${POSTGRES_DB:-ankglobal_db}"

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "Error: Backup file ${BACKUP_FILE} does not exist."
    exit 1
fi

echo "[$(date)] Restoring database ${POSTGRES_DB} from ${BACKUP_FILE}..."

gunzip -c "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"

echo "[$(date)] Database restoration completed successfully."
