import { Ring } from '@/components/her/primitives'
import { PILLARS, WATER_GOAL, type PillarChecklist } from '@/lib/content/pillars'

function message(score: number) {
  if (score >= 90) return 'Radiant. This is the Her Effect.'
  if (score >= 70) return 'Beautiful momentum — keep going.'
  if (score >= 40) return 'Halfway there. Small rituals compound.'
  if (score > 0) return 'A gentle start. Every ritual counts.'
  return 'Your rituals are waiting.'
}

export function ScoreCard({
  score,
  lists,
  checks,
  water,
}: {
  score: number
  lists: PillarChecklist[]
  checks: Record<string, boolean>
  water: number
}) {
  return (
    <section aria-labelledby="score-heading" className="overflow-hidden rounded-3xl bg-plum p-5 text-cream">
      <div className="flex items-center gap-5">
        <div className="text-cream">
          <Ring value={score} size={112} stroke={7}>
            <span className="font-serif text-4xl font-semibold leading-none">{score}</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/60">of 100</span>
          </Ring>
        </div>
        <div className="min-w-0 space-y-1.5">
          <p id="score-heading" className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
            Daily consistency
          </p>
          <p className="font-serif text-xl leading-snug text-pretty">{message(score)}</p>
          <p className="text-xs text-cream/60">
            Water {Math.min(water, WATER_GOAL)}/{WATER_GOAL}
          </p>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-5 gap-2 border-t border-cream/10 pt-4">
        {lists.map((l) => {
          const ids = l.groups.flatMap((g) => g.items.map((i) => `${l.pillar}:${g.id}:${i.id}`))
          const done = ids.filter((id) => checks[id]).length
          const pct = ids.length ? (done / ids.length) * 100 : 0
          const label = PILLARS.find((p) => p.id === l.pillar)?.short
          return (
            <li key={l.pillar} className="space-y-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-cream/15">
                <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-cream/70">
                {label} <span className="text-cream/40">{done}/{ids.length}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
