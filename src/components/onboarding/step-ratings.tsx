'use client'

import { Button, PageHeader } from '@/components/her/primitives'
import { PILLARS } from '@/lib/content/pillars'
import type { Ratings } from '@/lib/store'
import { cn } from '@/lib/utils'

const SCALE = ['New to it', 'Curious', 'Some basics', 'Confident', 'Expert']

export function StepRatings({
  value,
  onChange,
  onNext,
}: {
  value: Ratings
  onChange: (r: Ratings) => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader eyebrow="Knowledge assessment" title="Where are you starting from?">
        Rate your current knowledge from 1 to 5. Lower scores become the first pillars on your roadmap.
      </PageHeader>

      <div className="space-y-3">
        {PILLARS.map((p) => {
          const current = value[p.id]
          return (
            <fieldset key={p.id} className="rounded-3xl bg-card p-4">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <legend className="font-serif text-xl font-semibold text-plum">{p.label}</legend>
                <span className="text-[11px] text-muted-foreground">{SCALE[current - 1]}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${p.label}: ${n} — ${SCALE[n - 1]}`}
                    aria-pressed={current === n}
                    onClick={() => onChange({ ...value, [p.id]: n })}
                    className={cn(
                      'h-11 rounded-xl text-sm font-medium transition-all',
                      n <= current ? 'bg-plum text-gold' : 'bg-cream text-plum/50 hover:text-plum',
                      current === n && 'ring-2 ring-gold ring-offset-2 ring-offset-card',
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
          )
        })}
      </div>

      <div className="mt-auto pt-2">
        <Button onClick={onNext} className="w-full">
          Continue to diagnostics
        </Button>
      </div>
    </div>
  )
}
