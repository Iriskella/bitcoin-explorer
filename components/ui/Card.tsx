
import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-base-border/60 bg-black/10 p-4 shadow-card backdrop-blur-sm',
        className
      )}
      {...rest}
    />
  )
}
