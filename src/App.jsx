import { AppHeader } from './components/AppHeader';
import { StopwatchPanel } from './components/StopwatchPanel';
import { TimerPanel } from './components/TimerPanel';

export default function App() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#e0f2fe_42%,#fef3c7_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6">
        <AppHeader />

        <div className="grid gap-5 lg:grid-cols-2">
          <StopwatchPanel />
          <TimerPanel />
        </div>
      </div>
    </main>
  );
}
