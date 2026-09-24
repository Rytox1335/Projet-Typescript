import { describe, expect, it } from "vitest";
import { prepareQuiz, score, shuffle } from "./quiz";
import type { Question } from "./quiz";

const questions: Question[] = Array.from({ length: 14 }, (_, id) => ({
  id,
  categorie: "Histoire",
  question: `Question ${id}`,
  reponse1: "Bonne",
  ...Object.fromEntries(
    Array.from({ length: 9 }, (_, i) => [`reponse${i + 2}`, `Fausse ${i}`]),
  ),
}));
describe("Une partie conforme aux règles", () => {
  it("choisit dix questions distinctes avec quatre réponses uniques dont la bonne", () => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const rounds = prepareQuiz(questions, "Histoire");
      expect(rounds).toHaveLength(10);
      expect(new Set(rounds.map((r) => r.id)).size).toBe(10);
      rounds.forEach((r) => {
        expect(new Set(r.choices).size).toBe(4);
        expect(r.choices).toContain(r.correct);
      });
    }
  });
  it("refuse une catégorie absente ou insuffisante", () => {
    expect(() => prepareQuiz(questions, "Sport")).toThrow("au moins 10");
    expect(() => prepareQuiz(questions.slice(0, 9), "Histoire")).toThrow(
      "au moins 10",
    );
  });
  it("écarte les questions sans assez de choix distincts", () => {
    expect(() =>
      prepareQuiz(
        questions.map((q) => ({
          ...q,
          ...Object.fromEntries(
            Array.from({ length: 9 }, (_, i) => [`reponse${i + 2}`, "Bonne"]),
          ),
        })),
        "Histoire",
      ),
    ).toThrow("0 questions");
  });
  it("ne modifie pas les données de départ et compte uniquement les réponses correctes", () => {
    const original = [...questions];
    shuffle(questions);
    expect(questions).toEqual(original);
    const round = prepareQuiz(questions, "Histoire")[0];
    expect(
      score([
        { round, selected: "Bonne" },
        { round, selected: "Fausse" },
        { round, selected: null },
      ]),
    ).toBe(1);
  });
});
