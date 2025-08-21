
export function isHex64(value: string) {
  return /^[0-9a-fA-F]{64}$/.test(value)
}

export function isLikelyBech32(value: string) {
  // Basic bech32 address heuristic (e.g., bc1...)
  return /^bc1[0-9ac-hj-np-z]{20,80}$/i.test(value)
}

export function isLikelyBase58(value: string) {
  // P2PKH / P2SH heuristic (starts with 1 or 3, length 26-35, Base58 charset)
  return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(value)
}

export function detectInputType(value: string): 'address' | 'transaction' {
  if (isHex64(value)) return 'transaction'
  if (isLikelyBech32(value) || isLikelyBase58(value)) return 'address'
  // Default: try tx first if hex-heavy
  const hexRatio = (value.match(/[0-9a-f]/gi)?.length || 0) / Math.max(1, value.length)
  return hexRatio > 0.8 ? 'transaction' : 'address'
}

export function formatBTC(btc: string | number) {
  const n = typeof btc === 'string' ? Number(btc) : btc
  if (Number.isNaN(n)) return String(btc)
  return n.toLocaleString(undefined, { maximumFractionDigits: 8 })
}
