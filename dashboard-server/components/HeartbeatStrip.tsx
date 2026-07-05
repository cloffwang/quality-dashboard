export function HeartbeatStrip({ history }: { history: boolean[] }) {
  return (
    <div className="flex gap-0.5">
      {history.map((up, i) => (
        <div
          key={i}
          className={`h-6 flex-1 rounded-sm ${up ? 'bg-emerald-500' : 'bg-red-500'}`}
          title={up ? 'up' : 'down'}
        />
      ))}
    </div>
  );
}
