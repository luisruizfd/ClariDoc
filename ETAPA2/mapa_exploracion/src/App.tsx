import { useEffect, useRef, useState } from "react";

type Screen =
  | "welcome"
  | "home"
  | "capture"
  | "loading"
  | "result"
  | "chat"
  | "history"
  | "settings";
type IconName =
  | "document"
  | "spark"
  | "home"
  | "history"
  | "settings"
  | "help"
  | "shield"
  | "arrow"
  | "camera"
  | "upload"
  | "image"
  | "pen"
  | "receipt"
  | "medical"
  | "mail"
  | "check"
  | "lock"
  | "volume"
  | "warning"
  | "send"
  | "mic"
  | "search"
  | "clock"
  | "close";
function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    document: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4M18 4h4" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7" />
      </>
    ),
    history: (
      <>
        <path d="M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l3 2" />
      </>
    ),
    settings: (
      <>
        <path d="m9 3-1 3-3 1-2 4 2 3v4l4 2 3-1 3 1 4-2v-4l2-3-2-4-3-1-1-3z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .6-1.5 1-1.5 3M12 17h.01" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6" />
      </>
    ),
    arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
    camera: (
      <>
        <path d="M3 7h5l2-3h4l2 3h5v13H3z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8" r="1" />
        <path d="m3 18 6-6 4 4 3-3 5 5" />
      </>
    ),
    pen: (
      <>
        <path d="m4 16-1 5 5-1L21 7l-4-4zM14 6l4 4M12 21h9" />
      </>
    ),
    receipt: (
      <>
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2zM9 7h6M9 11h6M9 15h3" />
      </>
    ),
    medical: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 5V3h8v2M12 9v8M8 13h8" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="3" />
        <path d="m3 7 9 7 9-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    volume: (
      <>
        <path d="m11 4-6 5H2v6h3l6 5zM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
      </>
    ),
    warning: (
      <>
        <path d="m12 3 10 18H2zM12 9v5M12 17h.01" />
      </>
    ),
    send: (
      <>
        <path d="m3 3 18 9-18 9 4-9zM7 12h14" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="2" width="6" height="13" rx="3" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 6 6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Icon name="document" size={26} />
        <span>
          <Icon name="spark" size={14} />
        </span>
      </span>
      Clari<span>Doc</span>
    </div>
  );
}
function DocumentArt({ scanning = false }: { scanning?: boolean }) {
  return (
    <div className={`illustration ${scanning ? "scanning" : ""}`}>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="art-spark spark-one">
        <Icon name="spark" size={35} />
      </span>
      <span className="art-spark spark-two">
        <Icon name="spark" size={22} />
      </span>
      <span className="art-dot dot-one" />
      <span className="art-dot dot-two" />
      <div className="paper">
        <div className="paper-fold" />
        <div className="paper-symbol">
          <Icon name="document" size={28} />
        </div>
        <div className="paper-line long" />
        <div className="paper-line" />
        <div className="paper-line medium" />
        <div className="paper-highlight">
          <Icon name="check" size={16} />
          <span />
        </div>
        <div className="paper-line medium" />
        <div className="paper-line" />
        <div className="paper-signature">ClariDoc</div>
        {scanning && <div className="scan-line" />}
      </div>
      <div className="magnifier">
        <div>
          <Icon name="check" size={44} />
        </div>
      </div>
      <div className="art-label">
        <span>
          <Icon name="spark" size={17} />
        </span>
        Lo complicado, más claro.
      </div>
    </div>
  );
}
const categories: { name: string; icon: IconName; description: string }[] = [
  { name: "Contrato", icon: "pen", description: "Entiende cada acuerdo" },
  { name: "Recibo o factura", icon: "receipt", description: "Tus cuentas, más claras" },
  { name: "Receta médica", icon: "medical", description: "Cuida de ti con confianza" },
  { name: "Aviso o carta", icon: "mail", description: "Descubre lo importante" },
];
const initialDocs = [
  { title: "Receta médica — Dr. García", date: "Hoy, 10:30 a. m.", icon: "medical" as IconName },
  { title: "Recibo de luz", date: "18 de junio de 2025", icon: "receipt" as IconName },
  { title: "Contrato de renta", date: "15 de junio de 2025", icon: "pen" as IconName },
];
export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [help, setHelp] = useState(false);
  const [size, setSize] = useState("Grande");
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState("Normal");
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>([]);
  const [filename, setFilename] = useState("Contrato de telefonía · Ejemplo");
  const [notice, setNotice] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const go = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (screen !== "loading") return;
    const t = setTimeout(() => setScreen("result"), 3400);
    return () => clearTimeout(t);
  }, [screen]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(t);
  }, [notice]);
  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setNotice("Tu navegador no admite lectura en voz alta.");
      return;
    }
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-MX";
    u.rate = speed === "Lenta" ? 0.7 : 0.9;
    u.onend = () => setSpeaking(false);
    speechSynthesis.speak(u);
    setSpeaking(true);
  };
  const summary =
    "Este es un contrato de servicio de telefonía por 12 meses con un pago fijo mensual de 350 pesos. Pagas los días 5 de cada mes. Si cancelas antes de 12 meses, se cobra una penalización.";
  useEffect(() => {
    if (screen === "result" && auto) speak(summary);
  }, [screen]);
  const ask = (q: string) => {
    if (!q.trim()) return;
    let answer = q.toLowerCase().includes("cancel")
      ? "En este contrato de ejemplo, cancelar antes de los 12 meses implica una penalización. El importe no está indicado en este resumen: pide al proveedor que lo confirme por escrito."
      : q.toLowerCase().includes("atras") || q.toLowerCase().includes("pago")
        ? "El pago vence el día 5 de cada mes. Este ejemplo no especifica cargos por atraso. Antes de firmar, pregunta cuánto te cobrarían y si existe un plazo de tolerancia."
        : q.toLowerCase().includes("firm")
          ? "La decisión es tuya. Revisa si puedes pagar $350 al mes durante un año y pregunta el costo de cancelar antes. No firmes hasta que todas tus dudas estén resueltas."
          : "Esta es una demostración y no estoy analizando tu archivo. En el contrato de ejemplo, el pago es de $350 mensuales durante 12 meses. Puedes preguntar por los pagos o por la cancelación.";
    setMessages((m) => [...m, { text: q, user: true }, { text: answer, user: false }]);
    setInput("");
  };
  const active = ["history", "settings"].includes(screen) ? screen : "home";
  const nav = (mobile = false) => (
    <nav className={mobile ? "mobile-nav" : "side-nav"} aria-label="Navegación principal">
      {(
        [
          { id: "home", label: "Inicio", icon: "home" },
          { id: "history", label: "Historial", icon: "history" },
          { id: "settings", label: "Ajustes", icon: "settings" },
        ] as const
      ).map((n) => (
        <button
          key={n.id}
          className={active === n.id ? "nav-item active" : "nav-item"}
          aria-current={active === n.id ? "page" : undefined}
          onClick={() => go(n.id)}
        >
          <Icon name={n.icon} />
          <span>{n.label}</span>
          {!mobile && active === n.id && <span className="nav-dot" />}
        </button>
      ))}
    </nav>
  );
  return (
    <div
      className={`app text-${size === "Normal" ? "normal" : size === "Muy grande" ? "xl" : "large"}`}
    >
      <aside className="sidebar">
        <button
          className="logo-button"
          onClick={() => go("welcome")}
          aria-label="ClariDoc, bienvenida"
        >
          <Brand />
        </button>
        <div className="side-label">TU ESPACIO, MÁS CLARO</div>
        {nav()}
        <div className="sidebar-bottom">
          <div className="side-tip">
            <span className="icon-tile">
              <Icon name="spark" />
            </span>
            <h3>Entender te da tranquilidad.</h3>
            <p>Estamos aquí para ayudarte, paso a paso.</p>
            <button onClick={() => setHelp(true)}>
              ¿Necesitas ayuda? <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="sidebar-secure">
            <Icon name="shield" size={18} /> Un espacio seguro para ti
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="desktop-breadcrumb">
            Tu tranquilidad empieza aquí <span>/</span>{" "}
            <strong>
              {screen === "welcome"
                ? "Bienvenido"
                : screen === "history"
                  ? "Mis documentos"
                  : screen === "settings"
                    ? "Ajustes"
                    : screen === "chat"
                      ? "Asistente"
                      : "Inicio"}
            </strong>
          </div>
          <div className="mobile-brand">
            <Brand />
          </div>
          <button className="help-button" onClick={() => setHelp(true)}>
            <Icon name="help" size={20} /> Ayuda
          </button>
        </header>
        <main className={`main screen-${screen}`}>
          {screen === "welcome" && (
            <>
              <section className="welcome-card">
                <div className="welcome-copy">
                  <div className="eyebrow">
                    <span /> MENOS DUDAS, MÁS TRANQUILIDAD
                  </div>
                  <h1>
                    ¡Firma lo que
                    <br />
                    <em>entiendes!</em>
                  </h1>
                  <p className="welcome-description">
                    Comprende tus documentos de forma fácil, rápida y segura.
                  </p>
                  <div className="welcome-art-mobile">
                    <DocumentArt />
                  </div>
                  <button className="primary start-button" onClick={() => go("home")}>
                    Comenzar <Icon name="arrow" size={22} />
                  </button>
                  <p className="trust-line">
                    <Icon name="lock" size={16} /> Tus documentos son privados y seguros
                  </p>
                </div>
                <div className="welcome-art-desktop">
                  <DocumentArt />
                </div>
                <span className="welcome-corner">Claridad para decidir con confianza.</span>
              </section>
              <section className="how-section">
                <div className="section-heading">
                  <h2>Entenderlo es así de sencillo</h2>
                  <span>Sin palabras difíciles. Sin complicaciones.</span>
                </div>
                <div className="steps-grid">
                  {[
                    {
                      icon: "upload",
                      title: "Comparte tu documento",
                      text: "Toma una foto o sube un archivo.",
                    },
                    {
                      icon: "spark",
                      title: "Lo hacemos sencillo",
                      text: "Te explicamos lo que importa.",
                    },
                    {
                      icon: "help",
                      title: "Resuelve tus dudas",
                      text: "Pregunta con total confianza.",
                    },
                  ].map((s, i) => (
                    <div className="step-card" key={s.title}>
                      <div className="step-top">
                        <span className="icon-tile">
                          <Icon name={s.icon as IconName} />
                        </span>
                        <span className="step-number">0{i + 1}</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              </section>
              <div className="welcome-footer">
                <Icon name="shield" size={19} />
                <span>Tú tienes el control. Nosotros te ayudamos a entender.</span>
              </div>
            </>
          )}
          {screen === "home" && (
            <>
              <div className="page-heading">
                <div className="eyebrow">UN POCO DE CLARIDAD PARA TU DÍA</div>
                <h1>
                  Hola, ¿qué documento
                  <br />
                  revisaremos hoy?
                </h1>
                <p>Vamos paso a paso. Tú eliges por dónde empezar.</p>
              </div>
              <button className="upload-card" onClick={() => go("capture")}>
                <span className="upload-card-icon">
                  <Icon name="camera" size={38} />
                </span>
                <span>
                  <strong>Escanear o subir documento</strong>
                  <span>Toma una foto o elige un archivo</span>
                </span>
                <Icon name="arrow" size={27} />
              </button>
              <h2 className="category-heading">O elige el tipo de documento:</h2>
              <div className="category-grid">
                {categories.map((c) => (
                  <button
                    className="category-card"
                    key={c.name}
                    onClick={() => {
                      setFilename(`${c.name} · Ejemplo`);
                      go("capture");
                    }}
                  >
                    <span className="icon-tile">
                      <Icon name={c.icon} size={30} />
                    </span>
                    <strong>{c.name}</strong>
                    <span>{c.description}</span>
                    <span className="category-arrow">
                      <Icon name="arrow" size={20} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="info-strip">
                <Icon name="shield" />
                <p>
                  <strong>Tu privacidad va primero.</strong> En esta demostración tus archivos no se
                  envían ni se guardan.
                </p>
              </div>
            </>
          )}
          {screen === "capture" && (
            <div className="narrow">
              <button className="back-button" onClick={() => go("home")}>
                <span>←</span> Volver
              </button>
              <h1>Capturar documento</h1>
              <p className="page-description">Un documento más claro empieza con una buena foto.</p>
              <div className="camera-view">
                <div className="camera-instruction">
                  Coloca el documento dentro del recuadro con buena luz
                </div>
                <div className="camera-paper">
                  <Icon name="document" size={66} />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="camera-corners" />
              </div>
              <div className="capture-controls">
                <button className="camera-trigger" onClick={() => cameraRef.current?.click()}>
                  <span>
                    <Icon name="camera" size={31} />
                  </span>
                  Tomar foto
                </button>
                <div className="secondary-actions">
                  <button className="secondary" onClick={() => fileRef.current?.click()}>
                    <Icon name="upload" /> Subir PDF
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      fileRef.current!.accept = "image/*";
                      fileRef.current?.click();
                    }}
                  >
                    <Icon name="image" /> Elegir de galería
                  </button>
                </div>
              </div>
              <button className="text-button demo-button" onClick={() => go("loading")}>
                Probar con un documento de ejemplo <Icon name="arrow" size={18} />
              </button>
              <p className="small-note">
                Demostración visual. No se analiza el contenido del archivo.
              </p>
            </div>
          )}
          <input
            hidden
            type="file"
            ref={fileRef}
            accept="application/pdf,image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFilename(e.target.files[0].name);
                go("loading");
              }
              e.target.value = "";
            }}
          />
          <input
            hidden
            type="file"
            ref={cameraRef}
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFilename(e.target.files[0].name);
                go("loading");
              }
              e.target.value = "";
            }}
          />
          {screen === "loading" && (
            <div className="loading-content narrow">
              <DocumentArt scanning />
              <span className="badge">VISTA DE DEMOSTRACIÓN</span>
              <h1>
                Leyendo y traduciendo
                <br />
                tu documento...
              </h1>
              <p>Estamos convirtiendo los términos difíciles en palabras sencillas.</p>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Progreso de la demostración"
                aria-valuenow={70}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span />
              </div>
              <div className="progress-steps">
                <p>
                  <Icon name="check" /> Texto leído correctamente
                </p>
                <p>
                  <span className="loading-dot" /> Explicando puntos clave...
                </p>
                <p className="pending">
                  <span className="pending-dot" /> Revisando alertas importantes
                </p>
              </div>
              <button className="text-button" onClick={() => go("capture")}>
                Cancelar
              </button>
            </div>
          )}
          {screen === "result" && (
            <>
              <button className="back-button" onClick={() => go("home")}>
                ← Inicio
              </button>
              <div className="result-header">
                <div>
                  <h1>Resumen sencillo</h1>
                  <p className="file-label">
                    <Icon name="document" size={18} />
                    {filename}
                  </p>
                </div>
                <button className="secondary" onClick={() => speak(summary)}>
                  <Icon name="volume" />
                  {speaking ? "Detener lectura" : "Escuchar en voz alta"}
                </button>
              </div>
              <div className="demo-notice">
                Resumen de ejemplo. No corresponde al contenido de tu archivo.
              </div>
              <div className="result-grid">
                <section className="content-card summary-card">
                  <span className="eyebrow">
                    <Icon name="spark" size={19} /> EN POCAS PALABRAS
                  </span>
                  <h2>¿De qué trata?</h2>
                  <p>
                    Este es un contrato de servicio de telefonía por <strong>12 meses</strong> con
                    un pago fijo mensual.
                  </p>
                </section>
                <section className="content-card">
                  <h2>Puntos clave</h2>
                  <div className="key-point">
                    <span className="icon-tile">
                      <Icon name="receipt" />
                    </span>
                    <p>
                      Cuánto pagas<strong>$350 pesos al mes</strong>
                    </p>
                  </div>
                  <div className="key-point">
                    <span className="icon-tile">
                      <Icon name="clock" />
                    </span>
                    <p>
                      Cuándo pagas<strong>Los días 5 de cada mes</strong>
                    </p>
                  </div>
                  <div className="key-point">
                    <span className="icon-tile">
                      <Icon name="history" />
                    </span>
                    <p>
                      Duración<strong>1 año (12 meses)</strong>
                    </p>
                  </div>
                </section>
                <section className="warning-card">
                  <Icon name="warning" size={28} />
                  <div>
                    <h2>¡Ojo! Antes de firmar</h2>
                    <p>Si cancelas antes de 12 meses, se cobra una penalización.</p>
                  </div>
                </section>
              </div>
              <button className="primary result-cta" onClick={() => go("chat")}>
                <Icon name="help" /> Hacer una pregunta sobre este documento{" "}
                <Icon name="arrow" size={20} />
              </button>
              <p className="small-note">
                Te ayudamos a entender. No sustituye la asesoría profesional.
              </p>
            </>
          )}
          {screen === "chat" && (
            <div className="chat-page">
              <button className="back-button" onClick={() => go("result")}>
                ← Volver al resumen
              </button>
              <h1>Pregunta con confianza</h1>
              <p className="page-description">No hay preguntas pequeñas cuando se trata de ti.</p>
              <div className="chat-content">
                <div className="assistant-label">
                  <Icon name="spark" size={19} /> ClariDoc <span>Asistente de demostración</span>
                </div>
                <div className="bubble">
                  ¿Tienes alguna duda sobre este contrato? Escríbela o toca una pregunta rápida.
                </div>
                <div className="suggestions">
                  {[
                    "¿Qué pasa si me atraso en un pago?",
                    "¿Cómo puedo cancelar?",
                    "¿Me conviene firmarlo?",
                  ].map((q) => (
                    <button key={q} onClick={() => ask(q)}>
                      {q}
                      <Icon name="arrow" size={18} />
                    </button>
                  ))}
                </div>
                {messages.map((m, i) => (
                  <div key={i} className={`bubble ${m.user ? "user-bubble" : ""}`}>
                    {m.text}
                    {!m.user && (
                      <button className="text-button listen-button" onClick={() => speak(m.text)}>
                        <Icon name="volume" size={18} />
                        {speaking ? "Detener" : "Escuchar"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <form
                className="chat-input"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu duda aquí..."
                  aria-label="Tu pregunta"
                />
                <button
                  type="button"
                  className="mic-button"
                  aria-label="Ayuda para dictar"
                  onClick={() =>
                    setNotice("Para hablar, usa el micrófono del teclado de tu dispositivo.")
                  }
                >
                  <Icon name="mic" />
                </button>
                <button
                  className="send-button"
                  type="submit"
                  aria-label="Enviar pregunta"
                  disabled={!input.trim()}
                >
                  <Icon name="send" />
                </button>
              </form>
            </div>
          )}
          {screen === "history" && (
            <>
              <div className="page-heading">
                <div className="eyebrow">TU ESPACIO PERSONAL</div>
                <h1>Mis documentos</h1>
                <p>Vuelve a lo importante, cuando lo necesites.</p>
              </div>
              <label className="search-input">
                <Icon name="search" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar contrato, recibo o receta..."
                  aria-label="Buscar documentos"
                />
              </label>
              <div className="list-heading">
                <span>Documentos de ejemplo</span>
                <span>{docs.length} documentos</span>
              </div>
              <div className="document-list">
                {docs
                  .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
                  .map((d) => (
                    <button
                      className="document-card"
                      key={d.title}
                      onClick={() => {
                        setFilename(`${d.title} · Ejemplo`);
                        go("result");
                      }}
                    >
                      <span className="icon-tile">
                        <Icon name={d.icon} size={29} />
                      </span>
                      <span className="document-info">
                        <strong>{d.title}</strong>
                        <span>{d.date}</span>
                        <span className="badge">Explicado</span>
                      </span>
                      <Icon name="arrow" size={22} />
                    </button>
                  ))}
                {!docs.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
                  .length && (
                  <div className="empty-state">
                    <Icon name="document" size={40} />
                    <h2>No hay documentos</h2>
                    <p>
                      {search
                        ? "Prueba con otra palabra."
                        : "Cuando revises un documento, podrás encontrarlo aquí."}
                    </p>
                    <button className="secondary" onClick={() => go("capture")}>
                      Revisar un documento
                    </button>
                  </div>
                )}
              </div>
              <p className="small-note">Los documentos mostrados son ejemplos de esta sesión.</p>
            </>
          )}
          {screen === "settings" && (
            <>
              <div className="page-heading">
                <div className="eyebrow">A TU RITMO, A TU MANERA</div>
                <h1>Ajustes y comodidad</h1>
                <p>Pequeños ajustes para sentirte más a gusto.</p>
              </div>
              <div className="settings-card">
                <h2>Tamaño de letra</h2>
                <p>Elige cómo prefieres leer.</p>
                <div className="segmented">
                  {["Normal", "Grande", "Muy grande"].map((v) => (
                    <button
                      key={v}
                      aria-pressed={size === v}
                      className={size === v ? "selected" : ""}
                      onClick={() => setSize(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="setting-row">
                  <div>
                    <h2>Lectura en voz alta automática</h2>
                    <p>Leer el resumen en voz alta al terminar.</p>
                  </div>
                  <button
                    className={`toggle ${auto ? "on" : ""}`}
                    role="switch"
                    aria-checked={auto}
                    aria-label="Lectura en voz alta automática"
                    onClick={() => setAuto(!auto)}
                  >
                    <span />
                  </button>
                </div>
                <h2>Velocidad de la voz</h2>
                <p>Escucha con calma, sin prisas.</p>
                <div className="segmented short">
                  {["Lenta", "Normal"].map((v) => (
                    <button
                      key={v}
                      aria-pressed={speed === v}
                      className={speed === v ? "selected" : ""}
                      onClick={() => setSpeed(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="privacy-card">
                <span className="icon-tile">
                  <Icon name="shield" size={28} />
                </span>
                <div>
                  <h2>Privacidad y seguridad</h2>
                  <p>Tú decides qué conservar. Los datos de esta demo solo duran esta sesión.</p>
                  <button
                    className="secondary"
                    onClick={() => {
                      if (
                        window.confirm("¿Quieres borrar los documentos de ejemplo de esta sesión?")
                      ) {
                        setDocs([]);
                        setNotice("Se borraron los documentos de esta sesión.");
                      }
                    }}
                  >
                    Borrar mis documentos guardados
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
        <footer className="desktop-footer">
          <span>ClariDoc. Entender cambia todo.</span>
          <span>
            <Icon name="lock" size={14} /> Diseñado para tu tranquilidad
          </span>
        </footer>
        {screen !== "welcome" && nav(true)}
      </div>
      {help && (
        <div className="modal-backdrop" onClick={() => setHelp(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            className="help-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              autoFocus
              onClick={() => setHelp(false)}
              aria-label="Cerrar ayuda"
            >
              <Icon name="close" />
            </button>
            <span className="icon-tile">
              <Icon name="help" size={30} />
            </span>
            <h2 id="help-title">Estamos para ayudarte</h2>
            <p>1. Elige un tipo de documento o sube una foto.</p>
            <p>2. Lee el resumen en palabras sencillas.</p>
            <p>3. Pregunta todo lo que necesites.</p>
            <div className="info-strip">
              Esta es una demostración. No analiza archivos ni ofrece asesoría médica o legal. Tus
              archivos no se envían a un servidor.
            </div>
            <button className="primary" onClick={() => setHelp(false)}>
              Entendido
            </button>
          </section>
        </div>
      )}
      {notice && (
        <div className="toast" role="status">
          <Icon name="help" />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Cerrar aviso">
            <Icon name="close" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
