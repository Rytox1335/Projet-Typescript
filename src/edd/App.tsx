import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/quiz/:categoryId" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>

        <footer style={{ textAlign: 'center', padding: '0.75rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Culture Quiz &copy; {new Date().getFullYear()} — Université Project
        </footer>
      </div>
    </Router>
  );
};

export default App;
