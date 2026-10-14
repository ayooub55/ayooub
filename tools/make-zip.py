#!/usr/bin/env python3
"""Régénère telecharger/site-fmdc-s1.zip : copie autonome du site (sans telecharger/)."""
import os, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'telecharger', 'site-fmdc-s1.zip')

LISEZ_MOI = """FMDC S1 — Espace de révision (version hors ligne)
=================================================

1. Decompresse ce dossier ou tu veux (PC, cle USB, telephone).
2. Ouvre le fichier « index.html » avec ton navigateur (Chrome, Firefox, Safari...).

Ce que tu peux faire :
 - Lire les 22 fiches de cours (explications, tableaux, schemas, a retenir, pieges QCM)
 - Parcourir les 9 rubriques du Drive S1 et ouvrir chaque document (Internet requis pour les liens Drive)
 - Suivre ta revision, surligner, ecrire tes notes
 - Ajouter TES cours, TES exercices et TES photos (stockes dans le navigateur)
 - Exporter toutes tes donnees (bouton « Exporter mes donnees » en bas de page)

Les liens vers Google Drive ont besoin d'Internet ; tout le reste marche hors ligne.
Astuce : garde une copie du fichier JSON d'export a cote, il contient tes notes et tes photos.
"""


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('LISEZ-MOI.txt', LISEZ_MOI)
        for f in ('index.html', '.nojekyll'):
            fp = os.path.join(ROOT, f)
            if os.path.exists(fp):
                z.write(fp, f)
        for d in ('assets', 'data'):
            for name in sorted(os.listdir(os.path.join(ROOT, d))):
                fp = os.path.join(ROOT, d, name)
                if os.path.isfile(fp):
                    z.write(fp, '%s/%s' % (d, name))
        for rel in ('2024-2025/index.html',):
            z.write(os.path.join(ROOT, rel), rel)
        for d in ('assets', 'data'):
            base = os.path.join(ROOT, '2024-2025', d)
            for name in sorted(os.listdir(base)):
                fp = os.path.join(base, name)
                if os.path.isfile(fp):
                    z.write(fp, '2024-2025/%s/%s' % (d, name))
    print('OK ->', OUT, os.path.getsize(OUT), 'octets')


if __name__ == '__main__':
    main()
