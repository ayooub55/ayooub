#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère index.html : page unique (autonome) de révision de la biochimie
structurale, sur le modèle de la page IMD (nav latérale, hero, boxes, QCM,
flashcards, examen blanc, recherche, mode sombre).

Le CSS vient de assets/biochimie.css (identique à la page IMD, adapté aux
couleurs de la biochimie) et il est intégré dans la page : un seul fichier
HTML à partager.

Usage : python3 tools/build_biochimie.py
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = (ROOT / "assets" / "biochimie.css").read_text(encoding="utf-8")

# --------------------------------------------------------------------------
# Contenu
# --------------------------------------------------------------------------
IMG = "cours/img/"

GUIDE = """
<div class="grid">
<div class="stat"><b>12 séances</b><span>Plan de travail du module</span></div>
<div class="stat"><b>2 enseignants</b><span>Pr. Khlil · Pr. Naamane</span></div>
<div class="stat"><b>100 % QCM</b><span>Format de l'épreuve</span></div>
</div>

<div class="box def"><b class="t">Ce que cette page contient</b>
Tout le programme de biochimie structurale, chapitre par chapitre : les <b>oses</b>, la <b>cyclisation</b>,
les <b>propriétés physiques et chimiques</b>, les <b>osides</b> (disaccharides, polyosides, GAG) — avec les
schémas du diaporama, les formules à retenir, les pièges classiques et des QCM corrigés.
</div>

<h3>Les parties annoncées à l'examen</h3>
<p class="hint">Le professeur a annoncé <b>à l'oral, en cours</b>, que certaines parties tomberaient. Ce sont
elles qui décident de l'ordre de révision — pas les annales, qui ne font que confirmer. Elles sont toutes
traitées ici et signalées par le repère « annoncé ».</p>
<div class="tw"><table>
<tr><th>Partie</th><th>Ce qu'on doit savoir faire</th><th>Où</th></tr>
<tr><td><b>Filiation de Keller et Kiliani</b></td><td>Construire l'arbre des oses, définir un épimère, placer mannose / allose / galactose</td><td><a href="#c1">Chapitre 1</a></td></tr>
<tr><td><b>Cyclisation du glucose</b></td><td>Expliquer la formation de l'hémiacétal, distinguer α et β, justifier 36 / 63 / 0,1 %</td><td><a href="#c2">Chapitre 2</a></td></tr>
<tr><td><b>Cyclisation du fructose</b></td><td>Justifier le <b>furanose</b> et le carbone anomérique en <b>C2</b></td><td><a href="#c3">Chapitre 3</a></td></tr>
<tr><td><b>Propriétés physiques</b></td><td>Solubilité, saveur, pouvoir rotatoire, mutarotation</td><td><a href="#c4">Chapitre 4</a></td></tr>
<tr><td><b>Propriétés chimiques</b></td><td>Ce que donne C1, C6 et les alcools secondaires (acides, sorbitol, G6P, glucosamine)</td><td><a href="#c5">Chapitre 5</a></td></tr>
<tr><td><b>Classification des osides</b></td><td>Holoside / hétéroside, oligo / polyoside, homopolyoside / hétéropolyoside, l'aglycone</td><td><a href="#c6">Chapitre 6</a></td></tr>
<tr><td><b>Le lactose</b></td><td>Nom complet, liaison, enzyme, réductibilité — la question 11</td><td><a href="#c7">Chapitre 7</a></td></tr>
<tr><td><b>Bilan lipidique sérique</b></td><td>Les 11 valeurs normales, le lipidogramme 24/56/20 %, les 3 pièges</td><td><a href="#c9">Chapitre 9</a></td></tr>
<tr><td><b>Protéines &amp; hémoglobine</b> <span class="chip" style="cursor:default">annoncé</span></td><td>Liaison peptidique, 4 niveaux de structure, HbA1/A2/F, Bohr, 2,3-DPG, drépanocytose — <b>Q8 à Q13</b></td><td><a href="#c12">Chapitre 12</a></td></tr>
<tr><td><b>Les acides aminés</b> <span class="chip" style="cursor:default">annoncé</span></td><td>Structure, classification par R, essentiels, pHi, électrophorèse — <b>7 questions sur 40</b> en 2024-25</td><td><a href="#c11">Chapitre 11</a></td></tr>
<tr><td><b>Sphingolipides</b> <span class="chip" style="cursor:default">annoncé à l'oral</span></td><td>La sphingosine, le céramide, les 4 familles, les 3 maladies — <b>annoncée en cours par le Pr. Naamane</b>, et déjà tombée en 2024-25 (Q39-Q40) puis en session 2025</td><td><a href="#c10">Chapitre 10</a></td></tr>
</table></div>

<h3>Le plan des 12 séances</h3>
<div class="tw"><table>
<tr><th>#</th><th>Contenu</th><th>Référence</th></tr>
<tr><td><b>S1</b></td><td>Définitions, intérêt biologique, vocabulaire (oses, osides, aldose, cétose)</td><td>diapos 1-3</td></tr>
<tr><td><b>S2</b></td><td>Classification des oses : trioses → hexoses, série D et L</td><td>diapos 4-10</td></tr>
<tr><td><b>S3</b></td><td>Filiation de Keller et Kiliani, épimères, formule de Fischer</td><td>diapos 11-18</td></tr>
<tr><td><b>S4</b></td><td>Cyclisation du glucose : hémiacétal, anomères α et β, mutarotation</td><td>diapos 19-26</td></tr>
<tr><td><b>S5</b></td><td>Cyclisation du fructose : furanose, C2 anomérique</td><td>diapos 27-30</td></tr>
<tr><td><b>S6</b></td><td>Propriétés physiques : solubilité, saveur, pouvoir rotatoire</td><td>diapo 33</td></tr>
<tr><td><b>S7</b></td><td>Propriétés chimiques : oxydation, réduction, addition (C1)</td><td>diapos 34-36</td></tr>
<tr><td><b>S8</b></td><td>Estérification : G6P, esters organiques, acide glucuronique</td><td>diapos 37-38</td></tr>
<tr><td><b>S9</b></td><td>Liaison osidique, oligosides, les 3 disaccharides</td><td>diapos 39-46</td></tr>
<tr><td><b>S10</b></td><td>Amidon, glycogène : liaisons α(1→4) et α(1→6)</td><td>diapos 47-52</td></tr>
<tr><td><b>S11</b></td><td>GAG, MPS, protéoglycanes · puis lipides : acides gras, glycérides, stérols, eicosanoïdes</td><td>diapos 53-62 · 63-87</td></tr>
<tr><td><b>S12</b></td><td><b>Bilan lipidique sérique</b> (diapos 88-89) puis <b>sphingolipides</b> et sphingophospholipides (diapos 90-93) + annales chronométrées</td><td>diapos 88-93 · annales</td></tr>
</table></div>

<div class="box tip"><b class="t">Méthode de révision</b>
<b>1.</b> Lis le chapitre ici, puis relis la diapositive correspondante du diaporama.
<b>2.</b> Refais le schéma de mémoire (arbre de Keller, cycle, arbre des osides).
<b>3.</b> Fais les QCM du chapitre, puis les flashcards.
<b>4.</b> Termine par l'<a href="#ex">examen blanc chronométré</a>.
</div>

<div class="box warn"><b class="t">Deux avertissements</b>
<b>1.</b> Les valeurs numériques sont celles du diaporama ; en cas de divergence avec un résumé, c'est le
cours qui fait foi (un écart est signalé au chapitre 6 pour le seuil oligoside/polyoside).
<b>2.</b> Cette page est un outil de révision : elle ne remplace pas le cours du professeur.
</div>
"""

C1 = f"""
<div class="box def"><b class="t">Définitions</b>
Les <b>glucides</b> sont des molécules composées de <b>carbone, hydrogène et oxygène</b>. Leur formule
générale s'écrit <b>C<sub>n</sub>(H<sub>2</sub>O)<sub>n</sub></b> — d'où le nom « hydrate de carbone ».
On distingue :
<ul>
<li>les <b>oses</b> (sucres simples) : molécules <b>non hydrolysables</b> ;</li>
<li>les <b>osides</b> : molécules <b>hydrolysables</b>, formées d'oses et/ou de dérivés d'oses.</li>
</ul>
Un ose est soit un <b>aldose</b> (il porte un groupe <b>aldéhyde</b> –CHO sur le C1), soit une <b>cétose</b>
(il porte une <b>cétone</b>, en C2 le plus souvent). Selon le nombre de carbones : triose (3), tétrose (4),
pentose (5), hexose (6).
</div>

<h3>La filiation de Keller et Kiliani <span class="chip" style="cursor:default">annoncé</span></h3>
<p>C'est la première partie annoncée. Le principe tient en une phrase : <b>on allonge la chaîne d'un carbone à
la fois</b>, en partant du glycéraldéhyde, et chaque allongement <b>double</b> le nombre d'oses.</p>

<div class="flow"><span>Glycéraldéhyde (3 C)</span><i>→</i><span>2 tétroses</span><i>→</i>
<span>4 pentoses</span><i>→</i><span>8 hexoses</span></div>

<p>Chaque nouveau carbone ajouté devient un <b>carbone asymétrique</b> : il peut porter son OH à <b>droite</b>
(D) ou à <b>gauche</b> (L). Les deux oses obtenus à partir d'un même ose sont des <b>épimères</b> : ils ne
diffèrent que par la configuration d'<b>un seul</b> carbone.</p>

<figure class="mol"><img src="{IMG}keller-kiliani.png" alt="Arbre de Keller et Kiliani : du glycéraldéhyde aux hexoses, chaque allongement double le nombre d'oses" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>L'arbre de filiation : à chaque étage, un carbone asymétrique de plus, donc deux oses de plus.</figcaption></figure>

<div class="tw"><table>
<tr><th>Ose</th><th>Type</th><th>Épimère de</th><th>Ce qu'il faut retenir</th></tr>
<tr><td><b>D-glucose</b></td><td>Aldohexose</td><td>—</td><td>La référence de tout le chapitre</td></tr>
<tr><td><b>D-mannose</b></td><td>Aldohexose</td><td>glucose, <b>C2</b></td><td>OH du C2 inversé</td></tr>
<tr><td><b>D-allose</b></td><td>Aldohexose</td><td>glucose, <b>C3</b></td><td>OH du C3 inversé</td></tr>
<tr><td><b>D-galactose</b></td><td>Aldohexose</td><td>glucose, <b>C4</b></td><td>OH du C4 inversé — c'est celui du lactose</td></tr>
<tr><td><b>D-fructose</b></td><td>Cétohexose</td><td>—</td><td>Pas un épimère : c'est une cétose, la fonction change</td></tr>
</table></div>

<div class="box ex"><b class="t">Exemple</b>
Le <b>D-glucose</b> et le <b>D-galactose</b> ont la même formule brute <b>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></b>
et la même chaîne ; seul le OH du <b>C4</b> change de côté. Ce sont donc des <b>épimères</b>, et c'est cette
différence minuscule qui transforme le glucose en galactose — puis le maltose en lactose.
</div>

<h3>Série D et série L</h3>
<p>On regarde le <b>carbone chiral le plus éloigné</b> du carbonyle : si son OH est à <b>droite</b> (Fischer),
l'ose est de la <b>série D</b> ; à gauche, série <b>L</b>. Les oses naturels sont presque tous de la série D.</p>

<div class="box warn"><b class="t">Piège d'examen</b>
<b>D/L</b> (majuscule) décrit la <b>structure</b> : c'est une convention de représentation de Fischer.
<b>d/l</b> (minuscule) décrit le <b>pouvoir rotatoire</b> mesuré au polarimètre.
Un ose <b>D</b> peut être <b>lévogyre</b> : <b>D ≠ dextrogyre</b>. Ne jamais écrire « D = droite » en parlant
de rotation.
</div>
"""

C2 = """
<div class="box def"><b class="t">Le problème</b>
En solution, un ose ne reste pas en chaîne ouverte : son <b>carbonyle</b> réagit avec un <b>OH</b> de la même
molécule. Il se forme un <b>hémiacétal</b> (pour un aldose) ou un <b>hémiacétal cyclique</b> (pour une cétose),
et la molécule se referme en <b>cycle</b>. Le carbone qui portait le carbonyle devient le
<b>carbone anomérique</b> : c'est un <b>nouveau carbone asymétrique</b>.
</div>

<h3>Pourquoi le glucose se referme en cycle à 6 atomes</h3>
<p>L'OH du <b>C5</b> attaque le carbonyle du <b>C1</b>. Le cycle contient alors <b>5 carbones + 1 oxygène = 6
atomes</b> : c'est un <b>pyranose</b> (du nom du pyrane). Le C1 devient anomérique et peut se présenter de
deux façons :</p>

<div class="two">
<div class="box tip"><b class="t">Anomère α</b>
L'OH anomérique du C1 est du <b>côté opposé</b> au CH<sub>2</sub>OH du C5 : disposition <b>trans</b>.
</div>
<div class="box tip"><b class="t">Anomère β</b>
L'OH anomérique du C1 est du <b>même côté</b> que le CH<sub>2</sub>OH du C5 : disposition <b>cis</b>.
</div>
</div>

<figure class="mol"><img src="cours/img/cyclisation-glucose.png" alt="Cyclisation du glucose : la chaîne ouverte se referme en pyranose, avec les deux anomères alpha et bêta" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>Le glucose : chaîne ouverte → pyranose, et les deux anomères α et β.</figcaption></figure>

<h3>La mutarotation : 36 / 63 / 0,1 %</h3>
<p>Les deux anomères sont en <b>équilibre</b> en solution, par ouverture et refermeture du cycle :</p>
<div class="tw"><table>
<tr><th>Forme</th><th>Proportion à l'équilibre</th><th>Pourquoi</th></tr>
<tr><td><b>α-D-glucopyranose</b></td><td><b>36 %</b></td><td>OH anomérique trans : un peu moins stable (répulsion avec le CH<sub>2</sub>OH)</td></tr>
<tr><td><b>β-D-glucopyranose</b></td><td><b>63 %</b></td><td>OH anomérique cis : <b>plus stable</b>, donc majoritaire</td></tr>
<tr><td><b>Forme ouverte</b></td><td><b>0,1 %</b></td><td>Très minoritaire, mais c'est elle qui porte le carbonyle libre</td></tr>
</table></div>

<div class="box ex"><b class="t">C'est de là que vient la réductibilité</b>
La forme ouverte (0,1 %) possède un <b>carbonyle libre</b> : c'est suffisant pour réduire la liqueur de
Fehling. Un sucre est <b>réducteur</b> dès qu'il peut s'ouvrir, donc dès qu'un OH hémiacétalique reste
<b>libre</b>.
</div>

<div class="box warn"><b class="t">Piège : les proportions ne sont pas 50 / 50</b>
Retiens <b>β &gt; α</b> (63 contre 36) et la forme ouverte à <b>0,1 %</b>. Un QCM qui propose « 50 / 50 »
est faux.
</div>
"""

C3 = """
<div class="box def"><b class="t">Ce qui change avec une cétose</b>
Le fructose est un <b>cétohexose</b> : son carbonyle n'est pas en C1 mais en <b>C2</b>. Quand il se cyclise,
c'est donc le <b>C2 qui devient anomérique</b>, et le C1 se réduit à un simple
<b>CH<sub>2</sub>OH</b> accroché au C2.
</div>

<h3>Pourquoi furanose et non pyranose ?</h3>
<p>Dans le fructose, c'est l'OH du <b>C5</b> qui attaque le carbonyle du <b>C2</b>. Le cycle obtenu contient
<b>4 carbones + 1 oxygène = 5 atomes</b> : c'est un <b>furanose</b>. Un cycle à 6 atomes demanderait
l'attaque par l'OH du C6, ce qui est moins favorable ici — le cours retient donc la forme
<b>furanose</b>.</p>

<figure class="mol"><img src="cours/img/cyclisation-fructose.png" alt="Cyclisation du fructose en furanose : le carbone anomérique est le C2, le C1 reste un CH2OH" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>Fructose : cycle à 5 (furanose), carbone anomérique en <b>C2</b>, repère = CH<sub>2</sub>OH du C6.</figcaption></figure>

<div class="tw"><table>
<tr><th></th><th>Glucose</th><th>Fructose</th></tr>
<tr><td><b>Famille</b></td><td>Aldohexose</td><td><b>Cétohexose</b></td></tr>
<tr><td><b>Carbone anomérique</b></td><td><b>C1</b></td><td><b>C2</b></td></tr>
<tr><td><b>Cycle</b></td><td>6 atomes = <b>pyranose</b></td><td>5 atomes = <b>furanose</b></td></tr>
<tr><td><b>Repère pour α/β</b></td><td>CH<sub>2</sub>OH du <b>C5</b></td><td>CH<sub>2</sub>OH du <b>C6</b></td></tr>
<tr><td><b>Le C1 est…</b></td><td>anomérique</td><td>un simple <b>CH<sub>2</sub>OH</b></td></tr>
</table></div>

<div class="box warn"><b class="t">L'erreur classique</b>
Écrire « fructose pyranose » ou « carbone anomérique du fructose = C1 ». Les deux sont <b>faux</b>. Une cétose
se cyclise sur son carbone <b>2</b>, et le fructose du programme est un <b>furanose</b>.
</div>
"""

C4 = """
<div class="box def"><b class="t">Les trois propriétés physiques (diapo 33)</b>
Les oses sont des <b>solides blancs cristallins</b>, <b>très solubles dans l'eau</b>, de <b>saveur sucrée
variable</b>, et ils possèdent un <b>pouvoir rotatoire</b>.
</div>

<div class="tw"><table>
<tr><th>Propriété</th><th>Explication</th><th>Conséquence</th></tr>
<tr><td><b>Solubilité dans l'eau</b></td><td>Chaque ose porte <b>plusieurs OH</b> qui forment des <b>liaisons hydrogène</b> avec l'eau</td><td>Solubles, alors qu'ils sont <b>insolubles dans les solvants organiques</b> (apolaires)</td></tr>
<tr><td><b>Saveur sucrée</b></td><td>Elle dépend de la <b>structure</b>, pas du pouvoir rotatoire</td><td><b>Très variable</b> : le saccharose est très sucré, le lactose peu</td></tr>
<tr><td><b>Pouvoir rotatoire</b></td><td>Les oses sont <b>optiquement actifs</b> (carbones asymétriques) : ils dévient la lumière polarisée</td><td>Dextrogyre (d) ou lévogyre (l), mesuré au <b>polarimètre</b></td></tr>
</table></div>

<h3>Le pouvoir rotatoire, le point le plus rentable</h3>
<p>Un ose <b>D</b> n'est pas forcément <b>dextrogyre</b>, et un ose <b>L</b> n'est pas forcément lévogyre.
Les deux notations n'ont <b>rien à voir</b> :</p>
<ul>
<li><b>D / L</b> : convention de <b>représentation</b> (position du OH sur le carbone chiral le plus éloigné du
carbonyle) ;</li>
<li><b>d / l</b> (ou + / −) : <b>mesure expérimentale</b> de la déviation de la lumière polarisée.</li>
</ul>

<div class="box tip"><b class="t">Mutarotation et pouvoir rotatoire</b>
Le pouvoir rotatoire d'une solution <b>change avec le temps</b> : c'est la <b>mutarotation</b>. Une solution
de α-D-glucose pur voit sa rotation évoluer jusqu'à la valeur d'équilibre (36 % α / 63 % β / 0,1 % ouvert).
</div>

<div class="box warn"><b class="t">Piège</b>
La solubilité distingue les <b>oses</b> des <b>osides</b> : l'<b>amylose</b> et le <b>glycogène</b> sont des
polyosides, donc bien moins solubles que le glucose, malgré des milliers d'OH.
</div>
"""

C5 = """
<p>Trois familles de réactions, selon <b>quelle fonction on attaque</b>. C'est le plan à réciter.</p>

<h3>1. Sur le carbonyle (C1) — oxydation, réduction, addition</h3>
<div class="tw"><table>
<tr><th>Réaction</th><th>Ce qui se forme</th><th>À retenir</th></tr>
<tr><td><b>Oxydation</b></td><td><b>Acide gluconique</b></td><td>La fonction aldéhyde devient acide carboxylique. C'est la base du test de <b>Fehling</b> (2 Cu<sup>2+</sup> → 2 Cu<sup>+</sup>, précipité rouge brique)</td></tr>
<tr><td><b>Réduction</b></td><td><b>Sorbitol</b></td><td>Le carbonyle devient un alcool : c'est un <b>polyol</b> (édulcorant, pouvoir osmotique)</td></tr>
<tr><td><b>Addition</b></td><td><b>Hémiacétal</b></td><td>C'est la réaction de <b>cyclisation</b> : un alcool s'ajoute sur le carbonyle</td></tr>
</table></div>

<h3>2. Sur l'alcool primaire (C6)</h3>
<div class="tw"><table>
<tr><th>Réaction</th><th>Produit</th><th>Intérêt</th></tr>
<tr><td><b>Oxydation</b></td><td><b>Acide glucuronique</b></td><td>Constitution des <b>GAG</b> ; détoxification (conjugaison)</td></tr>
<tr><td><b>Estérification par H<sub>3</sub>PO<sub>4</sub></b></td><td><b>Glucose-6-phosphate (G6P)</b></td><td>1<sup>re</sup> étape de la glycolyse (hexokinase)</td></tr>
<tr><td><b>Estérification par R–COOH</b></td><td><b>Esters organiques</b></td><td>R long = composé <b>liposoluble</b></td></tr>
</table></div>

<div class="box def"><b class="t">Pourquoi le C6 ? (et pas un autre)</b>
Le C6 est le <b>seul alcool primaire</b> de l'hexose, donc le <b>moins encombré</b> : c'est lui qui est
estérifié préférentiellement. Les alcools secondaires (C2, C3, C4) réagissent par <b>substitution</b>, pas
par estérification.
</div>

<h3>3. L'estérification : la réaction complète</h3>
<div class="flow"><span>Alcool</span><i>+</i><span>Acide</span><i>→</i><span>Ester</span><i>+</i><span>Eau</span></div>
<ol>
<li>L'<b>oxygène</b> de l'alcool attaque l'acide ;</li>
<li>une molécule d'<b>eau</b> est éliminée ;</li>
<li>il reste une <b>liaison ester</b> : C–O–P pour le phosphate.</li>
</ol>

<figure class="mol"><img src="cours/img/esterification-glucose.png" alt="Estérification du glucose en glucose-6-phosphate : liaison ester phosphorique sur l'oxygène du carbone 6" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>Le G6P : la liaison <b>ester phosphorique C–O–P</b> se forme sur l'O du C6.</figcaption></figure>

<div class="tw"><table>
<tr><th>Point</th><th>Le glucose-6-phosphate</th></tr>
<tr><td><b>Formation</b></td><td>C6 + H<sub>3</sub>PO<sub>4</sub> → G6P (hexokinase, avec ATP)</td></tr>
<tr><td><b>Charge</b></td><td><b>Chargé négativement</b> → hydrosoluble</td></tr>
<tr><td><b>Conséquence</b></td><td>Il <b>ne traverse pas</b> la membrane : le glucose est <b>piégé</b> dans la cellule</td></tr>
<tr><td><b>Rôle</b></td><td>1<sup>re</sup> étape de la <b>glycolyse</b></td></tr>
<tr><td><b>Retour</b></td><td><b>Glucose-6-phosphatase</b> (foie, rein) → glucose libre → glycémie</td></tr>
</table></div>

<div class="box warn"><b class="t">Deux pièges</b>
<b>1.</b> <b>Ester ≠ éther</b> : dans l'ester, l'oxygène est relié à un <b>carbone et à un acide</b> (C–O–P
ou C–O–C=O) ; l'éther-oxyde relie deux carbones.
<b>2.</b> <b>G6P ≠ glucose-1-phosphate</b> : le G1P est phosphorylé sur le <b>C1 anomérique</b>, c'est la forme
activée pour le <b>glycogène</b>.
</div>

<h3>4. Sur les alcools secondaires (C2, C3, C4)</h3>
<div class="tw"><table>
<tr><th>Réactif</th><th>Produit</th><th>Exemple</th></tr>
<tr><td><b>R–NH<sub>2</sub></b> (amine)</td><td><b>Glucosamine</b></td><td>Constitution de l'acide hyaluronique et des GAG</td></tr>
<tr><td><b>R–O–CH<sub>3</sub></b></td><td><b>Éther-oxyde méthylique</b></td><td>Substitution de l'OH par un groupement méthyle</td></tr>
</table></div>

<div class="box tip"><b class="t">Récapitulatif en une ligne</b>
<b>C1</b> = oxydation (acide gluconique), réduction (sorbitol), cyclisation.
<b>C6</b> = acide glucuronique, G6P, esters. <b>Alcools secondaires</b> = glucosamine, éther-oxyde.
</div>
"""

