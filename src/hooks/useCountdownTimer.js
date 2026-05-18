import { useEffect, useRef, useState } from 'react';

export function useCountdownTimer(initialSeconds = 300) {
  const [durationSeconds, setDurationSeconds] = useState(initialSeconds);
  const [remainingMilliseconds, setRemainingMilliseconds] = useState(
    initialSeconds * 1000,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const finishesAtRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    finishesAtRef.current = performance.now() + remainingMilliseconds;
    const intervalId = window.setInterval(() => {
      const nextRemaining = Math.max(0, finishesAtRef.current - performance.now());
      setRemainingMilliseconds(nextRemaining);

      if (nextRemaining <= 0) {
        setIsRunning(false);
        setIsFinished(true);
        window.clearInterval(intervalId);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const setDuration = (nextSeconds) => {
    const sanitizedSeconds = Math.max(0, nextSeconds);
    setDurationSeconds(sanitizedSeconds);
    setRemainingMilliseconds(sanitizedSeconds * 1000);
    setIsFinished(false);
    setIsRunning(false);
  };

  const start = () => {
    if (remainingMilliseconds > 0) {
      setIsFinished(false);
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (!isRunning) {
      return;
    }

    setRemainingMilliseconds(Math.max(0, finishesAtRef.current - performance.now()));
    setIsRunning(false);
  };

  const reset = () => {
    setRemainingMilliseconds(durationSeconds * 1000);
    setIsFinished(false);
    setIsRunning(false);
  };

  return {
    durationSeconds,
    remainingMilliseconds,
    isRunning,
    isFinished,
    setDuration,
    start,
    pause,
    reset,
  };
}
