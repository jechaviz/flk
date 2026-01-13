// Configuración de la aplicación
// Edita este archivo para cambiar la URL del API

window.APP_CONFIG = {
    // URL base del API Django
    API_BASE_URL: 'http://localhost:8000/api',
    
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
    API_TIMEOUT: 5000
};

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
