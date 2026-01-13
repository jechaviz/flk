# 📁 ESTRUCTURA COMPLETA DEL PROYECTO

## Freedom Lifestyle Key - Sistema de Reservas Tipo Calendly

```
temp/
│
├── 📄 README.md
│   └─ Documentación principal del proyecto
│
├── 📄 GUIA_RAPIDA.md
│   └─ Setup en 3 pasos (Windows, Linux, macOS)
│
├── 📄 CHANGELOG.md
│   └─ Historial completo de cambios y features
│
├── 📄 SCRIPT_DEMOSTRACION.md
│   └─ Guion paso a paso para demostración en vivo
│
├── 📄 RESUMEN_FINAL.txt
│   └─ Resumen ejecutivo del proyecto
│
├── 📄 index.html
│   └─ Frontend principal (Vue 3 + Tailwind)
│       Incluye:
│       - Hero section con 3 narrativas (A, B, C)
│       - Sistema de reservas Calendly-style
│       - Galería de imágenes
│       - Integración con API Django
│
├── 📄 config.js
│   └─ Configuración centralizada del frontend
│       API_BASE_URL, VIDEO_URL, TIMEZONE, etc.
│
├── 📄 verify_system.py
│   └─ Verificador del sistema completo
│       Chequea: estructura, Python, dependencias, BD
│
├── 📁 img/
│   ├── flk3.jfif
│   └── flk4.jfif
│       └─ Imágenes de galería
│
├── 📁 backend/
│   │
│   ├── 📄 manage.py
│   │   └─ CLI principal de Django
│   │
│   ├── 📄 requirements.txt
│   │   └─ Dependencias Python:
│   │       - Django 4.2.8
│   │       - djangorestframework 3.14.0
│   │       - django-cors-headers 4.3.1
│   │       - python-dateutil 2.8.2
│   │
│   ├── 📄 README.md
│   │   └─ Documentación técnica del backend
│   │
│   ├── 📄 .env.example
│   │   └─ Template de variables de entorno
│   │
│   ├── 🔧 setup.bat
│   │   └─ Instalador automático (Windows)
│   │
│   ├── 🔧 setup.sh
│   │   └─ Instalador automático (Linux/macOS)
│   │
│   ├── ▶️ run_server.bat
│   │   └─ Inicia servidor Django (Windows)
│   │
│   ├── ▶️ run_server.sh
│   │   └─ Inicia servidor Django (Linux/macOS)
│   │
│   ├── 📄 init_demo_slots.py
│   │   └─ Generador de 30 días de slots de prueba
│   │
│   ├── 🧪 test_api.py
│   │   └─ Script de pruebas de todos los endpoints
│   │
│   ├── 💾 db.sqlite3 (generado automáticamente)
│   │   └─ Base de datos SQLite con:
│   │       - TimeSlot (horarios disponibles)
│   │       - Booking (reservas de usuarios)
│   │
│   ├── 📁 booking_system/ (proyecto Django)
│   │   │
│   │   ├── 📄 __init__.py
│   │   │   └─ Archivo vacío (marca como paquete)
│   │   │
│   │   ├── ⚙️ settings.py
│   │   │   └─ Configuración central:
│   │   │       - Base de datos SQLite
│   │   │       - Apps instaladas
│   │   │       - CORS headers
│   │   │       - REST Framework config
│   │   │
│   │   ├── 🛣️ urls.py
│   │   │   └─ Rutas principales:
│   │   │       - /api/available-slots/
│   │   │       - /api/timeslots/
│   │   │       - /api/bookings/
│   │   │
│   │   ├── 🌐 wsgi.py
│   │   │   └─ WSGI application (producción)
│   │   │
│   │   └── 📁 api/ (aplicación principal)
│   │       │
│   │       ├── 📄 __init__.py
│   │       │   └─ Archivo vacío (marca como paquete)
│   │       │
│   │       ├── 🏗️ models.py
│   │       │   └─ Modelos de BD:
│   │       │       - TimeSlot (horarios)
│   │       │       - Booking (reservas)
│   │       │       Métodos: validación, conteo, generación de links
│   │       │
│   │       ├── 📦 serializers.py
│   │       │   └─ DRF Serializers:
│   │       │       - TimeSlotSerializer
│   │       │       - BookingSerializer
│   │       │       Con campos derivados y validaciones
│   │       │
│   │       ├── 🎯 views.py
│   │       │   └─ ViewSets y vistas:
│   │       │       - AvailableSlotsView (GET)
│   │       │       - TimeSlotViewSet (CRUD)
│   │       │       - BookingViewSet (CRUD)
│   │       │       Con actions: by_email, cancel, confirm
│   │       │
│   │       ├── 🔐 admin.py
│   │       │   └─ Configuración del admin Django:
│   │       │       - TimeSlotAdmin
│   │       │       - BookingAdmin
│   │       │       Con filtros, búsqueda, validaciones
│   │       │
│   │       └── ⚙️ apps.py
│   │           └─ Configuración de app Django
│   │
│   └── 📁 venv/ (generado automáticamente)
│       └─ Entorno virtual Python
│           - lib/ (dependencias instaladas)
│           - bin/ (ejecutables)
│           - Scripts/ (en Windows)
│
└── 📁 .git/
    └─ Repositorio Git del proyecto
```

---

## 📊 RESUMEN DE ARCHIVOS

### Archivos de Frontend (3)
1. `index.html` - Interfaz principal con Vue 3
2. `config.js` - Configuración centralizada
3. `RESUMEN_FINAL.txt` - Resumen ejecutivo

