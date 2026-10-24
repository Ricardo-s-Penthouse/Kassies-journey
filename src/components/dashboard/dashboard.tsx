'use client'

import { Eyebrow } from '@/components/her/primitives'
import { consistencyScore, flattenItemIds, getChecklists } from '@/lib/content/pillars'
import { dateKey, useAppData } from '@/lib/store'
import { useMemo } from 'react'
import { PillarChecklists } from './pillar-checklists'
import { ScoreCard } from './score-card'
import { WaterTracker } from './water-tracker'
import { WeekStrip } from './week-strip'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const { data, update } = useAppData()
  const today = dateKey()
  const lists = useMemo(() => (data ? getChecklists(data.diagnostics) : []), [data])
  const allIds = useMemo(() => flattenItemIds(lists), [lists])

  if (!data) return null

  const checks = data.checklists[today] ?? {}
  const water = data.water[today] ?? 0
  const score = consistencyScore(checks, water, allIds)

  const toggle = (id: string) =>
    update((d) => {
      const day = { ...(d.checklists[today] ?? {}) }
      day[id] = !day[id]
      return { ...d, checklists: { ...d.checklists, [today]: day } }
    })

  const setWater = (n: number) => update((d) => ({ ...d, water: { ...d.water, [today]: n } }))

  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-5">
      <header className="space-y-1.5 pb-1">
        <Eyebrow>{dateLabel}</Eyebrow>
        <h1 className="font-serif text-[2.1rem] font-semibold leading-[1.05] text-balance text-plum">
          {greeting()}, <em className="font-normal">{data.profile.name || 'beautiful'}</em>.
        </h1>
      </header>

      <ScoreCard score={score} lists={lists} checks={checks} water={water} />
      <WeekStrip data={data} allIds={allIds} />
      <WaterTracker value={water} onChange={setWater} />
      <PillarChecklists lists={lists} checks={checks} onToggle={toggle} />
    </div>
  )
}
