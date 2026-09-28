import { Link, Navigate } from "react-router-dom";
import { calculerScore } from "../lib/quiz";
import type { Result } from "../lib/quiz";

export function Resultats({ resultat }: { resultat: Result | null }) {
  if (!resultat) return <Navigate to="/categories" replace />;
  const bonnesReponses = calculerScore(resultat.answers);
  return (
    <main className="content results">
      <p className="result-category">{resultat.category}</p>
      <h1>Votre résultat</h1>
      <div className="score">
        <strong>{bonnesReponses}</strong>
        <span>/ {resultat.answers.length}</span>
      </div>
      <p className="intro">
        {bonnesReponses >= 8
          ? "Très bon score !"
          : bonnesReponses >= 5
            ? "Bien joué !"
            : "Continuez à vous entraîner !"}
      </p>
      <div className="result-actions">
        <Link
          className="button"
          to={`/quiz/${encodeURIComponent(resultat.category)}`}
        >
          Rejouer
        </Link>
        <Link className="button button-secondary" to="/categories">
          Choisir une autre catégorie
        </Link>
      </div>
      <details className="review">
        <summary>
          Revoir mes réponses <span aria-hidden="true">＋</span>
        </summary>
        <ol>
          {resultat.answers.map((reponseDonnee) => (
            <li key={reponseDonnee.round.id}>
              <span
                className={
                  reponseDonnee.selected === reponseDonnee.round.correct
                    ? "review-correct"
                    : "review-wrong"
                }
              >
                {reponseDonnee.selected === reponseDonnee.round.correct ? "✓" : "×"}
              </span>
              <div>
                <h2>{reponseDonnee.round.title}</h2>
                <p>Votre réponse : {reponseDonnee.selected ?? "Temps écoulé"}</p>
                {reponseDonnee.selected !== reponseDonnee.round.correct && (
                  <p>
                    <strong>Bonne réponse : {reponseDonnee.round.correct}</strong>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </details>
    </main>
  );
}
