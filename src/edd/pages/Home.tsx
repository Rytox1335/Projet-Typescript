import React from 'react';
import { ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  return (
    <div className="home-page" id="home-page">
      <div style={{ position: 'relative' }}>
        <img src="/logo.svg" alt="Culture Quiz Logo" className="hero-logo" id="app-logo" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <h1 className="home-title" id="main-title">
          <span className="gradient-text">Culture Quiz</span>
        </h1>
        <p className="home-subtitle" id="home-description">
          Testez et enrichissez votre culture générale avec nos séries de 10 questions chronométrées !
        </p>
      </div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '380px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={20} color="#6366F1" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>10 Questions</span>
          </div>
          <div style={{ width: '1px', background: 'var(--border-light)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <Trophy size={20} color="#EC4899" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>30s / Question</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '380px' }}>
        <Button
          id="start-quiz-btn"
          to="/categories"
          variant="primary"
          icon={<ArrowRight size={22} />}
        >
          Commencer
        </Button>
      </div>
    </div>
  );
};
