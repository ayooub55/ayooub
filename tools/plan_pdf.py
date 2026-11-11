# -*- coding: utf-8 -*-
"""
Génère le plan A4 (2 pages) du module de Biochimie structurale — FMDC 1A.

Usage :
    pip install reportlab
    python tools/plan_pdf.py

Sortie : cours/plan-biochimie-structurale.pdf
Le contenu est piloté par les structures CONTENT en bas du fichier : pour
mettre à jour le plan, il suffit de modifier ces listes.
"""
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

# ---------------------------------------------------------------- polices
FONT_DIR = "/usr/share/fonts/truetype/dejavu/"
pdfmetrics.registerFont(TTFont("DJ", FONT_DIR + "DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DJB", FONT_DIR + "DejaVuSans-Bold.ttf"))

W, H = A4
M = 40.0
NAVY = HexColor("#0f1b2b")
INK = HexColor("#1b2430")
GREY = HexColor("#5a6b7d")
LINE = HexColor("#dde5ee")
SOFT = HexColor("#f4f7fb")
BLUE = HexColor("#2f6fb0")
ORANGE = HexColor("#c2762a")
GREEN = HexColor("#2f8f4e")
PURPLE = HexColor("#5b6bc0")
AMBER = HexColor("#b5881f")
RED = HexColor("#b42318")
WARN = HexColor("#fff7e6")

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "cours", "plan-biochimie-structurale.pdf")


# ---------------------------------------------------------------- helpers
def para(text, size=7.5, lead=None, color=INK, font="DJ", width=500):
    st = ParagraphStyle("s", fontName=font, fontSize=size, leading=lead or size * 1.33,
                        textColor=color)
    p = Paragraph(text, st)
    w, h = p.wrap(width, 4000)
    return p, w, h


def measure(text, size=7.5, lead=None, width=500):
    return para(text, size, lead, width=width)[2]


def draw_para(c, x, y_top, text, size=7.5, lead=None, color=INK, font="DJ", width=500, align=0):
    st = ParagraphStyle("s", fontName=font, fontSize=size, leading=lead or size * 1.33,
                        textColor=color, alignment=align)
    p = Paragraph(text, st)
    w, h = p.wrap(width, 4000)
    p.drawOn(c, x, y_top - h)
    return h


def rule(c, x1, x2, y, color=LINE, lw=0.8):
    c.setStrokeColor(color)
    c.setLineWidth(lw)
    c.line(x1, x2 and y or y, x2, y)


def section(c, y, title, accent=BLUE):
    c.setFillColor(accent)
    c.rect(M, y - 1.5, 3.2, 11, stroke=0, fill=1)
    c.setFillColor(accent)
    c.setFont("DJB", 9)
    c.drawString(M + 9, y, title.upper())
    return y - 16


# ---------------------------------------------------------------- contenu
STATS = [("2", "enseignants"), ("5", "chapitres numérotés"), ("25", "fichiers Drive"),
         ("93", "diapos du support long"), ("12", "séances"), ("QCM", "format annoncé")]

