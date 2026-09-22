import React from 'react';
import { ChevronRight, BookOpen, Compass, Atom, Palette, Film, Sparkles } from 'lucide-react';
import { ApiCategory } from '../types/quiz';

interface CategoryCardProps {
  category: ApiCategory;
  onSelect: (categoryName: string) => void;
  id?: string;
}

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('histoire')) return <BookOpen size={22} />;
  if (lower.includes('géo') || lower.includes('geo')) return <Compass size={22} />;
  if (lower.includes('science')) return <Atom size={22} />;
  if (lower.includes('art') || lower.includes('litt')) return <Palette size={22} />;
  if (lower.includes('ciné') || lower.includes('cine') || lower.includes('pop')) return <Film size={22} />;
  return <Sparkles size={22} />;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, id }) => {
  return (
    <button
      id={id || `category-${category.id}`}
      className="category-card"
      onClick={() => onSelect(category.categorie)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ color: 'var(--primary)' }}>
          {getCategoryIcon(category.categorie)}
        </div>
        <span className="category-name">{category.categorie}</span>
      </div>
      <ChevronRight size={20} color="#94A3B8" />
    </button>
  );
};
