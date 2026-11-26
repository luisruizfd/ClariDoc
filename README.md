# ClariDoc
Información pública y trámites en lenguaje claro (ODS 11)
ClariDoc
Firma lo que entiendes!
App móvil que usa Google Gemini para explicar documentos (contratos, recetas, recibos y trámites) en lenguaje sencillo, por voz, y avisar qué es riesgoso y qué hay que hacer.
Hackatón	Hackatón Nacional UVM 2026: ¡Impulsa el Futuro con IA!
Equipo	Sinapsis
Campus	Coyoacán
Integrantes	Rubí, Luis Felipe Ruiz Dorantes y Octavio

1. Resumen ejecutivo
ClariDoc es una app móvil que ayuda a entender documentos difíciles, como contratos, recetas, recibos y trámites. La persona toma una foto y, con Google Gemini, recibe una explicación en lenguaje sencillo, una lectura en voz alta, un semáforo de riesgo y los pasos y fechas pendientes. Apoya a adultos mayores, personas con baja alfabetización y migrantes. Es innovadora porque une visión, lenguaje y voz de Gemini en un solo flujo pensado para reducir la desigualdad en el acceso a la información.

3. Boceto y concepto
El problema
Millones de personas firman o aceptan documentos que no comprenden: contratos de renta con cláusulas abusivas, recetas con indicaciones confusas o trámites con requisitos poco claros. El lenguaje legal y burocrático es una barrera que afecta especialmente a las personas con menor escolaridad, los adultos mayores y quienes enfrentan dificultades para comprender textos técnicos. Esta situación puede generar decisiones mal informadas, pérdidas económicas y exclusión.
De acuerdo con el Instituto Nacional de Estadística y Geografía (INEGI, 2020), en México el grado promedio de escolaridad de la población de 15 años y más era de 9.7 años, equivalente a poco más de la secundaria. Esta cifra permite dimensionar la importancia de ofrecer información clara y accesible para que las personas puedan comprender documentos relacionados con su vida cotidiana.
Fuente: INEGI (2020).

La propuesta de solución
Una app donde la persona fotografía su documento y recibe, en segundos:
•	una explicación en lenguaje sencillo,
•	una lectura en voz alta,
•	un semáforo de riesgo (verde, amarillo y rojo) con los puntos de atención,
•	los pasos a seguir y las fechas importantes.
Alineación con los ODS
ODS	Cómo contribuye
ODS 10: Reducción de las desigualdades	Facilita que adultos mayores, personas con baja escolaridad y migrantes comprendan documentos importantes mediante explicaciones sencillas y lectura en voz alta, promoviendo la inclusión y la igualdad de oportunidades.
ODS 11: Ciudades y comunidades sostenibles	Facilita la comprensión de contratos de arrendamiento y documentos relacionados con servicios básicos, ayudando a las personas a identificar sus obligaciones, fechas y posibles riesgos al tomar decisiones sobre su vivienda y comunidad.

Relación del proyecto con las metas de los ODS
ClariDoc contribuye a la meta 10.2 del ODS 10 al promover la inclusión de personas con distintas condiciones educativas, edades y orígenes, facilitando el acceso a información comprensible. Asimismo, se relaciona con la meta 11.1 del ODS 11 al ayudar a comprender contratos de arrendamiento y documentos relacionados con servicios básicos, favoreciendo que las personas tomen decisiones informadas sobre su vivienda y comunidad.

3. Documentación funcional
Función	Qué hace
Escanear documento	Abre la cámara o la galería para capturar una foto del documento.
Explicación simple	Gemini resume el documento en un máximo de 5 líneas, con nivel de lectura sencillo.
Semáforo de riesgo	Clasifica el documento y cada punto de atención en verde, amarillo o rojo, y muestra qué dice el texto original y qué significa.
Pasos pendientes	Lista las acciones concretas que la persona debe realizar.
Fechas importantes	Extrae vencimientos y plazos del documento.
Lectura en voz alta	Lee el resumen con voz (texto a voz) para quien no lee con facilidad.
Pregúntale a tu documento	Permite hacer preguntas sobre el documento y recibir respuestas simples. 

4. Documentación técnica
Arquitectura general
El flujo va de la app móvil al backend y de ahí a Gemini; la respuesta regresa a la app ya estructurada.
Paso	Componente	Qué ocurre
1	App móvil (Flutter)	Cámara, pantallas y voz. Envía la foto al backend por HTTP.
2	Backend en Python (FastAPI)	Recibe la foto y la manda a Gemini junto con un prompt.
3	Gemini 2.5 Flash	Lee el documento y responde en JSON estructurado.
4	App móvil	Muestra resumen, semáforo, pasos y fechas, y los lee en voz alta.

Stack tecnológico
Capa	Tecnología
App móvil	Flutter (Dart), image_picker, flutter_tts, http
Backend	Python, FastAPI, Uvicorn, Pydantic
Inteligencia artificial	Google Gemini 2.5 Flash, librería google-genai
Control de versiones	Git y GitHub
Editor	Visual Studio Code

