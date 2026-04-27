// Work - chronological card grid. Equal-weight, color-blocked, no duration bars.

const ROLES = [
  {
    co: "Magenta Light Studios",
    title: "Head of Theatrical Marketing",
    period: "2025 / Present",
    note: "Building the in-house theatrical engine , campaigns, P&A, and distribution alignment for the studio's release slate.",
    bg: "var(--red)",
    fg: "var(--paper)",
    motif: "circle",
  },
  {
    co: "Briarcliff Entertainment",
    title: "Head of Marketing, Contract",
    period: "2024 / 2025",
    note: "End-to-end campaign leadership for independent theatrical releases , strategy, creative, paid media, and exhibitor coordination.",
    bg: "var(--blue)",
    fg: "var(--paper)",
    motif: "triangle",
  },
  {
    co: "Brigade Marketing",
    title: "Co-Founder",
    period: "Co-Founded",
    note: "Co-founded a digital agency built around film marketing , grew it from a one-room operation into a full-service creative studio serving major and independent clients.",
    bg: "var(--yellow)",
    fg: "var(--ink)",
    motif: "square",
  },
  {
    co: "Lionsgate",
    title: "Global Marketing Executive",
    period: "Senior Tenure",
    note: "Tentpole and franchise campaigns , international marketing coordination across territories, including the John Wick franchise.",
    bg: "var(--paper)",
    fg: "var(--ink)",
    motif: "half",
  },
  {
    co: "Miramax",
    title: "Global Marketing Executive",
    period: "Senior Tenure",
    note: "Global strategy, library reactivation, and prestige catalog campaigns , building marketing across multiple international territories.",
    bg: "var(--ink)",
    fg: "var(--paper)",
    motif: "quarter",
  },
  {
    co: "The Weinstein Company",
    title: "Marketing Executive",
    period: "2010 / 2012",
    note: "Prestige campaigns including The Artist , awards positioning, platform release strategy, and creative oversight.",
    bg: "var(--red)",
    fg: "var(--paper)",
    motif: "target",
  },
];

const Resume = () => {
  const [hover, setHover] = React.useState(null);

  return (
    <section id="work" className="section" style={{ background: "var(--bg)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">§ 02</span>
          <span className="name">Work / On the Record</span>
          <span className="meta">Most recent first</span>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 0,
          borderTop: "3px solid var(--ink)",
          borderLeft: "3px solid var(--ink)",
        }}>
          {ROLES.map((r, i) => (
            <RoleCard key={i} r={r} idx={i + 1} hovered={hover === i}
              onEnter={() => setHover(i)} onLeave={() => setHover(null)}/>
          ))}
        </div>

        <div className="mono" style={{
          fontSize: 11, marginTop: 24, letterSpacing: "0.12em",
          textTransform: "uppercase", opacity: 0.6,
        }}>
          ▍Twenty-plus years across six studios · Full CV available on request
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({ r, idx, hovered, onEnter, onLeave }) => {
  const Motif = ({ size = 70 }) => {
    const c = r.fg;
    if (r.motif === "circle")   return <Circle size={size} fill={c}/>;
    if (r.motif === "triangle") return <Triangle size={size} fill={c}/>;
    if (r.motif === "square")   return <Square size={size} fill={c}/>;
    if (r.motif === "half")     return <HalfCircle size={size} fill={c} rotation={180}/>;
    if (r.motif === "quarter")  return <QuarterCircle size={size} fill={c} rotation={90}/>;
    if (r.motif === "target")   return <Target size={size} color={c}/>;
    return null;
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: r.bg,
        color: r.fg,
        borderRight: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        padding: "28px 26px 24px",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        cursor: "default",
        transition: "transform 100ms steps(2,end)",
        transform: hovered ? "translate(-3px, -3px)" : "none",
        boxShadow: hovered ? "6px 6px 0 var(--ink)" : "none",
      }}>
      <div className="flex between" style={{ alignItems: "flex-start", gap: 12 }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
          opacity: 0.85,
        }}>
          № {String(idx).padStart(2, "0")}
        </div>
        <div style={{ flexShrink: 0 }}>
          <Motif size={56}/>
        </div>
      </div>

      <div>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
          opacity: 0.85, marginBottom: 8,
          paddingBottom: 8,
          borderBottom: `1.5px solid ${r.fg}`,
        }}>
          {r.period}
        </div>
        <div className="display" style={{
          fontSize: 28,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          textTransform: "uppercase",
        }}>
          {r.co}
        </div>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.04em",
          marginTop: 8,
          opacity: 0.9,
          textTransform: "uppercase",
        }}>
          {r.title}
        </div>
        <div style={{
          fontSize: 13.5,
          lineHeight: 1.5,
          marginTop: 14,
          opacity: 0.95,
        }}>
          {r.note}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Resume });
