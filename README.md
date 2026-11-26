
ClariDoc
¡Firma lo que entiendes!
Información pública y trámites en lenguaje claro | ODS 10 y ODS 11

INFORMACIÓN DEL PROYECTO

Hackatón: Hackatón Nacional UVM 2026: ¡Impulsa el Futuro con IA!
Equipo: Sinapsis
Campus: Coyoacán
Aplicación: ClariDoc

Integrantes:
- Rubí Nayeli Egoavil Sinche
- Luis Felipe Ruiz Dorantes
- Octavio Hernández Carrasco

--------------------------------------------------

1. RESUMEN EJECUTIVO

ClariDoc es una aplicación que utiliza Google Gemini para ayudar a las personas a comprender documentos difíciles, como contratos, recetas, recibos y trámites. Mediante una fotografía, ofrece explicaciones sencillas, lectura en voz alta, un semáforo de atención y los pasos y fechas importantes. Está dirigida especialmente a adultos mayores, personas con baja alfabetización y migrantes. Su objetivo es facilitar el acceso a la información y promover la inclusión mediante inteligencia artificial.

2. BOCETO Y CONCEPTO

El problema

Muchas personas reciben o firman documentos cuyo lenguaje legal, técnico o burocrático resulta difícil de comprender. Esto puede provocar decisiones mal informadas, pérdidas económicas y dificultades para realizar trámites.

De acuerdo con el Instituto Nacional de Estadística y Geografía (INEGI, 2020), en México el grado promedio de escolaridad de la población de 15 años y más era de 9.7 años. Esta cifra permite dimensionar la importancia de ofrecer información clara y accesible.

Fuente: INEGI (2020).

Propuesta de solución

ClariDoc permite fotografiar o subir un documento para recibir:

- Una explicación en lenguaje sencillo.
- Una lectura en voz alta.
- Un semáforo de atención (verde, amarillo y rojo).
- Los pasos a seguir y las fechas importantes.

Alineación con los Objetivos de Desarrollo Sostenible

ODS 10: Reducción de las desigualdades.
Facilita que adultos mayores, personas con baja escolaridad y migrantes comprendan documentos importantes mediante explicaciones sencillas y lectura en voz alta.

ODS 11: Ciudades y comunidades sostenibles.
Ayuda a comprender contratos de arrendamiento y documentos relacionados con servicios básicos, facilitando decisiones informadas sobre la vivienda y la comunidad.

Relación del proyecto con las metas de los ODS

ClariDoc contribuye a la meta 10.2 del ODS 10 al promover la inclusión y facilitar el acceso a información comprensible. Asimismo, se relaciona con la meta 11.1 del ODS 11 al ayudar a comprender contratos de arrendamiento y documentos relacionados con servicios básicos.

3. DOCUMENTACIÓN FUNCIONAL

Escanear documento:
Permite tomar una fotografía o seleccionar un archivo desde la galería.

Explicación simple:
Gemini resume el documento utilizando lenguaje sencillo.

Semáforo de atención:
Clasifica los puntos de atención en verde, amarillo o rojo y explica su significado.

Pasos pendientes:
Muestra las acciones que debe realizar el usuario.

Fechas importantes:
Identifica vencimientos y plazos del documento.

Lectura en voz alta:
Reproduce el resumen mediante audio.

Pregúntale a tu documento:
Permite realizar preguntas y recibir respuestas sobre su contenido.

4. DOCUMENTACIÓN TÉCNICA

Arquitectura general

ClariDoc utiliza una arquitectura en la que la aplicación móvil se comunica con un backend en Python, que procesa los documentos mediante Google Gemini.

Paso 1. App móvil (Flutter):
Captura o selecciona el documento y lo envía al backend mediante HTTP.

Paso 2. Backend (FastAPI):
Recibe la imagen y la envía a Gemini junto con las instrucciones correspondientes.

Paso 3. Google Gemini 2.5 Flash:
Analiza el documento y genera una respuesta estructurada en JSON.

Paso 4. App móvil:
Muestra el resumen, semáforo, pasos y fechas, además de permitir la lectura en voz alta.

Stack tecnológico

Aplicación móvil: Flutter y Dart.
Paquetes de la aplicación: image_picker, flutter_tts y http.
Backend: Python, FastAPI, Uvicorn y Pydantic.
Inteligencia artificial: Google Gemini 2.5 Flash.
Librería de Gemini: google-genai.
Control de versiones: Git y GitHub.
Editor de código: Visual Studio Code.

Integración de Google Gemini

1. La aplicación envía la fotografía del documento al backend.
2. El backend envía la imagen y un prompt a Gemini.
3. Gemini analiza el contenido y responde mediante un JSON estructurado con resumen, nivel de riesgo, puntos de atención, pasos y fechas.
4. La aplicación presenta los resultados al usuario.
5. Cuando el usuario realiza una pregunta, el backend vuelve a consultar a Gemini utilizando el análisis del documento como contexto.

El prompt indica que Gemini debe utilizar lenguaje sencillo, evitar inventar información, señalar cuando falten datos y no proporcionar asesoría legal.

Seguridad y privacidad

