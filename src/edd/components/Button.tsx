import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  to,
  variant = 'primary',
  icon,
  type = 'button',
  disabled = false,
  className = '',
  id
}) => {
  const btnClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const fullClass = `${btnClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={fullClass} id={id}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={fullClass}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
