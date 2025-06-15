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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalDurations((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = () => {
    setDurations(localDurations);
    setCycleLimit(localCycleLimit);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        <form>
          <label>
            Focus Duration (minutes):
            <input
              type="number"
              name="focus"
              value={localDurations.focus}
              onChange={handleChange}
            />
          </label>
          <label>
            Short Break Duration (minutes):
            <input
              type="number"
              name="shortBreak"
              value={localDurations.shortBreak}
              onChange={handleChange}
            />
          </label>
          <label>
            Long Break Duration (minutes):
            <input
              type="number"
              name="longBreak"
              value={localDurations.longBreak}
              onChange={handleChange}
            />
          </label>
          <label>
            Cycles before long break:
            <input
              type="number"
              min="1"
              value={localCycleLimit}
              onChange={(e) => setLocalCycleLimit(Number(e.target.value))}
            />
          </label>
        </form>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;