import { useEffect, useRef, useState } from 'react';

export function useElapsedStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startedAtRef = useRef(null);
  const accumulatedRef = useRef(0);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    startedAtRef.current = performance.now();
    let frameId;

    const tick = (now) => {
      setElapsed(accumulatedRef.current + now - startedAtRef.current);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (!isRunning) {
      return;
    }

    accumulatedRef.current += performance.now() - startedAtRef.current;
    setElapsed(accumulatedRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    accumulatedRef.current = 0;
    startedAtRef.current = isRunning ? performance.now() : null;
    setElapsed(0);
  };

  return { elapsed, isRunning, start, pause, reset };
}
