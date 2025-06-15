import React from 'react';

const Header = ({ onOpenSettings, onToggleHistory }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1 className="app-title">Pomodoro Timer 🍅</h1>
          <p className="app-subtitle">Boost focus with the Pomodoro Technique</p>
        </div>
        <div className="header-buttons">
          <button className="header-btn" onClick={onToggleHistory}>📜 History</button>
          <button className="header-btn" onClick={onOpenSettings}>⚙️ Settings</button>
        </div>
      </div>
    </header>
  );
};

export default Header;