'use client';

import { useEffect, useState } from 'react';
import { auth } from '@fidoo/firebaseconfig';
import { useRouter } from 'next/navigation';

export const useAuthUser = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return { user, logout };
};