C6 = """
<div class="box def"><b class="t">Les osides</b>
Les <b>osides</b> sont des molécules <b>hydrolysables</b>, formées de plusieurs oses (ou d'oses et d'un
composé non glucidique). Deux grandes classes :
<ul>
<li><b>Holosides</b> : l'hydrolyse ne donne <b>que des oses</b> (et/ou des dérivés d'oses) ;</li>
<li><b>Hétérosides</b> : l'hydrolyse donne des <b>oses + une partie non glucidique = l'aglycone</b>.</li>
</ul>
</div>

<figure class="mol"><img src="cours/img/classification-osides.png" alt="Arbre de classification des osides : holosides (oligosides et polyosides) et hétérosides" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>L'arbre des osides, niveau par niveau.</figcaption></figure>

<div class="tw"><table>
<tr><th>Niveau</th><th>Critère</th><th>Exemples</th></tr>
<tr><td><b>Osides</b></td><td>Molécules hydrolysables</td><td>—</td></tr>
<tr><td><b>Holosides</b></td><td>Hydrolyse → oses uniquement</td><td>Maltose, lactose, saccharose, amidon, glycogène, GAG</td></tr>
<tr><td><b>Hétérosides</b></td><td>Hydrolyse → oses + <b>aglycone</b></td><td>Protéoglycanes, glycoprotéines, glycolipides</td></tr>
<tr><td><b>Oligosides</b></td><td><b>n &lt; 10</b> oses</td><td>Maltose, lactose, saccharose</td></tr>
<tr><td><b>Polyosides</b></td><td><b>n &gt; 10</b> oses</td><td>Amidon, glycogène, MPS, GAG</td></tr>
<tr><td><b>Homopolyosides</b></td><td>Oses identiques</td><td>Amidon, glycogène (que du glucose)</td></tr>
<tr><td><b>Hétéropolyosides</b></td><td>Oses variés</td><td>MPS, GAG</td></tr>
</table></div>

<h3>L'aglycone</h3>
<div class="box def"><b class="t">Définition</b>
L'<b>aglycone</b> est la partie <b>non glucidique</b> d'un hétéroside — tout ce qui n'est pas un ose.
C'est elle qui <b>définit la famille</b> de l'hétéroside. Le cours la décrit comme
« l'association d'oses et de composés non glucidiques ».
</div>

<div class="tw"><table>
<tr><th>Hétéroside</th><th>Partie osidique</th><th>Aglycone</th><th>Liaison</th></tr>
<tr><td><b>Protéoglycane</b></td><td>Dimères de GAG</td><td><b>Axe protéique</b></td><td><b>O-osidique</b> sur sérine / thréonine</td></tr>
<tr><td><b>Glycoprotéine</b></td><td>Oligoside</td><td><b>Protéine</b></td><td>O-osidique</td></tr>
<tr><td><b>Glycolipide</b></td><td>Oligoside</td><td><b>Céramide</b> (partie lipidique)</td><td>O-osidique</td></tr>
</table></div>

<div class="box bad"><b class="t">Le piège qui coûte des points</b>
<b>GAG et MPS sont des hétéropolyosides, mais ce ne sont PAS des hétérosides.</b>
« Hétéro-polyoside » veut dire que les <b>oses sont variés</b> ; la molécule reste un <b>holoside</b>, car
l'hydrolyse ne libère que des oses. Le mot « hétéroside » suppose un <b>aglycone</b>.
</div>

<div class="box warn"><b class="t">Divergence entre supports</b>
Le diaporama retient <b>n &lt; 10</b> oses pour les oligosides, un résumé de la promo indique n &lt; 12.
La convention internationale est <b>2 à 10</b> : réponds <b>10</b>.
</div>
"""

C7 = """
<p>Les trois disaccharides du programme, et la méthode pour les nommer sans faute.</p>

<h3>Le lactose — la question 11</h3>
<div class="box def"><b class="t">Nom complet</b>
<b>β-D-galactopyranosyl (1 → 4) β-D-glucopyranose</b>
</div>
<p>Il se lit de gauche à droite : le <b>β</b> est l'anomère du <b>premier</b> ose, « -yl » indique que son
carbone anomérique est <b>engagé</b>, « (1→4) » va du C1 du galactose au C4 du glucose.</p>

<figure class="mol"><img src="cours/img/lactose.png" alt="Structure du lactose : le carbone anomérique du galactose est engagé, celui du glucose est libre" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>Galactose (C1 engagé) + glucose (C1 <b>libre</b>) = extrémité réductrice.</figcaption></figure>

<div class="tw"><table>
<tr><th></th><th>D-Galactose</th><th>D-Glucose</th></tr>
<tr><td><b>Carbone anomérique</b></td><td>C1 — <b>engagé</b></td><td>C1 — <b>libre</b></td></tr>
<tr><td><b>Peut s'ouvrir ?</b></td><td>Non</td><td><b>Oui</b> → carbonyle libre</td></tr>
<tr><td><b>Rôle</b></td><td>Extrémité non réductrice</td><td><b>Extrémité réductrice</b></td></tr>
</table></div>

<div class="box tip"><b class="t">L'enzyme</b>
<b>Lactase = β(1→4)-galactosidase</b> : elle reconnaît l'ose engagé (galactose), la nature de l'anomère (β)
et le type de liaison (1→4). Un déficit provoque l'<b>intolérance au lactose</b> (fermentation → ballonnements,
diarrhée) : ce n'est pas une allergie.
</div>

<h3>La méthode de dénomination en 5 étapes</h3>
<ol>
<li><b>Quels sont les deux oses ?</b></li>
<li><b>Quelle forme cyclique ?</b> 6 atomes = pyranose, 5 = furanose.</li>
<li><b>Quel carbone anomérique est engagé ?</b> Celui qui porte l'oxygène du pont → il s'écrit <b>en premier</b>, avec « -yl ».</li>
<li><b>Quels anomères (α ou β) ?</b> Comparer l'OH anomérique au CH<sub>2</sub>OH de référence.</li>
<li><b>Quels numéros ?</b> La liaison (n → m), dans l'ordre des oses écrits.</li>
</ol>

<div class="box ex"><b class="t">Exemple : le saccharose</b>
Glucose (pyranose, C1 engagé → α) + fructose (furanose, C2 engagé → β), liaison C1 → C2 :
<b>α-D-glucopyranosyl (1 → 2) β-D-fructofuranose</b>.
Comme le fructose a son carbone anomérique en C2, on peut aussi partir de lui :
<b>β-D-fructofuranosyl (2 → 1) α-D-glucopyranose</b> — même molécule, les deux noms sont corrects.
</div>

<figure class="mol"><img src="cours/img/saccharose-structure.png" alt="Saccharose : glucose alpha lié par C1 au C2 du fructose bêta furanose" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>Saccharose : les <b>deux</b> carbones anomériques sont engagés → sucre non réducteur.</figcaption></figure>

<div class="tw"><table>
<tr><th>Disaccharide</th><th>Nom complet</th><th>Enzyme</th><th>Réducteur ?</th></tr>
<tr><td><b>Maltose</b></td><td>α-D-glucopyranosyl (1→4) α-D-glucopyranose</td><td>α(1→4)-glucosidase</td><td><b>Oui</b></td></tr>
<tr><td><b>Lactose</b></td><td>β-D-galactopyranosyl (1→4) β-D-glucopyranose</td><td>β(1→4)-galactosidase</td><td><b>Oui</b></td></tr>
<tr><td><b>Saccharose</b></td><td>α-D-glucopyranosyl (1→2) β-D-fructofuranose</td><td>α(1→2)-glucosidase = β(2→1)-fructosidase</td><td><b>Non</b></td></tr>
</table></div>

<div class="box bad"><b class="t">Les erreurs qui coûtent la note</b>
<b>1.</b> Mettre « -yl » sur le mauvais ose (c'est celui dont le carbone anomérique est engagé).
<b>2.</b> Oublier le second α/β. <b>3.</b> Garder (1→2) en inversant l'ordre des oses (il faut (2→1)).
<b>4.</b> Écrire pyranose pour le fructose. <b>5.</b> Oublier la série D.
</div>
"""

C8 = """
<div class="box def"><b class="t">Deux liaisons seulement</b>
Les polyosides de réserve sont des chaînes de glucose unies par :
<ul>
<li><b>α(1→4)</b> : C1 d'un glucose relié au C4 du suivant → la <b>chaîne</b> (le fil) ;</li>
<li><b>α(1→6)</b> : C1 relié au C6 d'un glucose de la chaîne → la <b>ramification</b> (l'arbre).</li>
</ul>
</div>

<figure class="mol"><img src="cours/img/liaisons-alpha-amidon.png" alt="Chaîne de glucopyranoses unis par des liaisons alpha(1-4), avec un branchement alpha(1-6) sur le carbone 6" style="max-width:100%;border-radius:12px;border:1px solid var(--line)">
<figcaption>α(1→4) bout à bout, α(1→6) en travers : le point de branchement.</figcaption></figure>

<div class="box tip"><b class="t">Le réflexe de lecture : CH<sub>2</sub>OH ou CH<sub>2</sub> ?</b>
<b>CH<sub>2</sub>OH</b> en C6 → le C6 est libre, résidu normal.
<b>CH<sub>2</sub></b> (sans OH) en C6 → le C6 est <b>engagé</b> dans un α(1→6) : c'est un
<b>branchement</b>. C'est ce qui permet de repérer une ramification sur n'importe quel schéma.
</div>

<div class="tw"><table>
<tr><th></th><th>Amylose</th><th>Amylopectine</th><th>Glycogène</th></tr>
<tr><td><b>Liaisons</b></td><td>α(1→4) seulement</td><td>α(1→4) + α(1→6)</td><td>α(1→4) + α(1→6)</td></tr>
<tr><td><b>Structure</b></td><td>Linéaire</td><td>Branchée</td><td>Très branchée</td></tr>
<tr><td><b>Branchement</b></td><td>—</td><td>tous les <b>20-30</b> résidus</td><td>tous les <b>8-12</b> résidus</td></tr>
<tr><td><b>Part de l'amidon</b></td><td><b>20 %</b></td><td><b>80 %</b></td><td>—</td></tr>
<tr><td><b>Localisation</b></td><td>Végétal</td><td>Végétal</td><td>Foie + muscle</td></tr>
<tr><td><b>Digestion</b></td><td>Lente</td><td>Plus rapide</td><td><b>Très rapide</b></td></tr>
</table></div>

<div class="box ex"><b class="t">Pourquoi les ramifications accélèrent tout</b>
Les enzymes attaquent les chaînes <b>par leurs extrémités</b>. Plus il y a de branches α(1→6), plus il y a
d'extrémités accessibles, donc plus la dégradation est rapide. D'où le glycogène très branché pour une
libération rapide de glucose.
</div>

<h3>Les GAG</h3>
<div class="tw"><table>
<tr><th>GAG</th><th>Composition</th><th>Où</th></tr>
<tr><td><b>Acide hyaluronique</b></td><td>Acide glucuronique + N-acétyl-glucosamine (<b>sans sulfate</b>)</td><td>Liquide synovial, vitré, cartilage ; détruit par les hyaluronidases</td></tr>
<tr><td><b>Chondroïtine sulfate</b></td><td>Acide glucuronique + N-acétyl-galactosamine <b>sulfatée</b></td><td>Cartilage</td></tr>
<tr><td><b>Kératane sulfate</b></td><td>Galactose + N-acétyl-glucosamine <b>sulfatée</b></td><td>Cornée, cartilage</td></tr>
</table></div>

<div class="box warn"><b class="t">Pièges</b>
<b>1.</b> Le carbone anomérique reste <b>C1</b> dans les deux liaisons : dans α(1→6), c'est le C1 qui est
engagé, jamais le C6. <b>2.</b> Les deux liaisons sont <b>α</b> : c'est ce qui rend l'amidon digestible.
En <b>β(1→4)</b> ce serait la <b>cellulose</b>, et nous n'avons pas de cellulase.
<b>3.</b> Ne pas confondre avec l'α(1→2)β du saccharose.
</div>
"""

C9 = """
<div class="box def"><b class="t">Le principe : un prélèvement à jeun de 12 h</b>
Le <b>bilan lipidique sérique</b> dose les lipides du <b>sérum</b>. Il se fait obligatoirement <b>à jeun
depuis 12 heures</b> : après un repas, les <b>triglycérides</b> (chylomicrons) envahissent le sérum et
faussent complètement les valeurs. Un bilan non à jeun n'a aucune valeur interprétable.
</div>

<h3>Le tableau à connaître par cœur</h3>
<p>La diapositive sépare les valeurs en deux blocs : <b>« Standard »</b> (les grands paramètres) et
<b>« Détaillé »</b> (les fractions fines). Voici les deux, ensemble.</p>

<div class="tw"><table>
<tr><th>Paramètre</th><th>Valeur normale</th><th>Bloc de la diapo</th></tr>
<tr><td><b>Lipides totaux sériques</b></td><td><b>5 à 8 g/L</b></td><td>Standard</td></tr>
<tr><td><b>Triglycérides</b></td><td><b>0,5 à 1,5 g/L</b></td><td>Standard</td></tr>
<tr><td><b>Cholestérol total</b> — adulte</td><td><b>1,7 à 2,5 g/L</b></td><td>Standard</td></tr>
<tr><td><b>Cholestérol total</b> — enfant</td><td><b>1,5 à 2 g/L</b></td><td>Standard</td></tr>
<tr><td><b>Cholestérol HDL</b></td><td><b>0,4 à 0,8 g/L</b></td><td>Détaillé</td></tr>
<tr><td><b>Cholestérol LDL</b></td><td><b>1,1 à 1,9 g/L</b></td><td>Détaillé</td></tr>
<tr><td><b>Cholestérol estérifié</b> / cholestérol total</td><td><b>0,6 à 0,7</b> (soit 60 à 70 %)</td><td>Détaillé</td></tr>
<tr><td><b>Phospholipides sériques</b></td><td><b>1,5 à 2,5 g/L</b></td><td>Détaillé</td></tr>
<tr><td><b>Acides gras libres</b> (AGL)</td><td><b>0,07 à 0,2 g/L</b></td><td>Détaillé</td></tr>
<tr><td><b>Apoprotéines A1</b></td><td><b>0,9 à 1,8 g/L</b></td><td>Détaillé</td></tr>
<tr><td><b>Apoprotéines B</b></td><td><b>0,9 à 1,6 g/L</b></td><td>Détaillé</td></tr>
</table></div>

<div class="box tip"><b class="t">Les 4 valeurs que tout le monde oublie</b>
<b>1.</b> <b>Acides gras libres : 0,07 à 0,2 g/L</b> — c'est la valeur la plus <b>faible</b> du bilan, et celle
qu'on oublie le plus.
<b>2.</b> <b>Phospholipides : 1,5 à 2,5 g/L</b> — chevauche le cholestérol total.
<b>3.</b> <b>Apoprotéines A1 et B</b> — A1 va avec les <b>HDL</b>, B avec les <b>LDL</b>.
<b>4.</b> <b>Cholestérol estérifié = 0,6 à 0,7</b> : ce n'est pas une concentration en g/L, c'est un
<b>rapport</b> au cholestérol total. C'est le piège d'unité le plus fréquent.
</div>

<h3>Le lipidogramme : 24 / 56 / 20 %</h3>
<p>Le <b>lipidogramme</b> sépare les lipoprotéines par <b>électrophorèse</b>. Chaque fraction migre à une
position, d'où son nom grec :</p>

<div class="tw"><table>
<tr><th>Fraction</th><th>Nom à l'électrophorèse</th><th>Proportion</th><th>Ce qu'elle transporte</th></tr>
<tr><td><b>HDL</b></td><td><b>α</b> (alpha)</td><td><b>24 %</b></td><td>Le cholestérol « de retour » vers le foie</td></tr>
<tr><td><b>LDL</b></td><td><b>β</b> (bêta)</td><td><b>56 %</b></td><td>Le cholestérol distribué aux tissus</td></tr>
<tr><td><b>VLDL</b></td><td><b>pré-β</b> (pré-bêta)</td><td><b>20 %</b></td><td>Les triglycérides endogènes</td></tr>
</table></div>

<div class="box ex"><b class="t">Vérification en 2 secondes</b>
<b>24 + 56 + 20 = 100 %</b>. Si un QCM propose des pourcentages dont la somme ne fait pas 100, c'est faux
sans même réfléchir. Et l'ordre à retenir : <b>LDL &gt; HDL &gt; VLDL</b> (56 &gt; 24 &gt; 20).
</div>

<div class="box tip"><b class="t">Pourquoi α, β, pré-β ?</b>
En électrophorèse, les protéines migrent du pôle <b>−</b> vers le <b>+</b>. Les <b>α-globulines</b> migrent
le plus loin (les HDL), les <b>β-globulines</b> restent plus près du dépôt (les LDL), et les <b>VLDL</b>
migrent juste <b>avant</b> les β : d'où « <b>pré-β</b> ». Retiens l'association, elle tombe souvent.
</div>

<h3>Cohérence interne du bilan (question de raisonnement)</h3>
<p>On peut vérifier les valeurs les unes contre les autres :</p>
<ul>
<li><b>Cholestérol total ≈ HDL + LDL + la part du VLDL.</b> Avec 0,4-0,8 (HDL) + 1,1-1,9 (LDL), on est déjà
à 1,5-2,7 g/L, du même ordre que le total 1,7-2,5 g/L : les valeurs sont cohérentes.</li>
<li><b>Lipides totaux = cholestérol + triglycérides + phospholipides + acides gras libres.</b> C'est pour
cela que les lipides totaux (5-8 g/L) sont bien plus élevés que chaque fraction prise seule.</li>
<li><b>Les acides gras libres</b> ne représentent qu'une fraction infime (0,07-0,2 g/L) : l'essentiel des
lipides circule <b>estérifié</b> dans les lipoprotéines, pas sous forme libre.</li>
</ul>

<div class="box warn"><b class="t">Les 3 pièges de ce chapitre</b>
<b>1.</b> <b>L'unité</b> : tout est en <b>g/L</b> (et non en mg/dL, ni en mmol/L). Sauf le rapport du
cholestérol estérifié, qui est <b>sans unité</b>.<br>
<b>2.</b> <b>L'âge</b> : le cholestérol total est <b>plus bas chez l'enfant</b> (1,5-2) que chez l'adulte
(1,7-2,5). Inverser les deux est l'erreur classique.<br>
<b>3.</b> <b>Le jeûne</b> : 12 heures, et on dose le <b>sérum</b>. Un bilan sans jeûne n'est pas
interprétable à cause des triglycérides.
</div>

<h3>Ce que le cours ne dit pas (lecture clinique)</h3>
<div class="box def"><b class="t">À signaler comme complément, pas comme cours</b>
La diapositive donne uniquement les <b>valeurs normales</b> ; elle ne commente pas l'interprétation. En
clinique, on retient que :
<ul>
<li>un <b>LDL élevé</b> et un <b>HDL bas</b> sont associés au <b>risque athérogène</b> (athérosclérose,
maladie coronarienne) ;</li>
<li>une <b>hypertriglycéridémie</b> oriente vers l'alimentation, l'alcool ou le diabète ;</li>
<li>les <b>apoprotéines</b> servent de marqueurs plus fins que le simple cholestérol (A1 pour les HDL,
B pour les LDL).</li>
</ul>
Si la question porte sur les valeurs, réponds avec <b>le tableau du cours</b>. N'ajoute l'interprétation
que si elle est demandée.
</div>

<h3>Question type, corrigée</h3>
<div class="box bad"><b class="t">« Donner les valeurs normales du bilan lipidique sérique et le principe du lipidogramme. »</b>
Le bilan lipidique sérique se réalise sur un prélèvement <b>à jeun de 12 heures</b>, pour éviter
l'interférence des triglycérides d'origine alimentaire. Les valeurs usuelles sont : <b>lipides totaux
5 à 8 g/L</b> ; <b>triglycérides 0,5 à 1,5 g/L</b> ; <b>cholestérol total 1,7 à 2,5 g/L chez l'adulte</b>
et <b>1,5 à 2 g/L chez l'enfant</b> ; <b>cholestérol HDL 0,4 à 0,8 g/L</b> ; <b>cholestérol LDL 1,1 à
1,9 g/L</b> ; <b>cholestérol estérifié 0,6 à 0,7</b> du cholestérol total ; <b>phospholipides 1,5 à
2,5 g/L</b> ; <b>acides gras libres 0,07 à 0,2 g/L</b> ; <b>apoprotéines A1 0,9 à 1,8 g/L</b> et
<b>apoprotéines B 0,9 à 1,6 g/L</b>. Le <b>lipidogramme</b> sépare les lipoprotéines par électrophorèse :
<b>HDL (α) = 24 %</b>, <b>LDL (β) = 56 %</b> et <b>VLDL (pré-β) = 20 %</b>, la somme faisant bien 100 %.
</div>
"""

