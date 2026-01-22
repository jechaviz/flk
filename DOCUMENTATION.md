# 📚 DOCUMENTACIÓN COMPLETA - Freedom Lifestyle Key

## 🎉 ¡BIENVENIDO!

Sistema de reservas tipo Calendly completado exitosamente ✅  
Versión 1.0.1 - Enero 2026

### ✨ ¿Qué incluye?
- Backend Django con API REST completa
- Frontend Vue 3 con calendario dinámico
- Base de datos SQLite con slots de demostración
- Diseño premium tipo Calendly
- Scripts de instalación automática
- Herramientas de testing y verificación

---

## 📝 CHANGELOG

### Versión 1.0.1 - Refinamiento Visual
- Fondos rediseñados con patrones sutiles
- Animaciones mejoradas en footer y header
- Gradientes cónicos para mayor profundidad

### Versión 1.0.0 - Sistema Completo
- API REST completa con 7 endpoints
- Calendario dinámico integrado
- Formulario de reservas en 3 pasos
- Generación automática de links Zoom
- Admin Django funcional
- Diseño responsive premium

---

## 🚀 INSTALACIÓN RÁPIDA

### Requisitos
- Python 3.8+
- Navegador moderno

### Pasos
1. **Instalar dependencias:**
   ```batch
   backend\setup.bat  # Windows
   ```
   ```bash
   cd backend && bash setup.sh  # Linux/macOS
   ```

2. **Iniciar servidor:**
   ```batch
   backend\run_server.bat  # Windows
   ```
   ```bash
   cd backend && bash run_server.sh  # Linux/macOS
   ```

3. **Abrir aplicación:**
   - Frontend: `index.html`
   - Admin: `http://localhost:8000/admin`

4. **Verificar:**
   ```bash
   python verify_system.py
   ```

---

## 🎯 FUNCIONALIDADES PRINCIPALES

### Sistema de Reservas
- Calendario dinámico conectado al backend
- Selección de fecha y hora en tiempo real
- Formulario de 3 pasos optimizado
- Confirmación automática con link Zoom
- Validación completa de disponibilidad

### Narrativas Dinámicas
- 3 modos de contenido (A, B, C, D)
- Transiciones suaves entre mensajes
- Personalización según audiencia

### Galería Interactiva
- Slider de imágenes con transiciones
- Navegación intuitiva
- Optimizado para mobile

### Panel de Administración
- Gestión completa de slots y reservas
- Filtros y búsqueda avanzada
- Interfaz Django profesional

---

## 🛠️ ARQUITECTURA TÉCNICA

### Stack Tecnológico
- **Backend:** Django 4.2.8 + DRF
- **Frontend:** Vue 3 + Tailwind CSS
- **Base de Datos:** SQLite
- **Deployment:** Scripts automatizados

### API Endpoints
- `GET /api/available-slots/` - Slots por mes
- `GET /api/timeslots/available_times/` - Horarios por fecha
- `POST /api/bookings/` - Crear reserva
- `GET /api/bookings/` - Listar reservas
- `GET /api/bookings/by_email/` - Reservas por email

### Seguridad
- CORS configurado
- Validación de datos
- SECRET_KEY protegida
- DEBUG solo en desarrollo

---

## 📁 ESTRUCTURA DE ARCHIVOS

### Raíz
- `index.html` - Frontend principal
- `config.js` - Configuración
- `deploy.py` - Deployment FTP
- `tour.html` - Guía demo interactiva
- `.htaccess` - Apache config

### Backend
- `backend/manage.py` - CLI Django
- `backend/requirements.txt` - Dependencias
- `backend/settings.py` - Configuración
- `backend/api/` - Endpoints REST

### GitHub
- `.github/workflows/deploy.yml` - CI/CD

---

## 🎬 DEMOSTRACIÓN

### Preparación
1. Iniciar backend: `cd backend && python manage.py runserver`
2. Abrir `index.html`
3. Verificar CTAs visibles

### Flujo de Demo
1. **Exploración:** Header, hero dinámico, galería
2. **Reservas:** Modal → Calendario → Horarios → Formulario → Confirmación
3. **Admin:** `http://localhost:8000/admin` para gestión
4. **Testing:** `python test_api.py` para verificar API

### Puntos Clave
- Conversión alta con modal profesional
- Integración perfecta frontend/backend
- Escalable y personalizable
- Performance optimizada

---

## 🚀 DEPLOYMENT

### GitHub Actions
- Workflow automático en `.github/workflows/deploy.yml`
- Despliegue FTP a servidor
- Configurado para rama main

