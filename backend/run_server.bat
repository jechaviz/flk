@echo off
REM Script para iniciar el servidor Django

cd /d %~dp0
call venv\Scripts\activate.bat

echo.
echo =========================================
echo Iniciando servidor Django...
echo =========================================
echo.
echo Abre en tu navegador:
echo   http://localhost:8000
echo.
echo Presiona CTRL+C para detener el servidor
echo.

python manage.py runserver
