import type { Category, Question } from "./quiz";
const urlBase = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function obtenirDonnees(cheminRequete: string, signalAnnulation: AbortSignal): Promise<unknown> {
  const reponseHttp = await fetch(`${urlBase}${cheminRequete}`, {
    signal: signalAnnulation,
    headers: { Accept: "application/json" },
  });
  if (!reponseHttp.ok)
    throw new Error(
      `L’API ne répond pas correctement (erreur ${reponseHttp.status}). Réessayez dans un instant.`,
    );
  return reponseHttp.json();
}
export async function obtenirCategories(signalAnnulation: AbortSignal): Promise<Category[]> {
  const donnees = await obtenirDonnees("/categories", signalAnnulation);
  if (
    !Array.isArray(donnees) ||
    !donnees.every(
      (categorie) => typeof categorie.id === "number" && typeof categorie.categorie === "string",
    )
  )
    throw new Error("Le format des catégories reçu est invalide.");
  return donnees;
}
export async function obtenirQuestions(signalAnnulation: AbortSignal): Promise<Question[]> {
  const donnees = await obtenirDonnees("/questions", signalAnnulation);
  if (
    !Array.isArray(donnees) ||
    !donnees.every(
      (question) =>
        typeof question.id === "number" &&
        typeof question.categorie === "string" &&
        typeof question.question === "string" &&
        typeof question.reponse1 === "string",
    )
  )
    throw new Error("Le format des questions reçu est invalide.");
  return donnees;
}
export function messageErreur(erreur: unknown): string {
  return erreur instanceof TypeError
    ? "Impossible de joindre le serveur. Vérifiez votre connexion et le démarrage du back Laravel."
    : erreur instanceof Error
      ? erreur.message
      : "Une erreur inattendue est survenue.";
}
