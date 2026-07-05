'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function LatencyChart({ data }: { data: { timestamp: string; latency: number }[] }) {
  const chartData = data.map((d) => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    latency: d.latency,
  }));

  return (
    <div className="h-64 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#737373" fontSize={12} />
          <YAxis stroke="#737373" fontSize={12} unit="ms" />
          <Tooltip
            contentStyle={{ background: '#171717', border: '1px solid #404040', fontSize: 12 }}
            labelStyle={{ color: '#a3a3a3' }}
          />
          <Line type="monotone" dataKey="latency" stroke="#34d399" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
