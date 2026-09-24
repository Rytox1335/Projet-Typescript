import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, errorMessage } from "../lib/api";
import type { Category } from "../lib/quiz";
import { Feedback } from "../components/Feedback";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    getCategories(controller.signal)
      .then(setCategories)
      .catch((e) => {
        if (!controller.signal.aborted) setError(errorMessage(e));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);
  return (
    <main className="content">
      <p className="eyebrow">01 / CHOISISSEZ VOTRE TERRAIN DE JEU</p>
      <h1>
        À chaque curiosité,
        <br />
        <em>son quiz.</em>
      </h1>
      <p className="intro">
        Choisissez un thème. Vous avez 10 questions pour faire la différence.
      </p>
      {loading ? (
        <p role="status" className="loading">
          On prépare les catégories…
        </p>
      ) : error ? (
        <Feedback message={error} retry={() => setAttempt((a) => a + 1)} />
      ) : categories.length === 0 ? (
        <Feedback
          message="Aucune catégorie n’est disponible pour le moment. Ajoutez les données initiales au serveur."
          retry={() => setAttempt((a) => a + 1)}
        />
      ) : (
        <div className="categories">
          {categories.map((c, i) => (
            <Link
              className="category"
              to={`/quiz/${encodeURIComponent(c.categorie)}`}
              key={c.id}
            >
              <span className="category-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{c.categorie}</h2>
                <p>10 questions · 30 secondes par question</p>
              </div>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      )}
      <aside className="tip">
        <span aria-hidden="true">✳</span>
        <p>
          <strong>Le saviez-vous ?</strong> Une seule réponse est correcte. Si
          le temps est écoulé, on passe à la suite !
        </p>
      </aside>
    </main>
  );
}
