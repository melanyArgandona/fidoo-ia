'use client';

import React from 'react';
import InputComponent from '../inputs/InputComponent';
import ButtonComponent from '../button/ButtonComponent';
import './LoginForm.css';
import { useLogin } from '../../hooks/useLogin';

export default function LoginForm() {
  const {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    code,
    setCode,
    isPhone,
    confirmationResult,
    handleLogin,
  } = useLogin();

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <InputComponent
          type="text"
          id="identifier"
          label="Email o Celular"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />

        {!confirmationResult && !isPhone && (
          <InputComponent
            type="password"
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {confirmationResult && isPhone && (
          <InputComponent
            type="text"
            id="code"
            label="Código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        <div id="recaptcha-container"></div>

        <ButtonComponent
          label="Ingresar"
          onClick={handleLogin}
          variant="primary"
        />
        <div className="line-separator"></div>
        <a href="/createAccount" className="create-account-link">
          ¿No tienes una cuenta? Crear cuenta
        </a>
      </form>
    </div>
  );
}
