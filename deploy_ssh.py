#!/usr/bin/env python3
"""
SSH Deployment Script for Freedom Lifestyle Key
Connects via SSH and executes deployment commands on the server
"""

import os
import sys
import subprocess
import paramiko
from datetime import datetime
from scp import SCPClient

def run_ssh_command(ssh_client, command, cwd=None):
    """Execute command on remote server via SSH"""
    if cwd:
        command = f"cd {cwd} && {command}"

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Ejecutando: {command}")
    stdin, stdout, stderr = ssh_client.exec_command(command)

    # Read output
    output = stdout.read().decode('utf-8')
    error = stderr.read().decode('utf-8')

    if output:
        print(f"Output: {output}")
    if error:
        print(f"Error: {error}")

    return stdout.channel.recv_exit_status() == 0, output, error

def deploy_via_ssh():
    """Main deployment function using SSH"""

    # SSH Configuration
    ssh_host = os.getenv('SSH_HOST', 'flk.com.mx')
    ssh_user = os.getenv('SSH_USER', 'agingriouh')
    ssh_key_path = os.getenv('SSH_KEY_PATH', os.path.expanduser('~/.ssh/id_rsa'))
    remote_path = os.getenv('REMOTE_PATH', '/home/agingriouh/public_html')

    if not ssh_user:
        print("ERROR: Configura SSH_USER en GitHub Secrets.")
        sys.exit(1)

    try:
        print(f"Conectando via SSH a {ssh_host}...")

        # Setup SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Connect using key
        ssh.connect(
            hostname=ssh_host,
            username=ssh_user,
            key_filename=ssh_key_path,
            timeout=30
        )

        print("Conexión SSH exitosa!")

        # Activate virtual environment and navigate to backend
        venv_cmd = "/home/agingriouh/virtualenv/backend/3.13/bin/activate"
        backend_path = "/home/agingriouh/backend"

        # Install/update requirements
        print("Instalando requirements...")
        success, output, error = run_ssh_command(
            ssh,
            f"source {venv_cmd} && pip install -r requirements.txt",
            backend_path
        )

        if not success:
            print(f"Error instalando requirements: {error}")
            return False

        # Run migrations
        print("Ejecutando migraciones...")
        success, output, error = run_ssh_command(
            ssh,
            f"source {venv_cmd} && python manage.py migrate",
            backend_path
        )

        if not success:
            print(f"Error en migraciones: {error}")
            return False

        # Collect static files (if needed)
        print("Recolectando archivos estáticos...")
        success, output, error = run_ssh_command(
            ssh,
            f"source {venv_cmd} && python manage.py collectstatic --noinput",
            backend_path
        )

        # Restart services if needed
        print("Reiniciando servicios...")
        success, output, error = run_ssh_command(
            ssh,
            "touch /home/agingriouh/backend/tmp/restart.txt"  # Trigger restart if configured
        )

        ssh.close()
        print("¡Deployment SSH completado exitosamente!")
        return True

    except Exception as e:
        print(f"FALLO en deployment SSH: {e}")
        return False

if __name__ == "__main__":
    success = deploy_via_ssh()
    sys.exit(0 if success else 1)