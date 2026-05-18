export function TimeDisplay({ label, value, accent, status }) {
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
