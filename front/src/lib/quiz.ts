export const NOMBRE_QUESTIONS = 10;
export const DUREE_QUESTION_SECONDES = 30;
export interface Category {
  id: number;
  categorie: string;
}
export interface Question {
  id: number;
  categorie: string;
  question: string;
  reponse1: string;
  [key: string]: string | number;
}
export interface Round {
  id: number;
  title: string;
  correct: string;
  choices: string[];
}
export interface Answer {
  round: Round;
  selected: string | null;
}
export interface Result {
  category: string;
  answers: Answer[];
}

export function melanger<T>(elements: readonly T[]): T[] {
  const elementsMelanges = [...elements];
  for (let indice = elementsMelanges.length - 1; indice > 0; indice--) {
    const autreIndice = Math.floor(Math.random() * (indice + 1));
    [elementsMelanges[indice], elementsMelanges[autreIndice]] = [elementsMelanges[autreIndice], elementsMelanges[indice]];
  }
  return elementsMelanges;
}

export function preparerQuiz(questions: Question[], categorie: string): Round[] {
  const questionsAdmissibles = questions
    .filter((questionDonnee) => questionDonnee.categorie === categorie)
    .map((questionDonnee) => {
      const bonneReponse = questionDonnee.reponse1.trim();
      const mauvaisesReponses = [
        ...new Set(
          Array.from({ length: 9 }, (_, indice) =>
            String(questionDonnee[`reponse${indice + 2}`] ?? "").trim(),
          ),
        ),
      ].filter((reponse) => reponse && reponse !== bonneReponse);
      return { questionDonnee, bonneReponse, mauvaisesReponses };
    })
    .filter(
      ({ questionDonnee, bonneReponse, mauvaisesReponses }) =>
        questionDonnee.question.trim() && bonneReponse && mauvaisesReponses.length >= 3,
    );
  if (questionsAdmissibles.length < NOMBRE_QUESTIONS)
    throw new Error(
      `Cette catégorie contient ${questionsAdmissibles.length} questions jouables. Il en faut au moins 10 pour commencer.`,
    );
  return melanger(questionsAdmissibles)
    .slice(0, NOMBRE_QUESTIONS)
    .map(({ questionDonnee, bonneReponse, mauvaisesReponses }) => ({
      id: questionDonnee.id,
      title: questionDonnee.question,
      correct: bonneReponse,
      choices: melanger([bonneReponse, ...melanger(mauvaisesReponses).slice(0, 3)]),
    }));
}

export function calculerScore(reponses: Answer[]): number {
  return reponses.filter((reponse) => reponse.selected === reponse.round.correct).length;
}
