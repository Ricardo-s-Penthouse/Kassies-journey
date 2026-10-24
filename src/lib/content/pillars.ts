import type { Diagnostics, PillarId } from '@/lib/store'

export const PILLARS: { id: PillarId; label: string; short: string; description: string }[] = [
  { id: 'skin', label: 'Skin', short: 'Skin', description: 'Barrier, clarity and radiance' },
  { id: 'hair', label: 'Hair Care', short: 'Hair', description: 'Crown, scalp and moisture' },
  { id: 'body', label: 'Body & Movement', short: 'Body', description: 'Posture, lymph and strength' },
  { id: 'mindset', label: 'Mindset & Presence', short: 'Mind', description: 'Calm, grounded magnetism' },
  { id: 'image', label: 'Image & Grooming', short: 'Image', description: 'Polish, palette and style' },
]

export type ChecklistItem = { id: string; label: string; hint?: string }
export type ChecklistGroup = { id: string; title: string; items: ChecklistItem[] }
export type PillarChecklist = { pillar: PillarId; groups: ChecklistGroup[] }

const skinAm: Record<string, ChecklistItem[]> = {
  oily: [
    { id: 'am-cleanse', label: 'Gel cleanser', hint: 'Lukewarm water, 60 seconds' },
    { id: 'am-vitc', label: 'Vitamin C serum', hint: 'Lightweight, on dry skin' },
    { id: 'am-niacin', label: 'Niacinamide 5–10%', hint: 'Balances sebum & pores' },
    { id: 'am-moist', label: 'Oil-free gel moisturizer' },
    { id: 'am-spf', label: 'SPF 30+ (matte finish)', hint: 'Two finger-lengths' },
  ],
  dry: [
    { id: 'am-cleanse', label: 'Cream cleanser or water rinse' },
    { id: 'am-vitc', label: 'Vitamin C serum' },
    { id: 'am-hydrate', label: 'Hyaluronic acid on damp skin' },
    { id: 'am-moist', label: 'Ceramide-rich moisturizer' },
    { id: 'am-spf', label: 'SPF 30+ (hydrating)', hint: 'Two finger-lengths' },
  ],
  default: [
    { id: 'am-cleanse', label: 'Gentle cleanser' },
    { id: 'am-vitc', label: 'Vitamin C serum' },
    { id: 'am-moist', label: 'Moisturizer' },
    { id: 'am-spf', label: 'SPF 30+', hint: 'Two finger-lengths' },
  ],
}

const skinPm: Record<string, ChecklistItem[]> = {
  oily: [
    { id: 'pm-double', label: 'Double cleanse', hint: 'Oil/balm, then gel' },
    { id: 'pm-bha', label: 'Salicylic acid (BHA)', hint: '3x per week, alternate with retinoid' },
    { id: 'pm-retinoid', label: 'Retinoid (pea-size)', hint: 'Skip on BHA nights' },
    { id: 'pm-moist', label: 'Light moisturizer' },
  ],
  dry: [
    { id: 'pm-cleanse', label: 'Milky cleanser' },
    { id: 'pm-retinoid', label: 'Retinoid, sandwiched', hint: 'Moisturizer, retinoid, moisturizer' },
    { id: 'pm-ceramide', label: 'Ceramide barrier cream' },
    { id: 'pm-oil', label: 'Face oil to seal' },
  ],
  sensitive: [
    { id: 'pm-cleanse', label: 'Fragrance-free cleanser' },
    { id: 'pm-calm', label: 'Centella or azelaic soothing step' },
    { id: 'pm-ceramide', label: 'Ceramide barrier cream' },
  ],
  default: [
    { id: 'pm-double', label: 'Double cleanse' },
    { id: 'pm-treat', label: 'Treatment (retinoid or BHA)' },
    { id: 'pm-moist', label: 'Moisturizer' },
  ],
}

function pick<T>(map: Record<string, T>, key: string | null): T {
  return (key && map[key]) || map.default
}

