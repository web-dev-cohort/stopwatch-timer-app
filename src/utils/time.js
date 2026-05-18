const pad = (value, size = 2) => String(value).padStart(size, '0');

export function formatDuration(totalMilliseconds, showCentiseconds = false) {
  const safeMilliseconds = Math.max(0, totalMilliseconds);
  const totalSeconds = Math.floor(safeMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((safeMilliseconds % 1000) / 10);

  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return showCentiseconds ? `${clock}.${pad(centiseconds)}` : clock;
}
