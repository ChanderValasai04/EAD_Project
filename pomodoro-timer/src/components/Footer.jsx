import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Pomodoro Timer. Stay focused!</p>
    </footer>
  );
};

export default Footer;