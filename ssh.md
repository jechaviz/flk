# 🔐 Guía de Configuración SSH para Deployment

## Descripción
Esta guía explica cómo configurar el deployment SSH para Freedom Lifestyle Key, reemplazando el método FTP por SSH para mayor seguridad y funcionalidad.

## 🎯 Beneficios del SSH Deployment
- **Más Seguro**: No expone credenciales FTP
- **Más Potente**: Ejecuta comandos directamente en el servidor
- **Más Flexible**: Instala dependencias, corre migraciones, reinicia servicios
- **Mejor Control**: Acceso completo al servidor para automatización

---

## 🔑 Paso 1: Generar Claves SSH

### Claves ya generadas para este proyecto:

**Clave Pública (añadir al servidor):**
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCp6gbpwOSUk03PXpa4GQIyyYwYksm5VHeYsLf9TRPYH881K1jAUhFmQ2SHEu8iMxUyCOiwxB9cvn5yWONAulESmZ7aGpjoH24SIUFYiOEZhOAku0XY9spahZw8aUO3uN7mU/j0cbTrJXap/AF3xwiLG3FfNfdcFZOlpSre5WPk8Vffy9L9ImNvpzwU+wm+deuOKRQ5wLaP1IqHhBuJQREXvvtWNE7fw7uhZm8S9oixC/25X1WqMOHBQnnAu0C6PSpdHkglZxgZd2o06wH+5OutEvqykrWe8nfe8QmUgauZlhMiqKca2N2Ra5JVV/lEIjCwbOfgt8PmXdly7VJo4r0JTpbJE9AeJaJphfX7gTJZ1R5wjycH9VIr30f9TW4EZ+FnDksMZgAcSJzs5+4I577CE62Xpl1IHNeLdBP1vWaFz+U33pZ0N2WRib066fqqifJHjRUM2SYf5LoOyCHfT9mtQGekLkEIGUFW/lsePwZEWPKHUOEu1Zs91Y/4QVGb4XXkKdKASmunjUzeTxOVZHqX5uENNLurLuzL33esq0aPeiiWKoeJ9yEEB6yUcGG8KKbU1QJEXmjy309Xzr+IHKUHP2Z5rO4f2GJdJkbdfYlxkWbSsHZEr83TltuClUOs3yXw2pRTzSF0Nb9QcDWMVbVkrpl1Z8F2Aur+PfhdvTEzZw== deploy@flk.com.mx
```

**Clave Privada (para GitHub Secrets):**
```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```

---

## 🖥️ Paso 2: Configurar SSH en el Servidor

### Conectar al servidor e instalar la clave pública:

```bash
# Crear directorio .ssh si no existe
mkdir -p ~/.ssh

# Añadir la clave pública al authorized_keys
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCp6gbpwOSUk03PXpa4GQIyyYwYksm5VHeYsLf9TRPYH881K1jAUhFmQ2SHEu8iMxUyCOiwxB9cvn5yWONAulESmZ7aGpjoH24SIUFYiOEZhOAku0XY9spahZw8aUO3uN7mU/j0cbTrJXap/AF3xwiLG3FfNfdcFZOlpSre5WPk8Vffy9L9ImNvpzwU+wm+deuOKRQ5wLaP1IqHhBuJQREXvvtWNE7fw7uhZm8S9oixC/25X1WqMOHBQnnAu0C6PSpdHkglZxgZd2o06wH+5OutEvqykrWe8nfe8QmUgauZlhMiqKca2N2Ra5JVV/lEIjCwbOfgt8PmXdly7VJo4r0JTpbJE9AeJaJphfX7gTJZ1R5wjycH9VIr30f9TW4EZ+FnDksMZgAcSJzs5+4I577CE62Xpl1IHNeLdBP1vWaFz+U33pZ0N2WRib066fqqifJHjRUM2SYf5LoOyCHfT9mtQGekLkEIGUFW/lsePwZEWPKHUOEu1Zs91Y/4QVGb4XXkKdKASmunjUzeTxOVZHqX5uENNLurLuzL33esq0aPeiiWKoeJ9yEEB6yUcGG8KKbU1QJEXmjy309Xzr+IHKUHP2Z5rO4f2GJdJkbdfYlxkWbSsHZEr83TltuClUOs3yXw2pRTzSF0Nb9QcDWMVbVkrpl1Z8F2Aur+PfhdvTEzZw== deploy@flk.com.mx" >> ~/.ssh/authorized_keys

