# 🚀 Configuración de Despliegue Automático con GitHub y GCP
Explanation: Actualizo la documentación de despliegue para que coincida con el `cloudbuild.yaml` existente (Artifact Registry, Cloud Run) y doy pasos claros para conectar GitHub y crear triggers en Cloud Build.
### Paso 1: Subir los Archivos Nuevos a GitHub

```bash
# Navega a tu proyecto
cd c:\Users\kevin\OneDrive\Escritorio\Tienda-Carrito

# Agregar los archivos nuevos
git add Dockerfile .dockerignore .gcloudignore cloudbuild.yaml DESPLIEGUE_GCP.md

# Agregar otros cambios
git add backend/products.py frontend/app.js requirements.txt

# Hacer commit
git commit -m "Configuración para despliegue automático en GCP"

# Subir a GitHub
git push origin main
```

### Paso 2: Primer Despliegue Manual

```bash
# Desplegar por primera vez
gcloud run deploy tienda-carrito \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

Este comando:
- ✅ Crea el servicio en Cloud Run
- ✅ Construye y despliega tu aplicación
- ✅ Te da una URL pública

**Tiempo estimado**: 2-5 minutos

---

## ✅ Probar el Despliegue Automático

Una vez configurado todo, cada vez que hagas cambios:

```bash
# 1. Haz cambios en tu código
# (edita archivos, agrega funcionalidades, etc.)

# 2. Agrega los cambios
git add .

# 3. Haz commit
git commit -m "Descripción de los cambios"

# 4. Sube a GitHub
git push origin main

# 5. ¡Cloud Build desplegará automáticamente! 🎉
```

### Ver el Progreso del Despliegue

Puedes ver el progreso en tiempo real:

**Opción 1: Consola Web**
- Ve a: https://console.cloud.google.com/cloud-build/builds
- Verás el build en progreso

**Opción 2: Línea de Comandos**
```bash
# Ver los últimos builds
gcloud builds list --limit=5

# Ver logs de un build específico
gcloud builds log [BUILD_ID]
```

---

## 📊 Tiempo de Despliegue

Después de hacer `git push`:

1. **GitHub recibe el push**: Instantáneo
2. **Cloud Build inicia**: 5-10 segundos
3. **Construye la imagen Docker**: 1-3 minutos
4. **Despliega en Cloud Run**: 30-60 segundos

**Total**: ~2-5 minutos desde `git push` hasta que tu app está actualizada

---

## 🔍 Monitoreo

### Ver Logs de Cloud Build

```bash
# Ver builds recientes
gcloud builds list --limit=10

# Ver logs de un build
gcloud builds log [BUILD_ID]

# Seguir logs en tiempo real
gcloud builds log [BUILD_ID] --stream
```

### Ver Logs de Cloud Run

```bash
# Ver logs de tu aplicación
gcloud run services logs read tienda-carrito --limit=50

# Seguir logs en tiempo real
gcloud run services logs tail tienda-carrito
```

---

## 🛠️ Solución de Problemas

### Problema: "Repository not found"

**Solución**: Asegúrate de haber conectado tu repositorio de GitHub en la consola de GCP primero.

### Problema: "Permission denied"

**Solución**: Verifica que Cloud Build tenga los permisos necesarios:

```bash
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/run.admin"
```

### Problema: "Build failed"

**Solución**: Revisa los logs del build:

```bash
gcloud builds list --limit=5
gcloud builds log [BUILD_ID]
```

Errores comunes:
- Falta alguna dependencia en `requirements.txt`
- Error en el `Dockerfile`
- Puerto mal configurado

### Problema: El trigger no se activa

**Solución**: Verifica que:
1. El trigger esté habilitado en la consola
2. La rama sea correcta (`main`)
3. El archivo `cloudbuild.yaml` esté en la raíz del proyecto

---

## 🎯 Comandos de Referencia Rápida

```bash
# Ver triggers configurados
gcloud builds triggers list

# Ver builds recientes
gcloud builds list --limit=10

# Ver servicios de Cloud Run
gcloud run services list

# Ver URL de tu aplicación
gcloud run services describe tienda-carrito --format="value(status.url)"

# Eliminar un trigger
gcloud builds triggers delete deploy-tienda-carrito
```

---

## 📈 Flujo de Trabajo Diario

Una vez configurado, tu flujo de trabajo será:

```bash
# 1. Hacer cambios en el código
# (edita archivos)

# 2. Probar localmente
uvicorn backend.main:app --reload

# 3. Si todo funciona, subir a GitHub
git add .
git commit -m "Mejora en el carrito de compras"
git push

# 4. Esperar 2-5 minutos
# 5. ¡Tu app está actualizada en producción! 🚀
```

---

## ✅ Checklist de Configuración

- [ ] Google Cloud CLI instalado
- [ ] Proyecto de GCP creado
- [ ] APIs habilitadas (Cloud Run, Cloud Build, Container Registry)
- [ ] Permisos de Cloud Build configurados
- [ ] Repositorio de GitHub conectado a Cloud Build
- [ ] Trigger creado en Cloud Build
- [ ] Primer despliegue manual completado
- [ ] Archivos subidos a GitHub
- [ ] Despliegue automático probado

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, cada `git push` desplegará automáticamente tu aplicación.

**Próximos pasos**:
1. Haz un cambio pequeño en tu código
2. Haz `git push`
3. Ve a https://console.cloud.google.com/cloud-build/builds
4. Observa cómo se despliega automáticamente

---

## 💡 Consejos Adicionales

### Despliegue por Ramas

Si quieres desplegar solo cuando hagas push a `main`:
- ✅ Ya está configurado así por defecto

Si quieres desplegar desde otra rama (ej: `production`):
```bash
gcloud builds triggers update deploy-tienda-carrito \
  --branch-pattern="^production$"
```

### Notificaciones

Puedes configurar notificaciones por email cuando un despliegue falla:
1. Ve a: https://console.cloud.google.com/cloud-build/settings
2. Configura notificaciones

### Variables de Entorno

Si necesitas variables de entorno en producción:

```bash
gcloud run services update tienda-carrito \
  --set-env-vars="VARIABLE_NAME=value"
```

---

**¿Necesitas ayuda?** Revisa los logs de Cloud Build o Cloud Run para diagnosticar problemas.