C10 = """
<div class="box tip"><b class="t">Partie annoncée à l'oral par le Pr. Naamane</b>
Ce chapitre n'est pas une déduction faite à partir des annales : le professeur a <b>annoncé en cours</b>,
de vive voix, que cette partie tomberait à l'examen. C'est donc la <b>priorité n° 1</b> du chapitre
lipides, avec le bilan lipidique. Les annales ne servent ici qu'à <b>confirmer</b> et à montrer
<b>sous quelle forme</b> la question est posée — jamais à décider <i>si</i> elle tombe.
</div>

<div class="box def"><b class="t">La définition : on change d'alcool</b>
Un <b>sphingolipide</b> est un <b>ester</b> dont l'alcool <b>n'est pas le glycérol</b> mais un
<b>amino-alcool</b>. L'amino-alcool le plus fréquent — et le seul du cours — est la
<b>sphingosine</b>. C'est toute la différence avec les glycérophospholipides : même architecture
(un alcool + un acide gras + une tête polaire), mais l'ossature n'est plus le glycérol.
</div>

<h3>La sphingosine : trois positions à connaître par cœur <span class="chip" style="cursor:default">annoncé</span></h3>
<p>Retiens la molécule comme une colonne vertébrale à trois étages. Chaque étage porte une fonction
précise, et c'est cette fonction qui décide de tout ce qui va être greffé :</p>

<div class="tw"><table>
<tr><th>Position</th><th>Formule du cours</th><th>Fonction</th><th>Ce qui s'y fixe</th></tr>
<tr><td><b>C1</b></td><td><b>CH<sub>2</sub>OH</b></td><td>Alcool <b>primaire</b></td><td>La <b>tête polaire</b> : phosphocholine, ose, oligoside</td></tr>
<tr><td><b>C2</b></td><td><b>CH–NH<sub>2</sub></b></td><td><b>Amine</b></td><td><b>L'acide gras</b> (liaison amide) → le céramide</td></tr>
<tr><td><b>C3</b></td><td><b>CH–OH</b></td><td>Alcool <b>secondaire</b></td><td>Reste <b>libre</b></td></tr>
<tr><td><b>R′</b></td><td>Chaîne hydrocarbonée</td><td>—</td><td>La <b>queue apolaire</b></td></tr>
</table></div>

<div class="box tip"><b class="t">Le moyen mnémotechnique</b>
<b>C1 = la tête</b> (toujours en haut, c'est le OH primaire qui reçoit le sucre ou le phosphate) ·
<b>C2 = le crochet</b> (l'amine qui accroche l'acide gras) · <b>C3 = le OH libre</b>.
Sur tous les schémas du cours, la formule est écrite <b>exactement dans cet ordre vertical</b> :
CH<sub>2</sub> en bas ou en haut selon le dessin, mais toujours le trio OH / NH / OH.
</div>

<h3>Le céramide : le socle commun</h3>
<p>La sphingosine <b>+ 1 acide gras</b> sur son amine, avec élimination d'eau, donne le
<b>céramide</b> (du latin <i>cera</i>, la cire). C'est la brique de base de <b>toute</b> la famille :
chaque famille de sphingolipides = céramide + quelque chose sur le C1.</p>

<div class="tw"><table>
<tr><th></th><th>Formule du cours</th></tr>
<tr><td><b>Sphingosine</b></td><td>R′–CH–OH / CH–NH<sub>2</sub> / CH<sub>2</sub>OH</td></tr>
<tr><td><b>+ R<sub>1</sub>–COOH</b></td><td>acide gras + H<sub>2</sub>O (l'amine devient amide)</td></tr>
<tr><td><b>= Céramide</b></td><td>R′–CH–OH / CH–NH–<b>C(=O)</b>–R<sub>1</sub> / CH<sub>2</sub>OH</td></tr>
</table></div>

<div class="box warn"><b class="t">Piège n° 1 : un seul acide gras</b>
Le céramide ne porte <b>qu'un seul</b> acide gras, sur l'<b>amine</b>. On te proposera souvent
« contiennent deux acides gras » : c'est <b>faux</b> pour les sphingolipides (deux AG, c'est un
glycérophospholipide ou un triglycéride). Et il n'y a <b>pas de glycérol</b> du tout.
</div>

<h3>Les quatre familles, à partir du céramide</h3>
<div class="tw"><table>
<tr><th>Famille</th><th>Greffé sur le C1</th><th>Où</th><th>Enzyme qui coupe</th><th>Maladie si déficit</th></tr>
<tr><td><b>Sphingomyélines</b></td><td><b>Phosphocholine</b> (P + choline)</td><td>Cortex cérébral, gaine</td><td><b>Sphingomyélinase</b></td><td><b>Niemann-Pick</b> : grosse rate + troubles neurologiques</td></tr>
<tr><td><b>Cérébrosides</b></td><td><b>Un ose</b> : galactose (cerveau) ou glucose (rein)</td><td>Cerveau, rein</td><td><b>β-glucosidase</b></td><td><b>Gaucher</b></td></tr>
<tr><td><b>Gangliosides</b></td><td><b>Ose + dérivés d'oses</b></td><td>Cerveau</td><td><b>Hexosaminidase</b> (détache le <b>N-acétyl-galactose</b>)</td><td><b>Tay-Sachs</b></td></tr>
<tr><td><b>Glycolipides neutres</b></td><td><b>Glucose</b> [+ un ose]</td><td>Surface des cellules</td><td>—</td><td>— (ce sont les <b>groupes sanguins</b>)</td></tr>
</table></div>

<div class="box ex"><b class="t">Comment lire ce tableau en 10 secondes</b>
<b>1.</b> Une seule famille contient du <b>phosphate</b> : les <b>sphingomyélines</b> (c'est pour cela que
la famille s'appelle <i>sphingo<u>phospho</u>lipides</i> — mais le nom de la famille ne veut pas dire que
tous en contiennent). <b>2.</b> Dès qu'il y a un <b>ose</b>, on est dans les
<b>sphingoglycolipides</b> : cérébroside (1 ose), ganglioside (plusieurs oses + dérivés), glycolipide
neutre (glucose ± un ose). <b>3.</b> Chaque maladie = <b>l'enzyme qui coupe</b> ne fonctionne plus :
le lipide s'accumule.
</div>

<h3>a) Les sphingomyélines</h3>
<p>« La sphingosine est liée à un acide gras par sa fonction <b>amine</b> et à une
<b>phosphocholine</b> par sa fonction <b>alcool primaire</b>. » Ce sont des <b>constituants des membranes
cellulaires</b>, surtout dans le <b>cortex cérébral</b> et la <b>gaine</b> des nerfs.</p>
<div class="box warn"><b class="t">Niemann-Pick</b>
Déficit en <b>sphingomyélinase</b> → la sphingomyéline s'accumule.
Signes à retenir : <b>grosse rate</b> (splénomégalie) + <b>troubles neurologiques</b>.
</div>

<h3>b) Les cérébrosides</h3>
<p>Céramide <b>+ un ose</b> lié à l'alcool primaire. Le cours donne <b>deux localisations</b> :</p>
<ul>
<li><b>Galactose</b> → le <b>cerveau</b> (cérébroside au sens strict) ;</li>
<li><b>Glucose</b> → le <b>rein</b>, et <b>pas</b> les autres tissus.</li>
</ul>
<div class="box warn"><b class="t">Gaucher</b>
Déficit en <b>β-glucosidase</b> : le glucocérébroside n'est plus dégradé.
</div>

<h3>c) Les gangliosides</h3>
<p>Céramide + un ose <b>plus des dérivés d'oses</b> (dont le <b>N-acétyl-galactose</b>). Ils siègent au
niveau du <b>cerveau</b> et sont les <b>récepteurs</b> de la <b>sérotonine</b>, de certains <b>virus</b>
et de certaines <b>toxines</b>.</p>
<div class="box warn"><b class="t">Tay-Sachs</b>
Déficit en <b>hexosaminidase</b> — l'enzyme qui <b>détache le N-acétyl-galactose</b>.
</div>

<h3>d) Les glycolipides neutres</h3>
<p>Céramide + <b>glucose</b>, éventuellement <b>+ un ose</b>. Ce sont les <b>déterminants des groupes
sanguins</b> à la surface des globules rouges.</p>

<div class="box tip"><b class="t">Les 3 maladies en une phrase</b>
<b>Niemann-Pick</b> = sphingomyélinase → rate + neuro · <b>Gaucher</b> = β-glucosidase →
glucocérébroside · <b>Tay-Sachs</b> = hexosaminidase → N-acétyl-galactose.
Les trois se lisent toujours de la même façon : <b>« déficit en [enzyme] = maladie de [nom] »</b>.
</div>

<h3>Les pièges de ce chapitre</h3>
<div class="box warn"><b class="t">Ce qui tombe le plus</b>
<b>1.</b> <b>« Tous les sphingolipides contiennent un phosphate »</b> → <b>faux</b>. Seules les
sphingomyélines en contiennent ; les cérébrosides, gangliosides et glycolipides neutres n'en ont pas.
<br><b>2.</b> <b>« Tous les sphingolipides contiennent deux acides gras »</b> → <b>faux</b> : un seul, lié
à l'amine du C2. <br>
<b>3.</b> <b>« Ils contiennent du glycérol »</b> → <b>faux</b> : c'est la <b>sphingosine</b> qui joue le
rôle du glycérol. <br>
<b>4.</b> <b>« Ce sont des composés hydrophobes »</b> → <b>faux</b> : ils sont <b>amphiphiles</b>
(amphotères) : une tête polaire (C1) et une double queue apolaire (la chaîne de la sphingosine + celle
de l'acide gras). C'est ce qui les rend capables de former la <b>bicouche</b> des membranes. <br>
<b>5.</b> Ne pas confondre <b>céramide</b> (sphingosine + 1 AG) et <b>sphingomyéline</b>
(céramide + phosphocholine) : la question « un céramide contient-il du phosphate ? » est fausse, mais
« une sphingomyéline en contient-elle ? » est vraie.
</div>

<h3>La question tombée à l'examen (2024-2025)</h3>
<div class="box bad"><b class="t">Q40 — « Parmi les propositions suivantes, relatives aux sphingolipides, indiquer celle qui est exacte : »</b>
A. contiennent tous un phosphate · B. sont amphiphiles · C. peuvent être des précurseurs de la
vitamine D · D. contiennent deux acides gras · E. contiennent du glycérol
</div>

<div class="box ex"><b class="t">Réponse : B — sont amphiphiles</b>
Pourquoi chaque proposition est fausse :
<ul>
<li><b>A</b> : seules les <b>sphingomyélines</b> ont un phosphate ; un cérébroside ou un ganglioside n'en
a pas.</li>
<li><b>C</b> : le précurseur de la <b>vitamine D3</b> est le <b>cholestérol</b> (un stéride), pas un
sphingolipide. Le piège consiste à faire glisser la propriété d'une autre famille de lipides.</li>
<li><b>D</b> : <b>un seul</b> acide gras, sur l'amine du C2.</li>
<li><b>E</b> : l'ossature est la <b>sphingosine</b>, jamais le glycérol.</li>
</ul>
Reste <b>B</b> : tête polaire + queues apolaires = <b>amphiphile</b>, donc capable de bâtir la bicouche
membranaire. C'est la phrase du cours : « constituants des membranes cellulaires ».
</div>

<h3>Q39 — la question « phospholipides » qui précède</h3>
<div class="box bad"><b class="t">Q39 — « Parmi les propositions suivantes, relatives aux phospholipides, indiquer celle qui est exacte : »</b>
A. contiennent uniquement carbone, hydrogène et oxygène · B. ne doivent pas contenir des alcools
autres que le glycérol · C. sont des composés hydrophobes · D. ont un rôle énergétique chez les êtres
vivants · E. n'interviennent pas dans la constitution des membranes cellulaires
</div>

<div class="box warn"><b class="t">Avertissement de lecture — à lire avant de retenir une lettre</b>
Cette question est <b>reproduite du PDF</b>, mais l'extraction du texte a mangé les lettres <b>A</b>,
<b>C</b>, <b>D</b> et une partie du <b>E</b> (« Bninterviennent pas ») : je les ai <b>remises dans l'ordre</b>,
et l'ordre des cinq propositions, lui, est certain. En revanche <b>je ne te donne pas de clé</b> : le PDF
ne contient pas le corrigé, et — c'est le point intéressant — <b>lu avec le cours, aucune des cinq
propositions n'est exacte</b>. Voici le contrôle, à toi de voir comment ton professeur tranche.
</div>

<div class="tw"><table>
<tr><th>Proposition</th><th>Verdict d'après le cours</th><th>Pourquoi</th></tr>
<tr><td><b>A.</b> uniquement C, H, O</td><td><b>Faux</b></td><td>Le cours : « ils sont formés de C, H, O, <i>mais peuvent contenir d'autres éléments</i> : <b>phosphore</b> (phospholipides), <b>soufre et azote</b> (lécithines, sphingomyélines), <b>oses</b> (cérébrosides), <b>alcools</b> (sphingosines). »</td></tr>
<tr><td><b>B.</b> pas d'alcool autre que le glycérol</td><td><b>Faux… avec une réserve</b></td><td>Le cours classe les phospholipides en <b>glycérophospholipides ET sphingophospholipides</b>, et ces derniers portent la <b>sphingosine</b>, un amino-alcool. Donc faux. <b>Mais</b> si le professeur restreint ici « phospholipides » à la section 4° (lécithine / céphaline / phosphatidyl-sérine, toutes à glycérol), B devient la seule proposition vraie : c'est probablement la clé attendue, et c'est justement l'ambiguïté qui fait le piège.</td></tr>
<tr><td><b>C.</b> hydrophobes</td><td><b>Faux</b></td><td>La diapositive dit « <b>COMPOSÉS AMPHOTÈRES</b> » : amphiphiles, une tête polaire et deux queues apolaires — c'est ce qui bâtit la bicouche.</td></tr>
<tr><td><b>D.</b> rôle énergétique</td><td><b>Faux</b></td><td>Rôle <b>structural</b> : « constituants des membranes cellulaires ». Le rôle énergétique est celui des <b>triglycérides</b>.</td></tr>
<tr><td><b>E.</b> pas dans les membranes</td><td><b>Faux</b></td><td>C'est exactement l'inverse : ils <b>sont</b> la membrane.</td></tr>
</table></div>

<div class="box tip"><b class="t">Ce qu'il faut retenir, quelle que soit la lettre</b>
Le raisonnement de la question, c'est la <b>phrase du cours</b> : un lipide n'est pas forcément C-H-O
seul, et un phospholipide n'est pas forcément à glycérol. Si on te demande « les phospholipides
peuvent-ils contenir un autre alcool ? » la réponse est <b>oui : la sphingosine</b>. C'est le pont exact
entre Q39 et Q40, et c'est pour ça que les deux questions se suivent.
</div>

<h3>La question de la session 2025 (fichier « N2026 »)</h3>
<div class="box bad"><b class="t">Les quatre propositions, telles qu'elles sont dans l'épreuve</b>
<b>A.</b> glycérophospholipides · <b>B.</b> sphingophospholipides · <b>C.</b> cérébrosides ·
<b>D.</b> glycolipides
</div>

<div class="box warn"><b class="t">Ce que je peux affirmer, et ce que je ne peux pas</b>
<b>Ce qui est vérifié</b> : ces quatre mots figurent bien dans le fichier <i>EXAM session 2025 — Biochimie
N2026.pdf</i> (l'index du Drive y trouve <b>glycérophospholipides</b>, <b>cérébrosides</b>,
<b>glycolipides</b>, <b>céramide</b> et <b>sphingomyéline</b>). La question <b>existe donc</b>, et ce n'est pas
celle de 2024-2025 : c'est une <b>deuxième question</b>, posée en QCM à réponses multiples.
<b>Ce qui ne l'est pas</b> : l'énoncé exact. Le PDF est un <b>scan sans couche texte</b> — impossible de
lire la phrase « lesquels de ces lipides… » sans OCR. Je ne vais donc pas inventer l'énoncé. En revanche,
<b>quelle que soit la formulation, la réponse est dans la matrice ci-dessous</b>.
</div>

<h3>La matrice : une ligne par énoncé possible</h3>
<div class="tw"><table>
<tr><th>Si l'énoncé demande…</th><th>Réponse</th><th>Pourquoi</th></tr>
<tr><td><b>« lesquels sont des sphingolipides ? »</b></td><td><b>B, C, D</b></td><td>Tous les trois ont la <b>sphingosine</b>. A est le seul à avoir le <b>glycérol</b> → exclu.</td></tr>
<tr><td><b>« lesquels contiennent de la sphingosine ? »</b></td><td><b>B, C, D</b></td><td>Même raisonnement : c'est la définition de l'ossature.</td></tr>
<tr><td><b>« lesquels sont des phospholipides ? »</b></td><td><b>A, B</b></td><td>Le cours sépare les phospholipides en <b>glycérophospholipides</b> et <b>sphingophospholipides</b>. C et D n'ont pas de phosphate.</td></tr>
<tr><td><b>« lesquels contiennent du phosphate ? »</b></td><td><b>A, B</b></td><td>Même frontière : le phosphate est dans les deux familles phosphorylées.</td></tr>
<tr><td><b>« lesquels sont des lipides complexes (composés) ? »</b></td><td><b>A, B, C, D</b></td><td>Le cours range dans les lipides complexes : les <b>phospholipides</b> (A et B) et les <b>glycolipides</b> (D, dont les cérébrosides C sont un cas particulier).</td></tr>
<tr><td><b>« lesquels contiennent un ose ? »</b></td><td><b>C, D</b></td><td>Le sucre est la marque des glycolipides : <b>galactose</b> (cerveau) ou <b>glucose</b> (rein) pour les cérébrosides.</td></tr>
<tr><td><b>« lesquels contiennent du glycérol ? »</b></td><td><b>A seulement</b></td><td>B, C et D partagent la <b>sphingosine</b> à la place du glycérol.</td></tr>
<tr><td><b>« lequel n'est pas un sphingolipide ? »</b> (réponse unique)</td><td><b>A</b></td><td>L'exception est toujours celle qui porte le glycérol.</td></tr>
</table></div>

<div class="box tip"><b class="t">Le seul réflexe à garder : la question du glycérol</b>
Devant ces quatre mots, tu n'as qu'<b>une</b> chose à vérifier : <b>glycérol ou sphingosine ?</b>
<b>A</b> = glycérol. <b>B, C, D</b> = sphingosine. Toutes les lignes du tableau se déduisent de cette seule
ligne de partage, et c'est exactement le même raisonnement que la Q40 de 2024-2025
(« contiennent du glycérol » → faux) et que la Q39 (« pas d'alcool autre que le glycérol » → faux).
<b>Trois questions, un seul piège.</b>
</div>

<div class="box ex"><b class="t">À retenir sur la récurrence</b>
La même notion est tombée <b>deux années de suite</b> : en 2024-2025 sous forme de deux questions à
réponse unique (Q39 et Q40), et dans la session 2025 sous forme d'une question à réponses multiples sur
ces quatre familles. Autrement dit : <b>le chapitre est un incontournable</b>, et la ligne à mémoriser
n'est pas la liste des maladies mais le couple <b>glycérol / sphingosine</b>.
</div>

<h3>Ce que disent les annales — pour confirmer l'annonce</h3>
<p class="hint">Rappel de l'ordre des priorités : la partie est retenue parce que le professeur l'a <b>annoncée à l'oral</b>. Ce tableau ne sert qu'à montrer <b>sous quelle forme</b> elle a déjà été posée.</p>
<div class="tw"><table>
<tr><th>Épreuve</th><th>Question sur cette partie ?</th><th>Source</th></tr>
<tr><td><b>2024-2025 · 1<sup>re</sup> session</b></td><td><b>Oui — Q39 et Q40</b> : une question « phospholipides » puis une question « sphingolipides »</td><td>Texte du PDF lu intégralement</td></tr>
<tr><td>Session 2025 (fichier « N2026 », scan)</td><td><b>Oui</b> : une question à réponses multiples sur <b>glycérophospholipides / sphingophospholipides / cérébrosides / glycolipides</b> (l'index y trouve aussi « céramide » et « sphingomyéline »)</td><td>Options confirmées par l'index du Drive ; <b>énoncé illisible</b> (scan sans couche texte)</td></tr>
<tr><td>« Chimie-Biochimie QCM » (scan)</td><td><b>Oui</b> : contient « Tay-Sachs » et « Gaucher »</td><td>Scan : <b>non citable</b></td></tr>
<tr><td>2023 (grille), compilation S1 2024, « EXAMS S1 2024 »</td><td><b>Non</b> : indexés, ils contiennent amidon / saccharose / cholestérol mais <b>aucun</b> terme des sphingolipides</td><td>Recherche plein texte du Drive</td></tr>
<tr><td>2021-2022, 2024, « Exam 2025 », « TD 2025 », compilation S1 2023</td><td><b>Indéterminé</b> : scans non indexés, illisibles sans OCR</td><td>—</td></tr>
</table></div>

<div class="box tip"><b class="t">La forme de la question ne change pas</b>
Dans l'épreuve de 2024-2025, le bloc « lipides » occupe les <b>8 dernières questions</b> (Q33 à Q40) et se termine
toujours de la même façon : <b>une question sur les phospholipides, puis une sur les sphingolipides</b>,
formulée « indiquer celle qui est exacte ». Les <b>quatre leurres sont recyclés</b> d'une année sur l'autre :
« contiennent tous un phosphate » · « contiennent deux acides gras » · « contiennent du glycérol » ·
« précurseurs de la vitamine D ». Si tu sais pourquoi ces quatre-là sont fausses, la question est gagnée
d'avance — c'est exactement ce que fait la section « pièges » ci-dessus.
</div>

<h3>Question type, corrigée</h3>
<div class="box bad"><b class="t">« Définir les sphingolipides, décrire les quatre familles et citer les maladies de surcharge correspondantes. »</b>
Les <b>sphingolipides</b> sont des esters d'acides gras dont l'alcool n'est pas le glycérol mais un
<b>amino-alcool</b>, la <b>sphingosine</b> (C1 : CH<sub>2</sub>OH ; C2 : CH–NH<sub>2</sub> ;
C3 : CH–OH). L'acylation de l'amine par un acide gras donne le <b>céramide</b>, socle commun de la
famille ; tout le reste se greffe sur l'<b>alcool primaire</b> du C1. On distingue :
<b>(1) les sphingomyélines</b>, céramide + <b>phosphocholine</b>, du cortex cérébral et de la gaine —
déficit en <b>sphingomyélinase</b> = <b>Niemann-Pick</b> (grosse rate, troubles neurologiques) ;
<b>(2) les cérébrosides</b>, céramide + un ose (<b>galactose</b> dans le cerveau, <b>glucose</b> dans le
rein) — déficit en <b>β-glucosidase</b> = <b>Gaucher</b> ;
<b>(3) les gangliosides</b>, céramide + oses et dérivés d'oses, récepteurs de la sérotonine, des virus et
des toxines — déficit en <b>hexosaminidase</b> = <b>Tay-Sachs</b> ;
<b>(4) les glycolipides neutres</b>, céramide + glucose [± un ose], <b>déterminants des groupes
sanguins</b>. Tous sont <b>amphiphiles</b> et participent à la membrane, et tous ne contiennent
<b>qu'un seul</b> acide gras.
</div>
"""