CHAPTERS = [
    dict(num="0", color=AMBER, who="PR. KHLIL · p. 1-3", tag=None,
         title="Introduction générale",
         bullets=[
             "<b>4 branches à distinguer</b> : biochimie structurale, métabolique, biologie moléculaire, "
             "biochimie clinique (dosage dans les liquides biologiques).",
             "<b>27 éléments</b> composent le vivant, dont <b>11 font 99 %</b> de la masse ; "
             "C, H, O, N ≈ <b>96 %</b> (O 65 · C 18,5 · H 9,5 · N 3,5). Oligo-éléments : Fe, Cu, Zn, I, Co.",
         ]),
    dict(num="1", color=BLUE, who="PR. KHLIL · p. 4-28", tag="LE PLUS RENTABLE",
         title="Acides aminés & protéines",
         bullets=[
             "<b>20 acides aminés</b> : formule générale, classification par la chaîne latérale, "
             "8 essentiels, 2 semi-indispensables, dérivés.",
             "<b>Ionisation, pK, pH<sub>i</sub></b> ; propriétés physiques (absorption UV, pouvoir rotatoire) et chimiques.",
             "<b>Liaison peptidique</b> : plane et rigide, C–N = 1,32 Å, angles 114° / 125°, angles φ et ψ.",
             "<b>4 structures</b> des protéines et leurs liaisons, dénaturation, relation structure-fonction.",
             "<b>Hémoglobine</b> : globine + hème, gaz, 2,3-DPG, effet Bohr, méthémoglobine, mutants.",
         ]),
    dict(num="2", color=PURPLE, who="PR. KHLIL · p. 29-71", tag=None,
         title="Enzymes & coenzymes",
         bullets=[
             "<b>Site actif et cofacteurs</b>, nomenclature et classification des enzymes.",
             "<b>Cinétique</b> : effet de [E], effet de [S] (Michaelis-Menten : K<sub>M</sub>, V<sub>max</sub>), "
             "linéarisation de Lineweaver-Burk.",
             "<b>Effecteurs</b> : inhibition compétitive et non compétitive ; effet du pH et de la température.",
             "<b>Allostérie</b> : courbe sigmoïde, effecteurs positifs et négatifs.",
             "<b>Vitamines et coenzymes</b> : oxydoréduction, transport de groupements, pyridoxal phosphate, "
             "vitamines liposolubles.",
         ]),
    dict(num="3", color=GREEN, who="PR. NAAMANE · DIAPOS 1-62", tag="PARTIE EN COURS",
         title="Glucides",
         bullets=[
             "<b>Définition</b> (CH₂O)<sub>n</sub>, C : H : O = 1 : 2 : 1 ; <b>classification</b> oses / osides, "
             "holosides / hétérosides.",
             "<b>Stéréochimie</b> : carbone chiral, séries D et L, Fischer, <b>filiation de Keller et Kiliani</b>, "
             "<b>épimères</b>, les 6 cétoses en D (psicose, fructose, sorbose, tagatose…).",
             "<b>Cyclisation</b> : pyranose / furanose, <b>arguments de Tollens</b>, mutarotation "
             "(α 36 % · β 63 % · 0,1 %).",
             "<b>Osides</b> : liaison O-osidique, maltose, lactose, saccharose (non réducteur) ; amidon "
             "(amylose 20 % / amylopectine 80 %), glycogène.",
             "<b>GAG</b> : acide hyaluronique, chondroïtine sulfate, kératane sulfate ; protéoglycanes, "
             "glycoprotéines.",
         ]),
    dict(num="4", color=ORANGE, who="PR. NAAMANE · DIAPOS 63-93", tag="CHIFFRES CLINIQUES",
         title="Lipides & sphingolipides",
         bullets=[
             "<b>Définition</b> : insolubles dans l'eau, solubles dans les solvants organiques, amphiphiles ; "
             "esters d'acides gras et de glycérol.",
             "<b>Acides gras</b> (issus de l'hydrolyse des glycérides) : C4 → C24, pair ; oléique C18:1 ω9, "
             "linoléique C18:2 ω6, linolénique C18:3 ω3, arachidonique C20:4 ω6.",
             "<b>Lipides</b> : glycérides, phospholipides (lécithine, céphaline, phosphatidylsérine), stérides, "
             "eicosanoïdes ; bilan lipidique sérique ; membranes.",
             "<b>§ VII Sphingophospholipides</b> : sphingosine → céramide ; sphingomyéline (Niemann-Pick), "
             "cérébroside (Gaucher), ganglioside (Tay-Sachs), glycolipides neutres (groupes sanguins).",
         ]),
]

PARTS = [("Protéines", .28, BLUE), ("Enzymes", .24, PURPLE), ("Glucides", .20, GREEN),
         ("Lipides", .20, ORANGE), ("Intro", .08, AMBER)]

