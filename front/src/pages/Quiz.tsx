import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestions, errorMessage } from "../lib/api";
import { prepareQuiz, QUESTION_SECONDS, score } from "../lib/quiz";
import type { Answer, Result, Round } from "../lib/quiz";
import { Feedback } from "../components/Feedback";
import backIcon from "../../img/icon/back arrow.png";

export function Quiz({ onComplete }: { onComplete: (result: Result) => void }) {
  const { category = "" } = useParams();
  const [rounds, setRounds] = useState<Round[]>([]);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setRounds([]);
    setError("");
    getQuestions(controller.signal)
      .then((q) => setRounds(prepareQuiz(q, category)))
      .catch((e) => {
        if (!controller.signal.aborted) setError(errorMessage(e));
      });
    return () => controller.abort();
  }, [category, attempt]);
  if (error)
    return (
      <main className="content">
        <Feedback message={error} retry={() => setAttempt((a) => a + 1)} />
        <Link className="text-link" to="/categories">
          ← Changer de catégorie
        </Link>
      </main>
    );
  if (!rounds.length)
    return (
      <main className="content">
        <p role="status" className="loading">
          On mélange les questions…
        </p>
      </main>
    );
  return (
    <Game
      key={`${category}-${attempt}`}
      rounds={rounds}
      category={category}
      onComplete={onComplete}
    />
  );
}

function Game({
  rounds,
  category,
  onComplete,
}: {
  rounds: Round[];
  category: string;
  onComplete: (result: Result) => void;
}) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [pending, setPending] = useState<Answer | null>(null);
  const [remaining, setRemaining] = useState(QUESTION_SECONDS);
  const locked = useRef(false);
  const deadline = useRef(Date.now() + QUESTION_SECONDS * 1000);
  const title = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const round = rounds[answers.length];
  const submit = useCallback(
    (selected: string | null) => {
      if (locked.current) return;
      locked.current = true;
      setPending({
        round,
        selected: Date.now() >= deadline.current ? null : selected,
      });
    },
    [round],
  );

  useEffect(() => {
    title.current?.focus();
    const tick = () => {
      const seconds = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(seconds);
      if (seconds === 0) submit(null);
    };
    const timer = window.setInterval(tick, 100);
    return () => window.clearInterval(timer);
  }, [submit]);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => {
      const next = [...answers, pending];
      if (next.length === rounds.length) {
        onComplete({ category, answers: next });
        navigate("/resultats", { replace: true });
      } else {
        deadline.current = Date.now() + QUESTION_SECONDS * 1000;
        locked.current = false;
        setRemaining(QUESTION_SECONDS);
        setAnswers(next);
        setPending(null);
      }
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [pending, answers, rounds.length, onComplete, category, navigate]);

  return (
    <main className="content game">
      <div className="game-meta">
        <span className="game-category">{category}</span>
        <span
          className={`timer ${remaining <= 5 ? "urgent" : ""}`}
          role="timer"
          aria-label={`${remaining} secondes restantes`}
        >
          00:{String(remaining).padStart(2, "0")}
        </span>
      </div>
      <div className="question-meta">
        <span>
          Question {answers.length + 1}{" "}
          <span className="muted">/ {rounds.length}</span>
        </span>
        <span>
          {score(answers)} point{score(answers) > 1 ? "s" : ""}
        </span>
      </div>
      <div className="time-track" aria-hidden="true">
        <div style={{ width: `${(remaining / QUESTION_SECONDS) * 100}%` }} />
      </div>
      <section key={round.id} className="question-enter">
        <h1 className="question-title" ref={title} tabIndex={-1}>
          {round.title}
        </h1>
        <div className="choices">
          {round.choices.map((choice) => {
            const correct = pending && choice === round.correct;
            const wrong = pending && pending.selected === choice && !correct;
            return (
              <button
                className={`choice ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                disabled={!!pending}
                onClick={() => submit(choice)}
                key={choice}
              >
                <span>{choice}</span>
                {(correct || wrong) && (
                  <span
                    className="choice-mark"
                    aria-label={correct ? "Bonne réponse" : "Mauvaise réponse"}
                  >
                    {correct ? "✓" : "×"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
      <p className="answer-feedback" role="status">
        {pending
          ? pending.selected === null
            ? "Temps écoulé ! La bonne réponse est indiquée en vert."
            : pending.selected === round.correct
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
