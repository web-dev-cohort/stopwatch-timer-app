import { TimerReset } from 'lucide-react';

export function AppHeader() {
  return (
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
  );
}
