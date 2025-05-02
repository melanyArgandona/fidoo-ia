'use client';

import './ButtonComponent.css';
import { ButtonComponentProps } from './ButtonComponent.types';

export default function ButtonComponent({
  label,
  onClick,
  variant = 'primary',
  children
}: ButtonComponentProps) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
    >
      {children ?? label}
    </button>
  );
}
