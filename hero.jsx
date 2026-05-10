// Hero - name as monument, geometric composition that assembles on load.
const Hero = () => {
  const [stage, setStage] = React.useState(0); // 0 = pre, 1 = shapes settled, 2 = type in
  const wrapRef = React.useRef(null);
  const [parallax, setParallax] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    const onMove = (e) => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Each shape: a final position; pre-stage shoves it offscreen in a direction
  // values are PERCENT relative to hero box.
  const shapes = [
    { kind: "circle", color: "var(--red)", size: 360, top: "8%", left: "62%", from: { x: 600, y: -600 }, depth: 0.6 },
    { kind: "square", color: "var(--yellow)", size: 220, top: "48%", left: "6%", from: { x: -800, y: 0 }, rot: 0, depth: 1.2 },
    { kind: "triangle", color: "var(--blue)", size: 280, top: "55%", left: "38%", from: { x: 0, y: 800 }, rot: 12, depth: 0.9 },
    { kind: "quarter", color: "var(--ink)", size: 140, top: "0%", left: "0%", from: { x: -400, y: -400 }, rot: 0, depth: 1.5 },
    { kind: "half", color: "var(--red)", size: 120, top: "2%", left: "44%", from: { x: 0, y: -500 }, rot: 180, depth: 1.8 },
    { kind: "circle", color: "var(--blue)", size: 80, top: "78%", left: "88%", from: { x: 600, y: 0 }, depth: 2.2 },
    { kind: "target", color: "var(--ink)", size: 180, top: "62%", left: "70%", from: { x: 800, y: 800 }, depth: 0.7 },
    { kind: "bar", color: "var(--yellow)", size: 280, height: 10, top: "30%", left: "72%", from: { x: 1000, y: 0 }, rot: 18, depth: 1.4 },
  ];

  return (
    <header className="hero" ref={wrapRef} style={{
      position: "relative", zIndex: 1,
      minHeight: "100vh",
      padding: "32px 48px 0",
      borderBottom: "4px solid var(--ink)",
      overflow: "hidden",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top bar */}
      <div className="hero-top flex between center" style={{ position: "relative", zIndex: 5 }}>
        <div className="hero-brand flex center gap-12">
          <Mark size={36}/>
          <div className="hero-brand-text mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <span className="hero-brand-name">Jeanmcdowell.com</span>
            <span className="hero-brand-tagline" style={{ opacity: 0.5 }}>Established 2026</span>
          </div>
        </div>
        <nav className="hero-nav flex gap-24 mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          <a href="#about" className="mech">01 / About</a>
          <a href="#work" className="mech">02 / Work</a>
          <a href="#capabilities" className="mech">03 / Capabilities</a>
          <a href="#contact" className="mech">04 / Contact</a>
        </nav>
      </div>

      {/* Geometric composition layer */}
      <div className="hero-art" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
      }}>
        {shapes.map((s, i) => {
          const settled = stage >= 1;
          const tx = settled ? parallax.x * 24 / s.depth : s.from.x;
          const ty = settled ? parallax.y * 24 / s.depth : s.from.y;
          const rot = (s.rot || 0) + (settled ? parallax.x * 4 / s.depth : 0);
          const common = {
            position: "absolute",
            top: s.top, left: s.left,
            transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
            transition: settled
              ? "transform 1100ms cubic-bezier(.2,.8,.2,1)"
              : "none",
            transitionDelay: settled ? `${i * 60}ms` : "0ms",
            opacity: settled ? 1 : 0,
          };
          const shapeProps = { key: i, className: `hero-shape hero-shape-${i + 1}`, "data-kind": s.kind };
          if (s.kind === "circle") return <Circle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "square") return <Square {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "triangle") return <Triangle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "quarter") return <QuarterCircle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "half") return <HalfCircle {...shapeProps} size={s.size} fill={s.color} style={common}/>;
          if (s.kind === "target") return <Target {...shapeProps} size={s.size} color={s.color} style={common}/>;
          if (s.kind === "bar") return <div {...shapeProps} style={{ ...common, width: s.size, height: s.height, background: s.color }}/>;
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
        <div className="hero-title display h-mega" style={{
          color: "var(--ink)",
          mixBlendMode: "multiply",
        }}>
          <SplitLine text="JEAN" delay={500}/>
          <SplitLine text="MC" delay={650} inline trailing={
            <span style={{ display: "inline-block", verticalAlign: "middle", margin: "0 0.05em" }}>
              <Circle size={140} fill="var(--red)" style={{
                opacity: stage >= 2 ? 1 : 0,
                transform: `translateY(${stage >= 2 ? 0 : 20}px)`,
                transition: "all 600ms cubic-bezier(.2,.8,.2,1) 800ms",
              }}/>
            </span>
          }/>
          <SplitLine text="DOWELL." delay={800}/>
        </div>

        <div className="hero-intro-grid" style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "minmax(260px, 1.4fr) auto",
          gap: 48,
          alignItems: "end",
        }}>
          <div className="hero-intro reveal in" style={{
            maxWidth: 620,
            fontSize: 17,
            lineHeight: 1.45,
            transitionDelay: "1100ms",
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "none" : "translateY(20px)",
            transition: "all 700ms cubic-bezier(.2,.8,.2,1)",
          }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 14, color: "var(--red)" }}>
              ▍Theatrical Marketing & Distribution
            </span>
            Theatrical marketing across six studios and an agency practice, including <strong>The Weinstein Company</strong>, <strong>Miramax</strong>, <strong>Lionsgate</strong>, and <strong>Brigade Marketing</strong>.{" "}
            <em style={{ fontStyle: "normal", background: "var(--yellow)", padding: "0 6px" }}>200+ films marketed.</em>{" "}
            Franchise work on <strong>John Wick</strong>, <strong>The Hunger Games</strong>, and <strong>Divergent</strong>. Awards work on <strong>La La Land</strong>, <strong>The Artist</strong>, and <strong>The Holdovers</strong>.
            <span style={{ display: "block", marginTop: 14 }}>
              Open to senior marketing roles at studios, streamers, and specialty distributors.
            </span>
          </div>

          <div className="hero-actions flex col gap-12" style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "none" : "translateY(20px)",
            transition: "all 700ms cubic-bezier(.2,.8,.2,1) 1300ms",
          }}>
            <a href="#contact" className="btn mech">
              Get in touch <span className="arrow">→</span>
            </a>
            <a href="#work" className="mech mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right" }}>
              See the Work ↓
            </a>
            <a href="#work" className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right", opacity: 0.6 }}>
              ↓ Scroll · 200+ Films on File
            </a>
          </div>
        </div>
      </div>

      {/* Ticker at bottom */}
      <Ticker stage={stage}/>
    </header>
  );
};