Cómo se integra Gemini
1.	La app envía la foto del documento al backend.
2.	El backend manda la imagen y un prompt a Gemini, un modelo multimodal de visión y lenguaje.
3.	Gemini lee el documento y responde en JSON estructurado, validado con un esquema (resumen, nivel de riesgo, puntos de atención, pasos y fechas).
4.	La app muestra los resultados y los lee en voz alta.
5.	Para las preguntas del usuario, el backend vuelve a consultar a Gemini con el análisis como contexto.
El prompt le indica a Gemini que use lenguaje sencillo, que no invente datos, que avise cuando falte información y que no dé asesoría legal, sino que sugiera consultar a un profesional cuando el riesgo sea alto.
Seguridad y privacidad
•	La clave de API se guarda como variable de entorno (GOOGLE_API_KEY) y nunca dentro de la app ni del repositorio.
•	Los documentos se procesan para generar la explicación y no se almacenan. 
Cómo ejecutar el proyecto
Backend
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows (Mac/Linux: source .venv/bin/activate)
pip install fastapi uvicorn python-multipart google-genai pydantic
# Define la variable de entorno GOOGLE_API_KEY con tu clave de Gemini
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

App móvil
cd app
flutter pub get
flutter run
5. Manual de usuario
¿Qué es ClariDoc?
ClariDoc es una herramienta diseñada para ayudarte a entender documentos complicados, como recibos de servicios, avisos municipales, convocatorias o contratos, de forma clara, rápida y sin palabras difíciles.
Solo necesitas tomar una fotografía o subir un archivo. La aplicación te mostrará:
•	De qué trata el documento en palabras sencillas.
•	Un semáforo de atención para identificar si requiere atención o es urgente.
•	Pasos a seguir, fechas importantes y consejos prácticos.
•	Una opción de audio para escuchar la explicación en español de México.
•	Un chat para realizar preguntas sobre el documento.
Antes de empezar
Puedes utilizar ClariDoc desde el navegador de tu celular, tableta o computadora. Ten preparado tu documento impreso o un archivo en formato PNG, JPG, WEBP o PDF.
Procura que el texto tenga buena iluminación y sea completamente legible.
Paso a paso: ¿Cómo usar ClariDoc?
1. Elige el tipo de explicación
En la parte superior encontrarás dos opciones:
•	Lenguaje claro cotidiano: explicación sencilla y directa.
•	Lectura Fácil: frases cortas y palabras comunes, ideal para adultos mayores.
2. Sube o fotografía tu documento
Selecciona la opción que prefieras:
•	Subir documento o aviso: elige una imagen o archivo PDF de tu dispositivo.
•	Tomar foto: utiliza la cámara para fotografiar el documento.
Después aparecerá una vista previa del archivo seleccionado.
3. Traduce el documento
Presiona el botón «Traducir a lenguaje claro» y espera mientras se analiza la información.
4. Revisa y escucha los resultados
ClariDoc organizará la información de la siguiente manera:
•	Verde: información sin urgencia inmediata.
•	Amarillo: requiere atención, como un pago próximo o una condición importante.
•	Rojo: indica una situación urgente, como una fecha límite cercana o una posible multa.
También encontrarás un resumen, recomendaciones, puntos importantes, pasos a seguir y fechas. Si lo deseas, presiona el botón Play para escuchar la explicación.
5. Haz preguntas sobre tu documento
En la sección «Pregúntale a tu documento» puedes escribir dudas como: «¿Cuándo vence?», «¿Qué documentos necesito llevar?» o «¿A dónde tengo que acudir?».
Consejos para un mejor resultado
•	Evita sombras y reflejos al tomar fotografías.
•	Asegúrate de que las páginas estén completas y sean legibles.
•	Para analizar otro documento, carga el nuevo archivo y vuelve a presionar «Traducir a lenguaje claro».
Privacidad y aviso importante
Privacidad: los documentos se procesan durante la consulta y no se almacenan en bases de datos permanentes. Evita compartir información sensible cuando no sea necesario.
Aviso: ClariDoc es una herramienta de apoyo informativo. No sustituye la asesoría legal, contable, médica o institucional cuando sea necesaria.

Qué hace inclusiva a la app
•	Lenguaje sencillo: las explicaciones se redactan en un nivel de lectura accesible.
•	Lectura en voz alta: apoya a personas con baja alfabetización o dificultad visual.
•	Interfaz clara: botones grandes, letra grande y semáforo de color con texto de apoyo, para no depender solo del color. 
•	Pensada para quien la usa por primera vez, sin registros complicados.
•	Idioma: español. 
Impacto que busca generar
•	Que más personas entiendan lo que firman y eviten cláusulas abusivas.
•	Reducir errores y riesgos por no comprender recetas, recibos y trámites.
•	Acercar a adultos mayores, personas con baja escolaridad y migrantes a información que antes les era ajena.
•	A futuro: alianzas con municipios, bibliotecas, ONG y módulos de atención ciudadana. 
