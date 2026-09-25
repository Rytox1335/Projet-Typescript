# Guide de remplacement des images

Audit du 25 septembre 2026, limité à `front/`, réalisé avant modification de la typographie.

## Conclusion

**Aucun fichier image n'est utilisé par l'application actuelle.** Il n'y a ni dossier `public/`, ni dossier `src/assets/`, ni photographie, ni illustration de catégorie à remplacer par simple échange de fichier. Le seul visuel vectoriel est le logo SVG intégré dans `src/components/Logo.tsx`, réutilisé à deux tailles.

Aucune image n'a été remplacée, renommée ou supprimée. Aucun chemin, ratio ou composant d'image n'a été modifié. Ajouter des images aux catégories ou remplacer le logo par un fichier nécessiterait une intervention ultérieure dans les composants ; ce n'est pas un remplacement de fichier déjà prévu par l'interface.

## Inventaire des visuels réellement utilisés

Les chemins ci-dessous sont relatifs à `front/`. Les dimensions d'affichage sont en pixels CSS. Un SVG n'a pas de dimensions matricielles en pixels : son `viewBox` définit des coordonnées vectorielles.

| Image actuelle | Chemin exact | Utilisée dans | Taille actuelle | Affichage | Ratio | Remplacement recommandé | Format | Remarques |
|---|---|---|---|---|---|---|---|---|
| Logo intégré, variante navigation | `src/components/Logo.tsx` | `src/App.tsx`, toutes les pages | Pas de fichier image ; `viewBox="0 0 100 100"` | 34 × 34 px, mobile et desktop | 1:1 | SVG avec `viewBox` 100 × 100 ; export raster éventuel 68 × 68 px, minimum 34 × 34 px | SVG | Fond transparent, couleur héritée, aucun fichier interchangeable |
| Même logo, variante accueil | `src/components/Logo.tsx` | `src/pages/Home.tsx`, `<Logo large />` | Même dessin vectoriel 100 × 100 unités | 64 × 64 px, mobile et desktop | 1:1 | Même SVG ; export raster éventuel 128 × 128 px, minimum 64 × 64 px | SVG | Fond transparent ; un seul dessin couvre les deux usages |

Les recommandations raster correspondent à deux pixels image par pixel CSS (densité 2×). Un unique export transparent de 128 × 128 px suffirait aux deux tailles à cette densité, mais son branchement n'existe pas actuellement. Pour une densité 3×, l'export couvrant le plus grand affichage serait de 192 × 192 px. Le SVG reste préférable et indépendant de la densité.

## Logo Culture Quiz

- **Nom du fichier image :** aucun ; le composant source est `Logo.tsx`.
- **Chemin complet :** `front/src/components/Logo.tsx`.
- **Construction :** un SVG intégré, trois chemins et un cercle ; aucun `<image>`, aucune ressource externe.
- **Dimensions intrinsèques :** aucune dimension bitmap ; `viewBox="0 0 100 100"`, sans attributs `width` ou `height` sur le SVG.
- **CSS :** `front/src/styles.css`, sélecteurs `.logo` et `.logo-large`.
- **Navigation :** `width: 34px; height: 34px; flex-shrink: 0`.
- **Accueil :** `width: 64px; height: 64px; color: #2465a8` ; conserve `flex-shrink: 0`.
- **Ratio affiché :** 1:1 dans les deux cas ; aucune déclaration CSS `aspect-ratio`.
- **Object-fit :** aucune déclaration ; valeur calculée `fill`, qui ne pilote pas le cadrage du dessin SVG intégré. Le `viewBox` et le comportement SVG par défaut `preserveAspectRatio="xMidYMid meet"` conservent les proportions.
- **Background-size :** sans objet ; aucune image de fond.
- **Overflow :** aucune déclaration spécifique ; Chromium calcule `hidden` pour le SVG intégré. Conserver les tracés dans le `viewBox`, marges et épaisseur des traits comprises.
- **Responsive :** aucun changement de taille aux seuils 480, 768 ou 1100 px. Le header peut passer sur plusieurs lignes, mais le logo ne rétrécit pas.
- **Transparence :** nécessaire pour conserver les fonds actuels. Le SVG a `fill="none"`, avec traits et cercle utilisant `currentColor` ; blanc dans le header et bleu sur l'accueil.
- **Création recommandée :** un dessin carré, simple et lisible à 34 px, sans texte fin ni fond opaque ; garder `currentColor` pour les deux variantes de couleur. Conserver les marges internes pour ne pas changer la taille visuelle du symbole.
- **Format :** SVG. PNG transparent ou WebP avec alpha uniquement pour un export bitmap ultérieur ; JPEG inadapté à la transparence.

