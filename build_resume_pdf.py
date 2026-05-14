"""
Build jean-mcdowell-resume.pdf from on-site copy only.
Source content: hero.jsx, about.jsx, resume.jsx, capabilities.jsx, contact.jsx.
No invented employers, titles, dates, or metrics.
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


INK = HexColor("#0a0a0a")
PAPER = HexColor("#fbf7ee")
RED = HexColor("#d8331f")
YELLOW = HexColor("#f5c518")
BLUE = HexColor("#1f3fa3")
MUTED = HexColor("#4a4a4a")

PAGE_W, PAGE_H = LETTER
M = 0.6 * inch  # outer margin


def draw_rule(c, x1, y, x2, w=1.2, color=INK):
    c.setStrokeColor(color)
    c.setLineWidth(w)
    c.line(x1, y, x2, y)


def wrap(c, text, x, y, max_w, font="Helvetica", size=10, leading=13, color=INK):
    """Simple word-wrap. Returns new y."""
    c.setFillColor(color)
    c.setFont(font, size)
    words = text.split()
    line = ""
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            line = test
        else:
            c.drawString(x, y, line)
            y -= leading
            line = w
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y


def build(path):
    c = canvas.Canvas(path, pagesize=LETTER)
    c.setTitle("Jean McDowell — Resume")
    c.setAuthor("Jean McDowell")
    c.setSubject("Senior theatrical marketing executive")

    # Cream paper background
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    # Top accent bar
    c.setFillColor(RED)
    c.rect(0, PAGE_H - 0.18 * inch, PAGE_W, 0.18 * inch, stroke=0, fill=1)

    y = PAGE_H - 0.6 * inch

    # ---- Name block
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(M, y, "JEAN McDOWELL")
    y -= 22
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(M, y, "THEATRICAL MARKETING & DISTRIBUTION")
    y -= 18

    # Contact / location row
    c.setFillColor(INK)
    c.setFont("Helvetica", 9.5)
    c.drawString(M, y, "Los Angeles, CA  ·  jean@jeanmcdowell.com  ·  linkedin.com/in/jeanmcdowell  ·  jeanmcdowell.com")
    y -= 14
    draw_rule(c, M, y, PAGE_W - M, w=1.5)
    y -= 18

    # ---- Summary (verbatim site copy)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(M, y, "SUMMARY")
    y -= 14
    summary = (
        "Senior theatrical, PVOD, and streaming marketing executive. "
        "200+ films marketed across The Weinstein Company, Miramax, Lionsgate, and Brigade Marketing. "
        "Franchise leadership on John Wick, The Hunger Games, and Divergent. "
        "Awards work on La La Land, The Artist, and The Holdovers. "
        "Data-informed, not data-driven. Senior judgment, lean teams, measurable accountability."
    )
    y = wrap(c, summary, M, y, PAGE_W - 2 * M, size=10, leading=13)
    y -= 6

    # ---- Experience
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(M, y, "EXPERIENCE")
    y -= 6
    draw_rule(c, M, y, PAGE_W - M, w=0.7, color=MUTED)
    y -= 14

    roles = [
        {
            "co": "Magenta Light Studios",
            "title": "Head of Theatrical Marketing",
            "period": "2025 — Present",
            "note": "Standing up theatrical marketing for the studio's release slate — "
                    "campaign architecture, P&A modeling, and distribution alignment.",
            "accent": RED,
        },
        {
            "co": "Briarcliff Entertainment",
            "title": "Head of Marketing (Contract)",
            "period": "2024 — 2025",
            "note": "End-to-end campaign leadership for independent theatrical releases. "
                    "Strategy, creative, paid media, exhibitor.",
            "accent": BLUE,
        },
        {
            "co": "Miramax",
            "title": "SVP Worldwide Marketing & Publicity",
            "period": "Senior Tenure",
            "note": "Theatrical and streaming-window campaigns across the recent slate — "
                    "The Beekeeper, The Holdovers, The Gentlemen, Wrath of Man, Halloween Kills, Here. "
                    "Day-and-date and short-window streaming releases on Peacock and Amazon MGM. "
                    "Library reactivation and global brand work.",
            "accent": BLUE,
        },
        {
            "co": "Brigade Marketing",
            "title": "Co-Founder",
            "period": "Co-Founded",
            "note": "Co-founded a digital marketing agency for film campaigns. "
                    "Grew from one room to a full-service creative studio serving major studios "
                    "and independent distributors. 50+ film campaigns.",
            "accent": YELLOW,
        },
        {
            "co": "Lionsgate",
            "title": "SVP Marketing  ·  SVP Research & Strategy",
            "period": "Senior Tenure",
            "note": "Tentpole and franchise campaigns: John Wick, The Hunger Games, Divergent. "
                    "Global day-and-date and platform releases across theatrical and home entertainment windows. "
                    "Multi-territory launch coordination.",
            "accent": INK,
        },
        {
            "co": "The Weinstein Company",
            "title": "Vice President of Marketing",
            "period": "2010 — 2012",
            "note": "Awards positioning on The Artist (Best Picture), Django Unchained, The Iron Lady, "
                    "and My Week with Marilyn. Platform release strategy and prestige-tier creative oversight.",
            "accent": RED,
        },
    ]

    for r in roles:
        # Accent dot
        c.setFillColor(r["accent"])
        c.rect(M, y - 1, 6, 6, stroke=0, fill=1)

        # Company + period
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(M + 12, y, r["co"].upper())
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        c.drawRightString(PAGE_W - M, y, r["period"])
        y -= 12

        # Title
        c.setFillColor(INK)
        c.setFont("Helvetica-Oblique", 9.5)
        c.drawString(M + 12, y, r["title"])
        y -= 12

        # Note
        y = wrap(c, r["note"], M + 12, y, PAGE_W - 2 * M - 12, size=9.5, leading=12, color=INK)
        y -= 6

    # ---- Selected Campaigns
    if y < 2.1 * inch:
        c.showPage()
        c.setFillColor(PAPER)
        c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        c.setFillColor(RED)
        c.rect(0, PAGE_H - 0.18 * inch, PAGE_W, 0.18 * inch, stroke=0, fill=1)
        y = PAGE_H - 0.6 * inch

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(M, y, "SELECTED CAMPAIGNS")
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED)
    c.drawRightString(PAGE_W - M, y, "200+ FILMS  ·  AWARDS TO TENTPOLE")
    y -= 6
    draw_rule(c, M, y, PAGE_W - M, w=0.7, color=MUTED)
    y -= 14

    groups = [
        ("Franchise & Tentpole", RED, [
            "The Hunger Games: Catching Fire", "The Hunger Games: Mockingjay Part 1 & 2",
            "John Wick: Chapter 2", "John Wick: Chapter 3",
            "Divergent", "Allegiant", "Now You See Me 1 & 2",
            "Halloween Kills", "Halloween Ends", "Power Rangers",
            "The Expendables 3", "The Beekeeper",
        ]),
        ("Prestige & Awards", BLUE, [
            "La La Land", "The Artist", "The Holdovers", "Sicario", "Wonder",
            "Django Unchained", "The Iron Lady", "My Week with Marilyn",
            "Bombshell", "Blindspotting",
        ]),
        ("Genre & Commercial", YELLOW, [
            "Knives Out", "The Gentlemen", "Wrath of Man", "A Simple Favor",
            "The Hitman's Bodyguard", "Operation Fortune", "The Commuter",
            "Robin Hood", "Here",
        ]),
        ("Independent & Specialty", INK, [
            "Strange Darling", "Confess, Fletch", "Uncle Frank", "Old Dads",
            "Boo! A Madea Halloween", "A Madea Family Funeral",
        ]),
    ]

    col_w = (PAGE_W - 2 * M) / 2
    col_x = [M, M + col_w]
    col_y = [y, y]

    for i, (label, accent, items) in enumerate(groups):
        ci = i % 2
        x = col_x[ci]
        cy = col_y[ci]

        # group label
        c.setFillColor(accent)
        c.rect(x, cy - 1, 5, 5, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(x + 10, cy, label.upper())
        cy -= 12

        c.setFont("Helvetica", 9)
        for it in items:
            c.drawString(x + 10, cy, "·  " + it)
            cy -= 11
        cy -= 6
        col_y[ci] = cy

    y = min(col_y) - 4

    # ---- Capabilities (compact)
    if y < 1.6 * inch:
        c.showPage()
        c.setFillColor(PAPER)
        c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        c.setFillColor(RED)
        c.rect(0, PAGE_H - 0.18 * inch, PAGE_W, 0.18 * inch, stroke=0, fill=1)
        y = PAGE_H - 0.6 * inch

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(M, y, "CAPABILITIES")
    y -= 6
    draw_rule(c, M, y, PAGE_W - M, w=0.7, color=MUTED)
    y -= 14

    cap_groups = [
        ("Marketing", RED, [
            "Release Strategy — theatrical, hybrid, day-and-date, streaming windowing.",
            "P&A Architecture — multi-million dollar plans modeled and tracked weekly.",
            "Creative Advertising — trailers, TV, key art, full digital asset suites.",
            "Paid Media — channel mix, flighting, audience targeting through release windows.",
            "Publicity & Talent Relations — tours, premieres, embargoes, filmmaker handling.",
            "Awards Positioning — festival debut to ballot deadline.",
            "Audience Research & Segmentation — tracking, screening, competitive analysis.",
            "Exhibitor Marketing — chain and indie circuit coordination.",
            "Global Launch Coordination — multi-territory creative, localization, PR sequencing.",
        ]),
        ("Operations", BLUE, [
            "Multi-Title Campaign Management — simultaneous releases on one team.",
            "Vendor & Agency Management — creative shops, PR firms, media buyers.",
            "Cross-Functional Coordination — legal, finance, sales, distribution.",
            "Asset Pipeline — ingestion, versioning, localization, delivery.",
            "Budget Allocation — paid, earned, owned, optimized to audience.",
        ]),
    ]

    for label, accent, items in cap_groups:
        c.setFillColor(accent)
        c.rect(M, y - 1, 6, 6, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(M + 12, y, label.upper())
        y -= 13
        for it in items:
            y = wrap(c, "·  " + it, M + 12, y, PAGE_W - 2 * M - 12,
                     size=9.5, leading=12, color=INK)
        y -= 6

    # ---- Footer
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(M, 0.4 * inch, "Jean McDowell  ·  jeanmcdowell.com  ·  Los Angeles, CA")
    c.drawRightString(PAGE_W - M, 0.4 * inch, "Full CV on request.")

    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    build("jean-mcdowell-resume.pdf")
