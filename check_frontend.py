#!/usr/bin/env python3
"""
Script para verificar y reportar problemas visuales en la aplicación
"""

import re
import sys
from pathlib import Path

def check_html_file(filepath):
    """Verificar archivo HTML para problemas comunes"""
    issues = []
    warnings = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
    
    # Verificar estructuras básicas
    checks = {
        'DOCTYPE': r'<!DOCTYPE html>',
        'Vue script': r'<script src.*vue',
        'Tailwind CSS': r'tailwind\.config',
        'Body tag': r'<body',
        'App div': r'id="app"',
        'Mount call': r'mount\(.*app',
    }
    
    for check_name, pattern in checks.items():
        if not re.search(pattern, content, re.IGNORECASE):
            issues.append(f"❌ {check_name} - NO ENCONTRADO")
        else:
            print(f"✅ {check_name} - OK")
    
    # Verificar problemas potenciales
    problems = {
        'console.error': r'console\.error\(',
        'undefined variables': r'=\s*undefined',
        'syntax errors': r'\{\{.*\{',  # double braces
        'missing closing tags': None,  # manual check
    }
    
    # Detectar Vue directives
    vue_directives = len(re.findall(r'@\w+|v-\w+', content))
    print(f"\n📊 Estadísticas:")
    print(f"   - Directivas Vue encontradas: {vue_directives}")
    print(f"   - Líneas de código: {len(lines)}")
    print(f"   - Tamaño del archivo: {len(content) / 1024:.2f} KB")
    
    # Verificar imágenes
    images = re.findall(r'src="([^"]*)"', content)
    print(f"\n🖼️  Imágenes referenciadas: {len(images)}")
    for img in images[:5]:
        if img.startswith('img/'):
            path = Path('img') / img.split('/')[-1]
            if path.exists():
                print(f"   ✅ {img}")
            else:
                warnings.append(f"⚠️ Imagen no encontrada: {img}")
    
    # Verificar CSS classes
    css_classes = re.findall(r'class="([^"]*)"', content)
    tailwind_classes = len([c for c in css_classes if 'brand' in c or 'glass' in c])
    print(f"\n🎨 Clases Tailwind: {tailwind_classes}")
    
    return issues, warnings

if __name__ == '__main__':
    filepath = Path(__file__).parent / 'index.html'
    
    print("=" * 60)
    print("🔍 Análisis de Aplicación Frontend")
    print("=" * 60 + "\n")
    
    if not filepath.exists():
        print(f"❌ Archivo no encontrado: {filepath}")
        sys.exit(1)
    
    issues, warnings = check_html_file(filepath)
    
    if warnings:
        print("\n⚠️  Advertencias:")
        for w in warnings:
            print(f"   {w}")
    
    if issues:
        print("\n❌ Problemas encontrados:")
        for issue in issues:
            print(f"   {issue}")
        sys.exit(1)
    else:
        print("\n✅ No se encontraron problemas críticos")
        sys.exit(0)
