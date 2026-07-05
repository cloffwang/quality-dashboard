'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('ok@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }
    window.location.href = '/';
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border border-neutral-800 bg-neutral-900 p-8"
      >
        <div>
          <h1 className="text-xl font-semibold text-neutral-100">Quality &amp; Uptime Control Center</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Try <code className="text-neutral-300">ok@example.com</code> (healthy) or{' '}
            <code className="text-neutral-300">outage@example.com</code> (outage). Password:{' '}
            <code className="text-neutral-300">password123</code>.
          </p>
        </div>

        <label className="block text-sm text-neutral-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
            required
          />
        </label>

        <label className="block text-sm text-neutral-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
            required
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full rounded bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-500"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
