// Hero - name as monument, restrained composition. One settle, no parallax.
const Hero = () => {
  const reduce = React.useMemo(() => prefersReducedMotion(), []);
  const [stage, setStage] = React.useState(reduce ? 2 : 0);
  const [navOpen, setNavOpen] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const t1 = setTimeout(() => setStage(1), 120);
    const t2 = setTimeout(() => setStage(2), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduce]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setNavOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Composition trimmed: 4 shapes, all anchored, no mouse parallax.
  // Each shape has a settle direction (offscreen origin) for the one-time entrance.
  const shapes = [
    { kind: "circle", color: "var(--red)", size: 340, top: "6%", left: "64%", from: { x: 500, y: -500 } },
    { kind: "square", color: "var(--yellow)", size: 200, top: "52%", left: "4%", from: { x: -700, y: 0 }, rot: 0 },
    { kind: "triangle", color: "var(--blue)", size: 240, top: "58%", left: "40%", from: { x: 0, y: 700 }, rot: 8 },
    { kind: "target", color: "var(--ink)", size: 140, top: "8%", left: "8%", from: { x: -300, y: -300 } },
  ];

  return (
    <header className="hero" style={{
      position: "relative", zIndex: 1,
      minHeight: "100vh",
      padding: "32px 48px 0",
      borderBottom: "4px solid var(--ink)",
      overflow: "hidden",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
    }}>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Top bar */}
      <div className="hero-top flex between center" style={{ position: "relative", zIndex: 5 }}>
        <a href="#" className="hero-brand flex center gap-12" aria-label="Jean McDowell, home" style={{ minHeight: 44 }}>
          <Mark size={36}/>
          <div className="hero-brand-text mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <span className="hero-brand-name">Jean McDowell</span>
          </div>
        </a>
        <div className="hero-nav-wrap" style={{ position: "relative" }}>
          <button
            type="button"
            className="hero-nav-toggle mono"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={() => setNavOpen(!navOpen)}
            style={{
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              color: "var(--ink)",
              padding: "8px 14px",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              minHeight: 44,
              alignItems: "center",
              display: "none",
            }}>
            {navOpen ? "Close ✕" : "Menu ☰"}
          </button>
          <nav
            id="primary-nav"
            aria-label="Primary"
            className={"hero-nav flex gap-24 mono " + (navOpen ? "open" : "")}
            style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <a href="#about" className="mech nav-link" onClick={() => { setNavOpen(false); trackEvent("nav_click", { target: "about" }); }}>01 / About</a>
            <a href="#work" className="mech nav-link" onClick={() => { setNavOpen(false); trackEvent("nav_click", { target: "work" }); }}>02 / Work</a>
            <a href="#capabilities" className="mech nav-link" onClick={() => { setNavOpen(false); trackEvent("nav_click", { target: "capabilities" }); }}>03 / Capabilities</a>
            <a href="#contact" className="mech nav-link" onClick={() => { setNavOpen(false); trackEvent("nav_click", { target: "contact" }); }}>04 / Contact</a>
          </nav>
        </div>
      </div>

      {/* Geometric composition layer */}
      <div className="hero-art" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
      }}>
        {shapes.map((s, i) => {
          const settled = stage >= 1;
          const tx = settled ? 0 : s.from.x;
          const ty = settled ? 0 : s.from.y;
          const rot = s.rot || 0;
          const common = {
            position: "absolute",
            top: s.top, left: s.left,
            transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
            transition: settled && !reduce
              ? `transform 900ms cubic-bezier(.2,.8,.2,1) ${i * 80}ms, opacity 600ms ease ${i * 80}ms`
              : "none",
            opacity: settled ? 1 : 0,
          };
          const shapeProps = { key: i, className: `hero-shape hero-shape-${i + 1}`, "data-kind": s.kind };
          if (s.kind === "circle") return <Circle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "square") return <Square {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "triangle") return <Triangle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "target") return <Target {...shapeProps} size={s.size} color={s.color} style={common}/>;
          return null;
        })}
      </div>

      {/* Headline */}
      <div className="hero-copy" style={{
        position: "relative", zIndex: 4,
        marginTop: "min(8vh, 64px)",
        marginBottom: 56,
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 0,
        flex: "1 0 auto",
      }}>
        <h1 className="hero-title display h-mega" style={{
          color: "var(--ink)",
          mixBlendMode: "multiply",
          margin: 0,
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: reduce ? "none" : "opacity 700ms ease 300ms, transform 800ms cubic-bezier(.2,.8,.2,1) 300ms",
        }}>
          <span style={{ display: "block" }}>JEAN</span>
          <span style={{ display: "block" }}>MC</span>
          <span style={{ display: "block" }}>DOWELL</span>
        </h1>

        <div className="hero-intro-grid" style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "minmax(260px, 1.4fr) auto",
          gap: 48,
          alignItems: "end",
        }}>
          <div className="hero-intro" style={{
            maxWidth: 620,
            fontSize: 17,
            lineHeight: 1.5,
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "none" : "translateY(16px)",
            transition: reduce ? "none" : "opacity 600ms ease, transform 700ms cubic-bezier(.2,.8,.2,1)",
          }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 14, color: "var(--red)" }}>
              Digital, Theatrical &amp; Streaming Marketing
            </span>
            Digital, theatrical, PVOD, and streaming marketing executive.{" "}
            <strong>200+ films marketed</strong> across studio, specialty, and boutique. Title-level positioning and campaign strategy across John Wick, The Hunger Games, La La Land, Sicario, Wonder, Hacksaw Ridge, and the Tyler Perry franchise. Awards work on The Artist, Django Unchained, and Silver Linings Playbook.
            <span style={{ display: "block", marginTop: 14, opacity: 0.85 }}>
              Digital-led campaign strategy from a studio&rsquo;s first dedicated online activations through PVOD and platform-direct programs today. Audience insight, performance data, and market judgment. Lean teams. Measurable accountability.
            </span>
          </div>

          <div className="hero-actions flex col gap-12" style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "none" : "translateY(16px)",
            transition: reduce ? "none" : "opacity 600ms ease 200ms, transform 700ms cubic-bezier(.2,.8,.2,1) 200ms",
          }}>
            <a
              href="#contact"
              className="btn mech"
              data-variant="primary"
              onClick={() => trackEvent("cta_click", { cta: "contact", location: "hero" })}>
              Get in touch <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#work"
              className="btn-ghost mech mono"
              onClick={() => trackEvent("cta_click", { cta: "see_work", location: "hero" })}>
              See the work <span aria-hidden="true">&darr;</span>
            </a>
            <a
              href="/jean-mcdowell-resume.pdf"
              className="btn-ghost mech mono"
              download
              onClick={() => trackEvent("resume_download", { location: "hero", file: "jean-mcdowell-resume.pdf" })}
              aria-label="Download résumé (PDF)">
              Download CV <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

Object.assign(window, { Hero });
