'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="focus-ring rounded-xl border border-base-border/60 px-3 py-1 text-xs hover:bg-white/5 transition"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Toggle theme"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
