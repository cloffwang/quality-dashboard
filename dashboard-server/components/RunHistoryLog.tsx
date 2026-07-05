export function RunHistoryLog({ entries }: { entries: { timestamp: string; passed: boolean }[] }) {
  return (
    <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900">
      {entries
        .slice()
        .reverse()
        .map((entry, i) => (
          <li key={i} className="flex items-center justify-between px-4 py-2 text-sm">
            <span className="text-neutral-400">{new Date(entry.timestamp).toLocaleString()}</span>
            <span className={entry.passed ? 'text-emerald-400' : 'text-red-400'}>
              {entry.passed ? 'passed' : 'failed'}
            </span>
          </li>
        ))}
    </ul>
  );
}
