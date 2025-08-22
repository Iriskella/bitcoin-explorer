
import { HTMLAttributes } from 'react'
import { Card } from './ui/Card'
import { formatBTC } from '../lib/utils'

export function AddressResult({ data, className }: { data: any, className?: string }) {
  return (
    <Card className={className}>
      <h2 className="text-lg font-semibold">Address</h2>
      <div className="mt-3 grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-base-muted">Address</span>
          <span className="font-mono flex items-center gap-2">
            {data.address}
            <button
              type="button"
              aria-label="Copy address"
              className="ml-2 px-2 py-1 rounded bg-base-border/30 hover:bg-base-border/60 text-xs"
              onClick={() => {
                navigator.clipboard.writeText(data.address)
              }}
            >
              Copy
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base-muted">Balance</span>
          <span>{formatBTC(data.balance)} BTC</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base-muted">Transactions</span>
          <span>{data.transaction_count}</span>
        </div>
      </div>
    </Card>
  )
}
