'use client'

import { Button, Field, inputClass } from '@/components/her/primitives'
import { dateKey, parseDateKey, uid, useAppData, type JournalEntry } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState } from 'react'

const MOODS = ['Depleted', 'Low', 'Steady', 'Bright', 'Radiant']
const PROMPTS = [
  'Where did I act from fullness instead of need today?',
  'What did my body thank me for today?',
  'What would the most magnetic version of me do tomorrow?',
  'Which moment today am I proud of, however small?',
]

export function JournalTab() {
  const { data } = useAppData()
  if (!data) return null
  const today = dateKey()
  const existing = data.journal.find((j) => j.date === today)
  return <JournalInner key={existing?.id ?? 'new'} existing={existing} entries={data.journal} today={today} />
}

function JournalInner({ existing, entries, today }: { existing?: JournalEntry; entries: JournalEntry[]; today: string }) {
  const { update } = useAppData()
  const [mood, setMood] = useState(existing?.mood ?? 3)
  const [gratitude, setGratitude] = useState<string[]>(existing?.gratitude ?? ['', '', ''])
  const [win, setWin] = useState(existing?.win ?? '')
  const [reflection, setReflection] = useState(existing?.reflection ?? '')
  const [saved, setSaved] = useState(false)
  const prompt = PROMPTS[new Date().getDate() % PROMPTS.length]

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const entry: JournalEntry = { id: existing?.id ?? uid(), date: today, mood, gratitude, win, reflection }
    update((d) => ({ ...d, journal: [...d.journal.filter((j) => j.date !== today), entry] }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const past = entries.filter((j) => j.date !== today).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-4">
      <form onSubmit={save} className="space-y-5 rounded-3xl bg-card p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">Evening reflection</p>
          <h2 className="font-serif text-xl font-semibold text-plum">{existing ? 'Tonight’s entry' : 'How was today?'}</h2>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-medium text-plum">Energy: {MOODS[mood - 1]}</legend>
          <div className="grid grid-cols-5 gap-1.5">
            {MOODS.map((m, i) => (
              <button
                key={m}
                type="button"
                aria-pressed={mood === i + 1}
                aria-label={m}
                onClick={() => setMood(i + 1)}
                className={cn(
                  'flex h-11 items-center justify-center rounded-xl transition-all',
                  mood === i + 1 ? 'bg-plum' : 'bg-cream',
                )}
              >
                <span
                  className={cn('rounded-full', mood === i + 1 ? 'bg-gold' : 'bg-plum/25')}
                  style={{ width: 6 + i * 3, height: 6 + i * 3 }}
                />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-xs font-medium text-plum">Three things I&apos;m grateful for</legend>
          {gratitude.map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-4 font-serif text-lg font-semibold text-gold-deep">{i + 1}</span>
              <input
                aria-label={`Gratitude ${i + 1}`}
                className={inputClass}
                value={g}
                onChange={(e) => setGratitude(gratitude.map((x, j) => (j === i ? e.target.value : x)))}
                maxLength={140}
              />
            </div>
          ))}
        </fieldset>

        <Field label="Today’s glow win" htmlFor="j-win">
          <input id="j-win" className={inputClass} value={win} onChange={(e) => setWin(e.target.value)} maxLength={160} />
        </Field>

        <Field label={prompt} htmlFor="j-ref">
          <textarea
            id="j-ref"
            rows={4}
            className={cn(inputClass, 'h-auto resize-none py-3 leading-relaxed')}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            maxLength={2000}
          />
        </Field>

        <Button type="submit" className="w-full">
          {saved ? (
            <>
              <Check className="size-4" aria-hidden="true" /> Saved
            </>
          ) : existing ? (
            'Update entry'
          ) : (
            'Save reflection'
          )}
        </Button>
      </form>

      <section aria-labelledby="past-h" className="space-y-2">
        <h2 id="past-h" className="px-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
          Past reflections
        </h2>
        {past.length === 0 ? (
          <p className="rounded-3xl bg-card p-5 text-center text-sm text-muted-foreground">Your past entries will appear here.</p>
        ) : (
          <ul className="space-y-2">
            {past.map((j) => (
              <li key={j.id}>
                <details className="group rounded-3xl bg-card p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="font-serif text-lg font-semibold text-plum">
                      {parseDateKey(j.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs text-muted-foreground">{MOODS[j.mood - 1]}</span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-plum/85">
                    {j.gratitude.filter(Boolean).length ? (
                      <ul className="space-y-1">
                        {j.gratitude.filter(Boolean).map((g) => (
                          <li key={g}>· {g}</li>
                        ))}
                      </ul>
                    ) : null}
                    {j.win ? <p><span className="font-semibold text-plum">Win:</span> {j.win}</p> : null}
                    {j.reflection ? <p className="whitespace-pre-wrap italic">{j.reflection}</p> : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
