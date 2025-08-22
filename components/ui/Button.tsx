'use client';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'solid';
};

export function Button({ className, variant = 'outline', ...rest }: Props) {
  const base =
    'focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition';
  const styles =
    variant === 'solid'
      ? clsx(
          'bg-[color:var(--color-accent-primary)] text-black',
          'hover:bg-[color:var(--color-accent-primary)]',
          'border border-transparent shadow-card'
        )
      : clsx(
          // visible without fill; cyan text & border
          'text-[color:var(--color-accent-primary)]',
          'border border-[color:var(--color-accent-primary)]/70',
          'hover:bg-[color:var(--color-accent-primary)] hover:text-black',
          'shadow-card'
        );

  return <button className={clsx(base, styles, className)} {...rest} />;
}