### Configuración de Producción
- Variables de entorno en GitHub Secrets
- SSH_HOST, SSH_USER, SSH_PRIVATE_KEY
- Puerto SSH 22 por defecto

### Servidor Requisitos
- Apache/Nginx con mod_rewrite
- Python 3.8+ con virtualenv
- Base de datos SQLite/MySQL

---

## 🔧 DOCUMENTACIÓN TÉCNICA DEL BACKEND

### Descripción del Sistema
Sistema completo de reservas para presentaciones por Zoom integrado con landing page premium.

**Componentes principales:**
- Backend Django con API REST completa
- Base de datos SQLite con modelos TimeSlots y Bookings
- Calendario dinámico conectado al backend
- Frontend Vue 3 con integración API
- Diseño premium con animaciones y glassmorphism

### Instalación Técnica

#### Dependencias Python
```bash
cd backend
pip install -r requirements.txt
```

#### Configuración de Base de Datos
```bash
# Dentro de backend/
python manage.py migrate
python init_demo_slots.py  # Crea 30 días de slots disponibles
```

#### Inicio del Servidor Django
```bash
python manage.py runserver  # Disponible en http://localhost:8000
```

#### Servidor Frontend Local
```bash
# Desde raíz del proyecto
python -m http.server 8080
# Abrir http://localhost:8080
```

### Arquitectura de la API

#### Endpoints Principales

**Obtener slots disponibles por mes:**
```
GET /api/available-slots/?year=2026&month=1
```
```json
{
  "year": 2026,
  "month": 1,
  "available_days": ["2026-01-02", "2026-01-03", ...],
  "slots": [...]
}
```

**Obtener horarios disponibles por fecha:**
```
GET /api/timeslots/available_times/?date=2026-01-15
```
```json
[
  {
    "id": 1,
    "time": "09:00:00",
    "end_time": "09:30:00",
    "available_spots": 1
  }
]
```

**Crear reserva:**
```
POST /api/bookings/
Content-Type: application/json

{
  "timeslot": 1,
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@empresa.com",
  "phone": "+52 123456789",
  "company_name": "Mi Empresa",
  "notes": "Interesado en propiedades"
}
```

### Modelos de Datos

#### TimeSlot
- `date`: Fecha del slot
- `start_time/end_time`: Horarios de inicio/fin
- `max_bookings`: Capacidad máxima
- `is_available`: Estado general
- Métodos: `get_booked_count()`, `get_available_spots()`, `is_slot_available()`

#### Booking
- `timeslot`: Relación con TimeSlot
- `first_name/last_name`: Datos personales
- `email/phone`: Contacto
- `company_name/notes`: Información adicional
- `status`: pending/confirmed/cancelled/completed
- `zoom_link`: Link generado automáticamente

### Configuración Avanzada

#### URL del API
En `config.js` se configura automáticamente según entorno:
- Desarrollo: `http://localhost:8000/api`
- Producción: `/api` (relativo al dominio)

#### CORS Configuration
```python
# En settings.py
CORS_ALLOWED_ORIGINS = [
    "https://flk.com.mx",
    "https://www.flk.com.mx",
    "http://localhost:8000",
]
```

### Testing y Debugging

#### Acceso al Admin Django
```bash
# Crear superusuario
python manage.py createsuperuser

# Acceder en navegador
http://localhost:8000/admin
```

#### Pruebas del Sistema
1. Abrir `index.html` en navegador
2. Hacer clic en CTA ("Agendar Demo")
3. Completar flujo: fecha → hora → formulario → confirmación
4. Verificar creación de reserva y link Zoom

### Troubleshooting

#### Error CORS
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solución:** Verificar que Django corre en puerto correcto y CORS está configurado.

#### Sin Slots Disponibles
```bash
# Regenerar datos demo
python manage.py shell
>>> from api.models import TimeSlot
>>> TimeSlot.objects.all().delete()
>>> exit()
python init_demo_slots.py
```

#### Error de Migraciones
```bash
python manage.py migrate --run-syncdb
```

### Dependencias Técnicas
- **Django 4.2.8**: Framework web
- **Django REST Framework 3.14.0**: API REST
- **django-cors-headers 4.3.1**: Manejo CORS
- **SQLite**: Base de datos de desarrollo

### Próximas Implementaciones
- Envío automático de emails
- Dashboard administrativo avanzado
- Sincronización con Google Calendar
- Notificaciones push
- Recordatorios automáticos
- Integración real con Zoom API

---

**Proyecto:** Freedom Lifestyle Key
**Versión:** 1.0.1
**Estado:** ✅ Production Ready

¡Gracias por elegir Freedom Lifestyle Key! 🚀