TRAPS = [
    ("pH<sub>i</sub>", "La moyenne des deux pK ne vaut que pour un AA neutre ; sinon, prendre les deux pK "
                       "encadrant le zwitterion."),
    ("Dénaturation", "Détruit les structures secondaire à quaternaire, <b>jamais</b> la séquence primaire."),
    ("K<sub>M</sub>", "C'est une <b>concentration</b>, pas une vitesse ; K<sub>M</sub> faible = forte affinité."),
    ("Inhibition", "Compétitive : K<sub>M</sub> apparent ↑, V<sub>max</sub> inchangée. Non compétitive : "
                   "V<sub>max</sub> ↓."),
    ("Sucres", "Saccharose <b>non réducteur</b> ; maltose et lactose réducteurs."),
    ("Numérotation", "Chez Naamane les glucides sont le « Chapitre I » et les lipides un autre « Chapitre I » : "
                     "les fichiers du Drive disent CHAP 3 et CHAP 4."),
]

SESSIONS = [
    ("S1", "Introduction + structure et classification des acides aminés (les 20, les essentiels)", "support p. 1-8"),
    ("S2", "Propriétés des AA : ionisation, pK, pH<sub>i</sub> — refaire 10 calculs", "support p. 8-12"),
    ("S3", "Liaison peptidique et peptides : planéité, angles φ et ψ, peptides actifs", "support p. 12-13"),
    ("S4", "Les 4 structures des protéines, dénaturation, relation structure-fonction", "support p. 14-18"),
    ("S5", "Hémoglobine : globine, hème, gaz, 2,3-DPG, Bohr, mutants, méthodes", "support p. 19-28"),
    ("S6", "Enzymes : définitions, nomenclature, effet de [E] et de [S], Michaelis-Menten", "support p. 29-38"),
    ("S7", "Inhibitions, pH et température, allostérie — redessiner les 4 graphiques", "support p. 39-47"),
    ("S8", "Vitamines et coenzymes : tableau vitamine → coenzyme → réaction", "support p. 48-70"),
    ("S9", "Glucides : Keller et Kiliani, cyclisation, anomères, propriétés chimiques", "diapos 4-38"),
    ("S10", "Osides : liaison osidique, di- et polyosides, GAG, protéoglycanes", "diapos 33-62"),
    ("S11", "Lipides : acides gras, glycérides, phospholipides, stérols, bilan lipidique", "diapos 63-89"),
    ("S12", "Sphingolipides (§ VII) + annales chronométrées", "diapos 90-93"),
]

FIGURES = [
    ("Protéines", BLUE, ["20 / 8 / 2 : AA, essentiels, semi-indispensables",
                         "1,32 Å : liaison C–N peptidique",
                         "114° / 125° : angles du groupe plan",
                         "141 / 146 / 153 : AA de Hb α / Hb β / myoglobine",
                         "× 250 : affinité du CO pour l'hème",
                         "His 146 β : fixation des H⁺ (Bohr)",
                         "50 à 80 % : protéines du poids sec"]),
    ("Enzymes", PURPLE, ["K<sub>M</sub> = (k<sub>-1</sub> + k₂) / k₁",
                         "V<sub>max</sub> = k₂ [E<sub>T</sub>]",
                         "Compétitive : K<sub>M</sub> ↑, V<sub>max</sub> =",
                         "Non compétitive : V<sub>max</sub> ↓, K<sub>M</sub> =",
                         "30 °C / 40 °C : dénaturation",
                         "6 classes d'enzymes",
                         "1/v = (K<sub>M</sub>/V<sub>max</sub>)·1/[S] + 1/V<sub>max</sub>"]),
    ("Glucides", GREEN, ["4 kcal pour 1 g de glucose",
                         "C1 → ac. gluconique ; C6 → ac. glucuronique",
                         "C6 + H₃PO₄ → G6P : glucose piégé (chargé)",
                         "50 / 35 / 15 % : glucides, lipides, protides",
                         "36 / 63 / 0,1 % : α, β, forme ouverte",
                         "20 / 80 % : amylose, amylopectine",
                         "lactose : β(1→4) galactose-glucose, réducteur",
                         "D/L = structure, d/l = mesure : ne pas confondre",
                         "aldoses en D : 2<sup>n−2</sup> → 1, 2, 4, 8",
                         "épimères du glucose : mannose C2 · allose C3 · galactose C4"]),
    ("Lipides", ORANGE, ["C4 → C24, nombre pair de carbones",
                         "30-35 % · 1 g/kg/j · + 3 g/j d'AGE",
                         "5 à 8 g/L : lipides totaux sériques",
                         "TG 0,5-1,5 · HDL 0,4-0,8 · LDL 1,1-1,9 g/L",
                         "HDL 24 · LDL 56 · VLDL 20 %",
                         "2400 kcal : 1600 + 200 + 600",
                         "cholestérol total : 1,7 à 2,5 g/L (adulte)"]),
]