### Archivos de Documentación (6)
1. `README.md` - Documentación principal
2. `GUIA_RAPIDA.md` - Setup en 3 pasos
3. `CHANGELOG.md` - Historial de cambios
4. `SCRIPT_DEMOSTRACION.md` - Guion de demo
5. `backend/README.md` - Doc técnica backend
6. `RESUMEN_FINAL.txt` - Resumen ejecutivo

### Scripts Ejecutables (4)
1. `backend/setup.bat` - Instalador Windows
2. `backend/setup.sh` - Instalador Linux/macOS
3. `backend/run_server.bat` - Server Windows
4. `backend/run_server.sh` - Server Linux/macOS

### Herramientas Python (3)
1. `backend/init_demo_slots.py` - Generador de datos
2. `backend/test_api.py` - Pruebas de API
3. `verify_system.py` - Verificador del sistema

### Configuración Django (10)
1. `backend/requirements.txt` - Dependencias
2. `backend/manage.py` - CLI Django
3. `backend/.env.example` - Variables de entorno
4. `backend/booking_system/settings.py` - Configuración
5. `backend/booking_system/urls.py` - Rutas
6. `backend/booking_system/wsgi.py` - WSGI
7. `backend/booking_system/__init__.py` - Paquete
8. `backend/booking_system/api/models.py` - Modelos
9. `backend/booking_system/api/serializers.py` - Serializers
10. `backend/booking_system/api/views.py` - ViewSets

### Archivos de Admin y Apps (3)
1. `backend/booking_system/api/admin.py` - Admin Django
2. `backend/booking_system/api/apps.py` - Config app
3. `backend/booking_system/api/__init__.py` - Paquete

### Archivos Generados Automáticamente (2)
1. `backend/db.sqlite3` - Base de datos SQLite
2. `backend/venv/` - Entorno virtual Python

---

## 🔗 RELACIONES ENTRE ARCHIVOS

```
index.html (Frontend)
├── Lee: config.js
├── Carga: Vue 3 (CDN)
├── Carga: Tailwind CSS (CDN)
└── Conecta con API en:
    └── http://localhost:8000/api

Django Backend (backend/)
├── manage.py ↔ booking_system/settings.py
├── booking_system/urls.py → Rutas API
├── booking_system/api/
│   ├── models.py → Estructura de datos
│   ├── serializers.py → Conversión JSON
│   ├── views.py → Lógica de endpoints
│   ├── admin.py → Panel de gestión
│   └── apps.py → Configuración
└── db.sqlite3 → Almacenamiento

Scripts Auxiliares:
├── init_demo_slots.py → Crea datos de prueba
├── test_api.py → Prueba todos los endpoints
└── verify_system.py → Verifica configuración
```

---

## 📈 ESTADÍSTICAS

| Métrica | Valor |
|---------|-------|
| Archivos totales | 30+ |
| Líneas de código | 3,500+ |
| Archivos Python | 12 |
| Archivos de config | 8 |
| Archivos de doc | 6 |
| Endpoints API | 7 |
| Modelos BD | 2 |
| Componentes Vue | 5+ |

---

## 🎯 ARCHIVOS POR FUNCIÓN

### Setup & Instalación
- `backend/requirements.txt` - Define dependencias
- `backend/setup.bat` / `backend/setup.sh` - Instala todo
- `verify_system.py` - Valida instalación

### Inicio del Servidor
- `backend/run_server.bat` / `backend/run_server.sh` - Inicia

### Testing
- `backend/init_demo_slots.py` - Genera datos de prueba
- `backend/test_api.py` - Prueba endpoints
- `backend/.env.example` - Template de config

### Frontend
- `index.html` - Interfaz del usuario
- `config.js` - Configuración frontend

### Backend
- `backend/manage.py` - CLI Django
- `backend/booking_system/settings.py` - Configuración
- `backend/booking_system/urls.py` - Rutas
- `backend/booking_system/api/` - Lógica principal

### Admin
- `backend/booking_system/api/admin.py` - Panel de control

### Documentación
- `README.md` - Overview
- `GUIA_RAPIDA.md` - Quick start
- `CHANGELOG.md` - Historial
- `SCRIPT_DEMOSTRACION.md` - Demo guide
- `backend/README.md` - Docs técnicas

---

## 💾 ALMACENAMIENTO

### Local (SQLite)
```
backend/db.sqlite3
├── TimeSlot table
│   ├── id, date, start_time, end_time
│   ├── max_bookings, is_available
│   └── created_at, updated_at
└── Booking table
    ├── id, timeslot_id, first_name, last_name
    ├── email, phone, company_name
    ├── status, zoom_link, notes
    └── created_at, updated_at
```

### En Memoria (Venv)
```
backend/venv/
├── lib/python3.x/site-packages/ (dependencias)
├── bin/ (Python, pip, etc. en Linux/macOS)
└── Scripts/ (en Windows)
```

---

## ✅ CHECKLIST DE ARCHIVOS

- [x] Archivos de Frontend
- [x] Archivos de Backend
- [x] Scripts de Instalación
- [x] Herramientas de Testing
- [x] Configuración Django
- [x] Modelos de Base de Datos
- [x] API ViewSets
- [x] Admin Interface
- [x] Documentación Completa
- [x] Scripts de Demostración

---

**Última Actualización:** 13 de Enero, 2026
**Estado:** ✅ Completo y Listo para Usar
