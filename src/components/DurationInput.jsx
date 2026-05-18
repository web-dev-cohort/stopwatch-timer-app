export function DurationInput({
  totalSeconds,
  disabled,
  onChange,
  isExpanded = false,
}) {
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
          <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
            {label}
          </span>
          <input
            className={`rounded-lg border border-slate-200 bg-white px-3 text-center font-mono font-bold text-slate-950 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-950 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 ${
              isExpanded ? 'h-14 text-2xl sm:h-16 sm:text-3xl' : 'h-12 text-lg'
            }`}
            disabled={disabled}
            inputMode="numeric"
            max={part === 'hours' ? '99' : '59'}
            min="0"
            onChange={(event) => updatePart(part, event.target.value)}
            type="number"
            value={value}
          />
        </label>
      ))}
    </div>
  );
}
