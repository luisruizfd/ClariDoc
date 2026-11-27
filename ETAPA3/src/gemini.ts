// Cliente de Gemini para analizar documentos.
//
// - VITE_GEMINI_PROXY_URL (recomendado en producción): las peticiones van a un proxy
//   que guarda la clave en el servidor. Ver README.
// - VITE_GEMINI_API_KEY (solo desarrollo local): la clave queda visible en el navegador.
//   No la publiques en GitHub Pages.

const MODEL = "gemini-2.5-flash";
const PROXY_URL = (import.meta.env.VITE_GEMINI_PROXY_URL as string | undefined) || "";
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) || "";
const MAX_BYTES = 15 * 1024 * 1024;

export type Analysis = {
  titulo: string;
  resumen: string;
  puntosClave: { etiqueta: string; valor: string }[];
  alertas: string[];
};

const analysisSchema = {
  type: "OBJECT",
  properties: {
    titulo: { type: "STRING" },
    resumen: { type: "STRING" },
    puntosClave: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          etiqueta: { type: "STRING" },
          valor: { type: "STRING" },
        },
        required: ["etiqueta", "valor"],
      },
    },
    alertas: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["titulo", "resumen", "puntosClave", "alertas"],
};

const SYSTEM_PROMPT = `Eres ClariDoc, un asistente que explica documentos en lenguaje claro y sencillo para adultos mayores y personas no técnicas.
Reglas:
- Responde siempre en español, con frases cortas y sin tecnicismos. Si usas un término legal, explícalo.
- Basa tus respuestas solo en el texto del archivo. Si un dato no aparece, escribe "No se indica en el documento".
- No des asesoría legal, médica ni financiera. Sugiere consultar a un profesional cuando corresponda.
- En las alertas señala cláusulas que puedan costar dinero, quitar derechos o comprometer patrimonio (penalizaciones, intereses, depósitos, avisos, obligados solidarios, cambios unilaterales). Explica por qué importan. No digas si son legales o no.
- Si el archivo no es legible o no es un documento, dilo en el resumen.`;

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("No pudimos leer el archivo."));
    reader.readAsDataURL(file);
  });
}

async function filePart(file: File) {
  if (file.size > MAX_BYTES) {
    throw new Error("El archivo es demasiado grande. El máximo es 15 MB.");
  }
  const isPdf = file.name.toLowerCase().endsWith(".pdf");
  const mimeType = file.type || (isPdf ? "application/pdf" : "image/jpeg");
  return { inlineData: { mimeType, data: await toBase64(file) } };
}

async function generate(body: object): Promise<string> {
  const url =
    PROXY_URL || `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (!PROXY_URL) {
    if (!API_KEY) throw new Error("Falta configurar la clave de Gemini.");
    headers["x-goog-api-key"] = API_KEY;
  }
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok) {
    throw new Error(
      res.status === 429
        ? "Hay muchas solicitudes. Intenta de nuevo en un minuto."
        : `No pudimos analizar el archivo (error ${res.status}).`,
    );
  }
  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  if (!text) throw new Error("No recibimos respuesta. Intenta con otro archivo.");
  return text;
}

export async function analyzeDocument(file: File): Promise<Analysis> {
  const text = await generate({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        role: "user",
        parts: [await filePart(file), { text: "Analiza este documento y responde con el JSON solicitado." }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
      temperature: 0.2,
    },
  });
  try {
    return JSON.parse(text) as Analysis;
  } catch {
    throw new Error("No pudimos leer la respuesta. Intenta de nuevo.");
  }
}

export async function answerQuestion(file: File, question: string, previous: Analysis): Promise<string> {
  return generate({
    systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\nResponde en máximo 4 frases.` }] },
    contents: [
      {
        role: "user",
        parts: [
          await filePart(file),
          { text: `Resumen previo: ${previous.resumen}\n\nPregunta de la persona: ${question}` },
        ],
      },
    ],
    generationConfig: { temperature: 0.2 },
  });
}
