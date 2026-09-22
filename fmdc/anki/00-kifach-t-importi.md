# 🃏 Kifach t-importi had l-decks f Anki

## 1️⃣ Telecharji Anki

| Platforme | Lien | Taman |
|---|---|---|
| 💻 **Windows / Mac / Linux** | `apps.ankiweb.net` | **Gratuit** |
| 📱 **Android** | `AnkiDroid` (Play Store) | **Gratuit** |
| 📱 **iPhone** | `AnkiMobile` (App Store) | **25 €** (kay-supporti l-développement) — wla sta3mel ghir **`ankiweb.net`** f navigateur (gratuit) |

> 💡 **L-a7san:** installe 3la **l-ordinateur** (import + création), w **AnkiDroid** 3la **téléphone** (révision f l-bus, f salle d'attente, f l-faculté).
> **Synchronisation:** dir compte **gratuit** 3la `ankiweb.net` → kolchi kayt-sync bin PC w téléphone.

---

## 2️⃣ Import l-CSV

### F Anki (ordinateur)

```
Fichier  →  Importer…
```

Wla **glisser-déposer** l-fichier `.csv` 3la l-fenêtre dyal Anki.

### Paramètres li khassk tkhtar (⚠️ mohim)

| Paramètre | Valeur |
|---|---|
| **Type** | `Basic` |
| **Deck** | Dir deck jdid: **`FMDC 2026-27`** |
| **Fields separated by** | **`Semicolon`** (point-virgule `;`) |
| **Allow HTML in fields** | ✅ **OUI — coché** (kayn `<b>`, `<br>`, `<i>`) |

> ⚠️ Ila **ma cochi7ch « Allow HTML »** → ghadi tl9a `<b>` w `<br>` mkhtoutin f l-carte. **Ma tkhafch, 3awed l-import b l-option mcochya.**

### L-fichiers dyalna déjà 3andhom l-header

Kol `.csv` kaybda b had 3سطور:

```
#separator:semicolon
#html:true
#tags column:3
```

**Anki kay9rahom automatiquement** → ma khassk tbeddel walo f les paramètres. ✅

---

## 3️⃣ Structure dyal l-deck (dir hadchi 3awel marrا)

```
FMDC 2026-27                     ← deck ra2isi
│
├── S1
│   ├── 🔴 Prérequis
│   │   ├── Vocab FR              ← vocab-fr.csv
│   │   ├── Maths
│   │   ├── Chimie
│   │   └── Biologie
│   │
│   ├── 🟢 Modules (7ifd)
│   │   ├── PBD3 Anatomie
│   │   ├── PBD1 Biologie cellulaire
│   │   ├── SHS
│   │   └── CTI1 Méthodologie
│   │
│   └── 🦷 Dentaire
│       ├── Organe dentaire       ← organe-dentaire.csv
│       ├── Cavité buccale
│       └── Parodonte
│
├── S2
│   ├── PBD6 Carie                ← carie.csv
│   ├── PBD7 Histologie / Embryo
│   ├── PBD8 Microbio / Immuno
│   ├── PBD5 Physiologie
│   └── PSP1 Santé publique
│
└── 🗑️ Suspendues / à revoir
```

### Kifach tdir sous-deck

**Clic droit** 3la `FMDC 2026-27` → **Create Subdeck** → smih.
Mn b3d f **l-import**, khtar **deck** li bghiti.

---

## 4️⃣ ⚙️ Paramètres dyal l-deck (mohim bzaf)

**Clic 3la l-deck → Options (⚙️)**

| Paramètre | Valeur recommandée | 3lach |
|---|---|---|
| **New cards/day** | **10** (bda) → **20** (mn b3d 2 simana) | Ila drti ktar, ghadi t-غرق f révision |
| **Maximum reviews/day** | **200** → **9999** (bla 7edd) | ⚠️ **Ma t7eddch l-révisions** — hadchi howa l-ghalat ra9m 1 |
| **Learning steps** | `1m 10m 1d` | Default mzyan |
| **Graduating interval** | `4d` | |
| **Easy interval** | `7d` | |
| **Interval modifier** | `100%` | |
| **Maximum interval** | `365d` | |

> 🚨 **L-ghalat l-kbir:** tdir **50 carte jdid f nhar**.
> F simana 2, ghadi ykoun 3andk **500 révision f nhar** → **kat-y2es w kat-nqta3**.
>
> **10 cartes jdad f nhar = 300 carte f chher = 3600 f 3am.**
> **Hadchi kafi bzaf. L-mohim howa l-intizam, machi l-kammiya.**

---

## 5️⃣ 📅 L-routine dyal nhar (15–20 min ghir)

```
┌────────────────────────────────────────────────┐
│  ☕ SB7 (f l-bus, f café, 9bel l-cours)         │
│     → Anki 10 min : RÉVISIONS                   │
│       (l-cartes li Anki 3tak lhoum lyoum)        │
│                                                 │
│  🌙 3CHIYA (f بلوك dyal l-qraya)                │
│     → Anki 5 min : 10 CARTES JDAD                │
│     → Anki 5 min : RÉVISIONS li b9aw            │
│                                                 │
│  📱 FRA9AT (salle d'attente, bus, file)          │
│     → Anki 2 min hna w hna                      │
│       ⚡ hadchi kayjme3 3la 20-30 min f nhar     │
└────────────────────────────────────────────────┘
```

### 🔑 L-9awa3id dyal Anki

1. **Kol nhar. Bla inkita3.** 7tta nhar wa7ed. **Anki kaykhedem b l-3ada, machi b l-himasa.**
2. **Jaweb b sawt 3ali 9bel ma tchof l-jawab.** Ila ma 9olti7ch l-jawab → **ma 3raftich**.
3. **Ma tdirch carte jdid ila ma sali7ch l-révisions.** Révisions **3awel**, jdad **tani**.
4. **Dir cartes mn **l-cours dyalek**.** Anki deck mn internet **ma kay3awedch l-examen dyal FMDC**.
5. **3andk carte ma katfhemch?** → **حيدها** (suspend). Anki **ma hiya7ch 7ifd** — hiya **7ifd li fhemti**.

---

## 6️⃣ 🎯 Ch7al mn carte 3andk daba = **441**

### ⭐ **PRIORITÉ 1 — 199 cartes mn l-examen w l-COURS L-OFFICIEL** — **BDA BIHOM**

| # | Deck | Cartes | Mnin jay | Simana |
|---|---|---|---|---|
| **1** | `physio-S1-2026.csv` | **35** | Examen N2026 (respi 8 · cardio 10 · digestif 10 · neuro 12) | **S1** |
| **2** | `chimie-S1-2026.csv` | **48** | Examen N2026 (40 QCM : ~45 % atomistique + ~55 % organique) | **S2** |
| **3** | `genetique-S1-2026.csv` | **37** | Examen N2026 Q1–Q40 | **S3** |
| **4** | `biomol-S1-2026.csv` | **16** | 🔥 **COURS OFFICIEL Pr T. ROCHD** (6 chapitres) | **S4** |
| **5** | `biocell-methodes-S1-2026.csv` | **25** | 🔥 **COURS OFFICIEL Pr F. RHRICH-HADDOUT** | **S4** |
| **6** | `biocell-S1-2026.csv` | **11** | Examen N2026 Q41–Q50 | **S5** |
| **7** | `biophysique-M114-S1-2026.csv` | **5** | 🔥 **COURS Pr BOUZOUBAA (RX) + Pr EL BOUSSIRI (ultrasons)** | **S5** |
| **8** | `biochimie-structurale-S1-2026.csv` | **25** | Examen N2026 (~24 QCM : AA, peptides, Hb/Mb, enzymo) | **S6** |
| **9** | `anatomie-S1-2026.csv` | **14** | Examen N2026 (rédaction) | **S6** |
| | ⚖️ **TOTAL Priorité 1** | **⭐ 216** | | |

### 📦 **PRIORITÉ 2 — 225 cartes standards**

| Deck | Cartes | Chno kayghti | Mli7 l... |
|---|---|---|---|
| `vocab-fr.csv` | **91** | ⭐ **Vocabulaire fran9aoui = L-MOCHKIL N°1 DYALEK** | **Kol nhar, m3a l-koul** |
| `organe-dentaire.csv` | **99** | Anatomie dentaire, cavité buccale, parodonte, occlusion | M115 |
| `carie.csv` | **35** | La carie : Keyes, bactéries, pH critique, Stephan, ICDAS, Black, fluor | M115 |
| | **225** | | |

### 🔢 **TOTAL = 441 cartes**

⚠️ **MA T-IMPORTI-CH KOULCHI F NHAR WA7ED** → ghadi t-ghrq.
⭐ **Tartib: deck wa7ed koul simana** (chouf l-3amoud « Simana » l-fo9).

📖 L-plan l-kamil b tawarikh f **`../programme-17-simana.md`**

### ⏱️ B 10 cartes jdad/nhar

**22 simana bach t-dir l-216 carte dyal Priorité 1.** Hadak howa **l-objectif dyal S1 kamal** — w l-ba9i (225) kayn lb3d.

⚠️ **L-tartib l-a7amm:** **`physio` L-AWAL** — 0 prérequis, mémorisation pure, **35 carte** → **3 iyyam w saliti.**
`chimie` dir-ha **f nfs l-wa9t m3a l-prérequis dyal chimie organique** (chouf `../programme-17-simana.md` S2–S6).

---

## 7️⃣ ⚠️ Mola7ada mohima — 3la l-4 decks ⭐

> **Had l-4 decks mkhrjin B L-7A9I9A mn l-examens N2026 dyalek** (Janvier 2026) li 3titini f Google Drive:
> - `Physio N2026.pdf` — 40 QCM, kaml
> - `Biochimie N2026.pdf` — ~24 QCM, **m3a l-corrigé mktoub b l-yedd**
> - `Chimie N2026.pdf` — 40 QCM, **m3a l-corrigé mktoub b l-yedd**
> - `Anato N2026.pdf` + `Examen 2023.pdf` — **l-partie écrit** (rédaction)
>
> ### ✅ Chno kayn fihom
> - **L-as2ila l-7a9i9iyin** li t7etto f l-examen
> - **L-corrigé** — l-jawab s7i7 m3a **l-pièges** li kaynin f l-distracteurs
> - **L-istikhlasat** (« ⚠️ Piège », « ❌ Pas … », « ✅ ») — hadchi howa li kay3awnek ma t3awedch l-ghalat
> - **Cartes « STRATEGIE »** — tags `STRATEGIE` — kaychra7o **chno ma kaynch** f l-examen w **kifach l-as2ila kayt3awdo**
>
> ### ⚠️ Chno MA KAYNCH fihom
> - **L-cours dyal l-prof b rasou.** Ana qrit **l-examen**, ma qritch **l-polycopié**.
> - **L-formulations exactes dyal l-prof.** ⚠️ **F l-examen écrit (anatomie), khassk tjaweb b formulation dyal l-prof**, machi dyal Wikipedia.
> - **Biologie cellulaire w Génétique N2026** — l-PDF dyal BIOLOGIE N2026 ma qrit mnou ghir **chunk 0** (3 chunks). Ba9i 2/3.
> - **Biophysique w Matériaux N2026** — ⛔ **l-PDF `qcm biophysique.pdf` 3ando permission bloquée** f Google Drive. **Tlb l'accès** mn li 3tak l-lien.
>
> ### 🔧 Chno khassk t-zid **bo7dk**
> 1. **F l-cours**, kol marrا l-prof y9ol 7aja **ma kaynach f deck**, **zid carte**. (`§ Bonus` f l-akher dyal had l-fichier)
> 2. **Kol examen blanc / contrôle**, **zid kol question li ghalatt fiha**.
> 3. **L-cartes dyal `organe-dentaire` w `carie` w `vocab-fr`** — hado **standards**, ma mkhrjin mn l-PDFs dyalek. **Vérifie-hom m3a l-cours** w beddel li khassou.

---

## 8️⃣ 🔧 DIAGNOSTIC — Ila 3andk mochkil

### 🔍 Chouf chno ban lik f l-écran w la9a m3a had l-jadwal

| ⚠️ Ila chfti hadchi f l-carte | L-mochkil | ⭐ L-7al |
|---|---|---|
| **`<b>Physiologie</b> M-bM-^@M-^T`** — klam mkhtout b `<b>` w `</b>` w `M-bM-^@M-^T` | ❌ **« Allow HTML » ma mcochi-ch** | ⭐ `Fichier` → `Importer` → ⚠️ **COCHE « Allow HTML in fields »** → 3awed l-import |
| **Kolchi f 3amoud wa7ed** — `<b>Q</b>;<b>R</b>;tags` kolchi mrdoum | ❌ **Séparateur ghalat** | ⭐ **`Semicolon` (point-virgule `;`)** — machi `Comma`, machi `Tab` |
| **L-face khawya w l-dos fih kolchi** | ❌ **Field mapping ghalat** | ⭐ Chouf: **colonne 1 = Front** · **colonne 2 = Back** · **colonne 3 = Tags** |
| **`Ã©` blasst `é`** — les accents mkherb9in | ❌ **Encoding machi UTF-8** | ⭐ F l-fenêtre dyal l-import → **Encoding = UTF-8** |
| **0 carte t-importat** / **« 0 notes imported »** | ❌ L-fichier machi `Note de base` | ⭐ **Type = `Basic`** (machî `Basic (type in the answer)`) |
| **L-cartes dayzin mzyan walakin ma kaynin-ch 3la 9add** (matalan 9rit 35 w lqit 34) | ⚠️ **Normal** — l-awwel 3 sutor `déclarations` machi cartes | ✅ Ma 3andek may dir. Hadak howa l-7sab s-s7i7 |
| **L-cartes rahom f deck ghalat** | ⚠️ Ma khttarti-ch l-deck | ⭐ F l-import → **Deck** → khtar `FMDC 2026-27::S1` (wla dir deck jdid 3awtani w 3awed) |

---

### 🧪 Test dyal 30 ثانية — wach l-import mcha mzyan?

**Sir 3and l-carte l-awwalaniya dyal `physio-S1-2026.csv`. Khassek t-chouf:**

#### ✅ S7I7 (ila ban lik hada → kolchi mzyan)

**Face (l-swal) — khatt 3arid, machi fih `<b>`:**
> **Physiologie respiratoire — Quelle est la structure principale responsable des échanges gazeux ?**

**Dos (l-jawab) — listes, khatt 3arid, ⚠️, ⭐:**
> ⭐ **Les ALVÉOLES pulmonaires** — petit sacs... <br>• Surface ~**70 à 100 m²**<br>• ⚠️ **Piège :** ...

#### ❌ MKHERBEQ (ila ban lik hada → 3awed l-import)

> `<b>Physiologie respiratoire</b> M-bM-^@M-^T Quelle est la structure...;Le...`

**Il y a des crochets `<` `>` et des `M-bM-^@M-^T` → il manque la coche « Allow HTML ».**

⭐ **L-7al:** `Fichier` → `Importer` → l-fichier → **✅ COCHE « Autoriser le HTML » (Allow HTML in fields)** → `Importer`

---

### 🔄 Kifach t-3awed l-import bla ma t-khelli des doublons

⚠️ **Ma t-khaf-ch mn les doublons.** Anki ma kat-zid-ch carte li déjà 3andha nfs l-Front.

**L-7al l-a7san (ila ghalatti f l-paramètres):**

1. **7iyyed l-deck l-mkherbeq:** clic 3lih → **`Supprimer` (Delete)** →确认
2. **3awed l-import** b l-paramètres s7a7
3. ✅ Safi — ma ghadi t-b9a 7ta 7aja mkherbqa

⚠️ **Ila l-cartes rahom mzyanin ghir khassek t-zid les tags:**
➡️ Ma t-3awed-ch l-import. **Safi khalli-hom.** Les tags ma kay-dir walou b l-muraJa3a.

---

### 📞 Wa9ila ma 7alliti-ch l-mochkil?

**Sir l-Google Drive** (hada howa l-wa7id li khdam m3ana):

1. 7ett **t-tswira dyal l-écran dyalek (screenshot)** f chi dossier f Drive
2. **Clic droit** → **`Partager`** → **`Toute personne disposant du lien`** → **`Copier le lien`**
3. 3tini l-lien hna

⭐ **N-chouf t-tswira w n-goul lik b d9a chno khassk t-dir.**

⚠️ **Les images li kat-b3at-hom direct f chat ma kay-weslu-lich** — 7it rahom kay-t-7etto f dossier ma kayn-ch f l-espace dyali. **Drive howa l-7al.**

---

## 🎁 Bonus: dir cartes dyalek **mn l-cours**

Hadchi howa **a7san 7aja** — 7it **l-cours dyalek b rasou** howa li kayt7et f l-examen.

### Tari9a f 5 khtawat

```
1. 9ra chapitre → 2. Sed l-ktab → 3. Ktab f wer9a kolchi li tfaakerti
                                                ↓
4. Chno tfaakerti? → Hadchi 3andi déjà          → ma tdirch carte
   Chno nssiti?     → HNA fin tdir carte        → 1 question = 1 carte
                                                ↓
5. Sigh l-question: « Chno hiya X? » / « 3lach X? » / « Chno l-far9 bin X w Y? »
```

### ⚠️ L-9a3ida dyal l-carte l-mzyana

| ✅ Mzyana | ❌ Khayba |
|---|---|
| **Wa7ed l-ma3louma** f kol carte | Carte fiha 10 ma3loumat |
| Soal **précis** | Soal **3am** (« 7ke li 3la dent ») |
| Jawab **9sir** (1-3 sطور) | Jawab **twil** (page) |
| **Sawra** ila kayn (anatomie, histologie) | Texte ghir f anatomie |
| **Ma3na + contexte** | Définition sèche |

> 💎 **Astuce:** 3la l-**images** (anatomie, histologie, radio) → sta3mel l-plugin **Image Occlusion Enhanced**.
> Kat-7et l-image w kat-ghatti l-**labels** → Anki kaysawlek « chno had l-structure? »
> **Hadi a9wa tari9a l 7ifd l-anatomie f l-3alam.**
