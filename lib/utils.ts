// lib/utils.ts
import { bech32, bech32m } from 'bech32';
import bs58check from 'bs58check';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined' && !(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

export function isValidTxHash(v: string): boolean {
  return /^[0-9a-fA-F]{64}$/.test(v);
}

export function isValidBase58Address(addr: string): boolean {
  try {
    const payload: Uint8Array = bs58check.decode(addr);
    const version = payload[0];
    return [0x00, 0x05, 0x6f, 0xc4].includes(version);
  } catch {
    return false;
  }
}

/** v0 => bech32 checksum + program len 20/32
 *  v1..16 => bech32m checksum + program len 2..40
 */
export function isValidBech32Address(addr: string): boolean {
  const a = addr.trim();

  // must be all lower or all upper
  const hasUpper = /[A-Z]/.test(a);
  const hasLower = /[a-z]/.test(a);
  if (hasUpper && hasLower) return false;

  let dec: { prefix: string; words: number[] } | null = null;
  let encoding: 'bech32' | 'bech32m' | null = null;

  try {
    dec = bech32.decode(a);
    encoding = 'bech32';
  } catch {
    try {
      dec = bech32m.decode(a);
      encoding = 'bech32m';
    } catch {
      return false;
    }
  }

  const hrp = dec.prefix.toLowerCase();
  if (!['bc', 'tb', 'bcrt'].includes(hrp)) return false;

  const words = dec.words;
  if (!words?.length) return false;

  const ver = words[0]; // witness version
  const prog = bech32.fromWords(words.slice(1)); // bytes

  if (ver === 0) {
    if (encoding !== 'bech32') return false;
    if (!(prog.length === 20 || prog.length === 32)) return false;
    return true;
  }

  if (ver >= 1 && ver <= 16) {
    if (encoding !== 'bech32m') return false;
    if (prog.length < 2 || prog.length > 40) return false;
    return true;
  }

  return false;
}

export function isValidBtcAddress(addr: string): boolean {
  return isValidBech32Address(addr) || isValidBase58Address(addr);
}

export function detectInputType(value: string): 'address' | 'transaction' {
  const v = value.trim();
  if (isValidTxHash(v)) return 'transaction';
  if (isValidBtcAddress(v)) return 'address';
  const hexRatio = (v.match(/[0-9a-f]/gi)?.length || 0) / Math.max(1, v.length);
  return hexRatio > 0.8 ? 'transaction' : 'address';
}

export function formatBTC(btc: string | number) {
  const n = typeof btc === 'string' ? Number(btc) : btc;
  if (Number.isNaN(n)) return String(btc);
  return n.toLocaleString(undefined, { maximumFractionDigits: 8 });
}

// Dev helper you can call from the console (via ExposeDebug)
export function debugBech32(a: string) {
  try {
    let enc: 'bech32' | 'bech32m' = 'bech32';
    let d;
    try {
      d = bech32.decode(a);
      enc = 'bech32';
    } catch {
      d = bech32m.decode(a);
      enc = 'bech32m';
    }
    const ver = d.words[0];
    const progLen = bech32.fromWords(d.words.slice(1)).length;
    console.log({ enc, hrp: d.prefix, ver, progLen });
  } catch (e) {
    console.log('decode failed:', (e as Error).message);
  }
}
