// Contact - oversized poster-style send-off

const Contact = () => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <section id="contact" className="section" style={{
      background: "var(--ink)",
      color: "var(--paper)",
      paddingBottom: 60,
    }}>
      <div className="frame">
        <div className="section-tag" style={{ borderBottom: "2px solid var(--paper)" }}>
          <span className="num" style={{ color: "var(--paper)" }}>§ 06</span>
          <span className="name" style={{ color: "var(--paper)" }}>Contact</span>
          <span className="meta" style={{ color: "var(--paper)" }}>Open to inquiries</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}>
          <div>
            <div className="display" style={{
              fontSize: "clamp(40px, 6vw, 96px)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
              color: "var(--paper)",
            }}>
              <div>Say hello.</div>
            </div>

            <a
              href="mailto:jean@jeanmcdowell.com"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 24,
                marginTop: 56,
                padding: "28px 32px",
                background: hovered ? "var(--red)" : "var(--paper)",
                color: hovered ? "var(--paper)" : "var(--ink)",
                border: "3px solid var(--paper)",
                fontFamily: "var(--display)",
                fontSize: 28,
                letterSpacing: "-0.01em",
                transition: "background 80ms steps(2,end), color 80ms steps(2,end), transform 80ms steps(2,end)",
                transform: hovered ? "translate(-3px, -3px)" : "none",
                boxShadow: hovered ? "8px 8px 0 var(--red), 8px 8px 0 1.5px var(--paper)" : "none",
              }}>
              jean@jeanmcdowell.com
              <span style={{ display: "inline-block", transform: hovered ? "translateX(6px)" : "none", transition: "transform 80ms steps(2,end)" }}>→</span>
            </a>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            marginTop: 64,
            paddingTop: 32,
            borderTop: "2px solid var(--paper)",
          }}>
            {[
              { k: "Best for", v: "Theatrical campaigns, fractional CMO, brand consulting." },
              { k: "Based", v: "Los Angeles · open to remote." },
              { k: "Response", v: "Same week, usually same day." },
            ].map((m, i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55 }}>
                  {m.k}
                </div>
                <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.4 }}>{m.v}</div>
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
  <div className="site-footer" style={{
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
    <span>© 2026 Jean McDowell · All Rights Reserved</span>
    <span>Designed in the Bauhaus tradition</span>
    <span>Los Angeles, CA</span>
  </div>
);

Object.assign(window, { Contact });
