"""
Build jean-mcdowell-resume.pdf from on-site copy only.
Source content: hero.jsx, about.jsx, resume.jsx, capabilities.jsx, contact.jsx.
No invented employers, titles, dates, or metrics.
No em or en dashes anywhere.
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
    c.setTitle("Jean McDowell, Resume")
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

    # ---- Summary (softened language; no over-senior signaling, no "data-driven")
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(M, y, "SUMMARY")
    y -= 14
    summary = (
        "Theatrical, PVOD, and streaming marketing executive with deep studio, specialty, "
        "and boutique experience across 200+ films. Senior judgment and autonomy on multiple "
        "priority titles. Set title-level positioning and overarching campaign strategy, then "
        "drive execution across creative, media, publicity, partnerships, and distribution. "
        "P&A budgets from under $1M through $25M+, using audience insight, performance data, "
        "and market judgment. Lean teams, clear accountability, executive-level communication."
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
            "title": "Marketing Leadership, Theatrical Campaign Strategy",
            "period": "2025 to Present",
            "note": "Lead theatrical positioning and campaign strategy for an emerging "
                    "independent studio. Build go-to-market plans across creative, media, "
                    "publicity, and distribution partners against disciplined P&A budgets.",
            "accent": RED,
        },
        {
            "co": "Briarcliff Entertainment",
            "title": "Consultant, Head of Marketing (Contract)",
            "period": "2024 to 2025",
            "note": "Led theatrical and PVOD marketing strategy for a boutique distributor. "
                    "Oversaw marketing, publicity, paid media, exhibitor marketing, and digital "
                    "and social. Partnered with Universal Pictures Home Entertainment on "
                    "integrated theatrical and PVOD windowing.",
            "accent": BLUE,
        },
        {
            "co": "Miramax",
            "title": "Head of Worldwide Marketing, Publicity & Consumer Products",
            "period": "2019 to 2024",
            "note": "Directed global marketing and publicity for Miramax film and television "
                    "during a transformative ownership period. Set title-level positioning and "
                    "campaign strategy across the slate. Owned International Marketing, Sales, "
                    "and Distribution alignment with global partners. Represented Miramax at "
                    "international festivals and markets.",
            "accent": BLUE,
        },
        {
            "co": "Lionsgate",
            "title": "SVP, Worldwide Research & Marketing",
            "period": "2012 to 2019",
            "note": "Led research and audience strategy for the Motion Picture Group across "
                    "franchises and breakout titles including John Wick, The Hunger Games, "
                    "Now You See Me, La La Land, Sicario, Wonder, Hacksaw Ridge, and the Tyler "
                    "Perry franchise. Founded and launched Lionsgate Premiere. Directed P&A "
                    "budgets from under $1M to $25M+ across tentpoles, specialty, and awards titles.",
            "accent": INK,
        },
        {
            "co": "The Weinstein Company",
            "title": "VP, Marketing",
            "period": "2010 to 2012",
            "note": "Contributed to marketing strategy for Academy Award winning and commercially "
                    "successful titles including The Artist, Django Unchained, Silver Linings "
                    "Playbook, and The Iron Lady. Supported campaign development across creative "
                    "advertising, publicity, and media strategy. Partnered with senior executives "
                    "on title positioning and market entry planning.",
            "accent": RED,
        },
        {
            "co": "Brigade Marketing",
            "title": "Co-Founder",
            "period": "2009 to 2010",
            "note": "Co-founded a boutique agency specializing in prestige and breakout film "
                    "campaigns for independent and studio-backed releases. Led marketing and "
                    "awards strategy in close collaboration with distributors, PR teams, and "
                    "filmmakers.",
            "accent": YELLOW,
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
            "Now You See Me 1 & 2",
            "Halloween Kills", "Halloween Ends", "Power Rangers",
            "The Expendables 3", "The Beekeeper",
        ]),
        ("Prestige & Awards", BLUE, [
            "La La Land", "Sicario", "Wonder", "Hacksaw Ridge",
            "The Artist", "The Holdovers",
            "Django Unchained", "Silver Linings Playbook", "The Iron Lady",
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
            "Release Strategy: theatrical, hybrid, day-and-date, streaming windowing.",
            "P&A Architecture: under $1M through $25M+, modeled and tracked weekly.",
            "Creative Advertising: trailers, TV, key art, full digital asset suites.",
            "Paid Media: channel mix, flighting, audience targeting through release windows.",
            "Publicity & Talent Relations: tours, premieres, embargoes, filmmaker handling.",
            "Awards Positioning: festival debut to ballot deadline.",
            "Audience Research & Segmentation: tracking, screening, competitive analysis.",
            "Exhibitor Marketing: chain and indie circuit coordination.",
            "International Marketing, Sales, and Distribution: multi-territory campaigns, sales coordination, localization, PR sequencing.",
        ]),
        ("Operations", BLUE, [
            "Multi-Title Campaign Management: simultaneous releases on one team.",
            "Vendor & Agency Management: creative shops, PR firms, media buyers.",
            "Cross-Functional Coordination: legal, finance, sales, distribution.",
            "Asset Pipeline: ingestion, versioning, localization, delivery.",
            "Budget Allocation: paid, earned, owned, optimized to audience.",
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
