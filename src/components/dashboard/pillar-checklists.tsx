'use client'

import { Segmented } from '@/components/her/primitives'
import { PILLARS, type PillarChecklist } from '@/lib/content/pillars'
import type { PillarId } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState } from 'react'

export function PillarChecklists({
  lists,
  checks,
  onToggle,
}: {
  lists: PillarChecklist[]
  checks: Record<string, boolean>
  onToggle: (id: string) => void
}) {
  const [pillar, setPillar] = useState<PillarId>('skin')
  const [skinTime, setSkinTime] = useState<'am' | 'pm'>(() => (new Date().getHours() >= 16 ? 'pm' : 'am'))

  const current = lists.find((l) => l.pillar === pillar)
  const meta = PILLARS.find((p) => p.id === pillar)
  const groups = current
    ? pillar === 'skin'
      ? current.groups.filter((g) => g.id === skinTime)
      : current.groups
    : []

  return (
    <section aria-labelledby="rituals-heading" className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 id="rituals-heading" className="font-serif text-2xl font-semibold text-plum">
          Daily rituals
        </h2>
        <span className="text-xs text-muted-foreground">{meta?.description}</span>
      </div>

      <Segmented
        label="Pillar"
        value={pillar}
        onChange={setPillar}
        options={PILLARS.map((p) => ({ value: p.id, label: p.short }))}
      />

      <div key={pillar + skinTime} className="animate-page-in space-y-3">
        {pillar === 'skin' ? (
          <div className="grid grid-cols-2 gap-1 rounded-full bg-blush p-1" role="tablist" aria-label="Skin routine time">
            {(['am', 'pm'] as const).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={skinTime === t}
                onClick={() => setSkinTime(t)}
                className={cn(
                  'rounded-full py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all',
                  skinTime === t ? 'bg-cream text-plum shadow-sm' : 'text-plum/50',
                )}
              >
                {t === 'am' ? 'AM ritual' : 'PM ritual'}
              </button>
            ))}
          </div>
        ) : null}

        {groups.map((g) => {
          const ids = g.items.map((i) => `${pillar}:${g.id}:${i.id}`)
          const done = ids.filter((id) => checks[id]).length
          return (
            <div key={g.id} className="rounded-3xl bg-card p-2">
              <div className="flex items-center justify-between px-3 pb-1 pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-deep">{g.title}</p>
                <p className="text-xs text-muted-foreground">
                  {done}/{g.items.length}
                </p>
              </div>
              <ul>
                {g.items.map((item) => {
                  const id = `${pillar}:${g.id}:${item.id}`
                  const checked = Boolean(checks[id])
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => onToggle(id)}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-cream/60"
                      >
                        <span
                          className={cn(
                            'flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-300',
                            checked ? 'scale-105 border-plum bg-plum text-gold' : 'border-plum/30 bg-cream',
                          )}
                        >
                          <Check
                            className={cn('size-3.5 transition-opacity', checked ? 'opacity-100' : 'opacity-0')}
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block text-sm transition-colors',
                              checked ? 'text-plum/45 line-through decoration-plum/30' : 'text-plum',
                            )}
                          >
                            {item.label}
                          </span>
                          {item.hint ? <span className="block text-xs text-muted-foreground">{item.hint}</span> : null}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
