import { Router } from "express";
import { categories } from "../data/categories.js";
import { questions } from "../data/questions.js";
const router = Router();
const shuffle = <T>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
router.get("/categories", (_req, res) => res.json(categories));
router.get("/categories/:id/questions", (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categories.some(c => c.id === categoryId)) return res.status(404).json({ message: "Catégorie introuvable" });
  res.json(questions.filter(q => q.categoryId === categoryId));
});
router.get("/quiz/:categoryId", (req, res) => {
  const categoryId = Number(req.params.categoryId);
  if (!categories.some(c => c.id === categoryId)) return res.status(404).json({ message: "Catégorie introuvable" });
  const quiz = shuffle(questions.filter(q => q.categoryId === categoryId)).slice(0, 10).map(q => {
    const correct = q.answers.find(a => a.isCorrect)!;
    const wrong = shuffle(q.answers.filter(a => !a.isCorrect)).slice(0, 3);
    return { id: q.id, categoryId: q.categoryId, text: q.text, answers: shuffle([correct, ...wrong]) };
  });
  res.json(quiz);
});
router.get("/questions/:id", (req, res) => {
  const question = questions.find(q => q.id === Number(req.params.id));
  if (!question) return res.status(404).json({ message: "Question introuvable" });
  res.json(question);
});
export default router;
