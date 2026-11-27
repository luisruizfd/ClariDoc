# ClariDoc: documentación del avance y cambios

**Proyecto:** ClariDoc, asistente para entender documentos en lenguaje claro  
**Repositorio:** https://github.com/luisruizfd/ClariDoc  
**Versión de la app:** `ETAPA3` (React 19, Vite 8, Tailwind CSS v4, TypeScript)  
**Fecha de este documento:** noviembre de 2026

---

## 1. Resumen

ClariDoc ayuda a personas no técnicas, sobre todo adultos mayores, a entender contratos, recibos, recetas y avisos. El usuario sube una foto o un PDF y la app muestra un resumen en palabras sencillas, con puntos clave y alertas antes de firmar, y permite hacer preguntas sobre el documento.

El proyecto pasó por estas etapas:

1. Exportación del diseño a una app React.
2. Publicación de la demo en GitHub Pages.
3. Conexión del análisis de documentos con IA.
4. Cambio de proveedor de IA: de Google Gemini directo a OpenRouter.
5. Creación de un servidor propio para ejecutar la app fuera de GitHub.
6. Mejoras de robustez, mensajes de error y pruebas.

---

## 2. Estado actual

| Función | Estado |
| :--- | :--- |
| Diseño y pantallas (bienvenida, inicio, captura, resumen, chat, historial, ajustes) | Funcionando. El diseño no se modificó. |
| Demo con documento de ejemplo | Funcionando, sin IA y sin conexión externa. |
| Análisis de PDF o imagen con IA (OpenRouter) | Funcionando en local. Requiere clave y saldo. |
| Chat de preguntas sobre el documento | Funcionando en local. |
| Publicación en GitHub Pages | Configurada. Muestra la demo; el análisis con IA no funciona ahí. |
| Servidor propio (`server.mjs`) | Funcionando. Protegido con contraseña opcional. |

---

## 3. Historial de cambios

### Fase 1: proyecto base en React
- Proyecto base React 19 + Vite 8 + Tailwind CSS v4.
- Pantallas: bienvenida, inicio, captura, carga, resumen, chat, historial y ajustes.
- Comprobación: compila sin errores de TypeScript.

### Fase 2: publicación en GitHub Pages
- `vite.config.ts`: la ruta base se ajusta automáticamente a `/ClariDoc/` cuando se compila en GitHub Actions. En local no cambia.
- Favicon con ruta relativa, para que funcione en subcarpetas.
- Configuración del sitio (`site.json`): título "ClariDoc" e idioma `es`.
- Corrección de un error: después de elegir "Elegir de galería", el botón "Subir PDF" solo dejaba seleccionar imágenes.
- Flujo de GitHub Actions: `.github/workflows/deploy.yml`, que compila y publica en cada `push` a `main`. La carpeta `.github` debe estar en la raíz del repositorio, no dentro de `ETAPA3`.
- `README.md` con la URL de la demo.

### Fase 3: análisis con IA (Gemini directo)
- Nuevo módulo `src/gemini.ts`. Envía el archivo al servicio de IA y recibe un resumen estructurado (título, resumen, puntos clave y alertas).
- `App.tsx`:
  - Guarda el archivo que sube el usuario y lanza el análisis al cargar.
  - Muestra el resultado real. Si no hay archivo, sigue mostrando la demo.
  - El chat responde preguntas usando el archivo.
  - Se actualizaron los textos de privacidad, porque los archivos ahora sí se envían a un servicio externo.
- Límite de tamaño: 15 MB por archivo.

### Fase 4: migración a OpenRouter
- Las peticiones ahora van a `https://openrouter.ai/api/v1/chat/completions`, con formato compatible con OpenAI.
- Modelo predeterminado: `google/gemini-2.5-flash`. Se puede cambiar con `OPENROUTER_MODEL`. Para ahorrar, se recomienda `google/gemini-2.5-flash-lite`.
- Los PDF se envían como archivos y las imágenes como imágenes.
- Si la respuesta viene con bloques de código (`json`), se limpian antes de leerla.
- Los mensajes de error de OpenRouter se muestran con el texto real, con el prefijo "OpenRouter:".

