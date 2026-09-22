export type Answer = { id: number; text: string; isCorrect: boolean };
export type Question = { id: number; categoryId: number; text: string; answers: Answer[] };
export type Category = { id: number; name: string };