C11 = """
<div class="box tip"><b class="t">Pourquoi cette partie est prioritaire</b>
C'est la <b>première partie du programme</b> (chapitre 1 du Pr. Khlil), et c'est la plus rentable :
dans l'épreuve de 2024-2025, <b>7 des 40 questions</b> portaient directement sur les acides aminés
(Q1 à Q7), plus une sur l'électrophorèse (Q26). Tout ce qui est demandé se déduit d'une seule idée :
<b>le squelette est identique, tout se joue sur le groupement R</b>.
</div>

<div class="box def"><b class="t">L'importance biomédicale : les acides aminés ne font pas que des protéines</b>
Le cours insiste sur deux autres rôles :
<ul>
<li><b>Neurotransmetteurs</b> : la <b>glycine</b> et l'<b>acide glutamique</b> sont eux-mêmes des messagers
du système nerveux.</li>
<li><b>Précurseurs de molécules actives</b> : la <b>décarboxylation</b> d'un acide aminé donne l'amine
correspondante — l'<b>histamine</b> (à partir de l'histidine) et le <b>GABA</b> (acide
γ-aminobutyrique, à partir du <b>glutamate</b>).</li>
</ul>
</div>

<h3>La structure : un squelette commun, vingt chaînes latérales <span class="chip" style="cursor:default">annoncé</span></h3>
<p>« Les vingt acides aminés trouvés dans les protéines possèdent tous un groupement <b>carboxyle</b> et un
groupement <b>aminé</b> portés par le <b>même atome de carbone</b> (le carbone <b>α</b>). Ils diffèrent les
uns des autres par leur <b>chaîne latérale ou groupement R</b>, dont la structure, la taille et la charge
électrique varient et influencent la <b>solubilité</b> des acides aminés dans l'eau. » <i>Support, p. 5</i></p>

<div class="box ex"><b class="t">Le raisonnement à avoir</b>
Le squelette —COOH + —NH<sub>2</sub> sur le Cα est <b>identique pour les 20</b> : inutile de l'apprendre
vingt fois. <b>Toute la différence est dans R</b> — et c'est R qui commande la solubilité, la charge au pH
physiologique, les liaisons possibles, le repliement et donc la fonction. <b>Apprends la classification par
R : le reste en découle.</b>
</div>

<h3>La classification par la chaîne latérale (à pH ≈ 7)</h3>
<div class="tw"><table>
<tr><th>Famille de R</th><th>Acides aminés</th><th>Charge à pH 7</th></tr>
<tr><td><b>Aliphatique, apolaire</b></td><td>Glycine, Alanine, Valine, Leucine, Isoleucine, Proline</td><td>neutre</td></tr>
<tr><td><b>Aromatique</b></td><td>Phénylalanine, Tryptophane (apolaires) · <b>Tyrosine</b> (polaire)</td><td>neutre</td></tr>
<tr><td><b>Polaire non chargé</b> — fonction alcool</td><td>Sérine, Thréonine, Tyrosine</td><td>neutre</td></tr>
<tr><td><b>Polaire non chargé</b> — acides soufrés</td><td>Méthionine, Cystéine</td><td>neutre</td></tr>
<tr><td><b>Polaire non chargé</b> — fonction amide</td><td>Asparagine, Glutamine</td><td>neutre</td></tr>
<tr><td><b>Chargé négativement</b> — carboxyle</td><td><b>Aspartate, Glutamate</b></td><td><b>−</b></td></tr>
<tr><td><b>Chargé positivement</b></td><td><b>Lysine</b> (amine) · <b>Arginine</b> (guanidine) · <b>Histidine</b> (imidazole)</td><td><b>+</b></td></tr>
</table></div>

<div class="box warn"><b class="t">Les 4 pièges de la classification</b>
<b>1.</b> La <b>tyrosine</b> est <b>aromatique ET polaire</b> : son —OH la rend polaire, donc le cours la cite
<b>deux fois</b> volontairement. <br>
<b>2.</b> <b>Cystéine et méthionine</b> sont <b>polaires non chargées</b> : le soufre ne donne pas de charge à
pH 7 (mais la cystéine peut perdre un H⁺ sur son thiol). <br>
<b>3.</b> La <b>proline</b> est rangée avec les apolaires, mais sa particularité est son <b>cycle</b> qui
rigidifie la chaîne : elle <b>interrompt l'hélice α</b>. <br>
<b>4.</b> Chaque basique a sa fonction : <b>Lys = amine · Arg = guanidine · His = imidazole</b>. C'est
l'imidazole de l'histidine qui capte les H⁺ dans l'<b>effet Bohr</b>.
</div>

<h3>Les essentiels : 8 + 2</h3>
<p>« Parmi ces 20 acides aminés, on distingue <b>8 essentiels</b> ou indispensables : ils doivent être apportés
par l'alimentation, l'organisme ne peut pas les synthétiser. Plus <b>2 semi-indispensables</b>, l'<b>arginine</b>
et l'<b>histidine</b>, synthétisés dans les tissus mais à un taux insuffisant pour soutenir la croissance chez
l'enfant. » <i>Support, p. 6</i></p>

<div class="tw"><table>
<tr><th>Les 8 essentiels</th><th>Les 2 semi-indispensables</th></tr>
<tr><td><b>Lysine · Tryptophane · Méthionine · Phénylalanine · Thréonine · Valine · Leucine · Isoleucine</b><br>
<span class="hint">Mnémotechnique : « PVT TIM HALL » — Phe, Val, Thr, Trp, Ile, Met, (His), (Arg), Leu, Lys</span></td>
<td><b>Arginine · Histidine</b><br>
<span class="hint">Synthétisés dans les tissus, mais en quantité insuffisante pour la croissance de l'enfant.</span></td></tr>
</table></div>

<div class="box tip"><b class="t">Le lien nutritionnel</b>
Les <b>protéines animales</b> contiennent ces 10 acides aminés, indispensables à la croissance et au maintien
de l'<b>équilibre azoté</b>. Les <b>protéines végétales sont incomplètes</b> de ce point de vue.
</div>

<h3>Les dérivés : des acides aminés modifiés après incorporation</h3>
<div class="tw"><table>
<tr><th>Dérivé</th><th>Dérive de</th><th>Où / pourquoi c'est important</th></tr>
<tr><td><b>4-hydroxyproline</b></td><td>Proline</td><td>Protéines fibreuses du <b>tissu conjonctif</b> et du <b>collagène</b></td></tr>
<tr><td><b>5-hydroxylysine</b></td><td>Lysine</td><td>Idem — leur non-hydroxylation entraîne le <b>scorbut</b></td></tr>
<tr><td><b>γ-carboxyglutamate</b></td><td>Glutamate</td><td><b>Prothrombine</b> (coagulation) et protéines qui <b>fixent le Ca²⁺</b></td></tr>
<tr><td><b>Orthophosphosérine</b></td><td>Sérine</td><td>Certaines <b>hormones</b>, dont la fonction dépend d'une phosphorylation / déphosphorylation</td></tr>
</table></div>

<div class="box warn"><b class="t">Scorbut = défaut d'hydroxylation de la proline et de la lysine</b>
Sans ces résidus hydroxylés, le <b>collagène</b> ne se stabilise pas → fragilité des tissus conjonctifs,
saignements gingivaux. C'est l'exemple parfait de l'objectif « anticiper les conséquences d'un changement
structural ». <b>L'hydroxylation dépend de la vitamine C</b> (acide ascorbique) — deux questions d'examen
reposent là-dessus.
</div>

<div class="box def"><b class="t">Et les acides aminés libres ?</b>
Il existe environ <b>300 acides aminés supplémentaires</b> dans les cellules, aux fonctions très diverses, qui
<b>ne sont pas</b> constituants des protéines. Exemple du cours : l'<b>ornithine</b> et la <b>citrulline</b>,
intermédiaires du <b>cycle de l'urée</b> et de la biosynthèse de l'arginine.
</div>

<h3>Propriétés physiques : les quatre à connaître</h3>
<div class="tw"><table>
<tr><th>Propriété</th><th>Ce qu'il faut retenir</th></tr>
<tr><td><b>Activité optique</b></td><td>Le Cα est <b>asymétrique</b> (4 substituants différents) pour <b>tous sauf la glycine</b> (son R = H). D'où les isomères <b>D et L</b> ; ceux des protéines sont de la série <b>L</b>.</td></tr>
<tr><td><b>Absorption UV</b></td><td>Propriété des acides aminés <b>aromatiques</b> (Phe, Tyr, Trp) : permet de <b>doser les protéines</b> par spectrophotométrie, sans réactif.</td></tr>
<tr><td><b>Solubilité</b></td><td>Dictée par R : un R apolaire fuit l'eau, un R polaire ou chargé s'y dissout → les R apolaires se regroupent <b>à l'intérieur</b> de la protéine repliée.</td></tr>
<tr><td><b>Ionisation</b></td><td>Acide (—COOH) + base (—NH<sub>2</sub>) : l'acide aminé est <b>amphotère</b>. Son état de charge dépend du pH → base de l'<b>électrophorèse</b>.</td></tr>
</table></div>

<h3>Acido-basicité : deux pK, un pHi, une migration</h3>
<p>« Tout acide aminé présente au moins <b>deux constantes de dissociation</b> : celle du carboxyle (K1) et
celle de l'ammonium (K2), donc <b>deux pK</b>. Entre les deux valeurs de pK se trouve le <b>point
isoélectrique (pHi)</b>, pH auquel les deux dissociations sont équivalentes : les charges s'annulent et la
molécule <b>ne peut pas se déplacer</b> dans un champ électrique. À un pH <b>inférieur</b> au pHi l'acide aminé
est <b>chargé positivement</b>, à un pH <b>supérieur</b> il est <b>négatif</b> — d'où la séparation par
<b>électrophorèse</b>. » <i>Support, p. 9</i></p>

<div class="tw"><table>
<tr><th>Milieu</th><th>Forme dominante</th><th>Charge</th></tr>
<tr><td><b>pH acide</b> (pH &lt; pHi)</td><td>Forme <b>cationique</b> — COOH et NH<sub>3</sub><sup>+</sup></td><td><b>+</b></td></tr>
<tr><td><b>pH = pHi</b></td><td><b>Zwitterion</b> (ion dipolaire) — COO<sup>−</sup> et NH<sub>3</sub><sup>+</sup></td><td><b>0</b></td></tr>
<tr><td><b>pH basique</b> (pH &gt; pHi)</td><td>Forme <b>anionique</b> — COO<sup>−</sup> et NH<sub>2</sub></td><td><b>−</b></td></tr>
</table></div>

<div class="box ex"><b class="t">Henderson-Hasselbalch et le point médian</b>
<b>pH = pK + log ([A⁻] / [HA])</b>. Au point médian de la courbe de titration, [A⁻] = [HA], donc
<b>pH = pK</b>. Exemple du cours : pour la <b>glycine</b>, à <b>pH 2,35</b>, les concentrations de la forme
cationique <sup>+</sup>H<sub>3</sub>N–CH<sub>2</sub>–COOH et de l'ion dipolaire
<sup>+</sup>H<sub>3</sub>N–CH<sub>2</sub>–COO<sup>−</sup> sont <b>égales</b>.
</div>

<h3>Les 9 acides aminés à chaîne latérale ionisable</h3>
<div class="tw"><table>
<tr><th>Acide aminé</th><th>Fonction du R</th><th>Comportement</th></tr>
<tr><td>Tyrosine, Sérine, Thréonine</td><td>hydroxyle (—OH)</td><td>peuvent <b>libérer un H⁺</b></td></tr>
<tr><td><b>Cystéine</b></td><td>thiol (—SH)</td><td>peut <b>libérer un H⁺</b></td></tr>
<tr><td><b>Aspartate, Glutamate</b></td><td>carboxyle supplémentaire</td><td><b>acide</b></td></tr>
<tr><td><b>Lysine</b></td><td>amine aliphatique</td><td><b>basique</b></td></tr>
<tr><td><b>Histidine</b></td><td>imidazole</td><td>peut libérer un proton</td></tr>
<tr><td><b>Arginine</b></td><td>guanidine</td><td>peut libérer un proton</td></tr>
</table></div>

<div class="box tip"><b class="t">Pourquoi ça compte en clinique</b>
Parce que <b>la charge décide de la séparation</b> : l'<b>électrophorèse des hémoglobines</b> ne fonctionne que
parce que les protéines sont chargées, et leur charge dépend des acides aminés ionisables au pH du tampon.
<b>Un seul acide aminé remplacé peut déplacer une bande</b> — c'est exactement la drépanocytose.
</div>

<h3>Les questions tombées à l'examen (2024-2025)</h3>
<div class="box bad"><b class="t">Q1 — « Indiquer, parmi les acides aminés suivants, celui qui ne présente pas de carbone asymétrique : »</b>
A. la glutamine · B. la tyrosine · <b>C. la glycine</b> · D. l'alanine · E. la cystéine
<div class="hint" style="margin-top:8px"><b>Réponse : C</b> — la glycine, dont le R est un simple <b>H</b> :
elle a deux substituants identiques, donc <b>pas de carbone asymétrique</b> et pas d'activité optique.</div>
</div>

<div class="box bad"><b class="t">Q2 — « Indiquer l'acide aminé qui interrompt l'hélice α : »</b>
A. la valine · <b>B. la proline</b> · C. la lysine · D. l'aspartate · E. la sérine
<div class="hint" style="margin-top:8px"><b>Réponse : B</b> — la proline, dont le <b>cycle</b> bloque la rotation
autour de la liaison peptidique : elle « casse » l'hélice.</div>
</div>

<div class="box bad"><b class="t">Q3 — « Indiquer l'acide aminé pouvant contracter des ponts disulfures : »</b>
A. la méthionine · B. la leucine · C. la proline · <b>D. la cystéine</b> · E. l'asparagine
<div class="hint" style="margin-top:8px"><b>Réponse : D</b> — seule la <b>cystéine</b> a un <b>thiol (—SH)</b> ;
deux cystéines forment un pont <b>—S—S—</b>. La méthionine a du soufre, mais sous forme de <b>thioéther</b> :
elle ne fait pas de pont.</div>
</div>

<div class="box bad"><b class="t">Q4 — « Le dosage spectrophotométrique des protéines est possible grâce à des acides aminés qui absorbent dans l'ultraviolet. Ces acides aminés présentent une chaîne latérale : »</b>
A. aliphatique · B. soufrée · C. acide · <b>D. aromatique</b> · E. amide
<div class="hint" style="margin-top:8px"><b>Réponse : D</b> — les <b>noyaux aromatiques</b> de Phe, Tyr et Trp
absorbent à 280 nm.</div>
</div>

<div class="box bad"><b class="t">Q5 — « Parmi les composés suivants, lequel est issu de la décarboxylation du glutamate ? »</b>
A. l'histamine · B. la tyramine · C. la cystéamine · D. la sérotonine · <b>E. le GABA</b>
<div class="hint" style="margin-top:8px"><b>Réponse : E</b> — le <b>GABA</b>. L'histamine vient de
l'<b>histidine</b>, la tyramine de la <b>tyrosine</b>, la sérotonine du <b>tryptophane</b>.
<b>Un acide aminé → son amine, par décarboxylation.</b></div>
</div>

<div class="box bad"><b class="t">Q6 et Q7 — le scorbut</b>
<b>Q6.</b> « La non-hydroxylation post-traductionnelle de deux acides aminés du collagène donne le scorbut.
Ces acides aminés sont : » → <b>la proline et la lysine</b>.<br>
<b>Q7.</b> « Cette hydroxylation est conséquente à l'action de : » → <b>l'acide ascorbique (vitamine C)</b>.
<div class="hint" style="margin-top:8px">Les leurres proposés étaient les autres vitamines (B1, B2, B3, B5,
B12) : le réflexe est <b>vitamine C = collagène = scorbut</b>.</div>
</div>

<div class="box bad"><b class="t">Q26 — l'électrophorèse à pH 6</b>
« À pH = 6, on soumet à une électrophorèse un mélange de <b>glutamate</b>, <b>leucine</b> et <b>lysine</b> dont
les points isoélectriques sont respectivement <b>3,2</b>, <b>6,0</b> et <b>9,7</b>. Après migration, indiquer
les deux réponses exactes ? »
<ol style="margin:8px 0 0">
<li>Le glutamate est chargé positivement à pH = 6</li>
<li>La leucine est chargée positivement à pH = 6</li>
<li>La lysine n'est pas chargée à pH = 6</li>
<li>Le glutamate migre vers la cathode</li>
<li><b>La leucine ne migre pas</b></li>
</ol>
</div>

<div class="box ex"><b class="t">Le raisonnement, ligne par ligne</b>
À pH 6, on compare chaque pHi à 6 : <b>pH &lt; pHi → chargé +</b> ; <b>pH &gt; pHi → chargé −</b> ;
<b>pH = pHi → neutre</b>.
<ul>
<li><b>Glutamate</b> (pHi 3,2) : 6 &gt; 3,2 → <b>négatif</b> → il migre vers l'<b>anode</b>. Donc la
proposition 1 est fausse et la 4 aussi.</li>
<li><b>Leucine</b> (pHi 6,0) : 6 = 6 → <b>neutre</b> → elle <b>ne migre pas</b>. Proposition 5 <b>vraie</b>,
proposition 2 fausse.</li>
<li><b>Lysine</b> (pHi 9,7) : 6 &lt; 9,7 → <b>positif</b> → elle migre vers la <b>cathode</b>. Proposition 3
fausse.</li>
</ul>
<b>Conclusion : seule la proposition 5 est exacte.</b> Le sujet annonce « deux réponses exactes » alors qu'une
seule l'est — c'est une <b>erreur d'énoncé</b>, à signaler au professeur. Ne t'entête pas à trouver une seconde
clé : le raisonnement ci-dessus est celui du cours, et c'est lui qui se défend.
</div>

<div class="box tip"><b class="t">Le tableau de décision à emporter</b>
Devant n'importe quel QCM d'électrophorèse : <b>1.</b> note les pHi ; <b>2.</b> compare au pH du tampon ;
<b>3.</b> pH &lt; pHi → <b>+</b> → cathode (−) · pH &gt; pHi → <b>−</b> → anode (+) · pH = pHi →
<b>immobile</b>. Trois lignes, et la question est finie.
</div>

<h3>Question type, corrigée</h3>
<div class="box bad"><b class="t">« Décrire la structure générale d'un acide aminé, sa classification et expliquer l'origine de son caractère amphotère. »</b>
Un acide aminé est un composé qui porte, sur le <b>même carbone α</b>, un groupement <b>carboxyle</b>
(—COOH) et un groupement <b>aminé</b> (—NH<sub>2</sub>). Les vingt acides aminés des protéines ne diffèrent
que par leur <b>chaîne latérale R</b>, dont la nature commande la solubilité, la charge et les liaisons
possibles. On les classe donc <b>par R</b> : aliphatiques apolaires (Gly, Ala, Val, Leu, Ile, Pro) ;
aromatiques (Phe, Trp apolaires, <b>Tyr polaire</b>) ; polaires non chargés à fonction alcool (Ser, Thr, Tyr),
soufrés (Met, Cys) ou amide (Asn, Gln) ; chargés négativement par un carboxyle supplémentaire (Asp, Glu) ;
chargés positivement (Lys par son amine, Arg par sa guanidine, His par son imidazole). Huit sont
<b>essentiels</b> et deux <b>semi-essentiels</b> (Arg, His). Le caractère <b>amphotère</b> vient de la présence
simultanée d'un <b>acide faible</b> et d'une <b>base faible</b> : selon le pH, l'acide aminé est
<b>cationique</b> (pH &lt; pHi), <b>neutre sous forme de zwitterion</b> (pH = pHi) ou <b>anionique</b>
(pH &gt; pHi). Le <b>pHi</b> est le pH où la charge nette est nulle : c'est lui qui gouverne le comportement à
l'<b>électrophorèse</b> et sur les échangeurs d'ions.
</div>
"""

