import { useState } from 'react';
import { userModel } from '../../entities/user/model/user.model';
import { registerUser, verifyCode } from '../../entities/user/services/registerUser';
import { redirect } from 'next/navigation'

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<userModel>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    code: ''
  });
  
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [userCreated, setUserCreated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    const result = await registerUser(formData, setConfirmationResult);
    setUserCreated(result);
  };

  const handleCodeVerify = async () => {
    await verifyCode(confirmationResult, formData.code);
    redirect('/chats/3554');
  };

  return {
    formData,
    setFormData,
    confirmationResult,
    userCreated,
    handleChange,
    handleRegister,
    handleCodeVerify
  };
};
