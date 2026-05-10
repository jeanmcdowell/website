// Work - Selected Campaigns table above a chronological card grid of studios + agency.

const CAMPAIGNS = [
  {
    h: "Franchise & Tentpole",
    items: [
      "The Hunger Games: Catching Fire",
      "The Hunger Games: Mockingjay Part 1",
      "The Hunger Games: Mockingjay Part 2",
      "John Wick: Chapter 2",
      "John Wick: Chapter 3",
      "Divergent",
      "Allegiant",
      "The Expendables 3",
      "Power Rangers",
      "Now You See Me 2",
      "The Beekeeper",
      "Halloween Kills",
      "Halloween Ends",
    ],
  },
  {
    h: "Prestige & Awards",
    items: [
      "La La Land",
      "The Artist",
      "The Holdovers",
      "Wonder",
      "Django Unchained",
      "The Iron Lady",
      "My Week with Marilyn",
      "Bombshell",
      "Blindspotting",
    ],
  },
  {
    h: "Genre & Commercial",
    items: [
      "The Gentlemen",
      "Wrath of Man",
      "A Simple Favor",
      "The Hitman's Bodyguard",
      "Operation Fortune",
      "The Commuter",
      "Acrimony",
      "Robin Hood",
      "Strange Darling",
      "The Home",
      "Here",
    ],
  },
  {
    h: "Independent & Specialty",
    items: [
      "The Holdovers",
      "Strange Darling",
      "Confess, Fletch",
      "Uncle Frank",
      "Old Dads",
      "Blindspotting",
    ],
  },
];

const ROLES = [
  {
    co: "Magenta Light Studios",
    title: "Head of Theatrical Marketing",
    period: "2025 / 2026",
    note: "Built theatrical marketing infrastructure for the studio's release slate, including campaign frameworks, P&A planning, and distribution alignment.",
    bg: "var(--red)",
    fg: "var(--paper)",
    motif: "circle",
  },
  {
    co: "Briarcliff Entertainment",
    title: "Head of Marketing, Contract",
    period: "2024 / 2025",
    note: "End-to-end campaign leadership for independent theatrical releases — strategy, creative, paid media, and exhibitor coordination.",
    bg: "var(--blue)",
    fg: "var(--paper)",
    motif: "triangle",
  },
  {
    co: "Brigade Marketing",
    title: "Co-Founder",
    period: "Co-Founded",
    note: "Co-founded a digital marketing agency built around film campaigns. Grew it from a one-room operation into a full-service creative studio serving major studios and independent distributors. Agency work added 50+ film campaigns to the volume.",
    bg: "var(--yellow)",
    fg: "var(--ink)",
    motif: "square",
  },
  {
    co: "Lionsgate",
    title: "SVP Marketing and SVP Research & Strategy",
    period: "Senior Tenure",
    note: "Tentpole and franchise campaigns including the John Wick, Hunger Games, and Divergent franchises. Global day-and-date and platform releases across theatrical and home entertainment windows. Multi-territory launch coordination.",
    bg: "var(--paper)",
    fg: "var(--ink)",
    motif: "half",
  },
  {
    co: "Miramax",
    title: "SVP Worldwide Marketing & Publicity",
    period: "Senior Tenure",
    note: "Theatrical and streaming-window campaigns across the studio's recent slate, including The Beekeeper, The Holdovers, The Gentlemen, Wrath of Man, Halloween Kills, and Here. Day-and-date and short-window streaming releases on Peacock and Amazon MGM. Library reactivation and global brand work.",
    bg: "var(--ink)",
    fg: "var(--paper)",
    motif: "quarter",
  },
  {
    co: "The Weinstein Company",
    title: "Vice President of Marketing",
    period: "2010 / 2012",
    note: "Awards positioning and campaign work on The Artist (Best Picture), Django Unchained, The Iron Lady, and My Week with Marilyn. Platform release strategy and prestige-tier creative oversight.",
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

        {/* Selected Campaigns block */}
        <div className="selected-campaigns" style={{
          marginBottom: 48,
          borderTop: "3px solid var(--ink)",
          borderBottom: "3px solid var(--ink)",
          background: "var(--paper)",
        }}>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "12px 18px", borderBottom: "2px solid var(--ink)",
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span>▍Selected Campaigns</span>
            <span style={{ opacity: 0.6 }}>200+ Films · 06 Studios · One Agency</span>
          </div>
          <div className="selected-campaigns-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}>
            {CAMPAIGNS.map((g, i) => (
              <div key={i} style={{
                padding: "18px 18px 22px",
                borderRight: "2px solid var(--ink)",
              }}>
                <div className="mono" style={{
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--red)", marginBottom: 12, paddingBottom: 10,
                  borderBottom: "1.5px solid var(--ink)",
                }}>
                  {g.h}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, lineHeight: 1.55 }}>
                  {g.items.map((t, j) => (
                    <li key={j} style={{ marginBottom: 4 }}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Studio + agency timeline */}
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
          ▍200+ Films · Six Studios · One Agency · Full CV on Request
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({ r, idx, hovered, onEnter, onLeave }) => {
  const Motif = ({ size = 70 }) => {
    const c = r.fg;
    if (r.motif === "circle") return <Circle size={size} fill={c}/>;
    if (r.motif === "triangle") return <Triangle size={size} fill={c}/>;
    if (r.motif === "square") return <Square size={size} fill={c}/>;
    if (r.motif === "half") return <HalfCircle size={size} fill={c} rotation={180}/>;
    if (r.motif === "quarter") return <QuarterCircle size={size} fill={c} rotation={90}/>;
    if (r.motif === "target") return <Target size={size} color={c}/>;
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
        minHeight: 340,
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
