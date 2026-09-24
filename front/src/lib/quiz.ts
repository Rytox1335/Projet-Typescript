export const QUESTION_COUNT = 10;
export const QUESTION_SECONDS = 30;
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

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function prepareQuiz(questions: Question[], category: string): Round[] {
  const eligible = questions
    .filter((q) => q.categorie === category)
    .map((q) => {
      const correct = q.reponse1.trim();
      const wrong = [
        ...new Set(
          Array.from({ length: 9 }, (_, i) =>
            String(q[`reponse${i + 2}`] ?? "").trim(),
          ),
        ),
      ].filter((a) => a && a !== correct);
      return { q, correct, wrong };
    })
    .filter(
      ({ q, correct, wrong }) =>
        q.question.trim() && correct && wrong.length >= 3,
    );
  if (eligible.length < QUESTION_COUNT)
    throw new Error(
      `Cette catégorie contient ${eligible.length} questions jouables. Il en faut au moins 10 pour commencer.`,
    );
  return shuffle(eligible)
    .slice(0, QUESTION_COUNT)
    .map(({ q, correct, wrong }) => ({
      id: q.id,
      title: q.question,
      correct,
      choices: shuffle([correct, ...shuffle(wrong).slice(0, 3)]),
    }));
}

export function score(answers: Answer[]): number {
  return answers.filter((a) => a.selected === a.round.correct).length;
}
