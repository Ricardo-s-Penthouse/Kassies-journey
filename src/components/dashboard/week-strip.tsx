import { consistencyScore } from '@/lib/content/pillars'
import { dateKey, type AppData } from '@/lib/store'
import { cn } from '@/lib/utils'

export function WeekStrip({ data, allIds }: { data: AppData; allIds: string[] }) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const key = dateKey(d)
    return {
      key,
      label: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
      score: consistencyScore(data.checklists[key], data.water[key], allIds),
      isToday: i === 6,
    }
  })
  const avg = Math.round(days.reduce((a, d) => a + d.score, 0) / 7)

  return (
    <section aria-label="Last 7 days" className="rounded-3xl bg-card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">This week</p>
        <p className="text-xs text-muted-foreground">
          Avg <span className="font-semibold text-plum">{avg}</span>
        </p>
      </div>
      <ul className="grid grid-cols-7 items-end gap-2">
        {days.map((d) => (
          <li key={d.key} className="flex flex-col items-center gap-1.5">
            <div className="flex h-14 w-full items-end overflow-hidden rounded-lg bg-cream">
              <div
                className={cn('w-full rounded-lg transition-all duration-700', d.isToday ? 'bg-gold' : 'bg-plum/80')}
                style={{ height: `${Math.max(d.score, 4)}%` }}
              />
            </div>
            <span className={cn('text-[10px]', d.isToday ? 'font-semibold text-plum' : 'text-muted-foreground')}>
              {d.label}
              <span className="sr-only">: {d.score}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
