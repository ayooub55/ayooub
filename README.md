# 🦷 FMDC · S1 — Espace de révision

Grand portail d’accueil (landing page) pour le **Semestre 1 de la 1ʳᵉ année de Médecine Dentaire —
FMDC Casablanca**. Il présente de façon lisible l’arborescence complète du **Drive officiel du S1** :
cours, résumés, QCM, TP, TP d’initiation, annales et examens des années précédentes — rangés
par module puis par professeur.

> Source des documents : [Drive S1](https://drive.google.com/drive/folders/1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK).
> Le portail ne copie aucun fichier : il les **référence** — chaque lien ouvre le document sur Google Drive.

Site **statique** (HTML / CSS / JS), sans build, sans dépendance, publié sur GitHub Pages.

---

## ✨ Ce que fait la page d’accueil

| | |
|---|---|
| 🏠 **Landing page** | Hero, chiffres clés (rubriques · documents · intervenants · sujets d’examens), accès rapides et cartes par rubrique. |
| 📚 **9 rubriques** | Anatomie & Physiologie · Biologie cellulaire/moléculaire & génétique · Biophysique & Sciences des matériaux · Chimie & Biochimie structurale · Initiation à la Médecine Dentaire · Examens 2025-2026 · Annales 2023 & 2024 · QCM des autres facultés (FMDR, UIASS, UIR, UPM) · Méthodologie (MTU). |
| 🗂️ **Arborescence complète** | Chaque rubrique se déplie en dossiers et sous-dossiers cliquables, avec pour chacun un lien « Ouvrir sur Drive ». |
| 🔍 **Recherche instantanée globale** | Cherche dans les noms de fichiers, les dossiers et les modules (accents ignorés). Raccourci clavier : `/`. |
| ✅ **Suivi de révision** | Cochez « révisé » sur chaque document → progression par rubrique et progression globale (barre dans le hero). |
| ⭐ **Favoris** | Étoilez les documents essentiels pour les retrouver dans l’onglet « Favoris ». |
| 🕓 **Transparence sur les dossiers vides** | Les dossiers du Drive encore vides sont affichés en pointillés « à venir » — rien n’est inventé. |
| 🌗 **Thème clair / sombre**, responsive mobile, navigation par URL (`#/m/biophysique`) | |

Tout l’état (progression, favoris, thème) est stocké **localement dans le navigateur** (`localStorage`) :
aucun serveur, aucun compte, aucune donnée envoyée.

## 🗂 Structure du dépôt

```
index.html                 page d’accueil « S1 » (landing + exploration)
assets/style.css           thème et mise en page
assets/app.js              application (routage, recherche, progression)
data/s1.js                 arborescence complète du Drive S1 (module → dossiers → fichiers)
2024-2025/index.html       ancien portail de la promo 2024-2025 (notes d’examen, formation S1→S12, liens)
2024-2025/assets/…         ses styles et scripts
2024-2025/data/…           ses données
.nojekyll                  désactive Jekyll sur GitHub Pages
.github/workflows/         déploiement automatique sur GitHub Pages
```

## 🚀 Lancer en local

Aucune installation. Un simple serveur statique suffit :

```bash
python3 -m http.server 8000      # puis http://localhost:8000
```

## ✏️ Mettre à jour le contenu

Tout le contenu est piloté par **`data/s1.js`** — aucune connaissance du reste du code n’est nécessaire.

**Ajouter un fichier** dans un dossier existant :

```js
{ nom: 'Nom du fichier.pdf', id: 'IDENTIFIANT_DRIVE' }
```

**Ajouter un dossier / une rubrique** : copier le schéma d’une entrée existante
(`{ nom, folder, fichiers: [ … ], enfants: [ … ] }`), où `folder` est l’identifiant du dossier Drive.

**Marquer un dossier comme vide** (en cours de remplissage) : `{ nom: 'Pr. X', folder: '…', vide: true }`.

Un identifiant se lit dans l’URL Drive :
`drive.google.com/drive/folders/`**`<ID>`** ou `drive.google.com/file/d/`**`<ID>`**`/view`.

Options par fichier : `type: 'image' | 'slides' | …` pour forcer l’icône/le libellé.

## 🌐 Déployer sur GitHub Pages

1. Fusionner la branche dans `main`.
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. Le workflow `.github/workflows/pages.yml` publie le site à chaque push sur `main`
   (URL : `https://<utilisateur>.github.io/ayooub/`).

## ⚠️ Rappels

- Les documents appartiennent à leurs auteurs (enseignants de la FMDC) et sont référencés tels quels ;
  ce dépôt n’est qu’un index d’organisation.
- Vérifiez que le partage du Drive reste ouvert aux étudiants de la promo, sinon les liens cesseront de fonctionner.
- Le portail de la promo **2024-2025** (notes d’examen par professeur, tableau de formation S1 → S12,
  liens utiles) reste accessible dans `2024-2025/`.
