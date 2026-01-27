#!/usr/bin/env python3
"""
Simple HTTP Server para desarrollar con Cal.com
Sirve la aplicación con soporte CORS
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import json
from dotenv import load_dotenv

# Cargar variables de entorno desde .env.local
load_dotenv('.env.local')

# Configuración
PORT = int(os.getenv('VITE_PORT', 3000))
HOST = '127.0.0.1'
STATIC_DIR = Path(__file__).parent

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler HTTP con soporte CORS y variables de entorno"""
    
    def end_headers(self):
        """Agregar headers CORS"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Manejar preflight CORS"""
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        """Manejar GET requests"""
        # Inyectar variables de entorno en config.js
        if self.path == '/config.js':
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            
            env_vars = {
                'VITE_CALCOM_API_KEY': os.getenv('VITE_CALCOM_API_KEY', ''),
                'VITE_CALCOM_EMBED_ID': os.getenv('VITE_CALCOM_EMBED_ID', ''),
                'VITE_CALCOM_EVENT_URL': os.getenv('VITE_CALCOM_EVENT_URL', 'freedom-lifestyle/30min'),
                'VITE_ENVIRONMENT': os.getenv('VITE_ENVIRONMENT', 'development'),
            }
            
            config_content = f'''
// Inyectado por servidor Python
window.APP_CONFIG_INJECTED = {json.dumps(env_vars)};

// Configuración de la aplicación
// Detecta automáticamente el entorno (desarrollo/producción)

(function() {{
    // Usar variables inyectadas o valores por defecto
    const injected = window.APP_CONFIG_INJECTED || {{}};
    
    const isProduction = window.location.hostname !== 'localhost' &&
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes('local');

    window.APP_CONFIG = {{
        // Cal.com Configuration
        CALCOM_API_KEY: injected.VITE_CALCOM_API_KEY || '',
        CALCOM_EMBED_ID: injected.VITE_CALCOM_EMBED_ID || '',
        CALCOM_EVENT_URL: injected.VITE_CALCOM_EVENT_URL || 'freedom-lifestyle/30min',

        // URL base del API Django
        API_BASE_URL: isProduction
            ? '/api'
            : 'http://localhost:8000/api',

        // Configuración de video
        VIDEO_URL: 'https://videos.pexels.com/video-files/3205634/3205634-hd_1920_1080_25fps.mp4',
        VIDEO_DURATION: 30,

        // Zona horaria
        TIMEZONE: 'America/Mexico_City',
        LANGUAGE: 'es',

        // Máximo de intentos de carga
        MAX_RETRIES: 3,

        // Timeout en milisegundos
        API_TIMEOUT: 5000,

        // Entorno actual
        ENVIRONMENT: isProduction ? 'production' : 'development',

        // Modo de reservas
        BOOKING_MODE: injected.VITE_CALCOM_API_KEY ? 'calcom' : 'api'
    }};

    console.log(`🚀 App initialized in ${{window.APP_CONFIG.ENVIRONMENT}} mode`);
    console.log(`📋 Booking mode: ${{window.APP_CONFIG.BOOKING_MODE}}`);
    if (window.APP_CONFIG.BOOKING_MODE === 'calcom') {{
        console.log(`📅 Cal.com Event: ${{window.APP_CONFIG.CALCOM_EVENT_URL}}`);
    }} else {{
        console.log(`📡 API URL: ${{window.APP_CONFIG.API_BASE_URL}}`);
    }}
}})();

// Función auxiliar para fetch con timeout
async function fetchWithTimeout(url, options = {{}}) {{
    const timeout = options.timeout || window.APP_CONFIG.API_TIMEOUT;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {{
        const response = await fetch(url, {{
            ...options,
            signal: controller.signal
        }});
        clearTimeout(timeoutId);
        return response;
    }} catch (error) {{
        clearTimeout(timeoutId);
        throw error;
    }}
}}
'''
            self.wfile.write(config_content.encode())
            return
        
        # Servir archivo normal
        super().do_GET()
    
    def log_message(self, format, *args):
        """Logging personalizado"""
        print(f"[{self.client_address[0]}] {format % args}")


def main():
    """Iniciar servidor"""
    os.chdir(STATIC_DIR)
    
    # Cargar y mostrar configuración
    print("=" * 60)
    print("🚀 Freedom Lifestyle Key - Servidor de Desarrollo")
    print("=" * 60)
    print(f"\n📍 Host: http://{HOST}:{PORT}")
    print(f"📁 Directorio: {STATIC_DIR}")
    print(f"🌍 Entorno: {os.getenv('VITE_ENVIRONMENT', 'development')}")
    
    # Mostrar configuración de Cal.com
    api_key = os.getenv('VITE_CALCOM_API_KEY', '')
    embed_id = os.getenv('VITE_CALCOM_EMBED_ID', '')
    
    if api_key and embed_id:
        print(f"\n✅ Cal.com configurado:")
        print(f"   - API Key: {api_key[:10]}...{'*' * 20}")
        print(f"   - Embed ID: {embed_id}")
        print(f"   - Event: {os.getenv('VITE_CALCOM_EVENT_URL', 'freedom-lifestyle/30min')}")
    else:
        print(f"\n⚠️  Cal.com NO configurado")
        print(f"   - Fallback a Django API (http://localhost:8000/api)")
    
    print(f"\n💡 Abre tu navegador en: http://{HOST}:{PORT}")
    print(f"🛑 Presiona Ctrl+C para detener el servidor\n")
    
    try:
        with socketserver.TCPServer((HOST, PORT), CORSRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Servidor detenido")
        sys.exit(0)
    except OSError as e:
        print(f"\n❌ Error: {e}")
        if "Address already in use" in str(e):
            print(f"Puerto {PORT} ya está en uso")
            print(f"Cambia VITE_PORT en .env.local")
        sys.exit(1)


if __name__ == '__main__':
    main()
