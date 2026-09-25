import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, errorMessage } from "../lib/api";
import type { Category } from "../lib/quiz";
import { Feedback } from "../components/Feedback";
import { categoryImage } from "../lib/categoryImage";

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
      <h1>Quiz par catégories</h1>
      <p className="intro">
        Choisissez une catégorie et testez vos connaissances.
      </p>
      {loading ? (
        <p role="status" className="loading">
          On prépare les catégories…
        </p>
      ) : error ? (
        <Feedback message={error} retry={() => setAttempt((a) => a + 1)} />
      ) : categories.length === 0 ? (
        <Feedback
          message="Aucune catégorie n’est disponible pour le moment. Réessayez plus tard."
          retry={() => setAttempt((a) => a + 1)}
        />
      ) : (
        <div className="categories">
          {categories.map((c) => (
            <Link
              className="category"
              to={`/quiz/${encodeURIComponent(c.categorie)}`}
              key={c.id}
            >
              <div className="category-banner" aria-hidden="true">
                <img src={categoryImage(c.categorie)} alt="" />
              </div>
              <div className="category-body">
                <h2>{c.categorie}</h2>
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
