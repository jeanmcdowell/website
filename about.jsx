// About / Manifesto - types itself out as a stamped declaration

const About = () => {
  const fullText = "I build marketing engines for films , lean, accountable, and globally coordinated. Twenty years inside the studio system taught me that a campaign is a logistical instrument first, and a creative artifact second. The job is to move audiences. The discipline is to do it on budget.";
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
    }, 18);
    return () => clearInterval(id);
  }, [started]);

  const isDone = typed.length === fullText.length;

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
              minHeight: "8em",
            }}>
              {typed.split(/(P&A budget|prestige|lean|accountable|globally|move audiences|discipline)/).map((part, i) => {
                if (part === "P&A budget") return <span key={i} style={{ background: "var(--yellow)", padding: "0 4px" }}>{part}</span>;
                if (part === "lean")        return <span key={i} style={{ color: "var(--red)" }}>{part}</span>;
                if (part === "accountable") return <span key={i} style={{ color: "var(--red)" }}>{part}</span>;
                if (part === "globally")    return <span key={i} style={{ color: "var(--blue)" }}>{part}</span>;
                if (part === "move audiences") return <u key={i} style={{ textDecorationThickness: 4, textUnderlineOffset: 6, textDecorationColor: "var(--red)" }}>{part}</u>;
                if (part === "discipline")  return <span key={i} style={{ color: "var(--blue)" }}>{part}</span>;
                return <React.Fragment key={i}>{part}</React.Fragment>;
              })}
            </p>

            <div style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "2px solid var(--ink)",
              borderLeft: "2px solid var(--ink)",
            }}>
              {[
                { k: "Years on file", v: "20+" },
                { k: "Studios", v: "06" },
                { k: "Markets", v: "Global" },
                { k: "Tentpoles", v: "John Wick" },
                { k: "Prestige", v: "The Artist" },
                { k: "Genre range", v: "Doc → Action" },
              ].map((m, i) => (
                <div key={i} style={{
                  borderRight: "2px solid var(--ink)",
                  borderBottom: "2px solid var(--ink)",
                  padding: "20px 18px",
                  background: i % 2 ? "var(--bg)" : "transparent",
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>{m.k}</div>
                  <div className="display" style={{ fontSize: 28, marginTop: 6, letterSpacing: "-0.02em" }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: a stamp */}
          <div style={{ position: "sticky", top: 40 }}>
            <Stamp/>
            <div className="mono" style={{ fontSize: 11, lineHeight: 1.6, marginTop: 24, opacity: 0.7 }}>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>Based</div>
                <div style={{ marginTop: 4 }}>Los Angeles, CA</div>
              </div>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12, marginTop: 16 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>Available for</div>
                <div style={{ marginTop: 4 }}>Consulting · Fractional leadership · Campaign architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stamp = () => (
  <div style={{
    border: "3px solid var(--red)",
    color: "var(--red)",
    padding: "18px 22px",
    transform: "rotate(-3deg)",
    fontFamily: "var(--display)",
    letterSpacing: "0.04em",
    display: "inline-block",
    background: "transparent",
    position: "relative",
  }}>
    <div style={{ fontSize: 22, lineHeight: 1, textTransform: "uppercase" }}>Approved</div>
    <div style={{ fontSize: 11, letterSpacing: "0.16em", marginTop: 6, fontFamily: "var(--mono)", textTransform: "uppercase" }}>For Theatrical · 2026</div>
    <div style={{
      position: "absolute", inset: -4,
      border: "1px solid var(--red)",
      pointerEvents: "none",
    }}/>
  </div>
);

Object.assign(window, { About });
