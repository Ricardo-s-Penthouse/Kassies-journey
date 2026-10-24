'use client'

import { PageHeader } from '@/components/her/primitives'
import { MODULES } from '@/lib/content/academy'
import { useAppData } from '@/lib/store'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function AcademyIndex() {
  const { data } = useAppData()
  if (!data) return null
  const done = new Set(data.lessonsDone)
  const total = MODULES.reduce((a, m) => a + m.lessons.length, 0)
  const completed = MODULES.reduce((a, m) => a + m.lessons.filter((l) => done.has(l.id)).length, 0)

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Masterclass Academy" title={<>The science behind the <em className="font-normal">glow</em>.</>}>
        Five modules, each tailored to your diagnostics.
      </PageHeader>

      <div className="rounded-3xl bg-plum p-5 text-cream">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Your progress</p>
          <p className="font-serif text-2xl font-semibold">
            {completed}
            <span className="text-base font-normal text-cream/50">/{total} lessons</span>
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream/15">
          <div
            className="h-full rounded-full bg-gold transition-all duration-700"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {MODULES.map((m, i) => {
          const mDone = m.lessons.filter((l) => done.has(l.id)).length
          const minutes = m.lessons.reduce((a, l) => a + l.minutes, 0)
          return (
            <li key={m.slug} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <Link
                href={`/academy/${m.slug}`}
                className="group block rounded-3xl bg-card p-5 transition-transform active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-serif text-4xl font-semibold leading-none text-gold-deep">{m.number}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-cream text-plum transition-colors group-hover:bg-plum group-hover:text-gold">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-balance text-plum">{m.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{m.subtitle}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex flex-1 gap-1">
                    {m.lessons.map((l) => (
                      <span
                        key={l.id}
                        className={`h-1 flex-1 rounded-full ${done.has(l.id) ? 'bg-plum' : 'bg-plum/15'}`}
                      />
                    ))}
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {mDone}/{m.lessons.length} · {minutes} min
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
