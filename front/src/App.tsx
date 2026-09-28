import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Logo } from "./components/Logo";
import { Accueil } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { Quiz } from "./pages/Quiz";
import { Resultats } from "./pages/Results";
import type { Result } from "./lib/quiz";

export function Application() {
  const [resultat, definirResultat] = useState<Result | null>(null);
  const terminerPartie = useCallback(
    (nouveauResultat: Result) => definirResultat(nouveauResultat),
    [],
  );
  const { pathname: chemin } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${chemin === "/" ? "À vous de jouer" : chemin === "/categories" ? "Les catégories" : chemin === "/resultats" ? "Votre score" : "La partie"} · Culture Quiz`;
  }, [chemin]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <header className="header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Culture Quiz, accueil">
            <Logo />
            <span>Culture Quiz</span>
          </Link>
          <nav aria-label="Navigation principale">
            <NavLink to="/" end>
              Accueil
            </NavLink>
            <NavLink to="/categories">Catégories</NavLink>
          </nav>
        </div>
      </header>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/quiz/:category"
            element={<Quiz terminerPartie={terminerPartie} />}
          />
          <Route path="/resultats" element={<Resultats resultat={resultat} />} />
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
      <footer>
        Culture Quiz <span>10 questions · 30 secondes par question</span>
      </footer>
    </>
  );
}
