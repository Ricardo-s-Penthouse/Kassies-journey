'use client'

import { Button, Eyebrow, PageHeader } from '@/components/her/primitives'
import { DiagnosticGrid } from '@/components/her/diagnostic-grid'
import { RoadmapTimeline } from '@/components/her/roadmap-timeline'
import { PILLARS } from '@/lib/content/pillars'
import type { Diagnostics, Profile, Ratings } from '@/lib/store'

export function StepSummary({
  profile,
  ratings,
  diag,
  onFinish,
}: {
  profile: Profile
  ratings: Ratings
  diag: Diagnostics
  onFinish: () => void
}) {
  const avg = Object.values(ratings).reduce((a, b) => a + b, 0) / 5

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        eyebrow="Your profile"
        title={
          <>
            {profile.name.trim() || 'Beautiful'}, your <em className="font-normal">system</em> is ready.
          </>
        }
      >
        Driven by {profile.driver.toLowerCase() || 'your glow-up'}
        {profile.time ? `, with ${profile.time} a day` : ''}.
      </PageHeader>

      <section className="rounded-3xl bg-card p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <Eyebrow>Knowledge baseline</Eyebrow>
          <span className="font-serif text-2xl font-semibold text-plum">{avg.toFixed(1)}/5</span>
        </div>
        <ul className="space-y-2.5">
          {PILLARS.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-xs text-plum">{p.short}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream">
                <div className="h-full rounded-full bg-plum" style={{ width: `${(ratings[p.id] / 5) * 100}%` }} />
              </div>
              <span className="w-4 text-right text-xs text-muted-foreground">{ratings[p.id]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <Eyebrow>Diagnostic results</Eyebrow>
        <DiagnosticGrid diag={diag} />
      </section>

      <section className="space-y-3">
        <Eyebrow>Your tailored roadmap</Eyebrow>
        <RoadmapTimeline ratings={ratings} diag={diag} />
      </section>

      <div className="mt-auto pt-2">
        <Button onClick={onFinish} className="w-full">
          Enter my system
        </Button>
      </div>
    </div>
  )
}
