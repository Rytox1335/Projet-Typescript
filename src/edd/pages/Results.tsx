import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, Grid, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { QuizResultState } from '../types/quiz';

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as QuizResultState | null;

  const score = state?.score ?? 0;
  const totalQuestions = state?.totalQuestions ?? 10;
  const category = state?.category ?? 'Culture Générale';
  const percentage = Math.round((score / totalQuestions) * 100);

  let feedbackTitle = "Quiz terminé !";
  let feedbackSub = "Continuez à vous entraîner pour battre votre record.";
  let badgeColor = "#6366F1";

  if (percentage === 100) {
    feedbackTitle = "Score Parfait ! 🏆";
    feedbackSub = "Félicitations, vous êtes un véritable expert !";
    badgeColor = "#10B981";
  } else if (percentage >= 70) {
    feedbackTitle = "Bravo ! 🎉";
    feedbackSub = "Votre culture générale est impressionnante !";
    badgeColor = "#A855F7";
  } else if (percentage < 50) {
    feedbackTitle = "Dommage ! 💡";
    feedbackSub = "Ne baissez pas les bras, réessayez pour vous améliorer.";
    badgeColor = "#EC4899";
  }

  const handleRestartQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(category)}`);
  };

  return (
    <div className="results-page" id="results-page">
      <div className="glass-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '50%', color: badgeColor }}>
          <Award size={38} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.75rem' }} id="results-title">{feedbackTitle}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            {feedbackSub}
          </p>
        </div>

        <div className="score-circle">
          <span className="score-number gradient-text">{score}</span>
          <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {totalQuestions}</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span>Catégorie : <strong>{category}</strong></span>
          <span>•</span>
          <span>Taux : <strong>{percentage}%</strong></span>
        </div>
      </div>

      <div className="results-actions">
        <Button
          id="restart-quiz-btn"
          onClick={handleRestartQuiz}
          variant="primary"
          icon={<RefreshCw size={20} />}
        >
          Rejouer
        </Button>

        <Button
          id="back-categories-btn"
          to="/categories"
          variant="secondary"
          icon={<Grid size={20} />}
        >
          Retour aux catégories
        </Button>
      </div>
    </div>
  );
};
