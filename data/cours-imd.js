/* ------------------------------------------------------------------
   FICHES DE COURS — Initiation à la Médecine Dentaire (IMD) & pathologies
   Chaque fiche = un cours du Drive : explications, tableaux, schémas.
   ------------------------------------------------------------------ */

window.FICHES = (window.FICHES || []).concat([

/* ================================ 1 ================================ */
{
  id: 'imd-intro',
  doc: '1b3XGgACdCuwbyhDyAXtvIhDJ9lrXe1RN',
  module: 'imd', emoji: '🦷', duree: 20,
  titre: 'Introduction à la médecine dentaire',
  prof: 'Pr. Sana Bensouda',
  sousTitre: 'Qu’est-ce que l’odontologie ? La santé bucco-dentaire dans le monde',
  resume: 'Le cours pose les bases : ce qu’est la médecine dentaire, ce que veut dire « être en bonne santé bucco-dentaire » selon l’OMS, et l’ampleur mondiale des affections bucco-dentaires.',
  objectifs: [
    'Définir la médecine dentaire et ses objectifs',
    'Connaître la définition OMS de la santé bucco-dentaire',
    'Retenir les grands chiffres épidémiologiques',
    'Relier les maladies bucco-dentaires aux maladies non transmissibles (MNT)'
  ],
  sections: [
    { id: 'def', titre: 'La médecine dentaire, c’est quoi ?', html: `
      <p>La <b>médecine dentaire</b> (ou <b>odontologie</b>) est une branche médicale qui s’occupe de la <b>prévention</b>, du <b>diagnostic</b> et du <b>traitement</b> des maladies bucco-dentaires. Elle joue un rôle essentiel dans la santé globale en s’occupant des dents, des gencives et de toute la cavité orale.</p>
      <table>
        <tr><th>Ses grands objectifs</th><th>Concrètement</th></tr>
        <tr><td>Prévention des caries</td><td>Hygiène, fluor, scellements, alimentation</td></tr>
        <tr><td>Réhabilitation orale complète</td><td>Soins conservateurs, prothèses, implants</td></tr>
        <tr><td>Chirurgie</td><td>Extractions, chirurgie orale et maxillo-faciale</td></tr>
        <tr><td>Dentisterie esthétique</td><td>Forme, couleur, sourire</td></tr>
      </table>
      <p class="mt">Cette approche est <b>multidisciplinaire</b> : soins + enseignement + recherche, au service de la santé publique et du bien-être du patient.</p>` },

    { id: 'oms', titre: 'La définition de l’OMS', html: `
      <div class="quote">« La santé bucco-dentaire est essentielle pour l’état général et la qualité de la vie. Elle se caractérise par l’absence de douleur buccale ou faciale, de cancer buccal ou pharyngé, d’infection ou de lésion buccale, de parodontopathie, de déchaussement et perte de dents, et d’autres maladies et troubles qui limitent la capacité de mordre, mâcher, sourire et parler d’une personne, et donc son bien-être psychosocial. »<span>OMS</span></div>
      <p class="mt">À retenir : la santé bucco-dentaire n’est pas seulement « ne pas avoir mal aux dents » — elle touche <b>manger, parler, sourire</b> et donc la qualité de vie.</p>` },

    { id: 'chiffres', titre: 'Les chiffres clés (à connaître)', html: `
      <table>
        <tr><th>Donnée</th><th>Chiffre</th></tr>
        <tr><td>Personnes concernées par une affection bucco-dentaire</td><td>≈ <b>3,58 milliards</b> (la moitié de la population mondiale)</td></tr>
        <tr><td>Caries des dents définitives</td><td>≈ <b>2,4 milliards</b> de personnes</td></tr>
        <tr><td>Caries des dents de lait (enfants)</td><td>≈ <b>486 millions</b> d’enfants</td></tr>
        <tr><td>Maladies parodontales</td><td><b>11<sup>e</sup> rang</b> des maladies les plus répandues (2016)</td></tr>
        <tr><td>Traumatismes dentaires</td><td>prévalence mondiale ≈ <b>20 %</b></td></tr>
        <tr><td>Coût des traitements dentaires</td><td><b>5 %</b> des dépenses de santé ; <b>20 %</b> à la charge des patients (pays à haut revenu)</td></tr>
        <tr><td>Cancer de la bouche</td><td>≈ 4 cas / 100 000 personnes ; plus fréquent en Asie-Pacifique</td></tr>
      </table>
      <p class="mt">L’édentation fait partie des <b>dix premières causes d’années de vie vécues avec un handicap</b> dans certains pays à haut revenu.</p>` },

    { id: 'mnt', titre: 'Facteurs de risque communs avec les MNT', html: `
      <p>Les affections bucco-dentaires partagent les mêmes <b>facteurs de risque modifiables</b> que les 4 grandes maladies non transmissibles :</p>
      <pre class="sch">        Facteurs communs
   ┌─────────────┬─────────────┐
   │ Alimentation│  Tabagisme  │
   │  (sucres)   │             │
   ├─────────────┼─────────────┤
   │   Alcool    │  Hygiène    │
   │             │insuffisante │
   └──────┬──────┴──────┬──────┘
          ▼             ▼
  Maladies bucco-  4 MNT : cardiovasculaires,
  dentaires         cancers, respiratoires, diabète</pre>
      <p><b>Conséquence pratique :</b> agir sur ces facteurs protège à la fois la bouche <i>et</i> le reste du corps.</p>` },

    { id: 'inegalites', titre: 'Inégalités et déterminants sociaux', html: `
      <p>La prévalence varie selon la <b>région</b>, l’<b>accès aux soins</b> et le <b>niveau socio-économique</b>. Les affections bucco-dentaires touchent de façon disproportionnée les populations pauvres et défavorisées.</p>
      <p>L’OMS parle de <b>couverture sanitaire universelle</b> : toutes les personnes doivent bénéficier des services de santé nécessaires <b>sans difficultés financières</b>.</p>` }
  ],
  retenir: [
    'Odontologie = prévention + diagnostic + traitement des maladies bucco-dentaires.',
    'La santé bucco-dentaire fait partie de la santé générale (définition OMS).',
    '3,58 milliards de personnes concernées dans le monde.',
    'Mêmes facteurs de risque que les 4 MNT : sucres, tabac, alcool, hygiène.',
    'Les déterminants sociaux créent de fortes inégalités de santé bucco-dentaire.'
  ],
  pieges: [
    'Ne pas confondre « carie » et « cavité » : la cavité est un stade avancé de la maladie.',
    'Les 4 MNT : cardio-vasculaires, cancers, respiratoires chroniques, diabète (pas « obésité »).'
  ]
},

/* ================================ 2 ================================ */
{
  id: 'imd-nomenclature',
  doc: '1hn4P-fnDG-6c_puaTcTItOflXa4Aq1XJ',
  module: 'imd', emoji: '🔢', duree: 25,
  titre: 'Nomenclature & terminologie des dents',
  prof: 'Pr. Sana Bensouda',
  sousTitre: 'Compter, nommer et décrire une dent — Palmer, FDI/OMS, anatomie descriptive',
  resume: 'Comment décrire une dent : arcades, formules dentaires, les 3 systèmes de nomenclature (Palmer, stomatologique, OMS) et le vocabulaire de l’anatomie descriptive (cuspides, crêtes, sillons, fosses…).',
  objectifs: [
    'Écrire les formules dentaires temporaire, permanente et mixte',
    'Utiliser les nomenclatures de Palmer, stomatologique et OMS',
    'Décrire une couronne : éminences et dépressions',
    'Nommer une dent complètement (type + denture + arcade + côté)'
  ],
  sections: [
    { id: 'arcades', titre: 'Arcades et hémi-arcades', html: `
      <p>Les dents sont réparties sur <b>2 arcades</b> : <b>maxillaire</b> (supérieure) et <b>mandibulaire</b> (inférieure). Chaque arcade est divisée par le plan sagittal médian en <b>2 hémi-arcades</b> (droite et gauche) → <b>symétrie bilatérale</b> en image.</p>
      <pre class="sch">        HÉMI-ARCADES (vue de face)
   1.8 1.7 1.6 1.5 1.4 1.3 1.2 1.1 | 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8
   ─────────────── MAXILLAIRE ─────┼───────────── MAXILLAIRE ────────
   ────────────── MANDIBULE ───────┼────────────── MANDIBULE ────────
   4.8 4.7 4.6 4.5 4.4 4.3 4.2 4.1 | 3.1 3.2 3.3 3.4 3.5 3.6 3.7 3.8
   (droite du patient)             (gauche du patient)
   Faces : vestibulaire (labiale/jugale) · linguale · mésiale · distale · occlusale</pre>` },

    { id: 'formules', titre: 'Les formules dentaires', html: `
      <table>
        <tr><th>Denture</th><th>Formule</th><th>Total</th><th>Âge</th></tr>
        <tr><td><b>Temporaire</b> (lait)</td><td>2i 1c 2m / hémi-arcade</td><td><b>20 dents</b></td><td>6 mois → 30 mois</td></tr>
        <tr><td><b>Permanente</b></td><td>2I 1C 2PM 3M / hémi-arcade</td><td><b>32 dents</b></td><td>à partir de 6 ans</td></tr>
        <tr><td><b>Mixte</b></td><td>temporaires + permanentes coexistent</td><td>—</td><td>6 → 10-11 ans</td></tr>
      </table>
      <p class="mt"><b>Exemple de formule mixte</b> (enfant de 8 ans) : 2I 1c 2m — incisives et 1<sup>re</sup> molaires déjà définitives.</p>` },

    { id: 'palmer', titre: 'Nomenclature de Palmer', html: `
      <p>Deux dispositifs combinés : <b>un chiffre</b> (numéro d’ordre) + <b>un demi-cadre</b> (l’hémi-arcade).</p>
      <table>
        <tr><th></th><th>Dents permanentes</th><th>Dents temporaires</th></tr>
        <tr><td>Numérotation</td><td>chiffres <b>arabes 1 → 8</b></td><td>chiffres <b>romains I → V</b></td></tr>
        <tr><td>1 (=I)</td><td>incisive centrale</td><td>incisive centrale</td></tr>
        <tr><td>2 (=II)</td><td>incisive latérale</td><td>incisive latérale</td></tr>
        <tr><td>3 (=III)</td><td>canine</td><td>canine</td></tr>
        <tr><td>4 (=IV)</td><td>1<sup>re</sup> prémolaire</td><td>1<sup>re</sup> molaire temporaire</td></tr>
        <tr><td>5 (=V)</td><td>2<sup>e</sup> prémolaire</td><td>2<sup>e</sup> molaire temporaire</td></tr>
        <tr><td>6, 7, 8</td><td>1<sup>re</sup>, 2<sup>e</sup>, 3<sup>e</sup> molaire</td><td>—</td></tr>
      </table>
      <pre class="sch">Le demi-cadre schématise l'hémi-arcade :

        ┌──┐ | ┌──┐           Exemples :
        │  │ | │  │            3  = canine permanente inférieure droite
        └──┘ | └──┘            V  = 2e molaire temporaire inférieure gauche
   sup. droite | sup. gauche
   --------------------------
   inf. droite | inf. gauche</pre>` },

    { id: 'oms', titre: 'Nomenclature OMS (FDI) — la plus utilisée', html: `
      <p>Repérage par <b>2 chiffres</b> : le 1<sup>er</sup> = quadrant (1 → 4 permanentes, 5 → 8 temporaires), le 2<sup>e</sup> = numéro d’ordre de la dent (1 → 8).</p>
      <table>
        <tr><th>Quadrant</th><th>Localisation</th><th>Exemple</th></tr>
        <tr><td><b>1</b></td><td>maxillaire droit</td><td>1.1 = incisive centrale supérieure droite</td></tr>
        <tr><td><b>2</b></td><td>maxillaire gauche</td><td>2.6 = 1<sup>re</sup> molaire supérieure gauche</td></tr>
        <tr><td><b>3</b></td><td>mandibulaire gauche</td><td>3.3 = canine inférieure gauche</td></tr>
        <tr><td><b>4</b></td><td>mandibulaire droit</td><td>4.8 = dent de sagesse inférieure droite</td></tr>
        <tr><td><b>5 → 8</b></td><td>les 4 quadrants de la <b>denture temporaire</b></td><td>5.1 = incisive centrale temporaire sup. droite</td></tr>
      </table>
      <p class="mt">C’est la nomenclature des <b>études épidémiologiques</b> : elle est universelle et n’utilise que des chiffres.</p>` },

    { id: 'descriptive', titre: 'Anatomie descriptive : le vocabulaire (Black)', html: `
      <p>La couronne possède <b>4 faces visibles + un bord libre</b> (incisives/canines) ou <b>5 faces</b> (prémolaires/molaires, avec la face occlusale).</p>
      <table>
        <tr><th>Catégorie</th><th>Élément</th><th>C’est quoi</th></tr>
        <tr><td rowspan="3"><b>Éminences</b></td><td>Cuspides (1 → 5/dent)</td><td>Élévations de la face occlusale</td></tr>
        <tr><td>Tubercules</td><td>Élévations sur les autres faces (cingulum, tubercule de Carabelli)</td></tr>
        <tr><td>Crêtes</td><td>Crêtes marginales, cuspidiennes, occlusales (alignement des arêtes)</td></tr>
        <tr><td rowspan="4"><b>Dépressions</b></td><td>Sillons</td><td>Dépressions longitudinales (principaux/intercuspidiens, secondaires)</td></tr>
        <tr><td>Fissures</td><td>Sillons très profonds, étroits, creusés dans l’émail → zone à risque carieux</td></tr>
        <tr><td>Fosses</td><td>Centrales (2 sillons principaux) ou marginales — faces occlusales</td></tr>
        <tr><td>Fossettes</td><td>Dépressions marquées sur faces vestibulaires ou linguales</td></tr>
      </table>
      <p class="mt"><b>Nommer une dent complètement</b> = nom + temporaire/permanente + maxillaire/mandibulaire + supérieure/inférieure + droite/gauche. Ex. : « incisive centrale temporaire maxillaire supérieure droite ».</p>` }
  ],
  retenir: [
    'Temporaire : 20 dents (2i 1c 2m) — Permanente : 32 dents (2I 1C 2PM 3M).',
    'Palmer : chiffre arabe (permanentes) ou romain (temporaires) + ½ cadre.',
    'OMS/FDI : 2 chiffres → quadrant + dent (1.1 → 4.8 ; 5.1 → 8.5 pour le temporaire).',
    'Fissure = sillon profond dans l’émail (piège à carie) ; fosse = sur la face occlusale.',
    'Cuspides : de 1 à 5 par dent.'
  ],
  pieges: [
    'Chez l’enfant de 8 ans la denture est MIXTE, pas temporaire.',
    'La nomenclature stomatologique place la lettre AVANT le chiffre ; Palmer utilise un demi-cadre.',
    'En OMS, quadrant 2 = en haut à GAUCHE du patient (pas à droite).'
  ]
},

/* ================================ 3 ================================ */
{
  id: 'imd-organe-dentaire',
  doc: '1bwNX6V6WgMo8fdLKedskKlfhc-yRFk9T',
  module: 'imd', emoji: '🦴', duree: 25,
  titre: 'L’organe dentaire : dent et parodonte',
  prof: 'Pr. Sana Bensouda',
  sousTitre: 'Dentition, dentures, chronologie d’éruption et tissus de soutien',
  resume: 'Le cours décrit ce qu’est une dent (couronne, racine, collet), les 3 dentures de l’homme, la chronologie d’éruption, et le parodonte qui attache la dent à l’os.',
  objectifs: [
    'Différencier dentition (dynamique) et denture (statique)',
    'Connaître les 3 dentures et les dents successionnelles / accessionnelles',
    'Retenir la chronologie d’éruption',
    'Citer les tissus de la dent et du parodonte'
  ],
  sections: [
    { id: 'dentition', titre: 'Dentition vs denture', html: `
      <table>
        <tr><th>Denture</th><th>Dentition</th></tr>
        <tr><td>Ensemble des dents présentes dans la cavité buccale → <b>état statique</b></td><td>Ensemble des phénomènes de développement des arcades → <b>dynamique</b> (origine, minéralisation, croissance, éruption, vieillissement, remplacement)</td></tr>
      </table>
      <p class="mt">L’homme est <b>diphyodonte</b> : il a <b>2 dentitions</b> et <b>3 dentures</b> (temporaire, mixte, permanente).</p>
      <table>
        <tr><th>Denture</th><th>Âge</th><th>Contenu</th></tr>
        <tr><td>Temporaire (lactéale, de lait, caduque, déciduale)</td><td>6 mois → 30 mois</td><td>20 dents : 2i 1c 2m × 4</td></tr>
        <tr><td>Mixte</td><td>6 → 10-11 ans</td><td>Temporaires + permanentes</td></tr>
        <tr><td>Permanente</td><td>à partir de la chute de la dernière temporaire</td><td>32 dents : 2I 1C 2PM 3M × 4</td></tr>
      </table>` },

    { id: 'lames', titre: '1ʳᵉ et 2ᵉ lame dentaire (Baume)', html: `
      <pre class="sch">1ère lame dentaire ──► 20 dents temporaires
                   └──► 12 molaires permanentes  = dents ACCESSIONNELLES
                        (molaires monophysaires, sans prédécesseur)

2ème lame dentaire ──► 20 dents de remplacement = dents SUCCESSIONNELLES
                        (dents diphysaires : incisives, canines, prémolaires)</pre>
      <p>Un adulte = 8 incisives + 4 canines + 8 prémolaires + 12 molaires = <b>32 dents</b>.</p>` },

    { id: 'chrono', titre: 'Chronologie d’éruption (à mémoriser)', html: `
      <table>
        <tr><th>Âge</th><th>Ce qui se passe</th></tr>
        <tr><td>6 mois → 30 mois</td><td>Denture temporaire complète (20 dents)</td></tr>
        <tr><td><b>6-8 ans</b></td><td><b>1<sup>re</sup> molaire permanente</b> (« dent de 6 ans ») + incisives définitives</td></tr>
        <tr><td>7-9 ans</td><td>Incisives latérales définitives</td></tr>
        <tr><td>9-12 ans</td><td>1<sup>res</sup> et 2<sup>es</sup> prémolaires</td></tr>
        <tr><td>10-12 ans</td><td>Canines définitives</td></tr>
        <tr><td>11-13 ans</td><td>2<sup>e</sup> molaire (« dent de 12 ans »)</td></tr>
        <tr><td>15-18 ans</td><td>3<sup>e</sup> molaire (dent de sagesse)</td></tr>
      </table>
      <p class="mt">Ordre d’éruption temporaire (maxillaire) : incisive centrale 8-12 mois → latérale 9-13 → 1<sup>re</sup> molaire 16-22 → canine 13-19 → 2<sup>e</sup> molaire 25-33 mois.</p>` },

    { id: 'tissus', titre: 'Les tissus de la dent et du parodonte', html: `
      <pre class="sch">            COURONNE            |   COLLET   |      RACINE
   ┌────────────────────────┐   |  (jonction |  ┌──────────────┐
   │  ÉMAIL (très minéralisé)│   | couronne / |  │  CÉMENT      │
   │  ──────────────────────│   |  racine,   |  │  ──────────  │
   │  DENTINE (corp de la dent)  |  ligne     |  │  DENTINE     │
   │        CANAL / PULPE    │   |  sinueuse) |  │  PULPE radic.│
   └────────────────────────┘   |            |  └──────────────┘
        Émail + dentine + cément = TISSUS CALCIFIÉS
        Pulpe = tissu conjonctif mou spécialisé (nerfs + vaisseaux)</pre>
      <table>
        <tr><th>Parodonte (ce qui « soutient » la dent)</th><th>Rôle</th></tr>
        <tr><td>Gencive</td><td>Protection</td></tr>
        <tr><td>Os alvéolaire</td><td>Rigidité, fixe les fibres du ligament</td></tr>
        <tr><td>Ligament alvéolo-dentaire (desmodonte)</td><td>Lie la dent à l’alvéole (amortisseur)</td></tr>
        <tr><td>Cément</td><td>Fixe la dent à la gencive (par les fibres)</td></tr>
      </table>
      <p class="mt"><b>Collet</b> = jonction couronne/racine (émail–cément), décrite comme une <b>ligne sinueuse</b>.</p>` }
  ],
  retenir: [
    'Denture = statique ; dentition = dynamique (le développement).',
    'Diphyodonte : 2 dentitions, 3 dentures (temporaire, mixte, permanente).',
    '20 dents successionnelles (2ᵉ lame) + 12 accessionnelles (1ʳᵉ lame) = 32.',
    'Dent de 6 ans = 1ʳᵉ molaire permanente ; dent de 12 ans = 2ᵉ molaire.',
    'Parodonte = gencive + os alvéolaire + ligament + cément.'
  ],
  pieges: [
    'Les prémolaires n’existent PAS en denture temporaire (remplacées par les molaires de lait).',
    'Le cément n’existe que sur la racine ; l’émail seulement sur la couronne.',
    'La 1ʳᵉ molaire permanente n’a pas de prédécesseur temporaire (dent accessionnelle).'
  ]
},

/* ================================ 4 ================================ */
{
  id: 'imd-cavite-buccale',
  doc: '11HS-qnysvuNK2NUjN1HfdZT0BmNJ7zIK',
  module: 'imd', emoji: '👄', duree: 25,
  titre: 'La cavité buccale',
  prof: 'Pr. Sana Bensouda',
  sousTitre: 'Limites, contenu, langue, palais, glandes salivaires et fonctions',
  resume: 'La cavité buccale est la première partie du tube digestif : on y décrit les limites, les orifices, le contenu (arcades, vestibule, cavité propre), la langue, le palais et les fonctions (mastication, déglutition, phonation…).',
  objectifs: [
    'Décrire les limites et orifices de la cavité buccale',
    'Distinguer vestibule et cavité buccale propre',
    'Décrire la langue, le palais, les freins',
    'Citer les fonctions de la cavité buccale'
  ],
  sections: [
    { id: 'general', titre: 'Généralités et limites', html: `
      <p>La cavité buccale est la <b>1<sup>re</sup> partie du tube digestif</b>. Sa forme est grossièrement <b>ovalaire</b> ; elle possède <b>2 orifices</b> et plusieurs faces.</p>
      <table>
        <tr><th>Limite</th><th>Élément anatomique</th></tr>
        <tr><td>En avant</td><td>Lèvres supérieure et inférieure</td></tr>
        <tr><td>Latéralement</td><td>Joues</td></tr>
        <tr><td>En bas</td><td>Langue et région sublinguale (plancher)</td></tr>
        <tr><td>En haut</td><td>Palais : dur (osseux) et mou (voile + luette + piliers + amygdales palatines)</td></tr>
      </table>
      <p class="mt"><b>Orifice antérieur</b> = orifice buccal (communique avec l’extérieur, limité par les lèvres). <b>Orifice postérieur</b> = <b>isthme du gosier</b> (limité par le voile, les piliers antérieurs et la face dorsale de la langue).</p>` },

    { id: 'contenu', titre: 'Contenu : vestibule et cavité propre', html: `
      <pre class="sch">   LÈVRES / JOUES
   ───────────────┐
   VESTIBULE (fer à cheval)   │  ← entre arcades et lèvres/joues
   ───────────────┐           │     tapissé de muqueuse libre et attachée
   ARCADES        │           │     séparées par la LIGNE MUCO-GINGIVALE
   DENTAIRES      │           │
   ───────────────┘           │
   CAVITÉ BUCCALE PROPRE      │  ← contient la LANGUE, surmontée par le PALAIS
                              │     forme variable (ouverture/fermeture)</pre>
      <table>
        <tr><th>Structure</th><th>À retenir</th></tr>
        <tr><td>Vestibule</td><td>Espace en fer à cheval ; droit et gauche se rejoignent en avant (frein médian) ; communique avec la cavité propre <b>derrière la dernière dent</b></td></tr>
        <tr><td>Gencive libre / attachée</td><td>Séparées par la ligne muco-gingivale</td></tr>
        <tr><td>Freins</td><td>Replis muqueux : frein labial médian sup./inf., frein lingual</td></tr>
        <tr><td>Espace interdentaire</td><td>Contient le septum alvéolaire ; points de contact entre dents voisines</td></tr>
      </table>` },

    { id: 'langue', titre: 'La langue', html: `
      <table>
        <tr><th>Partie</th><th>Description</th></tr>
        <tr><td>Antérieure (mobile)</td><td>Évolue dans la cavité buccale, très grande mobilité</td></tr>
        <tr><td>Postérieure (base/racine)</td><td>Fixe, surface très irrégulière (tonsille linguale)</td></tr>
        <tr><td>Face supérieure (dorsale)</td><td>Séparée en 2 par le <b>V lingual</b>, recouverte de <b>papilles</b> (caliciformes en avant du V)</td></tr>
        <tr><td>Face inférieure</td><td>Muqueuse lisse et fine ; <b>frein lingual</b>, pli frangé, caroncule sublinguale (orifice du conduit submandibulaire)</td></tr>
        <tr><td>Bords</td><td>S’amincissent de l’arrière vers l’avant</td></tr>
      </table>
      <p class="mt">Ensemble de muscles <b>très puissants</b> (mobilité, mastication, déglutition, phonation).</p>` },

    { id: 'palais', titre: 'Le palais', html: `
      <p>La voûte palatine est limitée par les <b>arcades</b> et le <b>voile</b> ; elle est <b>concave dans tous les sens</b>.</p>
      <table>
        <tr><th>Repères</th><th>Détails</th></tr>
        <tr><td>Raphé médian</td><td>Suture médiane du palais dur</td></tr>
        <tr><td>Tubercule palatin</td><td>En avant, derrière les incisives</td></tr>
        <tr><td>Crêtes palatines</td><td>Reliefs transversaux antérieurs</td></tr>
        <tr><td>Canaux</td><td>Canal incisif (palatin antérieur), grand palatin, palatins accessoires</td></tr>
      </table>` },

    { id: 'glandes', titre: 'Glandes salivaires et fonctions', html: `
      <table>
        <tr><th>Glande</th><th>Part de la production</th></tr>
        <tr><td>Parotides</td><td>≈ 30 %</td></tr>
        <tr><td>Sous-maxillaires</td><td>≈ <b>65 %</b></td></tr>
        <tr><td>Sublinguales</td><td>≈ 5 %</td></tr>
      </table>
      <p class="mt">Les glandes majeures se drainent dans la cavité buccale (papille parotidienne, caroncule sublinguale…).</p>
      <div class="keys"><b>Les 6 fonctions de la cavité buccale</b> : ① mastication ② déglutition ③ phonation ④ esthétique ⑤ gustation ⑥ salivation.</div>` }
  ],
  retenir: [
    'Orifice postérieur = isthme du gosier.',
    'Vestibule = fer à cheval entre lèvres/joues et arcades ; communique avec la cavité propre derrière la dernière dent.',
    'Le V lingual sépare la langue mobile de sa base fixe.',
    'Glandes : sous-maxillaires 65 % > parotides 30 % > sublinguales 5 %.',
    '6 fonctions : mastication, déglutition, phonation, esthétique, gustation, salivation.'
  ],
  pieges: [
    'Ne pas confondre gencive libre (autour de la dent) et gencive attachée (séparées par la ligne muco-gingivale).',
    'Le frein lingual est sur la FACE INFÉRIEURE de la langue.'
  ]
},

/* ================================ 5 ================================ */
{
  id: 'imd-incisive',
  doc: '1yw8IY9P-y1Rcz2E4yrtuPZZOo1R0mhu5',
  module: 'imd', emoji: '🦷', duree: 25,
  titre: 'Anatomie de l’incisive permanente',
  prof: 'Pr. Sana Bensouda',
  sousTitre: 'Morphologie de l’incisive centrale supérieure : 5 vues et mensurations',
  resume: 'Étude détaillée du groupe incisif : caractères communs, différences entre arcades, chronologie, mensurations et description de l’incisive centrale supérieure dans les 5 vues.',
  objectifs: [
    'Citer les caractères communs du groupe incisif',
    'Comparer incisives supérieures et inférieures',
    'Connaître la chronologie de l’incisive centrale supérieure',
    'Décrire les 5 vues de l’incisive centrale supérieure'
  ],
  sections: [
    { id: 'general', titre: 'Généralités', html: `
      <table>
        <tr><th>Caractère</th><th>Valeur</th></tr>
        <tr><td>Nombre</td><td>2 par hémi-arcade → <b>8 incisives</b></td></tr>
        <tr><td>Situation</td><td>De part et d’autre du plan sagittal médian (centrale + latérale)</td></tr>
        <tr><td>Éruption</td><td>7-8 ans (définitives)</td></tr>
        <tr><td>Groupe</td><td>Avec les canines : groupe <b>antérieur incisivo-canin</b></td></tr>
        <tr><td>Fonctions</td><td>Expression, esthétique, soutien des lèvres et tissus oro-faciaux</td></tr>
      </table>` },

    { id: 'commun', titre: 'Caractères communs et différences par arcade', html: `
      <div class="keys"><b>Communs au groupe incisif</b> : monoradiculées (racine conique) · forme cunéiforme en vue proximale · bord libre au rôle sectoriel · incisures occlusales à l’éruption · bourrelet cingulaire cervical convexe (face linguale) · crêtes marginales convexes en mésio-distal, concaves en vestibulo-lingual.</div>
      <table>
        <tr><th>Comparaison</th><th>Règle</th></tr>
        <tr><td>Latérale supérieure</td><td><b>Plus petite</b> que la centrale supérieure</td></tr>
        <tr><td>Latérale inférieure</td><td><b>Plus grande</b> que la centrale inférieure</td></tr>
        <tr><td>Supérieures vs inférieures</td><td>Supérieures plus grandes dans tous les sens</td></tr>
        <tr><td>Incisives maxillaires</td><td>Diamètre M-D &gt; diamètre V-L</td></tr>
        <tr><td>Incisives mandibulaires</td><td>Diamètre V-L &gt; diamètre M-D (morphologie estompée ; premières dents permanentes à apparaître)</td></tr>
      </table>` },

    { id: 'chrono', titre: 'Chronologie de l’incisive centrale supérieure', html: `
      <table>
        <tr><th>Étape</th><th>Âge</th></tr>
        <tr><td>Début de calcification</td><td>3-4 mois</td></tr>
        <tr><td>Couronne achevée</td><td>4-5 ans</td></tr>
        <tr><td>Éruption</td><td><b>7-8 ans</b></td></tr>
        <tr><td>Racine achevée</td><td>10 ans</td></tr>
      </table>` },

    { id: 'mesures', titre: 'Mensurations moyennes', html: `
      <table>
        <tr><th>Mesure</th><th>Valeur</th></tr>
        <tr><td>Hauteur totale</td><td>23,5 mm</td></tr>
        <tr><td>Hauteur couronne / racine</td><td>10,5 mm / 13 mm</td></tr>
        <tr><td>Diamètre M-D coronaire / cervical</td><td>8,5 mm / 7 mm</td></tr>
        <tr><td>Diamètre V-L coronaire / cervical</td><td>7 mm / 6 mm</td></tr>
      </table>` },

    { id: 'vues', titre: 'Description dans les 5 vues', html: `
      <table>
        <tr><th>Vue</th><th>Points clés</th></tr>
        <tr><td><b>Vestibulaire</b></td><td>Contour mésial légèrement convexe (point de contact près du bord libre) ; contour distal convexe (sommet au ¼-⅕ occlusal) ; contour cervical = ½ cercle à concavité occlusale ; bord libre rectiligne qui se relève en distal ; face fortement convexe au ⅓ cervical, 2 dépressions → 3 lobes</td></tr>
        <tr><td><b>Linguale</b></td><td>Contours inversés ; crêtes marginales se rejoignent au cingulum ; <b>fosse linguale en forme de pelle</b> ; face plus étroite que la vestibulaire (coupe horizontale triangulaire)</td></tr>
        <tr><td><b>Mésiale</b></td><td>Couronne cunéiforme ; contour vestibulaire convexe avec maximum au ⅓ cervical ; contour lingual en <b>S</b> (convexe au cingulum, concave dans les ⅔ occlusaux) ; bord incisif arrondi puis biseauté ; axe rectiligne apex ↔ bord libre</td></tr>
        <tr><td><b>Distale</b></td><td>Pas de différence fondamentale ; concavité du collet plus importante en mésial ; point de contact distal plus <b>cervical</b></td></tr>
        <tr><td><b>Occlusale</b></td><td>Ligne de plus grand contour divisée par le bord libre ; flanc vestibulaire régulièrement convexe ; flanc lingual = contour des crêtes marginales ; sommet du cingulum distalé</td></tr>
      </table>
      <pre class="sch">      VUE VESTIBULAIRE              VUE MÉSIALE
         ╭──────╮                  ▓▓▓▓  ← vestibulaire (bombé 1/3 cervical)
        ╱        ╲                 ▓▓▓▓
       │  lobe lobe│  bord libre    ▓▓  ← collet (courbe à concavité RADICULAIRE)
       │   lobe    │               ░░░░  S lingual (cingulum convexe)
       ╰──┬────┬───╯               ░░░░
       M-D : point de contact près du bord libre</pre>` }
  ],
  retenir: [
    '8 incisives ; éruption définitive 7-8 ans ; racine achevée à 10 ans.',
    'Latérale supérieure plus petite ; latérale inférieure plus grande.',
    'Incisives maxillaires : M-D > V-L ; mandibulaires : V-L > M-D.',
    'ICS : 23,5 mm de hauteur totale (couronne 10,5 / racine 13).',
    'Face linguale = fosse en pelle avec cingulum cervical.'
  ],
  pieges: [
    'Point de contact mésial proche du bord libre, distal plus cervical.',
    'Le collet : concavité côté radiculaire (pas occlusale).'
  ]
},

/* ================================ 6 ================================ */
{
  id: 'imd-pathologies',
  doc: '1WKZzJ9FJPtX-IeFVvUFmMZQenQyhk6Bg',
  module: 'imd', emoji: '🩺', duree: 20,
  titre: 'Les pathologies bucco-dentaires',
  prof: 'Pr. Badre',
  sousTitre: 'Panorama des grandes catégories de maladies de la cavité buccale',
  resume: 'Vue d’ensemble : ce qu’on appelle « pathologie bucco-dentaire », les grandes catégories (dentaires, pulpaires, parodontales, muqueuses, tumorales…) et les facteurs de risque généraux.',
  objectifs: [
    'Définir une pathologie bucco-dentaire',
    'Citer les principales catégories de maladies de la cavité buccale',
    'Reconnaître les principales manifestations cliniques',
    'Comprendre l’importance du diagnostic précoce'
  ],
  sections: [
    { id: 'def', titre: 'Définition', html: `
      <p>Les <b>pathologies bucco-dentaires</b> regroupent l’ensemble des maladies et anomalies pouvant affecter : les dents, le parodonte, les muqueuses, la langue, les glandes salivaires, les structures maxillo-faciales et l’ATM.</p>
      <p>Leur nature peut être : <b>infectieuse, inflammatoire, dégénérative, traumatique, développementale, tumorale, génétique, fonctionnelle</b> ou secondaire à une maladie générale.</p>
      <div class="keys">La cavité buccale est un <b>environnement biologique complexe</b> : dents + parodonte + muqueuses + langue + glandes salivaires + os maxillaires/mandibulaires + ATM.</div>` },

    { id: 'categories', titre: 'Les grandes catégories (tableau à retenir)', html: `
      <table>
        <tr><th>Catégorie</th><th>Exemples</th></tr>
        <tr><td><b>Pathologies dentaires</b></td><td>Carie, anomalies de l’émail/dentine, hypoplasies, <b>MIH</b> (hypominéralisation molaire-incisive), fluorose, anomalies de forme/nombre, dyschromies, usures</td></tr>
        <tr><td><b>Pathologies pulpaires & périapicales</b></td><td>Pulpite réversible / irréversible, nécrose pulpaire, abcès apical, granulome, kyste radiculaire</td></tr>
        <tr><td><b>Pathologies parodontales</b></td><td>Gingivite (inflammation <b>sans</b> perte d’attache) ; parodontite (destruction progressive des tissus de soutien)</td></tr>
        <tr><td><b>Pathologies des muqueuses</b></td><td>Aphtes, candidose, herpès, lichen plan, leucoplasie, lésions ulcéreuses ou pigmentées → attention aux <b>lésions potentiellement malignes</b></td></tr>
        <tr><td><b>Infections</b></td><td>Bactériennes, parodontales, virales (herpès), fongiques (candidose)</td></tr>
        <tr><td><b>Glandes salivaires</b></td><td>Hyposialie / xérostomie, hypersialie → la baisse du flux salivaire augmente le risque carieux et infectieux</td></tr>
        <tr><td><b>Traumatismes</b></td><td>Fréquents chez l’enfant/l’adolescent : dents, parodonte, muqueuses, os alvéolaire</td></tr>
        <tr><td><b>Anomalies du développement</b></td><td>Nombre, forme, structure</td></tr>
        <tr><td><b>Pathologies fonctionnelles</b></td><td>Dysfonctions de l’appareil manducateur, bruxisme, troubles de l’occlusion/mastication/déglutition, douleurs et bruits de l’ATM</td></tr>
        <tr><td><b>Tumeurs</b></td><td>Bénignes : fibrome, papillome, lipome — Malignes : lèvre, langue, plancher, joue, palais</td></tr>
        <tr><td><b>Manifestations de maladies générales</b></td><td>Ulcérations, saignements, pâleur, hypertrophie gingivale, sécheresse buccale, infections répétées</td></tr>
      </table>` },

    { id: 'facteurs', titre: 'Facteurs de risque généraux', html: `
      <table>
        <tr><th>Type</th><th>Facteurs</th></tr>
        <tr><td>Biologiques</td><td>Microbiote, salive, susceptibilité individuelle, âge, génétique</td></tr>
        <tr><td>Comportementaux</td><td>Hygiène, alimentation, sucres, tabac, alcool</td></tr>
        <tr><td>Environnementaux</td><td>Qualité de l’eau, exposition au fluor</td></tr>
        <tr><td>Sociaux</td><td>Niveau socio-économique, éducation à la santé, accès aux soins, couverture sanitaire, environnement familial</td></tr>
      </table>
      <div class="quote">La cavité buccale est un <b>véritable miroir de la santé générale</b> — le chirurgien-dentiste doit savoir reconnaître les signes qui révèlent une maladie systémique.<span>Pr. Badre</span></div>` }
  ],
  retenir: [
    'Pathologie bucco-dentaire = toute maladie touchant dents, parodonte, muqueuses, glandes, os et ATM.',
    'Gingivite = inflammation SANS perte d’attache ; parodontite = AVEC destruction.',
    'MIH = hypominéralisation molaire-incisive.',
    'Devant une lésion muqueuse : penser au dépistage d’une lésion potentiellement maligne.',
    'La bouche = miroir de la santé générale.'
  ],
  pieges: [
    'Pulpite vs nécrose : la pulpite est inflammatoire, la nécrose = mort pulpaire.',
    'Tumeur bénigne ≠ sans gravité : toute lésion persistante doit être examinée.'
  ]
},

/* ================================ 7 ================================ */
{
  id: 'imd-carie',
  doc: '1ouCIieH-hIs1Bnmf3QNc7jvtiBcU2oRT',
  module: 'imd', emoji: '🦠', duree: 25,
  titre: 'La carie dentaire',
  prof: 'Pr. Badre',
  sousTitre: 'Maladie multifactorielle : biofilm, sucres, déminéralisation et reminéralisation',
  resume: 'La carie n’est pas un simple « trou » : c’est une maladie chronique multifactorielle liée au biofilm et modulée par les sucres. Le cours explique la physiopathologie, les facteurs de risque et le diagnostic.',
  objectifs: [
    'Définir la carie comme une maladie et non une cavité',
    'Expliquer le rôle du biofilm et des sucres',
    'Décrire le cycle déminéralisation / reminéralisation',
    'Différencier carie active et carie arrêtée'
  ],
  sections: [
    { id: 'def', titre: 'Définition', html: `
      <div class="quote">La carie dentaire est une <b>maladie chronique, multifactorielle</b>, liée au <b>biofilm dentaire</b> et <b>modulée par les sucres</b>, qui entraîne une <b>déminéralisation progressive des tissus durs de la dent</b> lorsque les épisodes de déminéralisation deviennent plus importants que les phénomènes de reminéralisation.<span>Pr. Badre</span></div>
      <div class="keys"><b>5 idées clés</b> : ① ce n’est pas seulement une cavité (la cavité = stade avancé) ② le biofilm est central ③ maladie multifactorielle ④ processus <b>dynamique</b> ⑤ quand la déminéralisation prédomine → lésion carieuse.</div>` },

    { id: 'biofilm', titre: 'Le biofilm dentaire', html: `
      <pre class="sch">Nettoyage de la dent
        │
        ▼
PELLICULE ACQUISE (protéines + glycoprotéines salivaires)  ← quelques minutes
        │
        ▼
Adhésion des micro-organismes
        │
        ▼
BIOFILM DENTAIRE = bactéries + matrice extracellulaire
                   + protéines + glucides + eau + ions</pre>
      <p>Le biofilm est un <b>écosystème complexe</b> : ce n’est pas une simple accumulation de bactéries.</p>` },

    { id: 'physio', titre: 'Physiopathologie : la cascade', html: `
      <pre class="sch">Sucres fermentescibles
        ▼
Métabolisme bactérien
        ▼
Production d'ACIDES organiques
        ▼
Baisse du pH du biofilm  ←→  Si le pH remonte, la SALIVE reminéralise
        ▼
DISSOLUTION des cristaux minéraux de l'émail (Ca²⁺ + PO₄³⁻ partent)
        ▼
LÉSION CARIEUSE</pre>
      <table>
        <tr><th>Facteurs pathologiques</th><th>Facteurs protecteurs</th></tr>
        <tr><td>Biofilm dentaire</td><td>Salive</td></tr>
        <tr><td>Sucres fermentescibles</td><td><b>Fluor</b></td></tr>
        <tr><td>Production d’acides</td><td>Hygiène bucco-dentaire</td></tr>
        <tr><td>Fréquence des prises alimentaires</td><td>Contrôle du biofilm, alimentation adaptée, mesures préventives</td></tr>
      </table>
      <p class="mt"><b>Rôle du fluor :</b> favorise la reminéralisation et rend les cristaux dentaires <b>plus résistants aux attaques acides</b>.</p>` },

    { id: 'multifactoriel', titre: 'Le modèle multifactoriel', html: `
      <pre class="sch">           ┌──────────────┐
           │   BACTÉRIES  │  Streptococcus · Actinomyces · Lactobacillus
           │  cariogènes  │
           └──────┬───────┘
                  │
   ┌──────────┐   ▼   ┌──────────┐
   │  HÔTE    │─► CARIE ◄─│ GLUCIDES │  abondance, fréquence,
   │(génétique│   ▲   │          │  temps de rétention
   │ salive,  │   │   └──────────┘
   │ défenses)│   │
   └──────────┘   │
              ┌───┴────┐
              │  TEMPS │ + statut socio-économique, origine,
              └────────┘   coutumes et connaissances</pre>
      <p>Facteurs de rétention de plaque : malpositions, restaurations iatrogènes, orthodontie, handicaps.</p>` },

    { id: 'risque', titre: 'Facteurs de risque carieux', html: `
      <table>
        <tr><th>Type</th><th>Facteurs</th></tr>
        <tr><td>Biologiques</td><td>Faible débit salivaire, composition salivaire défavorable, lésions actives, biofilm abondant, exposition insuffisante au fluor</td></tr>
        <tr><td>Alimentaires</td><td>Sucres fréquents, boissons sucrées, grignotage, produits collants entre les repas</td></tr>
        <tr><td>Comportementaux</td><td>Hygiène insuffisante, pas/mauvais usage du dentifrice fluoré, faible recours à la prévention</td></tr>
        <tr><td>Sociaux</td><td>Niveau socio-économique et d’éducation, accès aux soins, environnement familial</td></tr>
      </table>` },

    { id: 'diagnostic', titre: 'Carie active / arrêtée & diagnostic', html: `
      <table>
        <tr><th></th><th>Lésion ACTIVE</th><th>Lésion ARRÊTÉE</th></tr>
        <tr><td>Surface</td><td>Mate, rugueuse</td><td>Lisse, brillante</td></tr>
        <tr><td>Dureté</td><td>Ramonlie</td><td>Dure</td></tr>
        <tr><td>Tendance</td><td>Progresse</td><td>Stable</td></tr>
        <tr><td>Conduite</td><td>Contrôler l’activité carieuse</td><td>Surveillance possible</td></tr>
      </table>
      <p class="mt"><b>Diagnostic clinique</b> (sur surfaces propres) : changement de couleur, perte de translucidité, rugosité, cavitation. <b>Radiographie</b> : surtout pour l’étendue et les lésions <b>proximales</b>.</p>` }
  ],
  retenir: [
    'Carie = maladie du biofilm + sucres, avec bascule déminéralisation > reminéralisation.',
    'La cavité n’est qu’un stade avancé.',
    'Bactéries cariogènes : Streptococcus, Actinomyces, Lactobacillus.',
    'Sucre le plus cariogène = saccharose (surtout sa fréquence).',
    'Lésion active ≠ lésion arrêtée → conduite différente.'
  ],
  pieges: [
    'Ne pas dire « carie = cavité » : erreur classique de QCM.',
    'La salive est un facteur PROTECTEUR (calcium, phosphate, bicarbonates, protéines).',
    'Le fluor agit autant sur la reminéralisation que sur les bactéries.'
  ]
},

/* ================================ 8 ================================ */
{
  id: 'imd-paro',
  doc: '18XWrKA_4R_-ubW0Ptx8zw0LL9lHihAMz',
  module: 'imd', emoji: '🩸', duree: 25,
  titre: 'Les parodontopathies',
  prof: 'Pr. Badre',
  sousTitre: 'Gingivite et parodontite : mécanismes, facteurs de risque et évolution en 4 étapes',
  resume: 'Les maladies parodontales sont des maladies inflammatoires d’origine bactérienne qui atteignent le parodonte et peuvent aboutir à la perte de la dent. Le cours détaille les 4 étapes de l’évolution et les facteurs de risque.',
  objectifs: [
    'Définir les maladies parodontales',
    'Décrire le mécanisme (flore saprophyte → déséquilibre)',
    'Citer les facteurs de risque (tabac, diabète…)',
    'Décrire les 4 étapes de l’évolution'
  ],
  sections: [
    { id: 'def', titre: 'Définition et parodonte', html: `
      <div class="quote">Des maladies <b>plurifactorielles, inflammatoires</b>, généralement d’origine <b>infectieuse</b>, localisées au <b>parodonte</b>.</div>
      <table>
        <tr><th>Structure du parodonte</th><th>Rôle</th></tr>
        <tr><td>Gencive</td><td>Protection</td></tr>
        <tr><td>Os alvéolaire</td><td>Rigidité, fixe les fibres ligamentaires</td></tr>
        <tr><td>Ligament alvéolo-dentaire</td><td>Lie la dent à l’alvéole</td></tr>
        <tr><td>Cément</td><td>Fixe la dent à la gencive</td></tr>
      </table>
      <p class="mt">Le sillon gingival a une profondeur normale de <b>0,5 à 3 mm</b> (au-delà de 3 mm au sondage → suspect de poche parodontale).</p>` },

    { id: 'mecanisme', titre: 'Mécanisme', html: `
      <pre class="sch">Bouche saine : flore saprophyte (équilibre)
                │
                ▼  rupture de l'équilibre
Bactéries parodontopathogènes à prédominance GRAM NÉGATIF se multiplient
dans le BIOFILM :
   • Porphyromonas gingivalis
   • Aggregatibacter actinomycetemcomitans
   • Tannerella denticola
   • Bacteroides forsythus
                │
                ▼
Accumulation de plaque → GINGIVITE → (étapes successives) → PARODONTITE</pre>
      <div class="keys"><b>4 conditions qui déclenchent la destruction</b> : ① présence de bactéries pathogènes ② absence de bactéries protectrices ③ environnement défavorable ④ défaillance du système immunitaire.</div>` },

    { id: 'fr', titre: 'Facteurs de risque', html: `
      <table>
        <tr><th>Facteur</th><th>Mécanisme</th></tr>
        <tr><td><b>Tabac</b> (×5)</td><td>La <b>nicotine</b> est vasoconstrictrice → moins de saignement (masque la maladie) ; le <b>CO</b> favorise la croissance bactérienne ; diminue la vascularisation et inhibe le collagène</td></tr>
        <tr><td><b>Diabète</b></td><td>Débit sanguin réduit + réponse immunitaire affaiblie</td></tr>
        <tr><td>Obésité</td><td>Adipokines pro-inflammatoires, altérations immuno-inflammatoires, + saignement au sondage</td></tr>
        <tr><td>Stress</td><td>Baisse d’efficacité du système immunitaire</td></tr>
        <tr><td>Locaux</td><td><b>Tartre</b> principalement, chevauchement dentaire, appareils orthodontiques, prothèses</td></tr>
        <tr><td>Médicaments</td><td>Anti-épileptiques (hyperplasie gingivale), AINS (stimulent la résorption osseuse)</td></tr>
        <tr><td>Hormones</td><td>Puberbé, grossesse : perméabilité vasculaire ↑, récepteurs aux œstrogènes</td></tr>
        <tr><td>Autres</td><td>Immunodépression, maladies hématologiques/génétiques (neutropénie, trisomie 21), VIH, herpès, âge, conditions socio-économiques</td></tr>
      </table>` },

    { id: 'evolution', titre: 'Évolution en 4 étapes', html: `
      <table>
        <tr><th>Étape</th><th>Délai</th><th>Ce qui se passe</th></tr>
        <tr><td>① Réaction inflammatoire</td><td><b>2-4 jours</b> après l’agression (sans hygiène)</td><td>Réaction vasculaire dans le tissu conjonctif sous l’épithélium de jonction → résorption osseuse, perte d’attache</td></tr>
        <tr><td>② Lésion débutante</td><td><b>7-14 jours</b></td><td>Altération de l’épithélium de jonction gingivo-dentaire</td></tr>
        <tr><td>③ Lésion établie</td><td>—</td><td>Œdème → flore sous-gingivale ; le sillon s’approfondit → formation de <b>poches</b> ; la sonde pénètre &gt; 3 mm. Due à la <b>quantité</b> de plaque plus qu’à des germes spécifiques</td></tr>
        <tr><td>④ Parodontite</td><td>—</td><td>Destruction des tissus de soutien ; alternance de stagnation/exacerbation → <b>chronique</b> (lent) ou <b>agressive</b> (rapide)</td></tr>
      </table>
      <p class="mt">Les différents degrés se définissent par : importance de la plaque/tartre, degré d’inflammation ou de saignement, mesure de la perte d’attache (sonde parodontale).</p>` },

    { id: 'types', titre: 'Classification', html: `
      <table>
        <tr><th>Gingivites induites par la plaque</th><th>Gingivites non induites par la plaque</th></tr>
        <tr><td>Liées au biofilm (la plus fréquente)</td><td>Troubles hormonaux, médicaments, carences, maladies générales…</td></tr>
      </table>
      <p class="mt">Puis : <b>parodontite</b> (chronique ou agressive) quand la destruction dépasse la gencive.</p>` }
  ],
  retenir: [
    'Maladies inflammatoires, plurifactorielles, d’origine infectieuse, du parodonte.',
    'Gram négatif : P. gingivalis, A. actinomycetemcomitans, T. denticola, B. forsythus.',
    'Tabac (×5) et diabète = 2 principaux facteurs de risque.',
    'Étapes : 2-4 j → 7-14 j → lésion établie (poches) → parodontite.',
    'Sondage > 3 mm = anormal.'
  ],
  pieges: [
    'Chez le fumeur, il y a MOINS de saignement — la maladie est masquée, pas absente.',
    'Gingivite = pas de perte d’attache ; parodontite = perte d’attache et d’os.'
  ]
},

/* ================================ 9 ================================ */
{
  id: 'imd-malocclusion',
  doc: '1I09lAKRZh88XihWEIkffblySaAtK3nMq',
  module: 'imd', emoji: '📐', duree: 25,
  titre: 'Malocclusions chez l’enfant',
  prof: 'Pr. Badre',
  sousTitre: 'Relations en denture temporaire, classes d’Angle et interception précoce',
  resume: 'Le cours explique comment repérer tôt les anomalies de croissance et de position des dents chez l’enfant, en denture temporaire, pour mettre en place une démarche interceptive.',
  objectifs: [
    'Connaître les étiologies des malocclusions',
    'Décrire les relations inter-arcades en denture temporaire',
    'Classer les malocclusions (transversal, vertical, sagittal)',
    'Comprendre l’intérêt de l’interception'
  ],
  sections: [
    { id: 'intro', titre: 'Introduction', html: `
      <p>Chez le jeune enfant, les anomalies du maxillaire, de la mandibule et de la position des dents ont 2 types d’étiologie : <b>héréditaire</b> ou liée à une <b>dysfonction orale</b>.</p>
      <p>Ces anomalies prédisposent aux <b>traumatismes dentaires</b>, aux <b>caries</b> et aux <b>lésions parodontales</b>, et peuvent entraîner un <b>préjudice esthétique</b>.</p>
      <div class="keys">Le rôle du chirurgien-dentiste : <b>détecter le plus tôt possible</b> (surtout en denture temporaire stricte) pour permettre une <b>démarche interceptive</b> — corriger partiellement/totalement la dysmorphose ou empêcher son aggravation.</div>` },

    { id: 'denture-temp', titre: 'Relations en denture temporaire', html: `
      <table>
        <tr><th>Sens</th><th>Règle normale</th></tr>
        <tr><td><b>Diastèmes</b> (classification de Baume)</td><td><b>Type I</b> : diastèmes inter-incisifs + espace simien (en avant de la canine maxillaire) · <b>Type II</b> : absence de diastème, dents en contact</td></tr>
        <tr><td><b>Transversal</b></td><td>L’arcade maxillaire est plus large et <b>circonscrit</b> la mandibulaire ; milieux inter-incisifs alignés</td></tr>
        <tr><td><b>Vertical</b></td><td>Recouvrement incisif de <b>1 à 3 mm</b> (ou bout-à-bout)</td></tr>
        <tr><td><b>Antéro-postérieur</b></td><td>Rapport des <b>plans terminaux</b> (faces distales des 2<sup>es</sup> molaires temporaires)</td></tr>
      </table>
      <pre class="sch">PLAN TERMINAL en denture temporaire  ──►  Évolution en denture permanente
  ─ Marche distale   ──►  Classe II totale (ou II en bout-à-bout)
  ─ Droit / vertical ──►  Classe I  (ou classe II en bout-à-bout)
  ─ Marche mésiale   ──►  Classe I  (ou classe III)</pre>` },

    { id: 'types', titre: 'Types de malocclusions', html: `
      <table>
        <tr><th>Sens</th><th>Anomalies</th></tr>
        <tr><td><b>Transversal</b></td><td>Articulé croisé postérieur (unilatéral ± latérodéviation, ou bilatéral) · endo-alvéolie (inclinaison vers l’intérieur) · exo-alvéolie · <b>endognathie</b> (déficit important de la base osseuse)</td></tr>
        <tr><td><b>Vertical</b></td><td><b>Infraclusion antérieure = béance</b> (absence de recouvrement) · infraclusion latérale (pas de contact au niveau cuspidé) · <b>supraclusion</b> (recouvrement &gt; 3 mm, symétrique, uni ou bimaxillaire)</td></tr>
        <tr><td><b>Sagittal</b></td><td><b>Distoclusion</b> mandibulaire → tend vers classe II · <b>Mésiocclusion</b> mandibulaire → tend vers classe III</td></tr>
      </table>
      <pre class="sch">CLASSES D'ANGLE (relation molaire)
  Classe I   : la pointe de la cuspide M-V du 1er molaire sup.
               tombe dans le sillon du 1er molaire inf.
  Classe II  : l'arcade inférieure est EN ARRIÈRE (rétrognathie)
  Classe III : l'arcade inférieure est EN AVANT (prognathie)</pre>` },

    { id: 'interception', titre: 'Intérêts de l’interception', html: `
      <div class="keys">L’interception (traitement précoce) permet de : retrouver un bon équilibre facial · favoriser la mise en place des dents permanentes · diminuer le risque de traumatismes des incisives · améliorer les fonctions orales · obtenir un environnement parodontal favorable · simplifier et raccourcir les traitements multi-attaches · assurer la stabilité des résultats finaux.</div>
      <p class="mt">Notions liées : <b>recouvrement</b> (vertical) et <b>surplomb</b> (horizontal).</p>` }
  ],
  retenir: [
    'Étiologies : héréditaire ou dysfonction orale.',
    'Baume I = diastèmes + espace simien ; Baume II = sans diastème.',
    'Recouvrement normal en denture temporaire : 1 à 3 mm.',
    'Plan terminal : droit → Classe I ; marche mésiale → I ou III ; marche distale → II.',
    'Supraclusion si recouvrement > 3 mm ; béance = infraclusion antérieure.'
  ],
  pieges: [
    'Le « plan terminal » est une notion de DENTURE TEMPORAIRE (faces distales des 2es molaires de lait).',
    'Distoclusion ≠ classe II définitive : elle « tend vers » une classe II.'
  ]
},

/* ================================ 10 ================================ */
{
  id: 'imd-prevention',
  doc: '19r3mPi1njb7XrJjYBJrL2gjWib0u0X5i',
  module: 'imd', emoji: '🛡️', duree: 25,
  titre: 'La prévention bucco-dentaire',
  prof: 'Pr. Badre',
  sousTitre: 'Primaire, secondaire, tertiaire — hygiène, alimentation, fluor, scellements',
  resume: 'Le cours passe en revue les 3 niveaux de prévention et les moyens concrets : hygiène bucco-dentaire, prophylaxie alimentaire, fluor (topique et systémique) et scellement des puits et fissures.',
  objectifs: [
    'Définir la prévention et distinguer ses 3 niveaux',
    'Connaître les mesures collectives et individuelles',
    'Expliquer les mécanismes du fluor',
    'Connaître les règles de prophylaxie alimentaire'
  ],
  sections: [
    { id: 'def', titre: 'Définition et niveaux', html: `
      <div class="quote">Ensemble des mesures qui permettent de maintenir les individus en bonne santé ou d’empêcher la progression de la maladie.</div>
      <p>L’action préventive suppose 3 ingrédients : un <b>financement</b>, une <b>volonté commune</b> (professionnels + patients + pouvoirs publics) et des <b>programmes</b>.</p>
      <table>
        <tr><th>Niveau</th><th>But</th><th>Exemples</th></tr>
        <tr><td><b>Primaire</b></td><td>S’opposer à l’<b>installation</b> des affections</td><td>Hygiène, éducation sanitaire, nutrition, fluoration de l’eau, fluor topique, scellement des sillons</td></tr>
        <tr><td><b>Secondaire</b></td><td>Dépister et traiter <b>tôt</b> (stopper la progression)</td><td>Dépistage, soins des lésions débutantes</td></tr>
        <tr><td><b>Tertiaire</b></td><td>Limiter les <b>conséquences</b> / réhabiliter</td><td>Traitements restaurateurs, prothèses, rééducation</td></tr>
      </table>` },

    { id: 'hygiene', titre: 'Hygiène bucco-dentaire', html: `
      <pre class="sch">PLAQUE DENTAIRE = pellicule blanchâtre (débris alimentaires + bactéries) = BIOFILM
        │  si elle persiste trop longtemps
        ▼
TARTRE (calcification) → blesse la gencive → saignements spontanés ou au brossage</pre>
      <table>
        <tr><th>Bons réflexes</th><th>Détail</th></tr>
        <tr><td>Brosse</td><td>Personnelle, petite tête, bords arrondis, poils souples en nylon, changée tous les <b>3 mois</b></td></tr>
        <tr><td>Fréquence / durée</td><td><b>2 fois par jour pendant 2 minutes</b> : dents + dos de la langue + prothèses</td></tr>
        <tr><td>Technique</td><td>Brosse à <b>45°</b> à cheval sur dent et gencive ; toujours <b>de la gencive vers la dent</b> (« du rouge vers le blanc ») ; les deux mâchoires séparément</td></tr>
        <tr><td>Compléments</td><td>Brossette inter-dentaire, jet dentaire, fil dentaire, bain de bouche</td></tr>
        <tr><td>Précoce</td><td>Commencer dès <b>1 an</b>, sous supervision d’un adulte (éviter l’ingestion de dentifrice)</td></tr>
      </table>` },

    { id: 'alimentation', titre: 'Prophylaxie alimentaire', html: `
      <p>L’alimentation agit par <b>effet systémique</b> (développement de la dent) et <b>effet local</b> (carie).</p>
      <table>
        <tr><th>Famille de sucres</th><th>Exemples</th></tr>
        <tr><td>Monosaccharides</td><td>Glucose, fructose, galactose</td></tr>
        <tr><td>Disaccharides</td><td>Saccharose, maltose, lactose</td></tr>
        <tr><td>Sucres complexes</td><td>Amidon</td></tr>
      </table>
      <p class="mt">Le <b>saccharose</b> est le sucre assimilable le <b>plus cariogène</b> (friandises, gâteaux, desserts, fruits secs, sodas).</p>
      <div class="keys"><b>Règles</b> : alimentation équilibrée · éviter les aliments qui collent · <b>pas plus de 5 prises alimentaires/jour</b> · laisser la salive agir (≥ 3 h entre les repas) · préférer l’eau · paille pour les jus/sodas · terminer par un verre d’eau ou un aliment protecteur (fromage).</div>
      <p class="mt">À retenir : c’est surtout la <b>fréquence</b> d’exposition aux glucides fermentescibles qui fait chuter le pH.</p>` },

    { id: 'fluor', titre: 'Le fluor', html: `
      <p>Le fluor est un <b>élément nutritif essentiel</b> à la formation de dents et d’os sains (comme le calcium et le phosphore).</p>
      <table>
        <tr><th>Mécanisme</th><th>Effet</th></tr>
        <tr><td>↓ solubilité de l’émail</td><td>Cristaux plus résistants aux acides</td></tr>
        <tr><td>Reminéralisation</td><td>Répare les lésions carieuses initiales</td></tr>
        <tr><td>Action antibactérienne</td><td>Agit négativement sur la plaque</td></tr>
      </table>
      <p class="mt"><b>Fluoration topique</b> = contact direct du fluor avec la dent (dentifrice, gel, vernis, bain de bouche). L’efficacité repose sur la <b>fréquence</b> ; le dentifrice fluoré quotidien constitue un <b>réservoir de fluor</b>. La disponibilité du fluor pendant l’attaque acide est le facteur le plus important.</p>
      <table>
        <tr><th>Risque carieux</th><th>Conduite</th></tr>
        <tr><td>Faible</td><td>Apport topique seul dès les premières dents + brossage bi-quotidien avec dentifrice fluoré dosé selon l’âge</td></tr>
        <tr><td>Élevé</td><td>En plus : thérapeutiques fluorées complémentaires après <b>bilan des apports</b> (eau, comprimés, sel fluoré)</td></tr>
      </table>` },

    { id: 'scellement', titre: 'Scellement des puits et fissures', html: `
      <p>Une <b>fissure</b> est un sillon très profond et étroit creusé dans l’émail (peut atteindre la dentine) : la brosse n’y accède pas → zone à haut risque carieux.</p>
      <div class="keys">Le <b>scellement des sillons</b> consiste à obturer ces puits et fissures pour empêcher les bactéries et les sucres de s’y loger. C’est une mesure de <b>prévention primaire</b>, surtout sur les molaires définitives dès leur éruption.</div>` }
  ],
  retenir: [
    'Prévention primaire = empêcher l’installation ; secondaire = dépister tôt ; tertiaire = limiter les conséquences.',
    'Plaque → tartre (calcification) → agression gingivale.',
    'Brossage : 2 × 2 min, à 45°, de la gencive vers la dent, dès 1 an.',
    'Saccharose = sucre le plus cariogène ; la fréquence des prises compte plus que la quantité.',
    'Fluor : ↓ solubilité + reminéralisation + action antibactérienne.'
  ],
  pieges: [
    'Le fluor topique ≠ fluor systémique : l’efficacité topique dépend de la fréquence d’application.',
    'Ne pas dépasser 5 prises alimentaires par jour (y compris collations).'
  ]
}

]);
