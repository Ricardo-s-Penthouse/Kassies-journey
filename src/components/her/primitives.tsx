'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep', className)}>{children}</p>
  )
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="space-y-2 pb-2">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-serif text-[2.1rem] font-semibold leading-[1.05] text-balance text-plum">{title}</h1>
      {children ? <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{children}</p> : null}
    </header>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-3xl bg-card p-5 text-card-foreground', className)}>{children}</section>
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'gold' | 'plum' | 'ghost' }

export function Button({ variant = 'gold', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        variant === 'gold' && 'bg-gold text-plum shadow-[0_8px_24px_-12px_rgba(168,134,42,0.8)] hover:bg-[#dcbb4c]',
        variant === 'plum' && 'bg-plum text-cream hover:bg-plum/90',
        variant === 'ghost' && 'border border-border bg-transparent text-plum hover:bg-blush',
        className,
      )}
    />
  )
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  label: string
}) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors',
              active ? 'bg-plum text-cream' : 'bg-blush text-plum/70 hover:text-plum',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function Ring({ value, size = 120, stroke = 8, children }: { value: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-plum/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="text-gold transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function Field({ label, children, htmlFor }: { label: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-plum">
        {label}
      </label>
      {children}
    </div>
  )
}

export const inputClass =
  'w-full rounded-2xl border border-border bg-cream px-4 py-3 text-base text-plum placeholder:text-plum/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25'
