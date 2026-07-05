import type { ServiceStatus } from '@/types/metrics';

const statusColor: Record<ServiceStatus, string> = {
  operational: 'bg-emerald-500',
  degraded: 'bg-amber-500',
  down: 'bg-red-500',
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function WeeklyCalendar({ history }: { history: ServiceStatus[] }) {
  return (
    <div className="flex gap-2">
      {history.map((status, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={`h-8 w-8 rounded ${statusColor[status]}`} title={status} />
          <span className="text-[10px] text-neutral-500">{DAY_LABELS[i] ?? ''}</span>
        </div>
      ))}
    </div>
  );
}
