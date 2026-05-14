// Work - Selected campaigns and a chronological career hierarchy.

const CAMPAIGNS = [
  {
    h: "Franchise & Tentpole",
    items: [
      "The Hunger Games: Catching Fire",
      "The Hunger Games: Mockingjay Part 1 & 2",
      "John Wick: Chapter 2",
      "John Wick: Chapter 3",
      "Divergent",
      "Allegiant",
      "Now You See Me 1 & 2",
      "Halloween Kills",
      "Halloween Ends",
      "Power Rangers",
      "The Expendables 3",
      "The Beekeeper",
    ],
  },
  {
    h: "Prestige & Awards",
    items: [
      "La La Land",
      "The Artist",
      "The Holdovers",
      "Sicario",
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
      "Knives Out",
      "The Gentlemen",
      "Wrath of Man",
      "A Simple Favor",
      "The Hitman's Bodyguard",
      "Operation Fortune",
      "The Commuter",
      "Robin Hood",
      "Here",
    ],
  },
  {
    h: "Independent & Specialty",
    items: [
      "Strange Darling",
      "Confess, Fletch",
      "Uncle Frank",
      "Old Dads",
      "Boo! A Madea Halloween",
      "A Madea Family Funeral",
    ],
  },
];

const ROLES = [
  {
    co: "Magenta Light Studios",
    title: "Head of Theatrical Marketing",
    period: "2025 — Present",
    note: "Building theatrical marketing infrastructure for the studio's release slate. Campaign frameworks, P&A planning, and distribution alignment.",
    accent: "var(--red)",
    tone: "current",
  },
  {
    co: "Briarcliff Entertainment",
    title: "Head of Marketing, Contract",
    period: "2024 — 2025",
    note: "End-to-end campaign leadership for independent theatrical releases — strategy, creative, paid media, and exhibitor coordination.",
    accent: "var(--blue)",
    tone: "default",
  },
  {
    co: "Brigade Marketing",
    title: "Co-Founder",
    period: "Co-Founded",
    note: "Co-founded a digital marketing agency for film campaigns. Grew it from one room to a full-service creative studio serving major studios and independent distributors. Added 50+ film campaigns to the volume.",
    accent: "var(--yellow)",
    tone: "default",
  },
  {
    co: "Lionsgate",
    title: "SVP Marketing  ·  SVP Research & Strategy",
    period: "Senior Tenure",
    note: "Tentpole and franchise campaigns including John Wick, The Hunger Games, and Divergent. Global day-and-date and platform releases across theatrical and home entertainment windows. Multi-territory launch coordination.",
    accent: "var(--ink)",
    tone: "default",
  },
  {
    co: "Miramax",
    title: "SVP Worldwide Marketing & Publicity",
    period: "Senior Tenure",
    note: "Theatrical and streaming-window campaigns across the recent slate — The Beekeeper, The Holdovers, The Gentlemen, Wrath of Man, Halloween Kills, Here. Day-and-date and short-window streaming releases on Peacock and Amazon MGM. Library reactivation and global brand work.",
    accent: "var(--blue)",
    tone: "default",
  },
  {
    co: "The Weinstein Company",
    title: "Vice President of Marketing",
    period: "2010 — 2012",
    note: "Awards positioning on The Artist (Best Picture), Django Unchained, The Iron Lady, and My Week with Marilyn. Platform release strategy and prestige-tier creative oversight.",
    accent: "var(--red)",
    tone: "default",
  },
];

const Resume = () => {
  const [campaignsVisible, setCampaignsVisible] = React.useState(false);
  const campaignsRef = React.useRef(null);

  React.useEffect(() => {
    if (!campaignsRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setCampaignsVisible(true); });
    }, { threshold: 0.15 });
    obs.observe(campaignsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" className="section" style={{ background: "var(--bg)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">&sect; 02</span>
          <span className="name">Work</span>
          <span className="meta">Selected campaigns &middot; Most recent first</span>
        </div>

        {/* Selected Campaigns block */}
        <div className="selected-campaigns" style={{
          marginBottom: 56,
          borderTop: "3px solid var(--ink)",
          borderBottom: "3px solid var(--ink)",
          background: "var(--paper)",
        }}>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "12px 18px", borderBottom: "2px solid var(--ink)",
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span>Selected campaigns</span>
            <span style={{ opacity: 0.6 }}>200+ films &middot; Awards to tentpole</span>
          </div>
          <div ref={campaignsRef} className="selected-campaigns-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}>
            {CAMPAIGNS.map((g, i) => (
              <div key={i} style={{
                padding: "20px 18px 22px",
                borderRight: "2px solid var(--ink)",
                opacity: campaignsVisible ? 1 : 0,
                transform: campaignsVisible ? "none" : "translateY(12px)",
                transition: `opacity 500ms ease ${i * 90}ms, transform 600ms cubic-bezier(.2,.8,.2,1) ${i * 90}ms`,
              }}>
                <div className="mono" style={{
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--red)", marginBottom: 12, paddingBottom: 10,
                  borderBottom: "1.5px solid var(--ink)",
                }}>
                  {g.h}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13.5, lineHeight: 1.6 }}>
                  {g.items.map((t, j) => (
                    <li key={j} style={{ marginBottom: 4 }}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Studio + agency timeline */}
        <div className="role-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 0,
          borderTop: "3px solid var(--ink)",
          borderLeft: "3px solid var(--ink)",
        }}>
          {ROLES.map((r, i) => (
            <RoleCard key={i} r={r} idx={i + 1}/>
          ))}
        </div>

        <div className="mono" style={{
          fontSize: 11, marginTop: 24, letterSpacing: "0.12em",
          textTransform: "uppercase", opacity: 0.65,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span>200+ films &middot; Awards to tentpole &middot; Full CV on request</span>
          <a href="#contact" className="mech" style={{ borderBottom: "1.5px solid var(--ink)" }}>Request CV &rarr;</a>
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({ r, idx }) => {
  const [hover, setHover] = React.useState(false);
  const current = r.tone === "current";
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="role-card"
      style={{
        background: current ? "var(--ink)" : "var(--paper)",
        color: current ? "var(--paper)" : "var(--ink)",
        borderRight: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        padding: "26px 26px 24px",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        transition: "transform 120ms cubic-bezier(.2,.8,.2,1), box-shadow 120ms ease",
        transform: hover ? "translate(-3px, -3px)" : "none",
        boxShadow: hover ? `5px 5px 0 ${r.accent}` : "none",
      }}>
      {/* Accent stripe */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 6,
        background: r.accent,
      }}/>

      <header className="flex between" style={{ alignItems: "flex-start", gap: 12, marginTop: 4 }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
          opacity: 0.75,
        }}>
          № {String(idx).padStart(2, "0")}
        </div>
        <div className="mono" style={{
          fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase",
          opacity: 0.75, textAlign: "right",
        }}>
          {r.period}
        </div>
      </header>

      <div>
        <h3 className="display" style={{
          fontSize: 26,
          letterSpacing: "-0.02em",
          lineHeight: 1.0,
          textTransform: "uppercase",
          margin: 0,
        }}>
          {r.co}
        </h3>
        <div className="mono" style={{
          fontSize: 11.5,
          letterSpacing: "0.04em",
          marginTop: 10,
          opacity: 0.9,
          textTransform: "uppercase",
        }}>
          {r.title}
        </div>
        <p style={{
          fontSize: 13.5,
          lineHeight: 1.55,
          marginTop: 14,
          marginBottom: 0,
          opacity: 0.95,
        }}>
          {r.note}
        </p>
      </div>
    </article>
  );
};

Object.assign(window, { Resume });
