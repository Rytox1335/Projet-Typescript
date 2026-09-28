import { Link } from "react-router-dom";
import imageQuiz from "../../img/image quiz page d'acceuil.jpg";
import iconeCommencer from "../../img/icon/bottom-right.png";
import iconeEtapeUne from "../../img/icon/number-one.png";
import iconeEtapeDeux from "../../img/icon/two.png";
import iconeEtapeTrois from "../../img/icon/number-3.png";

export function Accueil() {
  return (
    <main className="content home">
      <div>
        <section>
          <h1>Culture Quiz</h1>
          <p className="home-description">Testez votre culture générale</p>
          <p className="home-rules">10 questions • 30 secondes par question</p>
          <Link className="button" to="/categories">
            Commencer le quiz
            <img className="button-icon" src={iconeCommencer} alt="" />
          </Link>
        </section>
        <section className="rules" aria-labelledby="rules-title">
          <h2 id="rules-title">Comment jouer ?</h2>
          <ol>
            <li>
              <img className="rule-icon" src={iconeEtapeUne} alt="" />
              <span>Choisissez une catégorie.</span>
            </li>
            <li>
              <img className="rule-icon" src={iconeEtapeDeux} alt="" />
              <span>Sélectionnez une réponse avant la fin du chrono.</span>
            </li>
            <li>
              <img className="rule-icon" src={iconeEtapeTrois} alt="" />
              <span>
                Retrouvez votre score et la correction après les 10 questions.
              </span>
            </li>
          </ol>
        </section>
      </div>
      <img
        className="home-image"
        src={imageQuiz}
        alt="Quiz sur un fond de mosaïque multicolore"
        width={1280}
        height={853}
      />
    </main>
  );
}
