import { Link, Navigate } from "react-router-dom";
import { score } from "../lib/quiz";
import type { Result } from "../lib/quiz";

export function Results({ result }: { result: Result | null }) {
  if (!result) return <Navigate to="/categories" replace />;
  const total = score(result.answers);
  return (
    <main className="content results">
      <p className="eyebrow">{result.category} / PARTIE TERMINÉE</p>
      <h1>
        {total >= 8
          ? "Chapeau, la culture !"
          : total >= 5
            ? "Bien joué, esprit curieux."
            : "La curiosité se cultive."}
      </h1>
      <div className="score">
        <strong>{total}</strong>
        <span>/ {result.answers.length}</span>
      </div>
      <p className="intro">
        {total >= 8
          ? "Vos connaissances ont fait la différence."
          : "Chaque question est une nouvelle chose à apprendre."}
      </p>
      <div className="result-actions">
        <Link
          className="button"
          to={`/quiz/${encodeURIComponent(result.category)}`}
        >
          Rejouer ↗
        </Link>
        <Link className="text-link" to="/categories">
          Changer de catégorie
        </Link>
      </div>
      <details className="review">
        <summary>
          Revoir mes réponses <span aria-hidden="true">＋</span>
        </summary>
        <ol>
          {result.answers.map((a) => (
            <li key={a.round.id}>
              <span
                className={
                  a.selected === a.round.correct
                    ? "review-correct"
                    : "review-wrong"
                }
              >
                {a.selected === a.round.correct ? "✓" : "×"}
              </span>
              <div>
                <h2>{a.round.title}</h2>
                <p>Votre réponse : {a.selected ?? "Temps écoulé"}</p>
                {a.selected !== a.round.correct && (
                  <p>
                    <strong>Bonne réponse : {a.round.correct}</strong>
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
