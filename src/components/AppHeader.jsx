import { Moon, Sun, TimerReset } from 'lucide-react';

export function AppHeader({ isDarkTheme, onToggleTheme }) {
  const ThemeIcon = isDarkTheme ? Sun : Moon;

  return (
    <header className="flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-700">
          <TimerReset aria-hidden="true" className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
          Focus clock
        </div>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          Stopwatch and timer
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          Run clean elapsed-time tracking beside a customizable countdown, with
          controls that stay readable from desktop to mobile.
        </p>
      </div>

      <button
        aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
        aria-pressed={isDarkTheme}
        className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-white/85 px-4 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:bg-slate-900/80 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
        onClick={onToggleTheme}
        title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
        type="button"
      >
        <ThemeIcon aria-hidden="true" className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
        {isDarkTheme ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
