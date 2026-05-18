import { Maximize2, Minimize2, Pause, Play, RotateCcw, Watch } from 'lucide-react';

import { useElapsedStopwatch } from '../hooks/useElapsedStopwatch';
import { formatDuration } from '../utils/time';
import { ControlButton } from './ControlButton';
import { TimeDisplay } from './TimeDisplay';

export function StopwatchPanel({ isExpanded = false, onCollapse, onExpand }) {
  const { elapsed, isRunning, start, pause, reset } = useElapsedStopwatch();
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
              <Watch aria-hidden="true" className="h-5 w-5" />
              <span className="text-sm font-bold uppercase">Stopwatch</span>
            </div>
            <h2
              className={`font-black text-slate-950 dark:text-white ${
                isExpanded
                  ? 'text-4xl sm:text-5xl lg:text-6xl'
                  : 'text-2xl sm:text-3xl'
              }`}
            >
              Track elapsed time
            </h2>
          </div>

          <button
            aria-label={
              isExpanded
                ? 'Return stopwatch to normal size'
                : 'Expand stopwatch to full screen'
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
            isRunning
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }
          isExpanded={isExpanded}
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
            <ControlButton icon={Play} onClick={handleStart} intent="primary">
              Start
            </ControlButton>
          )}
          <ControlButton icon={RotateCcw} onClick={reset}>
            Reset
          </ControlButton>
        </div>
      </div>
    </section>
  );
}