- La clave de API se configura mediante la variable de entorno GOOGLE_API_KEY.
- La clave no debe incluirse directamente en la aplicación ni en el repositorio.
- Los documentos se procesan para generar la explicación y no se almacenan, de acuerdo con el funcionamiento previsto del proyecto.

Cómo ejecutar el proyecto

Backend

cd backend
python -m venv .venv

Activar el entorno virtual:

Windows:
.venv\Scripts\activate

Mac / Linux:
source .venv/bin/activate

Instalar dependencias:

pip install fastapi uvicorn python-multipart google-genai pydantic

Configurar la variable de entorno GOOGLE_API_KEY con la clave de Gemini y ejecutar:

uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Aplicación móvil

cd app
flutter pub get
flutter run

5. MANUAL DE USUARIO

¿Qué es ClariDoc?

ClariDoc es una herramienta diseñada para ayudarte a entender documentos complicados, como recibos de servicios, avisos municipales, convocatorias o contratos, de forma clara, rápida y sin palabras difíciles.

Solo necesitas tomar una fotografía o subir un archivo. La aplicación te mostrará:

- Una explicación del documento en palabras sencillas.
- Un semáforo de atención.
- Pasos a seguir, fechas importantes y recomendaciones.
- Una opción de audio en español de México.
- Un chat para realizar preguntas sobre el documento.

Antes de empezar

Puedes utilizar ClariDoc desde el navegador de tu celular, tableta o computadora. Ten preparado tu documento impreso o un archivo en formato PNG, JPG, WEBP o PDF.

Procura que el texto tenga buena iluminación y sea legible.

Paso a paso: ¿Cómo usar ClariDoc?

1. Elige el tipo de explicación

- Lenguaje claro cotidiano: explicación sencilla y directa.
- Lectura Fácil: frases cortas y palabras comunes, ideal para adultos mayores.

2. Sube o fotografía tu documento

- Subir documento o aviso: selecciona una imagen o archivo PDF.
- Tomar foto: utiliza la cámara para fotografiar el documento.

3. Traduce el documento

Presiona el botón "Traducir a lenguaje claro" y espera mientras se analiza la información.

4. Revisa y escucha los resultados

- Verde: información sin urgencia inmediata.
- Amarillo: requiere atención, como un pago próximo.
- Rojo: indica una situación urgente, como una fecha límite cercana o una posible multa.

También encontrarás un resumen, recomendaciones, puntos importantes, pasos a seguir y fechas. Puedes presionar el botón Play para escuchar la explicación.

5. Haz preguntas sobre tu documento

En la sección "Pregúntale a tu documento" puedes escribir dudas como "¿Cuándo vence?" o "¿Qué documentos necesito llevar?".

Consejos para un mejor resultado

- Evita sombras y reflejos al tomar fotografías.
- Asegúrate de que las páginas estén completas y sean legibles.
- Para analizar otro documento, carga el nuevo archivo y vuelve a presionar "Traducir a lenguaje claro".

Privacidad y aviso importante

Los documentos se procesan durante la consulta y no se almacenan en bases de datos permanentes. Evita compartir información sensible cuando no sea necesario.

ClariDoc es una herramienta de apoyo informativo y no sustituye la asesoría legal, contable, médica o institucional cuando sea necesaria.

6. ACCESIBILIDAD E IMPACTO

¿Qué hace inclusiva a ClariDoc?

- Lenguaje sencillo: explicaciones fáciles de comprender.
- Lectura en voz alta: apoya a personas con baja alfabetización o dificultad visual.
- Interfaz clara: botones y letras grandes, además de un semáforo con texto de apoyo.
- Fácil de utilizar: pensada para personas que utilizan la aplicación por primera vez.
- Idioma: explicaciones en español.

Impacto que busca generar

- Ayudar a que más personas comprendan lo que firman y puedan identificar condiciones importantes.
- Reducir errores y riesgos por no comprender recetas, recibos y trámites.
- Facilitar el acceso a la información para adultos mayores, personas con baja escolaridad y migrantes.
- Promover futuras alianzas con municipios, bibliotecas, organizaciones y módulos de atención ciudadana.

7. REFERENCIAS

Fuentes estadísticas y Objetivos de Desarrollo Sostenible

Instituto Nacional de Estadística y Geografía (INEGI). (2020). Escolaridad. Censo de Población y Vivienda 2020.
https://www.cuentame.inegi.org.mx/poblacion/escolaridad.aspx

Naciones Unidas. (s. f.). Objetivo 10: Reducir las desigualdades.
https://www.un.org/sustainabledevelopment/es/inequality/

Naciones Unidas. (s. f.). Objetivo 11: Ciudades y comunidades sostenibles.
https://www.un.org/sustainabledevelopment/es/cities/

Documentación de tecnologías

Google AI for Developers. (s. f.). Gemini API: Documentación oficial.
https://ai.google.dev/gemini-api/docs

Flutter. (s. f.). Documentación oficial de Flutter.
https://docs.flutter.dev/

Flutter Community. (s. f.). image_picker: Flutter package.
https://pub.dev/packages/image_picker


--------------------------------------------------

ClariDoc — ¡Firma lo que entiendes!

Equipo Sinapsis | Campus Coyoacán | Hackatón Nacional UVM 2026
