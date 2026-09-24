import { useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Logo } from "./components/Logo";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { Quiz } from "./pages/Quiz";
import { Results } from "./pages/Results";
import type { Result } from "./lib/quiz";

export function App() {
  const [result, setResult] = useState<Result | null>(null);
  const complete = useCallback((next: Result) => setResult(next), []);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${pathname === "/" ? "À vous de jouer" : pathname === "/categories" ? "Les catégories" : pathname === "/resultats" ? "Votre score" : "La partie"} · Culture Quiz`;
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <header className={pathname === "/" ? "header home-header" : "header"}>
        <Link className="brand" to="/" aria-label="Culture Quiz, accueil">
          <Logo />
          <span>
            Culture Quiz<span className="brand-dot">.</span>
          </span>
        </Link>
        <span className="header-note">À CHAQUE JOUR SA DÉCOUVERTE</span>
      </header>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/quiz/:category"
            element={<Quiz onComplete={complete} />}
          />
          <Route path="/resultats" element={<Results result={result} />} />
          <Route
            path="*"
            element={
              <main className="content">
                <h1>Cette page s’est égarée.</h1>
                <Link className="button" to="/">
                  Retour à l’accueil
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
      {pathname !== "/" && (
        <footer>
          Culture Quiz <span>Restez curieux.</span>
        </footer>
      )}
    </>
  );
}
