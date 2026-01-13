#!/bin/bash
# Script para iniciar el servidor Django - Linux/macOS

cd "$(dirname "$0")"
source venv/bin/activate

echo ""
echo "========================================="
echo "Iniciando servidor Django..."
echo "========================================="
echo ""
echo "Abre en tu navegador:"
echo "  http://localhost:8000"
echo ""
echo "Presiona CTRL+C para detener el servidor"
echo ""

python manage.py runserver
