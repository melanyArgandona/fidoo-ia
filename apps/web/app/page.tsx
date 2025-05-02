'use client'

import React, { useEffect } from "react";
import styles from "./page.module.css";
import { auth } from "@fidoo/firebaseconfig";
import { redirect } from 'next/navigation'


export default function Home() {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        redirect('/chats/3554');
      } else {
        redirect('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.page}>
    </div>
  );
}
