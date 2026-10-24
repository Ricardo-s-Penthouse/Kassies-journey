'use client'

import { Button, Field, PageHeader, inputClass } from '@/components/her/primitives'
import type { Profile } from '@/lib/store'
import { cn } from '@/lib/utils'

const AGE_GROUPS = ['18–24', '25–34', '35–44', '45–54', '55+']
const DRIVERS = [
  { value: 'Self-Reinvention & Radiance', hint: 'Become the most luminous version of myself' },
  { value: 'Career & Executive Presence', hint: 'Command rooms with polish and poise' },
  { value: 'Discipline & Daily Habits', hint: 'Build routines that finally stick' },
  { value: 'Confidence After a Life Change', hint: 'Reclaim myself after a new chapter' },
]
const TIMES = ['15–20 min', '30–45 min', '60+ min']

export function StepProfile({
  value,
  onChange,
  onNext,
}: {
  value: Profile
  onChange: (p: Profile) => void
  onNext: () => void
}) {
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => onChange({ ...value, [k]: v })
  const valid = value.name.trim().length > 0 && value.ageGroup && value.driver

  return (
    <form
      className="flex flex-1 flex-col gap-7"
      onSubmit={(e) => {
        e.preventDefault()
        if (valid) onNext()
      }}
    >
      <PageHeader eyebrow="Personal profile" title={<>Let&apos;s begin with <em className="font-normal">you</em>.</>}>
        Your answers shape every ritual, lesson and recommendation in your system.
      </PageHeader>

      <Field label="What should we call you?" htmlFor="ob-name">
        <input
          id="ob-name"
          autoComplete="given-name"
          className={inputClass}
          placeholder="e.g. Victoria"
          value={value.name}
          onChange={(e) => set('name', e.target.value)}
          maxLength={40}
        />
      </Field>

      <fieldset className="space-y-2">
        <legend className="mb-1.5 text-xs font-medium text-plum">Age group</legend>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((a) => (
            <Chip key={a} active={value.ageGroup === a} onClick={() => set('ageGroup', a)}>
              {a}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-1.5 text-xs font-medium text-plum">Your core driver</legend>
        <div className="space-y-2">
          {DRIVERS.map((d) => {
            const active = value.driver === d.value
            return (
              <button
                key={d.value}
                type="button"
                aria-pressed={active}
                onClick={() => set('driver', d.value)}
                className={cn(
                  'w-full rounded-2xl border px-4 py-3.5 text-left transition-all',
                  active ? 'border-gold bg-blush shadow-sm' : 'border-border bg-cream hover:bg-blush/60',
                )}
              >
                <span className="block font-serif text-lg font-semibold leading-tight text-plum">{d.value}</span>
                <span className="text-xs text-muted-foreground">{d.hint}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-1.5 text-xs font-medium text-plum">Daily time you can guarantee</legend>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <Chip key={t} active={value.time === t} onClick={() => set('time', t)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="mt-auto pt-2">
        <Button type="submit" disabled={!valid} className="w-full">
          Continue
        </Button>
      </div>
    </form>
  )
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-all',
        active ? 'border-plum bg-plum text-cream' : 'border-border bg-cream text-plum hover:bg-blush',
      )}
    >
      {children}
    </button>
  )
}