### Fase 5: seguridad de la clave
- La clave ya no se incluye en el JavaScript del navegador. Antes, si estaba en `.env.local` con prefijo `VITE_`, Vite la podía publicar dentro del código.
- Ahora la clave solo se usa en el servidor (`server.mjs` o el servidor de desarrollo de Vite).
- Variables de entorno:
  - `OPENROUTER_API_KEY`: la clave. Obligatoria para el análisis.
  - `OPENROUTER_MODEL`: opcional.
  - `APP_PASSWORD`: opcional. Protege la página y la API con usuario y contraseña.
  - `PORT`: opcional. Puerto del servidor (3000 por defecto).

### Fase 6: servidor propio para ejecutar fuera de GitHub
- `server.mjs`: servidor Node 22+ sin dependencias externas.
  - Sirve la carpeta `dist` (la página compilada).
  - Responde `POST /api/gemini`, que reenvía a OpenRouter.
  - Bloquea rutas fuera de `dist` (protección contra acceso a otros archivos).
  - Contraseña opcional con `APP_PASSWORD`, comparada de forma segura.
- Paquete `ClariDoc_servidor.zip` con instrucciones en `INSTALAR_Y_EJECUTAR.md`.

### Fase 7: desarrollo local (`pnpm dev`)
- `vite.config.ts` incluye una ruta `/api/gemini` en el servidor de desarrollo, para que el análisis funcione sin `server.mjs`.
- Lectura de `.env.local` tolerante: acepta BOM (que a veces agrega el Bloc de notas), saltos de línea de Windows, espacios y comillas.
- Al arrancar, la terminal muestra si la clave se cargó, sin mostrarla completa:
  ```text
  [ClariDoc] Clave de OpenRouter cargada (termina en ...ABCD). Modelo: ...
  ```
  Si no se carga, indica si el archivo existe o no.
- Puerto del desarrollo: `8443`.

---

## 4. Archivos principales

| Archivo | Función |
| :--- | :--- |
| `src/App.tsx` | Pantallas, flujo de carga, resultado, chat y demo. |
| `src/gemini.ts` | Cliente que envía documentos y preguntas al servidor. |
| `src/index.css` | Estilos globales (sin cambios de diseño). |
| `vite.config.ts` | Configuración de Vite, ruta base para GitHub Pages, ruta `/api/gemini` en desarrollo y lectura de `.env.local`. |
| `server.mjs` | Servidor de producción (página + análisis + contraseña). |
| `.github/workflows/deploy.yml` | Publicación automática en GitHub Pages. |
| `.env.local` | Clave y modelo para el desarrollo local. **No se sube a GitHub.** |
| `site.json` | Título, idioma y descripción del sitio. |
| `README.md` | Descripción del proyecto y URL de la demo. |

---

## 5. Cómo ejecutar

### En local (desarrollo)
1. Crea `ETAPA3/.env.local` con:
   ```env
   OPENROUTER_API_KEY=tu_clave
   OPENROUTER_MODEL=google/gemini-2.5-flash-lite
   ```
2. En la terminal, dentro de `ETAPA3`:
   ```powershell
   pnpm install
   pnpm dev
   ```
3. Abre `http://localhost:8443`.

### En un servidor propio
1. Requisito: Node.js 22 o superior.
2. Dentro de la carpeta del proyecto:
   ```bash
   pnpm install --frozen-lockfile
   pnpm run build
   ```
3. Inicia el servidor.

   **En Linux o macOS:**
   ```bash
   OPENROUTER_API_KEY=tu_clave APP_PASSWORD=contraseña node server.mjs
   ```

   **En PowerShell (Windows):**
   ```powershell
   $env:OPENROUTER_API_KEY="tu_clave"
   $env:APP_PASSWORD="contraseña"
   node server.mjs
   ```

### En GitHub Pages
- Solo muestra la demo de ejemplo. Requiere activar **Settings → Pages → Source: GitHub Actions**.
- El análisis con IA no funciona en GitHub Pages, porque no hay servidor que guarde la clave.

