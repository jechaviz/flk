#!/bin/bash

# Configuración
FTP_HOST="${FTP_SERVER:-server2.shared.spacespaceship.host}"
FTP_USER="${FTP_USER}"
FTP_PASS="${FTP_PASS}"
REMOTE_DIR="${REMOTE_DIR:-/}"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[$(date +%H:%M:%S)]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date +%H:%M:%S)]${NC} $1"
}

# Obtener commit actual
get_current_commit() {
    git rev-parse HEAD 2>/dev/null || echo ""
}

# Obtener archivos cambiados desde último deploy
get_changed_files() {
    current_commit=$(get_current_commit)
    tracking_file=".deploy_tracking"
    last_commit=""

    if [ -f "$tracking_file" ]; then
        last_commit=$(cat "$tracking_file")
    fi

    if [ -z "$last_commit" ]; then
        log_info "Primera deployment - subiendo todos los archivos"
        git ls-files | grep -v "^\\." | grep -v "__pycache__" | grep -v "node_modules"
        return
    fi

    log_info "Archivos cambiados desde ${last_commit:0:8}:"
    git diff --name-only "$last_commit" "$current_commit" 2>/dev/null | grep -v "^\\." || true
}

# Subir archivo por FTP
upload_file() {
    local local_file="$1"
    local remote_file="$2"
    local remote_dir="$3"

    if curl -T "$local_file" "ftp://${FTP_HOST}${remote_dir}${remote_file}" --user "${FTP_USER}:${FTP_PASS}" 2>/dev/null; then
        log_info "Subido: $local_file"
        return 0
    else
        log_error "Error subiendo: $local_file"
        return 1
    fi
}

# Función principal
main() {
    if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
        log_error "ERROR: Configura FTP_USER y FTP_PASS en GitHub Secrets"
        exit 1
    fi

    log_info "Conectando a $FTP_HOST..."

    # Obtener archivos cambiados
    changed_files=$(get_changed_files)
    file_count=$(echo "$changed_files" | grep -c . || echo 0)

    if [ "$file_count" -eq 0 ]; then
        log_info "No hay archivos para subir"
        exit 0
    fi

    log_info "Archivos a subir: $file_count"

    uploaded=0
    failed=0
    while IFS= read -r file; do
        if [ -f "$file" ] && [ -n "$file" ]; then
            if upload_file "$file" "$file" "$REMOTE_DIR"; then
                ((uploaded++))
            else
                ((failed++))
            fi
        fi
    done <<< "$changed_files"

    # Guardar tracking
    current_commit=$(get_current_commit)
    if [ -n "$current_commit" ]; then
        echo "$current_commit" > ".deploy_tracking"
        log_info "Tracking actualizado: ${current_commit:0:8}"
    fi

    if [ $failed -gt 0 ]; then
        log_warn "Deployment completado con $failed errores"
        exit 1
    fi

    log_info "¡Deployment exitoso! $uploaded archivos subidos"
}

main
