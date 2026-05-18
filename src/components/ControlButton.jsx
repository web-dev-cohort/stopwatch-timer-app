export function ControlButton({
  children,
  icon: Icon,
  intent = 'secondary',
  ...props
}) {
  const variants = {
    primary:
      'bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 focus-visible:outline-slate-950',
    secondary:
      'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-slate-400',
    danger:
      'bg-rose-50 text-rose-700 ring-1 ring-rose-100 hover:bg-rose-100 focus-visible:outline-rose-400',
  };

  return (
    <button
      className={`inline-flex h-12 min-w-28 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[intent]}`}
      type="button"
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
