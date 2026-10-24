'use client'

import { Eyebrow } from '@/components/her/primitives'
import { SplashScreen } from '@/components/her/app-shell'
import { defaultData, useAppData, type Diagnostics, type Profile, type Ratings } from '@/lib/store'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { StepDiagnostics } from './step-diagnostics'
import { StepProfile } from './step-profile'
import { StepRatings } from './step-ratings'
import { StepSummary } from './step-summary'

const STAGES = ['Profile', 'Knowledge', 'Diagnostics', 'Roadmap'] as const

export function OnboardingWizard() {
  const { data } = useAppData()
  if (data === null) return <SplashScreen />
  return (
    <WizardInner
      initialProfile={data.profile}
      initialRatings={data.ratings}
      initialDiag={data.diagnostics}
      canExit={Boolean(data.onboarded)}
    />
  )
}

function WizardInner({
  initialProfile,
  initialRatings,
  initialDiag,
  canExit,
}: {
  initialProfile: Profile
  initialRatings: Ratings
  initialDiag: Diagnostics
  canExit: boolean
}) {
  const { update } = useAppData()
  const router = useRouter()
  const [stage, setStage] = useState(0)
  const [profile, setProfile] = useState<Profile>({ ...defaultData.profile, ...initialProfile })
  const [ratings, setRatings] = useState<Ratings>(initialRatings)
  const [diag, setDiag] = useState<Diagnostics>(initialDiag)

  const finish = () => {
    update((d) => ({
      ...d,
      onboarded: true,
      onboardedAt: d.onboardedAt ?? new Date().toISOString(),
      profile,
      ratings,
      diagnostics: diag,
    }))
    router.replace('/')
  }

  const back = () => setStage((s) => Math.max(0, s - 1))
  const next = () => {
    setStage((s) => Math.min(STAGES.length - 1, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md md:max-w-2xl flex-col bg-cream px-5 pb-10 pt-[max(env(safe-area-inset-top),1.5rem)] md:border-x md:border-border/60 md:shadow-2xl md:shadow-plum/5">
      <header className="space-y-4 pb-6">
        <div className="flex h-10 items-center justify-between">
          {stage > 0 ? (
            <button
              type="button"
              onClick={back}
              className="-ml-2 flex size-10 items-center justify-center rounded-full text-plum hover:bg-blush"
              aria-label="Previous stage"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
          ) : canExit ? (
            <button
              type="button"
              onClick={() => router.push('/settings')}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-plum/70 hover:text-plum"
            >
              ✕ Exit
            </button>
          ) : (
            <span className="font-serif text-lg italic text-plum">The Her Effect</span>
          )}
          <Eyebrow>
            Stage {stage + 1} of {STAGES.length}
          </Eyebrow>
        </div>
        <ol className="grid grid-cols-4 gap-1.5" aria-label="Onboarding progress">
          {STAGES.map((s, i) => (
            <li key={s} className="space-y-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-plum/10">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: i < stage ? '100%' : i === stage ? '50%' : '0%' }}
                />
              </div>
              <span className={`block text-[10px] ${i === stage ? 'font-semibold text-plum' : 'text-plum/45'}`}>{s}</span>
            </li>
          ))}
        </ol>
      </header>

      <div key={stage} className="flex flex-1 animate-page-in flex-col">
        {stage === 0 && <StepProfile value={profile} onChange={setProfile} onNext={next} />}
        {stage === 1 && <StepRatings value={ratings} onChange={setRatings} onNext={next} />}
        {stage === 2 && <StepDiagnostics value={diag} onChange={setDiag} onNext={next} />}
        {stage === 3 && <StepSummary profile={profile} ratings={ratings} diag={diag} onFinish={finish} />}
      </div>
    </div>
  )
}
