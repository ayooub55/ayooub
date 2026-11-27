#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Construit une version PDF hors-ligne de la page de révision de biochimie
structurale (index.html) : tout le texte des 13 chapitres, les tableaux, les
encadrés, les QCM avec leur correction, les flashcards et les liens Drive.

Sortie : cours/biochimie-structurale-cours.pdf (A4, sommaire cliquable).

Usage : python3 tools/build_cours_pdf.py     (nécessite reportlab)
"""

import html
import pathlib
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, HRFlowable, Image, KeepTogether,
                                NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer,
                                Table, TableStyle)
from reportlab.platypus.tableofcontents import TableOfContents

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import build_biochimie as B  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "cours" / "biochimie-structurale-cours.pdf"

ACC = colors.HexColor("#0f766e")
ACC2 = colors.HexColor("#115e59")
LINE = colors.HexColor("#d9d4c8")
SOFT = colors.HexColor("#f4f1ea")
INK = colors.HexColor("#152033")
MUT = colors.HexColor("#5d6878")
BOX = {
    "def": (colors.HexColor("#eef3ff"), colors.HexColor("#3b63d6")),
    "ex": (colors.HexColor("#fff6dd"), colors.HexColor("#c98a00")),
    "tip": (colors.HexColor("#e9f7ec"), colors.HexColor("#23894a")),
    "warn": (colors.HexColor("#ffeceb"), colors.HexColor("#cf4038")),
    "bad": (colors.HexColor("#f7f2ff"), colors.HexColor("#7446d4")),
    "dar": (colors.HexColor("#f7f2ff"), colors.HexColor("#7446d4")),
}

# police Unicode (les symboles grecs et les flèches manquent à Helvetica)
FONTS = {
    "": ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", None),
    "-Bold": ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", None),
}
try:
    pdfmetrics.registerFont(TTFont("DjV", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("DjV-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    pdfmetrics.registerFontFamily("DjV", normal="DjV", bold="DjV-Bold", italic="DjV", boldItalic="DjV-Bold")
    BODY, BOLD = "DjV", "DjV-Bold"
except Exception:
    BODY, BOLD = "Helvetica", "Helvetica-Bold"

ss = getSampleStyleSheet()


def st(name, **kw):
    return ParagraphStyle(name, parent=ss["BodyText"], **kw)


S = {
    "body": st("body", fontName=BODY, fontSize=9.3, leading=13.4, textColor=INK, spaceAfter=5),
    "h2": st("h2", fontName=BOLD, fontSize=15, leading=19, textColor=ACC2, spaceBefore=10, spaceAfter=3),
    "h3": st("h3", fontName=BOLD, fontSize=11.3, leading=14.5, textColor=INK, spaceBefore=9, spaceAfter=4),
    "h4": st("h4", fontName=BOLD, fontSize=10, leading=13, textColor=ACC2, spaceBefore=6, spaceAfter=3),
    "li": st("li", fontName=BODY, fontSize=9.3, leading=13.2, textColor=INK, leftIndent=11, bulletIndent=2, spaceAfter=2),
    "th": st("th", fontName=BOLD, fontSize=8.6, leading=11.4, textColor=INK),
    "td": st("td", fontName=BODY, fontSize=8.6, leading=11.6, textColor=INK),
    "cap": st("cap", fontName=BODY, fontSize=8, leading=11, textColor=MUT),
    "box": st("box", fontName=BODY, fontSize=9, leading=12.9, textColor=INK),
    "chap": st("chap", fontName=BOLD, fontSize=14.5, leading=18, textColor=INK,
               spaceBefore=2, spaceAfter=1),
    "prof": st("prof", fontName=BODY, fontSize=8.6, leading=11, textColor=MUT, spaceAfter=0),
    "title": st("title", fontName=BOLD, fontSize=26, leading=30, textColor=colors.white, alignment=TA_CENTER),
    "sub": st("sub", fontName=BODY, fontSize=11.5, leading=15, textColor=colors.HexColor("#d7e2ee"), alignment=TA_CENTER),
}

TAG = re.compile(r"<[^>]+>")


def txt(s):
    return html.unescape(TAG.sub(" ", s)).replace("\u00a0", " ")


def clean(s):
    """HTML du site -> balises supportées par reportlab."""
    s = s.replace("<sub>", "<sub>").replace("</sub>", "</sub>")
    s = re.sub(r"<br\s*/?>", "<br/>", s)
    s = re.sub(r"</?(div|span|figure|figcaption|svg|section|header|b class=\"t\")[^>]*>", "", s)
    s = s.replace("<b class=\"t\">", "<b>")
    s = re.sub(r"<i>", "<i>", s)
    s = re.sub(r"<(ul|ol)>", "", s)
    s = s.replace("<li>", "• ")
    s = re.sub(r"</li>", "<br/>", s)
    s = re.sub(r"<img[^>]*>", "", s)
    s = re.sub(r'<a\s[^>]*href="([^"]*)"[^>]*>', lambda m: "" if m.group(1).startswith("#") else "", s)
    s = s.replace("</a>", "")
    s = re.sub(r"<h[1-6][^>]*>", "<br/>", s)
    s = re.sub(r"</h[1-6]>", "<br/>", s)
    s = re.sub(r"&(?![a-zA-Z#][a-zA-Z0-9]*;)", "&amp;", s)
    s = re.sub(r"<span[^>]*>", " ", s)
    s = s.replace("</span>", " ")
    for t in ("b", "i", "sub", "sup", "br"):
        s = s.replace("&amp;" + t + "&gt;", "&lt;" + t + "&gt;")
    return balance(s)


def balance(s):
    """Équilibre les balises inline (reportlab refuse les </b> orphelins)."""
    for tag in ("b", "i", "sub", "sup"):
        out, depth = [], 0
        for tok in re.split(r"(</?%s>)" % tag, s):
            if tok == "<%s>" % tag:
                depth += 1
                out.append(tok)
            elif tok == "</%s>" % tag:
                if depth > 0:
                    depth -= 1
                    out.append(tok)
            else:
                out.append(tok)
        s = "".join(out) + ("</%s>" % tag) * depth
    return s


def para(html_str, style="body"):
    s = clean(html_str)
    try:
        return Paragraph(s, S[style])
    except Exception:
        return Paragraph(html.escape(txt(html_str)), S[style])


# ---------------------------------------------------------------- parseur HTML
BLOCK = re.compile(r"<(h3|p|table|div|ul|ol|figure)\b", re.I)


def split_blocks(body):
    """Découpe un corps de chapitre en blocs de premier niveau."""
    out, i, n = [], 0, len(body)
    while i < n:
        m = BLOCK.search(body, i)
        if not m:
            rest = body[i:].strip()
            if rest:
                out.append(("p", rest))
            break
        if m.start() > i:
            pre = body[i:m.start()].strip()
            if pre:
                out.append(("p", pre))
        tag = m.group(1).lower()
        if tag == "table":
            # les <table> du site ne sont pas imbriquées : on va jusqu'au </table>
            end = body.find("</table>", m.start())
            end = n if end < 0 else end + len("</table>")
            out.append(("table", body[m.start():end]))
            i = end
        elif tag == "figure":
            end = body.find("</figure>", m.start())
            end = n if end < 0 else end + len("</figure>")
            out.append(("figure", body[m.start():end]))
            i = end
        elif tag in ("ul", "ol"):
            close = "</%s>" % tag
            end = body.find(close, m.start())
            end = n if end < 0 else end + len(close)
            out.append(("list", body[m.start():end]))
            i = end
        elif tag == "div":
            # encadré : jusqu'au </div> correspondant (comptage)
            depth, j = 0, m.start()
            while j < n:
                mm_ = re.compile(r"<div\b|</div>", re.I).search(body, j)
                if not mm_:
                    j = n
                    break
                if mm_.group(0).lower().startswith("</"):
                    depth -= 1
                    j = mm_.end()
                    if depth == 0:
                        break
                else:
                    depth += 1
                    j = mm_.end()
            out.append(("div", body[m.start():j]))
            i = j
        else:
            close = "</%s>" % tag
            end = body.find(close, m.start())
            end = n if end < 0 else end + len(close)
            out.append((tag, body[m.start():end]))
            i = end
    return out


def render_table(t):
    rows = re.findall(r"<tr>(.*?)</tr>", t, re.S)
    data, header = [], True
    for r in rows:
        cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S)
        cells = [c for c in cells]
        if not cells:
            continue
        line = [para(c, "th" if header else "td") for c in cells]
        data.append(line)
        header = False
    if not data:
        return []
    ncol = max(len(r) for r in data)
    data = [r + [""] * (ncol - len(r)) for r in data]
    width = 172 * mm
    tbl = Table(data, colWidths=[width / ncol] * ncol, repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), SOFT),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return [Spacer(1, 3), tbl, Spacer(1, 6)]


def render_box(div, kind):
    bg, bd = BOX.get(kind, BOX["def"])
    inner = re.sub(r"^<div[^>]*>", "", div)
    inner = re.sub(r"</div>\s*$", "", inner)
    tm = re.search(r"<b class=\"t\">(.*?)</b>", inner, re.S)
    title = txt(tm.group(1)) if tm else ""
    if tm:
        inner = inner.replace(tm.group(0), "")
    flow = []
    if title:
        flow.append(Paragraph(html.escape(title.upper()), ParagraphStyle(
            "bt", fontName=BOLD, fontSize=7.6, leading=10, textColor=bd, spaceAfter=3)))
    for tag, chunk in split_blocks(inner):
        if tag == "table":
            flow += render_table(chunk)
        elif tag == "list":
            for li in re.findall(r"<li>(.*?)</li>", chunk, re.S):
                flow.append(Paragraph("• " + clean(li), S["box"]))
        else:
            c = re.sub(r"<(h3|p|div)[^>]*>", "", chunk)
            c = c.replace("</h3>", "").replace("</p>", "").replace("</div>", "")
            c = c.replace("<br/>", "<br/>").replace("<br>", "<br/>")
            if txt(c).strip():
                flow.append(Paragraph(clean(c), S["box"]))
    if not flow:
        return []
    tbl = Table([[flow]], colWidths=[172 * mm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LINEBEFORE", (0, 0), (0, -1), 2.4, bd),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return [Spacer(1, 3), tbl, Spacer(1, 6)]


def render_figure(fig, base=None):
    """<figure> du site -> image + légende."""
    m = re.search(r'<img[^>]+src="([^"]+)"', fig)
    cap = re.search(r"<figcaption>(.*?)</figcaption>", fig, re.S)
    flow = []
    if m:
        path = ROOT / m.group(1)
        if not path.exists() and base is not None:
            path = base / m.group(1)
        if path.exists():
            try:
                img = Image(str(path))
                maxw, maxh = 158 * mm, 118 * mm
                k = min(maxw / img.imageWidth, maxh / img.imageHeight, 1.0)
                img.drawWidth = img.imageWidth * k
                img.drawHeight = img.imageHeight * k
                flow.append(KeepTogether([img]))
            except Exception:
                pass
    if cap and txt(cap.group(1)).strip():
        c = clean(cap.group(1)).replace(" — clique pour agrandir", "").replace(" - clique pour agrandir", "")
        flow.append(Paragraph(c, S["cap"]))
    return flow


def render_body(body, base=None):
    flow = []
    for tag, chunk in split_blocks(body):
        if tag == "h3":
            flow.append(Paragraph(clean(re.sub(r"</?h3[^>]*>", "", chunk)), S["h3"]))
        elif tag == "table":
            flow += render_table(chunk)
        elif tag == "figure":
            flow += render_figure(chunk, base)
        elif tag == "list":
            for li in re.findall(r"<li>(.*?)</li>", chunk, re.S):
                flow.append(Paragraph(clean(li), S["li"], bulletText="•"))
        elif tag == "div":
            kind = "def"
            m = re.search(r'class="box ([a-z]+)"', chunk)
            if m:
                kind = m.group(1)
            if "box" in chunk[:80]:
                flow += render_box(chunk, kind)
            else:
                inner = re.sub(r"^<div[^>]*>|</div>\s*$", "", chunk)
                flow += render_body(inner)
        else:
            c = re.sub(r"</?(p|h3|div)[^>]*>", "", chunk)
            if txt(c).strip():
                flow.append(Paragraph(clean(c), S["body"]))
    return flow


# ------------------------------------------------------------------- document
def cover():
    flow = [Spacer(1, 30 * mm),
            Paragraph("Biochimie structurale", S["title"]),
            Spacer(1, 4 * mm),
            Paragraph("Tout le cours, hors ligne", S["sub"]),
            Spacer(1, 3 * mm),
            Paragraph("FMDC Casablanca · 1<sup>re</sup> année de Médecine Dentaire · Semestre 1<br/>"
                      "13 chapitres · 108 QCM corrigés · 108 flashcards", S["sub"]),
            PageBreak()]
    return flow


def cover_page(canv, doc):
    canv.saveState()
    canv.setFillColor(colors.HexColor("#0f1c2b"))
    canv.rect(0, A4[1] - 120 * mm, A4[0], 120 * mm, stroke=0, fill=1)
    canv.setFillColor(colors.HexColor("#14b8a6"))
    canv.rect(0, A4[1] - 121.6 * mm, A4[0], 1.6 * mm, stroke=0, fill=1)
    canv.restoreState()
    footer(canv, doc)


def footer(canv, doc):
    canv.saveState()
    canv.setFillColor(MUT)
    canv.setFont(BODY, 7.6)
    canv.drawString(18 * mm, 10 * mm, "Biochimie structurale — FMDC Casablanca · révision")
    canv.drawRightString(192 * mm, 10 * mm, "%d" % doc.page)
    canv.setStrokeColor(LINE)
    canv.setLineWidth(0.5)
    canv.line(18 * mm, 13.5 * mm, 192 * mm, 13.5 * mm)
    canv.restoreState()


class CoursDoc(BaseDocTemplate):
    """DocTemplate qui alimente la table des matières au fil du rendu."""

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "chap":
            plain = flowable.getPlainText()
            self.notify("TOCEntry", (0, plain, self.page))


def build():
    doc = CoursDoc(str(OUT), pagesize=A4,
                          leftMargin=18 * mm, rightMargin=18 * mm,
                          topMargin=16 * mm, bottomMargin=17 * mm,
                          title="Biochimie structurale — cours complet",
                          author="FMDC Casablanca — révision")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates([PageTemplate(id="first", frames=[frame], onPage=cover_page,
                                       autoNextPageTemplate="later"),
                          PageTemplate(id="later", frames=[frame], onPage=footer)])

    toc = TableOfContents()
    toc.levelStyles = [ParagraphStyle("toc", fontName=BODY, fontSize=9.4, leading=15.5,
                                      textColor=INK, leftIndent=4, firstLineIndent=0)]
    story = cover()

    # sommaire
    story += [Paragraph("Sommaire", S["h2"]), toc, PageBreak()]

    # chapitres
    for sid, grp, title, prof, num, body, _ in B.SECTIONS:
        story.append(Paragraph("<font color='#0f766e'>%s</font> &nbsp;%s"
                               % (html.escape(str(num)), html.escape(title)), S["chap"]))
        story.append(Paragraph(html.escape(prof), S["prof"]))
        story.append(HRFlowable(width="100%", thickness=0.9, color=ACC, spaceBefore=2, spaceAfter=8))
        story += render_body(body)

        # QCM du chapitre
        qs = B.QUIZ.get(sid)
        if qs:
            story.append(Paragraph("QCM d'entraînement — %d questions" % len(qs), S["h4"]))
            for k, q in enumerate(qs, 1):
                story.append(Paragraph("<b>%d.</b> %s" % (k, clean(q["q"])), S["body"]))
                opts = []
                for j, o in enumerate(q["o"]):
                    letter = "ABCDE"[j]
                    if j == q["a"]:
                        opts.append("<b>%s. %s ✓</b>" % (letter, clean(o)))
                    else:
                        opts.append("%s. %s" % (letter, clean(o)))
                story.append(Paragraph("<br/>".join(opts), ParagraphStyle(
                    "op", parent=S["body"], leftIndent=10, fontSize=8.8, leading=12.2)))
                story.append(Paragraph("<font color='#23894a'><b>Réponse : %s.</b> %s</font>"
                                       % ("ABCDE"[q["a"]], clean(q["e"])), ParagraphStyle(
                    "co", parent=S["body"], leftIndent=10, fontSize=8.5, leading=12, textColor=colors.HexColor("#1c6b3c"))))
                story.append(Spacer(1, 5))
        story.append(PageBreak())

    # flashcards
    story.append(Paragraph("Flashcards — 108 questions-réponses", S["h2"]))
    for f in B.FLASH:
        story.append(Paragraph("<b>%s</b> · %s<br/><font color='#115e59'>%s</font>"
                               % (f["g"], clean(f["q"]), clean(f["a"])), S["body"]))
    story.append(PageBreak())

    # ressources
    story.append(Paragraph("Ressources et liens", S["h2"]))
    story.append(Paragraph("Les documents du Drive de la promo, les annales et les pages du site.", S["body"]))
    for url, label in re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', B.RES, re.S):
        if url.startswith("#"):
            continue
        lab = html.escape(re.sub(r"<[^>]+>", "", label).strip())
        if url.startswith("http"):
            story.append(Paragraph("• %s<br/><font size=7.2 color='#5d6878'>%s</font>"
                                   % (lab, html.escape(url)), S["li"]))
        else:
            story.append(Paragraph("• %s <font size=7.2 color='#5d6878'>(page du site : %s)</font>"
                                   % (lab, html.escape(url)), S["li"]))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Les QCM et les flashcards de ce PDF sont aussi interactifs sur le site : "
        "<b>index.html</b> (cours) et <b>cours/biochimie-fiche-expliquee.html</b> "
        "(la fiche manuscrite expliquée page par page).", S["body"]))
    doc.multiBuild(story)
    print("écrit : %s (%.1f Ko)" % (OUT, OUT.stat().st_size / 1024))




# --------------------------------------------------------------- page « fiche »
def build_fiche():
    """PDF de cours/biochimie-fiche-expliquee.html (la fiche manuscrite expliquée)."""
    import re as _re
    src = ROOT / "cours" / "biochimie-fiche-expliquee.html"
    h = src.read_text(encoding="utf-8")
    body = h.split("<main", 1)[1]
    body = body.split(">", 1)[1].split("</main>", 1)[0]

    out = OUT.with_name("biochimie-fiche-expliquee.pdf")
    doc = CoursDoc(str(out), pagesize=A4,
                   leftMargin=18 * mm, rightMargin=18 * mm,
                   topMargin=16 * mm, bottomMargin=17 * mm,
                   title="La fiche manuscrite expliquée — biochimie structurale",
                   author="FMDC Casablanca — révision")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates([PageTemplate(id="first", frames=[frame], onPage=cover_page,
                                      autoNextPageTemplate="later"),
                          PageTemplate(id="later", frames=[frame], onPage=footer)])

    story = [Spacer(1, 12 * mm),
             Paragraph("La fiche manuscrite", S["title"]),
             Spacer(1, 3 * mm),
             Paragraph("expliquée page par page", S["sub"]),
             Spacer(1, 4 * mm),
             Paragraph("Biochimie structurale I · 6 pages · chapitre I (acides aminés et protéines) "
                       "et chapitre II (hémoglobine)", S["sub"]),
             PageBreak()]

    cards = _re.findall(r'<section class="card" id="([^"]+)">(.*?)</section>', body, _re.S)
    for cid, inner in cards:
        m = _re.search(r"<h2[^>]*>(.*?)</h2>", inner, _re.S)
        num = _re.search(r'<div class="pnum">(.*?)</div>', inner, _re.S)
        if num:
            story.append(Paragraph(html.escape(txt(num.group(1))), S["prof"]))
            inner = inner.replace(num.group(0), "")
        if m:
            story.append(Paragraph(clean(m.group(1)), S["chap"]))
            story.append(HRFlowable(width="100%", thickness=0.9, color=ACC, spaceBefore=2, spaceAfter=8))
            inner = inner.replace(m.group(0), "")
        story += render_body(inner, src.parent)
        story.append(PageBreak())
    doc.multiBuild(story)
    print("écrit : %s (%.1f Ko, %d pages)" % (out, out.stat().st_size / 1024, doc.page))


if __name__ == "__main__":
    build()
    build_fiche()
