import os
import ftplib
import sys
import subprocess
from datetime import datetime

def get_current_commit():
    """Get current git commit hash"""
    try:
        result = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True, cwd='.')
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass
    return None

def get_changed_files():
    """Get list of files changed since last deployment"""
    current_commit = get_current_commit()
    if not current_commit:
        print("No se pudo obtener el commit actual, usando fallback")
        return get_all_tracked_files()

    # Check if we have a tracking file on server (this would be checked via FTP)
    # For now, we'll use a local tracking file
    tracking_file = '.deploy_tracking'
    last_deployed_commit = None

    if os.path.exists(tracking_file):
        try:
            with open(tracking_file, 'r') as f:
                last_deployed_commit = f.read().strip()
        except:
            pass

    if not last_deployed_commit:
        print("Primera deployment detectada - subiendo todos los archivos")
        return get_all_tracked_files()

    try:
        # Get files changed between last deployed commit and current
        result = subprocess.run(['git', 'diff', '--name-only', last_deployed_commit, current_commit],
                              capture_output=True, text=True, cwd='.')
        if result.returncode == 0 and result.stdout.strip():
            changed_files = result.stdout.strip().split('\n')
            filtered_files = [f for f in changed_files if os.path.exists(f) and not f.startswith('.')]
            print(f"Archivos cambiados desde {last_deployed_commit[:8]}: {len(filtered_files)}")
            return filtered_files
    except Exception as e:
        print(f"Error obteniendo archivos cambiados: {e}")

    # Fallback: get all tracked files
    return get_all_tracked_files()

def get_all_tracked_files():
    """Get all tracked files for full deployment"""
    try:
        result = subprocess.run(['git', 'ls-files'], capture_output=True, text=True, cwd='.')
        if result.returncode == 0:
            all_files = result.stdout.strip().split('\n')
            return [f for f in all_files if os.path.exists(f) and not f.startswith(('.', '__pycache__', 'node_modules'))]
    except:
        pass

    # Final fallback: return essential files
    return ['index.html', 'tour.html', '.htaccess', 'sitemap.xml', 'robots.txt', 'site.webmanifest', 'DOCUMENTATION.md', 'README.md']

def upload_file(ftp, local_file, remote_file):
    """Upload a single file to FTP"""
    try:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Subiendo: {local_file}")
        with open(local_file, 'rb') as f:
            ftp.storbinary(f'STOR {remote_file}', f)
        return True
    except Exception as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Error subiendo {local_file}: {e}")
        return False

def upload_directory(ftp, local_path, remote_path):
    try:
        ftp.cwd(remote_path)
    except ftplib.error_perm:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Creando directorio: {remote_path}")
        ftp.mkd(remote_path)
        ftp.cwd(remote_path)

    for item in os.listdir(local_path):
        local_item = os.path.join(local_path, item)
        if item.startswith('.') or item in ['__pycache__', 'venv', 'node_modules', '.git']:
            continue

        if os.path.isfile(local_item):
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Subiendo: {item}")
            with open(local_item, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
        elif os.path.isdir(local_item):
            upload_directory(ftp, local_item, item)
            ftp.cwd('..')

def main():
    # Configuración para Hospedando.com.mx
    FTP_HOST = os.getenv('FTP_SERVER', 'server2.shared.spaceship.host')
    FTP_USER = os.getenv('FTP_USER')
    FTP_PASS = os.getenv('FTP_PASS')
    REMOTE_DIR = os.getenv('REMOTE_DIR', '/public_html')

    if not FTP_USER or not FTP_PASS:
        print("ERROR: Configura FTP_USER y FTP_PASS en GitHub Secrets.")
        sys.exit(1)

    # Get changed files
    changed_files = get_changed_files()
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Archivos a subir: {len(changed_files)}")
    for f in changed_files[:10]:  # Show first 10
        print(f"  - {f}")
    if len(changed_files) > 10:
        print(f"  ... y {len(changed_files) - 10} más")

    if not changed_files:
        print("No se encontraron archivos para subir.")
        return

    try:
        print(f"Conectando a {FTP_HOST}...")
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(user=FTP_USER, passwd=FTP_PASS)
        ftp.set_pasv(True) # MODO PASIVO OBLIGATORIO
        ftp.encoding = "utf-8"

        print(f"Desplegando en {REMOTE_DIR}...")
        ftp.cwd(REMOTE_DIR)

        uploaded_count = 0
        # Upload changed files
        for file_path in changed_files:
            if os.path.isfile(file_path) and not file_path.startswith('.'):
                # Create remote directory structure if needed
                remote_path = file_path.replace('\\', '/')
                remote_dir = os.path.dirname(remote_path)

                if remote_dir and remote_dir != '.':
                    try:
                        ftp.cwd(REMOTE_DIR)  # Reset to root
                        # Create directory structure
                        parts = remote_dir.split('/')
                        for part in parts:
                            if part:
                                try:
                                    ftp.cwd(part)
                                except:
                                    ftp.mkd(part)
                                    ftp.cwd(part)
                    except:
                        pass  # Directory might already exist

                # Upload file
                if upload_file(ftp, file_path, os.path.basename(file_path)):
                    uploaded_count += 1

        ftp.quit()

        # Save deployment tracking
        current_commit = get_current_commit()
        if current_commit:
            try:
                with open('.deploy_tracking', 'w') as f:
                    f.write(current_commit)
                print(f"Tracking actualizado: {current_commit[:8]}")
            except Exception as e:
                print(f"Warning: No se pudo actualizar tracking local: {e}")

        print(f"¡Deployment exitoso! {uploaded_count} archivos subidos.")
    except Exception as e:
        print(f"FALLO: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
