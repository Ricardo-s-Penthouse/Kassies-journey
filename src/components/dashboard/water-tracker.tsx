'use client'

import { WATER_GOAL } from '@/lib/content/pillars'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'

export function WaterTracker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <section aria-labelledby="water-heading" className="rounded-3xl bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">Hydration</p>
          <h2 id="water-heading" className="font-serif text-2xl font-semibold text-plum">
            {value} <span className="text-base font-normal text-plum/50">/ {WATER_GOAL} glasses</span>
          </h2>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, value - 1))}
            disabled={value === 0}
            aria-label="Remove a glass"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-cream text-plum disabled:opacity-30"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onChange(Math.min(12, value + 1))}
            aria-label="Add a glass"
            className="flex size-10 items-center justify-center rounded-full bg-plum text-gold"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1.5" role="group" aria-label="Glasses of water">
        {Array.from({ length: WATER_GOAL }, (_, i) => {
          const filled = i < value
          return (
            <button
              key={i}
              type="button"
              aria-label={`Set to ${i + 1} glass${i ? 'es' : ''}`}
              aria-pressed={filled}
              onClick={() => onChange(value === i + 1 ? i : i + 1)}
              className="group relative h-14 overflow-hidden rounded-b-xl rounded-t-md border-2 border-plum/15 bg-cream transition-transform active:scale-95"
            >
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#c9a6a0] to-[#e8cfc6] transition-all duration-500 ease-out',
                  filled ? 'h-full' : 'h-0',
                )}
              />
            </button>
          )
        })}
      </div>
      {value >= WATER_GOAL ? (
        <p className="mt-3 text-center text-xs italic text-plum/70">Fully hydrated. Your skin thanks you.</p>
      ) : null}
    </section>
  )
}
