# 🦷 S1 — Espace de révision

Landing page **statique** (HTML/CSS, sans build, sans JavaScript, sans dépendance) qui réunit
tous les cours du **Semestre 1 de première année de Médecine Dentaire** :
cours par professeur, résumés, QCM, TP et annales — chaque lien ouvrant directement
le bon dossier sur le Drive de la promo.

> Source des documents : [Drive S1 de la promo](https://drive.google.com/drive/folders/1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK).
> Le site ne copie aucun fichier : il les **référence** (chaque lien ouvre le document sur Google Drive).

## ✨ Contenu

| | |
|---|---|
| 🫀 **6 matières** | Anatomie & Physiologie · Biologie moléculaire, cellulaire & génétique · Biophysique & Sciences des matériaux · Chimie & Biochimie structurale · Initiation à la Médecine Dentaire · Méthodologie du travail universitaire |
| 👩‍🏫 **Focus sur les cours** | Chaque carte présente la matière (ce qui y est expliqué) puis ses dossiers de cours par professeur, ses résumés et ses QCM |
| 📝 **Examens** | Annales 2023, 2024 et sujets de la session 2025 |
| 🎓 **Ressources** | Dossier « Autres facs » (FMDR · UIASS · UIR · UPM) + PDF des modules de formation (S1 → S12) |
| 🌗 **Thème clair/sombre** | Suit automatiquement le réglage du système (`prefers-color-scheme`) — responsive mobile |

## 🗂 Structure du dépôt

```
index.html            page unique (HTML + CSS intégré — un seul fichier)
serve.py              petit serveur local optionnel pour l'aperçu
.nojekyll             désactive Jekyll sur GitHub Pages
.github/workflows/    déploiement GitHub Pages + CodeQL
```

## 🚀 Lancer en local

Aucune installation :

```bash
python3 -m http.server 8000      # puis http://localhost:8000
```

L'ouverture directe du fichier `index.html` fonctionne aussi.

## 🌐 Déployer sur GitHub Pages

1. Fusionner la branche dans `main`.
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. Le workflow `.github/workflows/pages.yml` publie le site à chaque push sur `main`.

## ✏️ Mettre à jour le contenu

Tout est dans `index.html` — aucun outil à connaître :

- **Ajouter un dossier / un lien** : copier un `<a class="chip" …>` existant et changer
  le texte + l'URL (`drive.google.com/drive/folders/<ID>` ou `drive.google.com/file/d/<ID>/view`).
- **Ajouter une matière** : copier un bloc `<article class="card">…</article>` de la
  section `#cours` et l'adapter (emoji, titre, description, chips, lien « Ouvrir »).
- Les identifiants sont visibles dans l'URL Drive :
  `drive.google.com/drive/folders/`**`<ID>`**.

## ⚠️ Rappels

- Les documents appartiennent à leurs auteurs (enseignants de la faculté) et sont
  référencés tels quels ; ce site n'est qu'un index d'organisation.
- Vérifiez que le partage du Drive reste ouvert à la promo, sinon les liens cesseront de fonctionner.