PATHOS = [
    ("Drépanocytose", "mutation de l'Hb (chap. 1)"),
    ("Méthémoglobinémie", "oxydation de l'Hb, fer ferrique (chap. 1)"),
    ("Intoxication oxycarbonée", "CO × 250 → oxygénothérapie (chap. 1)"),
    ("Diabète", "intolérance au glucose (chap. 3)"),
    ("Intolérance au fructose", "fructosémie (chap. 3)"),
    ("Galactosémie", "métabolisme du galactose (chap. 3)"),
    ("Athérosclérose / obésité", "dépassement des besoins (chap. 3-4)"),
    ("Niemann-Pick", "déficit en sphingomyélinase (§ VII)"),
    ("Gaucher", "déficit en β-glucosidase (§ VII)"),
    ("Tay-Sachs", "déficit en hexosaminidase (§ VII)"),
]

DAYS = [
    ("J-3", "Chiffres et les 4 graphiques d'enzymologie. Annale 2021-2022."),
    ("J-2", "Les 10 pathologies, les 3 GAG, le lipidogramme. Réciter les classifications."),
    ("J-1", "Rien de nouveau. Survol des diapos 25-38 et 90-93, relire le plan, se coucher tôt."),
]

QUESTIONS = [
    "3 propriétés physiques des oses ; pourquoi solubles ?",
    "pH<sub>i</sub> de la glycine (pK₁ 2,35 / pK₂ 9,78) ?",
    "Filiation de Keller et Kiliani : que sont des épimères ?",
    "Arguments de Tollens : que prouvent-ils ?",
    "Effet Bohr : mécanisme et rôle du 2,3-DPG ?",
    "Écrire Michaelis-Menten ; définir K<sub>M</sub> et V<sub>max</sub>.",
    "Inhibition compétitive, puis non compétitive : K<sub>M</sub> ? V<sub>max</sub> ?",
    "Glucose → pyranose, fructose → furanose : pourquoi ?",
    "Lactose : nom complet, liaison, enzyme, réducteur ?",
    "Bilan lipidique normal, et les 3 maladies de surcharge ?",
]


