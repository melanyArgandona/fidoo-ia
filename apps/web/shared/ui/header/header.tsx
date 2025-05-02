'use client';

import React from 'react';
import { FaPencilAlt, FaBars } from 'react-icons/fa';
import './header.css';
import { useAuthUser } from '../../hooks/useAuthUser';

const Header: React.FC = () => {
  const { user, logout } = useAuthUser();

  return (
    <header className="header">
      <div className="header-section left">
        <FaBars className="icon icon-menu" />
      </div>

      <div className="header-section center">
        <h1 className="main-title">FidooAI</h1>
        <p className="subheading">AI-Powered Assistant</p>
      </div>

      <div className="header-section right">
        {user && (
          <div className="user-info">
            <span>{user.displayName || 'Usuario'}</span>
            {user.photoURL && <img src={user.photoURL} alt="User Photo" className="user-photo" />}
          </div>
        )}
        <button className="new-chat-btn">
          <FaPencilAlt className="icon icon-pencil" />
          <span className="tooltip">New Chat</span>
        </button>
        <button className="logout-btn" onClick={logout}>Log Out</button>
      </div>
    </header>
  );
};

export default Header;
