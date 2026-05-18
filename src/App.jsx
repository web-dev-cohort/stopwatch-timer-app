import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlarmClock,
  Pause,
  Play,
  RotateCcw,
  TimerReset,
  Watch,
} from 'lucide-react';

const pad = (value, size = 2) => String(value).padStart(size, '0');

function formatDuration(totalMilliseconds, showCentiseconds = false) {
  const safeMilliseconds = Math.max(0, totalMilliseconds);
  const totalSeconds = Math.floor(safeMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((safeMilliseconds % 1000) / 10);

  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return showCentiseconds ? `${clock}.${pad(centiseconds)}` : clock;
}

function useElapsedStopwatch() {
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

function useCountdownTimer(initialSeconds = 300) {
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

function ControlButton({ children, icon: Icon, intent = 'secondary', ...props }) {
  const variants = {
    primary:
      'bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 focus-visible:outline-slate-950',
    secondary:
      'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-slate-400',
    danger:
      'bg-rose-50 text-rose-700 ring-1 ring-rose-100 hover:bg-rose-100 focus-visible:outline-rose-400',
  };

  return (
    <button
      className={`inline-flex h-12 min-w-28 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[intent]}`}
      type="button"
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

function TimeDisplay({ label, value, accent, status }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase text-slate-500">
          {label}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${accent}`}
        >
          {status}
        </span>
      </div>
      <output className="block whitespace-nowrap font-mono text-[clamp(2.15rem,5vw,4rem)] font-black leading-none text-slate-950 tabular-nums">
        {value}
      </output>
    </div>
  );
}

function StopwatchPanel() {
  const { elapsed, isRunning, start, pause, reset } = useElapsedStopwatch();

  return (
    <section className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50/80 p-4 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <Watch aria-hidden="true" className="h-5 w-5" />
            <span className="text-sm font-bold uppercase">
              Stopwatch
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Track elapsed time
          </h2>
        </div>
      </div>

      <TimeDisplay
        accent={isRunning ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}
        label="Elapsed"
        status={isRunning ? 'Running' : 'Paused'}
        value={formatDuration(elapsed, true)}
      />

      <div className="flex flex-wrap gap-3">
        {isRunning ? (
          <ControlButton icon={Pause} onClick={pause} intent="primary">
            Pause
          </ControlButton>
        ) : (
          <ControlButton icon={Play} onClick={start} intent="primary">
            Start
          </ControlButton>
        )}
        <ControlButton icon={RotateCcw} onClick={reset}>
          Reset
        </ControlButton>
      </div>
    </section>
  );
}

function DurationInput({ totalSeconds, disabled, onChange }) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const updatePart = (part, value) => {
    const numericValue = Number.parseInt(value, 10);
    const safeValue = Number.isNaN(numericValue) ? 0 : Math.max(0, numericValue);
    const next = {
      hours,
      minutes,
      seconds,
      [part]: part === 'hours' ? Math.min(safeValue, 99) : Math.min(safeValue, 59),
    };

    onChange(next.hours * 3600 + next.minutes * 60 + next.seconds);
  };

  const fields = [
    ['hours', hours, 'Hr'],
    ['minutes', minutes, 'Min'],
    ['seconds', seconds, 'Sec'],
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {fields.map(([part, value, label]) => (
        <label key={part} className="grid gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">
            {label}
          </span>
          <input
            className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-center font-mono text-lg font-bold text-slate-950 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:bg-slate-100 disabled:text-slate-400"
            disabled={disabled}
            inputMode="numeric"
            min="0"
            max={part === 'hours' ? '99' : '59'}
            onChange={(event) => updatePart(part, event.target.value)}
            type="number"
            value={value}
          />
        </label>
      ))}
    </div>
  );
}

function TimerPanel() {
  const {
    durationSeconds,
    remainingMilliseconds,
    isRunning,
    isFinished,
    setDuration,
    start,
    pause,
    reset,
  } = useCountdownTimer(300);

  const progress = useMemo(() => {
    if (durationSeconds === 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(0, ((durationSeconds * 1000 - remainingMilliseconds) / (durationSeconds * 1000)) * 100),
    );
  }, [durationSeconds, remainingMilliseconds]);

  const status = isFinished ? 'Complete' : isRunning ? 'Running' : 'Ready';

  return (
    <section className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50/80 p-4 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <AlarmClock aria-hidden="true" className="h-5 w-5" />
            <span className="text-sm font-bold uppercase">
              Timer
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Count down with precision
          </h2>
        </div>
      </div>

      <TimeDisplay
        accent={
          isFinished
            ? 'bg-rose-100 text-rose-700'
            : isRunning
              ? 'bg-cyan-100 text-cyan-700'
              : 'bg-slate-100 text-slate-600'
        }
        label="Remaining"
        status={status}
        value={formatDuration(remainingMilliseconds)}
      />

      <div className="grid gap-3">
        <DurationInput
          disabled={isRunning}
          onChange={setDuration}
          totalSeconds={durationSeconds}
        />
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-cyan-500 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {isRunning ? (
          <ControlButton icon={Pause} onClick={pause} intent="primary">
            Pause
          </ControlButton>
        ) : (
          <ControlButton
            disabled={remainingMilliseconds <= 0}
            icon={Play}
            onClick={start}
            intent="primary"
          >
            Start
          </ControlButton>
        )}
        <ControlButton icon={TimerReset} onClick={reset}>
          Reset
        </ControlButton>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#e0f2fe_42%,#fef3c7_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6">
        <header className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase text-slate-500 ring-1 ring-slate-200">
            <TimerReset aria-hidden="true" className="h-4 w-4 text-cyan-600" />
            Focus clock
          </div>
          <h1 className="text-4xl font-black tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            Stopwatch and timer
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Run clean elapsed-time tracking beside a customizable countdown, with
            controls that stay readable from desktop to mobile.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <StopwatchPanel />
          <TimerPanel />
        </div>
      </div>
    </main>
  );
}
