import type { Category, Question } from "./quiz";
const base = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function get(path: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(`${base}${path}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok)
    throw new Error(
      `L’API ne répond pas correctement (erreur ${response.status}). Réessayez dans un instant.`,
    );
  return response.json();
}
export async function getCategories(signal: AbortSignal): Promise<Category[]> {
  const data = await get("/categories", signal);
  if (
    !Array.isArray(data) ||
    !data.every(
      (c) => typeof c.id === "number" && typeof c.categorie === "string",
    )
  )
    throw new Error("Le format des catégories reçu est invalide.");
  return data;
}
export async function getQuestions(signal: AbortSignal): Promise<Question[]> {
  const data = await get("/questions", signal);
  if (
    !Array.isArray(data) ||
    !data.every(
      (q) =>
        typeof q.id === "number" &&
        typeof q.categorie === "string" &&
        typeof q.question === "string" &&
        typeof q.reponse1 === "string",
    )
  )
    throw new Error("Le format des questions reçu est invalide.");
  return data;
}
export function errorMessage(error: unknown): string {
  return error instanceof TypeError
    ? "Impossible de joindre le serveur. Vérifiez votre connexion et le démarrage du back Laravel."
    : error instanceof Error
      ? error.message
      : "Une erreur inattendue est survenue.";
}
