import { useEffect, useRef, useState } from "react";

const TimerWithProgress = ({ sessionType, setSessionType, durations, cycleLimit, addToHistory }) => {
  const [timeLeft, setTimeLeft] = useState(durations[sessionType]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);
  const sessionEnded = useRef(false);

  const soundRefs = useRef({
    focusToBreak: new Audio("/sounds/focus-end.wav"),
    breakToFocus: new Audio("/sounds/break-end.wav"),
    breakToLongBreak: new Audio("/sounds/longbreak-start.wav"),
  });

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
    sessionEnded.current = false; 
  }, [sessionType, durations]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            if (!sessionEnded.current) {
              sessionEnded.current = true; 
              handleSessionEnd();
            }
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

  const handleSessionEnd = () => {
    if (sessionType === "focus") {
      soundRefs.current.focusToBreak.play();
      addToHistory("Focus");
      setSessionType("shortBreak");
    } else if (sessionType === "shortBreak") {
      addToHistory("Short Break");
      const newCount = cycleCount + 1;

      if (newCount >= cycleLimit) {
        soundRefs.current.breakToLongBreak.play();
        setSessionType("longBreak");
        setCycleCount(0);
      } else {
        soundRefs.current.breakToFocus.play();
        setSessionType("focus");
        setCycleCount(newCount);
      }
    } else {
      addToHistory("Long Break");
      soundRefs.current.breakToFocus.play();
      setSessionType("focus");
    }

    setHasStarted(false);
  };

  const handleButtonClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      sessionEnded.current = false; 
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setSessionType("focus");
    setTimeLeft(durations["focus"]);
    setIsRunning(false);
    setHasStarted(false);
    setCycleCount(0);
    sessionEnded.current = false;
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