C12 = """
<div class="box def"><b class="t">La source de ce chapitre</b>
Ces pages viennent d'une <b>fiche manuscrite de la promo</b>, « Biochimie Structurale I » (6 pages) :
acides aminés, dérivés, liaison peptidique, peptides, structure des protéines, puis l'hémoglobine.
Elle suit mot pour mot le chapitre 1 du Pr. Khlil — c'est donc un <b>très bon support de révision</b>,
mais elle reste une <b>prise de notes</b> : en cas de divergence, c'est le support du professeur qui fait foi.
</div>

<h3>La liaison peptidique : une liaison qui impose tout</h3>
<p>Elle se forme <b>entre les 20 acides aminés</b>, entre le carboxyle d'un acide aminé et l'amine du
suivant, avec <b>perte d'eau</b>. La fiche la décrit par quatre mots qu'il faut savoir réciter :</p>

<div class="tw"><table>
<tr><th>Caractère</th><th>Ce que ça veut dire</th></tr>
<tr><td><b>Rigide</b></td><td>Pas de rotation libre autour de la liaison <b>C–N</b></td></tr>
<tr><td><b>Planaire</b></td><td>Les six atomes du groupe peptidique sont dans <b>un même plan</b></td></tr>
<tr><td><b>Polaire</b></td><td>Le O et le N portent des charges partielles</td></tr>
<tr><td><b>Hybride de résonance</b></td><td>Sa longueur est <b>intermédiaire</b> entre la liaison simple C–N et la double liaison C=N</td></tr>
</table></div>

<div class="box ex"><b class="t">Le nuage électronique</b>
La fiche insiste : il se forme un <b>nuage électronique entre les atomes N, C et O</b>. Conséquence :
<b>absence de rotation</b>, mais <b>présence de résonance</b>. C'est de là que vient la <b>forme trans</b>,
plus stable que la forme cis. Et la synthèse est <b>enzymatique</b> : elle commence par l'extrémité
<b>N-terminale</b> et se termine par l'extrémité <b>C-terminale</b>.
</div>

<h3>Les réactions chimiques des acides aminés</h3>
<div class="tw"><table>
<tr><th>Réaction</th><th>Ce qui se passe</th></tr>
<tr><td><b>Décarboxylation</b></td><td>Acide aminé → <b>amine</b> — <b>sauf le glutamate et l'aspartate</b></td></tr>
<tr><td><b>Désamination</b></td><td>Acide aminé → <b>acide cétonique</b></td></tr>
<tr><td><b>Formation d'une fonction amine</b></td><td>Ex. : <b>glutamate → glutamine</b></td></tr>
<tr><td><b>Formation d'un pont disulfure</b></td><td><b>Deux cystéines</b> forment un pont —S—S—</td></tr>
<tr><td><b>N-glycosylation</b></td><td>Sur les acides aminés à fonction <b>amide</b> (glutamine, asparagine) : fixation d'<b>oses</b> sur l'azote de la fonction amide</td></tr>
<tr><td><b>Réaction à la ninhydrine</b></td><td>La ninhydrine est un composé <b>aromatique</b> utilisé comme <b>révélateur</b> des acides aminés</td></tr>
</table></div>

<div class="box warn"><b class="t">Le piège de la décarboxylation</b>
« Tous les acides aminés qui subissent une décarboxylation deviennent des <b>amines</b>, <b>sauf le glutamate
et l'aspartate</b>, car ils contiennent un <b>groupe carboxyle dans leur chaîne latérale</b>. » Et l'exemple
donné est justement <b>GABA</b>, issu du <b>glutamate</b> — c'est exactement la question Q5 de l'examen.
</div>

<h3>Les peptides : trois exemples à connaître</h3>
<div class="tw"><table>
<tr><th>Peptide</th><th>Nature</th><th>Propriété</th></tr>
<tr><td><b>Glutathion</b></td><td><b>Tripeptide</b></td><td>Propriétés <b>anti-oxydantes</b> : empêche l'oxydation de l'hémoglobine</td></tr>
<tr><td><b>Pénicilline</b></td><td><b>Tripeptide</b></td><td>Antibiotique protégeant l'organisme des attaques bactériennes</td></tr>
<tr><td><b>Insuline et glucagon</b></td><td><b>Polypeptides</b></td><td>Hormones</td></tr>
</table></div>

<h3>Les quatre niveaux de structure des protéines</h3>
<div class="tw"><table>
<tr><th>Niveau</th><th>Définition</th><th>Stabilisé par</th></tr>
<tr><td><b>1. Primaire</b></td><td>Séquence : la <b>liaison peptidique covalente</b> + les <b>ponts disulfures</b> (cystéines) + l'orientation</td><td>Liaisons covalentes</td></tr>
<tr><td><b>2. Secondaire</b></td><td>Régulière et répétitive : <b>hélices α</b> et <b>feuillets plissés β</b> (parfois des <b>boucles</b>, des <b>coudes</b>)</td><td><b>Liaisons hydrogène</b> entre N et O</td></tr>
<tr><td><b>3. Tertiaire</b></td><td>Repliement tridimensionnel : les résidus <b>hydrophiles</b> sortent, les <b>hydrophobes</b> rentrent</td><td>Ioniques, hydrogène, hydrophobes, van der Waals, <b>ponts S–S</b></td></tr>
<tr><td><b>4. Quaternaire</b></td><td>Plusieurs <b>sous-unités</b> identiques ou différentes — ex. <b>hémoglobine</b>, <b>immunoglobulines</b> (anticorps)</td><td>Les mêmes liaisons non covalentes</td></tr>
</table></div>

<div class="box tip"><b class="t">Les trois remarques à retenir de la fiche</b>
<b>1.</b> Toutes les structures <b>secondaires</b> sont stabilisées par des <b>liaisons hydrogène</b>, parce que
<b>N et O sont électronégatifs</b> et les permettent. <br>
<b>2.</b> Les hélices α sont <b>droites</b> et les structures des feuillets plissés sont <b>antiparallèles</b>
dans notre organisme, <b>grâce à leur stabilité</b>. <br>
<b>3.</b> La <b>proline</b> est <b>absente</b> des hélices α et des feuillets β : elle forme des
<b>coudes non réguliers</b>. C'est la formulation de la fiche — et c'est la clé de la Q2.
</div>

<div class="box warn"><b class="t">Dénaturation</b>
La dénaturation est la <b>perte de la conformation tridimensionnelle</b>, qui conduit à la <b>perte de
l'activité biologique</b>. La <b>structure primaire reste intacte</b> : seules les liaisons non covalentes
(et éventuellement les ponts S–S) sont rompues.
</div>

<h3>L'hémoglobine : la question Q8 à Q13 de l'examen</h3>
<p>L'<b>hémoglobine</b> est une <b>hémoprotéine (Fe²⁺)</b> qui transporte l'<b>O₂</b> dans l'organisme et
ramène le <b>CO₂</b> des tissus aux poumons. Elle fixe l'O₂ grâce à l'<b>hème</b>, présent dans la partie
<b>protéique</b> (= la <b>globine</b>).</p>

<div class="tw"><table>
<tr><th>Hémoglobine</th><th>Chaînes</th><th>Remarque</th></tr>
<tr><td><b>Majeure</b> — Hb A₁</td><td>α et β</td><td>L'adulte</td></tr>
<tr><td><b>Mineure</b> — Hb A₂</td><td>α et δ</td><td>Fraction faible</td></tr>
<tr><td><b>Fœtale</b> — HbF</td><td>α et γ</td><td>Plus grande affinité pour l'O₂</td></tr>
</table></div>

<div class="box ex"><b class="t">Myoglobine contre hémoglobine : les 4 différences de la fiche</b>
<b>1.</b> La <b>myoglobine</b> est une <b>protéine simple, tertiaire</b>, des tissus musculaires ; l'hémoglobine
est une <b>protéine conjuguée, quaternaire</b>. <br>
<b>2.</b> <b>L'hémoglobine fixe 4 molécules d'O₂</b> ; la <b>myoglobine n'en fixe qu'une seule</b>, à cause du
<b>nombre d'hèmes</b>. <br>
<b>3.</b> La saturation de la myoglobine se fait à une <b>P O₂ plus faible</b> que celle de l'hémoglobine :
la myoglobine a donc une <b>affinité plus élevée</b>. <br>
<b>4.</b> L'hémoglobine a une <b>allostérie</b> et une <b>coopérativité</b> entre ses sous-unités ; la
myoglobine <b>n'en a pas</b> puisqu'elle n'a <b>qu'un seul hème</b>.
</div>

<div class="box def"><b class="t">La coopérativité, chiffrée</b>
La fixation de O₂ se fait de façon <b>coopérative</b> : chaque sous-unité qui fixe O₂ change de conformation et
facilite la suivante. Les paliers donnés par la fiche : <b>25 % → 61 % → 74 % → 100 %</b>, d'où une
<b>courbe de saturation sigmoïde</b>. La myoglobine, sans coopérativité, donne une courbe
<b>hyperbolique</b>.
</div>

<h3>Les propriétés chimiques de l'hémoglobine</h3>
<div class="tw"><table>
<tr><th>Phénomène</th><th>Ce qu'il faut retenir</th></tr>
<tr><td><b>Effet Bohr</b></td><td><b>Diminution de l'affinité</b> de l'Hb en présence de <b>H⁺</b> : l'Hb relâche l'O₂ pour évacuer l'acidité du sang</td></tr>
<tr><td><b>Monoxyde de carbone (CO)</b></td><td>Affinité <b>200 fois plus importante</b> que celle pour l'O₂</td></tr>
<tr><td><b>Oxydation (méthémoglobine)</b></td><td>L'O₂ se fixe anormalement sur le <b>fer de l'hème</b>, qui passe à l'état <b>Fe³⁺</b></td></tr>
<tr><td><b>2,3-DPG</b></td><td>Diminue l'affinité de l'Hb ; l'<b>HbF</b> a une affinité <b>supérieure</b> car ses chaînes γ ont <b>moins d'affinité pour le 2,3-DPG</b></td></tr>
<tr><td><b>Anémie falciforme</b></td><td>La <b>valine</b> remplace l'<b>acide glutamique</b> : changement structural, <b>hémoglobine S</b> (HbS)</td></tr>
</table></div>

<div class="box tip"><b class="t">Les deux états de l'hémoglobine</b>
À l'état <b>relâché (R)</b> on trouve l'<b>oxyhémoglobine</b> ; à l'état <b>tendu (T)</b> on trouve la
<b>désoxyhémoglobine</b>. Cinq facteurs influencent l'affinité : <b>P O₂ · 2,3-DPG · pH · CO₂ · oxydants</b>.
Et le détail qui tombe : à l'état R, le <b>fer est dans le plan de l'hème</b> ; à l'état T, il est
<b>déplacé hors du plan</b>.
</div>

<h3>Les questions tombées à l'examen (2024-2025) — Q8 à Q13</h3>
<div class="box bad"><b class="t">Q8 — « Concernant la fixation de l'oxygène sur l'hémoglobine, indiquer les propositions exactes : »</b>
A. Se fait sur la chaîne latérale d'un résidu d'<b>histidine proximale</b> · B. Se fait avec une plus grande
affinité sur l'état <b>relâché (R)</b> que sur l'état tendu (T) · C. Induit le <b>déplacement de l'atome de fer</b>
par rapport au plan de l'hème · D. Est <b>facilitée</b> par la présence de 2,3-diphosphoglycérate ·
E. Est très fortement diminuée par la présence de monoxyde de carbone
<div class="hint" style="margin-top:8px">
<b>B et C sont exactes.</b> L'oxygène se fixe sur le <b>fer de l'hème</b>, pas sur l'histidine (A faux :
l'histidine est <i>proximale</i>, elle n'est pas le site de liaison). L'état <b>R</b> a une meilleure affinité
(B vrai). La fixation <b>déplace le fer dans le plan</b> de l'hème (C vrai). Le <b>2,3-DPG diminue</b>
l'affinité, il ne la facilite pas (D faux — c'est le piège classique). Le CO ne « diminue » pas la fixation :
il <b>prend la place</b> de l'O₂ avec 200 fois plus d'affinité (E faux dans sa formulation).
</div>

<div class="box bad"><b class="t">Q10 — « Parmi les propositions relatives à l'hémoglobine, indiquer celle qui est exacte : »</b>
A. présente une structure quaternaire · B. est formée par quatre chaînes identiques · C. ne peut fixer qu'une
seule molécule d'oxygène · D. contient un seul atome de fer · E. le fer est sous forme ferrique (Fe³⁺)
<div class="hint" style="margin-top:8px"><b>Réponse : A.</b> Quatre chaînes <b>différentes</b> (2 α + 2 β) → B
faux. Elle fixe <b>4 O₂</b> → C faux. Elle contient <b>4 atomes de fer</b> → D faux. Le fer est
<b>ferreux Fe²⁺</b> ; Fe³⁺ c'est la méthémoglobine → E faux.</div>
</div>

<div class="box bad"><b class="t">Q11 — « Le facteur qui augmente l'affinité de l'hémoglobine à l'oxygène : »</b>
A. l'augmentation de la pression partielle en CO₂ · B. l'augmentation de la pression partielle en CO ·
C. l'augmentation de la pression partielle en O₂ · D. l'augmentation de la concentration de H⁺ ·
E. l'augmentation de la concentration en DPG
<div class="hint" style="margin-top:8px"><b>Réponse : C.</b> Plus de O₂ = plus de saturation. CO₂, H⁺ et DPG
<b>diminuent</b> l'affinité (c'est l'effet Bohr et l'effet du DPG) ; le CO ne l'augmente pas, il
<b>occupe</b> le site.</div>
</div>

<div class="box bad"><b class="t">Q12 — « La fixation de l'O₂ induit des modifications. Indiquer la proposition exacte : »</b>
A. l'atome de fer se déplace par rapport au plan de l'hème · B. la liaison entre le fer et l'histidine
proximale est rompue · C. l'histidine distale fixe un proton · D. la molécule adopte une conformation
tendue (T) · E. le site du 2,3-DPG est fortement activé
<div class="hint" style="margin-top:8px"><b>Réponse : A.</b> La fixation de O₂ <b>ramène le fer dans le plan</b>
de l'hème. La liaison fer–histidine proximale n'est <b>pas rompue</b> (B faux). L'état devient
<b>relâché R</b> (D faux). Le site du DPG est <b>désactivé</b> à l'état R (E faux).</div>
</div>

<div class="box bad"><b class="t">Q13 — « Indiquer la proposition exacte concernant la drépanocytose : »</b>
A. est à l'origine d'une mutation ponctuelle de la chaîne α · B. est caractérisée par l'absence de
sous-unités β · C. est caractérisée par la présence d'anomalie structurale de l'hème · D. les hématies
falciformes contiennent des polymères de désoxyhémoglobine S · E. les patients homozygotes sont résistants
à la malaria
<div class="hint" style="margin-top:8px"><b>D et E sont exactes.</b> La mutation porte sur la chaîne <b>β</b>
(valine au lieu du glutamate), pas α → A faux. Les sous-unités β <b>existent mais sont anormales</b> → B faux.
L'anomalie est dans la <b>globine</b>, pas dans l'hème → C faux. Les hématies falciformes contiennent bien des
<b>polymères de désoxy-HbS</b> → D vrai. Les homozygotes sont <b>résistants à la malaria</b> → E vrai
(avantage sélectif de la mutation).</div>
</div>

<h3>Question type, corrigée</h3>
<div class="box bad"><b class="t">« Décrire les quatre niveaux de structure d'une protéine et expliquer pourquoi l'hémoglobine fixe quatre molécules d'oxygène alors que la myoglobine n'en fixe qu'une. »</b>
Une protéine s'organise en quatre niveaux : <b>primaire</b> (la séquence d'acides aminés, tenue par les
liaisons peptidiques covalentes et les ponts disulfures), <b>secondaire</b> (hélices α et feuillets β,
stabilisés par des <b>liaisons hydrogène</b> entre N et O), <b>tertiaire</b> (le repliement tridimensionnel,
où les résidus hydrophiles sortent et les hydrophobes rentrent, tenu par des liaisons ioniques, hydrogène,
hydrophobes, van der Waals et des ponts S–S) et <b>quaternaire</b> (l'assemblage de plusieurs sous-unités,
comme l'hémoglobine ou les immunoglobulines). L'<b>hémoglobine</b> est un tétramère (2 α + 2 β) : elle possède
donc <b>quatre hèmes</b>, et chaque hème fixe une molécule d'O₂ → <b>quatre O₂</b>. La <b>myoglobine</b> est
monomérique, avec <b>un seul hème</b> → <b>un seul O₂</b>. De plus, la fixation est <b>coopérative</b> dans
l'hémoglobine (courbe <b>sigmoïde</b>, paliers 25 → 61 → 74 → 100 %) alors qu'elle est <b>hyperbolique</b>
dans la myoglobine, qui n'a pas de coopérativité.
</div>
"""

RES = """
<h3>Les documents du Drive de la promo</h3>
<div class="vids real">
<a href="https://drive.google.com/file/d/1JdwcZcwqyjpGLmiwotEtGqvQlXGlThsW/view" target="_blank" rel="noopener">Support de cours — Khlil 2024-25</a>
<a href="https://drive.google.com/file/d/1CkcWfHI_Bf8CIhDHc3Gx0C-4dqolHxBq/view" target="_blank" rel="noopener">Biochimie structurale — CHAP I</a>
<a href="https://drive.google.com/file/d/1gBSLf4lzUoEoDzFyOsVnx1f-u7voZ00n/view" target="_blank" rel="noopener">Biochimie structurale — CHAP II</a>
<a href="https://drive.google.com/file/d/1IUgZ8OTKpXcVCee6X3Dips7Gn9lllPT2/view" target="_blank" rel="noopener">CHAP 3 — Glucides (Naamane)</a>
<a href="https://drive.google.com/file/d/1aahDRtX4s__SUy2Gr-XcsF1puQpUJ_Ll/view" target="_blank" rel="noopener">CHAP 4 — Lipides (Naamane)</a>
</div>

<h3>Annales et QCM</h3>
<div class="vids real">
<a href="https://drive.google.com/file/d/1T_JyEy1aWbCpddiRh-TqaG7qhaGhe9Jd/view" target="_blank" rel="noopener">Examen blanc Pr. Khlil 2018</a>
<a href="https://drive.google.com/file/d/17BOnbIBzF332jxn71XkECgB90iG4bW68/view" target="_blank" rel="noopener">Annale 2021-2022</a>
<a href="https://drive.google.com/file/d/17Ve1Z5LUiGMB7t_UT9bHoYPbSl6feB49/view" target="_blank" rel="noopener">Corrigé 2023</a>
<a href="https://drive.google.com/file/d/1KDOLDjCG1VwXEGlMciWap0HRhP9BDJnw/view" target="_blank" rel="noopener">Épreuve 2024-2025 (40 QCM)</a>
<a href="https://drive.google.com/file/d/1BiccimeNgxSkb3GxU9rsFyD6uuC07KZj/view" target="_blank" rel="noopener">QCM Chimie-Biochimie</a>
</div>

<h3>Sur ce site</h3>
<div class="vids real">
<a href="cours/biochimie-structurale-plan.html">Plan du module (12 séances)</a>
<a href="cours/biochimie-structurale.html">Cours expliqué — Pr. Khlil</a>
<a href="cours/plan-biochimie-structurale.pdf" target="_blank" rel="noopener">Plan en PDF — 2 pages</a>
<a href="documents.html">Documents du module (24 fichiers)</a>
<a href="portail.html">Portail complet du S1</a>
</div>

<div class="box tip"><b class="t">Comment utiliser cette page la veille</b>
Relis le <a href="#g0">guide</a>, les <b>11 parties annoncées</b>, puis fais l'examen blanc et les flashcards.
Les chapitres sont faits pour être lus dans l'ordre, mais la veille, priorité aux chapitres
<a href="#c6">6</a> et <a href="#c7">7</a>.
</div>
"""

