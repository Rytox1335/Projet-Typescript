import axios from 'axios';
import { ApiCategory, ApiQuestion, FormattedQuestion } from '../types/quiz';

// URL du backend Laravel (modifiable via .env VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000
});

/**
 * Algorithme Fisher-Yates pour mélanger les 4 propositions
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Transforme un objet ApiQuestion Laravel en FormattedQuestion avec 4 choix (1 vrai + 3 faux) mélangés.
 */
function formatQuestion(q: ApiQuestion): FormattedQuestion {
  const correctAnswer = q.reponse1 ? q.reponse1.trim() : '';

  // Récupération de tous les distracteurs possibles (reponse2 à reponse10)
  const distractors = [
    q.reponse2, q.reponse3, q.reponse4, q.reponse5,
    q.reponse6, q.reponse7, q.reponse8, q.reponse9, q.reponse10
  ]
    .filter((rep): rep is string => Boolean(rep && rep.trim().length > 0))
    .map(rep => rep.trim())
    .filter(rep => rep.toLowerCase() !== correctAnswer.toLowerCase());

  // Inscrire 3 distracteurs au hasard
  const selectedDistractors = shuffleArray(Array.from(new Set(distractors))).slice(0, 3);

  // Sécurité si l'API contient moins de 3 distracteurs
  while (selectedDistractors.length < 3) {
    const fallbackVal = `Option ${selectedDistractors.length + 2}`;
    if (!selectedDistractors.includes(fallbackVal) && fallbackVal !== correctAnswer) {
      selectedDistractors.push(fallbackVal);
    }
  }

  // Mélanger la bonne réponse avec les 3 distracteurs
  const options = shuffleArray([correctAnswer, ...selectedDistractors]);

  return {
    id: q.id,
    categorie: q.categorie,
    questionText: q.question,
    correctAnswer,
    options
  };
}

/**
 * Récupère les catégories depuis GET /api/categories
 */
export async function getCategories(): Promise<ApiCategory[]> {
  try {
    const response = await apiClient.get<ApiCategory[]>('/categories');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return getFallbackCategories();
  } catch (error) {
    console.warn('Backend Laravel non connecté, utilisation des catégories de démonstration:', error);
    return getFallbackCategories();
  }
}

/**
 * Récupère 10 questions pour une catégorie spécifique depuis GET /api/questions
 */
export async function getQuestions(categoryName: string): Promise<FormattedQuestion[]> {
  try {
    const response = await apiClient.get<ApiQuestion[]>('/questions');
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Filtrer par le champ categorie
      const filtered = response.data.filter(
        q => q.categorie.trim().toLowerCase() === categoryName.trim().toLowerCase()
      );

      const questionsToUse = filtered.length > 0 ? filtered : response.data;
      const formatted = questionsToUse.map(formatQuestion);
      
      // Mélanger et prendre 10 questions
      return shuffleArray(formatted).slice(0, 10);
    }
    return getFallbackQuestions(categoryName);
  } catch (error) {
    console.warn('Backend Laravel non connecté, utilisation des questions de démonstration:', error);
    return getFallbackQuestions(categoryName);
  }
}

// ============================================================================
// Fallback Data pour démo offline ou première exécution avant import SQL
// ============================================================================
function getFallbackCategories(): ApiCategory[] {
  return [
    { id: 1, categorie: 'Histoire' },
    { id: 2, categorie: 'Géographie' },
    { id: 3, categorie: 'Sciences' },
    { id: 4, categorie: 'Arts & Littérature' },
    { id: 5, categorie: 'Cinéma & Pop Culture' }
  ];
}

function getFallbackQuestions(categoryName: string): FormattedQuestion[] {
  const fallbackDb: Record<string, ApiQuestion[]> = {
    'Histoire': [
      { id: 1, categorie: 'Histoire', question: 'En quelle année a eu lieu la Révolution Française ?', reponse1: '1789', reponse2: '1799', reponse3: '1776', reponse4: '1815' },
      { id: 2, categorie: 'Histoire', question: 'Qui était le premier empereur de Rome ?', reponse1: 'Auguste', reponse2: 'Jules César', reponse3: 'Néron', reponse4: 'Caligula' },
      { id: 3, categorie: 'Histoire', question: 'En quelle année s’est terminée la Seconde Guerre mondiale ?', reponse1: '1945', reponse2: '1939', reponse3: '1918', reponse4: '1950' },
      { id: 4, categorie: 'Histoire', question: 'Quel roi de France était surnommé le Roi-Soleil ?', reponse1: 'Louis XIV', reponse2: 'Louis XVI', reponse3: 'Henri IV', reponse4: 'François Ier' },
      { id: 5, categorie: 'Histoire', question: 'Où la bataille de Waterloo a-t-elle eu lieu ?', reponse1: 'En Belgique', reponse2: 'En France', reponse3: 'En Allemagne', reponse4: 'Au Royaume-Uni' },
      { id: 6, categorie: 'Histoire', question: 'En quelle année le mur de Berlin est-il tombé ?', reponse1: '1989', reponse2: '1991', reponse3: '1975', reponse4: '1961' },
      { id: 7, categorie: 'Histoire', question: 'Qui a découvert l’Amérique en 1492 ?', reponse1: 'Christophe Colomb', reponse2: 'Vasco de Gama', reponse3: 'Amerigo Vespucci', reponse4: 'Magellan' },
      { id: 8, categorie: 'Histoire', question: 'Quelle civilisation a construit les pyramides de Gizeh ?', reponse1: 'Les Égyptiens', reponse2: 'Les Mayas', reponse3: 'Les Grecs', reponse4: 'Les Romains' },
      { id: 9, categorie: 'Histoire', question: 'En quelle année l’homme a-t-il marché sur la Lune ?', reponse1: '1969', reponse2: '1959', reponse3: '1972', reponse4: '1965' },
      { id: 10, categorie: 'Histoire', question: 'Qui a rédigé la Déclaration des Droits de l’Homme et du Citoyen en 1789 ?', reponse1: 'L’Assemblée Constituante', reponse2: 'Napoléon', reponse3: 'Voltaire', reponse4: 'Rousseau' }
    ]
  };

  const defaultList = fallbackDb[categoryName] || fallbackDb['Histoire'];
  return shuffleArray(defaultList.map(formatQuestion)).slice(0, 10);
}
