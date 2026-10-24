'use client'

import { useCallback, useSyncExternalStore } from 'react'

export type PillarId = 'skin' | 'hair' | 'body' | 'mindset' | 'image'

export type SkinType = 'oily' | 'dry' | 'combination' | 'normal' | 'sensitive'
export type Porosity = 'low' | 'normal' | 'high'
export type Posture = 'aligned' | 'forward-head' | 'rounded-shoulders' | 'pelvic-tilt'
export type Undertone = 'cool' | 'warm' | 'neutral'

export type Profile = {
  name: string
  ageGroup: string
  driver: string
  level: string
  time: string
}

export type Ratings = Record<PillarId, number>

export type Diagnostics = {
  skinType: SkinType | null
  porosity: Porosity | null
  posture: Posture | null
  undertone: Undertone | null
}

export type Measurement = {
  id: string
  date: string
  waist: number | null
  hips: number | null
  posture: number | null
  unit: 'in' | 'cm'
}

export type JournalEntry = {
  id: string
  date: string
  mood: number
  gratitude: string[]
  win: string
  reflection: string
}

export type HairEvent = 'wash' | 'deep' | 'treatment' | 'protective'

export type AppData = {
  version: 1
  onboarded: boolean
  onboardedAt: string | null
  profile: Profile
  ratings: Ratings
  diagnostics: Diagnostics
  checklists: Record<string, Record<string, boolean>>
  water: Record<string, number>
  measurements: Measurement[]
  journal: JournalEntry[]
  hairLog: Record<string, HairEvent>
  lessonsDone: string[]
}

const STORAGE_KEY = 'her-effect:v1'

export const defaultData: AppData = {
  version: 1,
  onboarded: false,
  onboardedAt: null,
  profile: { name: '', ageGroup: '', driver: '', level: '', time: '' },
  ratings: { skin: 3, hair: 3, body: 3, mindset: 3, image: 3 },
  diagnostics: { skinType: null, porosity: null, posture: null, undertone: null },
  checklists: {},
  water: {},
  measurements: [],
  journal: [],
  hairLog: {},
  lessonsDone: [],
}

let cache: AppData | null = null
const listeners = new Set<() => void>()

function readStorage(): AppData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as Partial<AppData>
    return {
      ...defaultData,
      ...parsed,
      profile: { ...defaultData.profile, ...parsed.profile },
      ratings: { ...defaultData.ratings, ...parsed.ratings },
      diagnostics: { ...defaultData.diagnostics, ...parsed.diagnostics },
    }
  } catch {
    return defaultData
  }
}

function getSnapshot(): AppData {
  if (!cache) cache = readStorage()
  return cache
}

function getServerSnapshot(): AppData | null {
  return null
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = readStorage()
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function write(next: AppData) {
  cache = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage may be full or unavailable (private mode); keep in-memory state.
  }
  listeners.forEach((l) => l())
}

export function useAppData() {
  const data = useSyncExternalStore<AppData | null>(subscribe, getSnapshot, getServerSnapshot)
  const update = useCallback((fn: (d: AppData) => AppData) => {
    write(fn(getSnapshot()))
  }, [])
  return { data, update }
}

export function resetAllData() {
  write(defaultData)
}

export function importData(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as Partial<AppData>
    if (typeof parsed !== 'object' || parsed === null) return false
    write({ ...defaultData, ...parsed, version: 1 })
    return true
  } catch {
    return false
  }
}

export function exportData(): string {
  return JSON.stringify(getSnapshot(), null, 2)
}

export function dateKey(d: Date = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseDateKey(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
