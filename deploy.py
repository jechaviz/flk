import os
import ftplib
import sys
from datetime import datetime

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

    try:
        print(f"Conectando a {FTP_HOST}...")
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(user=FTP_USER, passwd=FTP_PASS)
        ftp.set_pasv(True) # MODO PASIVO OBLIGATORIO
        ftp.encoding = "utf-8"
        
        print(f"Desplegando en {REMOTE_DIR}...")
        # Subir archivos raíz (Frontend)
        for f in ['index.html', 'config.js', 'BIENVENIDA.txt']:
            if os.path.exists(f):
                with open(f, 'rb') as file_obj:
                    ftp.storbinary(f'STOR {f}', file_obj)

        # Subir carpetas
        for folder in ['img', 'backend']:
            if os.path.exists(folder):
                upload_directory(ftp, folder, folder)
                ftp.cwd(REMOTE_DIR)

        ftp.quit()
        print("¡Deployment exitoso!")
    except Exception as e:
        print(f"FALLO: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