export function getChecklists(diag: Diagnostics): PillarChecklist[] {
  const skinKey = diag.skinType === 'combination' ? 'oily' : diag.skinType
  const pmKey = diag.skinType === 'combination' ? 'oily' : diag.skinType

  const hairItems: ChecklistItem[] =
    diag.porosity === 'low'
      ? [
          { id: 'hair-scalp', label: '3-minute scalp massage' },
          { id: 'hair-steam', label: 'Light leave-in on damp hair', hint: 'Use warmth to open cuticles' },
          { id: 'hair-light', label: 'Lightweight oil (argan / grapeseed)' },
          { id: 'hair-silk', label: 'Silk bonnet or pillowcase' },
        ]
      : diag.porosity === 'high'
        ? [
            { id: 'hair-scalp', label: '3-minute scalp massage' },
            { id: 'hair-loc', label: 'L.O.C. method (liquid, oil, cream)' },
            { id: 'hair-heavy', label: 'Seal ends with butter or castor oil' },
            { id: 'hair-silk', label: 'Silk bonnet or pillowcase' },
          ]
        : [
            { id: 'hair-scalp', label: '3-minute scalp massage' },
            { id: 'hair-detangle', label: 'Gentle detangle, ends to roots' },
            { id: 'hair-moist', label: 'Moisturize & seal ends' },
            { id: 'hair-silk', label: 'Silk bonnet or pillowcase' },
          ]

  const postureFix: ChecklistItem =
    diag.posture === 'forward-head'
      ? { id: 'body-chin', label: '10 chin tucks against a wall', hint: 'Corrects forward head' }
      : diag.posture === 'rounded-shoulders'
        ? { id: 'body-doorway', label: 'Doorway pec stretch, 2 x 30s', hint: 'Opens rounded shoulders' }
        : diag.posture === 'pelvic-tilt'
          ? { id: 'body-glute', label: '15 glute bridges + hip flexor stretch', hint: 'Neutralizes pelvic tilt' }
          : { id: 'body-wall', label: '60-second wall alignment check' }

  return [
    {
      pillar: 'skin',
      groups: [
        { id: 'am', title: 'Morning ritual', items: pick(skinAm, skinKey) },
        { id: 'pm', title: 'Evening ritual', items: pick(skinPm, pmKey) },
      ],
    },
    { pillar: 'hair', groups: [{ id: 'daily', title: 'Crown care', items: hairItems }] },
    {
      pillar: 'body',
      groups: [
        {
          id: 'daily',
          title: 'Movement & lymph',
          items: [
            postureFix,
            { id: 'body-guasha', label: 'Gua sha / lymphatic drainage', hint: 'Neck first, then face — 5 min' },
            { id: 'body-walk', label: '8,000+ steps or 30-min walk' },
            { id: 'body-strength', label: '20 minutes strength or pilates' },
            { id: 'body-sleep', label: '7.5+ hours of sleep' },
          ],
        },
      ],
    },
    {
      pillar: 'mindset',
      groups: [
        {
          id: 'daily',
          title: 'Presence practice',
          items: [
            { id: 'mind-silence', label: '5 minutes of morning silence' },
            { id: 'mind-phone', label: 'No phone for first 30 minutes' },
            { id: 'mind-voice', label: 'Vocal posture: speak slower, lower', hint: 'Practice in one conversation' },
            { id: 'mind-nonneedy', label: 'One "non-needy" choice today', hint: 'Act from fullness, not approval' },
            { id: 'mind-journal', label: 'Evening reflection journal' },
          ],
        },
      ],
    },
    {
      pillar: 'image',
      groups: [
        {
          id: 'daily',
          title: 'Polish & presentation',
          items: [
            { id: 'img-brows', label: 'Groomed brows & lashes' },
            { id: 'img-nails', label: 'Clean, shaped nails' },
            { id: 'img-palette', label: 'Wore a color from my palette' },
            { id: 'img-scent', label: 'Signature scent on pulse points' },
            { id: 'img-plan', label: "Laid out tomorrow's outfit" },
          ],
        },
      ],
    },
  ]
}

export function flattenItemIds(lists: PillarChecklist[]) {
  return lists.flatMap((p) => p.groups.flatMap((g) => g.items.map((i) => `${p.pillar}:${g.id}:${i.id}`)))
}

export const WATER_GOAL = 8

export function consistencyScore(
  checks: Record<string, boolean> | undefined,
  water: number | undefined,
  allIds: string[],
) {
  const done = allIds.filter((id) => checks?.[id]).length
  const checklistPart = allIds.length ? done / allIds.length : 0
  const waterPart = Math.min(water ?? 0, WATER_GOAL) / WATER_GOAL
  return Math.round(checklistPart * 85 + waterPart * 15)
}
