export function StackTracePanel({ stackTrace }: { stackTrace: string }) {
  return (
    <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Last failure</p>
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-red-200">{stackTrace}</pre>
    </div>
  );
}
