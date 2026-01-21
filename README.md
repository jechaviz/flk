# 🎯 Freedom Lifestyle Key - Sistema de Reservas Tipo Calendly

> **Sistema premium de reservas para presentaciones por Zoom con backend Django y calendario dinámico**

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Django](https://img.shields.io/badge/Django-4.2-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🚀 Quick Start (3 Pasos)

### Para Windows:
```bash
cd backend
setup.bat
run_server.bat
# Abre index.html en el navegador
```

### Para Linux/macOS:
```bash
cd backend
chmod +x setup.sh run_server.sh
./setup.sh
./run_server.sh
# Abre index.html en el navegador
```

---

## 📦 ¿Qué incluye?

✅ **Backend Django** con API REST completa  
✅ **Base de datos SQLite** con 30 días de slots preconfigurados  
✅ **Frontend Vue 3** con calendario dinámico  
✅ **Diseño Premium** tipo Calendly  
✅ **Scripts de instalación** para Windows/Linux/macOS  
✅ **Documentación completa**  
✅ **Herramientas de testing**  

---

## 📋 Requisitos

- Python 3.8+
- pip (gestor de paquetes)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🎯 Características Principales

### Backend API
- 7 endpoints REST configurados
- Validación automática de disponibilidad
- Generación de links Zoom
- Admin interface para gestión
- CORS habilitado

### Frontend Interactivo
- Calendario con carga dinámica
- Selector de horarios en tiempo real
- Formulario de 3 pasos optimizado
- Confirmación instantánea
- Responsive (desktop + mobile)

### Diseño Visual
- Premium glassmorphism
- Animaciones suaves
- Efectos glow mejorados
- Paleta dorada y negra
- CTAs de alto impacto

---

## 📁 Estructura del Proyecto

```
temp/
├── 📄 index.html                 ← Frontend principal
├── 📄 config.js                  ← Configuración centralizada
├── 📄 GUIA_RAPIDA.md            ← Setup en 3 pasos
├── 📄 CHANGELOG.md              ← Historial de cambios
├── 📄 verify_system.py          ← Verificador del sistema
├── 📁 img/                       ← Imágenes y galería
└── 📁 backend/                   ← Django backend
    ├── 📄 setup.bat             ← Windows installer
    ├── 📄 setup.sh              ← Linux/macOS installer
    ├── 📄 run_server.bat        ← Windows server starter
    ├── 📄 run_server.sh         ← Linux/macOS server starter
    ├── 📄 requirements.txt       ← Dependencias Python
    ├── 📄 manage.py             ← CLI de Django
    ├── 📄 init_demo_slots.py    ← Generador de datos
    ├── 📄 test_api.py           ← Script de pruebas
    ├── 📄 db.sqlite3            ← Base de datos
    ├── 📄 README.md             ← Documentación técnica
    └── 📁 booking_system/       ← Proyecto Django
        ├── 📄 settings.py
        ├── 📄 urls.py
        └── 📁 api/              ← App principal
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/available-slots/` | Slots disponibles por mes |
| `GET` | `/api/timeslots/available_times/` | Horarios disponibles por fecha |
| `POST` | `/api/bookings/` | Crear nueva reserva |
| `GET` | `/api/bookings/` | Listar todas las reservas |
| `GET` | `/api/bookings/by_email/` | Reservas por email |

**Base URL:** `http://localhost:8000/api`

---

## 📊 Flujo de Reserva

```
Usuario → CTA Click → Video (opcional) → Selecciona Fecha 
→ Elige Hora → Completa Formulario → Confirmación + Zoom Link
```

---

## 🛠️ Troubleshooting

### ❌ Error de conexión API
```bash
# Verifica que Django está corriendo:
http://localhost:8000/api/available-slots/
```

### ❌ "No hay slots disponibles"
```bash
cd backend
python init_demo_slots.py
```

### ❌ Error de permisos en Linux/macOS
```bash
chmod +x backend/setup.sh backend/run_server.sh
```

### ❌ ModuleNotFoundError: django
```bash
cd backend
pip install -r requirements.txt
```

---

## 🔐 Admin Panel

Para acceder al admin de Django:

1. **Crear superuser:**
```bash
cd backend
python manage.py createsuperuser
```

2. **Acceder:**
```
http://localhost:8000/admin
```

---

## ⚙️ Configuración

### Cambiar URL del API
Edita `config.js`:
```javascript
window.APP_CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api',
    // ...
}
```

### Ajustar horarios
Edita `backend/init_demo_slots.py` línea ~23

### Modificar CORS
Edita `backend/booking_system/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://tu-dominio.com",
]
```

---

## 🧪 Testing

**Script de pruebas de API:**
```bash
cd backend
pip install requests
python test_api.py
```

**Verificador del sistema:**
```bash
python verify_system.py
```

---

## 📚 Documentación

- **[GUIA_RAPIDA.md](GUIA_RAPIDA.md)** - Setup en 3 pasos
- **[backend/README.md](backend/README.md)** - Documentación técnica
- **[CHANGELOG.md](CHANGELOG.md)** - Historial completo

---

## 🚀 Deployment (Futuro)

Para producción necesitarás:

- [ ] Servidor Linux/Windows (AWS, DigitalOcean, etc.)
- [ ] Dominio propio
- [ ] SSL/HTTPS (Let's Encrypt)
- [ ] Gunicorn + Nginx
- [ ] PostgreSQL (en lugar de SQLite)
- [ ] SendGrid/AWS SES para emails
- [ ] Integración real con Zoom API

---

## 🎯 Stack Tecnológico

**Backend:**
- Django 4.2.8
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1
- SQLite3

**Frontend:**
- Vue 3
- Tailwind CSS
- HTML5 + CSS3

**DevOps:**
- Python 3.8+
- pip + venv

---

## 📈 Estadísticas

- **20+** archivos creados
- **3000+** líneas de código
- **7** endpoints API
- **2** modelos de base de datos
- **30** días de slots preconfigurados

---

## ✨ Características Únicas

1. **Calendario Dinámico** - Carga datos reales del backend
2. **Validación Automática** - Verifica disponibilidad en tiempo real
3. **Generación de Links Zoom** - Links únicos para cada reserva
4. **Interfaz Premium** - Diseño tipo Calendly de alto nivel
5. **Setup Automático** - Un click para instalar

---

## 📝 License

© 2026 Freedom Lifestyle Key. Todos los derechos reservados.

---

## 📞 Soporte

Para reportar bugs o obtener ayuda:
1. Revisa [GUIA_RAPIDA.md](GUIA_RAPIDA.md)
2. Ejecuta `verify_system.py`
3. Revisa los logs de Django en terminal

---

## 🎉 ¡Listo para empezar!

```bash
# Windows
cd backend && setup.bat && run_server.bat

# Linux/macOS
cd backend && chmod +x setup.sh run_server.sh && ./setup.sh && ./run_server.sh
```

Luego abre `index.html` en tu navegador.

**¡Bienvenido a Freedom Lifestyle Key!** 🚀
