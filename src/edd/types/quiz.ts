/**
 * Types TypeScript s'adaptant à la structure exacte du backend Laravel
 */

/**
 * Endpoint: GET /api/categories
 */
export interface ApiCategory {
  id: number;
  categorie: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Endpoint: GET /api/questions
 * Remarque : reponse1 est toujours la BONNE réponse dans la base Laravel.
 */
export interface ApiQuestion {
  id: number;
  categorie: string;
  question: string;
  reponse1: string;
  reponse2: string;
  reponse3: string;
  reponse4: string;
  reponse5?: string;
  reponse6?: string;
  reponse7?: string;
  reponse8?: string;
  reponse9?: string;
  reponse10?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Formatage interne de la question pour le quiz frontend :
 * Contient l'intitulé, la bonne réponse et 4 options mélangées.
 */
export interface FormattedQuestion {
  id: number;
  categorie: string;
  questionText: string;
  correctAnswer: string;
  options: string[]; // Exactement 4 propositions mélangées
}

/**
 * Structure de l'état des résultats transmis à la page Results
 */
export interface QuizResultState {
  score: number;
  totalQuestions: number;
  category: string;
}
