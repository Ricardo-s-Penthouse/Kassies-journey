'use client'

import { DiagnosticGrid } from '@/components/her/diagnostic-grid'
import { Button, PageHeader, Segmented } from '@/components/her/primitives'
import { RoadmapTimeline } from '@/components/her/roadmap-timeline'
import { PILLARS } from '@/lib/content/pillars'
import { exportData, importData, resetAllData, useAppData } from '@/lib/store'
import { Download, RotateCcw, Upload, Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type Tab = 'results' | 'roadmap' | 'data'

export function SettingsView() {
  const { data } = useAppData()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('results')
  const [confirmReset, setConfirmReset] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  if (!data) return null

  const p = data.profile
  const since = data.onboardedAt
    ? new Date(data.onboardedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : null

  const download = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `her-effect-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setStatus('Backup downloaded.')
  }

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = importData(await file.text())
    setStatus(ok ? 'Backup restored.' : 'That file could not be read.')
    e.target.value = ''
  }

  const reset = () => {
    resetAllData()
    router.replace('/onboarding')
  }

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="Profile" title={<>{p.name || 'Your'} <em className="font-normal">profile</em></>} />

      <section className="flex items-center gap-4 rounded-3xl bg-plum p-5 text-cream">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gold font-serif text-2xl font-semibold text-plum">
          {(p.name || 'H').charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate font-serif text-xl font-semibold">{p.name || 'Her'}</p>
          <p className="text-xs text-cream/70">
            {[p.ageGroup, p.driver].filter(Boolean).join(' · ')}
          </p>
          {since ? <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gold">Glowing since {since}</p> : null}
        </div>
      </section>

      <Segmented
        label="Profile sections"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'results', label: 'Diagnostics' },
          { value: 'roadmap', label: 'Roadmap' },
          { value: 'data', label: 'Data' },
        ]}
      />

      <div key={tab} className="animate-page-in space-y-4">
        {tab === 'results' && (
          <>
            <DiagnosticGrid diag={data.diagnostics} detailed />
            <section className="rounded-3xl bg-card p-5" aria-labelledby="ratings-h">
              <h2 id="ratings-h" className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                Knowledge self-assessment
              </h2>
              <ul className="space-y-3">
                {PILLARS.map((pl) => (
                  <li key={pl.id} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-plum">{pl.short}</span>
                    <div className="flex flex-1 gap-1" aria-label={`${data.ratings[pl.id]} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= data.ratings[pl.id] ? 'bg-plum' : 'bg-plum/15'}`} />
                      ))}
                    </div>
                    <span className="w-6 text-right text-xs text-muted-foreground">{data.ratings[pl.id]}/5</span>
                  </li>
                ))}
              </ul>
            </section>
            <Button variant="plum" className="w-full" onClick={() => router.push('/onboarding')}>
              <Wand2 className="size-4" aria-hidden="true" /> Retake onboarding quiz
            </Button>
          </>
        )}

        {tab === 'roadmap' && <RoadmapTimeline ratings={data.ratings} diag={data.diagnostics} />}

        {tab === 'data' && (
          <>
            <section className="space-y-3 rounded-3xl bg-card p-5">
              <h2 className="font-serif text-xl font-semibold text-plum">Your data</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Everything is stored privately on this device. Export a backup to move it to another device.
              </p>
              <dl className="grid grid-cols-3 gap-2 text-center">
                {[
                  ['Days logged', Object.keys(data.checklists).length],
                  ['Entries', data.journal.length],
                  ['Measures', data.measurements.length],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-cream p-3">
                    <dd className="font-serif text-2xl font-semibold text-plum">{v}</dd>
                    <dt className="text-[10px] text-muted-foreground">{k}</dt>
                  </div>
                ))}
              </dl>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="gold" onClick={download}>
                  <Download className="size-4" aria-hidden="true" /> Export
                </Button>
                <Button variant="ghost" onClick={() => fileRef.current?.click()}>
                  <Upload className="size-4" aria-hidden="true" /> Import
                </Button>
              </div>
              <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={onImport} tabIndex={-1} aria-hidden="true" />
              {status ? (
                <p role="status" className="text-center text-xs text-plum/70">
                  {status}
                </p>
              ) : null}
            </section>

            <section className="space-y-3 rounded-3xl border border-destructive/30 bg-cream p-5">
              <h2 className="font-serif text-xl font-semibold text-plum">Reset everything</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Permanently erases checklists, water logs, quiz results, journal entries and measurements.
              </p>
              {confirmReset ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </Button>
                  <Button onClick={reset} className="bg-destructive text-cream shadow-none hover:bg-destructive/90">
                    Erase all
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" className="w-full" onClick={() => setConfirmReset(true)}>
                  <RotateCcw className="size-4" aria-hidden="true" /> Reset all data
                </Button>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
