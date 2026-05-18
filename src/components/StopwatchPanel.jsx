import { Pause, Play, RotateCcw, Watch } from 'lucide-react';

import { useElapsedStopwatch } from '../hooks/useElapsedStopwatch';
import { formatDuration } from '../utils/time';
import { ControlButton } from './ControlButton';
import { TimeDisplay } from './TimeDisplay';

export function StopwatchPanel() {
  const { elapsed, isRunning, start, pause, reset } = useElapsedStopwatch();

  return (
    <section className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50/80 p-4 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <Watch aria-hidden="true" className="h-5 w-5" />
            <span className="text-sm font-bold uppercase">Stopwatch</span>
          </div>
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Track elapsed time
          </h2>
        </div>
      </div>

      <TimeDisplay
        accent={
          isRunning
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-slate-100 text-slate-600'
        }
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
