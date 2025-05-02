import { auth } from '@fidoo/firebaseconfig';
import {
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  updateProfile
} from 'firebase/auth';
import { userModel } from '../model/user.model';

export const registerUser = async (
  formData: userModel,
  setConfirmationResult: (result: any) => void
): Promise<boolean> => {
  const { email, password, confirmPassword, phone } = formData;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return false;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: formData.name,
    });
    
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'visible',
      });
      await window.recaptchaVerifier.render();
    }

    const confirmation = await linkWithPhoneNumber(user, phone, window.recaptchaVerifier);
    setConfirmationResult(confirmation);
    alert('Código enviado por SMS');
    return true;
  } catch (error) {
    console.error('Error durante el registro:', error);
    alert('Error durante el registro. Revisa los datos e inténtalo nuevamente.');
    return false;
  }
};

export const verifyCode = async (confirmationResult: any, code: string) => {
  try {
    const result = await confirmationResult.confirm(code);
    console.log('Teléfono vinculado:', result.user);
    alert('Registro completado con éxito');
  } catch (error) {
    console.error('Código incorrecto:', error);
    alert('El código es incorrecto o ha expirado');
  }
};
