/* ------------------------------------------------------------------
   FICHES DE COURS — Biologie · Biochimie · Chimie · Biophysique · Physiologie
   ------------------------------------------------------------------ */

window.FICHES = (window.FICHES || []).concat([

/* ============================ BIOLOGIE CELLULAIRE ============================ */
{
  id: 'bio-methodes',
  doc: '12C2EZRNXC-nMexHNobPSpy3Sn6dSqz9k',
  module: 'biologie', emoji: '🔬', duree: 30,
  titre: 'Méthodes d’étude de la cellule',
  prof: 'Pr. F. Rhrich-Haddout',
  sousTitre: 'Microscopie, cytochimie, fractionnement, électrophorèse, chromatographie, culture, autoradiographie',
  resume: 'Toutes les techniques qui ont permis de connaître la cellule : la voir (MO, MET, MEB), connaître sa composition (cytochimie, fractionnement, électrophorèse, chromatographie) et son fonctionnement (culture de cellules, autoradiographie).',
  objectifs: [
    'Classer les méthodes selon 3 buts : structure, constitution chimique, fonctionnement',
    'Décrire le principe du MO, du MET et du MEB',
    'Connaître les étapes de préparation des prélèvements tissulaires',
    'Comprendre fractionnement, électrophorèse et chromatographie'
  ],
  sections: [
    { id: 'defs', titre: 'Définitions de base', html: `
      <table>
        <tr><th>Terme</th><th>Définition</th></tr>
        <tr><td><b>Biologie cellulaire</b></td><td>Utilise la cytologie, la biologie moléculaire et la biochimie pour étudier la cellule</td></tr>
        <tr><td><b>Cytologie</b></td><td>Étudie la <b>structure</b> microscopique de la cellule en dehors de toute organisation tissulaire</td></tr>
        <tr><td><b>Biochimie / biologie moléculaire</b></td><td>Étudient le <b>fonctionnement</b> de la cellule</td></tr>
        <tr><td><b>Tissu</b></td><td>Assemblage de cellules remplissant une fonction dans un organe (épithélial, conjonctif, musculaire, nerveux)</td></tr>
        <tr><td><b>Organe</b></td><td>Assemblage de plusieurs tissus (cerveau, foie, pancréas)</td></tr>
      </table>
      <div class="keys">La frontière structure/fonction est <b>arbitraire</b> : les deux sont intimement liées.</div>` },

    { id: 'plan', titre: 'Le plan du cours (à connaître par cœur)', html: `
      <pre class="sch">I.   MÉTHODES D'ÉTUDE DE LA STRUCTURE
     1. Microscope optique (MO / photonique)
     2. Microscope électronique : MET (transmission) & MEB (balayage)

II.  MÉTHODES D'ÉTUDE DE LA CONSTITUTION CHIMIQUE
     1. Cytochimie
     2. Fractionnement cellulaire
     3. Électrophorèse
     4. Chromatographie

III. MÉTHODES D'ÉTUDE DU FONCTIONNEMENT
     1. Culture de cellules
     2. Autoradiographie</pre>` },

    { id: 'mo', titre: 'Le microscope optique (MO / photonique)', html: `
      <p><b>Principe :</b> utilise des <b>photons</b> (lumière) comme source d’énergie ; l’image agrandie vient d’une combinaison de lentilles :</p>
      <table>
        <tr><th>Lentille</th><th>Grossissement</th></tr>
        <tr><td>Oculaire (côté œil)</td><td>2 à 10 X</td></tr>
        <tr><td>Objectif (côté objet)</td><td>2,5 à 100 X</td></tr>
      </table>
      <p class="mt"><b>Grossissement du microscope</b> = grossissement objectif × grossissement oculaire. Ex. : oculaire 10 X + objectif 40 = <b>×400</b>.</p>
      <p><b>Contraintes d’observation :</b> les objets doivent être <b>minces</b> et leurs constituants doivent présenter un certain <b>contraste</b>.</p>
      <table>
        <tr><th>Type de prélèvement</th><th>Exemples</th></tr>
        <tr><td><b>Tissulaires</b></td><td><b>Biopsie</b> (fragment de tissu) · <b>biopsie-exérèse</b> (totalité de la lésion) · <b>ponction-biopsie</b> (carotte tissulaire à l’aiguille/trocart)</td></tr>
        <tr><td><b>Cytologiques</b></td><td>Grattage, brossage, ponction à l’aiguille, liquide de lavage, produits de sécrétion, apposition sur lame</td></tr>
      </table>` },

    { id: 'prepa', titre: 'Préparation des coupes (microtome à paraffine)', html: `
      <pre class="sch">Prélèvement
   ▼
FIXATION            ← préserve la structure de la cellule morte
   ▼                  formaldéhyde, formol, Bouin…
DÉCALCIFICATION     ← tissus durs seulement (os, dents) : acide nitrique, EDTA
   ▼
DÉSHYDRATATION      ← bains d'alcool 70° → 95° → 100° (la paraffine n'est pas miscible à l'eau)
   ▼
ÉCLAIRCISSEMENT     ← solvant organique : toluène ou xylène
   ▼
IMPRÉGNATION        ← paraffine pure liquide à l'étuve (56–60 °C), 3 bains
   ▼
INCLUSION           ← rigidifie le tissu pour la coupe
   ▼
COUPES au microtome → COLLAGE sur lame → DÉPARAFFINAGE → RÉHYDRATATION
   ▼
COLORATION → DÉSHYDRATATION → MONTAGE (Eukitt, baume du Canada)
   ▼
OBSERVATION AU MO</pre>
      <p><b>Rôle de la fixation :</b> tuer la cellule en gardant ses constituants en place, en créant des liaisons chimiques très stables entre les molécules.</p>
      <p><b>Colorations à retenir</b> (données par la promo) : PAS / Bleu de Alcian · Trichrome de Masson · Noir de Soudan · Hématéine-Éosine.</p>` },

    { id: 'me', titre: 'Microscopes électroniques : MET et MEB', html: `
      <table>
        <tr><th></th><th>MET (transmission)</th><th>MEB (balayage)</th></tr>
        <tr><td>Source</td><td>Faisceau d’électrons traversant</td><td>Balayage de la surface</td></tr>
        <tr><td>Ce qu’on voit</td><td><b>Ultrastructure interne</b> (organites)</td><td><b>Surface / relief</b> en 3D</td></tr>
        <tr><td>Résolution</td><td>La meilleure (bien plus que le MO)</td><td>Bonne, mais surface seulement</td></tr>
      </table>
      <div class="keys">Résolution : MO ≈ 0,2 µm → MET < 1 nm. C’est la <b>résolution</b> qui distingue les grands types de microscopes.</div>` },

    { id: 'chimique', titre: 'Méthodes d’étude de la constitution chimique', html: `
      <table>
        <tr><th>Méthode</th><th>Principe / intérêt</th></tr>
        <tr><td><b>Cytochimie</b></td><td>Mettre en évidence <b>sur place</b> (in situ) une substance chimique dans la cellule grâce à une réaction colorée spécifique</td></tr>
        <tr><td><b>Fractionnement cellulaire</b></td><td>Centrifugation : sépare les organites selon leur densité/poids après <b>homogénéisation</b> (noyaux → mitochondries → microsomes → cytosol)</td></tr>
        <tr><td><b>Électrophorèse</b></td><td>Sépare les molécules chargées (protéines, acides nucléiques) sous l’effet d’un <b>champ électrique</b> (selon charge et masse)</td></tr>
        <tr><td><b>Chromatographie</b></td><td>Sépare des molécules selon leur affinité entre une phase <b>fixe</b> et une phase <b>mobile</b></td></tr>
      </table>` },

    { id: 'fonctionnement', titre: 'Méthodes d’étude du fonctionnement', html: `
      <table>
        <tr><th>Méthode</th><th>Principe</th></tr>
        <tr><td><b>Culture de cellules</b></td><td>Faire vivre et multiplier des cellules <b>hors de l’organisme</b> (in vitro) pour étudier leur comportement, tester des substances…</td></tr>
        <tr><td><b>Autoradiographie</b></td><td>Repérer le trajet d’une <b>molécule marquée radioactive</b> dans la cellule (où et quand elle est incorporée)</td></tr>
      </table>
      <div class="keys">Récapitulatif ultra-rapide : <b>Structure</b> = MO / MET / MEB · <b>Composition</b> = cytochimie, fractionnement, électrophorèse, chromatographie · <b>Fonctionnement</b> = culture, autoradiographie.</div>` }
  ],
  retenir: [
    '3 grands objectifs : structure, constitution chimique, fonctionnement.',
    'MO = photons + lentilles ; grossissement = oculaire × objectif.',
    'MET = interne / ultrastructure · MEB = surface / relief.',
    'Préparation : fixation → décalcification → déshydratation → éclaircissement → imprégnation → inclusion → coupes → coloration.',
    'Décalcification (acide nitrique / EDTA) uniquement pour os et dents.'
  ],
  pieges: [
    'Biopsie-exérèse = totalité de la lésion (≠ biopsie simple).',
    'L’éclaircissement se fait au toluène/xylène, pas à l’alcool.',
    'La paraffine n’est pas miscible à l’eau → d’où la déshydratation obligatoire.'
  ]
},

/* ============================ BIOLOGIE MOLECULAIRE ============================ */
{
  id: 'bio-mol',
  doc: '1y_Z_TorkYh4vybrDq-NfqklOAEgZWoIc',
  module: 'biologie', emoji: '🧬', duree: 40,
  titre: 'Biologie moléculaire : ADN, réplication, transcription, traduction',
  prof: 'Pr. T. Rochd',
  sousTitre: 'Acides nucléiques, réplication, mutations & réparation, expression du génome',
  resume: 'Polycopié de biologie moléculaire : structure de l’ADN et de l’ARN, réplication semi-conservative, mutations et système de réparation, transcription, maturation de l’ARNm et traduction des protéines.',
  objectifs: [
    'Décrire la structure du nucléotide, de l’ADN et de l’ARN',
    'Expliquer la réplication (semi-conservatrice, bidirectionnelle) et ses enzymes',
    'Connaître les étapes de la transcription et de la traduction',
    'Citer les types de mutations et les systèmes de réparation'
  ],
  sections: [
    { id: 'acides', titre: 'Les acides nucléiques', html: `
      <p><b>Définition :</b> enchaînements de nucléotides (polynucléotides) qui assurent le <b>stockage, le maintien et le transfert</b> de l’information génétique.</p>
      <pre class="sch">UN NUCLÉOTIDE = SUCRE + BASE AZOTÉE + GROUPEMENT PHOSPHATE

ADN : 4 bases → A (adénine) · T (thymine) · G (guanine) · C (cytosine)
ARN : 4 bases → A (adénine) · U (uracile) · G (guanine) · C (cytosine)

Appariement (complémentarité) :  A—T   et   C—G</pre>
      <table>
        <tr><th>L’ADN</th><th>Détails</th></tr>
        <tr><td>Support</td><td>De l’information génétique héréditaire</td></tr>
        <tr><td>Structure</td><td><b>2 brins complémentaires, antiparallèles, enroulés en hélice</b></td></tr>
        <tr><td>Localisation</td><td>Noyau (linéaire, scindé en chromosomes, associé aux histones) · mitochondries et chloroplastes : <b>circulaire</b></td></tr>
        <tr><td>Taille</td><td>3,3 milliards de paires de bases ; seules <b>≈ 10 % codent</b>, dont <b>1,5 %</b> pour la synthèse protéique</td></tr>
      </table>` },

    { id: 'arn', titre: 'L’ARN : 4 différences et 5 familles', html: `
      <table>
        <tr><th>Différence avec l’ADN</th></tr>
        <tr><td>① Toujours <b>simple brin</b> (sauf certains procaryotes)</td></tr>
        <tr><td>② Sucre = <b>ribose</b> (et non désoxyribose)</td></tr>
        <tr><td>③ Base complémentaire de A = <b>uracile</b> (et non thymine)</td></tr>
        <tr><td>④ <b>Court</b> : 50 à 5 000 nucléotides (ADN = des millions)</td></tr>
      </table>
      <table>
        <tr><th>Type d’ARN</th><th>Fonction</th></tr>
        <tr><td><b>ARNr</b> ribosomique</td><td>Forme les ribosomes avec les protéines ribosomiques</td></tr>
        <tr><td><b>ARNt</b> de transfert</td><td>Transfère les acides aminés vers le lieu de synthèse</td></tr>
        <tr><td><b>ARNm</b> messager</td><td>Porte l’information de l’ADN vers le lieu de synthèse</td></tr>
        <tr><td><b>ARNsn</b> small nuclear</td><td>Dans le noyau uniquement ; régulation post-transcriptionnelle</td></tr>
        <tr><td><b>ARNpol</b> polymérase</td><td>Enzyme qui catalyse la synthèse d’ARN</td></tr>
      </table>` },

    { id: 'replication', titre: 'La réplication', html: `
      <p><b>Définition :</b> phénomène physiologique où l’ADN est synthétisé grâce à l’ADN polymérase → l’ADN est dupliqué. <b>Elle a lieu pendant la phase S du cycle cellulaire.</b></p>
      <div class="keys"><b>Deux caractéristiques</b> : <b>semi-conservatrice</b> (chaque molécule fille = 1 brin parental + 1 brin néoformé) et <b>bidirectionnelle</b> (début à l’origine de réplication, progression dans les 2 sens → fourches).</div>
      <table>
        <tr><th>Outil</th><th>Rôle</th></tr>
        <tr><td>Matrice d’ADN</td><td>Brin parental</td></tr>
        <tr><td>Bases puriques/pyrimidiques</td><td>A, C, G, T, U</td></tr>
        <tr><td><b>Hélicase</b></td><td>Sépare les 2 brins (brise les liaisons hydrogène)</td></tr>
        <tr><td>Protéines de liaison</td><td>Empêchent les brins de se recoller</td></tr>
        <tr><td><b>Primase</b> (ARN polymérase)</td><td>Fournit les amorces ARN</td></tr>
        <tr><td><b>ADN polymérase</b></td><td>Synthétise l’ADN</td></tr>
        <tr><td><b>Topo-isomérase</b></td><td>Coupe un brin pour permettre le déroulement</td></tr>
        <tr><td><b>ADN ligase</b></td><td>Ressoude le brin (rétablit les liaisons phosphodiester)</td></tr>
        <tr><td><b>RNase H</b></td><td>Enlève les amorces</td></tr>
      </table>
      <pre class="sch">ÉTAPES : ① INITIATION (à l'origine) → ② ÉLONGATION (synthèse d'ADN)
         → ③ TERMINAISON</pre>` },

    { id: 'mutations', titre: 'Mutations et réparation', html: `
      <p>L’ADN peut être modifié : c’est la <b>mutation</b>, qui aboutit à une diversité des individus et à l’évolution possible des espèces.</p>
      <table>
        <tr><th>À retenir</th><th>Contenu</th></tr>
        <tr><td>Définition</td><td>Modification de l’information portée par l’ADN</td></tr>
        <tr><td>Conséquences</td><td>Variables : silencieuses, faux-sens, non-sens, décalage du cadre de lecture…</td></tr>
        <tr><td>Réparation</td><td>Mécanismes cellulaires qui corrigent les lésions de l’ADN</td></tr>
      </table>` },

    { id: 'expression', titre: 'Transcription → maturation → traduction', html: `
      <pre class="sch">ADN ──(TRANSCRIPTION)──► ARN prémessager ──(MATURATION)──► ARNm
   initiation → élongation → terminaison          (excision introns, coiffe, queue poly-A)
                                        │
                                        ▼
                          ARNm ──(TRADUCTION)──► PROTÉINE
                              ribosome + ARNt + acides aminés
                              initiation → élongation → terminaison
                                        │
                                        ▼
                          MODIFICATIONS POST-TRADUCTIONNELLES</pre>
      <div class="keys">Sens de l’information : <b>ADN → ARN → protéine</b>. La réplication, elle, va d’ADN vers ADN.</div>` },

    { id: 'genie', titre: 'Le génie génétique', html: `
      <table>
        <tr><th>Élément</th><th>Rôle</th></tr>
        <tr><td>Enzymes de restriction</td><td>« Ciseaux moléculaires » qui coupent l’ADN à des sites précis</td></tr>
        <tr><td>Vecteurs</td><td>Molécules qui transportent le gène (plasmides, virus)</td></tr>
        <tr><td>Sondes</td><td>Séquences marquées pour repérer un fragment précis</td></tr>
        <tr><td>Clonage d’un gène</td><td>Obtenir de nombreuses copies d’un gène</td></tr>
      </table>
      <p class="mt"><b>Applications médicales :</b> diagnostic des maladies génétiques · <b>thérapie génique</b>.</p>` }
  ],
  retenir: [
    'Nucléotide = sucre + base + phosphate ; A-T (2 H) et C-G (3 H).',
    'ADN : 2 brins antiparallèles en hélice ; circulaire dans les mitochondries.',
    'Réplication : semi-conservatrice, bidirectionnelle, en phase S.',
    'Hélicase sépare / primase amorce / polymérase synthétise / ligase ressoude.',
    'ARNm : A-U ; 5 familles (r, t, m, sn, pol).'
  ],
  pieges: [
    'Chez l’eucaryote, l’ADN mitochondrial est circulaire (comme chez les bactéries), pas linéaire.',
    'Seulement ~10 % de l’ADN code, et 1,5 % pour les protéines.',
    'L’ARNsn est nucléaire uniquement.'
  ]
},

/* ============================ BIOCHIMIE ============================ */
{
  id: 'biochimie-glucides',
  doc: '1a-HsfOTiDg24d2AajJmlBVGjVlcY_aAS',
  module: 'chimie', emoji: '🧫', duree: 30,
  titre: 'Biochimie structurale : les glucides',
  prof: 'Pr. Naamane',
  sousTitre: 'Méthode de reconnaissance d’un ose, osides, polyosides et GAG',
  resume: 'Une méthode pas-à-pas pour nommer un glucide : déterminer s’il s’agit d’un ose ou d’un oside, sa configuration (α/β, D/L), sa forme (pyranique/furanique), ses dérivés, puis les polyosides et les glycosaminoglycanes.',
  objectifs: [
    'Distinguer oses et osides',
    'Appliquer la méthode en 5 étapes pour nommer un ose',
    'Différencier liaison réductrice et non réductrice',
    'Connaître les GAG et leur règle de nomenclature'
  ],
  sections: [
    { id: 'base', titre: 'Glucides = oses + osides', html: `
      <table>
        <tr><th>Famille</th><th>Définition</th><th>Exemples</th></tr>
        <tr><td><b>Oses</b></td><td>Glucides simples (oses)</td><td>Glucose, galactose, mannose, fructose, ribose</td></tr>
        <tr><td><b>Osides</b></td><td>Complexes : plusieurs oses liés</td><td>Diholosides (lactose, maltose, saccharose), polyosides (amidon, glycogène, GAG)</td></tr>
      </table>` },

    { id: 'methode', titre: 'La méthode de reconnaissance d’un ose (5 étapes)', html: `
      <table>
        <tr><th>Étape</th><th>Question</th><th>Réponse</th></tr>
        <tr><td><b>I</b></td><td>Quel type d’ose ?</td><td>Fructose / ribose / épimère (galactose, glucose, mannose)</td></tr>
        <tr><td><b>II</b></td><td>α ou β ?</td><td>On regarde le carbone <b>après l’oxygène</b></td></tr>
        <tr><td><b>III</b></td><td>D ou L ?</td><td>On regarde le carbone <b>avant l’oxygène</b> (dernier carbone)</td></tr>
        <tr><td><b>IV</b></td><td>Quelle forme ?</td><td>Pyranique si 6 carbones · furanique si 5 carbones</td></tr>
        <tr><td><b>V</b></td><td>Dérivés ?</td><td>Amine, N-acétyl, acide uronique</td></tr>
      </table>
      <pre class="sch">I. TYPE D'OSE
   ▸ CHO ou CH2OH présent  → FRUCTOSE (cétose)
   ▸ 5 carbones            → RIBOSE (pentose)
   ▸ Sinon, comparer les carbones 2, 3, 4 (épimères) :
        C2 différent → GALACTOSE
        C3 différent → GLUCOSE
        C4 différent → MANNOSE
     Ordre à retenir :  Gal  >  Glu  >  Man</pre>` },

    { id: 'derives', titre: 'Les dérivés d’oses', html: `
      <table>
        <tr><th>Groupement</th><th>Nom devient</th><th>Exemple</th></tr>
        <tr><td><b>-NH₃</b> (amine)</td><td>…osamine</td><td>Glucosamine</td></tr>
        <tr><td><b>-NH₂-CO-CH₃</b> (N-acétyl)</td><td>N-acétyl …osamine</td><td>N-acétyl glucosamine</td></tr>
        <tr><td><b>-COOH</b> (acide)</td><td>Acide …uronique</td><td>Acide glucuronique</td></tr>
      </table>` },

    { id: 'osides', titre: 'Les osides : réducteur ou non ?', html: `
      <p>Pour un <b>diholoside</b>, on regarde le carbone après l’oxygène de chaque ose :</p>
      <table>
        <tr><th>Liaison</th><th>Type</th><th>Exemple</th></tr>
        <tr><td><b>Osido-ose</b> (un seul ose a perdu son OH)</td><td><b>RÉDUCTEUR</b> — osyl(1-4)ose</td><td>Lactose (galactose + glucose), Maltose (glucose + glucose)</td></tr>
        <tr><td><b>Osido-oside</b> (les deux ont perdu leur OH)</td><td><b>NON RÉDUCTEUR</b> — osyl(1-2)oside</td><td>Saccharose (glucose + fructose)</td></tr>
      </table>` },

    { id: 'polyosides', titre: 'Polyosides & GAG', html: `
      <table>
        <tr><th>Type</th><th>Organisation</th><th>Exemples</th></tr>
        <tr><td><b>Homogène</b></td><td>Un seul type d’ose ; liaisons (1,4) entre oses, (1,6) entre séquences</td><td><b>Glycogène</b> (≈10 glucoses/séquence), <b>Amidon</b> (20-30 glucoses/séquence)</td></tr>
        <tr><td><b>Hétérogène</b></td><td>Glycosaminoglycanes (GAG) : un ose lié à -COOH (acide uronique) + un ose lié à -NH₂-CO-CH₃ (N-acétyl osamine)</td><td>Acide hyaluronique, chondroïtines sulfate, héparine</td></tr>
      </table>
      <table>
        <tr><th>GAG</th><th>Composition</th></tr>
        <tr><td>Acide hyaluronique</td><td>Acide β-D-glucuronique + N-acétyl-D-glucosamine</td></tr>
        <tr><td>Chondroïtines sulfate</td><td>Acide β-D-glucuronique + N-acétyl-D-galactosamine</td></tr>
        <tr><td>Héparine</td><td>Acide α-D-glucuronique + D-glucosamine <b>N-sulfate</b></td></tr>
      </table>
      <div class="keys"><b>Règle de nomenclature</b> : <b>N-acétyl osamine + acide uronique</b>. Exception : pour l’<b>héparine</b> (nom commun), on remplace N-acétyl par <b>N-sulfate</b>.</div>` }
  ],
  retenir: [
    'Osides complexes = diholosides + polyosides ; oses = sucres simples.',
    'Épimères : C2 galactose, C3 glucose, C4 mannose.',
    'α/β = carbone après l’oxygène ; D/L = carbone avant l’oxygène.',
    'Pyranique = 6 C ; furanique = 5 C.',
    'Saccharose = non réducteur ; lactose et maltose = réducteurs.',
    'Héparine : acide α-D-glucuronique + glucosamine N-sulfate.'
  ],
  pieges: [
    'Le fructose est une cétose : s’il y a CHO/CH₂OH, on s’arrête là.',
    'Ne pas confondre amino (-NH₂) et N-acétyl (-NH-CO-CH₃).',
    'La liaison (1,6) relie les séquences, la (1,4) relie les oses.'
  ]
},

/* ============================ CHIMIE GENERALE ============================ */
{
  id: 'chimie-atomistique',
  doc: '1RHP6JkR0UpPwvzDD5lekeGE_zfvNUB8e',
  module: 'chimie', emoji: '⚗️', duree: 35,
  titre: 'Chimie générale — Atomistique',
  prof: 'Pr. Fatiha El Gueddari',
  sousTitre: 'Constituants de la matière, isotopes, masse atomique, modèles de Rutherford et Bohr',
  resume: 'Chapitre I d’atomistique : particules élémentaires, représentation de l’atome (A, Z, N), isotopes, masse atomique et unité de masse atomique, puis les modèles atomiques de Rutherford et Bohr.',
  objectifs: [
    'Connaître les 3 particules élémentaires (charge et masse)',
    'Utiliser A = Z + N et la notation ᴬZX',
    'Calculer une masse atomique avec les abondances isotopiques',
    'Distinguer les modèles de Rutherford et Bohr'
  ],
  sections: [
    { id: 'particules', titre: 'Les particules élémentaires', html: `
      <table>
        <tr><th>Particule</th><th>Charge</th><th>Masse</th></tr>
        <tr><td><b>Électron</b></td><td>−1,602·10⁻¹⁹ C</td><td>9,109·10⁻³¹ kg</td></tr>
        <tr><td><b>Proton</b></td><td>+1,602·10⁻¹⁹ C</td><td>1,673·10⁻²⁷ kg = 1836 m<sub>e</sub></td></tr>
        <tr><td><b>Neutron</b></td><td>nulle (neutre)</td><td>1,675·10⁻²⁷ kg = 1839 m<sub>e</sub></td></tr>
      </table>
      <p class="mt">Protons + neutrons = <b>nucléons</b> (forment le noyau). Les masses du proton et du neutron étant très supérieures à celle de l’électron, <b>la masse de l’atome ≈ celle de son noyau</b>.</p>` },

    { id: 'atome', titre: 'Représentation de l’atome', html: `
      <pre class="sch">      A
       X        X = symbole de l'élément
      Z         Z = numéro atomique = nb de PROTONS = nb d'ÉLECTRONS
                A = nombre de masse = nb de NUCLÉONS = Z + N
                N = nombre de NEUTRONS = A − Z

L'atome est ÉLECTRIQUEMENT NEUTRE : Z protons (+) ⇄ Z électrons (−)</pre>
      <p><b>Exemple — ¹⁶₈O :</b> Z = 8 → 8 protons et 8 électrons ; A = 16 → N = 16 − 8 = <b>8 neutrons</b>.</p>
      <div class="keys">Le <b>numéro atomique Z</b> caractérise un élément chimique : c’est lui qui définit l’élément (pas A).</div>` },

    { id: 'isotopes', titre: 'Les isotopes', html: `
      <div class="quote">Les isotopes sont des nucléides d’un <b>même élément chimique</b> dont les noyaux possèdent le <b>même nombre de protons Z</b> et un <b>nombre de neutrons N différent</b>.</div>
      <table>
        <tr><th>Isotopes de l’hydrogène</th><th>Protons</th><th>Neutrons</th></tr>
        <tr><td>¹H (protium)</td><td>1</td><td>0</td></tr>
        <tr><td>²H (deutérium)</td><td>1</td><td>1</td></tr>
        <tr><td>³H (tritium)</td><td>1</td><td>2</td></tr>
      </table>
      <p class="mt"><b>Propriétés chimiques identiques</b>, <b>propriétés physiques différentes</b> (masse, stabilité) — certains isotopes sont <b>radioactifs</b>.</p>` },

    { id: 'masse', titre: 'Masse atomique et u.m.a.', html: `
      <table>
        <tr><th>Notion</th><th>Définition</th></tr>
        <tr><td>Masse atomique</td><td>Masse d’une <b>mole</b> d’atomes = masse d’un atome-gramme = masse de 𝒩 atomes</td></tr>
        <tr><td>Nombre d’Avogadro 𝒩</td><td><b>6,023·10²³ mol⁻¹</b></td></tr>
        <tr><td><b>u.m.a.</b></td><td>1/12 de la masse de l’atome de carbone 12 → <b>1 u.m.a. = (1/𝒩) g ≈ 1,663·10⁻²⁴ g</b></td></tr>
      </table>
      <pre class="sch">CALCUL DE LA MASSE ATOMIQUE D'UN ÉLÉMENT (avec isotopes) :

 M = Σ (abondance % × masse de l'isotope) / 100

Exemple du CHLORE :
  ³⁵Cl : 75,77 % × 34,9689
  ³⁷Cl : 24,23 % × 36,9659
  ────────────────────────────────►  M ≈ 35,45 g</pre>
      <p class="mt">Si un élément n’existe que sous <b>une seule forme isotopique</b>, sa masse = son nombre de masse A.</p>` },

    { id: 'modeles', titre: 'Modèles atomiques', html: `
      <table>
        <tr><th>Modèle</th><th>Principe</th><th>Limite / apport</th></tr>
        <tr><td><b>Rutherford</b></td><td>Modèle <b>planétaire</b> : noyau = soleil, électrons = planètes. L’atome a une structure <b>lacunaire</b> (du vide entre noyau et électrons)</td><td>Problème : d’après l’électromagnétisme, l’électron en mouvement perd de l’énergie → il devrait finir par s’écraser sur le noyau</td></tr>
        <tr><td><b>Niels Bohr</b></td><td>Complète Rutherford : impose des <b>orbites électroniques précises</b> (énergies quantifiées de chaque groupe d’électrons)</td><td>Explique la stabilité de l’atome et les spectres de raies</td></tr>
      </table>
      <p class="mt">Dans le modèle de Rutherford, la stabilité mécanique vient de la compensation entre <b>forces d’attraction électrostatique</b> (noyau–électrons) et <b>forces centrifuges</b>.</p>` }
  ],
  retenir: [
    'A = Z + N ; l’atome est neutre (Z protons = Z électrons).',
    'Isotopes : même Z, N différent → mêmes propriétés chimiques, différentes physiques.',
    '1 u.m.a. = 1/12 de la masse de ¹²C = 1,663·10⁻²⁴ g.',
    '𝒩 = 6,023·10²³ mol⁻¹.',
    'Rutherford = planétaire + structure lacunaire ; Bohr = orbites quantifiées.'
  ],
  pieges: [
    'Ne pas confondre nombre de masse A (nucléons) et numéro atomique Z (protons).',
    'Le neutron est neutre mais il a une masse ≈ celle du proton (1839 mₑ).',
    'La masse atomique du chlore (35,45) n’est PAS 35 ni 37 : c’est une moyenne pondérée.'
  ]
},

/* ============================ CHIMIE ORGANIQUE ============================ */
{
  id: 'chimie-organique',
  doc: '1MEor0A8rwdSBMhBI0dU0HpwgKQY1jaCz',
  module: 'chimie', emoji: '🛢️', duree: 35,
  titre: 'Chimie organique : nomenclature & hybridation',
  prof: 'Pr. Ibn Moussa',
  sousTitre: 'Atome de carbone, hybridations sp³/sp²/sp, alcanes, alcènes, alcynes',
  resume: 'Bases de la chimie organique : l’atome de carbone et ses hybridations, les représentations des molécules, puis les règles de nomenclature IUPAC des alcanes (ramifiés), alcènes et alcynes.',
  objectifs: [
    'Comprendre les configurations électroniques du carbone et les 3 hybridations',
    'Écrire les formules brute, développée, semi-développée, simplifiée',
    'Nommer un alcane ramifié (chaîne principale, indices, ordre alphabétique)',
    'Nommer alcènes et alcynes (diènes, triènes)'
  ],
  sections: [
    { id: 'generalites', titre: 'Généralités', html: `
      <p>Les <b>composés organiques</b> sont principalement constitués de <b>carbone</b> lié à d’autres éléments : H, O, N, S, P, Cl, Br…</p>
      <p>La chimie organique est partout : médicaments, cosmétiques, plastiques (PVC), textiles (nylon), engrais, pesticides, carburants, peintures, colorants alimentaires.</p>
      <div class="keys"><b>Les 4 objectifs fondamentaux du cours</b> : ① nomenclature ② isomérie & stéréoisomérie ③ effets électroniques (inducteur et mésomère) ④ notion de mécanismes réactionnels.</div>` },

    { id: 'carbone', titre: 'L’atome de carbone & hybridations', html: `
      <p>Le carbone appartient à la <b>4ᵉ famille</b> (colonne IV) du tableau, <b>Z = 6</b>, configuration : <b>1s² 2s² 2p²</b>.</p>
      <pre class="sch">ÉTAT FONDAMENTAL          PROMOTION (lors des liaisons)
   1s² 2s² 2p²       ──►    1s² 2s¹ 2p³  → 4 électrons célibataires
                                          → 4 liaisons covalentes possibles</pre>
      <table>
        <tr><th>Hybridation</th><th>Quand ?</th><th>Géométrie</th><th>Exemple</th></tr>
        <tr><td><b>sp³</b></td><td>4 liaisons <b>simples σ</b></td><td>Tétraédrique (109°28′)</td><td>CH₄, méthane</td></tr>
        <tr><td><b>sp²</b></td><td>3 σ + <b>1 liaison π</b></td><td>Triangulaire plane (120°)</td><td>H₂C=CH₂, éthylène</td></tr>
        <tr><td><b>sp</b></td><td>2 σ + <b>2 liaisons π</b></td><td>Linéaire (180°)</td><td>HC≡CH, acétylène</td></tr>
      </table>
      <p class="mt">Le carbone atteint ainsi la configuration d’un <b>gaz noble</b> (le néon) en complétant ses 4 cases quantiques.</p>` },

    { id: 'representations', titre: 'Représentations des molécules', html: `
      <table>
        <tr><th>Formule</th><th>Principe</th><th>Exemple (butane)</th></tr>
        <tr><td><b>Brute</b></td><td>Nature et nombre d’atomes</td><td>C₄H₁₀</td></tr>
        <tr><td><b>Développée</b></td><td>Toutes les liaisons</td><td>H₃C—CH₂—CH₂—CH₃ détaillé</td></tr>
        <tr><td><b>Semi-développée</b></td><td>Groupes condensés</td><td>CH₃—CH₂—CH₂—CH₃</td></tr>
        <tr><td><b>Simplifiée</b></td><td>Squelette (traits)</td><td>ligne brisée</td></tr>
      </table>
      <div class="keys">⚠️ La <b>formule plane ne représente pas la structure spatiale</b>.</div>` },

    { id: 'nom-compose', titre: 'Anatomie d’un nom (IUPAC)', html: `
      <pre class="sch">   PRÉFIXES  +  CHAÎNE PRINCIPALE  +  SUFFIXE D'INSATURATION  +  SUFFIXE DE FONCTION
   (substituants)     (alcane...)         (-ène / -yne)          (-ol, -al, -one...)
        A                  B                     C                        D</pre>
      <p>Règles élaborées par l’<b>IUPAC</b> (International Union of Pure and Applied Chemistry).</p>` },

    { id: 'alcanes', titre: 'Hydrocarbures saturés : alcanes', html: `
      <p>Formule brute : <b>CₙH₂ₙ₊₂</b>. Nom = préfixe du nombre de carbones + terminaison <b>-ane</b>.</p>
      <table>
        <tr><th>C</th><th>Préfixe</th><th>C</th><th>Préfixe</th></tr>
        <tr><td>1</td><td>méth-</td><td>8</td><td>oct-</td></tr>
        <tr><td>2</td><td>éth-</td><td>9</td><td>non-</td></tr>
        <tr><td>3</td><td>prop-</td><td>10</td><td>déc-</td></tr>
        <tr><td>4</td><td>but-</td><td>11</td><td>undéc-</td></tr>
        <tr><td>5</td><td>pent-</td><td>12</td><td>dodéc-</td></tr>
        <tr><td>6</td><td>hex-</td><td>13</td><td>tridéc-</td></tr>
        <tr><td>7</td><td>hept-</td><td>—</td><td>—</td></tr>
      </table>
      <div class="keys"><b>Règles des alcanes ramifiés</b> : chaîne principale = la plus longue · indices les plus <b>petits possibles</b> · substituants en <b>-yl</b> (sans « e ») · placés <b>avant</b> le groupe principal · ordre <b>alphabétique</b> · multiplicités : 2 = di, 3 = tri, 4 = tétra.</div>
      <pre class="sch">            CH₃
CH₃-CH₂-CH₂-CH-CH₂-CH₃   →  3-méthylhexane   (numérotation la plus basse)</pre>` },

    { id: 'insatures', titre: 'Hydrocarbures insaturés : alcènes & alcynes', html: `
      <table>
        <tr><th>Famille</th><th>Formule brute</th><th>Terminaison</th><th>Exemple</th></tr>
        <tr><td><b>Alcènes</b> (double liaison)</td><td>CₙH₂ₙ</td><td>-ène</td><td>but-1-ène : CH₂=CH-CH₂-CH₃</td></tr>
        <tr><td><b>Alcynes</b> (triple liaison)</td><td>CₙH₂ₙ₋₂</td><td>-yne</td><td>hept-2-yne</td></tr>
      </table>
      <p><b>Plusieurs doubles liaisons :</b> on donne l’indice le plus bas à l’ensemble, on ajoute « a » → <b>alca-x,y,z-…-polyène</b>. Nombre de doubles liaisons : 2 = diène, 3 = triène.</p>
      <table>
        <tr><th>Nom systématique</th><th>Nom usuel (à connaître)</th></tr>
        <tr><td>éthényle</td><td><b>vinyle</b> (CH₂=CH—)</td></tr>
        <tr><td>prop-2-ényle</td><td><b>allyle</b> (CH₂=CH-CH₂—)</td></tr>
      </table>
      <p class="mt">Quand doubles et triples liaisons coexistent, les règles des composés éthyléniques s’appliquent avec des indices les plus bas possibles pour l’ensemble des insaturations.</p>` }
  ],
  retenir: [
    'Configuration du carbone : 1s² 2s² 2p² → 4 liaisons covalentes.',
    'sp³ = 4 σ (tétraédrique) · sp² = 3 σ + 1 π (plane) · sp = 2 σ + 2 π (linéaire).',
    'Alcanes CₙH₂ₙ₊₂ · alcènes CₙH₂ₙ · alcynes CₙH₂ₙ₋₂.',
    'Chaîne principale la plus longue + indices les plus bas + ordre alphabétique.',
    'Vinyle et allyle sont des noms usuels (à utiliser en nomenclature).'
  ],
  pieges: [
    'Les substituants perdent le « e » final (méthyle, éthyle, butyle…).',
    '2 = di, 3 = tri, 4 = tétra — et on les place par ordre alphabétique, pas numérique.',
    'La formule plane ne donne AUCUNE information spatiale.'
  ]
},

/* ============================ BIOPHYSIQUE ============================ */
{
  id: 'biophy-ultrasons',
  doc: '1eNxDaeZAscZUHiDRru7sHEFkYCeXSd8e',
  module: 'biophysique', emoji: '🔊', duree: 30,
  titre: 'Bases physiques des ultrasons',
  prof: 'Pr. Khalid El Boussiri',
  sousTitre: 'Ondes sonores, phénomènes périodiques, vitesse du son et échographie',
  resume: 'Le cours part des phénomènes périodiques (période, fréquence, amplitude) pour arriver à l’onde sonore : nature, domaine, vitesse de propagation, atténuation, réflexion et application à l’échographie.',
  objectifs: [
    'Définir période, fréquence, élongation, amplitude',
    'Écrire l’équation d’un phénomène sinusoïdal',
    'Connaître la nature et les domaines de l’onde sonore',
    'Retenir les ordres de grandeur de la vitesse du son'
  ],
  sections: [
    { id: 'periodique', titre: 'Phénomènes périodiques : les définitions', html: `
      <p>Un <b>phénomène périodique</b> se reproduit dans le temps en restant identique à lui-même.</p>
      <table>
        <tr><th>Grandeur</th><th>Définition</th><th>Unité</th></tr>
        <tr><td><b>Période T</b></td><td>Temps au bout duquel le phénomène se reproduit</td><td>s</td></tr>
        <tr><td><b>Fréquence ν</b></td><td>Nombre de périodes par unité de temps : ν = 1/T</td><td>hertz (Hz) = s⁻¹</td></tr>
        <tr><td><b>Élongation u</b></td><td>Mouvement d’une particule en un point x du milieu</td><td>—</td></tr>
        <tr><td><b>Amplitude A</b></td><td>Valeur <b>maximale</b> de l’élongation</td><td>—</td></tr>
        <tr><td><b>Célérité c</b></td><td>Vitesse de déplacement de l’onde dans le milieu</td><td>m/s</td></tr>
      </table>
      <pre class="sch">Mouvement vibratoire :  u(x,t) = A · f(t)
Vitesse :  v = du/dt = A·f'(t)
Accélération :  γ = dv/dt = d²u/dt²

Phénomène sinusoïdal :  u(x,t) = A·sin(ωt)
   ω = pulsation (rad·s⁻¹) = 2π/T = 2πν</pre>` },

    { id: 'moyennes', titre: 'Valeur moyenne de l’élongation', html: `
      <pre class="sch">Sur une PÉRIODE entière :        Ū = 0
Sur une DEMI-période :           Ū = 2A/π  ≈ 0,637 A</pre>
      <p class="mt">Repère graphique : à t = 0 → u = 0 ; à t = T/4 → u = +A ; à t = T/2 → u = 0 ; à t = T → u = 0.</p>` },

    { id: 'onde', titre: 'L’onde sonore', html: `
      <div class="quote">Les ondes sonores sont des <b>ondes mécaniques longitudinales</b> caractérisées par des <b>fluctuations de densité et de pression</b>.</div>
      <pre class="sch">Mouvement périodique ──► ondes de pression
Les particules du milieu font un va-et-vient dans l'axe de déplacement
(analogie avec un ressort : condensations / rarefactions)

Paramètres de propagation :  ν = 1/T   ·   λ = célérité / ν (longueur d'onde)</pre>
      <table>
        <tr><th>Domaine</th><th>Fréquence</th></tr>
        <tr><td><b>Infrasons</b></td><td>f &lt; 20 Hz</td></tr>
        <tr><td><b>Sons audibles</b></td><td>20 Hz &lt; f &lt; 20 kHz</td></tr>
        <tr><td><b>Ultrasons</b></td><td>20 kHz &lt; f &lt; 20 MHz</td></tr>
      </table>` },

    { id: 'vitesse', titre: 'Vitesse de propagation (ordres de grandeur)', html: `
      <table>
        <tr><th>Milieu</th><th>Température</th><th>Vitesse</th></tr>
        <tr><td>Air</td><td>0 °C</td><td>331 m/s</td></tr>
        <tr><td>Air</td><td>20 °C</td><td><b>343 m/s</b></td></tr>
        <tr><td>Hélium</td><td>0 °C</td><td>965 m/s</td></tr>
        <tr><td>Eau</td><td>20 °C</td><td><b>1482 m/s</b></td></tr>
        <tr><td>Mercure</td><td>20 °C</td><td>1450 m/s</td></tr>
        <tr><td>Cuivre</td><td>—</td><td>5010 m/s</td></tr>
        <tr><td>Acier</td><td>—</td><td>5980 m/s</td></tr>
      </table>
      <div class="keys"><b>À retenir</b> : la vitesse augmente du <b>gaz → liquide → solide</b> (le milieu est plus « rigide »). C’est pour ça que l’échographie utilise un gel : pour éviter l’interface air/peau.</div>` },

    { id: 'attenuation', titre: 'Points essentiels & échographie', html: `
      <ul>
        <li>L’onde sonore · sa nature · la vitesse du son</li>
        <li>Le <b>niveau de puissance acoustique</b></li>
        <li>Le <b>coefficient d’atténuation</b> (l’onde perd de l’énergie en traversant le milieu)</li>
        <li>La <b>réflexion</b> d’une onde sonore à une interface → base de l’<b>échographie</b></li>
      </ul>
      <p class="mt">L’échographie exploite la réflexion des ultrasons : l’écho renvoyé par les tissus permet de reconstruire une image.</p>` }
  ],
  retenir: [
    'ν = 1/T ; ω = 2πν = 2π/T ; u = A·sin(ωt).',
    'Ū = 0 sur une période ; Ū = 2A/π sur une demi-période.',
    'Onde sonore = mécanique LONGITUDINALE (pression/densité).',
    'Infrasons < 20 Hz < audibles < 20 kHz < ultrasons < 20 MHz.',
    'Air 343 m/s (20 °C) · eau 1482 m/s · acier 5980 m/s.'
  ],
  pieges: [
    'Le son ne se propage PAS dans le vide (onde mécanique).',
    'Ne pas confondre vitesse de vibration (v) et vitesse de propagation (célérité c).',
    '20 kHz = limite inférieure des ultrasons, pas supérieure.'
  ]
},

/* ============================ BIOPHYSIQUE / RADIO ============================ */
{
  id: 'biophy-rayonnements',
  doc: '1oW1oP0-MJBnAXnQ-C6b5xsC966hj965a',
  module: 'biophysique', emoji: '☢️', duree: 40,
  titre: 'Interactions des rayonnements ionisants avec la matière',
  prof: 'Pr. Khalil El Guermaï',
  sousTitre: 'Collisions, freinage, effet photoélectrique, Compton, matérialisation, atténuation',
  resume: 'Cours fondamental de radiophysique : ce qu’est un rayonnement ionisant, les interactions des électrons avec la matière (collision, freinage), les effets photoélectrique, Compton et de matérialisation, et la loi d’atténuation.',
  objectifs: [
    'Définir un rayonnement ionisant',
    'Distinguer collision et freinage (+ pouvoirs d’arrêt, TLE)',
    'Décrire les 3 effets d’interaction X/γ avec la matière',
    'Utiliser la loi d’atténuation et la CDA'
  ],
  sections: [
    { id: 'intro', titre: 'Introduction', html: `
      <div class="quote">Un <b>rayonnement ionisant</b> est un rayonnement capable de déposer assez d’énergie dans la matière qu’il traverse pour créer une <b>ionisation</b> — c’est-à-dire arracher des électrons à la matière.<span>Pr. El Guermaï</span></div>
      <table>
        <tr><th>Idée</th><th>Conséquence</th></tr>
        <tr><td>Les RI ne peuvent être détectés et caractérisés que par leurs <b>interactions</b> avec la matière</td><td>Base de la détection</td></tr>
        <tr><td>Ils cèdent leur énergie en tout ou partie au milieu</td><td>Dépôt de dose</td></tr>
        <tr><td>La matière traversée subit des modifications</td><td>Effets biologiques → <b>radioprotection</b></td></tr>
      </table>
      <pre class="sch">RAYONNEMENTS NON IONISANTS  │  RAYONNEMENTS IONISANTS
radio, TV, téléphone,       │  ULTRA-VIOLET (limite) →
micro-ondes, IR, visible    │  RAYONS X et γ
                            │
Effets selon le TYPE de rayonnement et la DOSE reçue
 α : arrêtée par une feuille de papier
 β : quelques mm d'aluminium
 γ : ≈ 1 m de béton ou de plomb</pre>` },

    { id: 'electrons', titre: 'Interaction des électrons avec la matière', html: `
      <p>Quand un faisceau d’électrons pénètre la matière, il perd progressivement son énergie cinétique. Deux types d’interaction :</p>
      <table>
        <tr><th>Interaction</th><th>Nom</th><th>Conséquence</th></tr>
        <tr><td>Électron incident ↔ <b>électron atomique</b></td><td><b>Collision</b></td><td>Ionisation ou excitation du milieu</td></tr>
        <tr><td>Électron incident ↔ <b>environnement d’un noyau</b></td><td><b>Freinage</b></td><td>Production de <b>rayons X</b> (rayonnement de freinage)</td></tr>
      </table>
      <pre class="sch">IONISATION : si l'énergie transférée > énergie de liaison d'un e⁻ de l'atome
             → l'électron est expulsé du cortège (surtout couche K, fortement liée)

EXCITATION : si l'énergie transférée = exactement la différence entre
             les énergies de liaison de 2 couches → l'électron change de couche</pre>
      <p><b>Pouvoirs d’arrêt :</b> par collision (S<sub>c</sub>) et par freinage (S<sub>f</sub>) ; notion de <b>T.L.E.</b> (Transfert Linéique d’Énergie).</p>` },

    { id: 'effets', titre: 'Les 3 effets des X et γ avec la matière', html: `
      <table>
        <tr><th>Effet</th><th>Mécanisme</th><th>Quand domine-t-il ?</th></tr>
        <tr><td><b>Photoélectrique</b></td><td>Un photon X arrive près d’un électron <b>d’une couche profonde</b> et l’éjecte : le photon est <b>absorbé</b> → photoélectron + ion positif ; un électron plus superficiel comble le « trou » en émettant un rayon X caractéristique de <b>faible énergie</b></td><td>Faible énergie — effet majeur pour des tensions <b>&lt; 70 kV</b> ; principal dans les matières organiques</td></tr>
        <tr><td><b>Compton</b></td><td>Un photon X rencontre un électron <b>périphérique peu lié</b> (« libre ») : transfert partiel d’énergie → électron Compton + photon <b>diffusé</b> de direction différente et d’énergie <b>inférieure</b></td><td>Énergies plus élevées ; responsable du <b>flou</b> (diffusion)</td></tr>
        <tr><td><b>Matérialisation</b> (création de paires)</td><td>À très haute énergie, le photon se transforme en une <b>paire électron-positon</b></td><td>Très hautes énergies (au-delà de 1,022 MeV)</td></tr>
      </table>
      <pre class="sch">EFFET PHOTOÉLECTRIQUE                    EFFET COMPTON
photon ──► atome                        photon ──► atome
   ▼                                        ▼
électron K éjecté (photoélectron)       électron "libre" éjecté
   ▼                                        ▼
trou comblé → RX caractéristique        photon DIFFUSÉ (E' < E)
   + ion positif                           + ion positif

Résultat : ARRÊT du rayon X        Résultat : DÉVIATION + perte d'énergie</pre>` },

    { id: 'attenuation', titre: 'Loi d’atténuation', html: `
      <pre class="sch">I = I₀ · e^(−µx)

  I₀ : intensité incidente        µ : coefficient d'atténuation LINÉAIRE
  I  : intensité transmise        x  : épaisseur traversée

Coefficient d'atténuation MASSIQUE : µ/ρ
COUCHE DE DEMI-ATTÉNUATION : CDA = ln2 / µ  ≈ 0,693/µ
  (épaisseur qui réduit l'intensité de moitié)</pre>
      <p><b>Importance relative des 3 effets :</b> elle dépend de l’énergie du photon et du numéro atomique du milieu — d’où l’<b>atténuation sélective</b> qui crée le <b>contraste</b> radiographique.</p>
      <div class="keys"><b>Pont avec le cours de radiologie</b> : c’est exactement ce mécanisme qui explique pourquoi l’os (Z élevé) apparaît blanc et les tissus mous gris sur une radio dentaire.</div>` }
  ],
  retenir: [
    'Ionisant = capable d’arracher des électrons à la matière.',
    'Collision (avec e⁻) → ionisation/excitation · freinage (avec noyau) → RX.',
    'Photoélectrique : absorption totale, majeur < 70 kV.',
    'Compton : photon diffusé d’énergie inférieure → flou.',
    'I = I₀·e^(−µx) ; CDA = ln2/µ.'
  ],
  pieges: [
    'Collision ≠ freinage : l’un ionise, l’autre produit des rayons X.',
    'Effet photoélectrique augmente quand l’énergie DIMINUE (donc en basse tension).',
    'Le TLE concerne l’énergie déposée par unité de longueur, pas la dose absorbée.'
  ]
},

/* ============================ BIOPHYSIQUE / RADIOLOGIE ============================ */
{
  id: 'biophy-radiologie',
  doc: '1AH0mLhLm0UB1zkc-brafWzA_u-lL3e4Z',
  module: 'biophysique', emoji: '🩻', duree: 40,
  titre: 'Principes physiques de l’imagerie en odontologie',
  prof: 'Pr. Bouzoubaa Sidi Mohammed',
  sousTitre: 'Rayons X, tube de Coolidge, effet photoélectrique et Compton, triade de la radiologie',
  resume: 'Comment on produit une image radiologique : historique et définition des rayons X, le tube (de Coolidge) et son anode tournante, puis les interactions avec la matière et le détecteur — la fameuse triade source / objet / détecteur.',
  objectives: [],
  objectifs: [
    'Définir le rayon X et le situer dans le spectre',
    'Décrire la production des RX (tube de Coolidge)',
    'Expliquer les effets photoélectrique et Compton',
    'Utiliser la triade de la radiologie'
  ],
  sections: [
    { id: 'historique', titre: 'Historique & définition', html: `
      <table>
        <tr><th>Élément</th><th>Détail</th></tr>
        <tr><td>1895</td><td><b>Wilhelm Conrad Röntgen</b> découvre les rayons X</td></tr>
        <tr><td>1901</td><td><b>Prix Nobel</b> (le premier de physique)</td></tr>
        <tr><td>Tube</td><td>Expérience réalisée dans un tube en l’absence d’air, avec anode et cathode ; il sensibilise un film à distance et photographie le squelette de sa main</td></tr>
        <tr><td>Autres noms</td><td>X rays · الأشعة السينية</td></tr>
      </table>
      <p><b>Définition :</b> le rayon X est un <b>rayonnement électromagnétique</b>, comme les ondes radio, la lumière visible ou les infrarouges — mais <b>très pénétrant</b>.</p>
      <table>
        <tr><th>Rayonnement</th><th>Longueur d’onde (m)</th></tr>
        <tr><td>Rayons gamma</td><td>10⁻¹²</td></tr>
        <tr><td><b>Rayons X</b></td><td>10⁻⁹ (ordre de 10⁻⁸ à 10⁻¹²)</td></tr>
        <tr><td>Ultraviolet (UV)</td><td>10⁻⁶</td></tr>
        <tr><td>Infrarouge (IR)</td><td>10⁻³</td></tr>
        <tr><td>Micro-ondes</td><td>1</td></tr>
        <tr><td>Ondes radio</td><td>10⁶</td></tr>
      </table>
      <p class="mt">Fréquences : <b>10¹⁶ à 10²⁰ Hz</b> · Énergie des photons X : <b>40 eV à 4·10⁵ eV</b>.</p>` },

    { id: 'production', titre: 'Production des rayons X : le tube de Coolidge', html: `
      <div class="keys"><b>Objectifs du cours</b> : définir le rayon X · décrire la production · décrire les interactions avec la matière · décrire l’interaction avec le détecteur.</div>
      <pre class="sch">LE TUBE DE COOLIDGE (tube à rayons X) = tube de verre où règne un VIDE POUSSÉ

  ┌─────────────── TUBE SOUS VIDE ───────────────┐
  │  CATHODE                    ANODE (cible)     │
  │  filament de tungstène  ──►  piste en tungstène
  │  coupelle de focalisation    corps en molybdène ou graphite
  │  circuit de chauffage        ──► fenêtre en béryllium
  └──────────────────────────────────────────────┘

① Les électrons sont EXTRAITS d'une cathode de tungstène chauffée
② Ils sont ACCÉLÉRÉS par une haute tension dans le vide
③ Ils BOMBARDENT une cible métallique (anode / anti-cathode)
④ L'émission de RX résulte des interactions de FREINAGE
   entre électrons rapides et particules de la cible</pre>
      <p><b>Anode tournante :</b> le faisceau d’électrons frappe sa partie périphérique — une piste de tungstène orientée obliquement par rapport au faisceau. Elle sert à <b>dissiper la chaleur</b> et à permettre des expositions répétées.</p>` },

    { id: 'triade', titre: 'La triade de la radiologie', html: `
      <pre class="sch">   SOURCE RX  ──►  OBJET  ──►  DÉTECTEUR

   Production      Interactions      Interactions
   de rayons X     photons-matière   photons-matière
        │                │                │
        ▼                ▼                ▼
   Interactions    Formation de      Formation de
   électrons-      l'image RADIANTE  l'image RADIOLOGIQUE
   matière</pre>
      <p><b>Schéma général de la radiologie :</b> la source · l’objet · les détecteurs · les formations géométriques.</p>` },

    { id: 'interactions', titre: 'Interaction avec la matière & le détecteur', html: `
      <p>En radiodiagnostic, l’interaction avec la matière organique comprend essentiellement <b>l’effet photoélectrique</b> et <b>l’effet Compton</b>.</p>
      <table>
        <tr><th></th><th>Effet photoélectrique</th><th>Effet Compton</th></tr>
        <tr><td>
          <b>Points du cours</b></td><td>Mécanisme · Conséquences · Effets secondaires · Conclusion</td><td>Mécanisme · Conséquences</td></tr>
        <tr><td><b>Électron visé</b></td><td>Couche profonde</td><td>Périphérique, peu lié</td></tr>
        <tr><td><b>Sort du photon</b></td><td>Absorbé (arrêt du rayon X)</td><td>Diffusé, énergie inférieure</td></tr>
        <tr><td><b>Seuil</b></td><td>Effet majeur pour tensions &lt; <b>70 kV</b></td><td>Augmente avec l’énergie</td></tr>
      </table>
      <p><b>Conséquences biologiques :</b> le photoélectron produit peut avoir des <b>effets biologiques néfastes</b> — un ion positif est créé dans les deux cas.</p>
      <div class="keys">Comprendre ces mécanismes permet de saisir les facteurs de l’<b>atténuation sélective</b> du faisceau — donc le <b>contraste</b> de l’image radiographique.</div>` },

    { id: 'plan', titre: 'Plan complet du module (utile pour se repérer dans l’année)', html: `
      <table>
        <tr><th>Chapitre</th><th>Semestre</th></tr>
        <tr><td>1. Principes physiques des rayons X</td><td><b>S1</b></td></tr>
        <tr><td>2. Initiation à la radiologie</td><td><b>S1</b></td></tr>
        <tr><td>3. Radioprotection</td><td><b>S1</b></td></tr>
        <tr><td>4. Incidences standards intra-orales (rétroalvéolaire, rétrocoronaire, occlusal)</td><td>S3</td></tr>
        <tr><td>4 bis. Incidences extra-orales (téléradiographie de profil, radiographie de face)</td><td>S6</td></tr>
        <tr><td>5. Incidence tomographique (panoramique)</td><td>S6</td></tr>
        <tr><td>6. Incidence volumétrique 3D (scanner, cone beam)</td><td>S8</td></tr>
        <tr><td>7. Examens complémentaires : IRM, échographie…</td><td>—</td></tr>
      </table>` }
  ],
  retenir: [
    '1895 Röntgen ; Nobel 1901.',
    'RX = rayonnement électromagnétique très pénétrant (10⁻⁹ m, 40 eV → 4·10⁵ eV).',
    'Tube de Coolidge : cathode tungstène → électrons accélérés → cible = anode.',
    'Triade : source → objet → détecteur (image radiante → image radiologique).',
    'Photoélectrique (absorption) + Compton (diffusion) = contraste + flou.'
  ],
  pieges: [
    'L’émission de RX vient du FREINAGE des électrons sur la cible, pas de l’échauffement.',
    'La fenêtre du tube est en béryllium, la piste de l’anode en tungstène.',
    'Anode tournante ≠ anode fixe : elle limite l’échauffement en répartissant le bombardement.'
  ]
},

/* ============================ PHYSIOLOGIE ============================ */
{
  id: 'physio-digestif',
  doc: '1XH0C2tWu5tVazpsbDZl9t3ZMNFkpwwwC',
  module: 'anatomie', emoji: '🍽️', duree: 35,
  titre: 'Physiologie — Le système digestif',
  prof: 'Pr. Sabry Sanâ',
  sousTitre: 'Des 5 fonctions digestives aux sucs, enzymes et hormones — avec tous les volumes',
  resume: 'Résumé complet de physiologie digestive : organisation du tube digestif, histologie, bouche, œsophage, estomac, pancréas, foie, intestin grêle et gros intestin — avec tous les chiffres à retenir.',
  objectifs: [
    'Citer les 5 fonctions essentielles du système digestif',
    'Décrire les 4 tuniques du tube digestif',
    'Connaître les cellules gastriques et leurs sécrétions',
    'Retenir les volumes et les enzymes clés'
  ],
  sections: [
    { id: 'intro', titre: 'Les 5 fonctions essentielles', html: `
      <table>
        <tr><th>Fonction</th><th>Définition</th></tr>
        <tr><td><b>Ingestion</b></td><td>Introduction des aliments dans la bouche</td></tr>
        <tr><td><b>Mouvement</b></td><td>Déplacement de la nourriture le long du tube digestif</td></tr>
        <tr><td><b>Digestion</b></td><td>Transformation mécanique et chimique</td></tr>
        <tr><td><b>Absorption</b></td><td>Passage des nutriments vers les systèmes cardiovasculaire et lymphatique</td></tr>
        <tr><td><b>Défécation</b></td><td>Expulsion des substances non digestibles</td></tr>
      </table>
      <pre class="sch">TUBE DIGESTIF : bouche → pharynx → œsophage → estomac → intestin grêle → gros intestin → anus
ORGANES ANNEXES : dents, langue, glandes salivaires, foie, vésicule biliaire, pancréas</pre>` },

    { id: 'histo', titre: 'Histologie : les 4 tuniques', html: `
      <table>
        <tr><th>Tunique (de l’intérieur vers l’extérieur)</th><th>Fonctions</th></tr>
        <tr><td><b>Muqueuse</b></td><td>Sécrétion (mucus, enzymes, hormones), absorption, protection</td></tr>
        <tr><td><b>Sous-muqueuse</b></td><td>Tissu conjonctif : vaisseaux sanguins, lymphatiques, follicules lymphoïdes, neurofibres</td></tr>
        <tr><td><b>Musculeuse</b></td><td>Segmentation et péristaltisme (circulaire interne + longitudinale externe) ; forme les sphincters</td></tr>
        <tr><td><b>Séreuse</b></td><td>Couche la plus externe = péritoine viscéral</td></tr>
      </table>` },

    { id: 'bouche', titre: 'La bouche', html: `
      <table>
        <tr><th>Glande salivaire</th><th>Part de la production</th></tr>
        <tr><td>Parotides</td><td>30 %</td></tr>
        <tr><td><b>Sous-maxillaires</b></td><td><b>65 %</b></td></tr>
        <tr><td>Sublinguales</td><td>5 %</td></tr>
      </table>
      <p><b>Production normale : 500 ml/jour</b> (dont 200 ml pendant les repas).</p>
      <table>
        <tr><th>Rôles de la salive</th><th>Digestion dans la bouche</th></tr>
        <tr><td>Lubrification (parole, mastication, déglutition) · hydratation et protection de la muqueuse · nettoyage · propriétés antibactériennes, antifongiques et antivirales · <b>reminéralisation des dents</b> · amorce la digestion des glucides</td><td><b>Mécanique</b> : mastication → bol alimentaire<br><b>Chimique</b> : amylase salivaire (amidon → maltose) · lipase linguale (triglycérides)</td></tr>
      </table>
      <p><b>Déglutition en 3 étapes :</b> ① volontaire (compression par la langue) ② pharyngienne (involontaire : arrêt respiratoire, bascule de l’épiglotte) ③ œsophagienne (involontaire : onde péristaltique).</p>` },

    { id: 'estomac', titre: 'L’estomac', html: `
      <p>Dilatation en forme de <b>J</b> sous le diaphragme : <b>cardia</b> (orifice supérieur) · <b>fundus</b> (zone de réserve) · <b>corps</b> · <b>pylore</b> (antre + canal + sphincter).</p>
      <table>
        <tr><th>Cellule</th><th>Sécrétion</th></tr>
        <tr><td><b>Principales</b></td><td>Pepsinogène (précurseur de la pepsine) + lipase gastrique</td></tr>
        <tr><td><b>Pariétales</b></td><td><b>HCl</b> + <b>facteur intrinsèque</b> (absorption de la vitamine B12)</td></tr>
        <tr><td><b>À mucus</b></td><td>Mucus : barrière protectrice de <b>1-3 mm</b></td></tr>
        <tr><td><b>G</b></td><td><b>Gastrine</b> (hormone, dans le sang)</td></tr>
      </table>
      <p><b>Suc gastrique : 2000-3000 ml/jour.</b></p>
      <table>
        <tr><th>Élément</th><th>Action</th></tr>
        <tr><td><b>HCl</b> (pH 2)</td><td>Détruit les microbes · dénature partiellement les protéines · convertit le pepsinogène en pepsine · stimule la sécrétion de bile et de suc pancréatique</td></tr>
        <tr><td><b>Pepsine</b></td><td>Brise les liaisons peptidiques → peptides ; très efficace en milieu acide ; coagule et digère les protéines du lait</td></tr>
        <tr><td><b>Lipase gastrique</b></td><td>Triglycérides à chaîne courte (pH 5-6)</td></tr>
        <tr><td><b>Gastrine</b></td><td>Stimule HCl + pepsinogène · contracte le SOI · augmente la motilité · relâche le pylore</td></tr>
      </table>
      <p class="mt"><b>Motricité</b> : ondes de mélange toutes les <b>15-25 secondes</b> (macération → <b>chyme</b>) + segmentation.<br>
      <b>Absorption</b> : très limitée — eau, électrolytes, certains médicaments (aspirine), alcool.</p>` },

    { id: 'pancreas', titre: 'Le pancréas', html: `
      <p>Glande oblongue de <b>12,5 × 2,5 cm</b> (tête, corps, queue). <b>Suc pancréatique : 1200-1500 ml/jour, pH 7,1-8,2.</b></p>
      <table>
        <tr><th>Cible</th><th>Enzymes</th></tr>
        <tr><td>Glucides</td><td>Amylase pancréatique</td></tr>
        <tr><td>Protéines</td><td>Trypsine · Chymotrypsine · Élastase · Carboxypeptidase</td></tr>
        <tr><td>Lipides</td><td><b>Lipase pancréatique</b> (principale chez l’adulte) · Phospholipase · Cholestérol-ester-hydrolase</td></tr>
        <tr><td>Acides nucléiques</td><td>Ribonucléase · Désoxyribonucléase</td></tr>
      </table>
      <pre class="sch">ACTIVATION (sécrétées sous forme INACTIVE pour protéger le pancréas) :
   Trypsinogène ──(entérokinase intestinale)──► TRYPSINE
   Chymotrypsinogène ──(trypsine)──► CHYMOTRYPSINE
   Procarboxypeptidase ──(trypsine)──► CARBOXYPEPTIDASE

Le bicarbonate de sodium tamponne l'acidité, interrompt la pepsine
et crée un pH adapté aux enzymes intestinales.</pre>` },

    { id: 'foie', titre: 'Le foie et la vésicule biliaire', html: `
      <table>
        <tr><th>Foie</th><th>Bile</th></tr>
        <tr><td>Plus gros organe après la peau · <b>1,4 kg</b> · sous le diaphragme</td><td>Production : <b>800-1000 ml/jour</b> · pH 7,6-8,6 · composition : eau, acides et sels biliaires, cholestérol, lécithine, bilirubine, HCO₃⁻, ions</td></tr>
      </table>
      <p><b>Vésicule biliaire :</b> sac en forme de poire de <b>7-10 cm</b> ; elle <b>stocke et concentre</b> la bile. Sa contraction l’expulse via le canal cystique → cholédoque → duodénum.</p>` },

    { id: 'intestin', titre: 'L’intestin grêle', html: `
      <p>Principal site de <b>digestion et d’absorption</b> : longueur <b>6,4 m</b>, diamètre 2,5 cm. Trois segments : <b>duodénum</b> (25 cm, reçoit le suc pancréatique et la bile) · <b>jéjunum</b> (2,5 m) · <b>iléon</b> (3,6 m, rejoint le gros intestin à la valve iléo-cæcale).</p>
      <table>
        <tr><th>Digestion des glucides</th><th>Enzyme</th></tr>
        <tr><td>Amidon → maltose, maltotriose, dextrines</td><td>Amylase pancréatique</td></tr>
        <tr><td>Dextrines → glucose</td><td>Dextrinase (bordure en brosse)</td></tr>
        <tr><td>Maltose → glucose</td><td>Maltase</td></tr>
        <tr><td>Saccharose → glucose + fructose</td><td>Sucrase</td></tr>
        <tr><td>Lactose → glucose + galactose</td><td>Lactase</td></tr>
      </table>
      <p class="mt">BB = <b>bordure en brosse</b> = enzymes de la muqueuse intestinale.<br>
      <b>Digestion des protéines</b> : trypsine (protéines → peptides), chymotrypsine, puis les peptidases de bordure en brosse → acides aminés.<br>
      <b>Motricité</b> : segmentation (mélange, contact avec la muqueuse) + péristaltisme ; séjour du chyme <b>3-5 heures</b>.</p>` }
  ],
  retenir: [
    '5 fonctions : ingestion, mouvement, digestion, absorption, défécation.',
    '4 tuniques : muqueuse, sous-muqueuse, musculeuse, séreuse.',
    'Salive : 500 ml/j (sous-maxillaires 65 %) ; suc gastrique 2000-3000 ml/j ; suc pancréatique 1200-1500 ml/j ; bile 800-1000 ml/j.',
    'Cellules gastriques : principales (pepsinogène) · pariétales (HCl + facteur intrinsèque) · à mucus · G (gastrine).',
    'Intestin grêle 6,4 m : duodénum 25 cm, jéjunum 2,5 m, iléon 3,6 m.'
  ],
  pieges: [
    'La pepsine agit en milieu ACIDE (pH 2) ; l’amylase salivaire est inactivée par l’acidité gastrique.',
    'L’estomac n’absorbe presque rien (eau, électrolytes, aspirine, alcool).',
    'Facteur intrinsèque = cellules PARIÉTALES (avec le HCl) — indispensable pour la vitamine B12.'
  ]
},

/* ============================ PHYSIOLOGIE / NEURO ============================ */
{
  id: 'physio-neuro',
  doc: '15XRjGOm5p4HwcmDYR3uvtMm56rSAg9lf',
  module: 'anatomie', emoji: '🧠', duree: 30,
  titre: 'Physiologie — Résumé de neurophysiologie',
  prof: 'Notes de la promo (résumé)',
  sousTitre: 'Neurone, névroglie, potentiel de repos, canaux et pompes ioniques',
  resume: 'Résumé du cours de neurophysiologie : organisation du système nerveux, cellules du tissu nerveux (neurones et névroglie), potentiel de repos, canaux et pompes ioniques.',
  objectifs: [
    'Définir l’AFSN et ses 3 propriétés fonctionnelles',
    'Distinguer SNC / SNP et sympathique / parasympathique',
    'Nommer les cellules de la névroglie et leurs rôles',
    'Expliquer l’origine du potentiel de repos'
  ],
  sections: [
    { id: 'org', titre: 'Organisation du système nerveux', html: `
      <pre class="sch">SYSTÈME NERVEUX
├── CENTRAL (SNC) : encéphale (cerveau, cervelet, tronc cérébral) + moelle épinière
│                   = centre de TRAITEMENT et de COMMANDE
└── PÉRIPHÉRIQUE (SNP) : nerfs + ganglions = RELIE le SNC au reste du corps
     ├── SOMATIQUE : fonctions VOLONTAIRES (muscles squelettiques)
     │      nerfs moteurs · nerfs sensitifs
     └── AUTONOME (végétatif) : fonctions INVOLONTAIRES (muscle lisse, cardiaque)
            ├── orthosympathique (sympathique) : stress, danger, effort → fight or flight
            ├── parasympathique (crânio-sacré) : repos, détente, récupération
            └── entérique : contrôle des fonctions digestives

RÉGIONS : crânienne (niveau du tronc cérébral) · sacrée (niveau de la moelle épinière)</pre>
      <p><b>AFSN</b> (activité fonctionnelle du système nerveux) : permet à l’organisme de <b>recevoir, traiter et répondre</b> aux informations. Elle dépend de <b>3 propriétés</b> assurées par les neurones : <b>excitabilité</b> (réagir à un stimulus) · <b>conduction</b> (propager l’influx) · <b>transmission</b> (transmettre le signal).</p>` },

    { id: 'cellules', titre: 'Les cellules du tissu nerveux', html: `
      <p>Les neurones sont des cellules <b>très différenciées</b> (structure et fonction spécialisées) qui <b>ne se divisent plus</b>. Leur propriété fondamentale est l’<b>excitabilité</b>.</p>
      <pre class="sch">NEURONE : corps cellulaire (péricaryon) ─ dendrites ─ axone ─ arborisation terminale
Communication : neurone ↔ neurone · neurone ↔ fibre musculaire · neurone ↔ glandes
Synapse = zone de contact FONCTIONNELLE entre 2 cellules nerveuses</pre>
      <table>
        <tr><th>Type</th><th>Fonction</th></tr>
        <tr><td><b>Sensoriels (sensitifs)</b></td><td>Transmettent l’info des récepteurs (peau, yeux, oreilles) vers le SNC</td></tr>
        <tr><td><b>Moteurs</b></td><td>Envoient les ordres du SNC vers les organes effecteurs</td></tr>
        <tr><td><b>Interneurones (d’association)</b></td><td>À l’intérieur du SNC : connexions entre sensitifs et moteurs</td></tr>
      </table>
      <table>
        <tr><th>Névroglie (cellules de soutien)</th><th>Rôle</th></tr>
        <tr><td><b>Astrocytes</b></td><td>Maintien d’un environnement chimique adéquat</td></tr>
        <tr><td><b>Oligodendrocytes</b> (SNC)</td><td>Produisent la <b>gaine de myéline</b> → le PA se propage par <b>sauts de nœud en nœud</b></td></tr>
        <tr><td><b>Microglie</b></td><td>Cellules immunitaires du cerveau : éliminent débris et agents pathogènes</td></tr>
        <tr><td><b>Épendymaires</b></td><td>Tapissent le système ventriculaire (LCR qui protège et nourrit le SN)</td></tr>
        <tr><td><b>Cellules de Schwann</b></td><td>Myéline en <b>périphérie</b> (névrologie périphérique)</td></tr>
      </table>` },

    { id: 'pr', titre: 'Le potentiel de repos', html: `
      <div class="quote">Le potentiel de repos est une <b>différence de charge électrique</b> entre l’intérieur et l’extérieur de la membrane du neurone <b>au repos</b> (quand il ne transmet pas d’influx). Valeur moyenne : <b>−70 mV</b> (entre −50 et −90 mV).</div>
      <table>
        <tr><th>Ion</th><th>Milieu intracellulaire</th><th>Milieu extracellulaire</th></tr>
        <tr><td>Na⁺</td><td>15</td><td><b>150</b></td></tr>
        <tr><td>K⁺</td><td><b>150</b></td><td>5</td></tr>
        <tr><td>Cl⁻</td><td>45</td><td>145</td></tr>
        <tr><td>A⁻ (protéines)</td><td><b>400</b></td><td>0</td></tr>
      </table>
      <pre class="sch">ORIGINE DU POTENTIEL DE REPOS — 3 acteurs :</pre>
      <table>
        <tr><th>Acteur</th><th>Mécanisme</th></tr>
        <tr><td><b>① Répartition inégale des ions</b></td><td>Dedans : beaucoup de K⁺ et d’anions A⁻ (protéines⁻) · Dehors : beaucoup de Na⁺ et Cl⁻</td></tr>
        <tr><td><b>② Perméabilité sélective</b></td><td>La membrane est <b>plus perméable au K⁺ qu’au Na⁺</b> → le K⁺ sort plus facilement, laissant derrière lui les charges (−) → intérieur négatif</td></tr>
        <tr><td><b>③ Pompe Na⁺/K⁺ (ATPase)</b></td><td>Transport <b>actif</b> qui consomme de l’ATP : fait sortir <b>3 Na⁺</b> et entrer <b>2 K⁺</b> contre les gradients (1 ATP → 3 Na⁺/2 K⁺) → maintient le déséquilibre ionique</td></tr>
      </table>` },

    { id: 'proteines', titre: 'Protéines membranaires : canaux et pompes', html: `
      <p>La <b>bicouche phospholipidique</b> est <b>imperméable aux ions</b> : c’est grâce aux protéines transmembranaires que certains ions passent — mais pas tous, ni tout le temps.</p>
      <table>
        <tr><th>Type</th><th>Fonctionnement</th></tr>
        <tr><td><b>Canaux ioniques</b></td><td>Ouvertures sélectives laissant passer un ion précis ; <b>sans dépense d’énergie</b></td></tr>
        <tr><td><b>Pompes ioniques</b></td><td>Transport actif <b>avec consommation d’ATP</b> (pompe Na⁺/K⁺)</td></tr>
      </table>
      <div class="keys">Le potentiel d’action est une <b>variation rapide</b> du potentiel de membrane : c’est lui qui se propage le long de l’axone pour constituer l’influx nerveux.</div>` }
  ],
  retenir: [
    'AFSN = 3 propriétés : excitabilité, conduction, transmission.',
    'SNP = somatique (volontaire) + autonome (involontaire : sympathique/parasympathique + entérique).',
    'Oligodendrocytes = SNC ; cellules de Schwann = périphérie (myéline).',
    'Potentiel de repos ≈ −70 mV.',
    'Pompe Na⁺/K⁺ : 3 Na⁺ sortent, 2 K⁺ entrent, 1 ATP consommé.'
  ],
  pieges: [
    'La microglie = immunitaire ; les épendymaires = LCR ; ne pas confondre.',
    'La myéline n’est PAS produite par les mêmes cellules au SNC et en périphérie.',
    'La membrane est plus perméable au K⁺ qu’au Na⁺ au repos.'
  ]
},

/* ============================ MEMBRANE PLASMIQUE (1) ============================ */
{
  id: 'bio-membrane-1',
  doc: '1QNX_DvCQ_9gqGmoPpFzOqLSYlutXFEij',
  module: 'biologie', emoji: '🧱', duree: 30,
  titre: 'La membrane plasmique : structure, composition & propriétés',
  prof: 'Pr. F. Rhrich-Haddout',
  sousTitre: 'Lipides, protéines, glucides, mosaïque fluide et autoassemblage',
  resume: 'Tout sur l’enveloppe de la cellule : épaisseur, aspect au MET, composition biochimique (lipides 40 %, protéines 50 %, glucides 10 %), propriétés de la bicouche et modèle de la mosaïque fluide.',
  objectifs: [
    'Connaître la structure de la membrane plasmique',
    'Décrire sa composition biochimique',
    'Décrire les propriétés de la bicouche lipidique',
    'Décrire le modèle de la mosaïque fluide'
  ],
  sections: [
    { id: 'def', titre: 'Définition', html: `
      <ul>
        <li>Enveloppe <b>mince et continue</b>, <b>non visible au microscope optique (MO)</b>.</li>
        <li><b>Semi-perméable</b> : laisse passer le solvant (eau) et une fraction des solutés.</li>
        <li>Sépare le <b>cytoplasme</b> du <b>milieu extérieur</b>.</li>
        <li>Autres noms : membrane cytoplasmique = <b>plasmalemme</b>.</li>
        <li>Épaisseur : <b>7 à 8 nm</b>.</li>
      </ul>
      <div class="keys">Un <b>soluté</b> = substance contenue à l’état dissous dans une solution.</div>` },

    { id: 'met', titre: 'Aspect au MET : structure trilaminaire', html: `
      <table>
        <tr><th>Grossissement</th><th>Ce qu’on observe</th></tr>
        <tr><td>40 000 – 50 000 ×</td><td>Une structure simple, dense et noire</td></tr>
        <tr><td>&gt; 150 000 ×</td><td><b>Structure trilaminaire</b> : 2 feuillets denses (<b>2 nm</b>) entourant un feuillet clair (<b>3,5 nm</b>) → <b>modèle de Davson et Danielli (1954)</b></td></tr>
      </table>
      <pre class="sch">   MILIEU EXTRACELLULAIRE
   ─────────────────────────  ← feuillet dense externe (souvent plus épais, > 2 nm)
   ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅  ← GLYCOCALYX (revêtement fibreux / Cell-coat)
   ─────────────────────────  ← feuillet dense
   ░░░░░░░░░░░░░░░░░░░░░░░░░  ← feuillet clair (3,5 nm)
   ─────────────────────────  ← feuillet dense
   MILIEU INTRACELLULAIRE (hyaloplasme)

   Le GLYCOCALYX = chaînes glucidiques attachées aux protéines ou aux lipides
   → il crée une ASYMÉTRIE de la membrane plasmique</pre>
      <p><b>Technique du cryodécapage :</b> les répliques montrent que la membrane est formée de <b>deux couches clivables</b> renfermant des <b>particules globulaires intramembranaires de 50 à 80 Å</b> = les <b>protéines</b>.</p>
      <p class="mt">Rappel : 1 Ångström (Å) = 0,1 nm = 10⁻¹⁰ m.</p>` },

    { id: 'composition', titre: 'La composition biochimique', html: `
      <table>
        <tr><th>Constituant</th><th>Part de la masse</th><th>Rôle</th></tr>
        <tr><td><b>Lipides</b> (phospholipides + cholestérol)</td><td><b>40 %</b></td><td>Forment le <b>squelette</b> de la membrane</td></tr>
        <tr><td><b>Protéines</b> (récepteurs, transporteurs, enzymes)</td><td><b>50 %</b></td><td>Attachées plus ou moins aux phospholipides</td></tr>
        <tr><td><b>Glucides</b></td><td><b>10 %</b></td><td>Liés aux protéines (<b>glycoprotéines</b>) ou aux lipides (<b>glycolipides</b>)</td></tr>
      </table>` },

    { id: 'lipides', titre: 'Les lipides', html: `
      <h3 style="font-size:15px;margin:14px 0 6px">🅐 Les phospholipides</h3>
      <p>Un phospholipide = <b>glycérol</b> + <b>2 queues d’acides gras</b> (hydrophobes) + <b>groupement phosphate</b>. Le phosphate est lié à une des 4 petites molécules hydrophiles (R) : <b>choline, éthanolamine, sérine, inositol</b>.</p>
      <pre class="sch">        TÊTE HYDROPHILE (polaire)          Molécules R : choline, éthanolamine,
   ══════════════ phosphate ══════════      sérine, inositol
              │
           glycérol
              │  ╲
   ══════════════════════   queues HYDROPHOBES : acide gras saturé (linéaire)
              │            + acide gras insaturé (crée un COUDE)</pre>
      <table>
        <tr><th>Phospholipides membranaires</th><th>Familles selon l’alcool</th></tr>
        <tr><td>Phosphatidylcholine · Phosphatidyléthanolamine · Phosphatidylsérine · Phosphatidylinositol</td><td><b>Glycérophospholipides</b> = glycérol + 2 AG (les plus abondants) · <b>Sphingophospholipides</b> = sphingosine + 1 AG</td></tr>
      </table>
      <div class="keys">Les phospholipides sont <b>amphiphiles</b> (= amphipathiques = amphipolaires) : tête polaire hydrophile + queue apolaire hydrophobe.</div>

      <h3 style="font-size:15px;margin:18px 0 6px">🅑 Le cholestérol</h3>
      <ul>
        <li>Composé d’un <b>groupe hydroxyle OH</b> (hydrophile), de <b>4 cycles carbonés</b> et d’une <b>chaîne hydrocarbonée</b> (hydrophobe).</li>
        <li>Se trouve <b>aux côtés des phospholipides dans le cœur de la membrane</b>.</li>
        <li>Rend la membrane <b>moins déformable (plus rigide)</b> et <b>diminue sa perméabilité</b> aux petites molécules hydrosolubles.</li>
      </ul>` },

    { id: 'autoassemblage', titre: 'Autoassemblage des phospholipides', html: `
      <p>À cause de leurs propriétés physico-chimiques, les phospholipides s’assemblent <b>automatiquement</b> en différentes structures <b>selon l’environnement</b> :</p>
      <pre class="sch">① MONOCOUCHE (interface eau–air)
   têtes hydrophiles → vers l'eau   |   queues hydrophobes → vers l'air

② MICELLE (petite sphère)
   têtes → vers l'EXTÉRIEUR (au contact de l'eau)
   queues → vers l'INTÉRIEUR   (emprisonne air ou lipide)

③ BICOUCHE → vésicule sphérique = LIPOSOME (en milieu aqueux)
   queues apolaires vers l'intérieur, têtes polaires vers l'extérieur
   liaisons NON covalentes entre les 2 couches</pre>
      <p class="mt">C’est cette tendance à former des <b>bicouches</b> dans l’eau qui explique la structure de base de toutes les membranes cellulaires.</p>` },

    { id: 'mosaique', titre: 'Le modèle de la mosaïque fluide', html: `
      <div class="quote">La membrane est une <b>bicouche lipidique fluide</b> dans laquelle les protéines sont <b>enchâssées</b> comme les pièces d’une mosaïque — d’où le nom « mosaïque fluide ».<span>Modèle de Singer & Nicolson</span></div>
      <table>
        <tr><th>Élément</th><th>Place dans le modèle</th></tr>
        <tr><td>Phospholipides</td><td>Bicouche = le « solvant » fluide de la membrane</td></tr>
        <tr><td>Cholestérol</td><td>Inséré entre les phospholipides → rigidité + moins de perméabilité</td></tr>
        <tr><td>Protéines</td><td>Intrinsèques (transmembranaires) ou extrinsèques (périphériques)</td></tr>
        <tr><td>Glucides</td><td>Glycocalyx, uniquement du côté extracellulaire → <b>asymétrie</b></td></tr>
      </table>
      <div class="keys">Mot-clé à retenir : <b>fluide</b> (les lipides et protéines se déplacent latéralement) + <b>asymétrique</b> (les 2 feuillets n’ont pas la même composition).</div>` }
  ],
  retenir: [
    'Membrane plasmique = plasmalemme : 7 à 8 nm, semi-perméable, invisible au MO.',
    'Au MET : structure trilaminaire (dense 2 nm / clair 3,5 nm / dense 2 nm) → Davson & Danielli 1954.',
    'Composition : lipides 40 % · protéines 50 % · glucides 10 %.',
    'Phospholipide = glycérol + 2 acides gras + phosphate (+ choline/éthanolamine/sérine/inositol).',
    'Le cholestérol rigidifie la membrane et diminue sa perméabilité.',
    'Glycocalyx → asymétrie de la membrane.'
  ],
  pieges: [
    'La membrane n’est PAS visible au microscope optique — seulement au MET.',
    'Le glycocalyx est TOUJOURS du côté extracellulaire (c’est ce qui crée l’asymétrie).',
    'Acide gras saturé = linéaire ; insaturé = coude (donc membrane plus fluide).'
  ]
},

/* ============================ MEMBRANE PLASMIQUE (2) ============================ */
{
  id: 'bio-membrane-2',
  doc: '1NWvkqQppKU2cpYUXe80LZ9iFMzCHpGPo',
  module: 'biologie', emoji: '🚪', duree: 30,
  titre: 'La membrane plasmique : les échanges membranaires',
  prof: 'Pr. F. Rhrich-Haddout',
  sousTitre: 'Transport passif, actif (primaire & secondaire), endocytose et exocytose',
  resume: 'Deuxième partie du cours : comment les molécules traversent la membrane — par perméabilité (diffusion simple, facilitée, transport actif) ou par échange vésiculaire (endocytose, exocytose).',
  objectifs: [
    'Distinguer échange par perméabilité et échange vésiculaire',
    'Différencier transport passif et transport actif',
    'Décrire les protéines de transport (canaux et transporteurs)',
    'Décrire endocytose et exocytose'
  ],
  sections: [
    { id: 'types', titre: 'Deux grands types d’échanges (selon la taille)', html: `
      <table>
        <tr><th></th><th>Échange par perméabilité</th><th>Échange vésiculaire</th></tr>
        <tr><td>Taille concernée</td><td><b>Petites molécules</b></td><td><b>Grosses molécules</b></td></tr>
        <tr><td>Membrane</td><td><b>Pas de déformation</b> de la MP</td><td><b>Déformation visible</b> de la MP</td></tr>
        <tr><td>Exemples</td><td>Ions, glucose, eau, gaz</td><td>Protéines, bactéries, gros complexes</td></tr>
      </table>` },

    { id: 'passif', titre: 'Le transport passif (sans ATP)', html: `
      <div class="keys">Transport passif : suit le <b>gradient de concentration</b> (de la zone la plus concentrée vers la moins concentrée) et <b>sans consommation d’ATP</b>.</div>

      <h3 style="font-size:15px;margin:14px 0 6px">🅐 Diffusion simple — sans transporteur</h3>
      <ul>
        <li>Molécules de <b>petite taille</b> et <b>liposolubles</b>.</li>
        <li>Gaz (<b>O₂, CO₂, NO</b>), eau, ions et petites molécules non chargées : urée, acides aminés, acides gras, glycérol.</li>
      </ul>
      <pre class="sch">OSMOSE = diffusion de l'EAU (le solvant)
   Solution hypertonique  |  Solution hypotonique
   Beaucoup de soluté     |  Peu de soluté
        ↓ l'eau se déplace vers la solution la plus concentrée en soluté</pre>

      <h3 style="font-size:15px;margin:14px 0 6px">🅑 Diffusion passive facilitée — avec transporteur</h3>
      <p>Pour les molécules <b>volumineuses et non liposolubles</b> : il faut une <b>protéine transmembranaire spécifique</b> de la molécule transportée. Elle suit toujours le gradient.</p>
      <table>
        <tr><th>Type de protéine</th><th>Ce qu’elle transporte</th></tr>
        <tr><td><b>Canal</b></td><td>Ions et eau : <b>aquaporines</b> (AQP, canal hydrophile) et <b>canaux ioniques</b></td></tr>
        <tr><td><b>Transporteur</b> = perméase</td><td>Ex. <b>glucose</b>, acides aminés</td></tr>
      </table>
      <pre class="sch">LES 4 ÉTAPES D'UNE PERMÉASE (ex. glucose)
① Fixation du ligand (glucose) sur son site SPÉCIFIQUE
② Changement de conformation de la perméase
③ Pénétration du ligand dans la cellule
④ Retour de la perméase à sa conformation initiale</pre>` },

    { id: 'actif', titre: 'Le transport actif (avec ATP)', html: `
      <p>Transport <b>contre le gradient</b> de concentration → nécessite de l’énergie.</p>
      <table>
        <tr><th></th><th>Transport actif PRIMAIRE</th><th>Transport actif SECONDAIRE</th></tr>
        <tr><td>Énergie</td><td><b>Hydrolyse directe de l’ATP</b></td><td><b>Pas</b> d’hydrolyse directe : utilise l’énergie du <b>gradient ionique</b> créé par le transporteur primaire</td></tr>
        <tr><td>Acteurs</td><td>Pompes à ions / ATPases (Na⁺/K⁺, H⁺/K⁺, pompe calcique)</td><td>Cotransporteurs : <b>symport</b> et <b>antiport</b></td></tr>
        <tr><td>Qui ?</td><td>Surtout les <b>ions</b> (Na⁺, K⁺, Ca²⁺, Cl⁻)</td><td>Ions + glucose + acides aminés</td></tr>
      </table>
      <pre class="sch">POMPE Na⁺/K⁺ (= ATPase Na⁺/K⁺)
  • protéine transmembranaire formée de 2 sous-unités :
        une avec site spécifique Na⁺ / une avec site spécifique K⁺
  • les 2 ions sont transportés CONTRE leur gradient, mais en sens OPPOSÉS
  • rôle : maintenir le gradient sodique de la cellule</pre>
      <div class="keys">À retenir : <b>primaire</b> = consomme l’ATP · <b>secondaire</b> = utilise un gradient ionique (co-transport).</div>` },

    { id: 'vesiculaire', titre: 'L’échange vésiculaire (grosses molécules)', html: `
      <pre class="sch">ENDOCYTOSE  (la cellule fait ENTRER)
├── Pinocytose ......................... non spécifique, liquides
├── Endocytose à clathrine dépendante ... spécifique (récepteurs)
└── Phagocytose ........................ grosses particules / bactéries

EXOCYTOSE   (la cellule fait SORTIR)
├── Exocytose constitutive ............. continue
└── Exocytose régulée .................. déclenchée par un signal</pre>
      <p class="mt">Ces mécanismes s’accompagnent d’une <b>déformation visible</b> de la membrane plasmique (invagination → vésicule, ou vésicule → fusion).</p>` },

    { id: 'suite', titre: 'Et ensuite ? (plan du cours)', html: `
      <table>
        <tr><th>Partie</th><th>Contenu</th></tr>
        <tr><td><b>5-1</b></td><td>Échanges membranaires <b>(ce résumé)</b></td></tr>
        <tr><td>5-2</td><td>Signalisation cellulaire</td></tr>
        <tr><td>5-3</td><td>Interactions cellulaires</td></tr>
      </table>` }
  ],
  retenir: [
    'Perméabilité = petites molécules, pas de déformation · vésiculaire = grosses molécules, déformation.',
    'Passif = sans ATP, suit le gradient (diffusion simple / facilitée).',
    'Diffusion simple : O₂, CO₂, NO, eau (osmose), urée, glycérol.',
    'Facilitée : canal (aquaporines, canaux ioniques) ou transporteur/perméase (glucose).',
    'Actif primaire = ATP (pompe Na⁺/K⁺) · secondaire = symport/antiport.',
    'Endocytose : pinocytose, clathrine-dépendante, phagocytose · exocytose : constitutive, régulée.'
  ],
  pieges: [
    'La diffusion facilitée NE consomme PAS d’ATP (c’est un transport passif).',
    'Le transport actif secondaire n’utilise pas directement l’ATP.',
    'Osmose = diffusion de l’EAU, du milieu le moins concentré vers le plus concentré.'
  ]
}

]);