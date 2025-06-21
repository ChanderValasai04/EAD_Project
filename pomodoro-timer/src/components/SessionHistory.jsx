import React from 'react';

const SessionHistory = ({ sessionHistory, onClearHistory, onClose }) => {
  return (
    <div className="history-modal-overlay" onClick={onClose}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Session History</h2>

        {sessionHistory.length === 0 ? (
          <p className="empty">No sessions recorded yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Started</th>
                  <th>Ended</th>
                  <th>Minutes</th>
                </tr>
              </thead>
              <tbody>
                {sessionHistory.map((session, index) => (
                  <tr key={index}>
                    <td>{session.type}</td>
                    <td>{session.date}</td>
                    <td>{session.timeStarted}</td>
                    <td>{session.timeEnded}</td>
                    <td>{session.durationMinutes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="history-buttons">
          <button className="clear-btn" onClick={onClearHistory}>Clear</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
};

export default SessionHistory;