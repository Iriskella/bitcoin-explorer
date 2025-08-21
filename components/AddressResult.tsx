
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
          <span className="font-mono">{data.address}</span>
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
