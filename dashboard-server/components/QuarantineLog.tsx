export function QuarantineLog({
  entries,
}: {
  entries: { id: string; timestamp: string; rule: string; sampleRow?: string }[];
}) {
  if (entries.length === 0) {
    return (
      <p data-testid="quarantine-log" className="text-sm text-neutral-500">
        No quarantined rows.
      </p>
    );
  }

  return (
    <ul data-testid="quarantine-log" className="space-y-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          data-testid="quarantine-entry"
          className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-3"
        >
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span className="font-semibold">{entry.rule}</span>
            <span>{new Date(entry.timestamp).toLocaleString()}</span>
          </div>
          {entry.sampleRow && (
            <pre className="mt-1 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-neutral-300">
              {entry.sampleRow}
            </pre>
          )}
        </li>
      ))}
    </ul>
  );
}
