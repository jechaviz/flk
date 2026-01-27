// Configuración de la aplicación
// Detecta automáticamente el entorno (desarrollo/producción)
// Soporta integración con Cal.com para reservas

(function() {
    // Detectar si estamos en producción
    const isProduction = window.location.hostname !== 'localhost' &&
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes('local');

    // Cargar variables de entorno
    const getEnv = (key, fallback = '') => {
        // Buscar en import.meta.env (Vite)
        if (typeof import !== 'undefined') {
            try {
                return import.meta.env[key] || fallback;
            } catch (e) {
                // Fallback si import no está disponible
            }
        }
        // Buscar en window si existe (injected variables)
        return window[key] || fallback;
    };

    window.APP_CONFIG = {
        // Cal.com Configuration
        CALCOM_API_KEY: getEnv('VITE_CALCOM_API_KEY', ''),
        CALCOM_EMBED_ID: getEnv('VITE_CALCOM_EMBED_ID', ''),
        CALCOM_EVENT_URL: getEnv('VITE_CALCOM_EVENT_URL', 'freedom-lifestyle/30min'),

        // URL base del API Django - automática según entorno (fallback)
        API_BASE_URL: isProduction
            ? '/api'  // API relativa en producción (mismo dominio)
            : 'http://localhost:8000/api',  // localhost en desarrollo

        // Configuración de video
        VIDEO_URL: 'https://videos.pexels.com/video-files/3205634/3205634-hd_1920_1080_25fps.mp4',

        // Duración del video en segundos
        VIDEO_DURATION: 30,

        // Zona horaria
        TIMEZONE: 'America/Mexico_City',

        // Idioma
        LANGUAGE: 'es',

        // Máximo de intentos de carga
        MAX_RETRIES: 3,

        // Timeout en milisegundos
        API_TIMEOUT: 5000,

        // Entorno actual
        ENVIRONMENT: isProduction ? 'production' : 'development',

        // Modo de reservas: 'calcom' o 'api' (Django)
        BOOKING_MODE: getEnv('VITE_CALCOM_API_KEY', '') ? 'calcom' : 'api'
    };

    console.log(`🚀 App initialized in ${window.APP_CONFIG.ENVIRONMENT} mode`);
    console.log(`📋 Booking mode: ${window.APP_CONFIG.BOOKING_MODE}`);
    if (window.APP_CONFIG.BOOKING_MODE === 'calcom') {
        console.log(`📅 Cal.com Event: ${window.APP_CONFIG.CALCOM_EVENT_URL}`);
    } else {
        console.log(`📡 API URL: ${window.APP_CONFIG.API_BASE_URL}`);
    }
})();

// Función auxiliar para fetch con timeout
async function fetchWithTimeout(url, options = {}) {
    const timeout = options.timeout || window.APP_CONFIG.API_TIMEOUT;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
