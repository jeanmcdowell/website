// About / Manifesto - types itself out as a stamped declaration
const About = () => {
  const fullText = "200+ films marketed across studios, streamers, formats, and tentpoles. Built to ship.";
  const [typed, setTyped] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setStarted(true); });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [started]);

  const isDone = typed.length === fullText.length;

  const metrics = [
    { k: "Films marketed", v: "200+", big: true },
    { k: "Range", v: "Awards → Tentpole", big: false },
    { k: "Tentpoles", v: "John Wick · Hunger Games · Divergent", big: false },
    { k: "Prestige", v: "La La Land · The Artist · The Holdovers", big: false },
    { k: "Franchise", v: "Halloween · Now You See Me", big: false },
    { k: "Formats", v: "Theatrical · Streaming · PVOD · Platform", big: false },
  ];

  return (
    <section id="about" className="section" ref={ref} style={{ background: "var(--paper)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">§ 01</span>
          <span className="name">About / Manifesto</span>
          <span className="meta">Filed · Los Angeles</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
          gap: 64,
          alignItems: "start",
        }}>
          <div>
            <p className={"display h-2 " + (isDone ? "" : "caret")} style={{
              color: "var(--ink)",
              fontFamily: "var(--display)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "none",
              minHeight: "5em",
              marginTop: 0,
            }}>
              {typed.split(/(200\+ films marketed|streamers|tentpoles|Built to ship\.)/).map((part, i) => {
                if (part === "200+ films marketed") return <span key={i} style={{ background: "var(--yellow)", padding: "0 4px" }}>{part}</span>;
                if (part === "streamers") return <span key={i} style={{ color: "var(--blue)" }}>{part}</span>;
                if (part === "tentpoles") return <span key={i} style={{ color: "var(--red)" }}>{part}</span>;
                if (part === "Built to ship.") return <u key={i} style={{ textDecorationThickness: 4, textUnderlineOffset: 6, textDecorationColor: "var(--red)" }}>{part}</u>;
                return <React.Fragment key={i}>{part}</React.Fragment>;
              })}
            </p>

            {/* Manifesto paragraph - sits below the animated headline */}
            <p style={{
              marginTop: 32,
              maxWidth: 720,
              fontSize: 17,
              lineHeight: 1.55,
              opacity: isDone ? 1 : 0,
              transform: isDone ? "none" : "translateY(8px)",
              transition: "opacity 600ms ease 200ms, transform 600ms cubic-bezier(.2,.8,.2,1) 200ms",
            }}>
              I build marketing for films that need to perform, not films that need to look like they're performing. P&amp;A as a model, not a budget line. Creative reviewed frame by frame, not by deck. Audience segmentation, exhibitor relationships, and streaming-window strategy that survive opening weekend. The work is research-supported, not research-driven, and it's built for teams with real accountability across studios, agency, and emerging-studio environments.
            </p>

            <div style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "2px solid var(--ink)",
              borderLeft: "2px solid var(--ink)",
            }}>
              {metrics.map((m, i) => (
                <div key={i} style={{
                  borderRight: "2px solid var(--ink)",
                  borderBottom: "2px solid var(--ink)",
                  padding: "20px 18px",
                  background: i % 2 ? "var(--bg)" : "transparent",
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>{m.k}</div>
                  <div className={m.big ? "display" : ""} style={{
                    fontSize: m.big ? 28 : 15,
                    marginTop: 6,
                    letterSpacing: m.big ? "-0.02em" : "0",
                    lineHeight: m.big ? 1 : 1.35,
                    fontFamily: m.big ? "var(--display)" : "var(--body)",
                    fontWeight: m.big ? 900 : 500,
                  }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: location + availability */}
          <div style={{ position: "sticky", top: 40 }}>
            <div className="mono" style={{ fontSize: 11, lineHeight: 1.6, opacity: 0.7 }}>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>Based</div>
                <div style={{ marginTop: 4 }}>Los Angeles, CA</div>
              </div>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12, marginTop: 16 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>Open to</div>
                <div style={{ marginTop: 4 }}>Senior marketing roles · Studios, streamers, specialty distributors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { About });
