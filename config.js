// Configuración de la aplicación
// Detecta automáticamente el entorno (desarrollo/producción)

(function() {
    // Detectar si estamos en producción
    const isProduction = window.location.hostname !== 'localhost' &&
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes('local');

    window.APP_CONFIG = {
        // URL base del API Django - automática según entorno
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
        ENVIRONMENT: isProduction ? 'production' : 'development'
    };

    console.log(`🚀 App initialized in ${window.APP_CONFIG.ENVIRONMENT} mode`);
    console.log(`📡 API URL: ${window.APP_CONFIG.API_BASE_URL}`);
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
