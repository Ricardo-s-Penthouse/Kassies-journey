'use client'

import { PageHeader, Segmented } from '@/components/her/primitives'
import { useState } from 'react'
import { HairCalendar } from './hair-calendar'
import { JournalTab } from './journal-tab'
import { MeasurementsTab } from './measurements-tab'

type Tab = 'body' | 'journal' | 'hair'

export function ProgressView() {
  const [tab, setTab] = useState<Tab>('body')
  return (
    <div className="space-y-5">
      <PageHeader eyebrow="Progress & journal" title={<>Proof of your <em className="font-normal">becoming</em>.</>}>
        Track the measurable, reflect on the meaningful.
      </PageHeader>
      <Segmented
        label="Progress sections"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'body', label: 'Measurements' },
          { value: 'journal', label: 'Journal' },
          { value: 'hair', label: 'Hair log' },
        ]}
      />
      <div key={tab} className="animate-page-in">
        {tab === 'body' && <MeasurementsTab />}
        {tab === 'journal' && <JournalTab />}
        {tab === 'hair' && <HairCalendar />}
      </div>
    </div>
  )
}
