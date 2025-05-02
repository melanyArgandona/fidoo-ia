import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@fidoo/firebaseconfig';

export const handleEmailLogin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const handlePhoneLogin = async (phone: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
    await window.recaptchaVerifier.render();
  }

  const fullPhone = phone.startsWith('+') ? phone : '+591' + phone;
  return await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
};
