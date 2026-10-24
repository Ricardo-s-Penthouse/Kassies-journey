import type { Diagnostics, PillarId, Porosity, Posture, Ratings, SkinType, Undertone } from '@/lib/store'

export type QuizOption<T extends string> = { label: string; vote: T }
export type QuizQuestion<T extends string> = { q: string; options: QuizOption<T>[] }
export type Quiz<T extends string> = {
  key: keyof Diagnostics
  title: string
  test: string
  instructions: string[]
  questions: QuizQuestion<T>[]
}

export const skinQuiz: Quiz<SkinType> = {
  key: 'skinType',
  title: 'Skin Type',
  test: 'The Bare-Face Test',
  instructions: [
    'Cleanse with a gentle cleanser and pat dry.',
    'Apply nothing — no serum, no moisturizer.',
    'Wait 30–60 minutes, then answer honestly.',
  ],
  questions: [
    {
      q: 'How does your T-zone (forehead, nose, chin) look now?',
      options: [
        { label: 'Shiny and slick', vote: 'oily' },
        { label: 'Slightly shiny, cheeks are not', vote: 'combination' },
        { label: 'Matte and comfortable', vote: 'normal' },
        { label: 'Tight or flaky', vote: 'dry' },
      ],
    },
    {
      q: 'How do your cheeks feel?',
      options: [
        { label: 'Oily too', vote: 'oily' },
        { label: 'Normal to slightly dry', vote: 'combination' },
        { label: 'Soft and balanced', vote: 'normal' },
        { label: 'Tight, rough or itchy', vote: 'dry' },
        { label: 'Warm, red or stinging', vote: 'sensitive' },
      ],
    },
    {
      q: 'How visible are your pores?',
      options: [
        { label: 'Large across the face', vote: 'oily' },
        { label: 'Large mainly on nose & forehead', vote: 'combination' },
        { label: 'Small, barely noticeable', vote: 'normal' },
        { label: 'Almost invisible', vote: 'dry' },
      ],
    },
    {
      q: 'How does your skin react to new products?',
      options: [
        { label: 'Usually fine', vote: 'normal' },
        { label: 'Breakouts if too rich', vote: 'oily' },
        { label: 'Often redness or burning', vote: 'sensitive' },
        { label: 'Drinks them up, still thirsty', vote: 'dry' },
      ],
    },
  ],
}

export const porosityQuiz: Quiz<Porosity> = {
  key: 'porosity',
  title: 'Hair Porosity',
  test: 'The Water Float Test',
  instructions: [
    'Take a clean, product-free strand of shed hair.',
    'Drop it into a glass of room-temperature water.',
    'Watch it for 2–4 minutes.',
  ],
  questions: [
    {
      q: 'Where is the strand after 3 minutes?',
      options: [
        { label: 'Still floating on top', vote: 'low' },
        { label: 'Suspended in the middle', vote: 'normal' },
        { label: 'Sank quickly to the bottom', vote: 'high' },
      ],
    },
    {
      q: 'How long does your hair take to air-dry?',
      options: [
        { label: 'Hours — it takes forever', vote: 'low' },
        { label: 'A reasonable time', vote: 'normal' },
        { label: 'Very fast', vote: 'high' },
      ],
    },
    {
      q: 'How do products behave on your hair?',
      options: [
        { label: 'They sit on top and build up', vote: 'low' },
        { label: 'Absorb well and last', vote: 'normal' },
        { label: 'Absorb instantly, then hair feels dry again', vote: 'high' },
      ],
    },
    {
      q: 'Has your hair been heavily colored, bleached or heat-styled?',
      options: [
        { label: 'Rarely or never', vote: 'low' },
        { label: 'Occasionally', vote: 'normal' },
        { label: 'Frequently', vote: 'high' },
      ],
    },
  ],
}

