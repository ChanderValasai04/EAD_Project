import { useEffect, useRef, useState } from "react";

const TimerWithProgress = ({ sessionType, durations }) => {
  const [timeLeft, setTimeLeft] = useState(durations[sessionType]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);

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
    <div>
      <p>{formatTime(timeLeft)}</p>
      <div>
        <button onClick={handleButtonClick}>
          {!hasStarted ? "Start" : isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TimerWithProgress;