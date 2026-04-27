// Backlot, password-gated drafts and side plots.

const BACKLOT_PASSWORD = "backlot";

const BACKLOT_CONTENT = [
  {
    title: "Strong As A Mother",
    kind: "Brand in development",
    body: "Direct-to-consumer apparel and gifting brand currently in pre-launch. Financial model, identity system, and investor positioning built end-to-end.",
    color: "var(--red)",
    motif: "circle",
  },
  {
    title: "Good People",
    kind: "Production company site",
    body: "Custom website and digital infrastructure for a boutique production company. Designed and shipped in Framer.",
    color: "var(--yellow)",
    motif: "square",
  },
  {
    title: "Drafts and Field Notes",
    kind: "Working documents",
    body: "Pitch frameworks, campaign post-mortems, and unreleased writing on the economics of theatrical distribution.",
    color: "var(--blue)",
    motif: "triangle",
  },
];

const Backlot = () => {
  const [stage, setStage] = React.useState("locked"); // locked, prompt, unlocked, wrong
  const [pw, setPw] = React.useState("");
  const inputRef = React.useRef(null);

  const onUnlock = (e) => {
    e?.preventDefault?.();
    if (pw.trim().toLowerCase() === BACKLOT_PASSWORD) {
      setStage("unlocked");
    } else {
      setStage("wrong");
      setTimeout(() => setStage("prompt"), 600);
    }
  };

  React.useEffect(() => {
    if (stage === "prompt" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [stage]);

  return (
    <section id="backlot" style={{
      position: "relative",
      zIndex: 1,
      borderTop: "4px solid var(--ink)",
      background: "var(--bg)",
      padding: "72px 0 72px",
    }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">§ 05</span>
          <span className="name">The Backlot</span>
          <span className="meta">Restricted access</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "center",
        }}>
          <div>
            <div className="display" style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
            }}>
              Drafts, debris,
              <br/>
              and side plots.
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 18, maxWidth: 520, opacity: 0.8 }}>
              A small back room for projects in development, working documents, and writing that isn't ready for the marquee. Password protected.
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            {stage === "locked" && (
              <button
                onClick={() => setStage("prompt")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 24px",
                  background: "var(--ink)",
                  color: "var(--paper)",
                  border: "3px solid var(--ink)",
                  fontFamily: "var(--display)",
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "transform 80ms steps(2,end), background 80ms steps(2,end), box-shadow 80ms steps(2,end)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-3px, -3px)";
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.boxShadow = "6px 6px 0 var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Lock size={20}/>
                Enter The Backlot
                <span>→</span>
              </button>
            )}

            {(stage === "prompt" || stage === "wrong") && (
              <form onSubmit={onUnlock} style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
                maxWidth: 380,
              }}>
                <div className="mono" style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}>
                  Enter password
                </div>
                <div style={{
                  display: "flex",
                  gap: 0,
                  border: "3px solid var(--ink)",
                  background: stage === "wrong" ? "var(--red)" : "var(--paper)",
                  transition: "background 120ms steps(2,end)",
                  animation: stage === "wrong" ? "shake 0.4s" : "none",
                }}>
                  <input
                    ref={inputRef}
                    type="password"
                    value={pw}
                    onChange={(e) => { setPw(e.target.value); if (stage === "wrong") setStage("prompt"); }}
                    placeholder="∗∗∗∗∗∗"
                    style={{
                      flex: 1,
                      padding: "14px 16px",
                      border: 0,
                      background: "transparent",
                      fontFamily: "var(--mono)",
                      fontSize: 16,
                      letterSpacing: "0.08em",
                      color: stage === "wrong" ? "var(--paper)" : "var(--ink)",
                      outline: "none",
                    }}
                  />
                  <button type="submit" style={{
                    padding: "0 18px",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    border: 0,
                    fontFamily: "var(--display)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}>
                    Unlock →
                  </button>
                </div>
                <div className="mono" style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  opacity: 0.55,
                  textTransform: "uppercase",
                  minHeight: 14,
                }}>
                  {stage === "wrong" ? "▍Incorrect. Try again." : "▍Access by request, jean@jeanmcdowell.com"}
                </div>
              </form>
            )}

            {stage === "unlocked" && (
              <div className="mono" style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--red)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <span style={{ width: 8, height: 8, background: "var(--red)", borderRadius: "50%" }}/>
                Access granted
              </div>
            )}
          </div>
        </div>

        {/* Unlocked content */}
        {stage === "unlocked" && (
          <div style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: "2px solid var(--ink)",
            animation: "fadeUp 500ms cubic-bezier(.2,.8,.2,1)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 0,
              borderTop: "3px solid var(--ink)",
              borderLeft: "3px solid var(--ink)",
            }}>
              {BACKLOT_CONTENT.map((c, i) => (
                <BacklotCard key={i} c={c} idx={i + 1}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const BacklotCard = ({ c, idx }) => {
  const isYellow = c.color === "var(--yellow)";
  const Motif = ({ size = 50 }) => {
    const fg = isYellow ? "var(--ink)" : "var(--paper)";
    if (c.motif === "circle")   return <Circle size={size} fill={fg}/>;
    if (c.motif === "triangle") return <Triangle size={size} fill={fg}/>;
    if (c.motif === "square")   return <Square size={size} fill={fg}/>;
    return null;
  };
  return (
    <div style={{
      background: c.color,
      color: isYellow ? "var(--ink)" : "var(--paper)",
      borderRight: "3px solid var(--ink)",
      borderBottom: "3px solid var(--ink)",
      padding: "24px 22px",
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <div className="flex between" style={{ alignItems: "flex-start", gap: 12 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>
          № {String(idx).padStart(2, "0")}
        </div>
        <Motif size={42}/>
      </div>
      <div>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
          opacity: 0.85, marginBottom: 6,
          paddingBottom: 6,
          borderBottom: `1.5px solid ${isYellow ? "var(--ink)" : "var(--paper)"}`,
        }}>
          {c.kind}
        </div>
        <div className="display" style={{
          fontSize: 22,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          textTransform: "uppercase",
        }}>
          {c.title}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 10, opacity: 0.95 }}>
          {c.body}
        </div>
      </div>
    </div>
  );
};

const Lock = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <rect x="4" y="11" width="16" height="11" />
    <path d="M 8 11 V 7 a 4 4 0 0 1 8 0 v 4" />
  </svg>
);

Object.assign(window, { Backlot });
