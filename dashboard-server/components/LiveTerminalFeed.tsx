export function LiveTerminalFeed({
  entries,
}: {
  entries: { id: string; timestamp: string; message: string; type: 'req' | 'res' }[];
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-black p-4 font-mono text-xs">
      {entries.map((entry) => (
        <div key={entry.id} className="flex gap-2 py-0.5">
          <span className="text-neutral-600">{new Date(entry.timestamp).toLocaleTimeString()}</span>
          <span className={entry.type === 'req' ? 'text-sky-400' : 'text-emerald-400'}>
            {entry.type === 'req' ? '→' : '←'}
          </span>
          <span className="text-neutral-300">{entry.message}</span>
        </div>
      ))}
    </div>
  );
}