## Catégories : des bandeaux CSS, pas des images

`front/src/pages/Categories.tsx` produit la même décoration pour chaque catégorie : un `?` encadré et le texte `Quiz`, dans `.category-banner`. Les noms de catégories sont affichés en texte. Aucune référence d'illustration dynamique n'est construite ou affichée.

Les glyphes `?`, flèches, lettres de réponse, coches, croix et signe d'ouverture de la correction sont du texte, pas des fichiers image. Les barres de temps et points de progression sont également dessinés en CSS.

### Dimensions exactes du bandeau existant

- Hauteur extérieure : **86 px**, incluant la bordure inférieure de 1 px, car `box-sizing: border-box` est global.
- Largeur : toute la largeur intérieure de la carte, dont les bordures latérales font chacune 1 px.
- Conteneur `.content` : largeur `100%`, maximum 1160 px, padding horizontal de 16 px avant 768 px, puis 24 px.
- Grille `.categories` : espace de 16 px ; une colonne avant 480 px, deux de 480 à moins de 768 px, trois de 768 à moins de 1100 px, quatre à partir de 1100 px.
- Si `V` est la largeur du viewport en pixels CSS, `P` le padding et `N` le nombre de colonnes, la largeur exacte du bandeau est : **`(min(V, 1160) - 2P - 16(N - 1)) / N - 2`**.
- Exemples : viewport 320 px → bandeau **286 × 86 px** ; 375 px → **341 × 86 px** ; 768 px → **(682/3) × 86 px** ; 1440 px → **264 × 86 px**. Les fractions évitent les arrondis approximatifs.
- Le cadre du `?` fait **40 × 40 px**, bordures de 2 px comprises ; police 28 px et interligne hérité 1,5. Ce cadre ne décrit pas les dimensions d'un fichier image.
- `.category` applique `overflow: hidden` et un rayon de 8 px. Le bandeau utilise flexbox, centrage dans les deux axes et `gap: 12px`.
- Aucun `object-fit`, `aspect-ratio`, `background-image` ou `background-size` n'est défini pour les bandeaux. Leur fond est une couleur unie, avec variantes `nth-child`.

**Ratio : variable selon le viewport**, puisque la hauteur reste fixe et la largeur change. Il n'existe donc pas de ratio d'image de remplacement, de minimum bitmap ou de format à recommander pour ces bandeaux dans l'implémentation actuelle. Préparer une image 16:9 en supposant qu'elle sera interchangeable serait incorrect. Une future intégration devra d'abord définir le cadrage et le comportement responsive souhaités.

## Étendue de la recherche

- Inventaire récursif des fichiers, y compris fichiers cachés et ignorés, ressources générées et dépendances.
- Recherche des extensions PNG, JPG, JPEG, WebP, SVG, AVIF, GIF et ICO.
- Lecture des composants React, du point d'entrée, du HTML, de toute la feuille CSS et du code frontend construisant les données affichées.
- Vérification des imports, `<img>`, SVG, ressources de fond CSS, chemins ou URL dynamiques et ressources externes : seul le SVG intégré décrit ci-dessus est utilisé. Aucun import de police web, `@font-face`, `letter-spacing` ou `text-transform: uppercase` dans l'interface actuelle.
- `dist/` contient le HTML et les bundles JS/CSS générés : aucune image autonome. Le SVG compilé dans le JS est le même logo, pas un second original à remplacer.
- Les fichiers et données du backend n'ont pas été inspectés ou modifiés pour cet audit. Le frontend n'affiche aucun champ comme source d'image.

## Images présentes mais inutilisées par l'application

### Captures de tests déjà présentes avant l'audit

21 PNG présents, tous sans référence dans l'application :

- `front/test-results/quiz-mise-en-page-mobile-et-ordinateur/accueil-{375,768,1440}.png`
- `front/test-results/quiz-mise-en-page-mobile-et-ordinateur/categories-{375,768,1440}.png`
- `front/test-results/quiz-mise-en-page-mobile-et-ordinateur/quiz-{375,768,1440}.png`
- `front/test-results/live/accueil-{375,768,1440}.png`
- `front/test-results/live/categories-{375,768,1440}.png`
- `front/test-results/live/quiz-{375,768,1440}.png`
- `front/test-results/live/resultats-{375,768,1440}.png`

