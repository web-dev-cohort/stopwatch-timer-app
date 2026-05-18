import { useMemo } from 'react';
import {
  AlarmClock,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  TimerReset,
} from 'lucide-react';

import { useCountdownTimer } from '../hooks/useCountdownTimer';
import { formatDuration } from '../utils/time';
import { ControlButton } from './ControlButton';
import { DurationInput } from './DurationInput';
import { TimeDisplay } from './TimeDisplay';

export function TimerPanel({ isExpanded = false, onCollapse, onExpand }) {
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
      Math.max(
        0,
        ((durationSeconds * 1000 - remainingMilliseconds) /
          (durationSeconds * 1000)) *
          100,
      ),
    );
  }, [durationSeconds, remainingMilliseconds]);

  const status = isFinished ? 'Complete' : isRunning ? 'Running' : 'Ready';
  const panelClasses = isExpanded
    ? 'fixed inset-0 z-50 grid content-center gap-6 overflow-y-auto rounded-none border-0 bg-slate-50 p-4 shadow-none animate-panel-expand dark:bg-slate-950 sm:p-8 lg:p-12'
    : 'grid gap-5 rounded-lg border border-slate-200 bg-slate-50/80 p-4 shadow-soft transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/70 sm:p-6';
  const contentClasses = isExpanded
    ? 'mx-auto grid w-full max-w-5xl gap-6'
    : 'grid gap-5';

  const handleStart = () => {
    start();
    onExpand();
  };

  return (
    <section className={panelClasses}>
      <div className={contentClasses}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <AlarmClock aria-hidden="true" className="h-5 w-5" />
              <span className="text-sm font-bold uppercase">Timer</span>
            </div>
            <h2
              className={`font-black text-slate-950 dark:text-white ${
                isExpanded
                  ? 'text-4xl sm:text-5xl lg:text-6xl'
                  : 'text-2xl sm:text-3xl'
              }`}
            >
              Count down with precision
            </h2>
          </div>

          <button
            aria-label={
              isExpanded
                ? 'Return timer to normal size'
                : 'Expand timer to full screen'
            }
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
            onClick={isExpanded ? onCollapse : onExpand}
            title={isExpanded ? 'Return to normal size' : 'Expand to full screen'}
            type="button"
          >
            {isExpanded ? (
              <Minimize2 aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Maximize2 aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>

        <TimeDisplay
          accent={
            isFinished
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-200'
              : isRunning
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }
          isExpanded={isExpanded}
          label="Remaining"
          status={status}
          value={formatDuration(remainingMilliseconds)}
        />

        <div className="grid gap-3">
          <DurationInput
            disabled={isRunning}
            isExpanded={isExpanded}
            onChange={setDuration}
            totalSeconds={durationSeconds}
          />
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-500 transition-[width] duration-200 dark:bg-cyan-300"
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
              onClick={handleStart}
              intent="primary"
            >
              Start
            </ControlButton>
          )}
          <ControlButton icon={TimerReset} onClick={reset}>
            Reset
          </ControlButton>
        </div>
      </div>
    </section>
  );
}