---

## 6. Problemas encontrados y cómo se resolvieron

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| `pnpm dev` no encontraba `package.json` | La terminal estaba en la carpeta `ClariDoc`, no en `ETAPA3`. | Ejecutar los comandos dentro de `ETAPA3`. |
| Error `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND` | Mismo caso anterior. | Igual. |
| La clave se pegó en la terminal como si fuera un comando | Se confundió la terminal con el archivo `.env`. | Escribir la clave solo dentro de `.env.local`. |
| Error 404 al analizar | Un servidor viejo seguía corriendo sin la ruta nueva. | Detener procesos y reiniciar `pnpm dev`. |
| "Falta OPENROUTER_API_KEY" aunque el archivo existía | El archivo estaba vacío o no tenía la línea de la clave. Además, el lector original no aceptaba BOM ni CRLF. | Lector tolerante y mensajes de diagnóstico en la terminal. |
| `pnpm` no reconocido | No estaba instalado. | `npm i -g pnpm@10.34.3`. |
| Mensaje "[object Object]" | OpenRouter devuelve el error como objeto y la app lo mostraba mal. | Extraer `error.message` antes de mostrarlo. |
| "requires at least $0.50 in balance for files" | La cuenta de OpenRouter no tiene saldo para archivos. | Agregar crédito en https://openrouter.ai/settings/credits. |

---

## 7. Pruebas realizadas

- Compilación de TypeScript y de Vite, en modo local y con prefijo de GitHub Pages.
- Verificación de que el JavaScript publicado no contiene la clave ni la URL de la API.
- Flujo completo en navegador (Playwright):
  - Demo de ejemplo: resumen, chat, historial, ajustes y rutas del diseño.
  - Subida real de PDF con respuesta simulada: el resumen muestra los datos del archivo y las alertas.
  - Chat con respuesta simulada.
  - Error de la API: el mensaje se muestra con el texto real.
- Servidor `server.mjs`: sin contraseña devuelve `401`; con contraseña correcta, `200`; la API también queda protegida.
- Lectura de `.env.local`: archivo inexistente, con BOM, CRLF y comillas.

---

## 8. Pendientes y observaciones

1. **Seguridad de las claves:** varias claves aparecieron en capturas y en el chat. Revoca las de Gemini y OpenRouter y crea nuevas. Guarda la nueva solo en `.env.local` o en la variable de entorno del servidor.
2. **Saldo de OpenRouter:** el análisis de archivos requiere saldo (mínimo $0.50 según el aviso que apareció).
3. **Modelo:** debe aceptar archivos PDF o imágenes. Si cambia la oferta del proveedor, revisar `OPENROUTER_MODEL`.
4. **GitHub Pages sin IA:** la URL pública solo muestra la demo. Para usar la IA publicada hace falta un servidor propio (como `server.mjs`) con HTTPS.
5. **Tamaño de letra "Grande":** hoy se ve igual que "Normal" (17 px). No se cambió para conservar la estética actual. Decidir si se ajusta.
6. **README del repositorio:** dice que los archivos no se envían a ningún servidor. Ya no es cierto y hay que actualizarlo.
7. **Indexación:** `site.json` tiene `robots: noindex`, así que los buscadores no muestran la demo. Cambiar si se desea que aparezca.
8. **Chat:** cada pregunta vuelve a enviar el documento completo, lo que aumenta el costo y el tiempo de respuesta.
9. **Licencia:** pendiente de definir por el autor del repositorio.
10. **Validación con documentos reales:** las pruebas con IA usaron respuestas simuladas por falta de saldo y acceso. Falta probar con el PDF real y con varios tipos de documento.

---

## 9. Notas sobre la IA

- Los resúmenes son orientativos. La app lo indica en pantalla y recomienda revisar el documento original.
- La IA no da asesoría legal, médica ni financiera, según las instrucciones del sistema.
- Las alertas señalan cláusulas que pueden costar dinero o quitar derechos, sin decir si son legales.

---

## 10. Arquitectura técnica y flujo de datos