# Ajustar permisos de seguridad
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Verificar que la clave se instaló correctamente
cat ~/.ssh/authorized_keys
```

### Verificar conexión SSH:
```bash
# Probar conexión desde tu máquina local
ssh -i ~/.ssh/id_rsa agingriouh@flk.com.mx "echo 'SSH connection successful'"

# Si funciona, deberías ver: "SSH connection successful"
```

---

## 🔐 Paso 3: Configurar GitHub Secrets

### Ir a GitHub Secrets:
1. Ve a `https://github.com/[tu-usuario]/flk/settings/secrets/actions`
2. Haz clic en "New repository secret"
3. Agrega los siguientes secrets:

### **SSH_PRIVATE_KEY**
- **Name:** `SSH_PRIVATE_KEY`
- **Value:** Pega toda la clave privada (incluyendo `-----BEGIN OPENSSH PRIVATE KEY-----` y `-----END OPENSSH PRIVATE KEY-----`)

### **SSH_HOST**
- **Name:** `SSH_HOST`
- **Value:** `flk.com.mx`

### **SSH_USER**
- **Name:** `SSH_USER`
- **Value:** `agingriouh`

---

## 🚀 Paso 4: Probar el Deployment SSH

### Hacer un commit de prueba:
```bash
git add .
git commit -m "test: probar deployment SSH"
git push origin main
```

### Ver el progreso:
1. Ve a `https://github.com/[tu-usuario]/flk/actions`
2. Selecciona el workflow "Auto-Deploy flk.com.mx"
3. Revisa los logs en tiempo real

### Lo que hace el deployment SSH:
1. ✅ Se conecta por SSH al servidor
2. ✅ Activa el virtualenv: `source /home/agingriouh/virtualenv/backend/3.13/bin/activate`
3. ✅ Navega al directorio backend: `cd /home/agingriouh/backend`
4. ✅ Instala requirements: `pip install -r requirements.txt`
5. ✅ Ejecuta migraciones: `python manage.py migrate`
6. ✅ Recolecta archivos estáticos: `python manage.py collectstatic --noinput`
7. ✅ Reinicia servicios si es necesario

---

## 🛠️ Solución de Problemas

### Error de conexión SSH:
```bash
# Verificar que el servidor acepte conexiones SSH
ssh -T agingriouh@flk.com.mx

# Verificar permisos de archivos
ls -la ~/.ssh/
```

### Error de virtualenv:
```bash
# Verificar que el virtualenv existe
ls -la /home/agingriouh/virtualenv/backend/

# Verificar que el binario de Python existe
ls -la /home/agingriouh/virtualenv/backend/3.13/bin/python
```

### Error de permisos:
```bash
# Ajustar permisos en el servidor
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

---

## 📊 Comparación: FTP vs SSH

| Aspecto | FTP | SSH |
|---------|-----|-----|
| **Seguridad** | ❌ Credenciales expuestas | ✅ Autenticación por clave |
| **Funcionalidad** | ❌ Solo subir archivos | ✅ Ejecutar comandos completos |
| **Dependencias** | ❌ No instala nada | ✅ Instala requirements automáticamente |
| **Base de datos** | ❌ No corre migraciones | ✅ Ejecuta migraciones automáticamente |
| **Servicios** | ❌ No reinicia nada | ✅ Puede reiniciar servicios |
| **Velocidad** | ⚠️ Sube todo siempre | ⚡ Solo archivos cambiados |

---

## 🎯 Próximos Pasos

1. ✅ Configurar claves SSH en servidor
2. ✅ Agregar secrets a GitHub
3. ✅ Probar deployment automático
4. 🔄 Monitorear logs de GitHub Actions
5. 🎉 ¡Deployment SSH completamente funcional!

---

**Nota:** Una vez configurado, todos los pushes a `main` activarán automáticamente el deployment SSH con instalación completa de dependencias y migraciones de base de datos.