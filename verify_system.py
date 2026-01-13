#!/usr/bin/env python
"""
Verificador del sistema - Comprueba que todo esté listo
"""
import os
import sys
from pathlib import Path

def check_structure():
    """Verifica la estructura de carpetas"""
    print("\n📁 Verificando estructura de carpetas...")
    print("-" * 50)
    
    required_files = [
        'index.html',
        'config.js',
        'img/flk3.jfif',
        'img/flk4.jfif',
        'backend/manage.py',
        'backend/requirements.txt',
        'backend/booking_system/settings.py',
        'backend/booking_system/api/models.py',
        'backend/init_demo_slots.py',
        'GUIA_RAPIDA.md'
    ]
    
    project_root = Path(__file__).parent
    
    all_ok = True
    for file in required_files:
        file_path = project_root / file
        if file_path.exists():
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file} - NO ENCONTRADO")
            all_ok = False
    
    return all_ok


def check_python():
    """Verifica Python y versión"""
    print("\n🐍 Verificando Python...")
    print("-" * 50)
    
    version = sys.version_info
    print(f"  ✅ Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major >= 3 and version.minor >= 8:
        print(f"  ✅ Versión compatible")
        return True
    else:
        print(f"  ❌ Se requiere Python 3.8+")
        return False


def check_dependencies():
    """Verifica las dependencias instaladas"""
    print("\n📦 Verificando dependencias...")
    print("-" * 50)
    
    try:
        import django
        print(f"  ✅ Django {django.VERSION[0]}.{django.VERSION[1]}")
    except ImportError:
        print(f"  ❌ Django no instalado")
        print(f"     Ejecuta: pip install -r backend/requirements.txt")
        return False
    
    try:
        import rest_framework
        print(f"  ✅ Django REST Framework")
    except ImportError:
        print(f"  ❌ DRF no instalado")
        return False
    
    try:
        import corsheaders
        print(f"  ✅ django-cors-headers")
    except ImportError:
        print(f"  ❌ CORS no instalado")
        return False
    
    return True


def check_database():
    """Verifica la base de datos"""
    print("\n💾 Verificando base de datos...")
    print("-" * 50)
    
    db_path = Path(__file__).parent / 'backend' / 'db.sqlite3'
    
    if db_path.exists():
        size = db_path.stat().st_size / 1024
        print(f"  ✅ Base de datos existe ({size:.1f} KB)")
        
        try:
            import django
            os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booking_system.settings')
            django.setup()
            
            from api.models import TimeSlot
            count = TimeSlot.objects.count()
            print(f"  ✅ {count} slots disponibles")
            
            if count == 0:
                print(f"  ⚠️  Sin slots. Ejecuta: python backend/init_demo_slots.py")
                return False
            return True
        except Exception as e:
            print(f"  ⚠️  Error verificando BD: {e}")
            return False
    else:
        print(f"  ⚠️  Base de datos no existe")
        print(f"     Ejecuta: python backend/manage.py migrate")
        return False


def print_summary(checks):
    """Imprime resumen final"""
    print("\n" + "=" * 50)
    print("RESUMEN DE VERIFICACIÓN")
    print("=" * 50)
    
    all_ok = all(checks.values())
    
    for check_name, result in checks.items():
        status = "✅" if result else "❌"
        print(f"  {status} {check_name}")
    
    print("\n" + "=" * 50)
    
    if all_ok:
        print("✅ TODO ESTÁ LISTO")
        print("\nPróximos pasos:")
        print("  1. cd backend")
        print("  2. python manage.py runserver")
        print("  3. Abre index.html en el navegador")
    else:
        print("❌ HAY ERRORES QUE CORREGIR")
        print("\nVe arriba para los detalles de cada error")
    
    print("=" * 50 + "\n")


def main():
    print("=" * 50)
    print("🔍 VERIFICADOR DEL SISTEMA")
    print("Freedom Lifestyle Key - Sistema de Reservas")
    print("=" * 50)
    
    checks = {
        'Estructura': check_structure(),
        'Python': check_python(),
        'Dependencias': check_dependencies(),
        'Base de Datos': check_database()
    }
    
    print_summary(checks)


if __name__ == '__main__':
    # Cambiar al directorio backend para las verificaciones de Django
    backend_path = Path(__file__).parent / 'backend'
    os.chdir(backend_path)
    sys.path.insert(0, str(backend_path))
    
    main()
