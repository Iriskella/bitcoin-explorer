
'use client'
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props
  return (
    <button
      className={clsx(
        'focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold',
        'bg-[color:var(--color-accent-primary)]/90 hover:bg-[color:var(--color-accent-primary)]',
        'text-black transition shadow-card border border-transparent',
        className
      )}
      {...rest}
    />
  )
}
