import React, { useState, useEffect } from 'react';

const SettingModal = ({ isOpen, onClose, durations, setDurations, cycleLimit, setCycleLimit }) => {
  const [localDurations, setLocalDurations] = useState(durations);
  const [localCycleLimit, setLocalCycleLimit] = useState(cycleLimit);

  useEffect(() => {
    if (isOpen) {
      setLocalDurations(durations);
      setLocalCycleLimit(cycleLimit);
    }
  }, [isOpen, durations, cycleLimit]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        <p>Settings content goes here</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;