# --------------------------------------------------------------------------
# QCM
# --------------------------------------------------------------------------
QUIZ = {
 "c1": [
  {"q": "Comment appelle-t-on deux oses qui ne diffèrent que par la configuration d'un seul carbone ?",
   "o": ["Des anomères", "Des épimères", "Des énantiomères", "Des isomères de fonction"], "a": 1,
   "e": "Les épimères ne diffèrent que par un seul carbone asymétrique (ex. glucose/mannose en C2)."},
  {"q": "Le D-galactose est l'épimère du D-glucose au niveau du :",
   "o": ["C2", "C3", "C4", "C6"], "a": 2,
   "e": "C4 : c'est cette inversion qui sera utilisée dans le lactose."},
  {"q": "Le D-mannose est l'épimère du D-glucose au niveau du :",
   "o": ["C2", "C3", "C4", "C5"], "a": 0, "e": "C2. Le C3 correspond à l'allose."},
  {"q": "Que signifie la notation D dans D-glucose ?",
   "o": ["Que la molécule est dextrogyre", "Que le OH du carbone chiral le plus éloigné du carbonyle est à droite en Fischer",
        "Que le glucose tourne à droite dans l'intestin", "Que la molécule est de configuration β"], "a": 1,
   "e": "D/L est une convention de représentation, indépendante du pouvoir rotatoire (d/l)."},
  {"q": "Un aldose se distingue d'une cétose par :",
   "o": ["Le nombre de carbones", "La présence d'un aldéhyde en C1 (aldose) ou d'une cétone (cétose)",
        "La série D ou L", "La forme cyclique"], "a": 1,
   "e": "Aldose = aldéhyde (C1) ; cétose = cétone (le plus souvent C2), comme le fructose."},
  {"q": "Dans la filiation de Keller et Kiliani, chaque allongement de la chaîne :",
   "o": ["Ajoute un ose", "Double le nombre d'oses", "Ne change rien", "Supprime un carbone asymétrique"], "a": 1,
   "e": "Chaque nouveau carbone asymétrique double le nombre d'oses : 1 triose → 2 tétroses → 4 pentoses → 8 hexoses."},
 ],
 "c2": [
  {"q": "Lors de la cyclisation du glucose, le carbone anomérique est :",
   "o": ["C1", "C2", "C5", "C6"], "a": 0,
   "e": "Le C1 portait le carbonyle ; il devient anomérique en formant l'hémiacétal."},
  {"q": "Le cycle du glucose contient :",
   "o": ["5 atomes", "6 atomes", "7 atomes", "4 atomes"], "a": 1,
   "e": "5 carbones + 1 oxygène = 6 atomes : c'est un pyranose."},
  {"q": "Quelles sont les proportions à l'équilibre du glucose en solution ?",
   "o": ["50 / 50 α/β", "36 % α / 63 % β / 0,1 % ouvert", "63 % α / 36 % β", "99 % ouvert"], "a": 1,
   "e": "β est majoritaire (plus stable) ; la forme ouverte, très minoritaire, suffit à la réductibilité."},
  {"q": "Pourquoi le glucose est-il un sucre réducteur ?",
   "o": ["Parce qu'il est toujours en forme ouverte", "Parce que la forme ouverte (0,1 %) possède un carbonyle libre",
        "Parce qu'il possède six OH", "Parce qu'il est de série D"], "a": 1,
   "e": "Un OH hémiacétalique libre permet l'ouverture, donc un carbonyle libre capable de réduire Fehling."},
 ],
 "c3": [
  {"q": "Le fructose se cyclise en :",
   "o": ["Pyranose", "Furanose", "Les deux à parts égales", "Il ne se cyclise pas"], "a": 1,
   "e": "Cycle à 5 atomes (4 C + 1 O) : furanose."},
  {"q": "Le carbone anomérique du fructose est :",
   "o": ["C1", "C2", "C5", "C6"], "a": 1, "e": "C'est une cétose : son carbonyle est en C2."},
  {"q": "Chez le fructose, le C1 est :",
   "o": ["Le carbone anomérique", "Un simple CH2OH", "Un carboxyle", "Un carbone quaternaire"], "a": 1,
   "e": "Le C1 reste un CH2OH accroché au C2 ; il n'est pas engagé dans le cycle."},
  {"q": "Quel groupement sert de repère pour définir α/β chez le fructose ?",
   "o": ["Le CH2OH du C1", "Le CH2OH du C5", "Le CH2OH du C6", "Le OH du C3"], "a": 2,
   "e": "Chez le fructose, le repère est le CH2OH du C6 (chez le glucose, c'est celui du C5)."},
 ],
 "c4": [
  {"q": "Pourquoi les oses sont-ils très solubles dans l'eau ?",
   "o": ["Parce qu'ils sont chargés", "Parce que leurs nombreux OH forment des liaisons hydrogène avec l'eau",
        "Parce qu'ils sont lipophiles", "Parce qu'ils sont toujours en forme linéaire"], "a": 1,
   "e": "Les OH établissent des liaisons hydrogène ; ils sont en revanche insolubles dans les solvants apolaires."},
  {"q": "Un ose de série D est-il forcément dextrogyre ?",
   "o": ["Oui, toujours", "Non : D/L décrit la structure, d/l le pouvoir rotatoire mesuré",
        "Oui, sauf le fructose", "Seulement en solution"], "a": 1,
   "e": "C'est le piège classique : D ≠ dextrogyre."},
  {"q": "La mutarotation correspond à :",
   "o": ["La dégradation du glucose", "L'équilibration entre anomères α et β par ouverture et refermeture du cycle",
        "La rotation du plan de la lumière", "Le passage de la série D à la série L"], "a": 1,
   "e": "C'est l'évolution du pouvoir rotatoire vers la valeur d'équilibre de la solution."},
  {"q": "La saveur sucrée d'un ose dépend :",
   "o": ["De son pouvoir rotatoire", "De sa structure", "De sa série D ou L", "De son nombre de carbones uniquement"], "a": 1,
   "e": "Le cours insiste : sucré et pouvoir rotatoire sont deux choses indépendantes."},
 ],
 "c5": [
  {"q": "L'oxydation du glucose sur son C1 donne :",
   "o": ["L'acide glucuronique", "L'acide gluconique", "Le sorbitol", "Le glucose-6-phosphate"], "a": 1,
   "e": "C1 (aldéhyde) → acide gluconique. L'acide glucuronique vient de l'oxydation du C6."},
  {"q": "La réduction du glucose sur son carbonyle donne :",
   "o": ["Le sorbitol", "Le fructose", "L'acide gluconique", "La glucosamine"], "a": 0,
   "e": "Le carbonyle devient un alcool : c'est un polyol, le sorbitol."},
  {"q": "Le glucose-6-phosphate est phosphorylé :",
   "o": ["Sur le C1 anomérique", "Sur l'oxygène du C6", "Sur le C2", "Sur le C5"], "a": 1,
   "e": "Liaison ester phosphorique sur l'O du C6 — d'où le nom glucose-6-phosphate."},
  {"q": "Pourquoi le G6P reste-t-il dans la cellule ?",
   "o": ["Parce qu'il est liposoluble", "Parce qu'il est chargé et ne traverse pas la membrane",
        "Parce qu'il est très petit", "Parce qu'il est transporté activement"], "a": 1,
   "e": "La charge empêche le passage : le glucose est piégé dans la cellule."},
  {"q": "Quelle réaction donne la glucosamine ?",
   "o": ["Une oxydation du C6", "Une estérification du C1", "Une substitution d'un alcool secondaire par une amine",
        "Une réduction du carbonyle"], "a": 2,
   "e": "Sur les alcools secondaires : R–NH2 donne le glucosamine, partie constitutive des GAG."},
  {"q": "Les esters organiques du glucose formés avec un acide à longue chaîne sont :",
   "o": ["Hydrophiles", "Liposolubles", "Chargés", "Insolubles partout"], "a": 1,
   "e": "Un radical R long rend le composé liposoluble — d'où leur rôle dans les membranes."},
 ],
 "c6": [
  {"q": "Un holoside se définit par :",
   "o": ["Une hydrolyse qui libère des oses uniquement", "Une hydrolyse qui libère des oses et un aglycone",
        "Une molécule non hydrolysable", "Une molécule chargée"], "a": 0,
   "e": "Holoside = que des oses ; hétéroside = oses + aglycone."},
  {"q": "L'aglycone est :",
   "o": ["La partie osidique", "La partie non glucidique d'un hétéroside", "Un type de liaison", "Un enzyme"], "a": 1,
   "e": "Tout ce qui n'est pas un ose : protéine, céramide…"},
  {"q": "Les oligosides du cours contiennent :",
   "o": ["n < 10 oses", "n > 10 oses", "exactement 2 oses", "un aglycone obligatoirement"], "a": 0,
   "e": "n < 10 selon le diaporama (un résumé indique 12 ; la convention retenue est 10)."},
  {"q": "Les GAG sont des :",
   "o": ["Hétérosides", "Hétéropolyosides, donc des holosides", "Oligosides", "Oses simples"], "a": 1,
   "e": "« Hétéro » porte sur la variété des oses, pas sur la présence d'un aglycone."},
  {"q": "Quel est l'aglycone d'un protéoglycane ?",
   "o": ["L'acide glucuronique", "La N-acétyl-glucosamine", "L'axe protéique", "Le sulfate"], "a": 2,
   "e": "Les GAG sont greffés sur une protéine porteuse par liaison O-osidique (sérine/thréonine)."},
  {"q": "Un glycolipide est un hétéroside dont l'aglycone est :",
   "o": ["Une protéine", "Un céramide (partie lipidique)", "Un sulfate", "Un acide aminé"], "a": 1,
   "e": "La partie lipidique (céramide) est l'aglycone."},
 ],
 "c7": [
  {"q": "Le nom complet du lactose est :",
   "o": ["α-D-glucopyranosyl (1→4) α-D-glucopyranose", "β-D-galactopyranosyl (1→4) β-D-glucopyranose",
        "β-D-fructofuranosyl (2→1) α-D-glucopyranose", "α-D-galactopyranosyl (1→4) β-D-fructose"], "a": 1,
   "e": "Galactose en premier (C1 engagé, β), liaison (1→4), glucose avec C1 libre."},
  {"q": "Pourquoi le lactose est-il réducteur ?",
   "o": ["Parce que son galactose peut s'ouvrir", "Parce que le C1 du glucose reste libre",
        "Parce qu'il contient du glucose", "Parce qu'il est de série D"], "a": 1,
   "e": "C'est l'extrémité réductrice : le glucose garde un OH hémiacétalique libre."},
  {"q": "L'enzyme qui hydrolyse le lactose est :",
   "o": ["α(1→4)-glucosidase", "β(1→4)-galactosidase", "α(1→2)-glucosidase", "β(2→1)-fructosidase"], "a": 1,
   "e": "Lactase = β(1→4)-galactosidase : ose engagé (galactose) + anomère (β) + liaison (1→4)."},
  {"q": "Pourquoi le saccharose n'est-il pas réducteur ?",
   "o": ["Parce qu'il contient du fructose", "Parce que ses deux carbones anomériques sont engagés",
        "Parce qu'il est de masse élevée", "Parce qu'il est insoluble"], "a": 1,
   "e": "C1 du glucose et C2 du fructose sont tous deux engagés : aucun OH hémiacétalique libre."},
  {"q": "Le saccharose peut aussi s'écrire :",
   "o": ["α-D-glucopyranosyl (1→4) β-D-fructofuranose", "β-D-fructofuranosyl (2→1) α-D-glucopyranose",
        "β-D-glucopyranosyl (1→2) α-D-fructofuranose", "α-D-fructofuranosyl (1→2) β-D-glucopyranose"], "a": 1,
   "e": "En partant du fructose, la liaison devient (2→1) : le sens des numéros suit l'ordre des oses."},
 ],
 "c8": [
  {"q": "L'amylose est formée de liaisons :",
   "o": ["α(1→6) uniquement", "α(1→4) uniquement", "β(1→4)", "α(1→2)β"], "a": 1,
   "e": "Chaîne linéaire : α(1→4) seulement. Les ramifications α(1→6) sont celles de l'amylopectine."},
  {"q": "Le glycogène se distingue de l'amylopectine par :",
   "o": ["Des liaisons β", "Un branchement tous les 8-12 résidus au lieu de 20-30", "L'absence de glucose",
        "La présence de galactose"], "a": 1, "e": "Plus ramifié : mobilisation plus rapide."},
  {"q": "Dans une liaison α(1→6), le carbone anomérique engagé est :",
   "o": ["Le C6", "Le C1", "Le C4", "Les deux"], "a": 1,
   "e": "Le C1 est toujours l'anomérique ; le C6 n'est que le point d'accroche."},
  {"q": "Que trouve-t-on sur le C6 d'un résidu qui porte un branchement ?",
   "o": ["Un CH2OH libre", "Un CH2 (le OH est engagé)", "Un carboxyle", "Une amine"], "a": 1,
   "e": "C'est le réflexe de lecture : CH2 sans OH = C6 engagé = branchement."},
  {"q": "Les liaisons de l'amidon et du glycogène sont α, ce qui explique :",
   "o": ["Qu'ils sont insolubles partout", "Qu'ils sont digestibles par nos enzymes, contrairement à la cellulose β(1→4)",
        "Qu'ils contiennent du galactose", "Qu'ils ne sont pas des polyosides"], "a": 1,
   "e": "Nous n'avons pas de cellulase : la cellulose β(1→4) n'est pas digérée."},
  {"q": "L'acide hyaluronique est un GAG :",
   "o": ["Sulfaté", "Non sulfaté, du liquide synovial et du vitré", "Formé de galactose seul", "Qui n'existe pas chez l'homme"], "a": 1,
   "e": "Sans acide sulfurique : c'est le GAG non sulfaté du cours."},
 ],
 "c9": [
  {"q": "Le bilan lipidique sérique se réalise :",
   "o": ["À jeun depuis 12 heures", "Après un petit-déjeuner", "À jeun depuis 2 heures", "Indifféremment, à toute heure"], "a": 0,
   "e": "12 h de jeûne : sans cela, les triglycérides d'origine alimentaire faussent le dosage."},
  {"q": "Les lipides totaux sériques normaux sont de :",
   "o": ["1,5 à 2,5 g/L", "5 à 8 g/L", "0,5 à 1,5 g/L", "0,07 à 0,2 g/L"], "a": 1,
   "e": "5 à 8 g/L. 1,5-2,5 correspond aux phospholipides, 0,5-1,5 aux triglycérides."},
  {"q": "Le cholestérol total normal chez l'adulte est de :",
   "o": ["1,5 à 2 g/L", "1,7 à 2,5 g/L", "0,4 à 0,8 g/L", "1,1 à 1,9 g/L"], "a": 1,
   "e": "1,7 à 2,5 g/L chez l'adulte ; 1,5 à 2 g/L chez l'enfant."},
  {"q": "Le cholestérol LDL normal est de :",
   "o": ["0,4 à 0,8 g/L", "1,1 à 1,9 g/L", "0,07 à 0,2 g/L", "0,9 à 1,8 g/L"], "a": 1,
   "e": "LDL : 1,1 à 1,9 g/L. 0,4-0,8 = HDL ; 0,9-1,8 = apoprotéines A1."},
  {"q": "La valeur normale des acides gras libres est de :",
   "o": ["0,07 à 0,2 g/L", "0,5 à 1,5 g/L", "1,5 à 2,5 g/L", "0,6 à 0,7 g/L"], "a": 0,
   "e": "0,07 à 0,2 g/L : c'est la valeur la plus faible du bilan."},
  {"q": "Le rapport cholestérol estérifié / cholestérol total est de :",
   "o": ["0,07 à 0,2", "0,4 à 0,8", "0,6 à 0,7", "1,1 à 1,9"], "a": 2,
   "e": "0,6 à 0,7 (60-70 %) : c'est un rapport sans unité, pas une concentration."},
  {"q": "Dans le lipidogramme, les proportions sont :",
   "o": ["HDL 56 % · LDL 24 % · VLDL 20 %", "HDL 24 % · LDL 56 % · VLDL 20 %", "HDL 20 % · LDL 56 % · VLDL 24 %", "HDL 33 % · LDL 33 % · VLDL 33 %"], "a": 1,
   "e": "HDL (α) 24 % · LDL (β) 56 % · VLDL (pré-β) 20 % : la somme fait 100 %."},
  {"q": "Les VLDL correspondent à quelle fraction électrophorétique ?",
   "o": ["α", "β", "Pré-β", "γ"], "a": 2,
   "e": "Les VLDL migrent juste avant les β-dglobulines : d'où « pré-β »."},
  {"q": "Les apoprotéines B sont associées principalement :",
   "o": ["Aux HDL", "Aux LDL", "Aux acides gras libres", "Aux phospholipides"], "a": 1,
   "e": "Apo B avec les LDL, Apo A1 avec les HDL."},
 ],
 "c10": [
  {"q": "Un sphingolipide est un ester dont l'alcool est :",
   "o": ["Le glycérol", "Un amino-alcool, le plus souvent la sphingosine", "Le cholestérol", "Un ose"],
   "a": 1,
   "e": "Alcool ≠ glycérol : c'est la définition même du cours. L'amino-alcool le plus fréquent est la sphingosine."},
  {"q": "Le céramide, c'est :",
   "o": ["Sphingosine + un acide gras sur l'amine", "Sphingosine + phosphocholine", "Glycérol + deux acides gras", "Sphingosine seule"],
   "a": 0,
   "e": "Sphingosine + 1 AG (liaison amide sur le C2) + perte d'eau = céramide. La phosphocholine vient après (sphingomyéline)."},
  {"q": "Sur quelle fonction de la sphingosine se fixe l'acide gras ?",
   "o": ["L'alcool primaire du C1", "L'alcool secondaire du C3", "L'amine du C2", "La chaîne R′"],
   "a": 2,
   "e": "L'AG se fixe sur l'amine (C2) : c'est ce qui forme le céramide. Le C1 reste libre pour la tête polaire."},
  {"q": "Ce qui se greffe sur l'alcool primaire du C1 des sphingomyélines :",
   "o": ["Un ose", "Une phosphocholine", "Un acide gras", "Rien, le C1 reste libre"],
   "a": 1,
   "e": "Sphingomyéline = céramide + phosphocholine sur le OH primaire : c'est la seule famille phosphorylée."},
  {"q": "Le déficit en sphingomyélinase provoque :",
   "o": ["La maladie de Gaucher", "La maladie de Tay-Sachs", "La maladie de Niemann-Pick", "La drépanocytose"],
   "a": 2,
   "e": "Niemann-Pick : grosse rate + troubles neurologiques, par accumulation de sphingomyéline."},
  {"q": "Le déficit en β-glucosidase provoque :",
   "o": ["La maladie de Gaucher", "La maladie de Niemann-Pick", "Le scorbut", "Aucune maladie connue"],
   "a": 0,
   "e": "Gaucher = déficit en β-glucosidase : le glucocérébroside n'est plus dégradé."},
  {"q": "La maladie de Tay-Sachs correspond à un déficit en :",
   "o": ["Sphingomyélinase", "β-glucosidase", "Hexosaminidase", "Invertase"],
   "a": 2,
   "e": "L'hexosaminidase détache le N-acétyl-galactose des gangliosides : son déficit = Tay-Sachs."},
  {"q": "Les cérébrosides contiennent comme ose :",
   "o": ["Du galactose dans le cerveau et du glucose dans le rein", "Du glucose partout", "Du fructose dans le foie", "Aucun ose"],
   "a": 0,
   "e": "Galactose → cerveau ; glucose → rein (et pas les autres tissus)."},
  {"q": "Parmi ces propositions sur les sphingolipides, laquelle est exacte (question d'examen 2024-2025) ?",
   "o": ["Ils contiennent tous un phosphate", "Ils sont amphiphiles", "Ils sont les précurseurs de la vitamine D", "Ils contiennent deux acides gras"],
   "a": 1,
   "e": "Amphiphiles : tête polaire en C1 + queues apolaires. Le phosphate n'est que dans les sphingomyélines, l'AG est unique, et la vitamine D3 vient du cholestérol."},
  {"q": "Session 2025 : parmi ces quatre familles, lesquelles sont des sphingolipides ? A. glycérophospholipides · B. sphingophospholipides · C. cérébrosides · D. glycolipides",
   "o": ["A, B et C seulement", "B, C et D", "A et B seulement", "Les quatre"],
   "a": 1,
   "e": "B, C et D portent la sphingosine. A est le seul à avoir le glycérol : c'est ce qui l'exclut d'un coup."},
  {"q": "Devant « glycérophospholipides / sphingophospholipides / cérébrosides / glycolipides », quelle est la seule ligne de partage à vérifier ?",
   "o": ["La présence de glucose", "Glycérol ou sphingosine", "Le nombre d'acides gras", "La présence de phosphate"],
   "a": 1,
   "e": "Glycérol → glycérophospholipides. Sphingosine → les trois autres. Toutes les autres lignes du tableau se déduisent de celle-là."},
  {"q": "« Les phospholipides ne contiennent pas d'alcool autre que le glycérol » (Q39, 2024-2025) : cette affirmation est",
   "o": ["Exacte", "Fausse : les sphingophospholipides contiennent de la sphingosine", "Fausse : ils contiennent du cholestérol", "Exacte, sauf chez l'enfant"],
   "a": 1,
   "e": "Faux : à côté des glycérophospholipides (lécithine, céphaline, phosphatidyl-sérine), les sphingophospholipides portent la sphingosine, un amino-alcool."},
  {"q": "Les gangliosides sont des récepteurs :",
   "o": ["De la sérotonine, de virus et de toxines", "Des acides biliaires", "De l'insuline uniquement", "Du cholestérol"],
   "a": 0,
   "e": "Récepteurs de la sérotonine, de virus et de toxines, au niveau du cerveau."},
 ],
 "c11": [
  {"q": "Quel acide aminé ne possède pas de carbone asymétrique (Q1, 2024-2025) ?",
   "o": ["La glutamine", "La tyrosine", "La glycine", "L'alanine"],
   "a": 2,
   "e": "La glycine : son R est un simple H, donc deux substituants identiques → pas de carbone asymétrique, pas d'activité optique."},
  {"q": "Quel acide aminé interrompt l'hélice α (Q2) ?",
   "o": ["La valine", "La proline", "La lysine", "La sérine"],
   "a": 1,
   "e": "La proline : son cycle bloque la rotation autour de la liaison peptidique."},
  {"q": "Quel acide aminé peut former des ponts disulfures (Q3) ?",
   "o": ["La méthionine", "La cystéine", "La proline", "L'asparagine"],
   "a": 1,
   "e": "Seule la cystéine a un thiol (—SH). La méthionine a du soufre mais sous forme de thioéther : pas de pont."},
  {"q": "Le dosage UV des protéines repose sur des acides aminés à chaîne latérale (Q4) :",
   "o": ["aliphatique", "soufrée", "acide", "aromatique"],
   "a": 3,
   "e": "Phe, Tyr et Trp : leurs noyaux aromatiques absorbent à 280 nm."},
  {"q": "Quel composé est issu de la décarboxylation du glutamate (Q5) ?",
   "o": ["L'histamine", "La tyramine", "Le GABA", "La sérotonine"],
   "a": 2,
   "e": "GABA. Histamine ← histidine, tyramine ← tyrosine, sérotonine ← tryptophane."},
  {"q": "Quels acides aminés du collagène, non hydroxylés, donnent le scorbut (Q6) ?",
   "o": ["Proline et lysine", "Valine et leucine", "Glycine et alanine", "Sérine et thréonine"],
   "a": 0,
   "e": "La 4-hydroxyproline et la 5-hydroxylysine manquent : le collagène ne se stabilise plus."},
  {"q": "Cette hydroxylation dépend de (Q7) :",
   "o": ["La vitamine B1", "La vitamine B2", "La vitamine C", "La vitamine B12"],
   "a": 2,
   "e": "Acide ascorbique = vitamine C. Réflexe : vitamine C → collagène → scorbut."},
  {"q": "Combien d'acides aminés essentiels, et combien de semi-essentiels ?",
   "o": ["8 essentiels et 2 semi-essentiels (Arg, His)", "10 essentiels et 0 semi-essentiel", "6 essentiels et 4 semi-essentiels", "9 essentiels et 1 semi-essentiel"],
   "a": 0,
   "e": "8 essentiels + Arg et His semi-essentiels, insuffisants pour la croissance de l'enfant."},
  {"q": "À pH 6, une leucine de pHi 6,0 :",
   "o": ["Migre vers la cathode", "Migre vers l'anode", "Ne migre pas", "Précipite"],
   "a": 2,
   "e": "pH = pHi → charge nette nulle → elle reste sur place. C'est la proposition exacte de la Q26."},
  {"q": "À pH 6, le glutamate (pHi 3,2) est :",
   "o": ["Chargé positivement", "Chargé négativement et migre vers l'anode", "Neutre", "Chargé négativement et migre vers la cathode"],
   "a": 1,
   "e": "pH > pHi → forme anionique. Les anions vont vers l'anode (+)."},
  {"q": "La tyrosine est :",
   "o": ["Aromatique et apolaire", "Aromatique et polaire", "Aliphatique", "Chargée négativement"],
   "a": 1,
   "e": "Aromatique ET polaire à cause de son —OH : le cours la cite dans les deux familles exprès."},
  {"q": "L'ornithine et la citrulline sont :",
   "o": ["Des acides aminés des protéines", "Des acides aminés libres, intermédiaires du cycle de l'urée", "Des vitamines", "Des dérivés du cholestérol"],
   "a": 1,
   "e": "Acides aminés libres, non constitutifs des protéines : cycle de l'urée et biosynthèse de l'arginine."},
 ],
 "c12": [
  {"q": "La liaison peptidique est :",
   "o": ["Rigide, planaire et polaire", "Libre en rotation", "Une liaison ester", "Une liaison ionique"],
   "a": 0,
   "e": "Rigide (pas de rotation), planaire, polaire, et hybride de résonance : sa longueur est intermédiaire entre C–N et C=N."},
  {"q": "La synthèse peptidique commence et se termine par :",
   "o": ["N-terminale puis C-terminale", "C-terminale puis N-terminale", "Au hasard", "Par les ponts disulfures"],
   "a": 0,
   "e": "Elle commence par l'extrémité N-terminale et se termine par l'extrémité C-terminale, par voie enzymatique."},
  {"q": "Le glutathion est :",
   "o": ["Un tripeptide anti-oxydant", "Un antibiotique", "Un polypeptide hormonal", "Une protéine de structure"],
   "a": 0,
   "e": "Tripeptide aux propriétés anti-oxydantes : il empêche l'oxydation de l'hémoglobine. La pénicilline est aussi un tripeptide, mais antibiotique."},
  {"q": "Quel niveau de structure est stabilisé par des liaisons hydrogène entre N et O ?",
   "o": ["La structure primaire", "La structure secondaire", "La structure tertiaire seulement", "Aucune"],
   "a": 1,
   "e": "Hélices α et feuillets β : N et O sont électronégatifs, d'où la liaison hydrogène."},
  {"q": "La proline est absente :",
   "o": ["Des hélices α et des feuillets β, car elle forme des coudes non réguliers", "De toutes les protéines", "Des ponts disulfures", "De la structure quaternaire"],
   "a": 0,
   "e": "Son cycle rigide crée des coudes non réguliers : elle ne s'insère ni dans l'hélice α ni dans le feuillet β."},
  {"q": "L'hémoglobine A1 majeure est constituée de :",
   "o": ["2 chaînes α et 2 chaînes β", "2 α et 2 δ", "2 α et 2 γ", "4 chaînes identiques"],
   "a": 0,
   "e": "HbA1 (majeure) = α et β · HbA2 (mineure) = α et δ · HbF (fœtale) = α et γ."},
  {"q": "Le fer de l'hémoglobine est sous forme :",
   "o": ["Fe²⁺ (ferreux)", "Fe³⁺ (ferrique)", "Fe⁰", "Fe³⁺ seulement dans l'hémoglobine fœtale"],
   "a": 0,
   "e": "Fe²⁺ dans l'hémoglobine normale ; Fe³⁺ c'est la méthémoglobine (après oxydation)."},
  {"q": "L'affinité de l'hémoglobine pour le CO est :",
   "o": ["200 fois plus importante que pour l'O₂", "Identique à celle pour l'O₂", "200 fois plus faible", "Nulle"],
   "a": 0,
   "e": "200 fois plus grande : le CO occupe le site du fer et bloque le transport de l'O₂."},
  {"q": "L'effet Bohr correspond à :",
   "o": ["La diminution de l'affinité de l'Hb en présence de H⁺", "L'augmentation de l'affinité en présence de CO₂", "La fixation du CO sur le fer", "La dénaturation de l'hémoglobine"],
   "a": 0,
   "e": "En milieu acide (H⁺), l'Hb relâche l'O₂ : c'est le mécanisme qui permet d'évacuer l'acidité au niveau des tissus."},
  {"q": "Pourquoi l'hémoglobine fœtale (HbF) a-t-elle une affinité supérieure à celle de la mère ?",
   "o": ["Ses chaînes γ ont moins d'affinité pour le 2,3-DPG", "Elle contient plus de fer", "Elle n'a pas de chaîne α", "Elle fixe le CO à la place de l'O₂"],
   "a": 0,
   "e": "Le 2,3-DPG diminue l'affinité ; les chaînes γ le lient moins, donc l'HbF garde une meilleure affinité pour l'O₂."},
  {"q": "La drépanocytose résulte du remplacement de :",
   "o": ["L'acide glutamique par la valine sur la chaîne β", "La valine par le glutamate sur la chaîne α", "L'hème par la globine", "La chaîne β par la chaîne γ"],
   "a": 0,
   "e": "Mutation ponctuelle de la chaîne β : valine au lieu du glutamate → HbS → polymères de désoxy-HbS."},
  {"q": "La courbe de saturation de la myoglobine est :",
   "o": ["Hyperbolique, car elle n'a pas de coopérativité", "Sigmoïde, comme l'hémoglobine", "Linéaire", "En cloche"],
   "a": 0,
   "e": "Un seul hème, pas de coopérativité : hyperbole. L'hémoglobine, avec 4 sous-unités, donne une sigmoïde."},
  {"q": "La dénaturation d'une protéine :",
   "o": ["Détruit la conformation tridimensionnelle et l'activité biologique, sans toucher la séquence", "Détruit la structure primaire", "Augmente l'activité", "Ne concerne que l'hémoglobine"],
   "a": 0,
   "e": "Perte de la conformation 3D → perte de l'activité. La structure primaire reste intacte."},
  {"q": "La réaction à la ninhydrine sert à :",
   "o": ["Révéler les acides aminés", "Doser le glucose", "Précipiter les protéines", "Hydrolyser les peptides"],
   "a": 0,
   "e": "La ninhydrine est un composé aromatique utilisé comme révélateur des acides aminés."},
 ],
}



