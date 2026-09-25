import { Link } from "react-router-dom";
import quizImage from "../../img/image quiz page d'acceuil.jpg";

export function Home() {
  return (
    <main className="content home">
      <div>
        <section>
          <h1>Culture Quiz</h1>
          <p className="home-description">Testez votre culture générale</p>
          <p className="home-rules">10 questions • 30 secondes par question</p>
          <Link className="button" to="/categories">
            Commencer le quiz <span aria-hidden="true">→</span>
          </Link>
        </section>
        <section className="rules" aria-labelledby="rules-title">
          <h2 id="rules-title">Comment jouer ?</h2>
          <ol>
            <li>Choisissez une catégorie.</li>
            <li>Sélectionnez une réponse avant la fin du chrono.</li>
            <li>
              Retrouvez votre score et la correction après les 10 questions.
            </li>
          </ol>
        </section>
      </div>
      <img
        className="home-image"
        src={quizImage}
        alt="Quiz sur un fond de mosaïque multicolore"
        width={1280}
        height={853}
      />
    </main>
  );
}
