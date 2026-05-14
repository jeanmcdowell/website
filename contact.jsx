// Contact - direct, two-route send-off.
const Contact = () => {
  return (
    <section id="contact" className="section contact-section" style={{
      background: "var(--ink)",
      color: "var(--paper)",
      paddingBottom: 60,
    }}>
      <div className="frame">
        <div className="section-tag" style={{ borderBottom: "2px solid var(--paper)" }}>
          <span className="num" style={{ color: "var(--paper)" }}>&sect; 04</span>
          <span className="name" style={{ color: "var(--paper)" }}>Contact</span>
          <span className="meta" style={{ color: "var(--paper)" }}>Open to inquiries</span>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          <div>
            <h2 className="display" style={{
              fontSize: "clamp(40px, 6vw, 96px)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
              color: "var(--paper)",
              margin: 0,
            }}>
              Say hello.
            </h2>

            <div className="contact-cta-row" style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <a
                href="mailto:jean@jeanmcdowell.com"
                className="contact-cta contact-cta--primary"
                aria-label="Email Jean McDowell">
                <span className="contact-cta__label">jean@jeanmcdowell.com</span>
                <span className="contact-cta__arrow" aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="https://www.linkedin.com/in/jeanmcdowell"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta contact-cta--secondary"
                aria-label="LinkedIn — Jean McDowell">
                <span className="contact-cta__label">linkedin.com/in/jeanmcdowell</span>
                <span className="contact-cta__arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="contact-meta-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            marginTop: 64,
            paddingTop: 32,
            borderTop: "2px solid var(--paper)",
          }}>
            {[
              { k: "Open to", v: "Senior marketing roles at studios, streamers, and specialty distributors." },
              { k: "Based", v: "Los Angeles, CA" },
              { k: "Best route", v: "Email is fastest. CV available on request." },
            ].map((m, i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.6 }}>
                  {m.k}
                </div>
                <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

const Footer = () => (
  <footer className="site-footer" style={{
    marginTop: 80,
    borderTop: "2px solid var(--paper)",
    padding: "20px 48px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    opacity: 0.85,
    flexWrap: "wrap",
    gap: 16,
  }}>
    <span>&copy; 2026 Jean McDowell</span>
    <span>Los Angeles, CA</span>
  </footer>
);

Object.assign(window, { Contact });