# ---------------------------------------------------------------- page 1
def page_one(c):
    c.setFillColor(NAVY)
    c.rect(0, H - 94, W, 94, stroke=0, fill=1)
    c.setFillColor(BLUE)
    c.rect(0, H - 98, W, 4, stroke=0, fill=1)

    c.setFillColor(HexColor("#8fb8e0"))
    c.setFont("DJB", 8.4)
    c.drawString(M, H - 30, "PLAN DU MODULE  ·  FMDC CASABLANCA  ·  1ʳᵉ ANNÉE  ·  SEMESTRE 1")

    c.setFillColor(HexColor("#ffffff"))
    c.setFont("DJB", 27)
    c.drawString(M, H - 60, "Biochimie structurale")

    c.setFillColor(HexColor("#b9cde0"))
    c.setFont("DJ", 8.4)
    c.drawString(M, H - 76, "Chimie et biochimie structurale  ·  Pr. Naima KHLIL (protéines, enzymes) "
                            "& Pr. A. NAAMANE (glucides, lipides)")
    c.drawString(M, H - 88, "Support écrit Khlil 71 p.  ·  diaporama Naamane 93 diapos  ·  25 fichiers Drive  ·  "
                            "épreuve annoncée au format QCM")

    # bandeau de chiffres
    n = len(STATS)
    bw = (515 - (n - 1) * 8) / n
    by = H - 140
    for i, (big, small) in enumerate(STATS):
        x = M + i * (bw + 8)
        c.setFillColor(SOFT)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.roundRect(x, by, bw, 33, 6, stroke=1, fill=1)
        c.setFillColor(BLUE)
        c.setFont("DJB", 14)
        c.drawCentredString(x + bw / 2, by + 16, big)
        c.setFillColor(GREY)
        c.setFont("DJ", 6.2)
        c.drawCentredString(x + bw / 2, by + 6.5, small)

    y = section(c, H - 164, "La carte du programme officiel")

    inner = 515 - 34 - 8
    for b in CHAPTERS:
        hs = [measure(t, 7.2, 8.9, inner) for t in b["bullets"]]
        hh = 17 + sum(hs) + 2.8 * (len(hs) - 1) + 9
        c.setFillColor(HexColor("#ffffff"))
        c.setStrokeColor(LINE)
        c.setLineWidth(0.9)
        c.roundRect(M, y - hh, 515, hh, 7, stroke=1, fill=1)
        c.setFillColor(b["color"])
        c.roundRect(M, y - hh, 4.2, hh, 2, stroke=0, fill=1)

        ty = y - 13
        c.setFillColor(b["color"])
        c.setFont("DJB", 9.5)
        c.drawString(M + 15, ty, b["num"] + ".")
        c.setFillColor(INK)
        c.setFont("DJB", 10.1)
        c.drawString(M + 27, ty, b["title"])
        tw = c.stringWidth(b["title"], "DJB", 10.1)
        c.setFillColor(GREY)
        c.setFont("DJ", 6.6)
        c.drawString(M + 34 + tw, ty + 1, b["who"])

        if b.get("tag"):
            label = b["tag"]
            tagw = c.stringWidth(label, "DJB", 6.0) + 12
            tx = M + 515 - 8 - tagw
            box = HexColor("#eaf4ec") if label == "LE PLUS RENTABLE" else HexColor("#e9f0f9")
            edge = HexColor("#bfe0c8") if label == "LE PLUS RENTABLE" else HexColor("#c3d6ea")
            ink = GREEN if label == "LE PLUS RENTABLE" else BLUE
            c.setFillColor(box)
            c.setStrokeColor(edge)
            c.setLineWidth(0.7)
            c.roundRect(tx, ty - 2, tagw, 11, 5, stroke=1, fill=1)
            c.setFillColor(ink)
            c.setFont("DJB", 6.0)
            c.drawString(tx + 6, ty + 1, label)

        yy = ty - 8.5
        for t in b["bullets"]:
            c.setFillColor(b["color"])
            c.circle(M + 16.5, yy - 2.9, 1.4, stroke=0, fill=1)
            hh2 = draw_para(c, M + 24, yy, t, 7.2, 8.9, INK, "DJ", inner)
            yy -= hh2 + 2.8
        y = y - hh - 4.5

    # répartition
    y = section(c, y - 10, "Répartition de travail conseillée", ORANGE)
    bx = M
    for label, frac, col in PARTS:
        w = 515 * frac
        c.setFillColor(col)
        c.rect(bx, y - 14, w, 13, stroke=0, fill=1)
        c.setFillColor(HexColor("#ffffff"))
        c.setFont("DJB", 7.0 if frac > .10 else 6.2)
        c.drawCentredString(bx + w / 2, y - 10.3, ("%s %d %%" % (label, round(frac * 100))) if frac > .10
                            else "%d %%" % round(frac * 100))
        bx += w

    y -= 20
    hc = draw_para(c, M, y,
                   "Répartition de <b>travail</b>, pas un barème officiel : elle suit le volume et la densité de "
                   "chaque support. Chez Pr. Khlil, les diapositives de la fin du support (à partir de la diapo 188, "
                   "jusqu'aux vitamines) ont été retirées. La partie de Pr. Naamane, elle, est entière.",
                   6.7, 8.6, GREY, "DJ", 515)

    # pièges
    y = section(c, y - hc - 13, "Les pièges qui coûtent des points", RED)
    gap = 9
    tw2 = (515 - 2 * gap) / 3.0
    ty2 = y
    for r in range(2):
        row = TRAPS[r * 3:(r + 1) * 3]
        boxh = max(measure(v, 6.4, 8.2, tw2 - 14) for k, v in row) + 15
        for j, (k, v) in enumerate(row):
            x = M + j * (tw2 + gap)
            c.setFillColor(SOFT)
            c.setStrokeColor(LINE)
            c.setLineWidth(0.7)
            c.roundRect(x, ty2 - boxh, tw2, boxh, 5, stroke=1, fill=1)
            hk = draw_para(c, x + 7, ty2 - 6.5, k, 7.1, 8.2, RED, "DJB", tw2 - 14)
            draw_para(c, x + 7, ty2 - 10 - hk, v, 6.4, 8.2, INK, "DJ", tw2 - 14)
        ty2 -= boxh + 4.5

    c.setFillColor(GREY)
    c.setFont("DJ", 6.8)
    c.drawString(M, 24, "Portail de révision FMDC 1A  ·  sources : support Khlil 2024-25, diaporama Naamane "
                        "(93 diapos), chapitres 3 et 4 du Drive")
    c.drawRightString(W - M, 24, "page 1 / 2")
    c.showPage()