const SplitLine = ({ text, delay = 0, inline = false, trailing = null }) => {
  // animate per-letter rise
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className="split-line" style={{ display: inline ? "inline-flex" : "block", overflow: "visible", lineHeight: 0.85, alignItems: "baseline" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          transform: shown ? "translateY(0)" : "translateY(0.9em)",
          opacity: shown ? 1 : 0,
          transition: `transform 600ms cubic-bezier(.2,.8,.2,1) ${i * 35}ms, opacity 400ms ease ${i * 35}ms`,
        }}>{ch === " " ? " " : ch}</span>
      ))}
      {trailing}
    </div>
  );
};

const Ticker = ({ stage }) => {
  const items = [
    "200+ FILMS",
    "★",
    "JOHN WICK",
    "●",
    "THE HUNGER GAMES",
    "■",
    "DIVERGENT",
    "▲",
    "LIONSGATE",
    "●",
    "MIRAMAX",
    "■",
    "WEINSTEIN CO.",
    "▲",
    "BRIGADE MARKETING",
    "★",
    "LA LA LAND",
    "●",
    "THE ARTIST",
    "■",
    "THE HOLDOVERS",
    "▲",
    "AWARDS POSITIONING",
    "★",
  ];
  const row = [...items, ...items];

  return (
    <div style={{
      position: "relative",
      marginLeft: -48,
      marginRight: -48,
      borderTop: "2px solid var(--ink)",
      borderBottom: "2px solid var(--ink)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      zIndex: 4,
      background: "var(--ink)",
      color: "var(--paper)",
      opacity: stage >= 2 ? 1 : 0,
      transition: "opacity 600ms ease 1500ms",
      flexShrink: 0,
    }}>
      <div style={{
        display: "inline-block",
        animation: "scroll-x 40s linear infinite",
        padding: "12px 0",
        fontFamily: "var(--display)",
        fontSize: 14,
        letterSpacing: "0.12em",
      }}>
        {row.map((it, i) => (
          <span key={i} style={{
            margin: "0 24px",
            color: it === "★" ? "var(--yellow)" : it === "●" ? "var(--red)" : it === "■" ? "var(--blue)" : it === "▲" ? "var(--paper)" : "var(--paper)"
          }}>{it}</span>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { Hero });
