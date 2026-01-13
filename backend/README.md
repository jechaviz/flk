# Freedom Lifestyle Key - Sistema de Reservas Tipo Calendly

## 📋 Descripción

Sistema completo de reservas para presentaciones por Zoom integrado con un landing page premium. Incluye:

- ✅ **Backend Django** con API REST
- ✅ **Base de datos SQLite** con modelos de TimeSlots y Bookings
- ✅ **Calendario dinámico** conectado al backend
- ✅ **Frontend Vue 3** con integración API
- ✅ **Diseño Premium** con animaciones y glassmorphism

## 🚀 Instalación Rápida

### Paso 1: Instalar Dependencias Python

```bash
cd backend
pip install -r requirements.txt
```

### Paso 2: Configurar Django

```bash
# Dentro de la carpeta backend/
python manage.py migrate
python init_demo_slots.py
```

Este último comando crea 30 días de slots disponibles para pruebas.

### Paso 3: Iniciar el Servidor Django

```bash
python manage.py runserver
```

El servidor estará disponible en `http://localhost:8000`

### Paso 4: Abrir el Frontend

Abre `index.html` en tu navegador (o usa un servidor local):

```bash
# Desde la raíz del proyecto
python -m http.server 8080
# Luego abre http://localhost:8080
```

## 📊 Estructura del Proyecto

```
temp/
├── index.html                 # Frontend principal
├── img/                       # Imágenes de galería
├── backend/
│   ├── manage.py             # CLI de Django
│   ├── requirements.txt       # Dependencias Python
│   ├── init_demo_slots.py    # Script para crear datos de prueba
│   ├── db.sqlite3            # Base de datos (se crea automáticamente)
│   └── booking_system/
│       ├── settings.py       # Configuración Django
│       ├── urls.py           # Rutas principales
│       ├── wsgi.py           # WSGI config
│       └── api/
│           ├── models.py     # Modelos: TimeSlot, Booking
│           ├── serializers.py # DRF Serializers
│           ├── views.py      # API ViewSets
│           ├── admin.py      # Admin interface
│           └── apps.py       # Config de app
```

## 🔌 Endpoints API

### Obtener slots disponibles por mes

```
GET /api/available-slots/?year=2026&month=1
```

**Response:**
```json
{
  "year": 2026,
  "month": 1,
  "available_days": ["2026-01-02", "2026-01-03", ...],
  "slots": [...]
}
```

### Obtener horarios disponibles por fecha

```
GET /api/timeslots/available_times/?date=2026-01-15
```

**Response:**
```json
[
  {
    "id": 1,
    "time": "09:00:00",
    "end_time": "09:30:00",
    "available_spots": 1
  },
  ...
]
```

### Crear una reserva

```
POST /api/bookings/
Content-Type: application/json

{
  "timeslot": 1,
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@empresa.com",
  "phone": "+52 123456789",
  "company_name": "Mi Desarrolladora",
  "notes": "Interesado en propiedades de lujo"
}
```

**Response:**
```json
{
  "id": 1,
  "timeslot": 1,
  "first_name": "Juan",
  "email": "juan@empresa.com",
  "status": "confirmed",
  "zoom_link": "https://zoom.us/meeting/...",
  "created_at": "2026-01-13T10:30:00Z"
}
```

## 🎨 Características Visuales

### Mejoras de UI/UX Implementadas:

1. **Calendario Dinámico**
   - Carga datos en tiempo real del backend
   - Navegación entre meses
   - Indicadores visuales de disponibilidad

2. **Modal de Reserva**
   - 4 pasos intuitivos (Calendario → Horas → Formulario → Confirmación)
   - Validación de disponibilidad
   - Envío automático de confirmación

3. **Diseño Premium**
   - Glassmorphism mejorado
   - Animaciones suaves
   - Paleta dorada y negra premium
   - Efectos de glow en elementos interactivos

4. **Responsivo**
   - Funciona en desktop y mobile
   - Adaptación de layouts

## 🔧 Configuración Avanzada

### Cambiar la URL del API

En `index.html`, línea ~680:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### Ajustar horarios disponibles

Edita `backend/booking_system/api/models.py` y modifica los horarios de `init_demo_slots.py`

### Configurar CORS

Si necesitas conectar desde otro dominio, edita `backend/booking_system/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://tu-dominio.com",
    "https://tu-dominio.com",
]
```

## 📱 Testing

### Acceder al Admin de Django

```
http://localhost:8000/admin
```

Primero crea un superuser:
```bash
python manage.py createsuperuser
```

### Probar Calendly

1. Abre `index.html` en el navegador
2. Haz clic en un botón CTA (ej: "Verificar Disponibilidad", "Agendar Demo")
3. Ve el video y presiona "Agendar Demo Ahora"
4. Selecciona fecha, hora y completa el formulario
5. Verás confirmación con link de Zoom

## 🐛 Troubleshooting

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solución:** Asegúrate que Django está corriendo en `http://localhost:8000` y que `CORS_ALLOWED_ORIGINS` está configurado correctamente.

### No hay slots disponibles
```bash
# Regenera los datos de demo
python manage.py shell
>>> from api.models import TimeSlot
>>> TimeSlot.objects.all().delete()
>>> exit()
python init_demo_slots.py
```

### Error de migraciones
```bash
python manage.py migrate --run-syncdb
```

## 📦 Dependencias

- Django 4.2.8
- djangorestframework 3.14.0
- django-cors-headers 4.3.1
- python-dateutil 2.8.2
- Vue 3 (CDN)
- Tailwind CSS (CDN)

## 🎯 Próximas Mejoras

- [ ] Envío de emails con confirmación
- [ ] Dashboard de administración
- [ ] Sincronización con Google Calendar
- [ ] Notificaciones push
- [ ] Sistema de recordatorios automáticos
- [ ] Integración real con Zoom API

## 📝 License

Proyecto para Freedom Lifestyle Key © 2026

---

**Contacto de Desarrollo:** Desarrollador de Software
