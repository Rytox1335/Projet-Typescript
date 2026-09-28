import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenirCategories, messageErreur } from "../lib/api";
import type { Category } from "../lib/quiz";
import { MessageAlerte } from "../components/Feedback";
import { imageCategorie } from "../lib/categoryImage";

export function Categories() {
  const [categories, definirCategories] = useState<Category[]>([]);
  const [chargement, definirChargement] = useState(true);
  const [erreur, definirErreur] = useState("");
  const [tentative, definirTentative] = useState(0);
  useEffect(() => {
    const controleur = new AbortController();
    definirChargement(true);
    definirErreur("");
    obtenirCategories(controleur.signal)
      .then(definirCategories)
      .catch((erreurRecue) => {
        if (!controleur.signal.aborted) definirErreur(messageErreur(erreurRecue));
      })
      .finally(() => {
        if (!controleur.signal.aborted) definirChargement(false);
      });
    return () => controleur.abort();
  }, [tentative]);
  return (
    <main className="content">
      <h1>Quiz par catégories</h1>
      <p className="intro">
        Choisissez une catégorie et testez vos connaissances.
      </p>
      {chargement ? (
        <p role="status" className="loading">
          On prépare les catégories…
        </p>
      ) : erreur ? (
        <MessageAlerte
          texte={erreur}
          reessayer={() => definirTentative((ancienneTentative) => ancienneTentative + 1)}
        />
      ) : categories.length === 0 ? (
        <MessageAlerte
          texte="Aucune catégorie n’est disponible pour le moment. Réessayez plus tard."
          reessayer={() => definirTentative((ancienneTentative) => ancienneTentative + 1)}
        />
      ) : (
        <div className="categories">
          {categories.map((categorie) => (
            <Link
              className="category"
              to={`/quiz/${encodeURIComponent(categorie.categorie)}`}
              key={categorie.id}
            >
              <div className="category-banner" aria-hidden="true">
                <img src={imageCategorie(categorie.categorie)} alt="" />
              </div>
              <div className="category-body">
                <h2>{categorie.categorie}</h2>
                <span className="category-play">
                  Jouer au quiz <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
