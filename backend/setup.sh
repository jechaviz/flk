#!/bin/bash
# Script de instalación para Freedom Lifestyle Key - Linux/macOS

echo ""
echo "========================================="
echo "Freedom Lifestyle Key - Setup Rápido"
echo "========================================="
echo ""

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ ERROR: Python 3 no está instalado"
    echo "Por favor instala Python 3 desde https://www.python.org/"
    exit 1
fi

echo "✓ Python detectado: $(python3 --version)"

# Cambiar a carpeta backend
cd backend

# Crear venv
echo ""
echo "Creando entorno virtual..."
python3 -m venv venv

# Activar venv
source venv/bin/activate

# Instalar dependencias
echo ""
echo "Instalando dependencias..."
pip install --upgrade pip
pip install -r requirements.txt

# Migrar base de datos
echo ""
echo "Configurando base de datos..."
python manage.py migrate

# Crear slots de demo
echo ""
echo "Creando slots de demostración..."
python init_demo_slots.py

echo ""
echo "========================================="
echo "✓ Setup completado exitosamente"
echo "========================================="
echo ""
echo "Para iniciar el servidor:"
echo "  1. Ejecuta: source backend/venv/bin/activate"
echo "  2. Luego: python backend/manage.py runserver"
echo "  3. Abre: index.html en tu navegador"
echo ""
