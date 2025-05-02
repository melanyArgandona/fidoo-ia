import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window {
    confirmationResult: ConfirmationResult;
    recaptchaVerifier: RecaptchaVerifier;
  }
}

