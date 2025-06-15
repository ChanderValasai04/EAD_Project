import { useEffect, useRef, useState } from "react";

const TimerWithProgress = ({ sessionType, durations }) => {
  const [timeLeft, setTimeLeft] = useState(durations[sessionType]);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeLeft(durations[sessionType]);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [sessionType, durations]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default TimerWithProgress;