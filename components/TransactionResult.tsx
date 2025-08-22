
import { Card } from './ui/Card'

export function TransactionResult({ data, className }: { data: any, className?: string }) {
  return (
    <Card className={className}>
      <h2 className="text-lg font-semibold">Transaction</h2>
      <div className="mt-3 grid gap-3">
        <Row label="Hash" value={
          <span className="flex items-center gap-2">
            <code className="font-mono break-all">{data.hash}</code>
            <button
              type="button"
              aria-label="Copy transaction hash"
              className="ml-2 px-2 py-1 rounded bg-base-border/30 hover:bg-base-border/60 text-xs"
              onClick={() => {
                navigator.clipboard.writeText(data.hash)
              }}
            >
              Copy
            </button>
          </span>
        } />
        <Row label="Fee" value={`${data.fee} BTC`} />
        <div className="grid md:grid-cols-2 gap-3">
          <Panel title="Inputs" items={data.inputs} />
          <Panel title="Outputs" items={data.outputs} />
        </div>
        <Row label="Index" value={String(data.transaction_index)} />
        <Row label="Block time" value={new Date(data.block_time).toLocaleString()} />
      </div>
    </Card>
  )
}

function Row({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-base-muted">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  )
}

function Panel({ title, items }: { title: string, items: Array<{ address: string, amount: string }> }) {
  return (
    <div className="rounded-xl border border-base-border/60 p-3">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="space-y-2">
        {items?.length ? items.map((it, i) => (
          <div key={i} className="flex items-center justify-between text-xs md:text-sm">
            <code className="font-mono break-all">{it.address}</code>
            <span>{it.amount}</span>
          </div>
        )) : <div className="text-base-muted text-sm">No items</div>}
      </div>
    </div>
  )
}
