#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère biochimie.html : page unique (autonome) de révision de la biochimie
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
<p class="hint">Le professeur a annoncé que certaines parties tomberaient. Elles sont toutes traitées ici, et
signalées par le repère « annoncé ».</p>
<div class="tw"><table>
<tr><th>Partie</th><th>Ce qu'on doit savoir faire</th><th>Où</th></tr>
<tr><td><b>Filiation de Keller et Kiliani</b></td><td>Construire l'arbre des oses, définir un épimère, placer mannose / allose / galactose</td><td><a href="#c1">Chapitre 1</a></td></tr>
<tr><td><b>Cyclisation du glucose</b></td><td>Expliquer la formation de l'hémiacétal, distinguer α et β, justifier 36 / 63 / 0,1 %</td><td><a href="#c2">Chapitre 2</a></td></tr>
<tr><td><b>Cyclisation du fructose</b></td><td>Justifier le <b>furanose</b> et le carbone anomérique en <b>C2</b></td><td><a href="#c3">Chapitre 3</a></td></tr>
<tr><td><b>Propriétés physiques</b></td><td>Solubilité, saveur, pouvoir rotatoire, mutarotation</td><td><a href="#c4">Chapitre 4</a></td></tr>
<tr><td><b>Propriétés chimiques</b></td><td>Ce que donne C1, C6 et les alcools secondaires (acides, sorbitol, G6P, glucosamine)</td><td><a href="#c5">Chapitre 5</a></td></tr>
<tr><td><b>Classification des osides</b></td><td>Holoside / hétéroside, oligo / polyoside, homopolyoside / hétéropolyoside, l'aglycone</td><td><a href="#c6">Chapitre 6</a></td></tr>
<tr><td><b>Le lactose</b></td><td>Nom complet, liaison, enzyme, réductibilité — la question 11</td><td><a href="#c7">Chapitre 7</a></td></tr>
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
<tr><td><b>S11</b></td><td>GAG, MPS, protéoglycanes</td><td>diapos 53-62</td></tr>
<tr><td><b>S12</b></td><td>Annales chronométrées et révision des 7 parties annoncées</td><td>annales</td></tr>
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
<a href="https://drive.google.com/file/d/1BiccimeNgxSkb3GxU9rsFyD6uuC07KZj/view" target="_blank" rel="noopener">QCM Chimie-Biochimie</a>
</div>

<h3>Sur ce site</h3>
<div class="vids real">
<a href="cours/biochimie-structurale-plan.html">Plan du module (12 séances)</a>
<a href="cours/biochimie-structurale.html">Cours expliqué — Pr. Khlil</a>
<a href="cours/plan-biochimie-structurale.pdf" target="_blank" rel="noopener">Plan en PDF — 2 pages</a>
<a href="portail.html">Portail complet du S1</a>
</div>

<div class="box tip"><b class="t">Comment utiliser cette page la veille</b>
Relis le <a href="#g0">guide</a>, les <b>7 parties annoncées</b>, puis fais l'examen blanc et les flashcards.
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
    <div class="kpi"><b>8</b><span>chapitres</span></div>
    <div class="kpi"><b id="nq">0</b><span>QCM d'entraînement</span></div>
    <div class="kpi"><b id="nf">0</b><span>flashcards</span></div>
    <div class="kpi"><b>1</b><span>examen blanc</span></div>
  </div>
  <div class="chips">
    <span class="chip">7 parties annoncées</span><span class="chip">Schémas du diaporama</span>
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
<meta name="description" content="Cours complet de biochimie structurale (1ère année Médecine Dentaire, FMDC Casablanca) : oses, cyclisation, propriétés physiques et chimiques, osides, disaccharides, polyosides et GAG, avec QCM corrigés, flashcards et examen blanc.">
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
    out = ROOT / "biochimie.html"
    out.write_text(html, encoding="utf-8")
    print(f"écrit : {out} ({len(html)/1024:.1f} Ko) — {len(SECTIONS)} chapitres, "
          f"{sum(len(v) for v in QUIZ.values())} QCM, {len(FLASH)} flashcards")


if __name__ == "__main__":
    build()
