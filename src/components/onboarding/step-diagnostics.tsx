'use client'

import { Button, Eyebrow, PageHeader } from '@/components/her/primitives'
import { QUIZZES, resultLabel, tallyVotes, type Quiz } from '@/lib/content/diagnostics'
import type { Diagnostics } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Check, ChevronRight, Droplet, Footprints, Gem, ScanFace } from 'lucide-react'
import { useState } from 'react'

const ICONS = { skinType: ScanFace, porosity: Droplet, posture: Footprints, undertone: Gem } as const

type AnyQuiz = Quiz<string>

export function StepDiagnostics({
  value,
  onChange,
  onNext,
}: {
  value: Diagnostics
  onChange: (d: Diagnostics) => void
  onNext: () => void
}) {
  const [active, setActive] = useState<AnyQuiz | null>(null)
  const done = QUIZZES.filter((q) => value[q.key]).length

  if (active) {
    return (
      <QuizRunner
        key={active.key}
        quiz={active}
        onCancel={() => setActive(null)}
        onComplete={(result) => {
          onChange({ ...value, [active.key]: result })
          setActive(null)
          window.scrollTo({ top: 0 })
        }}
      />
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader eyebrow="Biological diagnostics" title="Four tests. Real biology.">
        Generic routines fail because they ignore your biology. Complete each at-home test — you can retake them any time
        from your profile.
      </PageHeader>

      <ul className="space-y-3">
        {QUIZZES.map((q) => {
          const Icon = ICONS[q.key]
          const result = value[q.key]
          return (
            <li key={q.key}>
              <button
                type="button"
                onClick={() => setActive(q as unknown as AnyQuiz)}
                className="flex w-full items-center gap-4 rounded-3xl bg-card p-4 text-left transition-transform active:scale-[0.99]"
              >
                <span
                  className={cn(
                    'flex size-12 shrink-0 items-center justify-center rounded-2xl',
                    result ? 'bg-plum text-gold' : 'bg-cream text-plum',
                  )}
                >
                  {result ? <Check className="size-5" aria-hidden="true" /> : <Icon className="size-5" aria-hidden="true" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-xl font-semibold leading-tight text-plum">{q.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {result ? `Result: ${resultLabel(q.key, result).label}` : q.test}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-plum/40" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto space-y-3 pt-2">
        <p className="text-center text-xs text-muted-foreground">
          {done} of {QUIZZES.length} complete
        </p>
        <Button onClick={onNext} className="w-full" variant={done === QUIZZES.length ? 'gold' : 'ghost'}>
          {done === QUIZZES.length ? 'See my roadmap' : 'Skip remaining for now'}
        </Button>
      </div>
    </div>
  )
}

function QuizRunner({
  quiz,
  onCancel,
  onComplete,
}: {
  quiz: AnyQuiz
  onCancel: () => void
  onComplete: (result: string | null) => void
}) {
  const [step, setStep] = useState(-1)
  const [votes, setVotes] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)

  if (result) {
    const copy = resultLabel(quiz.key, result)
    return (
      <div className="flex flex-1 animate-rise flex-col gap-6">
        <div className="rounded-3xl bg-plum p-6 text-cream">
          <Eyebrow className="text-gold">{quiz.title} result</Eyebrow>
          <p className="mt-3 font-serif text-4xl font-semibold">{copy.label}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">{copy.summary}</p>
        </div>
        <div className="mt-auto space-y-2">
          <Button className="w-full" onClick={() => onComplete(result)}>
            Save result
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setVotes([])
              setResult(null)
              setStep(0)
            }}
          >
            Retake test
          </Button>
        </div>
      </div>
    )
  }

  if (step === -1) {
    return (
      <div className="flex flex-1 animate-rise flex-col gap-6">
        <PageHeader eyebrow={quiz.title} title={quiz.test}>
          Follow these steps before answering.
        </PageHeader>
        <ol className="space-y-3">
          {quiz.instructions.map((ins, i) => (
            <li key={ins} className="flex gap-4 rounded-3xl bg-card p-4">
              <span className="font-serif text-2xl font-semibold leading-none text-gold-deep">{i + 1}</span>
              <span className="text-sm leading-relaxed text-plum">{ins}</span>
            </li>
          ))}
        </ol>
        <div className="mt-auto space-y-2">
          <Button className="w-full" onClick={() => setStep(0)}>
            I&apos;m ready
          </Button>
          <Button variant="ghost" className="w-full" onClick={onCancel}>
            Back to tests
          </Button>
        </div>
      </div>
    )
  }

  const q = quiz.questions[step]
  const choose = (vote: string) => {
    const next = [...votes, vote]
    if (step + 1 >= quiz.questions.length) {
      setVotes(next)
      setResult(tallyVotes(next))
    } else {
      setVotes(next)
      setStep(step + 1)
    }
  }

  return (
    <div key={step} className="flex flex-1 animate-rise flex-col gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Eyebrow>{quiz.test}</Eyebrow>
          <span className="text-xs text-muted-foreground">
            {step + 1}/{quiz.questions.length}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-plum/10">
          <div
            className="h-full bg-gold transition-all duration-500"
            style={{ width: `${((step + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
        <h2 className="pt-2 font-serif text-3xl font-semibold leading-tight text-balance text-plum">{q.q}</h2>
      </div>
      <div className="space-y-2">
        {q.options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => choose(o.vote)}
            className="w-full rounded-2xl border border-border bg-cream px-4 py-4 text-left text-sm text-plum transition-all hover:border-gold hover:bg-blush active:scale-[0.99]"
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <button
          type="button"
          onClick={() => {
            if (step === 0) return setStep(-1)
            setVotes(votes.slice(0, -1))
            setStep(step - 1)
          }}
          className="w-full py-3 text-xs font-medium uppercase tracking-[0.18em] text-plum/60 hover:text-plum"
        >
          Previous question
        </button>
      </div>
    </div>
  )
}
