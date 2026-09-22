import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="app-header" id="main-header">
      <Link to="/" className="brand" id="header-brand-link">
        <img src="/logo.svg" alt="Culture Quiz Logo" className="brand-logo" />
        <h1 className="brand-title">Culture <span className="gradient-text">Quiz</span></h1>
      </Link>
    </header>
  );
};
