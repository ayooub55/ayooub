#!/usr/bin/env python3
"""Construit telecharger/index.html : LE SITE ENTIER DANS UN SEUL FICHIER.

CSS + données + application sont inlinés -> un seul fichier à garder,
à poser sur une clé USB ou à envoyer par mail, ouvrable sans Internet.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'index.html')
OUT = os.path.join(ROOT, 'telecharger', 'index.html')

BANDEAU = """<!-- ============================================================
     FMDC S1 — Espace de révision • VERSION 1 SEUL FICHIER
     Tout est dedans (HTML + CSS + JS + données). Ouvrable sans Internet.
     Les liens Google Drive ont besoin d'une connexion.
     Généré par tools/make-single.py — ne pas éditer à la main.
     ============================================================ -->
"""

FLAG = """<script>
  /* Version 1 fichier : on masque ce qui renvoie à d'autres fichiers */
  window.SINGLE_FILE = true;
  document.documentElement.classList.add('single-file');
</script>
<style>
  .single-file [data-download-site], .single-file [data-download-single], .single-file [data-portal-link],
  .single-file a[href^="2024-2025"] { display: none !important; }
</style>
"""


def _escape(js: str) -> str:
    """Empêche la balise de fermeture de casser le <script> inline."""
    return js.replace('</script', '<\\/script')


def main() -> int:
    html = open(SRC, encoding='utf-8').read()
    html = BANDEAU + html

    # 1. CSS
    def css_repl(m):
        path = os.path.join(ROOT, m.group(1))
        css = open(path, encoding='utf-8').read().replace('</style', '<\\/style')
        return '<style>\n/* ===== %s ===== */\n%s\n</style>' % (m.group(1), css)

    html, n_css = re.subn(r'<link rel="stylesheet" href="([^"]+)">', css_repl, html)

    # 2. JS (l'ordre est conservé : données puis application)
    def js_repl(m):
        path = os.path.join(ROOT, m.group(1))
        js = open(path, encoding='utf-8').read()
        return '<script>\n/* ===== %s ===== */\n%s\n</script>' % (m.group(1), _escape(js))

    html, n_js = re.subn(r'<script src="([^"]+)"></script>', js_repl, html)

    # 3. Drapeau "version 1 fichier" juste avant </head>
    html = html.replace('</head>', FLAG + '</head>', 1)

    # 4. Contrôle : plus aucune dépendance locale
    restes = re.findall(r'(?:src|href)="(?!https?:|#|data:|mailto:|telecharger/)([^"]+)"', html)
    insecables = [r for r in restes if not r.startswith('index.html')]
    if n_css != 1 or n_js != 4:
        print('ATTENTION: inliné %d CSS et %d JS (attendu 1 et 4)' % (n_css, n_js), file=sys.stderr)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'w', encoding='utf-8').write(html)
    ko = os.path.getsize(OUT) / 1024
    print('OK -> %s (%.0f Ko)  css=%d js=%d  refs_locales_restantes=%s'
          % (OUT, ko, n_css, n_js, insecables or 'aucune'))
    return 0


if __name__ == '__main__':
    sys.exit(main())
