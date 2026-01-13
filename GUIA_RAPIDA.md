# 🎯 GUÍA DE USO RÁPIDA - Sistema de Reservas Freedom Lifestyle Key

## ⚡ Setup en 3 Pasos (Windows)

### 1️⃣ Setup Automático
```
Abre carpeta: backend/
Ejecuta: setup.bat
Espera a que termine
```

### 2️⃣ Iniciar Servidor
```
Ejecuta: backend/run_server.bat
Verás: "Starting development server at http://localhost:8000"
```

### 3️⃣ Abrir la Web
```
Abre: index.html en el navegador
O usa: python -m http.server 8080 (en raíz del proyecto)
```

---

## 🎨 Características Implementadas

### ✅ Backend Django
- API REST completa para reservas
- Base de datos SQLite
- Modelos: TimeSlot (horarios) + Booking (reservas)
- CORS configurado
- Validación de disponibilidad automática

### ✅ Frontend Vue 3
- Calendario dinámico conectado al backend
- Carga de horarios en tiempo real
- Formulario de reserva de 3 pasos
- Confirmación con link de Zoom generado

### ✅ Diseño Premium
- Mejora visual con gradientes dorados
- Efectos glow mejorados
- Animaciones suaves
- Responsivo (desktop + mobile)
- Modal tipo Calendly de alta conversión

---

## 🎬 Flujo de Uso

### Para el Usuario Final (Lead):

1. **Presiona CTA**
   - "Verificar Disponibilidad"
   - "Innovar mi Oferta"
   - "Agendar Demo Ahora"

2. **Ve Video Intro (Opcional)**
   - 20 segundos de demostración
   - Botón "Agendar Demo Ahora"

3. **Selecciona Fecha**
   - Calendario con disponibilidad del backend
   - Puede navegar entre meses

4. **Elige Hora**
   - Horarios disponibles para la fecha
   - Muestra rangos de tiempo

5. **Completa Formulario**
   - Nombre, Email, Teléfono, Empresa
   - Notas adicionales (opcional)

6. **Confirmación**
   - Reserva creada
   - Link de Zoom generado
   - Email de confirmación (en producción)

---

## 🔌 Endpoints Disponibles

| Método | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/available-slots/?year=2026&month=1` | Slots del mes |
| `GET` | `/api/timeslots/available_times/?date=2026-01-15` | Horas del día |
| `POST` | `/api/bookings/` | Crear reserva |
| `GET` | `/api/bookings/` | Ver todas las reservas |
| `GET` | `/api/bookings/by_email/?email=test@example.com` | Reservas por email |

---

## 📊 Datos de Demo

El script `init_demo_slots.py` crea automáticamente:
- ✅ 30 días de slots
- ✅ 7 horarios por día (9am a 5:30pm)
- ✅ Excluye fin de semana
- ✅ 1 slot por horario

---

## 🔐 Admin Django

Para ver/gestionar reservas:

```bash
1. python manage.py createsuperuser
   (Crear usuario admin: usuario/contraseña)

2. Abrir: http://localhost:8000/admin

3. Login con credenciales
```

---

## 🛠️ Troubleshooting

### ❌ "CORS error"
**Solución:** Asegúrate que:
- Django corre en `http://localhost:8000`
- Frontend accede desde mismo puerto

### ❌ "No hay slots disponibles"
**Solución:**
```bash
cd backend
python init_demo_slots.py
```

### ❌ "Error de conexión API"
**Solución:**
- Verifica que Django está corriendo
- Abre: http://localhost:8000/api/available-slots/
- Si funciona, hay problema con el frontend

### ❌ "ModuleNotFoundError: django"
**Solución:**
```bash
cd backend
pip install -r requirements.txt
```

---

## 📱 Personalización

### Cambiar horarios disponibles
`backend/init_demo_slots.py` línea ~23:
```python
hours = [
    ('09:00:00', '09:30:00'),  # Puedes cambiar estos
    ('10:00:00', '10:30:00'),
    ...
]
```

### Cambiar URL de API
`index.html` línea ~687:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### Agregar más campos al formulario
`backend/booking_system/api/models.py` - Modelo `Booking`

---

## 🚀 Deployment (Futuro)

Para producción necesitarás:

1. **Servidor web:** Nginx/Apache
2. **WSGI:** Gunicorn
3. **SSL:** Let's Encrypt
4. **Email:** SendGrid/AWS SES
5. **Zoom Integration:** API oficial de Zoom

---

## 📝 Estructura de Carpetas

```
temp/
├── index.html                 ← Frontend principal
├── img/                       ← Imágenes
└── backend/
    ├── setup.bat             ← ⭐ Ejecuta primero
    ├── run_server.bat        ← ⭐ Ejecuta segundo
    ├── requirements.txt
    ├── manage.py
    ├── db.sqlite3            ← Base de datos
    ├── init_demo_slots.py
    └── booking_system/
        ├── settings.py
        ├── urls.py
        └── api/
            ├── models.py
            ├── serializers.py
            ├── views.py
            └── admin.py
```

---

## 🎯 Resumen Técnico

**Tecnologías Usadas:**
- ✅ Django 4.2 (Backend)
- ✅ Django REST Framework (API)
- ✅ SQLite (Base de datos)
- ✅ Vue 3 (Frontend)
- ✅ Tailwind CSS (Estilos)

**Características:**
- ✅ Calendario dinámico con backend
- ✅ Sistema de disponibilidad automático
- ✅ Reservas con validación
- ✅ CORS habilitado
- ✅ Admin interface Django

---

## ✅ Checklist Final

- [ ] Ejecuté `setup.bat`
- [ ] Ejecuté `run_server.bat`
- [ ] Abrí `index.html` en navegador
- [ ] Hice clic en un CTA
- [ ] Seleccioné fecha y hora
- [ ] Completé formulario
- [ ] Vi confirmación con Zoom link

**¡Si todo está ✅, el sistema está listo!**

---

**Soporte:** Para errores específicos, revisa los logs en terminal de Django.
