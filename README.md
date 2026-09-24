# Culture Quiz

## Fonctionnement

Application de quiz en **React et TypeScript**, adaptée au mobile. Le joueur choisit une catégorie et répond à **10 questions**, avec **4 propositions** et **30 secondes par question**. Une correction verte ou rouge apparaît après chaque réponse, puis le score est affiché à la fin.

Les questions et catégories sont récupérées depuis le **back Laravel fourni par le professeur**, connecté à MySQL.

## Lancement

Prérequis : Node.js 22.12+ ou 24+, PHP, Composer et MySQL.

### 1. Back

Démarrer MySQL (avec Wamp, par exemple). Pour une première installation, créer une base vide `culturequizz` et importer `docs/culturequizz-complet.sql` avec phpMyAdmin. Ne pas importer cet export dans une base à conserver : il remplace les tables.

Depuis la racine du projet, dans PowerShell :

```powershell
cd back
composer install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Configurer la connexion MySQL dans `back/.env` (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`). Si `APP_KEY` est vide, lancer `php artisan key:generate`, puis :

```powershell
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Front

Dans un deuxième terminal, depuis la racine du projet :

```powershell
cd front
npm ci
npm run dev
```

Ouvrir **http://127.0.0.1:5173** et laisser les deux serveurs démarrés.

## Répartition des rôles

À compléter avec les noms et les tâches réellement réalisées :

| Missions | Membre responsable |
| --- | --- |
| Interface, design et adaptation mobile | À compléter |
| Logique du quiz, chronomètre et score | À compléter |
| Connexion à l’API et tests | À compléter |
| Documentation et présentation orale | À compléter |
