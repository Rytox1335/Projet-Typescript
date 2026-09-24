# Préparer la présentation (20 minutes)

## Déroulé proposé

1. **Objectif et démonstration rapide — 2 min.** Accueil, catégorie, réponse correcte, réponse incorrecte et score. Expliquer les 10 questions et les 30 secondes.
2. **Choix graphiques — 2 min.** Fond crème, bleu nuit, contraste, logo en bulle avec point d’interrogation. Manrope pour les titres, DM Sans pour le texte, polices système en secours. Mise en page à une colonne sur mobile, boutons larges, choix sur deux colonnes sur grand écran. Les couleurs de correction sont accompagnées de symboles et d’un texte.
3. **API et stockage — 3 min.** PHP/Laravel est le choix du back fourni par le professeur. Montrer les deux routes GET utilisées, les contrôleurs et les modèles Eloquent. MySQL stocke les catégories et questions. Chaque question contient dix réponses et le nom de sa catégorie. `reponse1` est la bonne réponse, convention visible dans le formulaire Laravel. Expliquer les migrations et l’export SQL.
4. **Architecture React/TypeScript — 3 min.** Présenter les quatre pages, React Router, les composants réutilisables, les types `Question`, `Round`, `Answer`, `Result` et la séparation des requêtes et des règles du jeu.
5. **Lecture de code — 4 min.** Montrer `prepareQuiz` : filtrage, choix sans doublons, mélange Fisher-Yates, bonne réponse toujours incluse. Puis le timer de `Quiz.tsx` : échéance absolue, verrouillage avec une référence, nettoyage des intervalles et délais, transition vers le score.
6. **Vérifications et difficultés techniques — 3 min.** Présenter les cas effectivement rencontrés : export fourni vide, contrat de bonne réponse à identifier, prévention des clics multiples, onglet en arrière-plan, erreurs réseau. Montrer les tests et distinguer tests HTTP simulés et test manuel avec Laravel.
7. **Démonstration complète et répartition — 3 min.** Afficher le bilan et la correction. Présenter les contributions réelles des membres du groupe.

## Répartition à compléter avec les contributions réelles

| Membre | Missions réalisées | Fichiers ou éléments à expliquer |
| --- | --- | --- |
| À compléter | À compléter | À compléter |
| À compléter | À compléter | À compléter |

Ne pas inventer une répartition : chaque membre doit comprendre le code qu’il présente et pouvoir expliquer les outils et aides utilisés.

## Vérification avant le rendu

- Démarrer MySQL, Laravel et Vite selon le README et faire une partie complète avec la véritable API.
- Vérifier les trois catégories sur téléphone et ordinateur.
- Tester une expiration de 30 secondes, une erreur et une bonne réponse.
- Exécuter la compilation et les tests.
- Vérifier qu’aucun `.env`, mot de passe ou dossier de dépendances n’est ajouté au dépôt.
- Joindre `docs/culturequizz-complet.sql`, le lien GitHub et la répartition du groupe.
- Préparer la démonstration locale avant l’oral ; les polices distantes ont des polices de secours si le réseau n’est pas disponible.

## Limites à savoir expliquer

Le calcul du score est côté client et les bonnes réponses sont présentes dans l’API fournie. C’est suffisant pour le quiz pédagogique demandé ; un classement compétitif demanderait une validation serveur. Les scores ne sont pas enregistrés. Les routes d’administration du back sont celles du professeur ; le travail porte sur le front et l’initialisation des données.