export const postureQuiz: Quiz<Posture> = {
  key: 'posture',
  title: 'Posture Status',
  test: 'The Wall Test',
  instructions: [
    'Stand with your heels 5cm from a wall.',
    'Let your glutes and upper back touch the wall naturally.',
    'Notice — do not correct — what happens.',
  ],
  questions: [
    {
      q: 'Does the back of your head touch the wall?',
      options: [
        { label: 'Yes, effortlessly', vote: 'aligned' },
        { label: 'Only if I pull my chin back', vote: 'forward-head' },
        { label: 'No, there is a clear gap', vote: 'forward-head' },
      ],
    },
    {
      q: 'Do both shoulder blades touch the wall?',
      options: [
        { label: 'Yes, flat', vote: 'aligned' },
        { label: 'Shoulders roll forward away from wall', vote: 'rounded-shoulders' },
      ],
    },
    {
      q: 'Slide a hand behind your lower back. How much space?',
      options: [
        { label: 'About one flat hand', vote: 'aligned' },
        { label: 'A whole fist fits', vote: 'pelvic-tilt' },
        { label: 'Hardly any space', vote: 'aligned' },
      ],
    },
    {
      q: 'Where do you usually feel tension?',
      options: [
        { label: 'Neck & base of skull', vote: 'forward-head' },
        { label: 'Upper back & chest', vote: 'rounded-shoulders' },
        { label: 'Lower back & hips', vote: 'pelvic-tilt' },
        { label: 'Nowhere in particular', vote: 'aligned' },
      ],
    },
  ],
}

export const undertoneQuiz: Quiz<Undertone> = {
  key: 'undertone',
  title: 'Color Undertone',
  test: 'Vein & Jewelry Test',
  instructions: [
    'Go to natural daylight, makeup-free.',
    'Look at the veins on the inside of your wrist.',
    'Hold gold and silver jewelry against your skin.',
  ],
  questions: [
    {
      q: 'What color are your wrist veins?',
      options: [
        { label: 'Blue or purple', vote: 'cool' },
        { label: 'Green or olive', vote: 'warm' },
        { label: 'A mix — hard to tell', vote: 'neutral' },
      ],
    },
    {
      q: 'Which metal makes your skin glow?',
      options: [
        { label: 'Silver / platinum', vote: 'cool' },
        { label: 'Gold / rose gold', vote: 'warm' },
        { label: 'Both look great', vote: 'neutral' },
      ],
    },
    {
      q: 'How does your skin react to the sun?',
      options: [
        { label: 'Burns easily, rarely tans', vote: 'cool' },
        { label: 'Tans easily, rarely burns', vote: 'warm' },
        { label: 'Burns a little, then tans', vote: 'neutral' },
      ],
    },
    {
      q: 'Which white flatters you more?',
      options: [
        { label: 'Crisp optic white', vote: 'cool' },
        { label: 'Ivory or cream', vote: 'warm' },
        { label: 'Both work', vote: 'neutral' },
      ],
    },
  ],
}

export const QUIZZES = [skinQuiz, porosityQuiz, postureQuiz, undertoneQuiz] as const

export function tallyVotes<T extends string>(votes: T[]): T | null {
  if (!votes.length) return null
  const counts = new Map<T, number>()
  votes.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1))
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}

