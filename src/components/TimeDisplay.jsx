export function TimeDisplay({
  label,
  value,
  accent,
  status,
  isExpanded = false,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-950/70">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${accent}`}
        >
          {status}
        </span>
      </div>
      <output
        className={`block whitespace-nowrap font-mono font-black leading-none text-slate-950 tabular-nums dark:text-white ${
          isExpanded
            ? 'text-[clamp(2.5rem,12vw,9rem)]'
            : 'text-[clamp(2.15rem,5vw,4rem)]'
        }`}
      >
        {value}
      </output>
    </div>
  );
}
