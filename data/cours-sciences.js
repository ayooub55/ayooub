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
  module: 'biophysique', emoji: '🩻', duree: 75,
  titre: 'Imagerie en odontologie : rayons X, radiologie & radioprotection (cours complet)',
  prof: 'Pr. Bouzoubaa Sidi Mohammed',
  sousTitre: 'biopc.pdf — Partie I : principes physiques des RX · Partie II : initiation à la radiologie · Partie III : radiobiologie / radioprotection',
  resume: 'Le cours complet du Pr. Bouzoubaa (biopc.pdf, Drive → Biophysique → Pr. Bouzoubaa → Cours) expliqué dans l’ordre du document : comment naît un rayon X (tube de Coolidge), ce qu’il devient dans la matière (effet photoélectrique, Compton), comment se forme l’image radiologique (source → objet → détecteur, film argentique et numérique, géométrie), puis la radiobiologie et la radioprotection (Gy, Sv, ALARA, règles au cabinet dentaire). Chaque partie = une section, avec tableaux, schémas et QCM final.',
  objectifs: [
    'Définir le rayon X et le situer dans le spectre électromagnétique',
    'Décrire le mécanisme de production des RX (tube de Coolidge, anode tournante)',
    'Décrire les interactions des RX avec la matière : effet photoélectrique et effet Compton',
    'Décrire l’interaction des RX avec le détecteur (film argentique, capteur numérique)',
    'Définir la radiologie et décrire le schéma général : source, objet, détecteur, géométrie',
    'Décrire les critères de qualité d’une source (mA, kV, filtration, collimation, temps)',
    'Définir la radioprotection, l’irradiation et l’exposition ; connaître Gy, Sv, Wr, Wt',
    'Distinguer effets déterministes et effets aléatoires (stochastiques)',
    'Citer les 3 principes de la radioprotection (justification, optimisation, limitation)',
    'Appliquer les règles de radioprotection au cabinet dentaire (praticien, patient, femme enceinte)'
  ],
  sections: [
    { id: 'plan', titre: 'Le plan du cours (ordre du Drive / du PDF)', html: `
      <p>Le fichier <b>biopc.pdf</b> (Drive : <i>Biophysique → Pr. Bouzoubaa → Cours</i>) regroupe les <b>3 parties du S1</b>. Les parties 4 à 7 tombent plus tard dans le cursus — le prof les annonce dès le plan :</p>
      <table>
        <tr><th>#</th><th>Chapitre</th><th>Semestre</th><th>Dans cette fiche</th></tr>
        <tr><td>1</td><td><b>Principes physiques des rayons X</b> (historique, définition, production, interactions)</td><td><b>S1</b></td><td>Sections 2 → 6</td></tr>
        <tr><td>2</td><td><b>Initiation à la radiologie</b> (définition, schéma général : source, objet, détecteurs, géométrie)</td><td><b>S1</b></td><td>Sections 7 → 13</td></tr>
        <tr><td>3</td><td><b>Radiobiologie / radioprotection</b></td><td><b>S1</b></td><td>Sections 14 → 22</td></tr>
        <tr><td>4</td><td>Incidences standards : intra-orales (rétroalvéolaire, rétro-coronaire, occlusal) / extra-orales (téléradiographie de profil, face)</td><td>S3 / S6</td><td>—</td></tr>
        <tr><td>5</td><td>Incidence tomographique : panoramique</td><td>S6</td><td>—</td></tr>
        <tr><td>6</td><td>Incidence volumétrique 3D : scanner, cone beam</td><td>S8</td><td>—</td></tr>
        <tr><td>7</td><td>Examens complémentaires : IRM, échographie…</td><td>—</td><td>—</td></tr>
      </table>
      <div class="keys">La <b>triade de la radiologie</b> traverse tout le cours : <b>source RX → objet → détecteur</b>. Garde-la en tête : chaque section du cours décrit un maillon de cette chaîne.</div>` },

    { id: 'historique', titre: '1-1 · Historique : Röntgen, 1895', html: `
      <table>
        <tr><th>Élément</th><th>Détail</th></tr>
        <tr><td><b>1895</b></td><td><b>Wilhelm Conrad Röntgen</b> découvre les rayons X</td></tr>
        <tr><td><b>1901</b></td><td><b>Prix Nobel</b> (le tout premier prix Nobel de physique)</td></tr>
        <tr><td>Expérience</td><td>Production des RX dans un <b>tube en absence d’air</b>, avec <b>anode et cathode</b></td></tr>
        <tr><td>Preuve</td><td><b>Sensibilisation d’un film à distance</b> de l’expérience : il photographie le <b>squelette de sa main</b></td></tr>
        <tr><td>Noms</td><td>Ry X · <b>X rays</b> · الأشعة السينية</td></tr>
      </table>
      <div class="keys">Trois mots-clés de l’expérience à placer dans un QCM : <b>vide</b> (tube sans air), <b>film sensibilisé à distance</b>, <b>main de Mme/ M. Röntgen</b> → le rayon X traverse la matière et impressionne un film sans contact.</div>` },

    { id: 'definition', titre: '1-2 · Définition du rayon X', html: `
      <p>Le rayon X est un <b>rayonnement électromagnétique</b>, de même nature que les ondes radio, la lumière visible ou les infrarouges — mais <b>très pénétrant</b>.</p>
      <table>
        <tr><th>Grandeur</th><th>Valeur</th></tr>
        <tr><td>Fréquences</td><td><b>10¹⁶ Hz à 10²⁰ Hz</b></td></tr>
        <tr><td>Longueurs d’onde</td><td>de l’ordre de <b>10⁻⁸ à 10⁻¹² m</b></td></tr>
        <tr><td>Énergie des photons X</td><td><b>40 eV à 4·10⁵ eV</b></td></tr>
        <tr><td>Propriété clé</td><td>Rayon X = <b>très pénétrant</b></td></tr>
      </table>
      <pre class="sch">SPECTRE ÉLECTROMAGNÉTIQUE (λ décroissantes → énergie croissante)
ondes radio › micro-ondes › infrarouge › lumière visible › UV › ➤ RAYONS X ➤ › gamma
                                                          10⁻⁸ … 10⁻¹² m</pre>
      <div class="keys">Plus la longueur d’onde est <b>courte</b>, plus le photon est <b>énergétique</b> et <b>pénétrant</b>. C’est pour ça que les RX traversent les tissus mous mais sont arrêtés par l’os.</div>` },

    { id: 'production', titre: '1-3 · Production des RX : le tube de Coolidge', html: `
      <p>Les faisceaux utilisés en médecine sont produits par des <b>« tubes à rayons X »</b> ou <b>tube de Coolidge</b> : un tube de verre où règne un <b>vide poussé</b>.</p>
      <pre class="sch">TUBE DE COOLIDGE (vide poussé)
  CATHODE (tungstène chauffée)          ANODE = cible (anti-cathode)
        │  ① extraction des électrons          │
        │  ② accélération par la tension       │
        └──────────► ③ bombardement ──────────►│
                                       ④ interactions de FREINAGE
                                          ⇒ ÉMISSION DE RAYONS X</pre>
      <table>
        <tr><th>Étape</th><th>Ce qui se passe</th></tr>
        <tr><td>① Extraction</td><td>Les électrons sont extraits d’une <b>cathode de tungstène chauffée</b></td></tr>
        <tr><td>② Accélération</td><td>Ils sont accélérés par une <b>tension électrique</b> dans le tube sous vide</td></tr>
        <tr><td>③ Bombardement</td><td>Le faisceau bombarde une <b>cible métallique</b> = <b>anode</b> (ou anti-cathode)</td></tr>
        <tr><td>④ Émission</td><td>Conséquence des <b>interactions (freinage)</b> entre électrons rapides et particules de la cible</td></tr>
      </table>
      <p><b>Anode tournante :</b> le faisceau d’électrons la frappe sur sa <b>partie périphérique</b> — une <b>piste en tungstène</b> dont l’orientation est <b>oblique</b> par rapport au faisceau d’électrons. La rotation répartit la chaleur et permet des expositions répétées.</p>
      <div class="keys">L’émission de RX vient du <b>freinage</b> des électrons sur la cible — pas de la chaleur, pas de la cathode. Vide poussé = condition sine qua non (sinon les électrons percutent l’air).</div>` },

    { id: 'photo', titre: '1-4 · Interaction avec la matière : l’effet photoélectrique', html: `
      <p>En radiodiagnostic, l’interaction RX / matière organique comprend essentiellement <b>l’effet photoélectrique</b> et <b>l’effet Compton</b>. Comprendre ces mécanismes = comprendre l’<b>atténuation sélective</b> du faisceau, donc le <b>contraste</b> de l’image.</p>
      <p><b>Mécanisme :</b> un rayon X arrive à proximité d’un <b>électron d’une couche profonde</b> avec assez d’énergie pour l’<b>éjecter</b>. Le rayon X est <b>absorbé</b> ; le trop-plein d’énergie part dans l’<b>énergie cinétique du « photoélectron »</b>. Le « trou » laissé est rempli par un électron d’une couche plus superficielle, qui laisse échapper un <b>rayon X caractéristique de faible énergie</b> lors de sa « descente ».</p>
      <pre class="sch">Photon X ──► électron couche PROFONDE ──► éjection (photoélectron)
   │                                        │
   │ photon ABSORBÉ (arrêt du RX)           ├─► effets biologiques néfastes possibles
   ▼                                        └─► ion POSITIF
RX caractéristique de faible énergie (sans effet significatif)</pre>
      <table>
        <tr><th>Résultat de l’effet photoélectrique</th></tr>
        <tr><td><b>Arrêt du rayon X</b> (le RX caractéristique est trop faible pour compter)</td></tr>
        <tr><td>Production d’un <b>photoélectron</b> (effets biologiques néfastes possibles)</td></tr>
        <tr><td>Production d’un <b>ion positif</b></td></tr>
      </table>
      <div class="keys">Effet <b>principal</b> dans les matières organiques pour des RX de <b>faible énergie</b> : effet majeur pour des tensions <b>inférieures à 70 kV</b>. C’est lui qui donne le <b>contraste</b> (absorption sélective selon le tissu).</div>` },

    { id: 'compton', titre: '1-4 · L’effet Compton + comparaison des deux effets', html: `
      <p><b>Mécanisme :</b> un rayon X passe à proximité d’un <b>électron périphérique peu lié</b> à l’atome (parfois appelé électron « libre »). L’énergie du RX est transmise <b>en partie</b> à l’électron, qui s’échappe avec une certaine énergie cinétique ; le reste repart sous forme d’un <b>rayon X de direction différente et d’énergie inférieure</b>.</p>
      <pre class="sch">Photon X ──► électron PÉRIPHÉRIQUE (peu lié)
   │                │
   │                └─► électron éjecté + ion POSITIF
   ▼
RX DIFFUSÉ : direction ALÉATOIRE, énergie inférieure
   ⇒ diffusion dans TOUTES les directions (même vers l'arrière)</pre>
      <table>
        <tr><th>Résultat de l’effet Compton</th></tr>
        <tr><td><b>Déviation + perte d’énergie</b> du rayon X ; électron + ion positif</td></tr>
        <tr><td>Direction <b>aléatoire</b> → <b>diffusion</b> du faisceau dans toutes les directions (y compris en sens opposé au faisceau primaire)</td></tr>
        <tr><td>Rayonnement diffusé encore assez énergétique pour <b>voiler l’image</b> et <b>constituer un danger</b> → il faut s’en protéger</td></tr>
        <tr><td>Probabilité d’interaction : dépend <b>uniquement de la densité</b> du matériel, <b>pas du numéro atomique</b></td></tr>
        <tr><td>Prépondérant dans les tissus organiques à <b>forte énergie</b> : tension <b>&gt; 100 kV</b></td></tr>
      </table>
      <table>
        <tr><th></th><th>Effet photoélectrique</th><th>Effet Compton</th></tr>
        <tr><td>Électron visé</td><td>Couche <b>profonde</b></td><td>Couche <b>périphérique</b>, peu lié (« libre »)</td></tr>
        <tr><td>Sort du photon</td><td><b>Absorbé</b> (arrêt du RX)</td><td><b>Diffusé</b>, dévié, énergie inférieure</td></tr>
        <tr><td>Dépend de</td><td>Numéro atomique (Z) / énergie faible</td><td><b>Densité</b> seulement / énergie forte</td></tr>
        <tr><td>Domaine de tension</td><td>Majeur <b>&lt; 70 kV</b></td><td>Prépondérant <b>&gt; 100 kV</b></td></tr>
        <tr><td>Conséquence image</td><td><b>Contraste</b> (atténuation sélective)</td><td><b>Voile / flou</b> + danger (diffusion)</td></tr>
        <tr><td>Produits communs</td><td colspan="2">Électron + <b>ion positif</b> dans les deux cas</td></tr>
      </table>` },

    { id: 'radiodef', titre: '2-1 · Définition de la radiologie & schéma général', html: `
      <p><b>La radiographie</b> est un procédé d’imagerie qui permet de <b>visualiser les structures anatomiques internes</b> au moyen de <b>faisceaux de rayons X traversant le patient</b>. Technique utilisée pour <b>affiner un diagnostic</b> afin de réaliser un traitement adapté.</p>
      <div class="keys">Règle légale et éthique : la réalisation d’un examen radiographique doit être <b>justifiée par la prescription d’un médecin</b>.</div>
      <pre class="sch">SCHÉMA GÉNÉRAL DE LA RADIOLOGIE (le patient ENTRE la source et le récepteur)

   FOYER RADIOGÈNE          PATIENT (région à radiographier)        RÉCEPTEUR
   (tube à rayons X)   ──►   les RX interagissent avec les tissus  ──►  (film radiographique)
        SOURCE                         OBJET                          DÉTECTEUR
                            + FORMATIONS GÉOMÉTRIQUES de l'image</pre>
      <p>Lors de l’examen, le sujet (la région anatomique dont on veut former l’image) est placé <b>entre le foyer radiogène (tube) et le récepteur (film)</b> ; les RX sont projetés à travers le corps et interagissent avec les tissus.</p>` },

    { id: 'source', titre: '2-2-1 · La source : mA, kV, générateur, filtration, collimation', html: `
      <table>
        <tr><th>Paramètre</th><th>Rôle / ce que dit le cours</th></tr>
        <tr><td><b>Intensité (mA)</b></td><td>Le <b>nombre de photons</b> → degré de <b>noirceur</b> de l’image sur le film. Générateurs actuels : <b>4 à 8 mA</b></td></tr>
        <tr><td><b>Tension (kV)</b></td><td>L’<b>énergie du photon</b>. Il faut un maximum de RX au récepteur → faisceau <b>homogène</b>, photons d’énergie suffisante et similaire</td></tr>
        <tr><td><b>Générateur</b></td><td>Le courant alternatif change de sens toutes les demi-périodes, soit <b>50 fois par seconde</b> ; les générateurs <b>« haute fréquence »</b> = avancée technologique majeure</td></tr>
        <tr><td><b>Transformateur</b></td><td>Convertit le <b>220 V</b> en haute tension <b>60 000 – 70 000 V (60 à 70 kV)</b></td></tr>
        <tr><td><b>Filtration</b></td><td>Ne laisse passer que les photons d’<b>énergie adéquate</b>. L’<b>aluminium</b> filtre le mieux : plaque de <b>1 à 3 mm</b> ; pour un générateur ≤ 70 kV → filtration équivalente à <b>1,5 mm d’Al</b></td></tr>
        <tr><td><b>Temps d’exposition</b></td><td>Le <b>nombre de photons par seconde</b></td></tr>
        <tr><td><b>Longueur du tube</b></td><td>Rôle important dans la qualité d’image : localisateur <b>long cône de 30 ou 40 cm</b> → technique « long cône »</td></tr>
        <tr><td><b>Collimation</b></td><td><b>Réduire le diamètre du faisceau</b> (moins de diffusion, moins de dose)</td></tr>
        <tr><td><b>Guidage laser</b></td><td>Guidage par <b>faisceau laser</b> pour le positionnement</td></tr>
      </table>
      <p class="mt"><b>Effet de la tension (kV) :</b> les nouveaux générateurs à <b>60-70 kV</b> produisent des rayons <b>plus pénétrants</b> → images <b>moins contrastées</b>.</p>
      <table>
        <tr><th>Tension</th><th>Contraste</th><th>Dose d’irradiation</th></tr>
        <tr><td><b>Faible</b></td><td>Augmente le contraste</td><td>Augmente la dose</td></tr>
        <tr><td><b>Élevée</b></td><td>Diminue le contraste</td><td>Diminue la dose</td></tr>
        <tr><td><b>&gt; 90-100 kV</b></td><td colspan="2">Contraste <b>insuffisant</b> : on n’augmente pas indéfiniment</td></tr>
      </table>
      <pre class="sch">FICHE TECHNIQUE TYPE D'UN GÉNÉRATEUR DENTAIRE (diapos du cours)
Tension du tube            60 – 70 kV          Fréquence         50 / 60 Hz
Courant du tube            4 – 7 mA            Filtration totale min. 2,0 mm Al
Foyer du tube              0,4 mm (CEI 336)    Temps d'exposition  0,04 à 2 s
Compatibilité : film argentique · écran à mémoire · capteur digital
Bras : court 1,81 m · moyen 1,96 m · long 2,26 m — montage mural
Générateur CC haute fréquence : réduit la dose du patient de PLUS DE 25 %</pre>` },

    { id: 'objet', titre: '2-2-2 · L’objet : pourquoi l’image est blanche, grise ou noire', html: `
      <p>Le comportement des tissus devant les RX dépend de leur <b>coefficient d’absorption</b> :</p>
      <table>
        <tr><th>Structure</th><th>Absorption</th><th>Sur le cliché</th></tr>
        <tr><td><b>Dense (os, émail…)</b></td><td>Coefficient d’absorption <b>très élevé</b> → très opaques aux photons</td><td><b>BLANC</b> (radio-opaque)</td></tr>
        <tr><td><b>Intermédiaire (tissus mous)</b></td><td>Coefficient légèrement plus faible → peu opaques</td><td><b>GRIS</b> (différents tons)</td></tr>
        <tr><td><b>Aérique (air)</b></td><td>Laissent passer la <b>quasi-totalité</b> des rayonnements</td><td><b>SOMBRE / NOIR</b> (radio-claire)</td></tr>
      </table>
      <pre class="sch">RADIO-OPAQUE (blanc)  ›  NIVEAU DE GRIS  ›  RADIO-CLAIRE (noir)
   structure minéralisée      structures intermédiaires     structure NON minéralisée</pre>
      <div class="keys">Radio-opaque = arrête les RX (blanc) · radio-claire = laisse passer les RX (noir). Toute la sémiologie radiologique repose sur cette échelle de gris.</div>` },

    { id: 'film', titre: '2-2-3-1 · Détecteur analogique : le film radiographique', html: `
      <p>Le film radiographique a <b>deux principaux composants</b> : le <b>film proprement dit</b> et l’<b>emballage</b>.</p>
      <table>
        <tr><th>Composant</th><th>Détail</th></tr>
        <tr><td><b>Support</b></td><td>En <b>acétate de cellulose</b></td></tr>
        <tr><td><b>Gélatine</b></td><td>Suspend l’émulsion sur le support</td></tr>
        <tr><td><b>Émulsion photographique</b></td><td>Constituée de <b>cristaux de bromures d’argent</b> (AgBr) — c’est elle qui capte les RX</td></tr>
        <tr><td>Usage</td><td>Ces détecteurs ne servent qu’<b>une seule fois</b></td></tr>
      </table>
      <p class="mt"><b>Emballage (3 éléments) :</b></p>
      <table>
        <tr><th>Élément</th><th>Rôle</th></tr>
        <tr><td><b>Papier noir</b></td><td>Protection (lumière)</td></tr>
        <tr><td><b>Feuille de plomb</b></td><td>Arrête les <b>RX diffusés</b> (rayonnement rétro-diffusé)</td></tr>
        <tr><td><b>Enveloppe plastique</b></td><td>Protection (humidité)</td></tr>
      </table>
      <p class="mt"><b>Formats des films intra-oraux :</b></p>
      <table>
        <tr><th>Type de cliché</th><th>Dimensions</th></tr>
        <tr><td>Rétro-alvéolaire <b>adulte</b></td><td><b>31 × 41 mm</b></td></tr>
        <tr><td>Rétro-alvéolaire <b>enfant</b></td><td><b>22 × 35 mm</b></td></tr>
        <tr><td><b>Occlusal</b></td><td><b>57 × 76 mm</b></td></tr>
      </table>
      <div class="keys">Le film est <b>sensible à la lumière et à l’humidité</b> → d’où le papier noir + l’enveloppe plastique. La feuille de plomb, elle, combat le <b>rayonnement diffusé</b> (celui de l’effet Compton !).</div>` },

    { id: 'dev', titre: '2-2-3-1 · Développement du film : 5 étapes + monobain', html: `
      <pre class="sch">TRAITEMENT DU FILM ARGENTIQUE
① RÉVÉLATION  →  ② RINÇAGE  →  ③ FIXATION  →  ④ LAVAGE FINAL  →  ⑤ SÉCHAGE</pre>
      <table>
        <tr><th>Étape</th><th>Ce qui se passe / chiffres</th></tr>
        <tr><td><b>1. Révélation</b></td><td>Processus <b>physico-chimique</b> : rendre visible l’<b>image latente</b> en réduisant la <b>totalité des ions Ag⁺ en atomes Ag</b>. Réaction : <b>Réducteur + Ag⁺ → Ag + réducteur oxydé</b>. Durée optimale : <b>5 minutes à 20 °C</b></td></tr>
        <tr><td><b>2. Rinçage</b></td><td>Rinçage <b>intermédiaire</b> : élimine toute trace du révélateur (<b>basique</b>) et <b>arrête son effet</b> → évite de souiller et d’altérer le fixateur (<b>acide</b>)</td></tr>
        <tr><td><b>3. Fixation</b></td><td>Les cristaux de bromure d’argent <b>non atteints par un photon</b> ne sont pas modifiés par le révélateur et doivent être <b>éliminés</b> : dissolution du bromure non sensibilisé pour <b>empêcher un noircissement ultérieur</b>. Film lisible après 1-2 min mais à replacer au bain : <b>10 minutes au total à 20 °C</b></td></tr>
        <tr><td><b>4. Lavage final</b></td><td>À l’<b>eau courante, 10 à 20 minutes</b> : élimine complètement l’<b>hyposulfite</b> et les <b>complexes d’argent</b> qui imprègnent la gélatine → prévient la formation d’un <b>voile jaune de sulfure</b></td></tr>
        <tr><td><b>5. Séchage</b></td><td>À l’air libre ou courant d’air <b>sec tiède (30 à 40 °C)</b> sans poussière, <b>10 à 30 minutes</b></td></tr>
      </table>
      <p class="mt"><b>Le monobain :</b> réalise <b>dans une même étape</b> la révélation de l’image latente <b>et</b> la fixation de l’image obtenue (seuls les sels d’argent sensibilisés subissent le révélateur ; les cristaux non sensibilisés sont dissous par le fixateur). Traitement <b>moins sensible à la température</b> et <b>plus court</b> : <b>8 minutes</b> avec monobain contre <b>15 minutes</b> en traitement classique.</p>
      <div class="keys">Révélateur = <b>basique</b> · fixateur = <b>acide</b> → le rinçage intermédiaire protège le fixateur. Chiffres favoris des QCM : 5 min / 20 °C (révélation), 10 min (fixation), 10-20 min (lavage), 8 vs 15 min (monobain vs classique).</div>` },

    { id: 'num', titre: '2-2-3-2 · Détecteur numérique : du photon au pixel', html: `
      <p>Les détecteurs numériques permettent la <b>transformation directe des photons en signaux électriques</b>, eux-mêmes transformés en image.</p>
      <pre class="sch">PHOTONS X ──► DÉTECTEUR ──► SIGNAUX ÉLECTRIQUES ──► IMAGE NUMÉRIQUE
                              une MATRICE = unités de PIXELS
                              palette de 256 NIVEAUX DE GRIS (0 → 255)</pre>
      <table>
        <tr><th>Notion</th><th>Détail</th></tr>
        <tr><td><b>Matrice</b></td><td>Constituée d’unités de <b>pixel</b> : chaque pixel porte une valeur de gris</td></tr>
        <tr><td><b>Niveaux de gris</b></td><td>Palette de <b>256 niveaux</b> (comme l’échelle radio-opaque → radio-claire du film)</td></tr>
        <tr><td><b>Détecteurs 2D</b></td><td>Capteurs plans (radiographie conventionnelle numérique)</td></tr>
        <tr><td><b>Détecteurs 3D</b></td><td>Acquisition volumique (annoncée pour le scanner / cone beam, S8)</td></tr>
      </table>
      <div class="keys">Analogique = chimie (AgBr, bains) · numérique = <b>photons → électrons → pixels</b>. Avantage pratique du numérique : <b>moins de dose</b> (voir partie radioprotection : 6× moins que les films D).</div>` },

    { id: 'geo', titre: '2-2-4 · Formations géométriques de l’image', html: `
      <ul>
        <li>La formation géométrique de l’image radiologique est une <b>ombre projetée</b> d’objets plus ou moins opaques aux RX.</li>
        <li>L’image radiologique est une <b>représentation en 2 dimensions</b> d’une épaisseur complexe.</li>
        <li>La <b>conicité du faisceau RX</b> et l’<b>orientation du rayon directeur</b> entraînent une <b>déformation</b> des structures radiographiées.</li>
        <li>Il en résulte une <b>perte d’information</b> quant à la <b>position (profondeur)</b> et la <b>forme exacte</b> des objets.</li>
        <li>Une <b>deuxième vue</b>, la plupart du temps avec une <b>incidence perpendiculaire</b> à la première, est nécessaire pour évaluer position et forme dans l’espace.</li>
        <li>La projection obéit à des <b>règles géométriques très simples</b> : projection <b>conique</b>, images en <b>superposition</b>.</li>
      </ul>
      <pre class="sch">   SOURCE ponctuelle ──faisceau CONIQUE──► OBJET ──► DÉTECTEUR
        ⇒ ombre projetée, agrandissement, déformation, SUPERPOSITION
        ⇒ 1 seul cliché = 2D : profondeur perdue  →  2 vues ⊥ nécessaires</pre>
      <div class="keys">Un cliché = une <b>ombre en 2D</b> : les structures se <b>superposent</b>. Toujours raisonner « quelle incidence complémentaire ? » devant une image unique.</div>` },

    { id: 'rpdef', titre: '3-1 · Radioprotection : définitions (irradiation vs exposition)', html: `
      <table>
        <tr><th>Terme</th><th>Définition du cours</th></tr>
        <tr><td><b>Radioprotection</b></td><td>Ensemble de <b>mesures</b> permettant l’utilisation des <b>rayonnements ionisants (RI)</b> dans un but <b>diagnostique ou thérapeutique</b>, tout en <b>limitant le plus raisonnablement possible</b> les effets néfastes pour <b>les praticiens, les patients et le public</b></td></tr>
        <tr><td><b>Irradiation</b></td><td>Les rayons sont utilisés pour en <b>obtenir un effet biologique déterminé</b> : <b>guérir un cancer / RADIOTHÉRAPIE</b></td></tr>
        <tr><td><b>Exposition</b></td><td>Les rayons qui entrent dans un volume sont <b>fortuits</b> (rayonnement naturel) ou délivrés <b>dans un autre but</b> que leur effet biologique (diagnostic ou interventionnel) : <b>imagerie médicale</b></td></tr>
        <tr><td><b>Radiobiologie</b></td><td>L’<b>étude des effets des RI</b> (rayons X entre autres) de façon générale <b>sur les tissus vivants</b></td></tr>
      </table>
      <pre class="sch">RÉPONSES DE LA CELLULE AU RAYONNEMENT IONISANT (schéma du cours)
RI ─► effet DIRECT sur l'ADN            TEMPS : 10⁻¹⁵ s → 10⁻⁶ s → minutes/heures
   ─► effet INDIRECT : radiolyse                     (réponses précoces)
      de l'eau → RADICAUX LIBRES                    jours/années/générations
Lésions moléculaires (protéines, ADN, lipides)       (réponses tardives)
   ├─ pas de réparation   → effet LÉTAL → mort cellulaire non contrôlée (nécrose) → pathologie tissulaire
   ├─ réparation FAUTIVE  → MUTATION NON LÉTALE → anomalie héréditaire · CANCER · élimination immunitaire
   └─ réparation FIDÈLE   → arrêt du cycle (p53…) → survie cellulaire normale</pre>
      <div class="keys">Irradiation = effet <b>voulu</b> (radiothérapie) · exposition = effet <b>subi/fortuit</b> (imagerie). En dentaire, nous sommes toujours dans le cas <b>exposition</b>.</div>` },

    { id: 'expo', titre: '3-2 · Types d’exposition aux rayonnements ionisants', html: `
      <table>
        <tr><th></th><th>Contamination EXTERNE</th><th>Contamination INTERNE</th></tr>
        <tr><td>Définition</td><td>Exposition <b>externe</b> aux rayonnements ionisants</td><td>Exposition <b>interne</b> aux <b>particules radioactives</b></td></tr>
        <tr><td>Mécanisme</td><td>Personne exposée <b>de l’extérieur</b> à une source radioactive située <b>dans son voisinage</b></td><td><b>Inhalation</b> de particules radioactives présentes dans l’air · <b>ingestion</b> d’aliments contaminés · particules à <b>visée thérapeutique</b></td></tr>
        <tr><td>Fin de l’exposition</td><td>Cesse dès que la source est <b>éloignée</b> ou qu’un <b>écran (blindage)</b> est interposé</td><td>Se <b>poursuit</b> tant que la source est <b>à l’intérieur</b> ou au contact du corps</td></tr>
      </table>
      <div class="keys">Externe = on s’en protège par <b>distance + écran</b> · interne = la source est <b>dedans</b>, l’exposition continue. C’est la logique des 3 règles de protection (temps, distance, écran).</div>` },

    { id: 'doses', titre: '3-2/3-3 · Bases physiques : Gy, Sv, Wr, Wt et doses', html: `
      <table>
        <tr><th>Grandeur</th><th>Définition / unité</th></tr>
        <tr><td><b>Dose absorbée (D)</b></td><td><b>Énergie transmise à l’unité de masse</b> ; s’exprime en <b>Gray (Gy)</b> : <b>1 Gy = 1 Joule/Kg</b>. Mesurable. C’est la dose reçue <b>localement</b> par le patient pour une exploration donnée ; directement corrélée aux paramètres d’exposition ; <b>ne tient pas compte</b> de la sensibilité des tissus</td></tr>
        <tr><td><b>Dose efficace</b></td><td>Somme des doses délivrées aux organes <b>pondérées</b> par un coefficient proportionnel à la <b>sensibilité des tissus</b> ; exprime le <b>risque d’effets aléatoires</b> à l’échelon individuel ; traduit une irradiation locale en exposition globale équivalente corps entier. Unité : <b>Sievert (Sv)</b> — calculable, <b>non mesurable</b></td></tr>
        <tr><td><b>Passage Gy → Sv</b></td><td>Deux facteurs de pondération : <b>Wr</b> (qualité du rayonnement) et <b>Wt</b> (nature du tissu irradié) → <b>Sv = Gy × Wr × Wt</b></td></tr>
        <tr><td>Repères</td><td><b>1 Gy = 1 Sv = 100 rads</b> · irradiation naturelle en France : <b>2,4 mSv/an</b></td></tr>
      </table>
      <pre class="sch">Gray  = MESURE de la dose absorbée (énergie/masse, J/Kg)  → mesurable
Sievert = ÉVALUATION du RISQUE BIOLOGIQUE (pondérations)   → calculable, non mesurable
                    Sv = Gy × Wr × Wt</pre>
      <p class="mt"><b>Doses reçues par les organes sensibles lors d’un cliché panoramique :</b></p>
      <table>
        <tr><th>Organe</th><th>Dose (mSv)</th></tr>
        <tr><td>Hypophyse</td><td>0,05</td></tr>
        <tr><td>Thyroïdes</td><td>0,05</td></tr>
        <tr><td><b>Glandes salivaires</b></td><td><b>0,39</b> (la plus exposée)</td></tr>
        <tr><td>Surfaces osseuses</td><td>0,06</td></tr>
        <tr><td>Moelle osseuse</td><td>0,01</td></tr>
        <tr><td>Équivalent de doses efficaces</td><td>0,03</td></tr>
      </table>
      <div class="keys">Gy = physique (mesurable) · Sv = biologique (calculé). Au panoramique, l’organe le plus irradié = <b>glandes salivaires (0,39 mSv)</b>.</div>` },

    { id: 'effets', titre: '3-3 · Effets des rayonnements : déterministes vs aléatoires', html: `
      <p><b>Effets cliniques :</b> trois sites d’effets — <b>lésions cellulaires</b>, <b>lésions moléculaires</b>, <b>effets sur les tissus humains</b> — et des effets <b>cumulatifs</b>.</p>
      <p><b>Lésions moléculaires :</b> toutes les molécules de l’organisme peuvent être modifiées ; deux sont particulièrement touchées : l’<b>ADN</b> (modifications du patrimoine génétique) et la <b>molécule d’eau</b> (<b>70 % du poids de l’homme</b>). H₂O : <b>radiolyse</b> avec formation de <b>radicaux libres</b>, capables de modifier des liaisons chimiques, induire des lésions moléculaires, inactiver des enzymes ou dégrader des macromolécules.</p>
      <p><b>Effets sur les tissus :</b> deux types chez l’homme — effets <b>obligatoires ou déterministes</b> (secondaires aux lésions <b>létales</b>) et effets <b>aléatoires ou stochastiques</b> (secondaires aux lésions <b>non létales</b>).</p>
      <table>
        <tr><th></th><th>Effets DÉTERMINISTES</th><th>Effets ALÉATOIRES (stochastiques)</th></tr>
        <tr><td>Nature</td><td><b>Non stochastiques</b>, obligatoires</td><td>Probabilistes (« plus de risque »)</td></tr>
        <tr><td>Seuil</td><td>À partir d’un <b>seuil déterminé</b> : jamais si dose &lt; D seuil, <b>à coup sûr</b> si dose &gt; D seuil</td><td>Se produisent à <b>faible ou forte dose</b> (pas de seuil)</td></tr>
        <tr><td>Gravité</td><td><b>Croît avec la dose</b></td><td><b>Indépendante de la dose</b></td></tr>
        <tr><td>Exemples</td><td>Fœtus ; tous les organes (gonades, tube digestif, peau, cerveau, moelle) ; myélite, perforation digestive, diarrhée, atteinte pulmonaire post-radique, céphalées, convulsions, œdème</td><td><b>Cancérogénèse</b> (cancers radio-induits) · <b>malformations congénitales héréditaires</b></td></tr>
        <tr><td>Protection</td><td><b>Simple</b> : risque prévisible, « attendu » → mesures préventives</td><td><b>Complexe</b></td></tr>
      </table>
      <div class="keys">Déterministe = <b>seuil + gravité dose-dépendante</b> · stochastique = <b>pas de seuil, gravité indépendante de la dose</b> (cancer, hérédité). Le cours insiste : effets <b>cumulatifs</b>.</div>` },

    { id: 'principes', titre: '3-4 · Les 3 principes généraux de la radioprotection', html: `
      <table>
        <tr><th>Principe</th><th>Concept</th><th>Application</th></tr>
        <tr><td><b>1. Justification</b></td><td>Les <b>avantages</b> (diagnostiques, thérapeutiques…) de l’exposition doivent l’<b>emporter sur les risques</b> et inconvénients potentiels ; le bénéfice pour le patient est <b>supérieur au risque encouru</b></td><td>Un examen impliquant des rayonnements doit être <b>médicalement indiqué et utile</b> ; pas d’exposition sans raison bénéfique claire (= prescription médicale)</td></tr>
        <tr><td><b>2. Optimisation</b></td><td>Principe <b>ALARA</b> : « As Low As Reasonably Achievable » — aussi bas que raisonnablement possible ; s’applique <b>après</b> justification et limitation</td><td><b>Réduire la dose</b> et le <b>nombre de personnes exposées</b> ; utiliser les techniques les plus efficaces pour le résultat voulu avec la <b>dose la plus faible possible</b> ; image compatible avec l’objectif diagnostique</td></tr>
        <tr><td><b>3. Limitation</b></td><td>Établit des <b>doses maximales à ne pas dépasser</b> : exigence <b>légale</b> pour rester dans des limites acceptables</td><td>Limites fixées par groupes (professionnels, étudiants, public) ; ex. : <b>limite annuelle de 20 millisieverts</b> pour les travailleurs exposés ; limiter examens et doses — <b>non appliquée si l’irradiation est thérapeutique</b></td></tr>
      </table>
      <div class="keys">Ordre logique : <b>justifier → limiter → optimiser (ALARA)</b>. La limitation ne s’applique <b>pas</b> en radiothérapie (le bénéfice thérapeutique prime).</div>` },

    { id: 'regles', titre: '3-5 · Règles de protection : personnel, locaux, préalables', html: `
      <p><b>Protection du personnel soignant — le trio gagnant :</b></p>
      <pre class="sch">TEMPS  ↓   réduire le temps d'irradiation
DISTANCE ↑  travailler à distance MAXIMALE de la source
ÉCRANS ■   utiliser des écrans protecteurs</pre>
      <table>
        <tr><th>Mesure</th><th>Détail</th></tr>
        <tr><td><b>Blindage des salles</b></td><td>Non-transmission du rayonnement aux salles avoisinantes, couloirs…</td></tr>
        <tr><td><b>Normes de construction</b></td><td>Respect des normes de construction des salles de radiologie</td></tr>
        <tr><td><b>Dispositifs protecteurs</b></td><td>Port de : <b>blouse (tablier plombé)</b>, <b>cache-thyroïdes</b>, <b>cache-gonades</b></td></tr>
        <tr><td><b>Surveillance dosimétrique</b></td><td>Dosimètre pour le personnel exposé</td></tr>
      </table>
      <p class="mt"><b>Préalables — dosimétrie comparée des examens dentaires :</b></p>
      <table>
        <tr><th>Support</th><th>Dose par rapport aux films D</th></tr>
        <tr><td>Films <b>E/F</b></td><td><b>2× moins</b> de dose que les films D</td></tr>
        <tr><td><b>Détecteurs digitaux</b></td><td><b>6× moins</b> de dose que les films D — au prix d’une <b>moins bonne définition</b></td></tr>
        <tr><td><b>Panoramiques anciens</b> (20 ans)</td><td><b>3× plus</b> de dose que les appareils récents</td></tr>
        <tr><td>Règle</td><td><b>Pas d’installation de matériel de + de 25 ans</b></td></tr>
      </table>
      <div class="keys">Changer de support = lever de dose immédiat : D → E/F (÷2) → digital (÷6 vs D). Un panoramique vieux de 20 ans = ×3 de dose.</div>` },

    { id: 'cabinet', titre: '3-5 · Radioprotection en dentisterie : pendant le cliché', html: `
      <p><b>Personnel concerné :</b> chirurgiens-dentistes, médecins · assistantes dentaires · <b>toutes personnes susceptibles d’intervenir dans les locaux concernés</b>.</p>
      <p><b>Lors de la prise du cliché, le praticien devra soit :</b></p>
      <ul>
        <li><b>sortir de la salle</b> dans le cas d’une commande située à l’extérieur ;</li>
        <li><b>s’éloigner le plus possible du patient</b> (longueur du cordon recommandée : <b>environ 2 m</b>) en excluant toute présence dans le <b>faisceau direct</b>.</li>
      </ul>
      <p>Présence du praticien ou de l’assistant(e) à proximité immédiate du patient : <b>exceptionnellement justifiée</b>. Sauf justification particulière (enfants, personnes handicapées ou agitées…), les <b>accompagnants sortent de la salle</b> avant la prise de clichés.</p>
      <p class="mt"><b>Conception de la pièce / protection de l’opérateur :</b></p>
      <table>
        <tr><th>Exigence</th><th>Détail</th></tr>
        <tr><td>Faisceau primaire</td><td>L’opérateur demeure <b>à l’extérieur du faisceau primaire</b></td></tr>
        <tr><td>Distance</td><td>Demeurer éloigné d’<b>au moins 3 mètres</b> du tube radiogène et du sujet</td></tr>
        <tr><td>Écran</td><td>Écran de protection adéquat <b>transparent</b>, formant une <b>barrière ininterrompue</b></td></tr>
        <tr><td>Blindage</td><td>Murs, planchers, plafonds et portes blindés selon la <b>distance</b>, la <b>haute tension maximale</b> du tube et la <b>charge de travail</b></td></tr>
        <tr><td>Absorption</td><td>Absorption du faisceau primaire et du rayonnement parasite <b>aussi près que possible de la source</b></td></tr>
        <tr><td>Direction du faisceau</td><td>Rayonnement primaire toujours dirigé vers une <b>section blindée ou inoccupée</b></td></tr>
        <tr><td>Commandes</td><td>Installées <b>à l’extérieur de la pièce</b>, à distance suffisante du tube, ou derrière un écran protecteur convenable</td></tr>
        <tr><td>Plans de travaux</td><td>Faire examiner les plans définitifs par le <b>service gouvernemental approprié</b> (construction / modification)</td></tr>
      </table>
      <p class="mt"><b>En pratique — positions autour du patient :</b> représentation des positions à <b>50 cm (1 à 8)</b> et <b>100 cm (9 à 16)</b> autour du patient : zones <b>vertes</b> = positions favorables · zones <b>oranges</b> = positions à éviter · zone <b>rouge</b> = positions fortement déconseillées. <b>Attention :</b> ce code couleur ne correspond <b>aucunement</b> aux zones réglementaires.</p>
      <div class="keys">Deux distances à ne jamais mélanger : <b>2 m</b> = cordon de commande du praticien resté dans la salle · <b>3 m</b> = distance minimale opérateur / tube + sujet pour la conception de la pièce.</div>` },

    { id: 'patient', titre: '3-5 · Protection du patient & femme enceinte', html: `
      <table>
        <tr><th>Mesure</th><th>Détail</th></tr>
        <tr><td><b>Entretien</b></td><td>Veiller à l’<b>entretien des appareils</b> de radiographie dentaire</td></tr>
        <tr><td><b>Tablier plombé</b></td><td>Pour les <b>gonades</b></td></tr>
        <tr><td><b>Protecteur thyroïdien</b></td><td><b>Enfant +++</b>, surtout pour l’examen radiographique de l’<b>occlusion maxillaire</b></td></tr>
        <tr><td><b>Panoramique</b></td><td>Utiliser un tablier à protection <b>avant et arrière</b> (rayons postérieurs)</td></tr>
      </table>
      <p class="mt"><b>Femme enceinte :</b></p>
      <ul>
        <li>Attention : femme en <b>période d’activité génitale</b> → risque d’être enceinte ; <b>précautions prises en tout temps</b> ; risque potentiellement <b>plus grave en début de grossesse</b>.</li>
        <li><b>Mais :</b> dose délivrée au fœtus lors d’un examen dentaire estimée entre <b>0,3 et 1 microsievert (µSv)</b> ;</li>
        <li><b>inférieure</b> à l’exposition naturelle quotidienne (<b>7 µSv</b>) reçue par le fœtus ;</li>
        <li>le risque encouru par un fœtus exposé à quelques µSv lors d’un examen de radiologie dentaire est <b>extrêmement faible</b> (source : IRSN, France).</li>
      </ul>
      <div class="keys">Message d’examen : un cliché dentaire ≠ danger pour le fœtus (0,3-1 µSv &lt; 7 µSv/jour naturels) — mais les précautions restent de mise en toute circonstance.</div>` },

    { id: 'recap', titre: 'Récapitulatif final : NE PAS NUIRE', html: `
      <table>
        <tr><th>Bloc</th><th>À retenir</th></tr>
        <tr><td>Effets des RI</td><td><b>Déterministes</b> : certains pour un seuil déterminé · <b>aléatoires</b> : plus de risque</td></tr>
        <tr><td>Règles de la radioprotection</td><td><b>Justification · optimisation · limitation</b></td></tr>
        <tr><td>Qui est concerné</td><td>Le <b>praticien</b>, le <b>patient</b>, l’<b>environnement</b></td></tr>
        <tr><td>Cadres</td><td>Codes réglementaires <b>universels</b></td></tr>
        <tr><td><b>OBJECTIF</b></td><td><b>NE PAS NUIRE</b></td></tr>
        <tr><td><b>ALARA+++</b></td><td>« <b>A</b>s <b>L</b>ow <b>A</b>s <b>R</b>easonably <b>A</b>chievable » = <b>aussi bas que raisonnablement possible</b></td></tr>
      </table>
      <pre class="sch">CHAÎNE COMPLÈTE VUE DANS CE COURS
RX (tube de Coolidge) ─► matière (photoélectrique / Compton)
   ─► OBJET (blanc / gris / noir) ─► DÉTECTEUR (film Ag → bains · numérique → pixels)
   ─► IMAGE (ombre 2D, conique, superpositions)
   ─► RISQUE (Gy → Sv) ─► PROTECTION (justification, optimisation, limitation)</pre>` }
  ],
  retenir: [
    '1895 Röntgen découvre les RX (tube sous vide, anode/cathode, film à distance, main) · Prix Nobel 1901.',
    'RX = rayonnement électromagnétique : 10¹⁶-10²⁰ Hz · 10⁻⁸ à 10⁻¹² m · 40 eV à 4·10⁵ eV · très pénétrant.',
    'Tube de Coolidge : cathode tungstène chauffée → électrons accélérés (tension, vide) → cible = anode ; émission par FREINAGE.',
    'Anode tournante : faisceau frappé en périphérie, piste tungstène oblique.',
    'Photoélectrique : électron couche profonde, photon ABSORBÉ, majeur < 70 kV → contraste.',
    'Compton : électron périphérique peu lié, photon DIFFUSÉ (direction aléatoire), dépend de la densité seule, > 100 kV → voile + danger.',
    'Triade : source → objet → détecteur ; le patient entre le foyer radiogène et le récepteur.',
    'mA = nombre de photons (noirceur, 4-8 mA) · kV = énergie du photon (60-70 kV ; faible kV = +contraste +dose) · transformateur 220 V → 60-70 kV.',
    'Filtration aluminium 1-3 mm (1,5 mm Al si ≤ 70 kV) · collimation = réduire le diamètre · long cône 30-40 cm.',
    'Os = blanc (radio-opaque) · tissus mous = gris · air = noir (radio-claire).',
    'Film : support acétate de cellulose + gélatine + émulsion AgBr ; emballage = papier noir + feuille de plomb + enveloppe plastique ; rétro-alv. adulte 31×41, enfant 22×35, occlusal 57×76.',
    'Développement : révélation (5 min/20 °C) → rinçage → fixation (10 min/20 °C) → lavage (10-20 min) → séchage (30-40 °C) ; monobain 8 min vs 15 min.',
    'Numérique : photons → signaux électriques → image ; matrice de pixels, 256 niveaux de gris.',
    'Image = ombre projetée 2D, projection conique, superpositions → 2ᵉ vue perpendiculaire.',
    'Radioprotection = limiter les effets néfastes (praticiens, patients, public) · irradiation = effet voulu (radiothérapie) · exposition = effet fortuit (imagerie).',
    'Dose absorbée = Gy (1 Gy = 1 J/Kg, mesurable) · dose efficace = Sv (calculable) ; Sv = Gy × Wr × Wt ; 1 Gy = 1 Sv = 100 rads ; naturel France 2,4 mSv/an.',
    'Panoramique : glandes salivaires 0,39 mSv (max) · équivalent doses efficaces 0,03 mSv.',
    'Déterministes = seuil + gravité ∝ dose · aléatoires = pas de seuil, gravité indépendante (cancers, malformations).',
    '3 principes : justification, optimisation (ALARA), limitation (20 mSv/an travailleurs ; non appliquée en thérapeutique).',
    'Cabinet : temps ↓, distance ↑, écrans · praticien sort ou cordon ≈ 2 m · opérateur ≥ 3 m du tube et du sujet · tablier plombé, cache-thyroïde (enfant +++), panoramique = tablier avant + arrière.',
    'Femme enceinte : dose fœtus 0,3-1 µSv &lt; 7 µSv/jour naturels → risque extrêmement faible (IRSN).'
  ],
  pieges: [
    'L’émission de RX vient du FREINAGE des électrons sur la cible — pas de la chaleur ni de la cathode.',
    'Photoélectrique = photon ABSORBÉ (couche profonde) ; Compton = photon DIFFUSÉ (couche périphérique). Ne pas inverser.',
    'Compton ne dépend PAS du numéro atomique : seulement de la DENSITÉ.',
    'Seuils de tension : photoélectrique majeur < 70 kV · Compton prépondérant > 100 kV · > 90-100 kV contraste insuffisant.',
    'Faible kV = PLUS de contraste ET PLUS de dose (pas l’inverse).',
    'Révélateur BASIQUE / fixateur ACIDE : le rinçage intermédiaire protège le fixateur.',
    'La fixation élimine le bromure d’argent NON sensibilisé (empêche le noircissement ultérieur) ; le lavage élimine hyposulfite + complexes d’argent (voile jaune).',
    'Feuille de plomb de l’emballage = contre les RX DIFFUSÉS ; papier noir = lumière ; enveloppe plastique = humidité.',
    'Gy mesurable / Sv calculable (non mesurable) — et Sv = Gy × Wr × Wt, pas l’inverse.',
    'Effets déterministes = avec SEUIL et gravité dose-dépendante ; stochastiques = sans seuil, gravité indépendante de la dose.',
    '2 m = cordon de commande (praticien dans la salle) ; 3 m = distance minimale opérateur-tube-sujet (conception). Ne pas confondre.',
    'Le code couleur vert/orange/rouge des positions autour du patient ≠ zones réglementaires.',
    'La limitation ne s’applique PAS quand l’irradiation est thérapeutique.',
    'Digital = 6× moins de dose que films D mais moins bonne définition ; films E/F = 2× moins ; pano de 20 ans = 3× plus.'
  ],
  qcm: [
    { q: 'Qui découvre les rayons X en 1895 ?', opts: ['Wilhelm Conrad Röntgen', 'Marie Curie', 'Coolidge', 'Henri Becquerel'], ans: 0, expl: 'Röntgen, 1895 ; prix Nobel 1901. Il sensibilise un film à distance et photographie le squelette de sa main.' },
    { q: 'Les longueurs d’onde des rayons X sont de l’ordre de :', opts: ['10⁻³ à 10⁻⁶ m', '10⁻⁸ à 10⁻¹² m', '1 à 10⁶ m', '10⁻¹⁵ à 10⁻¹⁸ m'], ans: 1, expl: '10⁻⁸ à 10⁻¹² m ; fréquences 10¹⁶-10²⁰ Hz ; énergies 40 eV à 4·10⁵ eV.' },
    { q: 'Dans le tube de Coolidge, l’émission de rayons X résulte :', opts: ['De l’échauffement de la cathode', 'Des interactions de freinage des électrons rapides sur la cible', 'De la désintégration du tungstène', 'De la fluorescence du verre'], ans: 1, expl: 'Les électrons accélérés bombardent l’anode (cible) : le freinage produit les RX.' },
    { q: 'L’anode tournante est frappée par le faisceau d’électrons :', opts: ['En son centre, piste en cuivre', 'Sur sa partie périphérique, piste en tungstène oblique', 'Sur sa face arrière, piste en plomb', 'Uniformément sur toute sa surface'], ans: 1, expl: 'Partie périphérique, piste tungstène orientée obliquement → dissipation de la chaleur.' },
    { q: 'L’effet photoélectrique concerne un électron :', opts: ['Périphérique peu lié', 'D’une couche profonde', 'Du noyau', 'De la couche de valence uniquement'], ans: 1, expl: 'Couche profonde : le photon est ABSORBÉ, éjection d’un photoélectron + ion positif.' },
    { q: 'L’effet photoélectrique est l’effet majeur pour des tensions :', opts: ['Supérieures à 100 kV', 'Inférieures à 70 kV', 'Comprises entre 90 et 100 kV', 'Indifférentes à la tension'], ans: 1, expl: '< 70 kV : effet principal dans les matières organiques → c’est lui qui donne le contraste.' },
    { q: 'La probabilité d’un effet Compton dépend :', opts: ['Du numéro atomique', 'Uniquement de la densité du matériel', 'De la couleur du tissu', 'De la température'], ans: 1, expl: 'Compton : densité seulement (≠ photoélectrique qui dépend du Z). Prépondérant > 100 kV.' },
    { q: 'Le résultat de l’effet Compton comprend :', opts: ['Un photon absorbé totalement', 'Une déviation avec perte d’énergie + diffusion dans toutes les directions', 'Une augmentation d’énergie du photon', 'Aucun ion produit'], ans: 1, expl: 'Photon diffusé (direction aléatoire, énergie inférieure) + électron + ion positif ; voile et danger.' },
    { q: 'La radiographie est justifiée par :', opts: ['La demande du patient', 'La prescription d’un médecin', 'Le choix de l’assistante', 'La disponibilité de l’appareil'], ans: 1, expl: 'Tout examen radiographique doit être justifié par une prescription médicale (principe de justification).' },
    { q: 'L’intensité (mA) du tube correspond :', opts: ['À l’énergie du photon', 'Au nombre de photons (noirceur de l’image)', 'À la filtration', 'À la distance foyer-film'], ans: 1, expl: 'mA = nombre de photons → noirceur ; générateurs actuels 4-8 mA. Le kV = énergie.' },
    { q: 'Une faible tension (kV) :', opts: ['Diminue contraste et dose', 'Augmente le contraste et la dose d’irradiation', 'Augmente le contraste et diminue la dose', 'N’a aucun effet'], ans: 1, expl: 'Faible kV = +contraste +dose ; tension élevée = -contraste -dose ; > 90-100 kV contraste insuffisant.' },
    { q: 'Pour un générateur ≤ 70 kV, la filtration doit équivaloir à :', opts: ['0,5 mm d’aluminium', '1,5 mm d’aluminium', '5 mm de plomb', '3 mm de cuivre'], ans: 1, expl: 'Filtration conventionnelle en aluminium 1-3 mm ; équivalente à 1,5 mm Al si tension ≤ 70 kV.' },
    { q: 'Sur un cliché, les structures aériques apparaissent :', opts: ['Blanches', 'Grises claires', 'Sombres ou noires', 'Jaunes'], ans: 2, expl: 'Elles laissent passer la quasi-totalité des rayonnements → radio-claires (noires). Os = blanc.' },
    { q: 'L’émulsion du film radiographique est constituée de cristaux de :', opts: ['Bromure d’argent', 'Sulfate de baryum', 'Iodure de potassium', 'Carbonate de calcium'], ans: 0, expl: 'Cristaux de bromures d’argent (AgBr) suspendus dans la gélatine sur support acétate de cellulose.' },
    { q: 'La feuille de plomb de l’emballage du film sert à :', opts: ['Protéger de la lumière', 'Arrêter les RX diffusés', 'Protéger de l’humidité', 'Rigidifier le film'], ans: 1, expl: 'Papier noir = lumière ; enveloppe plastique = humidité ; feuille de plomb = rayonnement diffusé.' },
    { q: 'Dimensions du film rétro-alvéolaire adulte / occlusal :', opts: ['22×35 mm / 57×76 mm', '31×41 mm / 57×76 mm', '31×41 mm / 22×35 mm', '24×30 mm / 50×70 mm'], ans: 1, expl: 'Rétro-alvéolaire adulte 31×41 mm ; enfant 22×35 mm ; occlusal 57×76 mm.' },
    { q: 'Ordre correct du développement du film :', opts: ['Fixation → révélation → rinçage → lavage → séchage', 'Révélation → rinçage → fixation → lavage final → séchage', 'Rinçage → révélation → lavage → fixation → séchage', 'Révélation → fixation → rinçage → séchage → lavage'], ans: 1, expl: 'Révélation (5 min/20 °C) → rinçage → fixation (10 min/20 °C) → lavage (10-20 min) → séchage (30-40 °C).' },
    { q: 'Le monobain permet un traitement complet en :', opts: ['8 minutes contre 15 en classique', '15 minutes contre 8 en classique', '5 minutes à 20 °C', '30 minutes à 40 °C'], ans: 0, expl: 'Monobain = révélation + fixation en une étape : 8 min vs 15 min, moins sensible à la température.' },
    { q: 'La dose absorbée s’exprime en … et vaut … :', opts: ['Sievert ; 1 Sv = 1 J/Kg', 'Gray ; 1 Gy = 1 J/Kg', 'Rad ; 1 rad = 1 J/Kg', 'Gray ; 1 Gy = 100 J/Kg'], ans: 1, expl: 'Dose absorbée = Gy = 1 J/Kg (mesurable). Dose efficace = Sv (calculable). 1 Gy = 1 Sv = 100 rads.' },
    { q: 'Pour passer du Gy au Sv, on fait intervenir :', opts: ['Wr (qualité du rayonnement) et Wt (nature du tissu)', 'Uniquement le temps d’exposition', 'La distance foyer-peau', 'Le numéro atomique du tissu'], ans: 0, expl: 'Sv = Gy × Wr × Wt : pondération qualité du rayonnement + sensibilité tissulaire.' },
    { q: 'Lors d’un panoramique, l’organe le plus irradié est :', opts: ['La moelle osseuse (0,01 mSv)', 'L’hypophyse (0,05 mSv)', 'Les glandes salivaires (0,39 mSv)', 'La thyroïde (0,05 mSv)'], ans: 2, expl: 'Glandes salivaires 0,39 mSv ; équivalent de doses efficaces 0,03 mSv.' },
    { q: 'Les effets déterministes :', opts: ['Se produisent à toute dose sans seuil', 'Ont un seuil : jamais en dessous, toujours au-dessus ; gravité ∝ dose', 'Ont une gravité indépendante de la dose', 'Sont toujours héréditaires'], ans: 1, expl: 'Non stochastiques : seuil déterminé, gravité croît avec la dose ; protection simple (prévisible).' },
    { q: 'Les effets aléatoires (stochastiques) comprennent :', opts: ['L’érythème cutané', 'La cataracte', 'Cancers radio-induits et malformations congénitales héréditaires', 'La radiolyse de l’eau'], ans: 2, expl: 'Cancérogénèse + effets héréditaires ; sans seuil, gravité indépendante de la dose ; protection complexe.' },
    { q: 'Les 3 principes de la radioprotection sont :', opts: ['Justification, optimisation, limitation', 'Distance, temps, écran', 'Révélation, fixation, lavage', 'Absorption, diffusion, transmission'], ans: 0, expl: 'Justification (bénéfice > risque) · optimisation (ALARA) · limitation (doses max, ex. 20 mSv/an travailleurs).' },
    { q: 'ALARA signifie :', opts: ['As Low As Reasonably Achievable', 'Always Limit And Reduce Absorption', 'As Long As Radiation Applies', 'A Low And Reasonable Attenuation'], ans: 0, expl: '« Aussi bas que raisonnablement possible » — principe d’optimisation.' },
    { q: 'Pendant le cliché, si le praticien reste dans la salle, la longueur du cordon recommandée est :', opts: ['Environ 50 cm', 'Environ 2 m', 'Au moins 3 m', '10 m'], ans: 1, expl: '≈ 2 m pour s’éloigner du patient hors du faisceau direct ; 3 m = distance minimale de conception opérateur-tube-sujet.' },
    { q: 'Chez l’enfant, le protecteur à privilégier (surtout pour l’occlusion maxillaire) est :', opts: ['Le tablier plombé gonadique', 'Le protecteur thyroïdien', 'Les lunettes plombées', 'Le cache-oreilles'], ans: 1, expl: 'Protecteur thyroïdien enfant +++ ; tablier plombé pour les gonades ; panoramique = tablier avant + arrière.' },
    { q: 'Dose délivrée au fœtus lors d’un examen dentaire :', opts: ['0,3 à 1 µSv', '7 mSv', '20 mSv', '2,4 Sv'], ans: 0, expl: '0,3-1 µSv, inférieure à l’exposition naturelle quotidienne du fœtus (7 µSv) → risque extrêmement faible (IRSN).' },
    { q: 'Par rapport aux films D, les détecteurs digitaux délivrent :', opts: ['2× moins de dose', '6× moins de dose', '3× plus de dose', 'Autant de dose'], ans: 1, expl: 'Digital = 6× moins (définition moindre) ; films E/F = 2× moins ; panoramique ancien (20 ans) = 3× plus.' },
    { q: 'L’image radiologique est une ombre projetée en 2D : pour évaluer la profondeur d’un objet il faut :', opts: ['Augmenter les kV', 'Une deuxième vue d’incidence perpendiculaire', 'Un film plus grand', 'Réduire la collimation'], ans: 1, expl: 'Projection conique = perte de la profondeur et déformation → 2ᵉ vue ⊥ à la première.' }
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