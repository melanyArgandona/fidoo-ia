'use client';

import React from 'react';
import styles from './register.module.css';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import InputComponent from '../inputs/InputComponent';
import ButtonComponent from '../button/ButtonComponent';

export default function RegisterPage() {
  const {
    formData,
    handleChange,
    confirmationResult,
    userCreated,
    handleRegister,
    handleCodeVerify
  } = useRegisterForm();

  return (
    <div className={styles.container}>
      <h1 className={styles.loginTitle}>Registro</h1>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <InputComponent id="name" label="Nombre completo" value={formData.name} onChange={handleChange} />
        <InputComponent id="email" label="Correo Electrónico" type="email" value={formData.email} onChange={handleChange} />
        <InputComponent id="phone" label="Celular" type="tel" value={formData.phone} onChange={handleChange} />
        <InputComponent id="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} />
        <InputComponent id="confirmPassword" label="Confirmar Contraseña" type="password" value={formData.confirmPassword} onChange={handleChange} />
        <ButtonComponent label="Registrar" onClick={handleRegister} />

        {userCreated && confirmationResult && (
          <>
            <InputComponent id="code" label="Código SMS" value={formData.code} onChange={handleChange} />
            <ButtonComponent label="Verificar Código" onClick={handleCodeVerify} />
          </>
        )}

        { !confirmationResult && (
          <div id="recaptcha-container" />
        )}
      </form>

      <div className={styles.line}></div>
      <a href="/login" className={styles.create}>Ya tienes cuenta? Inicia sesión</a>
    </div>
  );
}
