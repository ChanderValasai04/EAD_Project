const ControlPanel = ({ sessionType, setSessionType }) => {
  return (
    <div className="control-panel">
      <button
        className={sessionType === 'focus' ? 'active' : ''}
        onClick={() => setSessionType('focus')}
      >
        Focus
      </button>
      <button
        className={sessionType === 'shortBreak' ? 'active' : ''}
        onClick={() => setSessionType('shortBreak')}
      >
        Short Break
      </button>
      <button
        className={sessionType === 'longBreak' ? 'active' : ''}
        onClick={() => setSessionType('longBreak')}
      >
        Long Break
      </button>
    </div>
  );
};

export default ControlPanel;