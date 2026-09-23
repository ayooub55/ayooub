#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Construit site/contenu.js = la base de connaissances du chatbot."""
import json, os, re, io

ROOT = os.path.dirname(os.path.abspath(__file__))
MD = ROOT + "/fmdc"

def chunks(path, titre, module, typ, maxlen=1800, minlen=350):
    if not os.path.exists(path):
        print("  !! manque:", path); return []
    t = io.open(path, encoding="utf-8").read()
    t = re.sub(r"\n{3,}", "\n\n", t)
    # découpe sur les titres markdown
    parts = re.split(r"\n(?=#{1,4} )", t)
    out, buf, head = [], "", ""
    for p in parts:
        m = re.match(r"^(#{1,4} )(.+)", p)
        if m:
            head = m.group(2).strip()
        if len(buf) + len(p) > maxlen and len(buf) >= minlen:
            out.append(buf.strip()); buf = p
        else:
            buf = (buf + "\n\n" + p) if buf else p
    if buf.strip(): out.append(buf.strip())
    res = []
    for i, c in enumerate(out):
        res.append({
            "id": titre.replace(" ", "_")[:28] + "-" + str(i),
            "t": titre + ((" — " + head) if head else ""),
            "m": module, "ty": typ, "txt": c,
        })
    return res

C = []
C += chunks(MD + "/BDA-MN-HNA.md",          "Dalil 3amali",  "GENERAL", "guide")
C += chunks(MD + "/programme-17-simana.md", "Plan 17 simana","GENERAL", "plan")
C += chunks(MD + "/analyse-examens.md",     "Analyse examens","EXAMENS", "analyse")
C += chunks(MD + "/INDEX-DRIVE.md",         "Archive Drive", "GENERAL", "archive")
C += chunks(MD + "/README.md",              "README FMDC",   "GENERAL", "guide")
C += chunks(MD + "/resumes/methodes-p43-lkher.md", "Methodes etude cellule p43+", "M111", "cours")
C += chunks(MD + "/anki/00-kifach-t-importi.md",   "Guide import", "GENERAL", "guide")
C += chunks(MD + "/anki/5-DQAYEQ.md",              "Guide Anki 5min", "GENERAL", "guide")

# ---- les 441 cartes comme connaissance interrogeable ----
src = io.open(ROOT + "/site/data.js", encoding="utf-8").read()
DECKS = json.loads(src[src.index("["):src.rindex("]") + 1])
nc = 0
for d in DECKS:
    for i, c in enumerate(d["cards"]):
        q = re.sub(r"<[^>]+>", " ", c["q"]).strip()
        a = re.sub(r"<br\s*/?>", "\n", c["a"])
        a = re.sub(r"<[^>]+>", "", a).strip()
        a = re.sub(r"\n{3,}", "\n\n", a)
        C.append({
            "id": "carte-" + d["id"] + "-" + str(i),
            "t": "Carte " + d["nom"] + " #" + str(i + 1),
            "m": d["module"], "ty": "carte",
            "deck": d["id"], "dn": d["nom"], "di": i,
            "txt": q + "\n\n" + a,
        })
        nc += 1

