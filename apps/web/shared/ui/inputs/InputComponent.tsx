'use client';

import './inputComponent.css';
import { InputComponentProps } from './ InputComponent.types';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputComponent({ type, id, label, value, onChange }: InputComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';

  return (
    <div className="input-container">
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        id={id}
        placeholder="  "
        className="input-field"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          className="password-toggle-button"
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
