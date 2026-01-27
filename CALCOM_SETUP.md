# Integración Cal.com - Guía de Configuración

## 🚀 Descripción

Este proyecto ahora soporta **Cal.com** como servicio de reservas en lugar de un backend Django personalizado. Cal.com proporciona un calendario completamente gestionado con:

- ✅ Gestión de disponibilidad
- ✅ Sincronización con Google Calendar, Outlook, etc.
- ✅ Notificaciones automáticas
- ✅ Generación de enlaces de Zoom/Google Meet
- ✅ Dashboard de administración

## 📋 Requisitos Previos

1. **Cuenta en Cal.com**: Crear en https://cal.com
2. **API Key de Cal.com**: Desde https://app.cal.com/settings/developer/api
3. **Embed ID**: Desde https://app.cal.com/settings/embed
4. **Event URL**: Ej. `freedom-lifestyle/30min`

## 🔧 Configuración Local

### 1. Clonar o descargar el proyecto

```bash
cd c:\git\Deni\temp
```

### 2. Crear archivo `.env.local`

Copia el archivo `.env.example` y renómbralo a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Cal.com:

```env
VITE_CALCOM_API_KEY=your_actual_api_key
VITE_CALCOM_EMBED_ID=your_embed_id
VITE_CALCOM_EVENT_URL=freedom-lifestyle/30min
VITE_SITE_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_PORT=3000
VITE_DEBUG=true
```

### 3. Instalar servidor Python simple

```bash
# Windows
python -m http.server 3000

# macOS/Linux
python3 -m http.server 3000
```

### 4. Abrir en navegador

Abre http://localhost:3000 en tu navegador

## 🔐 Configuración en Producción (GitHub Secrets)

### 1. Agregar Secrets a GitHub

En tu repositorio GitHub:
1. Ir a **Settings** → **Secrets and variables** → **Actions**
2. Crear los siguientes secrets:
   - `CALCOM_API_KEY`: Tu API key de Cal.com
   - `CALCOM_EMBED_ID`: Tu Embed ID
   - `CALCOM_EVENT_URL`: Tu URL de evento (ej. `freedom-lifestyle/30min`)
   - `SITE_URL`: URL de producción (ej. `https://freedom-lifestyle.com`)

### 2. GitHub Actions Automático

El archivo `.github/workflows/deploy-calcom.yml` automáticamente:
- Verifica que todos los secrets estén configurados
- Los inyecta en el build
- Despliega con las credenciales seguras

## 🎯 Modos de Reserva

El sistema detecta automáticamente qué modo usar:

| Modo | Disponible | Descripción |
|------|-----------|-------------|
| **Cal.com** | Si `VITE_CALCOM_API_KEY` está configurado | Usa iframe de Cal.com (recomendado) |
| **Django API** | Fallback | Usa backend local Django (si Cal.com no está configurado) |

## 📝 Ejemplo de Configuración Completa

### Desarrollo Local (.env.local)
```env
VITE_CALCOM_API_KEY=cal_xxx_your_api_key
VITE_CALCOM_EMBED_ID=embed_xxx_your_id
VITE_CALCOM_EVENT_URL=freedom-lifestyle/demo-30min
VITE_SITE_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_PORT=3000
VITE_DEBUG=true
```

### Producción (GitHub Secrets)
```
CALCOM_API_KEY = cal_xxx_production_key
CALCOM_EMBED_ID = embed_xxx_production_id
CALCOM_EVENT_URL = freedom-lifestyle/demo-30min
SITE_URL = https://freedom-lifestyle.com
```

## 🔗 URLs de Cal.com

- **Dashboard**: https://app.cal.com
- **API Documentation**: https://docs.cal.com/api
- **Embed Guide**: https://docs.cal.com/embed

## ❓ Solución de Problemas

### El iframe de Cal.com no aparece
- Verificar que `VITE_CALCOM_EMBED_ID` sea correcto
- Verificar que la URL del evento sea válida
- Revisar console del navegador para errores

### Cal.com no está configurado pero debería estarlo
- Asegurar que `.env.local` existe en la raíz del proyecto
- Verificar que `VITE_CALCOM_API_KEY` no esté vacío
- Recargar la página (`F5` o `Ctrl+Shift+R`)

### Variables de entorno no se cargan
- En desarrollo: Las variables deben estar en `.env.local`
- En GitHub Pages: Configurar en Settings → Secrets and variables
- En Vercel/Netlify: Configurar en Environment Variables del deploy

## 🚀 Desplegar en Producción

### Opción 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

Configurar secrets en Vercel dashboard.

### Opción 2: GitHub Pages + Actions
Push a `main` o `production` branch. GitHub Actions automáticamente:
1. Verifica los secrets
2. Build con tus credenciales
3. Deploy a GitHub Pages

### Opción 3: Netlify
1. Conectar repositorio
2. Ir a Site settings → Environment
3. Agregar variables de entorno
4. Deploy automático en cada push

## 📚 Documentación Adicional

- [Cal.com API Docs](https://docs.cal.com/api)
- [Cal.com Embed Documentation](https://docs.cal.com/embed)
- [Environment Variables en Vite](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 🎉 ¡Listo!

Tu aplicación ahora está lista para usar Cal.com. La página detectará automáticamente:
- ✅ Si Cal.com está configurado → Usa el iframe embebido
- ✅ Si no → Fallback a Django API (si está disponible)

¿Preguntas? Revisar los logs en la consola del navegador con `VITE_DEBUG=true`.
