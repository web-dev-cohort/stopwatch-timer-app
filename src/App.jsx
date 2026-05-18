import { useEffect, useState } from 'react';

import { AppHeader } from './components/AppHeader';
import { StopwatchPanel } from './components/StopwatchPanel';
import { TimerPanel } from './components/TimerPanel';

export default function App() {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    window.localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);

  useEffect(() => {
    document.body.style.overflow = expandedPanel ? 'hidden' : '';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedPanel(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [expandedPanel]);

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#e0f2fe_42%,#fef3c7_100%)] px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-[linear-gradient(135deg,#020617_0%,#0f172a_48%,#164e63_100%)] dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6">
          <AppHeader
            isDarkTheme={isDarkTheme}
            onToggleTheme={() => setIsDarkTheme((current) => !current)}
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <StopwatchPanel
              isExpanded={expandedPanel === 'stopwatch'}
              onCollapse={() => setExpandedPanel(null)}
              onExpand={() => setExpandedPanel('stopwatch')}
            />
            <TimerPanel
              isExpanded={expandedPanel === 'timer'}
              onCollapse={() => setExpandedPanel(null)}
              onExpand={() => setExpandedPanel('timer')}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
