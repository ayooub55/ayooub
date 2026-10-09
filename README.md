# 🦷 FMDC 1A — Espace de révision

Portail de révision **statique** (HTML/CSS/JS, sans build ni dépendance) qui rassemble et organise
tout le contenu du Drive de la **1ʳᵉ année de Médecine dentaire — FMDC Casablanca, promotion 2024-2025** :
cours, TD, TP, résumés, tutorats, vidéos, annales et QCM — rangés par module puis par professeur.

> Source des documents : [Drive de la promo](https://drive.google.com/drive/folders/1iDWJDPYVdb6iZuLTJ_ZOTdI2MgvFUra3).
> Le portail ne copie aucun fichier : il les **référence** (chaque lien ouvre le document sur Google Drive).

---

## ✨ Fonctionnalités

| | |
|---|---|
| 📚 **8 modules / 281 documents** | Anatomie & Physiologie, Biologie, Biophysique & Sciences des matériaux, Chimie & Biochimie, IMD, Langue, MTU, Links |
| 📖 **Cours expliqués** | Pages de révision commentées, section par section, à partir du support de cours officiel ([Biochimie structurale — Pr. Khlil](cours/biochimie-structurale.html)) |
| 👩‍🏫 **Vue par professeur** | Chaque module se déplie en rubriques (Pr. X → Cours / TD / Résumés / Vidéos…) |
| 🔍 **Recherche globale** | Accents ignorés, insensible à la casse — cherche dans les noms de fichiers **et** le chemin (module › professeur). Raccourci : `/` |
| 💡 **Notes d'examen** | Les conseils donnés par chaque professeur (chapitres insistés, parties retirées, format d'épreuve) transformés en fiches filtrables |
| ✅ **Suivi de révision** | Cochez « révisé » sur chaque document → barres de progression par module et progression globale |
| ⭐ **Favoris** | Étoilez les documents essentiels pour les retrouver dans « Mes favoris » |
| 🎓 **Formation S1 → S12** | Tableau officiel des modules de formation + liste des modules capitalisés |
| 🔗 **Liens utiles** | Chaîne YouTube `1A_FMDC`, playlists Physiologie / Biochimie, diagrammes, liens conseillés |
| 🌗 **Thème clair/sombre**, responsive mobile, navigation par URL (`#/m/anatomie`) | |

Tout l'état (progression, favoris, thème) est stocké **localement dans le navigateur** (`localStorage`) —
aucun serveur, aucun compte, aucune donnée envoyée.

## 🗂 Structure du dépôt

```
index.html                 page unique
assets/style.css           thème et mise en page
assets/app.js              application (routage, recherche, progression)
cours/                     pages « cours expliqués » (HTML autonomes, hors application)
data/00-base.js            métadonnées du portail
data/10-modules-a.js       modules 1 → 3
data/20-modules-b.js       modules 4 → 8
data/30-extra.js           notes d'examen, liens utiles, modules de formation
.nojekyll                  désactive Jekyll sur GitHub Pages
.github/workflows/         déploiement automatique sur GitHub Pages
```

## 🚀 Lancer en local

Aucune installation. Un simple serveur statique suffit (l'ouverture directe du fichier `index.html`
fonctionne aussi) :

```bash
python3 -m http.server 8000      # puis http://localhost:8000
```

## 🌐 Déployer sur GitHub Pages

1. Fusionner cette branche dans `main`.
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. Le workflow `.github/workflows/pages.yml` publie le site à chaque push sur `main`
   (URL : `https://<utilisateur>.github.io/ayooub/`).

## ✏️ Mettre à jour le contenu

Tout est piloté par les fichiers `data/*.js` — aucune connaissance du reste du code n'est nécessaire.

**Ajouter un fichier** dans une section existante :

```js
['Nom du fichier.pdf', 'IDENTIFIANT_DRIVE']   // l'identifiant est la partie de l'URL après /d/
```

**Ajouter une section / un professeur** : copier le schéma d'une entrée existante
(`{ nom, folder, sections: [ … ] }`), `folder` = identifiant du dossier Drive (« Ouvrir dans Drive »).

**Ajouter des conseils d'examen** : compléter `window.DRIVE.notes` dans `data/30-extra.js`
(`matiere`, `format`, puis des entrées `{ prof, tags, texte }`).

Les identifiants de dossiers et de fichiers sont visibles dans l'URL Drive :
`drive.google.com/drive/folders/`**`<ID>`** ou `drive.google.com/file/d/`**`<ID>`**`/view`.

## 📖 Cours expliqués

Le dossier `cours/` contient des pages de révision autonomes : chaque page reprend le **plan officiel**
d'un support de cours et l'explique section par section (ce qu'il faut comprendre, ce qu'il faut retenir,
les pièges de QCM), avec un lien direct vers le PDF d'origine.

Ces pages sont du HTML/CSS/JS **autonome** — un seul fichier, aucune dépendance, aucun build — et ne passent
pas par l'application du portail ; elles y sont simplement liées depuis la barre latérale (« Cours expliqués »).

| Page | Cours | Source |
|---|---|---|
| [`cours/biochimie-structurale.html`](cours/biochimie-structurale.html) | Biochimie structurale — Pr. Naima Khlil · Chap. 1 : acides aminés, ionisation et pHi, liaison peptidique, structures des protéines, hémoglobine (effet Bohr, 2,3-DPG) · Chap. 2 : enzymes, Michaelis-Menten et Lineweaver-Burk, inhibitions, allostérie, vitamines et coenzymes — + tableau des chiffres à retenir et auto-évaluation de 10 QCM corrigés | Support de cours 2024-25, 71 p. |

**Ajouter une page** : copier `cours/biochimie-structurale.html`, remplacer le contenu, puis ajouter une entrée
dans le bloc « Cours expliqués » de la barre latérale d'`index.html` et dans le tableau ci-dessus.

> Les passages cités entre guillemets sont repris du support de l'enseignante ; le reste est une explication
> rédigée pour la révision. Les diaporamas de plus de 25 Mo n'ont pas pu être lus automatiquement : se référer
> au support écrit pour le contenu intégral.

## 🤝 Contribution

Les modules des semestres suivants (S2 → S12) peuvent être ajoutés de la même façon :
créer un fichier `data/40-semestre-2.js` sur le modèle des fichiers existants, puis l'inclure dans
`index.html` avant `assets/app.js`.

## ⚠️ Rappels

- Les documents appartiennent à leurs auteurs (enseignants de la FMDC) et sont référencés tels quels ;
  ce dépôt n'est qu'un index d'organisation.
- Les « Notes d'examen » sont les notes partagées par la promotion : à confronter toujours aux
  annonces officielles de la faculté.
- Vérifiez que le partage du Drive reste ouvert à la promo, sinon les liens cesseront de fonctionner.