# ---- EXPLICATIONS EN DARIJA (rédigées pour lui) ----
DARIJA = [
    ("cher7-niveau", "M111", " Wach nti ma 3andekch niveau?",
     "LA. Ma 3andekch mochkil dyal niveau.\n\n"
     "3lach? 7it LQINA L-COURS L-OFFICIEL DYAL FMDC f Drive dyalek, w l9inah KAYBDA MN SIFR:\n"
     "- Chimie générale: l-awwal dars fih « l'électron, l-proton, l-neutron ».\n"
     "- Biologie cellulaire (Pr RHRICH-HADDOUT): kaybda b « la cellule ».\n"
     "- Biologie moléculaire (Pr ROCHD): kaybda mn l-ADN.\n"
     "- Ultrasons (Pr EL BOUSSIRI) w Rayons X (Pr BOUZOUBAA): kaybdaw mn zéro.\n\n"
     "DONC: l-prof ma kay-7seb-ch 3lik 3arfti chi 7aja mn qbel.\n\n"
     "CHNO 3ANDEK B SSA7:\n"
     "1) La VITESSE — l-prof kay-mchi zarban, nta ma 3andekch l-vocabulaire.\n"
     "2) Le VOCABULAIRE français — hada howa l-mochkil n°1 (91 cartes f deck vocab-fr).\n"
     "3) Ma 3ammrek dmanti les ANNALES — w l-examen kay-t3awed b 80%.\n\n"
     "L-7AL: les cartes + la répétition espacée. 20 min koul nhar."),

    ("cher7-plan", "GENERAL", "Chno howa l-plan dyali?",
     "L-plan dyalek = 17 simana, 15h/semaine, 21 Sep 2026 → 17 Jan 2027.\n\n"
     "4 phases:\n"
     "🔴 PHASE 1 (S1-S6, 21 Sep → 1 Nov): Attaque. Séd les 216 cartes « examen + cours ».\n"
     "🟠 PHASE 2 (S7-S11, 2 Nov → 6 Déc): Prérequis. Chimie organique + atomistique + matériaux.\n"
     "🟡 PHASE 3 (S12-S14, 7 → 27 Déc): Sédage. Annales kamlin + muraja3a.\n"
     "🟢 PHASE 4 (S15-S17, 28 Déc → 17 Jan): Finale. Refaire les 5 examens 2026 b chrono.\n\n"
     "L-BLOC DYAL SIMANA (15h):\n"
     "- 🧠 Cartes: 3h30 (30 min × 7 ayyam) — ⛔ MA T-QTE3-HA-CH\n"
     "- 📚 Prérequis/cours: 6h (2 × 3h)\n"
     "- ✍️ Rédaction anatomie: 3h (1 × 3h)\n"
     "- 🔁 Annales: 2h30 (1 × 2h30)\n\n"
     "L-ROUTINE DYAL NHAR (2h):\n"
     "1) 20 min cartes (sba7 bakri)\n"
     "2) 40 min cours officiel — GHIR l-qism li ja f l-cartes\n"
     "3) 30 min kteb b yeddek\n"
     "4) 30 min annales b chrono"),

    ("cher7-modules", "GENERAL", "Les modules dyal S1 w les crédits",
     "S1 = 30 crédits, 6 modules:\n\n"
     "| Code | Module | Crédits | Prérequis |\n"
     "| M111 | Biologie cellulaire, moléculaire et génétique | 6 | 🟢 LA — kaybda mn sifr |\n"
     "| M112 | Chimie et biochimie structurale | 5 | 🔴 AH — chimie |\n"
     "| M113 | Anatomie et physiologie générales | 6 | 🟢 LA |\n"
     "| M114 | Biophysique et sciences des matériaux | 6 | 🔴 AH — physique + maths |\n"
     "| M115 | Initiation à la médecine dentaire | 4 | 🟢 LA |\n"
     "| M116 | Méthodologie de travail universitaire (MTU) | 3 | 🟢 LA |\n\n"
     "⚠️ MA KAYN-CH Santé publique f S1. MA KAYN-CH SHS f S1.\n\n"
     "🔥 M114 = 53h de biophysique f l-barème officiel (Ultrasons + interactions 15h · "
     "rayonnements + acido-basique 10h · radiobiologie 14h · radioprotection 14h). "
     "Hada module s3ib — ma t-stehwen-ch bih."),

    ("cher7-membrane", "M113", "Cher7: la membrane cellulaire b darija",
     "La membrane = l-ghchida (l-enveloppe) dyal la cellule. Chno kat-dir? "
     "Kat-khlli chi 7wayj dkhl w chi 7wayj khrjo. B7al l-7it dyal d-dar fih bab.\n\n"
     "T-RKIBA: DOUBLE COUCHE dyal PHOSPHOLIPIDES (b7al 2 tba9a).\n"
     "Kol phospholipide 3ndo:\n"
     "• RAS (tête) = hydrophile → kay-7ebb L-MA\n"
     "• 2 DNIOB (queues) = hydrophobes → kay-krhou L-MA\n\n"
     "DONC: les têtes khalaw l l-barra (f l-ma), les queues l d-dakhel (mkhubyin mn l-ma).\n\n"
     "⭐ MOYEN MNÉMOTECHNIQUE: \"TÊTE aime l'EAU = TÊTE AILLE À L'EAU\"\n\n"
     "L-PROTÉINES: kaynin 3la jal:\n"
     "• Canaux (b7al tqba) → l-ma w les ions\n"
     "• Pompes (b7al machrou3) → Na+/K+ ATPase, kat-dkhl K+ w kat-khrraj Na+\n"
     "• Récepteurs → kat-tlqqa les messages\n\n"
     "LES TIPI dyal PASSAGE:\n"
     "1) Diffusion simple = bla 7aja, O2 w CO2\n"
     "2) Diffusion facilitée = b canal, bla énergie\n"
     "3) Transport actif = b pompe, B ÉNERGIE (ATP)\n\n"
     "⚠️ Piège: Na+/K+ ATPase kat-dkhl 2 K+ w kat-khrraj 3 Na+ (kat-sarf ATP)."),

    ("cher7-adn", "M111", "Cher7: l-ADN b darija",
     "L-ADN = l-kitab dyal l-7ayat. Fih KOL les instructions bach t-sna3 wa7ed l-insan.\n\n"
     "T-RKIBA: b7al SALLAM MFELFEL (double hélice).\n"
     "Kol darja f s-sallam = 2 7rof (bases) m-tlaqyin:\n"
     "• A (adénine) m3a T (thymine) — 2 ponts H\n"
     "• G (guanine) m3a C (cytosine) — 3 ponts H\n\n"
     "⭐ MOYEN: \"A va avec T comme Ali et Tarik\" / \"G et C collent\"\n"
     "⭐ Ntuma juj: **A=T** w **G≡C**\n\n"
     "L-BASES PURINES (2 cycles): A, G.\n"
     "L-BASES PYRIMIDINES (1 cycle): T, C (w U f l-ARN).\n"
     "⭐ MOYEN: \"Purine = PURe et GRande (A, G)\" / \"Pyrimidine = CUT the pyramid (C, U, T)\"\n\n"
     "L-DOUBLE HÉLICE: kat-dour l L-IMIN (droite) = forme B. "
     "10,5 paires de bases f kol tour. 2 nm l-3ard.\n\n"
     "CHARGES: l-ADN mashnoun SLBI (négatif) 7it l-phosphates. "
     "Hada 3lach kat-mchi l L-ANODE (+) f l-électrophorèse.\n\n"
     "L-ARN: 7rof fih U (uracile) blasst T. W sokkor = ribose (blasst désoxyribose). "
     "W 3amaran kat-koun ghir 1 brin (simple brin)."),

    ("cher7-mitose", "M111", "Cher7: la mitose w la méiose b darija",
     "LA MITOSE = la cellule kat-tsna3 NOSKHA MENHA (2 cellules kif kif).\n"
     "Ntiqa3: 2n (46 chromosome l'insan) → 2n w 2n.\n"
     "L-gharad: croissance, réparation.\n\n"
     "L-MARA7IL: Prophase (l-ADN kay-t-kssef → chromosomes) → Métaphase "
     "(les chromosomes f l-wost, b7al sttaf) → Anaphase (les chromatides kay-t-frrqu) → "
     "Télophase (2 noyaux).\n"
     "⭐ MOYEN: **P-M-A-T** = \"Premier Mariage A Tanger\"\n\n"
     "LA MÉIOSE = la cellule kat-tsna3 les GAMÈTES (spermatozoïdes / ovules).\n"
     "Ntiqa3: 2n (46) → n (23). NOSF L-3ADAD.\n"
     "Fiha 2 divisions: Méiose I w Méiose II.\n\n"
     "⭐ L-FARQ: Mitose = 2 cellules 2n (copies). Méiose = 4 cellules n (gamètes).\n\n"
     "⚠️ Enjambement (crossing-over) = f la PROPHASE I. Hada li kay-khlli les enfants "
     "ma y-kounou-ch kif l-walidin.\n\n"
     "L-CYCLE: G1 (croissance) → S (SYNTHÈSE = l-ADN kay-t-double) → G2 → M (mitose).\n"
     "G0 = la cellule kat-ssenna, ma kat-tnqasem-ch (b7al les cardiomyocytes)."),

    ("cher7-atomistique", "M112", "Cher7: l-atomistique b darija (configuration électronique)",
     "L-ATOMISTIQUE = kifach les électrons m-rattbin f d-derra.\n\n"
     "4 NOMBRES QUANTIQUES:\n"
     "• n = la couche (1, 2, 3...) — K, L, M, N\n"
     "• ℓ = la sous-couche (0=s, 1=p, 2=d, 3=f)\n"
     "• m = l-orbitale\n"
     "• s = le spin (+½ wla −½)\n"
     "⭐ MOYEN: \"SPDF = Sages Premiers Devoirs Faciles\"\n\n"
     "KOL SOUS-COUCHE 3NDHA CH7AL:\n"
     "s = 2 électrons · p = 6 · d = 10 · f = 14\n\n"
     "RÈGLE DYAL KLECHKOWSKI: 3mer b n-n (n+ℓ). 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f...\n"
     "⭐ MOYEN: d-dessine s-sallam w nqeb hrej mn kol ras.\n\n"
     "RÈGLE DYAL PAULI: 2 électrons max f orbital, w khass y-kounou b spins MKHTALFIN (↑↓).\n"
     "RÈGLE DYAL HUND: 3mer les orbitales wahda b wahda b spins kif kif qbel ma t-zawj.\n\n"
     "EXEMPLE — Azote (Z=7): 1s² 2s² 2p³\n"
     "Phosphore (Z=15): 1s² 2s² 2p⁶ 3s² 3p³\n\n"
     "⚠️ L-EXAMEN 2026: ~45% atomistique! Had l-qism howa l-a7amm f M112.\n"
     "L-QCM KAY-T-3AWED: y-9elleb ghir l-3onssor (2023 = Si, 2026 = N)."),

    ("cher7-stereo", "M112", "Cher7: la stéréochimie b darija (R/S, Z/E)",
     "LA STÉRÉOCHIMIE = chno chkel dyal la molécule f l-espace (3D).\n\n"
     "CENTRE STÉRÉOGÈNE = carbone m-rkeb 3la 4 7wayj MKHTALFIN.\n\n"
     "R/S — RÈGLES DYAL CIP (3 tmarin):\n"
     "1) Chouf les 4 atomes m-rbutin b l-carbone. Rattabhom: l-akbar nombre atomique = 1.\n"
     "2) 7ett l-moukawwin n°4 L-LOUR (derrière).\n"
     "3) Chouf 1 → 2 → 3:\n"
     "   ⭢ L-IMIN (sens des aiguilles) = **R** (Rectus)\n"
     "   ⭠ L-ISSAR (inverse) = **S** (Sinister)\n\n"
     "⚠️ PIÈGE N°1: ila n°4 kan L-QODDAM (devant, trait plein), **3KSS L-JAWAB!**\n\n"
     "Z/E — f l-alcènes (C=C):\n"
     "Z (zusammen) = les 2 groupes l-kbar m3a b3dyat-hom (même côté)\n"
     "E (entgegen) = les 2 groupes l-kbar m-farrqin (côtés opposés)\n"
     "⭐ MOYEN: **Z = Zéro** = ensemble · **E = Éloigné** = opposé\n\n"
     "ÉNANTIOMÈRES = b7al l-yedd L-IMIN w L-ISSAR. Kif kif, walakin ma y-t-tba9ou-ch.\n"
     "DIASTÉRÉOISOMÈRES = machi b7al l-mirwar. Propriétés mkhtalfin.\n"
     "MÉSO = fih centre stéréogène walakin 3ndo plan de symétrie → machi optiquement actif.\n\n"
     "⚠️ L-EXAMEN 2026: ~55% organique + stéréochimie. Hada l-qism l-a7amm f M112."),

    ("cher7-sn", "M112", "Cher7: SN1 w SN2 b darija",
     "SN = Substitution Nucléophile. Ya3ni l-nucléophile kay-jbed blasst l-halogène.\n\n"
     "SN2 = 2 molécules f l-étape lente. WA7DA (concertée).\n"
     "• L-nucléophile kay-dkhl mn L-DAHR (derrière) — attaque dorsale\n"
     "• Stéréochimie: **INVERSION** complète (b7al l-mḍall)\n"
     "• Vitesse: 3la l-atome w 3la l-nucléophile (2ᵉ ordre)\n"
     "• Favorisée b: substrat MÉTHYLE > 1aire > 2aire >> 3aire (ma ka-in-ch)\n"
     "• Solvant: polaire **APROTIQUE** (DMSO, DMF, acétone)\n"
     "• ⛔ MA KAYN-CH réarrangement\n\n"
     "SN1 = 1 molécule f l-étape lente. JOUJ mar7ila.\n"
     "• 1) L-halogène kay-mchi → **CARBOCATION** (plan, sp²)\n"
     "• 2) L-nucléophile kay-dkhl mn les 2 jiha\n"
     "• Stéréochimie: **RACÉMISATION** (mélange 50/50 R w S)\n"
     "• Vitesse: 3la l-atome ghir (1ᵉ ordre)\n"
     "• Favorisée b: substrat 3aire > allylique/benzylique > 2aire >> 1aire\n"
     "• Solvant: polaire **PROTIQUE** (l-ma, l-alkol)\n"
     "• ⚠️ **RÉARRANGEMENTS** momkin (transposition)\n\n"
     "⭐ MOYEN: **SN2 = 2ᵉ ordre → INVERSION. SN1 = 1 étape lente → carbocation → RACÉMISATION.**\n\n"
     "GROUPE PARTANT: I⁻ > Br⁻ > Cl⁻ >> F⁻ (l-acide l-aqwa = base l-aḍ3af = partant a7sn: HI>HBr>HCl>>HF)\n"
     "⚠️ –OH w –OR = TRÈS MAUVAIS partants — khass t-protonner l-awwal."),

    ("cher7-ultrasons", "M114", "Cher7: les ultrasons b darija (M114)",
     "LES ULTRASONS = son s3ib, ma ka-it-sma3-ch. Fawq 20 000 Hz (20 kHz).\n\n"
     "L-3IBARA L-AHAMM:\n"
     "**c = λ × f**\n"
     "c = célérité (vitesse) b m/s · λ (lambda) = longueur d'onde · f = fréquence b Hz\n\n"
     "⚠️ PIÈGE: f l-biophysique, **c = f · λ**, walakin f l-électromagnétisme **c = 3×10⁸ m/s** (constant). "
     "MA T-KHALLET-CH!\n\n"
     "DANS LES TISSUS MOUS: **c = 1540 m/s** — HAD L-3ADAD 7FEDU.\n"
     "(l-ma = 1500 · l-os = 3500 · l-hawa = 340)\n\n"
     "IMPÉDANCE ACOUSTIQUE Z = ρ × c (ρ = densité, c = célérité).\n"
     "• L-ma: 1,5 × 10⁶\n"
     "• L-os: 7,8 × 10⁶\n\n"
     "RÉFLEXION: kayn farq kbir f Z → réflexion kbira. "
     "Hada 3lach ma n-9edrouch n-choufou l-dakhel dyal l-os.\n"
     "Hada 3lach kat-7ett **GEL** bach t-n7i l-hawa (l-hawa Z = 400, l-jild Z = 1,6×10⁶).\n\n"
     "L-EFFET PIEZHOÉLECTRIQUE: l-effet dyal l-kristal (quartz) li kay-hawwel "
     "l-électricité ↔ la vibration. L-moustachaf (sonde) kay-sta3mlou.\n\n"
     "L-EFFET DOPPLER: ila d-damm kay-mchi → la fréquence kat-tbeddel. "
     "Hada bach kat-qisou la vitesse dyal d-damm.\n\n"
     "ATTÉNUATION: l-énergie kat-nqos m3a l-b3d. L-fréquence l-3alya → "
     "résolution mzyana walakin pénétration ḍ3ifa. (Trade-off!)"),

    ("cher7-rayonsx", "M114", "Cher7: les rayons X b darija (M114)",
     "LES RAYONS X = onde électromagnétique, ma fihom la masse la charge. "
     "Ma kat-n3ass-ch (kat-t-3awwej) la b champ électrique la magnétique.\n\n"
     "L-3IBARA: **E = h × f** (h = constante de Planck = 6,63 × 10⁻³⁴ J·s)\n"
     "E = énergie · f = fréquence. Ila zidt f → E t-zid.\n\n"
     "C = 3 × 10⁸ m/s — ⚠️ L-3IBARA c = λf HNA TATBA9.\n\n"
     "L-UNITÉS: 1 eV = 1,602 × 10⁻¹⁹ J. L-rayons X: 100 eV → 100 keV.\n\n"
     "COUCHES: K (n=1), L (n=2), M (n=3).\n"
     "Kα = L → K (l-akbar énergie utilisée). Kβ = M → K. ⚠️ **Kα > Kβ f l-intensité**.\n"
     "⭐ MOYEN: \"Kα c'est K***approuvé*** (la vedette)\"\n\n"
     "3MAR dyal λ: λ_min = 12,4 / V(kV) — b angström.\n\n"
     "L-TUBE: cathode (filament, −) → anode (+).\n"
     "W dima l-anode kat-koun **W** (tungstène, Z=74) 7it nombre atomique kbir.\n\n"
     "L-INTERACTIONS (4):\n"
     "1) **Effet photoélectrique** → l-photon kay-t-bla3 kaml. Y-3ti contraste. Dominant f l-os.\n"
     "2) **Effet Compton** → l-photon kay-t-chertet w kay-kmmel. Y-3ti l-voile (bruit).\n"
     "3) **Diffusion Rayleigh** (cohérente) → ma y-beddel-ch l'énergie.\n"
     "4) **Production de paires** → ⚠️ khass **E > 1,022 MeV**. Ma kay-t-w9a3-ch f l-radiologie!\n\n"
     "⚠️ PIÈGE: l-effet photoélectrique kay-nqos m3a l-énergie (E³), "
     "l-effet Compton kay-nqos bchwiya."),

    ("cher7-materiaux", "M114", "Cher7: les sciences des matériaux b darija (M114)",
     "LES MATÉRIAUX = bach ka-it-tsn3ou les obturations dentaires (plombages).\n\n"
     "L-3IBARAT L-AHAMM:\n"
     "**Contrainte σ = F / S** (F = force b N, S = surface b m²)\n"
     "**Déformation ε = ΔL / L₀** (allongement / longueur initiale)\n"
     "**Module d'Young E = σ / ε** (l-qasa7a — rigidité)\n"
     "**Loi de Hooke: σ = E × ε** (domaine élastique)\n\n"
     "⚠️ PIÈGE: E = module d'Young, walakin E = Énergie (E = hf) — MA T-KHALLET-CH!\n\n"
     "COURBE CONTRAINTE-DÉFORMATION:\n"
     "1) **Zone ÉLASTIQUE** (l-awwal, droite) → ila 7iyyiti l-force, rja3 b7al l-awwal\n"
     "2) **Limite élastique** (σ_e, y-3ni l-7d)\n"
     "3) **Zone PLASTIQUE** → déformation permanente (ma ka-rja3-ch)\n"
     "4) **R (résistance à la rupture)** — l-a3la noqta\n"
     "5) **Rupture** (l-kssef)\n\n"
     "L-ALLONGEMENT À LA RUPTURE A%:\n"
     "• **A% < 5%** = matériau **FRAGILE** (b7al l-céramique, l-amalgame)\n"
     "• **A% > 5%** = matériau **DUCTILE** (b7al l-or, l-métaux)\n\n"
     "⭐ MOYEN: \"L-OR kay-t-mdd b yeddek, L-AMALGAME kay-t-ksser b d-dars\"\n\n"
     "⚠️ HADA L-QISM LI NAQSI F L-ARCHIVE (dossiers Drive HTTP 500) — 40h f l-plan."),

    ("cher7-physio-coeur", "M113", "Cher7: la physiologie cardiaque b darija",
     "L-QALB (le cœur) = 4 byout: 2 oreillettes (fo9) + 2 ventricules (te7t).\n\n"
     "LES 4 SOUPAPES (valves):\n"
     "• TRICUSpide: oreillette D ↔ ventricule D\n"
     "• MITRALE (bicuspide): oreillette G ↔ ventricule G\n"
     "• PULMONAIRE: ventricule D → artère pulmonaire\n"
     "• AORTIQUE: ventricule G → aorte\n\n"
     "L-CONDUCTION (b7al courant électrique):\n"
     "**NŒUD SINUSAL** (l-oreillette L-IMNAT, 70-80/min) → oreillettes → "
     "**NŒUD AV** (Aschoff-Tawara) → **FAISCEAU DE HIS** → **FIBRES DE PURKINJE** → ventricules\n"
     "⭐ MOYEN: \"Sinus → AV → His → Purkinje\" = **SAV-HP** = \"Sais Avec Vigueur His Purkinje\"\n\n"
     "L-POTENTIEL D'ACTION (cardiaque contractile):\n"
     "• Repos = **−90 mV** (fibre nerveuse = −70 mV — ⚠️ farq!)\n"
     "• Phase 0 (dépolarisation) = **entrée Na⁺**\n"
     "• Phase 2 (PLATEAU) = **entrée Ca²⁺** ⭐ (hada li kay-mn3 tétanisation)\n"
     "• Phase 3 (repolarisation) = **sortie K⁺**\n\n"
     "L-CARDIOCYTE (cellule dyal l-qalb):\n"
     "✅ EXCITABLE · ❌ MITOTIQUE (G0 définitif → ma kay-tjadded-ch mn b3d infarctus) · "
     "❌ AUTORYTHMIQUE (ghir les cellules nodales)\n\n"
     "LA CIRCULATION:\n"
     "• PETITE: ventricule D → artère pulmonaire → poumons → 4 veines pulmonaires → oreillette G\n"
     "  ⚠️ l-artère pulmonaire kat-hezz d-damm **DÉSOXYGÉNÉ** w les VEINES pulmonaires **OXYGÉNÉ**\n"
     "• GRANDE: ventricule G → aorte → l-kssda → veines caves → oreillette D\n\n"
     "L-ADRÉNALINE (sympathique, β1) → t-ZID la fréquence.\n"
     "L-ACÉTYLCHOLINE (parasympathique, vague X, M2) → t-NQQES la fréquence."),

    ("cher7-physio-respi", "M113", "Cher7: la physiologie respiratoire b darija",
     "L-HADAF DYAL LA RESPIRATION: dkhhel O₂ w khrraj CO₂.\n\n"
     "FIN KAY-W9A3? F **LES ALVÉOLES PULMONAIRES** — b7al des ballons s-ghar.\n"
     "L-échanges kay-douzou mn **LA MEMBRANE ALVÉOLO-CAPILLAIRE**.\n"
     "⚠️ MA CHI la trachée, MA CHI les bronches.\n\n"
     "L-PAROI DYAL L-ALVÉOLE (3 cellules):\n"
     "• **PNEUMOCYTE I** = plat, kay-dir l-échanges (95% l-surface)\n"
     "• **PNEUMOCYTE II** = kat-frz **LE SURFACTANT**\n"
     "• **MACROPHAGE ALVÉOLAIRE** = l-mnassa7 (défense, cellule à poussière)\n\n"
     "LE SURFACTANT ⭐:\n"
     "Kat-nqqes **LA TENSION SUPERFICIELLE** → l-alvéole ma kat-tlaṣṣaq-ch (ma kat-t-traffas-ch).\n"
     "⚠️ 3nd L-PRÉMATURÉ ma kayn-ch → **MALADIE DES MEMBRANES HYALINES**.\n\n"
     "LA VENTILATION:\n"
     "• **INSPIRATION = ACTIVE** (diaphragme + intercostaux EXTERNES kay-t-qlbu)\n"
     "• **EXPIRATION NORMALE = PASSIVE** (relâchement + élasticité)\n"
     "• ⚠️ l-expiration **FORCÉE** kat-wella active (intercostaux INTERNES + abdominaux)\n\n"
     "LE DIAPHRAGME = l-a7amm muscle inspiratoire. "
     "⚠️ Howa muscle **SQUELETTIQUE** (strié), MACHI lisse → **volontaire**.\n\n"
     "CENTRES: l-moukh (bulbe) → ** inspiration.**\n"
     "L-régulation: les **CHIMIORÉCEPTEURS** kat-7ess b **CO₂** ⭐ (machi O₂!)"),

    ("cher7-physio-dig", "M113", "Cher7: la physiologie digestive b darija",
     "LES GLUCIDES: la digestion kat-bda f **L-FOMM** (l-bouche).\n"
     "B **L-AMYLASE SALIVAIRE** (ptyaline), mn la glande parotide.\n"
     "⚠️ Kat-t-t3aṭṭal f l-ma3dda (l-estomac) 7it l-pH ḥamḍ → kat-3awed f **L-DUODÉNUM** "
     "b l-amylase pancréatique.\n\n"
     "L-MA3DDA (l'estomac) — les cellules:\n"
     "• **PARIÉTALES** → **HCl** + **facteur intrinsèque** ⭐\n"
     "• **PRINCIPALES** → pepsinogène\n"
     "• **G** (antro-pyloriques) → gastrine\n"
     "• **À MUCUS** → mucus + bicarbonates (protection)\n"
     "• **D** → somatostatine\n\n"
     "LA BILE:\n"
     "Kat-t-ṣnna3 f **L-KBDA** (le foie). Kat-t-khzzen w kat-t-rkkz f **LA VÉSICULE BILIAIRE**.\n"
     "⚠️ PIÈGE: la vésicule MA KAT-SNA3-CH la bile, ghir kat-khzznu!\n"
     "Rôle: **ÉMULSIONNER les lipides** (⛔ kat-dir enzyme!) → kat-zid la surface "
     "dyal la lipase pancréatique.\n\n"
     "LES LIPIDES: **LA LIPASE PANCRÉATIQUE** = l-enzyme l-a7amm.\n"
     "Kat-7taj **LA COLIPASE** + les sels biliaires.\n\n"
     "LES HORMONES:\n"
     "• **SÉCRÉTINE** (cellules S du duodénum, stimulée b l-ACIDITÉ) → "
     "suc **riche en BICARBONATES** → neutralise\n"
     "• **CCK** (cholécystokinine) → les **ENZYMES** + contraction dyal la vésicule\n"
     "⭐ MOYEN: \"Sécrétine = Sels (bicarbonates) · CCK = Casse (enzymes)\"\n\n"
     "LA MOTRICITÉ:\n"
     "• **SEGMENTATION** (f l-intestin grêle) = kat-KHELLET (mélanger) → absorption\n"
     "• **PÉRISTALTISME** = kat-DFA3 (propulser) f jiwa wa7da"),

    ("cher7-methodes", "M111", "Cher7: les méthodes d'étude de la cellule b darija",
     "MICROSCOPIE OPTIQUE (MO) = b ḍ-ḍaw. Résolution ~0,2 µm. ⚠️ limite dyal ḍ-ḍaw.\n"
     "Kat-khlli t-chouf la cellule, l-noyau, les organites kbira.\n\n"
     "MET (microscopie électronique à TRANSMISSION):\n"
     "• Les électrons kay-DOUZOU mn l-3ayna (kat-koun m-qt3a rqyqa)\n"
     "• Image **2D** (en coupe)\n"
     "• Résolution **~0,1 nm** — bzaf mzyan\n"
     "• ⚠️ L-3ayna khass t-koun l-MAYYTA (fixée, déshydratée, inclusions en résine)\n\n"
     "MEB (microscopie électronique à BALAYAGE):\n"
     "• Les électrons kay-MSA7OU **LA SURFACE**\n"
     "• Image **3D** ⭐ (relief)\n"
     "• Résolution ~5-10 nm\n"
     "• ⚠️ Khass **MÉTALLISATION** (couche d'or) 7it l-3ayna ma kat-wddi-ch l-courant\n"
     "• ⭐ F dentaire: **mordançage acide 37%** → kat-chouf les tags de résine\n\n"
     "⭐ MOYEN: **MET = 2D (intérieur) · MEB = 3D (surface)**\n"
     "⭐ Nti juj: **MET kay-khdem b la TRANSMISSION**.\n\n"
     "FRACTIONNEMENT = t-frreq les organites b centrifugation:\n"
     "600 g → NOYAUX · 10 000 g → MITOCHONDRIES · 100 000 g → MICROSOMES · "
     "300 000 g → RIBOSOMES · le liquide = CYTOSOL\n"
     "⚠️ Khass l-BRD (0-4°C) + saccharose 0,25 M (isotonique).\n"
     "Marqueur dyal les peroxysomes = **CATALASE**.\n\n"
     "CYTOCHIMIE = ṣbbaġġa kimiya: **PAS** (glucides) · **Perls** (fer) · "
     "**Von Kossa** (calcium) · **IHC** (anticorps → protéine)\n\n"
     "AUTORADIOGRAPHIE: ³H-thymidine → ADN · ³H-uridine → ARN · ³H-leucine → protéines\n"
     "⭐ **PALADE (pulse-chase, Nobel 1974)**: 3 min (RE) → 7 min (Golgi) → "
     "37 min (vésicules) → 117 min (exocytose)"        ),

    ("cher7-electrophorese", "M111", "Cher7: l-électrophorèse w la chromatographie b darija",
     "L-ÉLECTROPHORÈSE = t-frreq les molécules b **L-ÉLECTRICITÉ**.\n\n"
     "L-QA3IDA: l-ADN mashnoun **SLBI** (négatif, 7it les phosphates) → "
     "donc **L-ADN KAY-MCHI L L-ANODE (+)** ⭐⭐\n"
     "⭐ MOYEN: \"ADN = Acide = Négatif → va vers le PLUS\"\n\n"
     "LES SUPPORTS:\n"
     "• **Agarose** = l-**ADN** (gros trous)\n"
     "• **Polyacrylamide** = les **PROTÉINES** (trous ḍyar)\n\n"
     "**SDS-PAGE**: SDS kay-3ṭi charge négative kif kif l kolchi → "
     "donc la séparation kat-koun 3la **L-POIDS SEUL** ⭐ (machi 3la la charge).\n\n"
     "⚠️ PIC MONOCLONAL (γ, b7al wa7ed l-3oud) = **MYÉLOME** (cancer des plasmocytes). "
     "Polyclonal = b7al jbel 3ariḍ = infection.\n\n"
     "LA CHROMATOGRAPHIE = t-frreq 3la wa7ed **L-3AMOUD** (colonne):\n"
     "• **Taille** (exclusion) → l-akbar y-khroj l-awwal\n"
     "• **Charge** (échange d'ions) → ⭐ la protéine kat-tlṣṣaq ila kanet chargée L-3KS\n"
     "• **Affinité** → b7al clé-serrure (l-a7san)\n"
     "• **Solubilité** ⭐ (salting-out, sulfate d'ammonium)\n\n"
     "⭐ L-FARQ: **Électrophorèse = électricité** · **Chromatographie = colonne**"),

    ("cher7-culture", "M111", "Cher7: la culture cellulaire b darija",
     "LA CULTURE CELLULAIRE = t-rabbi les cellules bærra mn l-kssda (in vitro).\n\n"
     "CHNO KHASSEK:\n"
     "• Milieu + **SVF 10%** (sérum de veau fœtal = l-makla)\n"
     "• **37 °C** (b7al l-kssda)\n"
     "• **5% CO₂** (bach y-bqa l-pH stable)\n"
     "• ⚠️ **STÉRILITÉ** (hotte à flux laminaire)\n\n"
     "**HeLa** (1951, Henrietta Lacks): l-awwal lignée cellulaire. "
     "Khdaw les cellules **BLA MA WAFQET** (sans consentement) — affaire éthique kbira.\n\n"
     "LES CONTAMINANTS:\n"
     "• **MYCOPLASMES** ⭐ = l-aḫṭar (ma kay-banou-ch f l-microscope optique, "
     "ma kay-t-ṣabġu-ch, kay-beddlou la physiologie)\n"
     "• Bactéries · Levures\n\n"
     "LA CONFLUENCE: les cellules kay-3mmrou la boîte. "
     "Ila wslou l 100% → ⚠️ **INHIBITION DE CONTACT** → kat-wqqfu. "
     "Khass t-qllebhom (trypsine).\n\n"
     "⭐ Nti: **SVF 10%** = \"sérum de veau fœtal\". Hada li kay-t-swwel 3lih f l-QCM."),

    ("cher7-anatomie", "M113", "Cher7: l'anatomie générale b darija — kifach t-qra-ha",
     "L-ANATOMIE f M113 = 4 crédits, w **l-épreuve kat-koun ÉCRITE** (rédaction).\n"
     "DONC ma t-9der-ch ghir t-7fed — khass t-3ref t-KTEB w t-ṢWWR.\n\n"
     "LA MÉTHODE DYAL LA FICHE (3h f simana):\n"
     "1) **L-ORGANE**: smiya b l-françawi + b l-latini\n"
     "2) **LA SITUATION**: fayn ja? (foq, te7t, ...)\n"
     "3) **LA FORME** + les dimensions\n"
     "4) **LA STRUCTURE**: les couches mn l-barra l d-dakhel\n"
     "5) **LES RAPPORTS**: chno 7dah? (nerf, artère, veine)\n"
     "6) **LA VASCULARISATION**: chkoun kay-wssel d-damm?\n"
     "7) **L'INNERVATION**: chkoun kay-wssel l-3aṣṣab?\n"
     "8) **LA FONCTION** + un SCHÉMA\n\n"
     "⭐ MOYEN: **SST-V-I-F** = \"Sa Situation, sa Structure, ses Vascules, "
     "son Innervation, sa Fonction\"\n\n"
     "⚠️ L-ÉCRIT: **UN SCHÉMA M-SWWER = 2 points.** L-prof kay-7ett l-3onwan l-awwal.\n"
     "⚠️ **L-INTRODUCTION**: 3la chno ghadi t-hder? smi les 3-4 qsam. "
     "Bla introduction → −2 points.\n\n"
     "LES 3 PLANS: frontal (coronal) · sagittal · transversal (axial)."),

    ("cher7-vocab", "GENERAL", "Cher7: 3lach l-vocabulaire howa l-mochkil n°1",
     "HADA HOWA L-MOCHKIL N°1 DYALEK B SṢA7.\n\n"
     "L-prof kay-hder b francé w nta ma 3andekch les mots. "
     "MA CHI 7it ma 3andekch niveau — 7it **MA Sma3TI-HOM CH MN QBEL**.\n\n"
     "MITHAL:\n"
     "• **Orbitale** = fayn kay-dour l-électron (b7al t-triq)\n"
     "• **Palindrome** = kelma li kat-t-qra kif kif mn j-jihayn (b7al « radar ») — "
     "f l-ADN: les enzymes de restriction kat-qra kif kif\n"
     "• **Mésomère** = l-molécule 3ndha chkel m3a b3dyat, kat-tbeddel blasst les électrons\n"
     "• **Célérité** = la vitesse (l-ṣra3a) dyal l-mouja\n"
     "• **Hydrophile** = kay-7ebb l-ma · **Hydrophobe** = kay-krh l-ma\n"
     "• **Substrat** = l-madda li l-enzyme kat-khdem 3liha\n"
     "• **Isotonique** = nafs la concentration\n"
     "• **Proximal** = qrib mn l-kssda · **Distal** = b3id\n\n"
     "L-7AL: deck **📖 Vocabulaire français** (91 cartes). "
     "10 min koul nhar → f 3 simanat l-mochkil y-wellat.\n\n"
     "⭐ TARIKA: **MA T-TERJEM-CH KOL KELMA F L-AMPHI.** "
     "Kteb ghir l-kelma w kemmel m3a l-prof. Kat-rja3 liha mn b3d. "
     "Ila wqqfti t-terjem → ḍ-ḍya3ti l-ba9i dyal l-dars."),

    ("cher7-amphi", "GENERAL", "Chno n-dir f l-amphi? (la stratégie dyal l-cours)",
     "⛔ **MA T-KTEB-CH KOLCHI.** Hada l-ghalat n°2 dyal les étudiants.\n\n"
     "L-MÉTHODE:\n"
     "1) **Qbel l-amphi (10 min)**: chouf les TITRES dyal l-cours bach ghadi y-hder. "
     "Bla t-fhem — ghir bach l-moukh y-3ref les mots.\n"
     "2) **F l-amphi**: ⭐ **SMA3** w kteb ghir:\n"
     "   • les TITRES w les SOUS-TITRES\n"
     "   • les SCHÉMAS\n"
     "   • les mots S3AB (vocabulaire)\n"
     "   • chno l-prof 3awed 2 merrat (dima kay-ji f l-examen)\n"
     "3) **Mn b3d l-amphi (20 min)**: 3awed kteb b yeddek ghir les idées l-a7amm.\n\n"
     "⭐ L-QA3IDA: ila l-prof 3awed chi 7aja **2 merrat** → 7fed-ha. "
     "Rah ghadi t-ji f l-examen.\n\n"
     "⭐ **MA T-STE7I T-SWWEL.** 4 cours officiels lqinahom 7it chi wa7ed swel.\n\n"
     "⭐ **SJJEL L-AMPHI** b téléphone (ghir ṣ-ṣwt) — 0 DH, w t-9der t-3awed t-sma3.\n\n"
     "⚠️ **MA T-QRA-CH L-COURS BACH T-FAHEM.** Qra l-cartes L-AWWAL, "
     "mn b3d l-cours ghadi y-ban sahl."),

    ("cher7-annales", "EXAMENS", "Cher7: 3lach les annales howma l-a7amm 7aja",
     "**L-EXAMEN DYAL FMDC KAY-T-3AWED B 80%.** Hada machi klam — hadchi l9itou f l-examens.\n\n"
     "MITHAL (chimie):\n"
     "• 2023: « configuration électronique dyal **Si (Z=14)** »\n"
     "• 2026: nafs s-swal 3la **N (Z=7)**\n"
     "→ MÊME ÉNONCÉ, MÊMES DISTRACTEURS, ghir l-3onssor tbeddel.\n\n"
     "STRATÉGIE:\n"
     "1) Jme3 **TOUTES** les annales (2023, 2024, 2025, 2026)\n"
     "2) **7FED LES ÉNONCÉS**, machi ghir les jwabat — l'énoncé kay-rje3, l-jwab kay-tbeddel\n"
     "3) L-kol 3onssor ja f les annales → 3ref configuration + isotopes + place f table\n"
     "4) Darrab **b CHRONO** (l-wa9t howa l-3adu)\n\n"
     "⭐ 199 carte f had l-site m-ṣawba mn **L-EXAMEN L-7A9I9I DYAL 2026**.\n\n"
     "PHASE 4 (28 Déc → 17 Jan): **refaire les 5 examens 2026 b chrono** = l-a7amm 3 semaines.\n\n"
     "⚠️ **L-EXAMEN 2026 F CORRIGÉ MKHARKHACH B STYLO** — "
     "ya3ni l-jwabat l-ṣ7a7 3arfouhom b d9a."),

    ("cher7-anki", "GENERAL", "Anki ma khdem-ch — chno n-dir?",
     "MA 3ANDEK MAY DIR BIH ANKI. Had l-site kay-dir nafs l-7aja.\n\n"
     "3LACH? L-mouhim machi Anki. L-mouhim howa **LA RÉPÉTITION ESPACÉE**:\n"
     "• Jawbti ṣ7i7 → la carte t-rje3 mn b3d 1j → 2j → 5j → 12j → 30j → 60j\n"
     "• Ghlatti → t-rje3 f nafs la séance\n\n"
     "Had l-site 3ndo nafs l-algorithme (SM-2 simplifié). **0 installation. 0 DH.**\n\n"
     "ILA BGUITI T-3AWED T-JERRB ANKI MN B3D:\n"
     "| Problème | L-7al |\n"
     "| `<b>` kay-ban f la carte | ✅ « Autoriser le HTML » coché |\n"
     "| Kolchi f 3amoud wa7ed | Séparateur = **Point-virgule** |\n"
     "| `Ã©` blasst `é` | Encoding = **UTF-8** |\n"
     "| 0 carte | Type = **Note de base** |\n"
     "| Ma lqa-ch les fichiers | Khtar **Tous les fichiers (*.*)** |\n"
     "| « Patch file » | ⛔ MA T-KHTARU-CH — hadak dyal les programmeurs |\n\n"
     "⚠️ L-AWWAL QISM F LA CARTE « Génétique » fih warning — "
     "les réponses dyali, fiables ~90%. 3awed chuf-hom."),

    ("cher7-tracker", "GENERAL", "L-tracker — kifach t-3ref wash l-plan khdam",
     "KOL SIMANA, dmenn wa7ed l-examen wla 20 carte, w 7seb:\n\n"
     "✅ **≥ 85%** → mli7, kmmel\n"
     "⚠️ **70-85%** → 3awed la révision qbel ma t-zid\n"
     "🔴 **< 70%** → **WQQEF.** Rah chi 7aja ma fhemti-ha. Rja3 l l-cours.\n\n"
     "⚠️ **L-AWWAL MERRRA GHADI T-JIB < 50%. HADA NORMAL.** "
     "L-mouhim t-tla3 mn simana l simana.\n\n"
     "LA SÉRIE: l-a7amm 7aja hia **MA T-QTE3-CH.** "
     "20 min koul nhar > 7h f nhar wa7ed.\n\n"
     "⛔ L-5 7WAYJ LI GHADI Y-9ETLOU L-PLAN:\n"
     "1) T-khwi la révision f nhar wa7ed → 200 carte → t-ghrq\n"
     "2) T-kteb kolchi f l-amphi → ma t-fhem walou\n"
     "3) T-ste7i t-hder m3a l-prof\n"
     "4) T-qra l-cours qbel les cartes → t-ghrq f 300 page\n"
     "5) 7h f nhar wa7ed + 6 ayyam khawya"),

    ("cher7-biophysique-bar", "M114", "L-barème officiel dyal M114",
     "⚠️ **LQINA L-BARÈME L-OFFICIEL DYAL M114: 53 HEURES DE BIOPHYSIQUE!**\n\n"
     "| Qism | Sa3at |\n"
     "| Ultrasons + interactions électron-matière | 15h |\n"
     "| Rayonnements ionisants + acido-basique | 10h |\n"
     "| **Radiobiologie** | **14h** |\n"
     "| **Radioprotection** | **14h** |\n\n"
     "⚠️ Konte kan-7seb ghir 15h — **GHALAT KBIR.** Zedt 25h f l-plan.\n\n"
     "DONC M114 = module **S3IB** w **KBIR**. Ma t-stehwen-ch bih.\n\n"
     "LES PROFS:\n"
     "• Pr BOUZOUBAA — Rayons X + imagerie ✅ complet\n"
     "• Pr Kh. EL BOUSSIRI — Bases physiques des ultrasons ✅ complet\n"
     "• Pr Kh. EL GUERMAI — Rayonnements ionisants + acido-basique ⛔ Drive 500\n"
     "• Pr A. GUENSI — Radioprotection ⛔ Drive 500\n"
     "• Sciences des matériaux (Boussiri + Guermai) ⛔ Drive 500\n\n"
     "⭐ 3awed t-jerrb ces 3 dossiers mn b3d — l-archive naqsa."),
]
for i, (cid, mod, titre, txt) in enumerate(DARIJA):
    C.append({"id": cid, "t": "💡 " + titre.strip(), "m": mod, "ty": "cher7", "txt": txt.strip()})

out = ROOT + "/site/contenu.js"
with io.open(out, "w", encoding="utf-8") as f:
    f.write("/* Base de connaissances — générée par _build_contenu.py */\n")
    f.write("window.CONTENU = ")
    json.dump(C, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")

print("chunks:", len(C), "| cartes:", nc, "| darija:", len(DARIJA))
print("taille:", os.path.getsize(out) // 1024, "Ko")
