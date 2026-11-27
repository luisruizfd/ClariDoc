# ClariDoc

**Información pública y trámites en lenguaje claro (ODS 11)**

ClariDoc ayuda a adultos mayores y a personas no técnicas a entender documentos como contratos, recibos, recetas médicas y avisos, explicándolos en palabras sencillas y permitiendo resolver dudas con confianza.

## 🌐 Ver la demo

**https://luisruizfd.github.io/ClariDoc/**

> Es una demostración visual. No analiza el contenido real de tus archivos ni ofrece asesoría médica o legal.

## Funciones

- **Escanear o subir documento:** flujo de captura con foto, PDF o imagen (demostración).
- **Resumen sencillo:** explicación en lenguaje claro con puntos clave y alertas importantes.
- **Lectura en voz alta:** usa la síntesis de voz del navegador, con velocidad ajustable.
- **Preguntas rápidas:** asistente de ejemplo para dudas frecuentes sobre un documento.
- **Historial y ajustes:** documentos de ejemplo, tamaño de letra y lectura automática.
- **Diseño adaptable:** funciona en computadora y en teléfono.

## Ejecutar en local con Visual Studio Code

Requisitos: [Node.js 22](https://nodejs.org/) y [pnpm 10](https://pnpm.io/installation).

1. Clona el repositorio y ábrelo en VS Code:
   ```bash
   git clone https://github.com/luisruizfd/ClariDoc.git
   cd ClariDoc
   code .
   ```
2. Abre la terminal integrada de VS Code (menú **Terminal → Nueva terminal**) e instala dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
4. Abre **http://localhost:8443** en tu navegador. Los cambios en `src/` se ven al instante.

Para revisar la versión de producción:

```bash
pnpm run build
pnpm run preview
```

## Publicar en GitHub Pages

El sitio se publica automáticamente con GitHub Actions (`.github/workflows/deploy.yml`) cada vez que se hace push a `main`.

Primera vez:

1. En el repositorio, ve a **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Haz push a `main` (o ejecuta el workflow desde la pestaña **Actions**).

## Estructura

```
src/
  App.tsx        Pantallas y lógica de la demostración
  index.css      Estilos globales (Tailwind CSS v4)
  main.tsx       Punto de entrada de React
index.html       Documento base
vite.config.ts   Configuración de Vite (incluye la ruta base para GitHub Pages)
public/          Archivos estáticos (favicon)
.figma/make/     Configuración del sitio (título, idioma, descripción)
```

## Tecnologías

- React 19 y TypeScript
- Vite 8
- Tailwind CSS v4
- Tipografías DM Sans y Manrope (Google Fonts)

## Notas

- Los archivos subidos no se envían ni se guardan en un servidor.
- Las páginas del sitio se marcan como no indexables (`robots: noindex`) según `.figma/make/site.json`. Cambia ese valor si quieres que aparezca en buscadores.

## Licencia

Pendiente de definir por el autor del repositorio.
