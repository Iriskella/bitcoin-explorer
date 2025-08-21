const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '');

if (typeof window !== 'undefined') {
  // visible in browser devtools; confirms what the app is using
  console.log('[API BASE]', BASE);
}

async function handle(res: Response) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function fetchAddress(address: string) {
  return handle(
    await fetch(`${BASE}/address/${encodeURIComponent(address)}`, { cache: 'no-store' })
  );
}

export async function fetchTransaction(tx: string) {
  return handle(
    await fetch(`${BASE}/transaction/${encodeURIComponent(tx)}`, { cache: 'no-store' })
  );
}