Les accolades représentent exactement les trois fichiers nommés avec ces largeurs. Ces captures pourraient être nettoyées comme artefacts de test si elles ne sont plus utiles ; **elles ont été conservées**. Aucun doublon binaire parmi ces 21 captures, d'après comparaison SHA-256. Des captures de pages similaires ne sont pas nécessairement des fichiers identiques.

La validation de cette tâche écrit séparément ses captures et mesures dans `front/test-results/typography-validation/`, sans réutiliser les chemins des captures précédentes. Elles ne sont pas des images à préparer pour le site.

### Ressources des outils dans node_modules

Neuf fichiers image trouvés sous `front/node_modules/playwright-core/lib/` :

- `vite/traceViewer/playwright-logo.svg`
- `vite/recorder/playwright-logo.svg`
- `vite/dashboard/playwright-logo.svg`
- `vite/dashboard/assets/safari-na3_-uQk.svg`
- `vite/dashboard/assets/firefox-nightly-Cp5nfeDT.svg`
- `vite/dashboard/assets/firefox-beta-k3eOH_eK.svg`
- `vite/dashboard/assets/firefox-1bWoP6pv.svg`
- `tools/dashboard/appIcon.png`
- `server/chromium/appIcon.png`

Ces ressources appartiennent aux outils Playwright ; elles ne sont pas importées par l'application. Les logos `traceViewer` et `recorder` sont identiques selon SHA-256. Ne pas supprimer individuellement les ressources d'une dépendance installée.

### Ancien design

Aucun fichier image orphelin d'un ancien design identifié dans le frontend applicatif actuel. Les captures de tests ne constituent pas une bibliothèque d'anciens assets. L'historique Git n'a pas été utilisé pour attribuer une origine historique non démontrable aux fichiers présents.

## Typographie et validation

La pile `Arial, Helvetica, sans-serif` était déjà définie sur `:root`. Les titres, paragraphes, liens, catégories, score, timer et navigation en héritent ; les boutons avaient déjà `font: inherit`. La seule modification typographique ajoute `font-family: inherit` à `input`, `textarea`, `select` et `optgroup` dans `front/src/styles.css`, afin de couvrir les contrôles de formulaire. Aucun import de police web à supprimer. Aucune modification des dimensions, espacements, ratios ou logique du quiz.

- `npm run build` : compilation TypeScript et build Vite réussis.
- `npm test` : 4 tests unitaires réussis.
- `npm run test:e2e -- --output=test-results/typography-validation` : 4 tests Playwright réussis, incluant parcours complet, score, correction, expiration du timer et erreurs simulées.
- Ces tests utilisent des réponses interceptées dans le navigateur, sans appel au backend réel ni modification de données.
- Vérification complémentaire du build dans Chromium : accueil, catégories, quiz et résultats avec correction ouverte, aux largeurs **320, 375, 479, 480, 767, 768, 1099, 1100 et 1440 px**, soit **36 combinaisons**. Aucun débordement horizontal de page ni contenu masqué détecté ; pile Arial/Helvetica calculée sur tous les éléments HTML visibles. Les huit cartes simulées restent alignées et mesurent toutes 219 px de haut à chaque largeur testée. Dimensions des logos confirmées à 34 × 34 et 64 × 64 px. Captures représentatives examinées visuellement : titres lisibles, boutons correctement dimensionnés et pages mobiles utilisables. Mesures enregistrées dans `front/test-results/typography-validation/layout-audit.json`. Ces constats concernent les contenus de test, pas tous les contenus possibles du serveur réel.
- Les premières tentatives ont rencontré une restriction de lecture d'esbuild dans la sandbox ; les mêmes commandes ont réussi avec l'autorisation d'exécution hors sandbox.

## IMAGES À PRÉPARER

**Aucun fichier image à remplacer directement dans le frontend actuel.**

Seul visuel éventuellement à redessiner : **Logo Culture Quiz**.

- Taille recommandée : dessin vectoriel avec `viewBox` **100 × 100 unités** ; export bitmap facultatif **128 × 128 px** pour couvrir les deux usages à 2×.
- Ratio : **1:1**.
- Format : **SVG**, fond transparent, couleurs via `currentColor`.
- Usage : navigation **34 × 34 px**, accueil **64 × 64 px**.
- Intégration ultérieure : le dessin est actuellement dans `Logo.tsx` ; aucun fichier SVG autonome à échanger. Rien n'a été remplacé à cette étape.
