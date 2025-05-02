import { useState, useEffect } from 'react';
import { handleEmailLogin, handlePhoneLogin } from '../../entities/user/services/authService';

export function useLogin() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const phoneRegex = /^[0-9]{7,15}$/;
    setIsPhone(phoneRegex.test(emailOrPhone.replace(/\D/g, '')));
  }, [emailOrPhone]);

  const handleLogin = async () => {
    try {
      if (isPhone) {
        if (!confirmationResult) {
          const result = await handlePhoneLogin(emailOrPhone);
          setConfirmationResult(result);
          alert('Código de verificación enviado.');
        } else {
          const result = await confirmationResult.confirm(code);
          console.log('Usuario autenticado con celular:', result.user);
          window.location.replace('/chats/3554');
        }
      } else {
        const userCredential = await handleEmailLogin(emailOrPhone, password);
        console.log('Usuario autenticado con correo:', userCredential.user);
        window.location.replace('/chats/3554');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    code,
    setCode,
    isPhone,
    confirmationResult,
    handleLogin,
  };
}
