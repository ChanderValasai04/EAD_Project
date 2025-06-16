import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';
import TimerWithProgress from './components/TimerWithProgress';

function App() {
  const [durations, setDurations] = useState({
    focus: 25 * 60, 
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });
  const [cycleLimit, setCycleLimit] = useState(4); 

  const [showSettings, setShowSettings] = useState(false);
  const [sessionType, setSessionType] = useState('focus'); 

  const getBackgroundClass = () => {
    switch (sessionType) {
      case 'shortBreak': return 'short-break-mode';
      case 'longBreak': return 'long-break-mode';
      default: return 'focus-mode';
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <Header 
        onOpenSettings={() => setShowSettings(true)}
      />
      
      <main className="timer-wrapper">
        <TimerWithProgress 
          sessionType={sessionType}
          setSessionType={setSessionType}
          durations={durations}
          cycleLimit={cycleLimit}
        />

        <ControlPanel 
          sessionType={sessionType}
          setSessionType={setSessionType}
          durations={durations}
          cycleLimit={cycleLimit}
          setDurations={setDurations}
        />
      </main>

      {showSettings && (
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
          durations={{ 
            focus: durations.focus / 60, 
            shortBreak: durations.shortBreak / 60, 
            longBreak: durations.longBreak / 60 
          }}
          setDurations={(newDurations) => setDurations({
            focus: newDurations.focus * 60,
            shortBreak: newDurations.shortBreak * 60,
            longBreak: newDurations.longBreak * 60,
          })}
          cycleLimit={cycleLimit}
          setCycleLimit={setCycleLimit}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;