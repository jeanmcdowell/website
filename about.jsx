// About / Positioning - a calm declarative statement with counted proof points.
const About = () => {
  const [filmCount, setFilmCount] = React.useState(0);
  const [statsTriggered, setStatsTriggered] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const ref = React.useRef(null);
  const metricsRef = React.useRef(null);
  const reduce = React.useMemo(() => prefersReducedMotion(), []);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setRevealed(true); });
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!metricsRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setStatsTriggered(true); });
    }, { threshold: 0.4 });
    obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!statsTriggered) return;
    if (reduce) { setFilmCount(200); return; }
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setFilmCount(Math.round(eased * 200));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [statsTriggered, reduce]);

  const metrics = [
    { k: "Films marketed", v: "200+", big: true },
    { k: "Range", v: "Awards → Tentpole" },
    { k: "Tentpoles", v: "John Wick · Hunger Games · Divergent" },
    { k: "Prestige", v: "La La Land · The Artist · The Holdovers" },
    { k: "Franchise", v: "Halloween · Now You See Me" },
    { k: "Formats", v: "Theatrical · Streaming · PVOD · Platform" },
  ];

  return (
    <section id="about" className="section" ref={ref} style={{ background: "var(--paper)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">&sect; 01</span>
          <span className="name">About</span>
          <span className="meta">Los Angeles</span>
        </div>

        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
          gap: 64,
          alignItems: "start",
        }}>
          <div className={"reveal " + (revealed ? "in" : "")}>
            <p className="display h-2" style={{
              color: "var(--ink)",
              fontFamily: "var(--display)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0,
            }}>
              <span style={{ background: "var(--yellow)", padding: "0 6px" }}>200+ films marketed</span>{" "}
              across studios, streamers, formats, and tentpoles.{" "}
              <u style={{ textDecorationThickness: 4, textUnderlineOffset: 6, textDecorationColor: "var(--red)" }}>
                Built to ship.
              </u>
            </p>

            <p style={{
              marginTop: 32,
              maxWidth: 720,
              fontSize: 17,
              lineHeight: 1.6,
            }}>
              Executive marketing for films that have to perform. P&amp;A modeled as architecture, not a budget line. Creative reviewed frame-by-frame, not by deck. Audience segmentation, exhibitor relationships, and streaming-window strategy built to outlast opening weekend.
            </p>
            <p style={{
              marginTop: 18,
              maxWidth: 720,
              fontSize: 17,
              lineHeight: 1.6,
            }}>
              Research-supported, not research-driven. Senior judgment, lean teams, real accountability across studio, agency, and emerging-studio environments.
            </p>

            <div ref={metricsRef} className="about-metrics" style={{
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
                    lineHeight: m.big ? 1 : 1.4,
                    fontFamily: m.big ? "var(--display)" : "var(--body)",
                    fontWeight: m.big ? 900 : 500,
                  }}>{m.k === "Films marketed" ? `${filmCount}+` : m.v}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="about-aside" style={{ position: "sticky", top: 40 }}>
            <div className="mono" style={{ fontSize: 11, lineHeight: 1.6 }}>
              <div style={{ borderTop: "2px solid var(--ink)", paddingTop: 12 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.55 }}>Based</div>
                <div style={{ marginTop: 4 }}>Los Angeles, CA</div>
              </div>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12, marginTop: 16 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.55 }}>Open to</div>
                <div style={{ marginTop: 4 }}>Senior marketing roles &middot; Studios, streamers, and specialty distributors</div>
              </div>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12, marginTop: 16 }}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.55 }}>Approach</div>
                <div style={{ marginTop: 4 }}>Data-informed, not data-driven. Senior judgment. Lean accountable teams.</div>
              </div>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 12, marginTop: 16 }}>
                <a
                  href="#contact"
                  className="mech"
                  onClick={() => trackEvent("cta_click", { cta: "contact", location: "about_aside" })}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    textTransform: "uppercase", letterSpacing: "0.14em",
                    borderBottom: "1.5px solid var(--ink)", paddingBottom: 2,
                  }}>
                  Reach out <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { About });
