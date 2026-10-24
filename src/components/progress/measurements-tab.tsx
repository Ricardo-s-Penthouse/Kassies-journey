'use client'

import { Button, Field, inputClass } from '@/components/her/primitives'
import { dateKey, parseDateKey, uid, useAppData, type Measurement } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

const num = (s: string) => (s.trim() === '' || Number.isNaN(Number(s)) ? null : Number(s))

export function MeasurementsTab() {
  const { data, update } = useAppData()
  const lastUnit = data?.measurements.at(-1)?.unit ?? 'in'
  const [date, setDate] = useState(dateKey())
  const [waist, setWaist] = useState('')
  const [hips, setHips] = useState('')
  const [posture, setPosture] = useState(5)
  const [unit, setUnit] = useState<'in' | 'cm'>(lastUnit)

  if (!data) return null
  const sorted = [...data.measurements].sort((a, b) => a.date.localeCompare(b.date))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const entry: Measurement = { id: uid(), date, waist: num(waist), hips: num(hips), posture, unit }
    if (entry.waist === null && entry.hips === null) return
    update((d) => ({ ...d, measurements: [...d.measurements.filter((m) => m.date !== date), entry] }))
    setWaist('')
    setHips('')
  }

  const remove = (id: string) => update((d) => ({ ...d, measurements: d.measurements.filter((m) => m.id !== id) }))

  const first = sorted[0]
  const last = sorted.at(-1)

  return (
    <div className="space-y-4">
      <form onSubmit={save} className="space-y-4 rounded-3xl bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-plum">Log measurements</h2>
          <div className="flex rounded-full bg-cream p-0.5" role="radiogroup" aria-label="Unit">
            {(['in', 'cm'] as const).map((u) => (
              <button
                key={u}
                type="button"
                role="radio"
                aria-checked={unit === u}
                onClick={() => setUnit(u)}
                className={cn('rounded-full px-3 py-1 text-xs font-medium', unit === u ? 'bg-plum text-cream' : 'text-plum/60')}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <Field label="Date" htmlFor="m-date">
          <input id="m-date" type="date" className={inputClass} value={date} max={dateKey()} onChange={(e) => setDate(e.target.value)} required />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={`Waist (${unit})`} htmlFor="m-waist">
            <input id="m-waist" inputMode="decimal" className={inputClass} placeholder="—" value={waist} onChange={(e) => setWaist(e.target.value)} />
          </Field>
          <Field label={`Hips (${unit})`} htmlFor="m-hips">
            <input id="m-hips" inputMode="decimal" className={inputClass} placeholder="—" value={hips} onChange={(e) => setHips(e.target.value)} />
          </Field>
        </div>
        <Field label={`Posture score: ${posture}/10`} htmlFor="m-posture">
          <input
            id="m-posture"
            type="range"
            min={1}
            max={10}
            value={posture}
            onChange={(e) => setPosture(Number(e.target.value))}
            className="w-full accent-[#2C1A2E]"
          />
        </Field>
        <Button type="submit" className="w-full" disabled={!waist && !hips}>
          Save entry
        </Button>
      </form>

      {sorted.length >= 2 && first && last ? (
        <section className="space-y-4 rounded-3xl bg-plum p-5 text-cream" aria-label="Measurement trends">
          <div className="grid grid-cols-3 gap-2">
            <Delta label="Waist" a={first.waist} b={last.waist} unit={last.unit} invert />
            <Delta label="Hips" a={first.hips} b={last.hips} unit={last.unit} />
            <Delta label="Posture" a={first.posture} b={last.posture} unit="" />
          </div>
          <TrendChart entries={sorted} />
        </section>
      ) : null}

      <section aria-labelledby="history-h" className="space-y-2">
        <h2 id="history-h" className="px-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
          History
        </h2>
        {sorted.length === 0 ? (
          <p className="rounded-3xl bg-card p-5 text-center text-sm text-muted-foreground">
            No entries yet. Log your first measurement to start tracking.
          </p>
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-3xl bg-card">
            {[...sorted].reverse().map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-4 py-3">
                <span className="w-20 shrink-0 text-xs text-muted-foreground">
                  {parseDateKey(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
                </span>
                <span className="flex-1 text-sm text-plum">
                  W {m.waist ?? '—'} · H {m.hips ?? '—'} <span className="text-plum/50">{m.unit}</span> · P {m.posture ?? '—'}
                </span>
                <button
                  type="button"
                  onClick={() => remove(m.id)}
                  aria-label={`Delete entry from ${m.date}`}
                  className="flex size-8 items-center justify-center rounded-full text-plum/40 hover:bg-cream hover:text-plum"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function Delta({ label, a, b, unit, invert }: { label: string; a: number | null; b: number | null; unit: string; invert?: boolean }) {
  const diff = a !== null && b !== null ? +(b - a).toFixed(1) : null
  const good = diff !== null && (invert ? diff < 0 : diff > 0)
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/60">{label}</p>
      <p className={cn('font-serif text-2xl font-semibold', diff === null ? 'text-cream/50' : good ? 'text-gold' : 'text-cream')}>
        {diff === null ? '—' : `${diff > 0 ? '+' : ''}${diff}`}
        <span className="text-xs font-normal text-cream/50"> {unit}</span>
      </p>
    </div>
  )
}

function TrendChart({ entries }: { entries: Measurement[] }) {
  const W = 300
  const H = 100
  const series = [
    { key: 'waist' as const, color: '#D4AF37', label: 'Waist' },
    { key: 'hips' as const, color: '#F4E8E1', label: 'Hips' },
  ]
  const values = entries.flatMap((e) => [e.waist, e.hips]).filter((v): v is number => v !== null)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const x = (i: number) => (entries.length === 1 ? W / 2 : (i / (entries.length - 1)) * W)
  const y = (v: number) => H - 8 - ((v - min) / range) * (H - 16)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full overflow-visible" role="img" aria-label="Waist and hips over time">
        {series.map((s) => {
          const pts = entries.map((e, i) => (e[s.key] !== null ? `${x(i)},${y(e[s.key] as number)}` : null)).filter(Boolean)
          return (
            <g key={s.key}>
              <polyline points={pts.join(' ')} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              {entries.map((e, i) =>
                e[s.key] !== null ? <circle key={e.id} cx={x(i)} cy={y(e[s.key] as number)} r={3} fill={s.color} /> : null,
              )}
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex gap-4 text-[11px] text-cream/70">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
