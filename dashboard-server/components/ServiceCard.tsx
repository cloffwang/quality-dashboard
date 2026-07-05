import Link from 'next/link';
import type { ServiceStatus } from '@/types/metrics';

const statusStyles: Record<ServiceStatus, string> = {
  operational: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  degraded: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  down: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export function ServiceCard({
  id,
  name,
  status,
  domainLabel,
  summary,
}: {
  id: string;
  name: string;
  status: ServiceStatus;
  domainLabel: string;
  summary: string;
}) {
  return (
    <Link
      href={`/services/${id}`}
      className="block rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition hover:border-neutral-700 hover:bg-neutral-800/60"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-neutral-500">{domainLabel}</span>
        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-neutral-100">{name}</h3>
      <p className="mt-1 text-xs text-neutral-400">{summary}</p>
    </Link>
  );
}
