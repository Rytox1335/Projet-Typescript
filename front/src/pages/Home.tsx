import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

export function Home() {
  return (
    <main className="home">
      <div className="home-inner">
        <div className="eyebrow">LE RENDEZ-VOUS DES ESPRITS CURIEUX</div>
        <Logo large />
        <h1>
          Culture<span>Quiz.</span>
        </h1>
        <p className="home-description">
          Un peu de savoir.
          <br />
          Beaucoup de plaisir à jouer.
        </p>
        <Link className="button button-light" to="/categories">
          À vous de jouer <span aria-hidden="true">↗</span>
        </Link>
        <div className="home-rules">
          <span>
            <strong>10</strong> questions
          </span>
          <span>
            <strong>30</strong> secondes / question
          </span>
        </div>
      </div>
      <span className="home-bottom">LA CURIOSITÉ EST UN BEAU DÉFAUT.</span>
    </main>
  );
}