# --------------------------------------------------------------------------
# Flashcards
# --------------------------------------------------------------------------
FLASH = [
 {"g": "Oses", "q": "Différence entre un ose et un oside ?", "a": "L'<b>ose</b> est <b>non hydrolysable</b>. L'<b>oside</b> est <b>hydrolysable</b> : il donne des oses (holoside) ou des oses + aglycone (hétéroside)."},
 {"g": "Oses", "q": "Aldose ou cétose ?", "a": "<b>Aldose</b> : aldéhyde en <b>C1</b> (glucose). <b>Cétose</b> : cétone, le plus souvent en <b>C2</b> (fructose)."},
 {"g": "Oses", "q": "Qu'est-ce qu'un épimère ?", "a": "Deux oses qui ne diffèrent que par la configuration d'<b>un seul</b> carbone asymétrique."},
 {"g": "Oses", "q": "Les épimères du glucose ?", "a": "<b>Mannose</b> au C2, <b>allose</b> au C3, <b>galactose</b> au C4."},
 {"g": "Oses", "q": "Différence D/L et d/l ?", "a": "<b>D/L</b> = convention de <b>structure</b> (Fischer). <b>d/l</b> = <b>pouvoir rotatoire</b> mesuré. Un ose D peut être lévogyre."},
 {"g": "Cyclisation", "q": "Quel carbone devient anomérique chez le glucose ? Chez le fructose ?", "a": "Glucose : <b>C1</b>. Fructose : <b>C2</b> (c'est une cétose)."},
 {"g": "Cyclisation", "q": "Pyranose : combien d'atomes ? Furanose ?", "a": "<b>Pyranose</b> = 6 atomes (glucose). <b>Furanose</b> = 5 atomes (fructose)."},
 {"g": "Cyclisation", "q": "Les proportions α / β / forme ouverte du glucose ?", "a": "<b>36 % α</b> · <b>63 % β</b> · <b>0,1 %</b> forme ouverte."},
 {"g": "Cyclisation", "q": "Pourquoi β est-il majoritaire ?", "a": "Son OH anomérique est <b>cis</b> par rapport au CH<sub>2</sub>OH : la forme est plus <b>stable</b>."},
 {"g": "Cyclisation", "q": "Qu'est-ce que la mutarotation ?", "a": "L'<b>équilibration</b> des anomères α et β en solution, par ouverture et refermeture du cycle : le pouvoir rotatoire évolue vers une valeur stable."},
 {"g": "Physique", "q": "Pourquoi les oses sont-ils solubles dans l'eau ?", "a": "Leurs nombreux <b>OH</b> forment des <b>liaisons hydrogène</b> avec l'eau. Ils sont insolubles dans les solvants apolaires."},
 {"g": "Physique", "q": "De quoi dépend la saveur sucrée ?", "a": "De la <b>structure</b> — pas du pouvoir rotatoire. Elle est très variable d'un ose à l'autre."},
 {"g": "Chimie", "q": "Oxydation du C1 ?", "a": "→ <b>Acide gluconique</b> (base du test de Fehling : sucre réducteur)."},
 {"g": "Chimie", "q": "Oxydation du C6 ?", "a": "→ <b>Acide glucuronique</b> (GAG, détoxification)."},
 {"g": "Chimie", "q": "Réduction du carbonyle ?", "a": "→ <b>Sorbitol</b> (polyol)."},
 {"g": "Chimie", "q": "Le G6P : quelle liaison, et pourquoi piège-t-il le glucose ?", "a": "Liaison <b>ester phosphorique C–O–P</b> sur l'O du C6. Chargé → il <b>ne traverse pas</b> la membrane : glucose piégé."},
 {"g": "Chimie", "q": "Quelle enzyme libère le glucose du G6P ?", "a": "La <b>glucose-6-phosphatase</b> (foie, rein) → glucose libre → glycémie."},
 {"g": "Chimie", "q": "Les deux réactions des alcools secondaires ?", "a": "Avec <b>R–NH<sub>2</sub></b> → <b>glucosamine</b>. Avec <b>R–O–CH<sub>3</sub></b> → <b>éther-oxyde méthylique</b>."},
 {"g": "Osides", "q": "Holoside ou hétéroside ?", "a": "<b>Holoside</b> : hydrolyse → oses seuls. <b>Hétéroside</b> : hydrolyse → oses + <b>aglycone</b>."},
 {"g": "Osides", "q": "Qu'appelle-t-on aglycone ?", "a": "La partie <b>non glucidique</b> d'un hétéroside. Ex. : l'axe protéique d'un protéoglycane, le céramide d'un glycolipide."},
 {"g": "Osides", "q": "Les GAG sont-ils des hétérosides ?", "a": "<b>Non</b> : ce sont des <b>hétéropolyosides</b> (oses variés) mais des <b>holosides</b> — pas d'aglycone."},
 {"g": "Disaccharides", "q": "Nom complet du lactose ?", "a": "<b>β-D-galactopyranosyl (1→4) β-D-glucopyranose</b>."},
 {"g": "Disaccharides", "q": "Pourquoi le lactose est-il réducteur et le saccharose non ?", "a": "Lactose : le <b>C1 du glucose reste libre</b>. Saccharose : les <b>deux</b> carbones anomériques sont engagés."},
 {"g": "Disaccharides", "q": "Lactase : nom savant ?", "a": "<b>β(1→4)-galactosidase</b> : ose engagé (galactose) + anomère β + liaison 1→4."},
 {"g": "Polyosides", "q": "α(1→4) et α(1→6) : que font-elles ?", "a": "<b>α(1→4)</b> = la chaîne (bout à bout). <b>α(1→6)</b> = la ramification (en travers)."},
 {"g": "Polyosides", "q": "Comment repérer un branchement sur un schéma ?", "a": "Le C6 porte <b>CH<sub>2</sub></b> (sans OH) au lieu de <b>CH<sub>2</sub>OH</b> : le C6 est engagé."},
 {"g": "Polyosides", "q": "Amylose, amylopectine, glycogène : proportions et branchements ?", "a": "Amylose <b>20 %</b> linéaire · amylopectine <b>80 %</b>, branches tous les <b>20-30</b> · glycogène tous les <b>8-12</b>."},
 {"g": "Polyosides", "q": "Les 3 GAG du cours ?", "a": "<b>Acide hyaluronique</b> (non sulfaté) · <b>chondroïtine sulfate</b> · <b>kératane sulfate</b>."},
 {"g": "Bilan lipidique", "q": "Quel jeûne pour un bilan lipidique sérique ?", "a": "<b>12 heures</b>, sur le <b>sérum</b> : sinon les triglycérides d'origine alimentaire faussent le dosage."},
 {"g": "Bilan lipidique", "q": "Lipides totaux sériques ?", "a": "<b>5 à 8 g/L</b>."},
 {"g": "Bilan lipidique", "q": "Triglycérides ?", "a": "<b>0,5 à 1,5 g/L</b>."},
 {"g": "Bilan lipidique", "q": "Cholestérol total : adulte et enfant ?", "a": "Adulte <b>1,7 à 2,5 g/L</b> · enfant <b>1,5 à 2 g/L</b> (plus bas chez l'enfant)."},
 {"g": "Bilan lipidique", "q": "Cholestérol HDL ? LDL ?", "a": "HDL <b>0,4 à 0,8 g/L</b> · LDL <b>1,1 à 1,9 g/L</b>."},
 {"g": "Bilan lipidique", "q": "Phospholipides sériques ? Acides gras libres ?", "a": "Phospholipides <b>1,5 à 2,5 g/L</b> · AGL <b>0,07 à 0,2 g/L</b> (la valeur la plus faible)."},
 {"g": "Bilan lipidique", "q": "Apoprotéines A1 et B ?", "a": "Apo <b>A1 : 0,9 à 1,8 g/L</b> (avec les HDL) · Apo <b>B : 0,9 à 1,6 g/L</b> (avec les LDL)."},
 {"g": "Bilan lipidique", "q": "Que vaut le rapport cholestérol estérifié / total ?", "a": "<b>0,6 à 0,7</b> (60-70 %) — c'est un <b>rapport</b> sans unité, pas une concentration."},
 {"g": "Bilan lipidique", "q": "Les 3 fractions du lipidogramme et leurs % ?", "a": "<b>HDL (α) 24 %</b> · <b>LDL (β) 56 %</b> · <b>VLDL (pré-β) 20 %</b> — somme = 100 %."},
 {"g": "Bilan lipidique", "q": "Pourquoi « pré-β » pour les VLDL ?", "a": "En électrophorèse, ils migrent <b>juste avant</b> les β-globulines (LDL) ; les α (HDL) vont le plus loin vers l'anode."},
 {"g": "Sphingolipides", "q": "Définition d'un sphingolipide ?", "a": "Un <b>ester</b> dont l'alcool n'est pas le glycérol mais un <b>amino-alcool</b> : la <b>sphingosine</b>."},
 {"g": "Sphingolipides", "q": "Les trois fonctions de la sphingosine ?", "a": "<b>C1</b> : CH<sub>2</sub>OH (alcool primaire, reçoit la tête) · <b>C2</b> : CH–NH<sub>2</sub> (amine, reçoit l'AG) · <b>C3</b> : CH–OH (alcool secondaire, libre)."},
 {"g": "Sphingolipides", "q": "Comment se forme le céramide ?", "a": "<b>Sphingosine + 1 acide gras</b> sur l'amine (liaison amide) + H<sub>2</sub>O → <b>céramide</b>."},
 {"g": "Sphingolipides", "q": "Combien d'acides gras dans un sphingolipide ?", "a": "<b>Un seul</b>, sur l'amine du C2. « Deux AG » est le piège classique."},
 {"g": "Sphingolipides", "q": "Quelle famille de sphingolipides contient du phosphate ?", "a": "Les <b>sphingomyélines</b> seulement (phosphocholine sur le C1). Cérébrosides, gangliosides et glycolipides neutres n'en ont pas."},
 {"g": "Sphingolipides", "q": "Niemann-Pick : enzyme et signes ?", "a": "Déficit en <b>sphingomyélinase</b> → <b>grosse rate + troubles neurologiques</b>."},
 {"g": "Sphingolipides", "q": "Gaucher : enzyme ?", "a": "Déficit en <b>β-glucosidase</b> (le glucocérébroside s'accumule)."},
 {"g": "Sphingolipides", "q": "Tay-Sachs : enzyme et substrat ?", "a": "Déficit en <b>hexosaminidase</b>, qui détache le <b>N-acétyl-galactose</b> des gangliosides."},
 {"g": "Sphingolipides", "q": "Ose des cérébrosides : cerveau et rein ?", "a": "<b>Galactose</b> dans le cerveau · <b>glucose</b> dans le rein (≠ autres tissus)."},
 {"g": "Sphingolipides", "q": "Rôle des gangliosides ?", "a": "<b>Récepteurs</b> de la <b>sérotonine</b>, de <b>virus</b> et de <b>toxines</b>, au niveau du cerveau."},
 {"g": "Sphingolipides", "q": "Les glycolipides neutres servent à quoi ?", "a": "Ce sont les <b>déterminants des groupes sanguins</b> (céramide + glucose ± un ose)."},
 {"g": "Sphingolipides", "q": "Hydrophobes ou amphiphiles ?", "a": "<b>Amphiphiles</b> : tête polaire en C1 + queues apolaires → ils forment la <b>bicouche</b> membranaire."},
 {"g": "Sphingolipides", "q": "Le précurseur de la vitamine D3 ?", "a": "Le <b>cholestérol</b> (avec les acides biliaires et les hormones stéroïdes) — <b>pas</b> un sphingolipide."},
 {"g": "Acides aminés", "q": "Structure commune des 20 acides aminés ?", "a": "<b>—COOH</b> et <b>—NH<sub>2</sub></b> sur le <b>même carbone α</b>. Tout le reste est dans <b>R</b>."},
 {"g": "Acides aminés", "q": "Quel acide aminé n'a pas de carbone asymétrique ?", "a": "La <b>glycine</b> : son R est un <b>H</b>, donc deux substituants identiques → pas d'activité optique."},
 {"g": "Acides aminés", "q": "Les 8 essentiels ?", "a": "<b>Lys, Trp, Met, Phe, Thr, Val, Leu, Ile</b> (+ 2 semi-essentiels : <b>Arg, His</b>). Mnémotechnique « PVT TIM HALL »."},
 {"g": "Acides aminés", "q": "Les 3 basiques et leur fonction ?", "a": "<b>Lys</b> = amine · <b>Arg</b> = guanidine · <b>His</b> = imidazole (c'est elle qui capte H⁺ dans l'effet Bohr)."},
 {"g": "Acides aminés", "q": "Quels acides aminés absorbent l'UV ?", "a": "Les <b>aromatiques</b> : Phe, Tyr, Trp → dosage des protéines à 280 nm."},
 {"g": "Acides aminés", "q": "L'acide aminé qui casse l'hélice α ?", "a": "La <b>proline</b> : son cycle rigidifie la chaîne."},
 {"g": "Acides aminés", "q": "Le seul acide aminé à thiol, et à quoi il sert ?", "a": "La <b>cystéine</b> (—SH) : deux cystéines forment un <b>pont disulfure</b> —S—S—."},
 {"g": "Acides aminés", "q": "Décarboxylation : glutamate, histidine, tyrosine, tryptophane ?", "a": "Glutamate → <b>GABA</b> · histidine → <b>histamine</b> · tyrosine → <b>tyramine</b> · tryptophane → <b>sérotonine</b>."},
 {"g": "Acides aminés", "q": "Les 4 dérivés post-traductionnels du cours ?", "a": "<b>4-hydroxyproline</b> (Pro) · <b>5-hydroxylysine</b> (Lys) · <b>γ-carboxyglutamate</b> (Glu, prothrombine, Ca²⁺) · <b>orthophosphosérine</b> (Ser, hormones)."},
 {"g": "Acides aminés", "q": "Scorbut : mécanisme et vitamine ?", "a": "Défaut d'<b>hydroxylation</b> de la <b>proline</b> et de la <b>lysine</b> du collagène, faute de <b>vitamine C</b>."},
 {"g": "Acides aminés", "q": "Charge selon le pH ?", "a": "pH &lt; pHi → <b>+</b> (cation) · pH = pHi → <b>neutre</b> (zwitterion) · pH &gt; pHi → <b>−</b> (anion)."},
 {"g": "Acides aminés", "q": "Migration à l'électrophorèse ?", "a": "Les <b>cations</b> vers la <b>cathode (−)</b>, les <b>anions</b> vers l'<b>anode (+)</b>. Au pHi : <b>immobile</b>."},
 {"g": "Acides aminés", "q": "Henderson-Hasselbalch et point médian ?", "a": "<b>pH = pK + log([A⁻]/[HA])</b> ; quand [A⁻] = [HA], <b>pH = pK</b>. Glycine : pH 2,35."},
 {"g": "Acides aminés", "q": "Les 9 acides aminés à R ionisable ?", "a": "<b>Tyr, Ser, Thr</b> (OH) · <b>Cys</b> (SH) · <b>Asp, Glu</b> (COOH) · <b>Lys</b> (amine) · <b>His</b> (imidazole) · <b>Arg</b> (guanidine)."},
 {"g": "Acides aminés", "q": "Ornithine et citrulline ?", "a": "Acides aminés <b>libres</b>, <b>pas</b> constitutifs des protéines : cycle de l'<b>urée</b> et biosynthèse de l'arginine."},
 {"g": "Protéines", "q": "Les quatre caractères de la liaison peptidique ?", "a": "<b>Rigide</b> · <b>planaire</b> · <b>polaire</b> · <b>hybride de résonance</b> (longueur intermédiaire entre C–N et C=N)."},
 {"g": "Protéines", "q": "Sens de la synthèse peptidique ?", "a": "De l'extrémité <b>N-terminale</b> vers l'extrémité <b>C-terminale</b>, par voie enzymatique."},
 {"g": "Protéines", "q": "Quelle forme est la plus stable : trans ou cis ?", "a": "La forme <b>trans</b>, plus stable que la cis."},
 {"g": "Protéines", "q": "Le glutathion ?", "a": "<b>Tripeptide</b> aux propriétés <b>anti-oxydantes</b> : empêche l'oxydation de l'hémoglobine."},
 {"g": "Protéines", "q": "La pénicilline ?", "a": "<b>Tripeptide</b> antibiotique, protège des attaques bactériennes. Insuline et glucagon = <b>polypeptides</b>."},
 {"g": "Protéines", "q": "Qu'est-ce qui stabilise la structure secondaire ?", "a": "Les <b>liaisons hydrogène</b> entre N et O (électronégatifs) : hélices α et feuillets β."},
 {"g": "Protéines", "q": "Structure tertiaire : où vont les résidus ?", "a": "<b>Hydrophiles à l'extérieur</b>, <b>hydrophobes à l'intérieur</b>. Liaisons ioniques, H, hydrophobes, van der Waals, ponts S–S."},
 {"g": "Protéines", "q": "La structure quaternaire, exemples ?", "a": "Plusieurs sous-unités : <b>hémoglobine</b>, <b>immunoglobulines</b> (anticorps)."},
 {"g": "Protéines", "q": "Rôle de la proline dans les structures secondaires ?", "a": "<b>Absente</b> des hélices α et des feuillets β : elle forme des <b>coudes non réguliers</b>."},
 {"g": "Protéines", "q": "Dénaturation : qu'est-ce qui est détruit ?", "a": "La <b>conformation 3D</b> et l'<b>activité biologique</b>. La <b>structure primaire reste intacte</b>."},
 {"g": "Hémoglobine", "q": "Les trois hémoglobines et leurs chaînes ?", "a": "<b>HbA1</b> (majeure) = α + β · <b>HbA2</b> (mineure) = α + δ · <b>HbF</b> (fœtale) = α + γ."},
 {"g": "Hémoglobine", "q": "Pourquoi 4 O₂ pour l'Hb et 1 seul pour la myoglobine ?", "a": "À cause du <b>nombre d'hèmes</b> : 4 dans le tétramère, 1 dans la myoglobine."},
 {"g": "Hémoglobine", "q": "Myoglobine : quelle courbe ?", "a": "<b>Hyperbolique</b> (pas de coopérativité, un seul hème). L'hémoglobine : <b>sigmoïde</b>, coopérative (25 → 61 → 74 → 100 %)."},
 {"g": "Hémoglobine", "q": "Le CO : quelle affinité ?", "a": "<b>200 fois</b> plus importante que pour l'O₂."},
 {"g": "Hémoglobine", "q": "État R et état T ?", "a": "<b>R</b> (relâché) = oxyhémoglobine · <b>T</b> (tendu) = désoxyhémoglobine. En R le fer est <b>dans le plan</b>, en T il en est <b>écarté</b>."},
 {"g": "Hémoglobine", "q": "Pourquoi l'HbF a-t-elle plus d'affinité ?", "a": "Ses chaînes γ ont <b>moins d'affinité pour le 2,3-DPG</b>, qui est un facteur <b>diminuant</b> l'affinité."},
 {"g": "Hémoglobine", "q": "Drépanocytose : quelle mutation ?", "a": "<b>Valine</b> à la place de l'<b>acide glutamique</b> sur la chaîne <b>β</b> → <b>HbS</b>."},
 {"g": "Hémoglobine", "q": "Les 5 facteurs qui modifient l'affinité de l'Hb ?", "a": "<b>P O₂ · 2,3-DPG · pH (H⁺) · CO₂ · oxydants</b>."},


]

# --------------------------------------------------------------------------
# Sections
# --------------------------------------------------------------------------
SECTIONS = [
 ("g0", "Guide", "Guide d'examen et plan de révision", "Ce qui est annoncé, le plan des 12 séances et la méthode", "G", GUIDE, False),
 ("c1", "Oses", "Les oses et la filiation de Keller et Kiliani", "Définitions, épimères, série D et L", "1", C1, False),
 ("c2", "Cyclisation", "Cyclisation du glucose", "Hémiacétal, anomères α et β, mutarotation", "2", C2, False),
 ("c3", "Cyclisation", "Cyclisation du fructose", "Le cas des cétoses : furanose et C2 anomérique", "3", C3, False),
 ("c4", "Physique", "Propriétés physiques des oses", "Solubilité, saveur, pouvoir rotatoire (diapo 33)", "4", C4, False),
 ("c5", "Chimie", "Propriétés chimiques des oses", "C1, C6, alcools secondaires, estérification et G6P", "5", C5, False),
 ("c6", "Osides", "Les osides et l'aglycone", "Classification, holoside / hétéroside", "6", C6, False),
 ("c7", "Disaccharides", "Les disaccharides et la dénomination", "Lactose, saccharose, maltose · la méthode en 5 étapes", "7", C7, False),
 ("c8", "Polyosides", "Amidon, glycogène et GAG", "Liaisons α(1→4) / α(1→6) et mucopolysaccharides", "8", C8, False),
 ("c9", "Lipides", "Bilan lipidique sérique", "Les valeurs normales, le lipidogramme et les pièges (diapos 88-89)", "9", C9, False),
 ("c10", "Lipides", "Sphingolipides et sphingophospholipides", "La sphingosine, le céramide, les 4 familles et les 3 maladies (diapos 90-93)", "10", C10, False),
 ("c11", "Acides aminés", "Les acides aminés (Pr. Khlil)", "Structure, classification par R, pHi et électrophorèse, Q1-Q7 de l'examen 2024-25", "11", C11, False),
 ("c12", "Acides aminés", "Protéines et hémoglobine (Pr. Khlil)", "Liaison peptidique, peptides, 4 structures et hémoglobine — Q8 à Q13 de l'examen", "12", C12, False),
]

