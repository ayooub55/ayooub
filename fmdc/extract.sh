#!/usr/bin/env bash
# ============================================================================
#  extract.sh — Ikhrej l-texte mn kolchi PDF dyal FMDC
# ============================================================================
#
#  L-mochkil: l-fichiers li kat-attacher kaywq3o f /home/user/uploads/
#             w had l-makan barra l-workspace dyal l-agent.
#
#  L-7al:     copy l-PDFs l  fmdc/cours/  (dakhel l-repo)  w dir run had
#             script. Kolchi ghadi yweli texte f  fmdc/texte/
#
#  Kifach tsta3mlou:
#
#     cd ~/ayooub
#     bash fmdc/extract.sh
#
#  W mn b3d 3awed attacher l-message f Arena w 9ol:
#     "khdem 3la l-fichiers"
#
# ============================================================================

set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_1="/home/user/uploads"
SRC_2="$REPO/fmdc/cours"
OUT="$REPO/fmdc/texte"
VENV="$REPO/.venv"

mkdir -p "$OUT"

echo "======================================================"
echo " FMDC PDF extractor"
echo "======================================================"

# --- 1. Copy mn uploads (ila kan moumkine) ---------------------------------
if [ -d "$SRC_1" ] && [ -r "$SRC_1" ]; then
  n=$(find "$SRC_1" -maxdepth 1 -iname '*.pdf' 2>/dev/null | wc -l)
  if [ "$n" -gt 0 ]; then
    echo "[1/4] L9it $n PDF f $SRC_1 → kan-copy-hom..."
    find "$SRC_1" -maxdepth 1 -iname '*.pdf' -exec cp -f {} "$SRC_2/" \;
  else
    echo "[1/4] $SRC_1 kayn walakin ma fih 7tta PDF."
  fi
else
  echo "[1/4] ⚠️  $SRC_1 MA KAYNCH wla ma kaynch 7a9 l-qraya."
  echo "      → L-agent ma y9derch y9ra l-fichiers li kat-attacher f Arena."
  echo "      → KHASSK t-copyi l-PDFs b yeddek l:  $SRC_2/"
fi

# --- 2. Ch7al mn PDF 3andna daba? ------------------------------------------
shopt -s nullglob
mapfile -t PDFS < <(find "$SRC_2" -maxdepth 1 -iname '*.pdf' | sort)
shopt -u nullglob

echo "[2/4] PDFs f $SRC_2 : ${#PDFS[@]}"
if [ "${#PDFS[@]}" -eq 0 ]; then
  echo
  echo "  ❌ Ma kayn 7tta PDF bach nkhdem 3lih."
  echo
  echo "  ✅ L-7al (khtar WA7ED):"
  echo "     a) Copy l-PDFs b yeddek l:  $SRC_2/"
  echo "        (mn téléphone: dir download, mn b3d file manager → copy)"
  echo "     b) 3awed attacher-hom f Arena f message jdid"
  echo "     c) Ila 3andk lien (Google Drive / ENT UH2C), sift li l-lien"
  echo "        w ana ghadi n-jib-hom b fetch_page"
  echo
  exit 1
fi

# --- 3. Venv + pypdf --------------------------------------------------------
if [ ! -x "$VENV/bin/python" ]; then
  echo "[3/4] Kan-dir venv..."
  python3 -m venv "$VENV" >/dev/null 2>&1
fi
if ! "$VENV/bin/python" -c 'import pypdf' >/dev/null 2>&1; then
  echo "[3/4] Kan-installer pypdf..."
  "$VENV/bin/pip" install --quiet pypdf >/dev/null 2>&1
fi
"$VENV/bin/python" -c 'import pypdf' >/dev/null 2>&1 \
  && echo "[3/4] ✅ pypdf jahz" \
  || { echo "[3/4] ❌ pypdf ma t-installach"; exit 1; }

# --- 4. Extraction ----------------------------------------------------------
echo "[4/4] Kan-khrej l-texte..."
echo

export REPO
"$VENV/bin/python" - "${PDFS[@]}" <<'PY'
import sys, os, re
from pypdf import PdfReader

REPO = os.environ['REPO']
OUTDIR = os.path.join(REPO, 'fmdc', 'texte')
os.makedirs(OUTDIR, exist_ok=True)

total_pages, total_chars, ok, bad = 0, 0, [], []

for path in sys.argv[1:]:
    name = os.path.splitext(os.path.basename(path))[0]
    safe = re.sub(r'[^\w\-. ]+', '_', name).strip()
    dest = os.path.join(OUTDIR, safe + '.txt')
    try:
        r = PdfReader(path)
        pages = []
        for i, p in enumerate(r.pages, 1):
            t = (p.extract_text() or '').strip()
            pages.append(f"\n\n----- page {i} -----\n{t}")
        txt = ''.join(pages).strip()
        with open(dest, 'w', encoding='utf-8') as f:
            f.write(txt)
        n_p, n_c = len(r.pages), len(txt)
        total_pages += n_p; total_chars += n_c
        flag = '⚠️ SCANNÉ?' if n_c / max(n_p,1) < 150 else '✅'
        print(f"  {flag}  {name:<45} {n_p:>4} p  {n_c:>8} car.  → fmdc/texte/{safe}.txt")
        (ok if n_c/max(n_p,1) >= 150 else bad).append(name)
    except Exception as e:
        print(f"  ❌  {name}: {e}")
        bad.append(name)

print()
print("=" * 62)
print(f"  TOTAL: {len(sys.argv)-1} fichier · {total_pages} page · {total_chars:,} caractère")
print("=" * 62)
if bad:
    print()
    print("  ⚠️  Had l-fichiers kayn fihom mochkil (probablement SCANNÉS = images):")
    for b in bad:
        print(f"      - {b}")
    print()
    print("  → PDF scanné ma fih-ch texte, fih IMAGES. Bach n9rah khass OCR.")
    print("    7ell: dir copy dyal l-texte mn l-PDF f fichier .txt w 3awed attacher.")
PY

echo
echo "✅ Sali. Daba 3awed attacher l-message f Arena w 9ol:"
echo "   « l-fichiers f fmdc/texte/ — khdem 3lihom »"
