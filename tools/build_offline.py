#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fabrique des versions HTML autonomes (un seul fichier, images incluses) des
pages de révision, pour les télécharger et les ouvrir hors ligne.

  index.html                          -> cours/biochimie-structurale-cours-hors-ligne.html
  cours/biochimie-fiche-expliquee.html -> cours/biochimie-fiche-expliquee-hors-ligne.html

Les images référencées sont converties en data: URI (base64) : le fichier
obtenu fonctionne sans dossier voisin, sans serveur et sans internet.

Usage : python3 tools/build_offline.py
"""

import base64
import mimetypes
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent

PAGES = [
    ("index.html", "cours/biochimie-structurale-cours-hors-ligne.html"),
    ("cours/biochimie-fiche-expliquee.html", "cours/biochimie-fiche-expliquee-hors-ligne.html"),
]

BANNER = (
    '<div style="position:fixed;left:0;right:0;bottom:0;z-index:99;background:#0f1c2b;color:#dbe6f2;'
    'font:13px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:8px 14px;'
    'box-shadow:0 -6px 18px rgba(0,0,0,.25)">'
    '<b style="color:#7dead9">Version hors ligne</b> — ce fichier contient tout le cours et ses images : '
    'aucune connexion n\'est nécessaire. Les liens vers Drive et les PDF du site ne fonctionnent '
    'qu\'avec une connexion.'
    '<span style="float:right;cursor:pointer;opacity:.75" onclick="this.parentNode.remove()">✕</span>'
    '</div>'
)


def inline_images(html_text, base_dir):
    """Remplace chaque src="..." local par un data: URI."""
    def repl(m):
        src = m.group(2)
        if src.startswith(("data:", "http://", "https://")):
            return m.group(0)
        path = (base_dir / src).resolve()
        if not path.exists():
            return m.group(0)
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        b64 = base64.b64encode(path.read_bytes()).decode("ascii")
        return '%s="data:%s;base64,%s"' % (m.group(1), mime, b64)

    return re.sub(r'\b(src)="([^"]+)"', repl, html_text)


def build():
    for src_rel, out_rel in PAGES:
        src = ROOT / src_rel
        out = ROOT / out_rel
        html_text = src.read_text(encoding="utf-8")

        before = len(html_text)
        html_text = inline_images(html_text, src.parent)

        # une seule page, mais un titre explicite
        html_text = html_text.replace(
            "<head>", "<head>\n<!-- Fichier autonome généré par tools/build_offline.py -->", 1)

        # bandeau d'information avant </body>
        if "</body>" in html_text:
            html_text = html_text.replace("</body>", BANNER + "\n</body>", 1)

        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html_text, encoding="utf-8")
        print("%-58s %6.1f Ko  (%+d Ko d'images incluses)"
              % (out_rel, out.stat().st_size / 1024,
                 round((len(html_text) - before) / 1024)))


if __name__ == "__main__":
    build()
