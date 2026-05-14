// Capabilities - grouped disciplines, compact cards.
const CAP_GROUPS = [
  {
    title: "Marketing",
    color: "var(--red)",
    items: [
      { k: "Release Strategy", d: "Theatrical, hybrid, day-and-date, streaming windowing — sequencing built around audience, platform, and slate economics." },
      { k: "P&A Architecture", d: "Multi-million dollar prints-and-advertising plans, modeled and tracked against weekly performance." },
      { k: "Creative Advertising", d: "Trailer cuts, TV spots, key art, full digital asset suites — directing creative shops and reviewing every frame." },
      { k: "Paid Media Strategy", d: "Channel mix, flighting, and audience targeting from first announcement through opening weekend and streaming windows." },
      { k: "Publicity & Talent Relations", d: "Press tours, premieres, embargoes, talent and filmmaker handling." },
      { k: "Awards Positioning", d: "Campaign architecture from festival debut to ballot deadline." },
      { k: "Audience Research & Segmentation", d: "Tracking, screening, segmentation, and competitive analysis built into every decision. Theatrical and streaming audiences modeled at title and slate level." },
      { k: "Exhibitor Marketing", d: "Coordination with chains and indie circuits — the rooms films actually open in." },
      { k: "Global Launch Coordination", d: "Multi-territory launches across theatrical and streaming windows — coordinated creative, localization, talent deployment, and PR sequencing across markets." },
    ],
  },
  {
    title: "Operations",
    color: "var(--blue)",
    items: [
      { k: "Multi-Title Campaign Management", d: "Several simultaneous releases, each on its own clock, sharing one team." },
      { k: "Vendor & Agency Management", d: "Creative shops, PR firms, media buyers, exhibitor partners — managed against scope and spend." },
      { k: "Cross-Functional Coordination", d: "Legal, finance, sales, distribution — making sure marketing reflects the deal." },
      { k: "Asset Pipeline", d: "Ingestion, versioning, localization, and delivery." },
      { k: "Budget Allocation", d: "Across paid, earned, and owned — optimized to where the audience actually is." },
    ],
  },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="section" style={{ background: "var(--paper)" }}>
      <div className="frame">
        <div className="section-tag">
          <span className="num">&sect; 03</span>
          <span className="name">Capabilities</span>
          <span className="meta">{CAP_GROUPS.reduce((a, g) => a + g.items.length, 0)} disciplines</span>
        </div>

        <div className="flex col gap-48">
          {CAP_GROUPS.map((g, gi) => (
            <div key={gi}>
              <div className="cap-group-head" style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderBottom: "2px solid var(--ink)",
                paddingBottom: 10,
                marginBottom: 24,
              }}>
                <div style={{ width: 18, height: 18, background: g.color, border: "2px solid var(--ink)" }} aria-hidden="true"/>
                <h3 className="display" style={{ fontSize: 22, letterSpacing: "0.02em", margin: 0 }}>{g.title}</h3>
                <div className="mono" style={{ marginLeft: "auto", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
                  {String(gi + 1).padStart(2, "0")} / {String(CAP_GROUPS.length).padStart(2, "0")}
                </div>
              </div>

              <div className="cap-grid" style={{
                display: "grid",
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
      className="cap-card"
      style={{
        position: "relative",
        minHeight: 180,
        borderRight: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
        background: "var(--paper)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "transform 120ms cubic-bezier(.2,.8,.2,1), box-shadow 120ms ease",
        transform: hover ? "translate(-2px, -2px)" : "none",
        boxShadow: hover ? `4px 4px 0 ${accent}` : "none",
      }}>
      <div className="flex between" style={{ alignItems: "flex-start", gap: 12 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.45 }}>
          № {String(idx).padStart(2, "0")}
        </div>
        <div style={{ width: 10, height: 10, background: accent, border: "2px solid var(--ink)", flexShrink: 0 }} aria-hidden="true"/>
      </div>
      <h4 className="display" style={{
        fontSize: 17,
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
        textTransform: "uppercase",
        margin: 0,
      }}>
        {k}
      </h4>
      <p style={{
        fontSize: 13,
        lineHeight: 1.5,
        opacity: 0.88,
        margin: 0,
      }}>
        {d}
      </p>
    </div>
  );
};

Object.assign(window, { Capabilities });
