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

# Obtener archivos cambiados desde último deploy (con estado A/M/D)
get_changed_files() {
    current_commit=$(get_current_commit)
    tracking_file=".deploy_tracking"
    last_commit=""

    if [ -f "$tracking_file" ]; then
        last_commit=$(cat "$tracking_file")
    fi

    if [ -z "$last_commit" ]; then
        log_info "Primera deployment - subiendo todos los archivos"
        git ls-files | grep -v "^\." | grep -v "__pycache__" | grep -v "node_modules" | sed 's/^/A\t/'
        return
    fi

    log_info "Archivos cambiados desde ${last_commit:0:8}:"
    git diff --name-status "$last_commit" "$current_commit" 2>/dev/null | grep -v "\t\." || true
}

# Crear directorio remoto por FTP
mkd_ftp() {
    local dir="$1"
    # Solo intentamos crear si no es el root
    if [ "$dir" != "." ] && [ -n "$dir" ]; then
        curl --ftp-create-dirs -T /dev/null "ftp://${FTP_HOST}${REMOTE_DIR}${dir}/.tmp_mkdir" --user "${FTP_USER}:${FTP_PASS}" 2>/dev/null
    fi
}

# Subir archivo por FTP
upload_file() {
    local local_file="$1"
    local remote_file="$2"

    curl -T "$local_file" "ftp://${FTP_HOST}${REMOTE_DIR}${remote_file}" --user "${FTP_USER}:${FTP_PASS}" 2>/dev/null
    if [ $? -eq 0 ]; then
        log_info "Subido: $local_file"
        return 0
    else
        log_error "Error subiendo: $local_file"
        return 1
    fi
}

# Borrar archivo remoto por FTP
delete_remote_file() {
    local remote_file="$1"
    
    # Usar el comando DELE de FTP via curl
    curl "ftp://${FTP_HOST}${REMOTE_DIR}" --user "${FTP_USER}:${FTP_PASS}" -Q "-DELE ${remote_file}" 2>/dev/null
    if [ $? -eq 0 ]; then
        log_info "Borrado remoto: $remote_file"
        return 0
    else
        log_warn "No se pudo borrar (posiblemente ya no existe): $remote_file"
        return 0 # No fallar el deploy si el archivo ya no estaba
    fi
}

# Función principal
main() {
    if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
        log_error "ERROR: Configura FTP_USER y FTP_PASS en GitHub Secrets"
        exit 1
    fi

    log_info "Conectando a $FTP_HOST..."

    # Obtener archivos cambiados con su estado (A, M, D)
    changes=$(get_changed_files)
    change_count=$(echo "$changes" | grep -c . || echo 0)

    if [ "$change_count" -eq 0 ]; then
        log_info "No hay cambios para procesar"
        exit 0
    fi

    log_info "Cambios detectados: $change_count"

    processed=0
    failed=0

    while IFS=$'\t' read -r status file; do
        [ -z "$file" ] && continue
        
        case "$status" in
            A|M)
                if [ -f "$file" ]; then
                    dir=$(dirname "$file")
                    mkd_ftp "$dir"
                    if upload_file "$file" "$file"; then
                        ((processed++))
                    else
                        ((failed++))
                    fi
                fi
                ;;
            D)
                if delete_remote_file "$file"; then
                    ((processed++))
                else
                    ((failed++))
                fi
                ;;
            *)
                log_warn "Estado desconocido '$status' para: $file"
                ;;
        esac
    done <<< "$changes"

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
