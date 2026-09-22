import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import { ApiCategory } from '../types/quiz';
import { CategoryCard } from '../components/CategoryCard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError('Impossible de récupérer les catégories depuis le serveur.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/quiz/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="loading-container" id="categories-loading">
        <div className="spinner" />
        <p style={{ color: 'var(--text-muted)' }}>Chargement des catégories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" id="categories-error">
        <AlertCircle size={48} color="#EF4444" />
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{error}</p>
        <Button
          id="retry-categories-btn"
          onClick={loadCategories}
          variant="secondary"
          icon={<RefreshCw size={18} />}
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="categories-page" id="categories-page">
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h2>Sélectionnez une <span className="gradient-text">Catégorie</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Choisissez un thème pour commencer votre quiz de 10 questions.
        </p>
      </div>

      <div className="categories-grid" id="categories-list">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onSelect={handleSelectCategory}
          />
        ))}
      </div>
    </div>
  );
};
