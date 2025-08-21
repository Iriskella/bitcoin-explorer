
'use client'
import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props
  return (
    <input
      className={clsx(
        'focus-ring w-full rounded-xl border border-base-border/60 bg-white/5 px-3 py-2 text-sm',
        'placeholder:text-base-muted text-[color:var(--color-text)]',
        className
      )}
      {...rest}
    />
  )
}
