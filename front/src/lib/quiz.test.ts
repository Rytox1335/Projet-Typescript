import { describe, expect, it } from "vitest";
import { preparerQuiz, calculerScore, melanger } from "./quiz";
import type { Question } from "./quiz";

const questions: Question[] = Array.from({ length: 14 }, (_, identifiant) => ({
  id: identifiant,
  categorie: "Histoire",
  question: `Question ${identifiant}`,
  reponse1: "Bonne",
  ...Object.fromEntries(
    Array.from({ length: 9 }, (_, indice) => [`reponse${indice + 2}`, `Fausse ${indice}`]),
  ),
}));
describe("Une partie conforme aux règles", () => {
  it("choisit dix questions distinctes avec quatre réponses uniques dont la bonne", () => {
    for (let tentative = 0; tentative < 30; tentative++) {
      const manches = preparerQuiz(questions, "Histoire");
      expect(manches).toHaveLength(10);
      expect(new Set(manches.map((manche) => manche.id)).size).toBe(10);
      manches.forEach((manche) => {
        expect(new Set(manche.choices).size).toBe(4);
        expect(manche.choices).toContain(manche.correct);
      });
    }
  });
  it("refuse une catégorie absente ou insuffisante", () => {
    expect(() => preparerQuiz(questions, "Sport")).toThrow("au moins 10");
    expect(() => preparerQuiz(questions.slice(0, 9), "Histoire")).toThrow(
      "au moins 10",
    );
  });
  it("écarte les questions sans assez de choix distincts", () => {
    expect(() =>
      preparerQuiz(
        questions.map((questionDonnee) => ({
          ...questionDonnee,
          ...Object.fromEntries(
            Array.from({ length: 9 }, (_, indice) => [`reponse${indice + 2}`, "Bonne"]),
          ),
        })),
        "Histoire",
      ),
    ).toThrow("0 questions");
  });
  it("ne modifie pas les données de départ et compte uniquement les réponses correctes", () => {
    const donneesInitiales = [...questions];
    melanger(questions);
    expect(questions).toEqual(donneesInitiales);
    const manche = preparerQuiz(questions, "Histoire")[0];
    expect(
      calculerScore([
        { round: manche, selected: "Bonne" },
        { round: manche, selected: "Fausse" },
        { round: manche, selected: null },
      ]),
    ).toBe(1);
  });
});