export const RESULT_COPY: Record<string, { label: string; summary: string }> = {
  oily: { label: 'Oily', summary: 'Active sebum production. Prioritize BHA, niacinamide and light, non-comedogenic hydration.' },
  dry: { label: 'Dry', summary: 'Low lipid barrier. Prioritize ceramides, hyaluronic acid and gentle cleansing.' },
  combination: { label: 'Combination', summary: 'Oily T-zone, balanced cheeks. Treat zones differently — BHA centrally, richer cream outside.' },
  normal: { label: 'Normal', summary: 'Balanced and resilient. Focus on prevention: vitamin C, retinoids and daily SPF.' },
  sensitive: { label: 'Sensitive', summary: 'Reactive barrier. Fragrance-free, minimal routines; introduce actives slowly.' },
  low: { label: 'Low Porosity', summary: 'Tight cuticles resist moisture. Use heat, lightweight products and clarify regularly.' },
  'normal-porosity': { label: 'Normal Porosity', summary: 'Balanced absorption and retention. Maintain with regular conditioning.' },
  high: { label: 'High Porosity', summary: 'Open cuticles lose moisture fast. Layer with L.O.C., seal with butters, add protein.' },
  aligned: { label: 'Aligned', summary: 'Your stacking is strong. Maintain with strength and daily mobility.' },
  'forward-head': { label: 'Forward Head', summary: 'Head sits ahead of shoulders. Chin tucks and deep neck flexor work are key.' },
  'rounded-shoulders': { label: 'Rounded Shoulders', summary: 'Tight chest, weak upper back. Open the pecs, strengthen rhomboids.' },
  'pelvic-tilt': { label: 'Anterior Pelvic Tilt', summary: 'Tight hip flexors, weak glutes. Bridges and hip-flexor release.' },
  cool: { label: 'Cool', summary: 'Pink or blue undertones. Silver, jewel tones, icy pastels and true navy flatter you.' },
  warm: { label: 'Warm', summary: 'Golden or peach undertones. Gold, camel, olive, terracotta and cream flatter you.' },
  neutral: { label: 'Neutral', summary: 'A balance of both. Muted tones, soft white and mixed metals all work.' },
}

export function resultLabel(key: keyof Diagnostics, value: string | null) {
  if (!value) return { label: 'Not tested', summary: 'Complete this diagnostic to unlock tailored guidance.' }
  if (key === 'porosity' && value === 'normal') return RESULT_COPY['normal-porosity']
  return RESULT_COPY[value] ?? { label: value, summary: '' }
}

export type RoadmapPhase = { weeks: string; title: string; focus: PillarId; actions: string[] }

const PILLAR_ACTIONS: Record<PillarId, string[]> = {
  skin: ['Lock in a consistent AM/PM routine', 'Introduce one active at a time, every 2 weeks', 'SPF every single morning'],
  hair: ['Set a wash-day rhythm and log it', 'Match products to your porosity', 'Nightly silk protection'],
  body: ['Daily posture correction drill', '5 minutes of lymphatic gua sha', 'Hit your hydration goal daily'],
  mindset: ['Morning silence before screens', 'Practice the Non-Needy framework', 'Nightly gratitude reflection'],
  image: ['Build your 12-piece capsule in your palette', 'Weekly grooming maintenance', 'Choose a signature scent'],
}

export function buildRoadmap(ratings: Ratings, diag: Diagnostics): RoadmapPhase[] {
  const ordered = (Object.keys(ratings) as PillarId[]).sort((a, b) => ratings[a] - ratings[b])
  const [first, second, third] = ordered
  const extra: Partial<Record<PillarId, string>> = {
    skin: diag.skinType ? `Tailored for ${resultLabel('skinType', diag.skinType).label.toLowerCase()} skin` : undefined,
    hair: diag.porosity ? `Products for ${resultLabel('porosity', diag.porosity).label.toLowerCase()}` : undefined,
    body: diag.posture && diag.posture !== 'aligned' ? `Correct ${resultLabel('posture', diag.posture).label.toLowerCase()}` : undefined,
    image: diag.undertone ? `Dress for your ${diag.undertone} undertone` : undefined,
  }
  const withExtra = (p: PillarId) => [...PILLAR_ACTIONS[p], ...(extra[p] ? [extra[p] as string] : [])]
  return [
    { weeks: 'Weeks 1–2', title: 'Foundation', focus: first, actions: withExtra(first) },
    { weeks: 'Weeks 3–4', title: 'Momentum', focus: second, actions: withExtra(second) },
    { weeks: 'Weeks 5–8', title: 'Integration', focus: third, actions: withExtra(third) },
    {
      weeks: 'Week 9+',
      title: 'The Her Effect',
      focus: ordered[4],
      actions: ['All five pillars running daily', 'Consistency score of 80%+', 'Re-take diagnostics to measure change'],
    },
  ]
}
