"use client"; 

import Header from "../../../shared/ui/header/header";
import { use, useEffect, useState } from 'react';
import {auth, db, collection, query, orderBy, onSnapshot, addDoc, Timestamp, where } from "@fidoo/firebaseconfig";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = use(params); 
  const userId = auth.currentUser?.uid;

  const [messages, setMessages] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const messagesRef = collection(db, 'chats');
    const q = query(
      messagesRef,
      where('chatId', '==', id),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const res = await fetch('http://localhost:3004/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    await addDoc(collection(db, 'chats'), {
      id,
      userMessage,
      botResponse: data.reply,
      timestamp: Timestamp.now(),
      userId:  userId,
    });

    setUserMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-between p-6">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold">TramitEase</h1>
            <p className="text-gray-500 mt-4">Escribe tu primer mensaje para comenzar.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <p><strong>Tú:</strong> {msg.userMessage}</p>
                <p><strong>Bot:</strong> {msg.botResponse}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </main>
    </div>
  );
}

export default Page;