HERO = """
<div class="hero">
  <svg class="tooth" viewBox="0 0 200 200" aria-hidden="true">
    <g fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" opacity=".9">
      <polygon points="100,20 145,45 145,95 100,120 55,95 55,45"/>
      <polygon points="150,110 175,125 175,165 150,180 125,165 125,125"/>
      <polygon points="75,125 100,140 100,180 75,195 50,180 50,140"/>
    </g>
    <g fill="#fff" opacity=".85"><circle cx="100" cy="20" r="6"/><circle cx="145" cy="95" r="6"/><circle cx="55" cy="45" r="6"/><circle cx="150" cy="180" r="6"/><circle cx="75" cy="195" r="6"/></g>
  </svg>
  <div class="kick">FMDC Casablanca · 1<sup>re</sup> année · S1 · Chimie et biochimie</div>
  <h1>Biochimie <em>structurale</em></h1>
  <p>Tout le module au même endroit : les oses, la cyclisation, les propriétés, les osides et les polyosides —
  expliqués simplement, avec les schémas du diaporama, les pièges d'examen et des QCM corrigés.</p>
  <p style="font-size:13.5px;opacity:.8">D'après le diaporama du Pr. Naamane (93 diapos) et le support du Pr. Khlil (2024-25)</p>
  <div class="dash">
    <div class="kpi ring"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="6"/><circle id="ring" cx="27" cy="27" r="22" fill="none" stroke="#7dead9" stroke-width="6" stroke-linecap="round" stroke-dasharray="138.2" stroke-dashoffset="138.2" transform="rotate(-90 27 27)" style="transition:stroke-dashoffset .5s"/></svg><div><b id="pct2">0 %</b><span>Ta progression</span></div></div>
    <div class="kpi"><b>12</b><span>chapitres</span></div>
    <div class="kpi"><b id="nq">0</b><span>QCM d'entraînement</span></div>
    <div class="kpi"><b id="nf">0</b><span>flashcards</span></div>
    <div class="kpi"><b>1</b><span>examen blanc</span></div>
  </div>
  <div class="chips">
    <span class="chip">11 parties annoncées</span><span class="chip">Bilan lipidique</span><span class="chip">Sphingolipides (annoncé)</span><span class="chip">Acides aminés</span><span class="chip">Hémoglobine</span><span class="chip">Schémas du diaporama</span>
    <span class="chip">Pièges d'examen</span><span class="chip">QCM corrigés</span>
    <span class="chip">Flashcards</span><span class="chip">Examen chronométré</span>
  </div>
</div>
<div id="toc"></div>
"""


def build():
    secs_html = []
    for sid, grp, title, prof, num, body, _ in SECTIONS:
        quiz = ""
        if sid in QUIZ:
            quiz = f'<div class="quiz" data-quiz="{sid}"></div>'
        secs_html.append(f"""
<section class="chap" id="{sid}" data-t="{title}" data-g="{grp}">
<header><div class="num">{num}</div><div><h2>{title}</h2><div class="prof">{prof}</div></div></header>
{body}
{quiz}
</section>""")

    # examen blanc + flashcards
    secs_html.append("""
<section class="chap" id="ex" data-t="Examen blanc chronométré" data-g="Entraînement">
<header><div class="num">⏱</div><div><h2>Examen blanc chronométré</h2><div class="prof">10 questions tirées au hasard · 10 minutes · correction à la fin</div></div></header>
<p>Comme le jour de l'examen : tu réponds à tout <b>sans voir la correction</b>. À la fin, tu obtiens ta note
sur 20 et le détail de chaque question.</p>
<div id="exam"></div>
</section>""")

    secs_html.append("""
<section class="chap" id="fc" data-t="Flashcards" data-g="Entraînement">
<header><div class="num">🃏</div><div><h2>Flashcards</h2><div class="prof">La réponse est cachée : réfléchis, puis retourne la carte</div></div></header>
<p>Lis la question, réponds dans ta tête, puis clique sur la carte. « À revoir » la remet à la fin du paquet ;
« Je savais » la retire.</p>
<div class="chips" id="flfilt"></div>
<div id="flash"></div>
</section>""")

    secs_html.append(f"""
<section class="chap" id="res" data-t="Ressources" data-g="Plus">
<header><div class="num">★</div><div><h2>Ressources</h2><div class="prof">Drive de la promo, annales et pages du site</div></div></header>
{RES}
</section>""")

    quiz_js = json.dumps(QUIZ, ensure_ascii=False)
    flash_js = json.dumps(FLASH, ensure_ascii=False)

    html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Biochimie structurale — FMDC 1A | Cours complet</title>
<meta name="description" content="Cours complet de biochimie structurale (1ère année Médecine Dentaire, FMDC Casablanca) : oses, cyclisation, propriétés physiques et chimiques, osides, disaccharides, polyosides et GAG, lipides et sphingolipides, avec QCM corrigés, flashcards et examen blanc.">
<style>
{CSS}
</style>
</head>
<body>
<div id="scrollbar"></div>
<div class="lb" id="lb"><img alt=""><p></p></div>
<div class="layout">
<nav id="nav">
  <div class="brand">Biochimie · S1</div>
  <div class="sub">Biochimie structurale · FMDC · 1<sup>re</sup> année</div>
  <input id="search" type="search" placeholder="Rechercher un mot (ex : anomère)…">
  <div class="sub" style="margin:0">Progression : <b id="pct">0 %</b></div>
  <div class="bar"><i id="pbar"></i></div>
  <div class="tools">
    <button class="btn" id="dark">🌙 Sombre</button>
    <button class="btn mob" id="menu">☰ Chapitres</button>
  </div>
  <div class="list" id="list"></div>
  <div class="grp">Liens</div>
  <div class="tools" style="display:block">
    <a class="btn" href="cours/biochimie-structurale-plan.html" style="display:block;text-align:center;margin-bottom:6px;text-decoration:none">🗺️ Plan détaillé</a>
    <a class="btn" href="cours/biochimie-structurale.html" style="display:block;text-align:center;margin-bottom:6px;text-decoration:none">🧫 Cours expliqué</a>
    <a class="btn" href="documents.html" style="display:block;text-align:center;margin-bottom:6px;text-decoration:none">📁 Documents du module</a>
    <a class="btn" href="portail.html" style="display:block;text-align:center;text-decoration:none">↩️ Portail du S1</a>
  </div>
</nav>

<main id="main">
{HERO}
{''.join(secs_html)}
</main>
</div>
<button class="top" id="top">↑</button>
<script>
var QUIZ = {quiz_js};
var FLASH = {flash_js};
var ABC = ["A","B","C","D","E","F"];
function esc(s){{return String(s).replace(/[&<>"]/g,function(c){{return {{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}}[c]}})}}
var LS = {{
  get: function(k,d){{try{{return JSON.parse(localStorage.getItem('bio_' + k)) || d}}catch(e){{return d}}}},
  set: function(k,v){{try{{localStorage.setItem('bio_' + k, JSON.stringify(v))}}catch(e){{}}}}
}};

// ---------- QCM par chapitre ----------
document.querySelectorAll('.quiz').forEach(function(box){{
  var id = box.dataset.quiz, qs = QUIZ[id] || [], good = 0, done = 0;
  function render(){{
    good = 0; done = 0;
    var h = "<h3 style='margin-top:0'>QCM d'entraînement</h3><p class='hint'>Choisis ta réponse puis clique sur « Vérifier ». La correction reste cachée jusque-là.</p>";
    qs.forEach(function(q,i){{
      h += "<div class='q' data-i='" + i + "'><p>" + (i+1) + ". " + esc(q.q) + "</p>";
      q.o.forEach(function(o,j){{ h += "<button class='opt' data-j='" + j + "'>" + esc(o) + "</button>"; }});
      h += "<button class='btn p chk' disabled>Vérifier</button><div class='why'></div></div>";
    }});
    h += "<div class='score'></div><button class='btn' data-reset>↺ Recommencer</button>";
    box.innerHTML = h;
  }}
  render();
  box.addEventListener('click', function(ev){{
    var b = ev.target;
    if (b.hasAttribute('data-reset')) {{ render(); return; }}
    var d = b.closest('.q'); if (!d || d.classList.contains('ans')) return;
    if (b.classList.contains('opt')) {{
      d.querySelectorAll('.opt').forEach(function(x){{ x.classList.remove('pick'); }});
      b.classList.add('pick'); d.querySelector('.chk').disabled = false; return;
    }}
    if (!b.classList.contains('chk')) return;
    var q = qs[+d.dataset.i], pk = d.querySelector('.opt.pick'); if (!pk) return;
    var right = +pk.dataset.j === q.a;
    d.classList.add('ans'); done++; if (right) good++;
    d.querySelectorAll('.opt').forEach(function(x){{ x.disabled = true; if (+x.dataset.j === q.a) x.classList.add('ok'); }});
    pk.classList.remove('pick'); if (!right) pk.classList.add('ko');
    b.style.display = 'none';
    d.querySelector('.why').innerHTML = "<b>" + (right ? "✅ Bonne réponse." : "❌ Mauvaise réponse. La bonne : " + ABC[q.a] + ".") + "</b> <span><b>Pourquoi ?</b> " + esc(q.e) + "</span>";
    box.querySelector('.score').textContent = "Score : " + good + " / " + done + (done === qs.length ? " — terminé" : "");
  }});
}});

// ---------- Examen blanc ----------
(function(){{
  var pool = [];
  for (var k in QUIZ) QUIZ[k].forEach(function(q){{ pool.push(q); }});
  var host = document.getElementById('exam'), state = null, timer = null;
  function start(){{
    var pick = pool.slice().sort(function(){{ return Math.random() - .5; }}).slice(0, 10);
    state = {{ qs: pick, answers: new Array(pick.length).fill(null), i: 0, left: 600 }};
    renderQ(); tick();
    timer = setInterval(function(){{
      state.left--; var t = document.getElementById('ex-time');
      if (t) t.textContent = fmt(state.left);
      if (state.left <= 0) {{ clearInterval(timer); finish(); }}
    }}, 1000);
  }}
  function fmt(s){{ var m = Math.floor(s/60), r = s%60; return (m<10?('0'+m):m) + ':' + (r<10?('0'+r):r); }}
  function tick(){{ if (state) {{ var t = document.getElementById('ex-time'); if (t) t.textContent = fmt(state.left); }} }}
  function renderQ(){{
    var q = state.qs[state.i];
    host.innerHTML = "<div class='box def' style='margin-top:0'><b class='t'>Question " + (state.i+1) + " / " + state.qs.length + "</b>"
      + "<p style='margin:0 0 6px;font-weight:650'>" + esc(q.q) + "</p>"
      + q.o.map(function(o,j){{ var on = state.answers[state.i] === j ? " pick" : "";
          return "<button class='opt" + on + "' data-ex='" + j + "'>" + esc(o) + "</button>"; }}).join('')
      + "</div>"
      + "<div style='display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px'>"
      + "<button class='btn' data-prev " + (state.i ? "" : "disabled") + ">← Précédent</button>"
      + "<button class='btn p' data-next>" + (state.i === state.qs.length-1 ? "Terminer" : "Suivant →") + "</button>"
      + "<span style='margin-left:auto;font-weight:700'>⏱ <span id='ex-time'>" + fmt(state.left) + "</span></span></div>";
  }}
  function finish(){{
    clearInterval(timer);
    var good = 0;
    state.qs.forEach(function(q,i){{ if (state.answers[i] === q.a) good++; }});
    var note = Math.round(good * 20 / state.qs.length);
    var h = "<div class='box tip'><b class='t'>Résultat</b><b style='font-size:22px'>" + good + " / " + state.qs.length + "</b> — note : <b>" + note + " / 20</b></div><h3>Correction</h3>";
    state.qs.forEach(function(q,i){{
      var ok = state.answers[i] === q.a;
      h += "<div class='box " + (ok ? "tip" : "bad") + "' style='margin:10px 0'><b class='t'>Question " + (i+1) + (ok ? " · juste" : " · faux") + "</b>"
        + "<p style='margin:0 0 4px'><b>" + esc(q.q) + "</b></p>"
        + "<p style='margin:0 0 4px'>Ta réponse : " + (state.answers[i] === null ? "<i>aucune</i>" : ABC[state.answers[i]]) + " · Bonne réponse : <b>" + ABC[q.a] + "</b></p>"
        + "<p style='margin:0;font-size:14px;opacity:.85'>" + esc(q.e) + "</p></div>";
    }});
    h += "<button class='btn p' data-restart>↺ Nouvel examen</button>";
    host.innerHTML = h;
  }}
  host.addEventListener('click', function(e){{
    var b = e.target;
    if (b.hasAttribute('data-restart')) {{ start(); return; }}
    if (!state) {{ if (b.id === 'ex-start') start(); return; }}
    if (b.hasAttribute('data-ex')) {{ state.answers[state.i] = +b.dataset.ex; renderQ(); return; }}
    if (b.hasAttribute('data-next')) {{ if (state.i === state.qs.length-1) {{ finish(); }} else {{ state.i++; renderQ(); }} return; }}
    if (b.hasAttribute('data-prev') && state.i) {{ state.i--; renderQ(); }}
  }});
  host.innerHTML = "<button class='btn p' id='ex-start'>▶ Démarrer l'examen (10 questions · 10 min)</button>";
}})();

// ---------- Flashcards ----------
(function(){{
  var host = document.getElementById('flash'), filt = document.getElementById('flfilt');
  var groups = []; FLASH.forEach(function(f){{ if (groups.indexOf(f.g) < 0) groups.push(f.g); }});
  var cur = 'Tout', deck = [], idx = 0, shown = false;
  filt.innerHTML = ['Tout'].concat(groups).map(function(g){{ return "<button class='chip" + (g===cur?" on":"") + "' data-g='" + g + "'>" + g + "</button>"; }}).join('');
  function build(){{ deck = FLASH.filter(function(f){{ return cur === 'Tout' || f.g === cur; }}); idx = 0; shown = false; paint(); }}
  function paint(){{
    if (!deck.length) {{ host.innerHTML = "<p class='hint'>Aucune carte.</p>"; return; }}
    var f = deck[idx];
    host.innerHTML = "<div class='fcard' tabindex='0' id='fcard'><div class='fin' style='transform:none'>"
      + "<div class='face' style='position:relative;border:1px solid var(--line);border-radius:18px;padding:26px 22px;background:var(--card);min-height:150px;display:flex;flex-direction:column;justify-content:center;text-align:center'>"
      + "<div style='font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:800;color:var(--acc)'>" + esc(f.g) + "</div>"
      + "<p style='font-family:var(--serif);font-size:19px;font-weight:700;margin:8px 0 0'>" + esc(f.q) + "</p>"
      + "<p style='color:var(--mut);font-size:13px;margin:12px 0 0'>" + (shown ? '' : 'Clique la carte pour voir la réponse') + "</p>"
      + (shown ? "<div style='margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);font-size:15px'>" + f.a + "</div>" : "")
      + "</div></div></div>"
      + "<div style='display:flex;gap:9px;justify-content:center;flex-wrap:wrap;margin-top:14px'>"
      + "<button class='btn' data-again>↻ À revoir</button>"
      + "<button class='btn p' data-knew>✓ Je savais</button>"
      + "<span style='align-self:center;color:var(--mut);font-size:13px'>" + (idx+1) + " / " + deck.length + "</span></div>";
  }}
  filt.addEventListener('click', function(e){{
    var b = e.target.closest('[data-g]'); if (!b) return;
    cur = b.dataset.g; filt.querySelectorAll('.chip').forEach(function(c){{ c.classList.toggle('on', c === b); }}); build();
  }});
  host.addEventListener('click', function(e){{
    if (e.target.id === 'fcard' || e.target.closest('#fcard')) {{ shown = !shown; paint(); return; }}
    if (e.target.hasAttribute('data-knew')) {{ deck.splice(idx,1); if (idx >= deck.length) idx = 0; shown = false; paint(); return; }}
    if (e.target.hasAttribute('data-again')) {{ var c = deck.splice(idx,1)[0]; deck.push(c); if (idx >= deck.length) idx = 0; shown = false; paint(); }}
  }});
  build();
}})();

// ---------- Navigation, progression, recherche ----------
var chaps = [].slice.call(document.querySelectorAll('.chap'));
var list = document.getElementById('list');
list.innerHTML = chaps.map(function(s){{
  return "<a class='ch' data-id='" + s.id + "' href='#" + s.id + "' style='--c:hsl(var(--h) 70% 62%)'>"
    + "<span class='n'>" + (s.querySelector('header .num') ? s.querySelector('header .num').textContent : '•') + "</span>"
    + "<span>" + (s.dataset.t || s.id) + "</span></a>";
}}).join('');
document.getElementById('toc').innerHTML = "<div class='grid' style='grid-template-columns:repeat(auto-fill,minmax(240px,1fr))'>"
  + chaps.map(function(s){{
      return "<a class='tcard' data-id='" + s.id + "' href='#' data-g='" + (s.dataset.g||'') + "'>"
        + "<span class='k'>" + (s.querySelector('header .num') ? s.querySelector('header .num').textContent : '•') + "</span>"
        + "<span class='g'>" + (s.dataset.g || '') + "</span>"
        + "<div class='tt'>" + (s.dataset.t || s.id) + "</div>"
        + "<div class='m'>" + (s.querySelector('.prof') ? s.querySelector('.prof').textContent : '') + "</div></a>";
  }}).join('') + "</div>";

var store = {{
  get: function(){{ return LS.get('done', []); }},
  set: function(v){{ LS.set('done', v); }}
}};
function refresh(){{
  var d = store.get(), tot = chaps.filter(function(s){{ return s.id === 'g0' || /^c\\d+$/.test(s.id); }}).length;
  chaps.forEach(function(s){{
    var isContent = s.id === 'g0' || /^c\d+$/.test(s.id);
    if (!isContent) return;
    var on = d.indexOf(s.id) > -1;
    if (!s.querySelector('.donebtn')) {{
      var b = document.createElement('button');
      b.className = 'btn donebtn'; b.style.marginTop = '14px';
      b.dataset.done = s.id; s.appendChild(b);
    }}
    var btn = s.querySelector('.donebtn');
    btn.textContent = on ? '✓ Chapitre terminé (cliquer pour annuler)' : 'Marquer ce chapitre comme terminé';
    btn.title = on ? "Cliquer pour annuler" : "Marquer ce chapitre comme terminé";
    btn.classList.toggle('p', !on);
  }});
  list.querySelectorAll('a.ch').forEach(function(a){{ a.classList.toggle('done', d.indexOf(a.dataset.id) > -1); }});
  var p = Math.round(d.length / tot * 100);
  document.getElementById('pct').textContent = p + ' %';
  document.getElementById('pct2').textContent = p + ' %';
  document.getElementById('ring').style.strokeDashoffset = 138.2 * (1 - p/100);
  document.querySelectorAll('.tcard').forEach(function(c){{ c.classList.toggle('done', d.indexOf(c.dataset.id) > -1); }});
  document.getElementById('pbar').style.width = p + '%';
}}
document.addEventListener('click', function(e){{
  var id = e.target.dataset && e.target.dataset.done; if (!id) return;
  var d = store.get(), i = d.indexOf(id); if (i > -1) d.splice(i,1); else d.push(id);
  store.set(d); refresh();
}});
refresh();
list.addEventListener('click', function(e){{
  var a = e.target.closest('a.ch'); if (!a) return; e.preventDefault();
  document.getElementById(a.dataset.id).scrollIntoView({{behavior:'smooth'}});
  document.getElementById('nav').classList.remove('open');
}});
document.getElementById('toc').addEventListener('click', function(e){{
  var a = e.target.closest('a.tcard'); if (!a) return; e.preventDefault();
  document.getElementById(a.dataset.id).scrollIntoView({{behavior:'smooth'}});
}});
if ('IntersectionObserver' in window) {{
  var io = new IntersectionObserver(function(es){{
    es.forEach(function(en){{ if (en.isIntersecting) {{
      list.querySelectorAll('a.ch').forEach(function(a){{ a.classList.toggle('on', a.dataset.id === en.target.id); }});
    }} }});
  }}, {{rootMargin:'-20% 0px -70% 0px'}});
  chaps.forEach(function(s){{ io.observe(s); }});
}}
document.getElementById('dark').onclick = function(){{
  var on = document.body.classList.toggle('dark');
  this.textContent = on ? '☀️ Clair' : '🌙 Sombre';
  try {{ localStorage.setItem('bio_dark', on ? '1' : ''); }} catch(e) {{}}
}};
try {{ if (localStorage.getItem('bio_dark')) document.getElementById('dark').onclick(); }} catch(e) {{}}
(function(){{ var n = 0; for (var k in QUIZ) n += QUIZ[k].length;
  document.getElementById('nq').textContent = n;
  document.getElementById('nf').textContent = FLASH.length; }})();
window.addEventListener('scroll', function(){{
  var e = document.documentElement, m = e.scrollHeight - e.clientHeight;
  document.getElementById('scrollbar').style.width = (m > 0 ? e.scrollTop/m*100 : 0) + '%';
  document.getElementById('top').classList.toggle('show', e.scrollTop > 600);
}}, {{passive:true}});
document.getElementById('menu').onclick = function(){{ document.getElementById('nav').classList.toggle('open'); }};
document.getElementById('top').onclick = function(){{ window.scrollTo({{top:0,behavior:'smooth'}}); }};

function norm(s){{ return s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,''); }}
document.getElementById('search').addEventListener('input', function(){{
  var q = norm(this.value.trim());
  chaps.forEach(function(s){{
    var hit = !q || norm(s.textContent).indexOf(q) > -1;
    s.style.display = hit ? '' : 'none';
    var a = list.querySelector("a[data-id='" + s.id + "']"); if (a) a.style.display = hit ? '' : 'none';
    var c = document.querySelector(".tcard[data-id='" + s.id + "']"); if (c) c.style.display = hit ? '' : 'none';
  }});
}});

// lightbox images
(function(){{ var lb = document.getElementById('lb'); if (!lb) return;
  document.addEventListener('click', function(e){{
    var t = e.target;
    if (t.tagName === 'IMG') {{ lb.querySelector('img').src = t.src; lb.querySelector('p').textContent = t.alt; lb.classList.add('on'); }}
    else if (lb.classList.contains('on')) lb.classList.remove('on');
  }});
  document.addEventListener('keydown', function(e){{ if (e.key === 'Escape') lb.classList.remove('on'); }});
}})();
</script>
</body>
</html>
"""
    out = ROOT / "index.html"
    out.write_text(html, encoding="utf-8")
    print(f"écrit : {out} ({len(html)/1024:.1f} Ko) — {len(SECTIONS)} chapitres, "
          f"{sum(len(v) for v in QUIZ.values())} QCM, {len(FLASH)} flashcards")


if __name__ == "__main__":
    build()
