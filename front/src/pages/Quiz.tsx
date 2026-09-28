import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenirQuestions, messageErreur } from "../lib/api";
import { preparerQuiz, DUREE_QUESTION_SECONDES, calculerScore } from "../lib/quiz";
import type { Answer, Result, Round } from "../lib/quiz";
import { MessageAlerte } from "../components/Feedback";
import backIcon from "../../img/icon/back arrow.png";

export function Quiz({ terminarPartida }: { terminarPartida: (resultat: Result) => void }) {
  const { category: categorie = "" } = useParams();
  const [manches, definirManches] = useState<Round[]>([]);
  const [erreur, definirErreur] = useState("");
  const [tentative, definirTentative] = useState(0);
  useEffect(() => {
    const controleur = new AbortController();
    definirManches([]);
    definirErreur("");
    obtenirQuestions(controleur.signal)
      .then((questions) => definirManches(preparerQuiz(questions, categorie)))
      .catch((erreurRecue) => {
        if (!controleur.signal.aborted) definirErreur(messageErreur(erreurRecue));
      });
    return () => controleur.abort();
  }, [categorie, tentative]);
  if (erreur)
    return (
      <main className="content">
        <MessageAlerte
          texte={erreur}
          reessayer={() => definirTentative((ancienneTentative) => ancienneTentative + 1)}
        />
        <Link className="text-link" to="/categories">
          ← Changer de catégorie
        </Link>
      </main>
    );
  if (!manches.length)
    return (
      <main className="content">
        <p role="status" className="loading">
          On mélange les questions…
        </p>
      </main>
    );
  return (
    <Partie
      key={`${categorie}-${tentative}`}
      manches={manches}
      categorie={categorie}
      terminerPartie={terminerPartie}
    />
  );
}

function Partie({
  manches,
  categorie,
  terminerPartie,
}: {
  manches: Round[];
  categorie: string;
  terminerPartie: (resultat: Result) => void;
}) {
  const [reponses, definirReponses] = useState<Answer[]>([]);
  const [reponseEnAttente, definirReponseEnAttente] = useState<Answer | null>(null);
  const [secondesRestantes, definirSecondesRestantes] = useState(DUREE_QUESTION_SECONDES);
  const verrouillee = useRef(false);
  const echeance = useRef(Date.now() + DUREE_QUESTION_SECONDES * 1000);
  const titreQuestion = useRef<HTMLHeadingElement>(null);
  const naviguer = useNavigate();
  const manche = manches[reponses.length];
  const soumettreReponse = useCallback(
    (reponseChoisie: string | null) => {
      if (verrouillee.current) return;
      verrouillee.current = true;
      definirReponseEnAttente({
        round: manche,
        selected: Date.now() >= echeance.current ? null : reponseChoisie,
      });
    },
    [manche],
  );

  useEffect(() => {
    titreQuestion.current?.focus();
    const actualiserChronometre = () => {
      const secondes = Math.max(
        0,
        Math.ceil((echeance.current - Date.now()) / 1000),
      );
      definirSecondesRestantes(secondes);
      if (secondes === 0) soumettreReponse(null);
    };
    const minuteur = window.setInterval(actualiserChronometre, 100);
    return () => window.clearInterval(minuteur);
  }, [soumettreReponse]);

  useEffect(() => {
    if (!reponseEnAttente) return;
    const minuteur = window.setTimeout(() => {
      const reponsesSuivantes = [...reponses, reponseEnAttente];
      if (reponsesSuivantes.length === manches.length) {
        terminerPartie({ category: categorie, answers: reponsesSuivantes });
        naviguer("/resultats", { replace: true });
      } else {
        echeance.current = Date.now() + DUREE_QUESTION_SECONDES * 1000;
        verrouillee.current = false;
        definirSecondesRestantes(DUREE_QUESTION_SECONDES);
        definirReponses(reponsesSuivantes);
        definirReponseEnAttente(null);
      }
    }, 1400);
    return () => window.clearTimeout(minuteur);
  }, [reponseEnAttente, reponses, manches.length, terminerPartie, categorie, naviguer]);

  return (
    <main className="content game">
      <div className="game-meta">
        <span className="game-category">{categorie}</span>
        <span
          className={`timer ${secondesRestantes <= 5 ? "urgent" : ""}`}
          role="timer"
          aria-label={`${secondesRestantes} secondes restantes`}
        >
          00:{String(secondesRestantes).padStart(2, "0")}
        </span>
      </div>
      <div className="question-meta">
        <span>
          Question {reponses.length + 1}{" "}
          <span className="muted">/ {manches.length}</span>
        </span>
        <span>
          {calculerScore(reponses)} point{calculerScore(reponses) > 1 ? "s" : ""}
        </span>
      </div>
      <div className="time-track" aria-hidden="true">
        <div style={{ width: `${(secondesRestantes / DUREE_QUESTION_SECONDES) * 100}%` }} />
      </div>
      <section key={manche.id} className="question-enter">
        <h1 className="question-title" ref={titreQuestion} tabIndex={-1}>
          {manche.title}
        </h1>
        <div className="choices">
          {manche.choices.map((choix) => {
            const estCorrecte = reponseEnAttente && choix === manche.correct;
            const estIncorrecte = reponseEnAttente && reponseEnAttente.selected === choix && !estCorrecte;
            return (
              <button
                className={`choice ${estCorrecte ? "correct" : ""} ${estIncorrecte ? "wrong" : ""}`}
                disabled={!!reponseEnAttente}
                onClick={() => soumettreReponse(choix)}
                key={choix}
              >
                <span>{choix}</span>
                {(estCorrecte || estIncorrecte) && (
                  <span
                    className="choice-mark"
                    aria-label={estCorrecte ? "Bonne réponse" : "Mauvaise réponse"}
                  >
                    {estCorrecte ? "✓" : "×"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
      <p className="answer-feedback" role="status">
        {reponseEnAttente
          ? reponseEnAttente.selected === null
            ? "Temps écoulé ! La bonne réponse est indiquée en vert."
            : reponseEnAttente.selected === manche.correct
              ? "Bien joué ! C’est la bonne réponse."
              : "Pas cette fois ! La bonne réponse est indiquée en vert."
          : ""}
      </p>
      <Link className="text-link" to="/categories">
        <img className="back-icon" src={backIcon} alt="" />
        <span>Quitter la partie</span>
      </Link>
    </main>
  );
}
