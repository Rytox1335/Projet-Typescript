# Culture Quiz

Application de culture générale en **React et TypeScript**, conçue en priorité pour mobile et connectée au back Laravel fourni dans `back/`.

## Fonctionnalités

- Accueil avec logo SVG et titre Culture Quiz.
- Catégories chargées depuis l’API : Histoire, Géographie et Cinéma avec les données initiales.
- 10 questions distinctes, dans un ordre aléatoire.
- 4 propositions différentes tirées parmi les 10 réponses de chaque question ; `reponse1`, la bonne réponse selon le back fourni, est toujours incluse.
- 30 secondes par question ; passage automatique après expiration.
- Correction verte/rouge pendant 1,4 seconde et verrouillage des choix après réponse.
- Score sur 10, correction détaillée et possibilité de rejouer.
- Chargement, erreurs réseau, nouvel essai et catégories insuffisamment remplies gérés explicitement.

## Lancement local

Prérequis : Node.js 22.12+ ou 24+, npm, PHP compatible avec le `composer.lock` du back (projet Laravel 8), Composer et MySQL 8. Le front et le back se lancent dans deux terminaux différents.

Sur ce poste, PHP est installé avec Wamp mais n’est pas dans le PATH. Pour le rendre accessible dans le terminal courant : `$env:Path = 'C:\wamp64\bin\php\php8.0.30;' + $env:Path`. Démarrer MySQL depuis Wamp et installer Composer s’il n’est pas disponible.

### 1. Back Laravel

Créer une base MySQL vide nommée `culturequizz` avec un encodage `utf8mb4`. Depuis la racine du dépôt, sous PowerShell :

```powershell
cd back
composer install
Copy-Item .env.example .env
```

Dans `back/.env`, renseigner les paramètres locaux :

```dotenv
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=culturequizz
DB_USERNAME=root
DB_PASSWORD=
```

Puis lancer :

```powershell
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000
```

Le seeder ajoute 3 catégories et 30 questions (10 réponses par question). Il peut être relancé avec `php artisan db:seed` sans dupliquer ces questions. Les données sont dans `back/database/data/questions.json`.

**Alternative aux migrations :** importer `back/culturequizz-complet.sql` dans une base dédiée vide, avec phpMyAdmin ou le client MySQL, puis lancer le serveur. Cet export comprend le schéma et les données ; il remplace les tables du même nom. Ne pas exécuter les migrations après cet import : l’export d’origine ne contient pas leur historique. `back/culturequizz.sql` est conservé tel que fourni et ne contient que le schéma.

### 2. Front React

Dans un nouveau terminal, depuis la racine :

```powershell
cd front
npm ci
npm run dev
```

Ouvrir **http://127.0.0.1:5173**. Vite transmet `/api` à `http://127.0.0.1:8000`. Une autre API peut être définie avec `VITE_API_URL` dans `front/.env` (voir `.env.example`) ; relancer Vite après modification.

Pour tester sur un téléphone du même réseau : `npm run dev -- --host 0.0.0.0`, puis ouvrir l’adresse IP locale du PC sur le port 5173. Le proxy reste sur le PC et transmet les requêtes au back.

### Tests et compilation

```powershell
cd front
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Les tests unitaires vérifient le tirage, les doublons, les catégories insuffisantes et le score. Les tests navigateur couvrent une partie complète sur mobile, l’expiration du timer, les mauvaises réponses, le verrouillage des choix, les erreurs de l’API et le nouvel essai. Ils simulent les réponses HTTP de l’API ; ils ne valident pas l’exécution de Laravel/MySQL.

`npm run build` produit `front/dist`. En hébergement, configurer la redirection des routes front vers `index.html` et un proxy `/api` vers Laravel, ou fournir l’URL de l’API au moment du build. Le proxy de développement ne remplace pas la configuration de l’hébergement. Voir la [documentation de déploiement Vite](https://vite.dev/guide/static-deploy).

## Architecture

```text
front/src/
  pages/          Home, Categories, Quiz, Results
  components/     Logo, Feedback
  lib/api.ts      Requêtes HTTP, validation de format, messages d’erreur
  lib/quiz.ts     Types, mélange, préparation des parties, calcul du score
  App.tsx         Routes et dernier résultat en mémoire
  styles.css      Charte et styles mobile first
back/
  routes/api.php  Routes du professeur
  database/data/  Questions initiales
  database/seeders/QuizSeeder.php
  culturequizz-complet.sql
docs/
  presentation.md Guide pour préparer l’oral et le rendu
```

| Route front | Fonction |
| --- | --- |
| `/` | Accueil |
| `/categories` | Choix d’un thème |
| `/quiz/:category` | Partie de 10 questions |
| `/resultats` | Score et correction de la dernière partie |

| Endpoint utilisé | Données |
| --- | --- |
| `GET /api/categories` | Tableau `{ id, categorie, ... }` |
| `GET /api/questions` | Tableau `{ id, categorie, question, reponse1, ..., reponse10, ... }` |

Le front filtre les questions par nom de catégorie conformément au modèle existant. Les parties et scores restent en mémoire : recharger la page relance le quiz ; recharger les résultats renvoie aux catégories. Le PDF ne demande ni connexion ni sauvegarde des scores. Les endpoints de gestion fournis par le professeur ne sont pas utilisés par ce front.

## Rendu

Le dépôt contient l’export SQL demandé et un guide d’oral dans `docs/presentation.md`. Compléter la répartition réelle des tâches du groupe et fournir le lien du dépôt GitHub sur Moodle. Aucun envoi ou publication n’est automatisé.