# ---------------------------------------------------------------- page 2
def page_two(c):
    c.setFillColor(NAVY)
    c.rect(0, H - 58, W, 58, stroke=0, fill=1)
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("DJB", 15)
    c.drawString(M, H - 34, "Plan de révision en 12 séances")
    c.setFillColor(HexColor("#b9cde0"))
    c.setFont("DJ", 7.6)
    c.drawString(M, H - 47, "Séances de 1 h 30 à 2 h · coche la case quand la séance est faite · "
                            "page 2 du plan du module")
    c.setFillColor(HexColor("#8fb8e0"))
    c.setFont("DJB", 8)
    c.drawRightString(W - M, H - 34, "BIOCHIMIE STRUCTURALE")

    y = H - 82
    rowh = 19.4
    total = 14 + rowh * len(SESSIONS)
    c.setFillColor(SOFT)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.roundRect(M, y - total, 515, total, 7, stroke=1, fill=1)

    c.setFillColor(NAVY)
    c.rect(M, y - 14, 515, 14, stroke=0, fill=1)
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("DJB", 6.4)
    for label, x in (("FAIT", M + 8), ("SÉANCE", M + 34), ("OBJECTIF", M + 86), ("SUPPORT", M + 452)):
        c.drawString(x, y - 9.6, label)

    ry = y - 14
    for i, (num, obj, sup) in enumerate(SESSIONS):
        ry -= rowh
        if i % 2 == 1:
            c.setFillColor(HexColor("#ffffff"))
            c.rect(M + 0.8, ry, 513.4, rowh, stroke=0, fill=1)
        c.setStrokeColor(HexColor("#c8d6e4"))
        c.setLineWidth(0.7)
        c.rect(M + 8, ry + 6.4, 6.6, 6.6, stroke=1, fill=0)
        c.setFillColor(BLUE)
        c.setFont("DJB", 7.6)
        c.drawString(M + 34, ry + 6.6, num)
        draw_para(c, M + 86, ry + 14.2, obj, 7.4, 9.2, INK, "DJ", 360)
        c.setFillColor(GREY)
        c.setFont("DJ", 6.6)
        c.drawString(M + 452, ry + 6.6, sup)

    y = ry - 20

    # chiffres
    y = section(c, y, "Chiffres et formules à retenir", BLUE)
    gap = 8
    cw = (515 - 3 * gap) / 4.0
    inner_w = cw - 14
    box_h = max(20 + sum(measure("· " + t, 6.6, 8.5, inner_w) + 3.0 for t in lines) + 4
                for _, _, lines in FIGURES)
    for i, (title, col, lines) in enumerate(FIGURES):
        x = M + i * (cw + gap)
        c.setFillColor(HexColor("#ffffff"))
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.roundRect(x, y - box_h, cw, box_h, 6, stroke=1, fill=1)
        c.setFillColor(col)
        c.rect(x, y - box_h, cw, 2.4, stroke=0, fill=1)
        c.setFont("DJB", 7.8)
        c.drawString(x + 7, y - 12, title)
        ly = y - 19
        for t in lines:
            hh = draw_para(c, x + 7, ly, "· " + t, 6.6, 8.5, INK, "DJ", inner_w)
            ly -= hh + 3.0

    y = y - box_h - 13

    # pathologies
    y = section(c, y, "Les 10 pathologies citées dans le module", RED)
    colw = 515 / 2 - 8
    for i, (name, meca) in enumerate(PATHOS):
        x = M + (i % 2) * (colw + 16)
        py = y - (i // 2) * 13.8
        c.setFillColor(RED)
        c.circle(x + 2.4, py - 2.6, 1.4, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont("DJB", 7.0)
        c.drawString(x + 9, py - 5, name)
        nw = c.stringWidth(name, "DJB", 7.0)
        c.setFillColor(GREY)
        c.setFont("DJ", 7.0)
        c.drawString(x + 9 + nw + 5, py - 5, "— " + meca)

    y = y - 5 * 13.8 - 6

    # 3 derniers jours
    y = section(c, y, "Les 3 derniers jours", GREEN)
    dw = (515 - 2 * 8) / 3.0
    dh = max(measure(txt, 6.5, 8.4, dw - 18) + 22 for _, txt in DAYS)
    for i, (tag, txt) in enumerate(DAYS):
        x = M + i * (dw + 8)
        c.setFillColor(WARN)
        c.setStrokeColor(HexColor("#e8d9b0"))
        c.setLineWidth(0.8)
        c.roundRect(x, y - dh, dw, dh, 6, stroke=1, fill=1)
        c.setFillColor(HexColor("#8a6a12"))
        c.setFont("DJB", 9)
        c.drawString(x + 9, y - 14, tag)
        draw_para(c, x + 9, y - 22, txt, 6.5, 8.4, INK, "DJ", dw - 18)

    y = y - dh - 15

    # auto-test
    y = section(c, y, "Auto-test : 10 questions à savoir traiter sans support", PURPLE)
    qw = 515 / 2 - 12
    hs = [measure(q, 6.6, 8.4, qw - 16) for q in QUESTIONS]
    rowh2 = [max(hs[r * 2], hs[r * 2 + 1]) + 2.0 for r in range(5)]
    qy = y
    for i, q in enumerate(QUESTIONS):
        x = M + (i % 2) * (qw + 20)
        ry2 = qy - sum(rowh2[:i // 2])
        c.setFillColor(PURPLE)
        c.setFont("DJB", 6.8)
        c.drawString(x, ry2 - 6.4, "%02d" % (i + 1))
        draw_para(c, x + 16, ry2, q, 6.6, 8.4, INK, "DJ", qw - 16)

    y = qy - sum(rowh2) - 4

    c.setFillColor(GREY)
    c.setFont("DJ", 6.8)
    c.drawString(M, 12, "Portail FMDC 1A  ·  sources : support Khlil 2024-25, diaporama Naamane (93 diapos), annales")
    c.drawRightString(W - M, 12, "page 2 / 2")
    c.showPage()


def main():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Plan du module — Biochimie structurale (FMDC 1A)")
    c.setAuthor("Portail de révision FMDC 1A")
    c.setSubject("Plan du module de Biochimie structurale — Pr. Khlil & Pr. Naamane")
    page_one(c)
    page_two(c)
    c.save()
    print("écrit :", OUT)


if __name__ == "__main__":
    main()
