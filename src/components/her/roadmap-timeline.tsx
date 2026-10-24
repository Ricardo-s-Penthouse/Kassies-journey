import { buildRoadmap } from '@/lib/content/diagnostics'
import { PILLARS } from '@/lib/content/pillars'
import type { Diagnostics, Ratings } from '@/lib/store'

export function RoadmapTimeline({ ratings, diag }: { ratings: Ratings; diag: Diagnostics }) {
  const phases = buildRoadmap(ratings, diag)
  return (
    <ol className="relative space-y-3 border-l border-gold/50 pl-5">
      {phases.map((ph, i) => {
        const pillar = PILLARS.find((p) => p.id === ph.focus)
        return (
          <li key={ph.weeks} className="relative">
            <span
              className={`absolute -left-[27px] top-5 size-3 rounded-full border-2 border-gold ${i === 0 ? 'bg-gold' : 'bg-cream'}`}
              aria-hidden="true"
            />
            <div className="rounded-3xl bg-card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{ph.weeks}</p>
              <p className="mt-1 font-serif text-xl font-semibold text-plum">
                {ph.title}
                {i < 3 && pillar ? <span className="font-normal italic text-plum/60"> — {pillar.label}</span> : null}
              </p>
              <ul className="mt-2 space-y-1">
                {ph.actions.map((a) => (
                  <li key={a} className="flex gap-2 text-xs leading-relaxed text-plum/80">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-plum/40" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
