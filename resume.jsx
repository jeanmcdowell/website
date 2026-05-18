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
      "Sicario",
      "Wonder",
      "Hacksaw Ridge",
      "The Artist",
      "Django Unchained",
      "Silver Linings Playbook",
      "The Iron Lady",
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
    title: "Marketing Leadership, Theatrical Campaign Strategy",
    period: "2025 to Present",
    note: "Lead theatrical positioning and campaign strategy for an emerging independent studio. Build go-to-market plans across creative, media, publicity, and distribution partners against disciplined P&A budgets.",
    accent: "var(--red)",
    tone: "current",
  },
  {
    co: "Briarcliff Entertainment",
    title: "Consultant, Head of Marketing (Contract)",
    period: "2024 to 2025",
    note: "Led theatrical and PVOD marketing strategy for a boutique distributor. Oversaw marketing, publicity, paid media, exhibitor marketing, and digital and social. Partnered with Universal Pictures Home Entertainment on integrated theatrical and PVOD windowing.",
    accent: "var(--blue)",
    tone: "default",
  },
  {
    co: "Miramax",
    title: "Head of Worldwide Marketing, Publicity & Consumer Products",
    period: "2019 to 2024",
    note: "Directed global marketing and publicity for Miramax film and television through a transformative ownership period. Set title-level positioning and campaign strategy across the slate, including The Beekeeper, The Gentlemen, Wrath of Man, Halloween Kills, and Here. Owned International Marketing, Sales, and Distribution alignment with global partners.",
    accent: "var(--blue)",
    tone: "default",
  },
  {
    co: "Lionsgate",
    title: "SVP, Worldwide Research & Marketing",
    period: "2012 to 2019",
    note: "Led research and audience strategy for the Motion Picture Group across franchises and breakout titles including John Wick, The Hunger Games, Now You See Me, La La Land, Sicario, Wonder, Hacksaw Ridge, and the Tyler Perry franchise. Founded and launched Lionsgate Premiere. P&A budgets from under $1M through $25M+.",
    accent: "var(--ink)",
    tone: "default",
  },
  {
    co: "The Weinstein Company",
    title: "VP, Marketing",
    period: "2010 to 2012",
    note: "Contributed to marketing strategy for Academy Award winning and commercially successful titles including The Artist, Django Unchained, Silver Linings Playbook, and The Iron Lady. Supported campaign development across creative advertising, publicity, and media. Partnered with senior executives on title positioning and market entry planning.",
    accent: "var(--red)",
    tone: "default",
  },
  {
    co: "Brigade Marketing",
    title: "Co-Founder",
    period: "2009 to 2010",
    note: "Co-founded a boutique agency specializing in prestige and breakout film campaigns for independent and studio-backed releases. Led marketing and awards strategy in close collaboration with distributors, PR teams, and filmmakers.",
    accent: "var(--yellow)",
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
          textTransform: "uppercase", opacity: 0.85,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span>200+ films &middot; Awards to tentpole &middot; Two-page CV</span>
          <a
            href="/jean-mcdowell-resume.pdf"
            className="mech"
            download
            onClick={() => trackEvent("resume_download", { location: "work_footer", file: "jean-mcdowell-resume.pdf" })}
            style={{ borderBottom: "1.5px solid var(--ink)" }}>
            Download CV (PDF) &darr;
          </a>
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
