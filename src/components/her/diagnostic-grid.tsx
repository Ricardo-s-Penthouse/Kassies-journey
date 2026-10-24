import { QUIZZES, resultLabel } from '@/lib/content/diagnostics'
import type { Diagnostics } from '@/lib/store'

export function DiagnosticGrid({ diag, detailed = false }: { diag: Diagnostics; detailed?: boolean }) {
  return (
    <dl className={detailed ? 'space-y-2' : 'grid grid-cols-2 gap-2'}>
      {QUIZZES.map((q) => {
        const r = resultLabel(q.key, diag[q.key])
        const tested = Boolean(diag[q.key])
        return (
          <div key={q.key} className="rounded-2xl border border-border bg-cream p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{q.title}</dt>
            <dd className={`mt-1 font-serif text-xl font-semibold leading-tight ${tested ? 'text-plum' : 'text-plum/40'}`}>
              {r.label}
            </dd>
            {detailed ? <dd className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.summary}</dd> : null}
          </div>
        )
      })}
    </dl>
  )
}
