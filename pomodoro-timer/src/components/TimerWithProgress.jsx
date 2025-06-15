import { useEffect, useRef, useState } from "react";

const TimerWithProgress = ({ sessionType, durations }) => {
  const [timeLeft, setTimeLeft] = useState(durations[sessionType]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);

  const totalDuration = durations[sessionType];
  const radius = 90;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = timeLeft / totalDuration;
  const offset = circumference * (1 - progress);

  useEffect(() => {
    setTimeLeft(durations[sessionType]);
    setIsRunning(false);
    setHasStarted(false);
    clearInterval(timerRef.current);
  }, [sessionType, durations]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleButtonClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(durations[sessionType]);
    setIsRunning(false);
    setHasStarted(false);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="progress-timer-container">
      <svg className="progress-ring" height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring__circle"
          stroke="#000"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      <div className="progress-content">
        <p className="time-left">{formatTime(timeLeft)}</p>
      </div>

      <div className="controls">
        <button onClick={handleButtonClick}>
          {!hasStarted ? "Start" : isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TimerWithProgress;