@echo off
REM Script de instalación rápida para Freedom Lifestyle Key - Sistema de Reservas

echo.
echo =========================================
echo Freedom Lifestyle Key - Setup Rápido
echo =========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde https://www.python.org/
    echo Asegúrate de marcar "Add Python to PATH" durante la instalación
    pause
    exit /b 1
)

echo ✓ Python detectado

REM Cambiar a carpeta backend
cd backend

REM Crear venv
echo.
echo Creando entorno virtual...
python -m venv venv
call venv\Scripts\activate.bat

REM Instalar dependencias
echo.
echo Instalando dependencias...
pip install -r requirements.txt

REM Migrar base de datos
echo.
echo Configurando base de datos...
python manage.py migrate

REM Crear slots de demo
echo.
echo Creando slots de demostración...
python init_demo_slots.py

echo.
echo =========================================
echo ✓ Setup completado exitosamente
echo =========================================
echo.
echo Para iniciar el servidor:
echo   1. Ejecuta: run_server.bat
echo   2. Abre: index.html en tu navegador
echo.
pause
