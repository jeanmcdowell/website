// Capabilities - flip cards grouped by domain

const CAP_GROUPS = [
  {
    title: "Marketing",
    color: "var(--red)",
    items: [
      { k: "Theatrical Release Strategy", d: "Wide, platform, day-and-date, PVOD hybrid , sequencing built around audience and exhibitor reality." },
      { k: "P&A Budget Architecture", d: "Multi-million dollar prints-and-advertising plans, modeled and tracked against weekly performance." },
      { k: "Creative Advertising", d: "Trailer cuts, TV spots, key art, full digital asset suites , directing creative shops and reviewing every frame." },
      { k: "Paid Media Strategy", d: "Channel mix, flighting, and audience targeting from first announcement through opening weekend." },
      { k: "Publicity & Talent Relations", d: "Press tours, premieres, embargoes, talent and filmmaker handling." },
      { k: "Awards Positioning", d: "Campaign architecture from festival debut to ballot deadline." },
      { k: "Audience Research", d: "Tracking, screening data, and competitive analysis built into every decision." },
      { k: "Exhibitor Marketing", d: "Coordination with chains and indie circuits , the rooms films actually open in." },
    ],
  },
  {
    title: "Operations",
    color: "var(--blue)",
    items: [
      { k: "Multi-Title Campaign Management", d: "Several simultaneous releases, each on its own clock, sharing one team." },
      { k: "Vendor & Agency Management", d: "Creative shops, PR firms, media buyers, exhibitor partners , managed against scope and spend." },
      { k: "Cross-Functional Coordination", d: "Legal, finance, sales, distribution , making sure marketing reflects the deal." },
      { k: "Asset Pipeline", d: "Ingestion, versioning, localization, and delivery." },
      { k: "Budget Allocation", d: "Across paid, earned, and owned , optimized to where the audience actually is." },
    ],
  },
  {
    title: "Tech & AI",
    color: "var(--yellow)",
    items: [
      { k: "AI-Assisted Workflows", d: "Perplexity, Claude, ChatGPT, Canva , used to compress research, content, and ops cycles." },
      { k: "Custom Tooling", d: "Financial models, budget trackers, and dashboards in Google Sheets , power-user level." },
      { k: "Data Visualization", d: "Decision-grade charts and presentation design for investors and stakeholders." },
      { k: "Web Design", d: "Building and shipping production websites in Framer." },
      { k: "Social & Brand Building", d: "Channel strategy and brand voice for film campaigns and consumer ventures." },
    ],
  },
  {
    title: "Genre & Format",
    color: "var(--ink)",
    items: [
      { k: "Independent / Arthouse", d: "Platform releases, festival builds, awards plays." },
      { k: "Action / Thriller Tentpoles", d: "Franchise marketing across global markets." },
      { k: "Documentary", d: "Theatrical doc strategy and audience activation." },
      { k: "Global / International", d: "Cross-territory release coordination." },
    ],
  },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="section" style={{ background: "var(--paper)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">§ 03</span>
          <span className="name">Capabilities</span>
          <span className="meta">{CAP_GROUPS.reduce((a, g) => a + g.items.length, 0)} disciplines</span>
        </div>

        <div className="flex col gap-48">
          {CAP_GROUPS.map((g, gi) => (
            <div key={gi}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderBottom: "2px solid var(--ink)",
                paddingBottom: 10,
                marginBottom: 24,
              }}>
                <div style={{ width: 18, height: 18, background: g.color, border: "2px solid var(--ink)" }}/>
                <div className="display" style={{ fontSize: 22, letterSpacing: "0.02em" }}>{g.title}</div>
                <div className="mono" style={{ marginLeft: "auto", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
                  {String(gi + 1).padStart(2, "0")} / {String(CAP_GROUPS.length).padStart(2, "0")}
                </div>
              </div>

              <div className="grid" style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                borderTop: "2px solid var(--ink)",
                borderLeft: "2px solid var(--ink)",
              }}>
                {g.items.map((it, i) => (
                  <CapCard key={i} k={it.k} d={it.d} accent={g.color} idx={i + 1}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CapCard = ({ k, d, accent, idx }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: 180,
        borderRight: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
        perspective: 1000,
        background: "transparent",
      }}>
      <div style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transition: "transform 320ms cubic-bezier(.6,.0,.2,1)",
        transform: hover ? "rotateX(180deg)" : "rotateX(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          padding: 18,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "var(--paper)",
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.45 }}>
            № {String(idx).padStart(2, "0")}
          </div>
          <div className="display" style={{ fontSize: 18, lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {k}
          </div>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateX(180deg)",
          padding: 18,
          background: accent,
          color: accent === "var(--yellow)" ? "var(--ink)" : "var(--paper)",
          display: "flex", alignItems: "flex-start",
          fontSize: 13, lineHeight: 1.4,
        }}>
          {d}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Capabilities });
