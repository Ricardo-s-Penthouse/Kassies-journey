'use client'

import { dateKey, parseDateKey, useAppData, type HairEvent } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const EVENTS: { id: HairEvent; label: string; dot: string }[] = [
  { id: 'wash', label: 'Wash day', dot: 'bg-plum' },
  { id: 'deep', label: 'Deep condition', dot: 'bg-gold' },
  { id: 'treatment', label: 'Scalp / oil treatment', dot: 'bg-[#c48b8b]' },
  { id: 'protective', label: 'Protective style', dot: 'bg-[#8e9b88]' },
]

const INTERVAL: Record<string, number> = { low: 5, normal: 5, high: 6 }

export function HairCalendar() {
  const { data, update } = useAppData()
  const now = new Date()
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [brush, setBrush] = useState<HairEvent>('wash')
  if (!data) return null

  const log = data.hairLog
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const lead = (new Date(year, month, 1).getDay() + 6) % 7
  const todayKey = dateKey()

  const toggle = (key: string) =>
    update((d) => {
      const next = { ...d.hairLog }
      if (next[key] === brush) delete next[key]
      else next[key] = brush
      return { ...d, hairLog: next }
    })

  const washes = Object.entries(log)
    .filter(([, v]) => v === 'wash' || v === 'deep')
    .map(([k]) => k)
    .sort()
  const lastWash = washes.at(-1)
  const daysSince = lastWash ? Math.round((parseDateKey(todayKey).getTime() - parseDateKey(lastWash).getTime()) / 86400000) : null
  const interval = INTERVAL[data.diagnostics.porosity ?? 'normal']
  const nextIn = daysSince === null ? null : interval - daysSince

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-3xl bg-plum p-4 text-cream">
          <p className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Since last wash</p>
          <p className="mt-1 font-serif text-3xl font-semibold">
            {daysSince ?? '—'}
            <span className="text-sm font-normal text-cream/50"> days</span>
          </p>
        </div>
        <div className="rounded-3xl bg-card p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Next wash</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-plum">
            {nextIn === null ? '—' : nextIn <= 0 ? 'Today' : `${nextIn}d`}
          </p>
          <p className="text-[10px] text-muted-foreground">Every ~{interval} days for your porosity</p>
        </div>
      </section>

      <section className="rounded-3xl bg-card p-4" aria-label="Hair care calendar">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            aria-label="Previous month"
            className="flex size-9 items-center justify-center rounded-full hover:bg-cream"
          >
            <ChevronLeft className="size-4 text-plum" aria-hidden="true" />
          </button>
          <h2 className="font-serif text-xl font-semibold text-plum">
            {cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </h2>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            aria-label="Next month"
            className="flex size-9 items-center justify-center rounded-full hover:bg-cream"
          >
            <ChevronRight className="size-4 text-plum" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} className="pb-1 text-[10px] font-semibold text-muted-foreground" aria-hidden="true">
              {d}
            </span>
          ))}
          {Array.from({ length: lead }, (_, i) => (
            <span key={`l${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const key = dateKey(new Date(year, month, i + 1))
            const ev = EVENTS.find((e) => e.id === log[key])
            const isToday = key === todayKey
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                aria-label={`${key}${ev ? `: ${ev.label}` : ''}`}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center gap-0.5 rounded-xl text-xs transition-colors',
                  ev ? 'bg-blush font-semibold text-plum' : 'text-plum/80 hover:bg-cream',
                  isToday && 'ring-1 ring-gold',
                )}
              >
                {i + 1}
                <span className={cn('size-1.5 rounded-full', ev ? ev.dot : 'bg-transparent')} aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </section>

      <fieldset className="rounded-3xl bg-card p-4">
        <legend className="sr-only">Event to log</legend>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-deep">Tap a day to log</p>
        <div className="grid grid-cols-2 gap-2">
          {EVENTS.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={brush === e.id}
              onClick={() => setBrush(e.id)}
              className={cn(
                'flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-xs transition-all',
                brush === e.id ? 'border-plum bg-cream text-plum' : 'border-transparent text-plum/70',
              )}
            >
              <span className={cn('size-2.5 shrink-0 rounded-full', e.dot)} aria-hidden="true" />
              {e.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