ClariDoc opera en dos modalidades según el entorno de despliegue:

### Modo completo con IA (Local o Servidor propio)

```text
[ Navegador: React 19 + TypeScript + Tailwind CSS v4 ]
          │  (Sube PDF o imagen hasta 15 MB / Pregunta en chat)
          ▼
   POST /api/gemini
          │
          ▼
[ Servidor Node.js (server.mjs en producción / Vite dev en puerto 8443) ]
          │  - Sirve dist/ y bloquea rutas fuera de esa carpeta
          │  - Valida APP_PASSWORD (opcional)
          │  - Inyecta OPENROUTER_API_KEY de forma segura en el servidor
          ▼
[ OpenRouter API (https://openrouter.ai/api/v1/chat/completions) ]
          │  - Modelo: google/gemini-2.5-flash (o google/gemini-2.5-flash-lite)
          ▼
[ Respuesta estructurada: título, resumen, puntos clave, alertas y chat ]
```

### Modo demo pública (GitHub Pages)
- Compilación estática desplegada automáticamente mediante `.github/workflows/deploy.yml` con ruta base `/ClariDoc/`.
- No cuenta con backend ni almacena claves, por lo que ejecuta únicamente la demo con documento de ejemplo sin llamadas externas.

---

## 11. Referencia de variables de entorno

| Variable | Obligatoria | Valor por defecto | Descripción |
| :--- | :---: | :--- | :--- |
| `OPENROUTER_API_KEY` | Sí (para IA) | — | Clave de API de OpenRouter. Solo se lee en el servidor; nunca debe llevar prefijo `VITE_`. |
| `OPENROUTER_MODEL` | No | `google/gemini-2.5-flash` | Modelo usado para analizar archivos y responder el chat (recomendado para ahorro: `google/gemini-2.5-flash-lite`). |
| `APP_PASSWORD` | No | — | Protege el acceso a la interfaz web y a `/api/gemini` mediante autenticación segura en `server.mjs`. |
| `PORT` | No | `3000` | Puerto HTTP en el que escucha `server.mjs` en producción (en desarrollo local Vite usa `8443`). |

---

## 12. Seguridad y privacidad

- **Aislamiento de credenciales:** las claves se consumen únicamente desde el servidor (`server.mjs` o el middleware de desarrollo en `vite.config.ts`) y quedan excluidas del paquete JavaScript enviado al navegador.
- **Transferencia de documentos:** al usar el análisis con IA, los archivos (límite de 15 MB) se envían a través del servidor hacia OpenRouter para su procesamiento. Los textos de privacidad de la app ya reflejan este comportamiento.
- **Protección del servidor propio:** `server.mjs` restringe el servicio de archivos estáticos estrictamente a la carpeta `dist` (previniendo acceso a otros archivos del sistema) y aplica verificación de contraseña en modo seguro cuando `APP_PASSWORD` está definida.
- **Control de versiones:** `.env.local` está excluido del repositorio y no debe subirse a GitHub.

---

## 13. Lista de verificación previa a la entrega final

- [ ] **Rotar claves expuestas:** revocar las claves de Gemini y OpenRouter que aparecieron en capturas o chats y generar nuevas solo en `.env.local` o variables del servidor.
- [ ] **Cargar saldo en OpenRouter:** asegurar al menos $0.50 USD de crédito para habilitar el procesamiento de archivos reales.
- [ ] **Probar con documentos reales:** validar el análisis y el chat con PDFs e imágenes reales de distintos tipos (contratos, recibos, recetas y avisos).
- [ ] **Actualizar `README.md`:** corregir el aviso anterior que indicaba que los archivos no salían del dispositivo y reflejar el uso de OpenRouter y `server.mjs`.
- [ ] **Definir licencia y visibilidad:** agregar archivo `LICENSE` en el repositorio y decidir si se mantiene `robots: noindex` en `site.json`.
- [ ] **Revisar accesibilidad de texto:** confirmar si el tamaño de letra "Grande" se deja en 17 px para conservar el diseño exacto o se incrementa.