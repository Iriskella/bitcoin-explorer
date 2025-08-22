// lib/utils.ts
import { bech32 } from 'bech32';
// bs58check has CJS export; use require to keep it simple in TS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bs58check = require('bs58check');

/** 64 hex chars (case-insensitive) */
export function isValidTxHash(v: string): boolean {
  return /^[0-9a-fA-F]{64}$/.test(v);
}

/** Base58Check for legacy (1..., 3...) with correct checksum */
export function isValidBase58Address(addr: string): boolean {
  try {
    const payload: Buffer = bs58check.decode(addr);   // throws if checksum invalid
    const version = payload[0];                       // network+type
    // mainnet: 0x00 P2PKH (1...), 0x05 P2SH (3...)
    // testnet: 0x6f P2PKH, 0xc4 P2SH
    return [0x00, 0x05, 0x6f, 0xc4].includes(version);
  } catch {
    return false;
  }
}

/** Bech32 for segwit (bc1..., tb1...) with structural checks */
export function isValidBech32Address(addr: string): boolean {
  try {
    const { prefix, words } = bech32.decode(addr); // throws on invalid charset/checksum
    const hrp = prefix.toLowerCase();
    if (hrp !== 'bc' && hrp !== 'tb') return false;
    const ver = words[0]; // witness version
    const prog = bech32.fromWords(words.slice(1));
    if (ver < 0 || ver > 16) return false;
    // witness program length 2..40 bytes (v0 is 20 or 32 bytes, others 2..40)
    if (prog.length < 2 || prog.length > 40) return false;
    return true;
  } catch {
    return false;
  }
}

export function isValidBtcAddress(addr: string): boolean {
  // Try exact validators first
  if (isValidBech32Address(addr)) return true;
  if (isValidBase58Address(addr)) return true;
  return false;
}

/** Detect based on robust validators first, then heuristics as fallback */
export function detectInputType(value: string): 'address' | 'transaction' {
  const v = value.trim();
  if (isValidTxHash(v)) return 'transaction';
  if (isValidBtcAddress(v)) return 'address';

  // Fallback heuristic (keeps UX forgiving if input looks "hex-ty")
  const hexRatio = (v.match(/[0-9a-f]/gi)?.length || 0) / Math.max(1, v.length);
  return hexRatio > 0.8 ? 'transaction' : 'address';
}

/** Display helper */
export function formatBTC(btc: string | number) {
  const n = typeof btc === 'string' ? Number(btc) : btc;
  if (Number.isNaN(n)) return String(btc);
  return n.toLocaleString(undefined, { maximumFractionDigits: 8 });
}
