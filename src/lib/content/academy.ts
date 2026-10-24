import type { Diagnostics, PillarId } from '@/lib/store'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }

export type Lesson = { id: string; title: string; minutes: number; blocks: Block[] }

export type Module = {
  slug: string
  number: string
  pillar: PillarId
  title: string
  subtitle: string
  lessons: Lesson[]
}

export const MODULES: Module[] = [
  {
    slug: 'skin-science',
    number: '01',
    pillar: 'skin',
    title: 'Skin Science & Active Ingredients',
    subtitle: 'Barrier chemistry, layering order and the five actives that matter.',
    lessons: [
      {
        id: 'skin-barrier',
        title: 'The Barrier Comes First',
        minutes: 4,
        blocks: [
          {
            type: 'p',
            text: 'Your stratum corneum — the outermost layer of skin — works like a brick wall. Skin cells are the bricks; lipids (ceramides, cholesterol, fatty acids) are the mortar. Most "problem skin" is simply a cracked wall.',
          },
          {
            type: 'p',
            text: 'Generic viral routines fail because they ignore biology. Diagnose first, then select products. A healthy barrier makes every active work better and irritate less.',
          },
          {
            type: 'callout',
            title: 'Layering rule: thinnest to thickest',
            text: 'Water-based serums (hyaluronic acid, niacinamide) → treatment actives (vitamin C AM, retinoid PM) → emollient cream → SPF in the morning.',
          },
        ],
      },
      {
        id: 'skin-actives',
        title: 'The Five Core Actives',
        minutes: 6,
        blocks: [
          {
            type: 'table',
            head: ['Ingredient', 'What it does', 'Best for', 'When'],
            rows: [
              ['Salicylic Acid (BHA)', 'Oil-soluble — exfoliates inside pores', 'Oily, acne, blackheads', 'PM, 2–3x/week'],
              ['Retinoids', 'Accelerates cell turnover, builds collagen', 'Texture, lines, acne', 'PM only'],
              ['Vitamin C', 'Antioxidant, brightens, boosts SPF', 'Dullness, pigmentation', 'AM'],
              ['Niacinamide (B3)', 'Regulates sebum, calms redness', 'Oily, combo, sensitive', 'AM or PM'],
              ['Ceramides', 'Rebuilds the lipid "mortar"', 'Dry, sensitive, all', 'AM & PM'],
            ],
          },
          {
            type: 'list',
            items: [
              'Never start two new actives in the same week — introduce one every 14 days.',
              'Retinoid and BHA on alternate nights, never stacked when starting out.',
              'Vitamin C and SPF are a team: one neutralizes free radicals, the other blocks UV.',
            ],
          },
        ],
      },
      {
        id: 'skin-protocol',
        title: 'Building Your Protocol',
        minutes: 3,
        blocks: [
          {
            type: 'steps',
            items: [
              'Weeks 1–2: cleanser, moisturizer, SPF only. Let the barrier settle.',
              'Weeks 3–4: add one serum (niacinamide or vitamin C).',
              'Weeks 5–8: add a PM treatment (retinoid or BHA) twice weekly.',
              'Week 9+: increase frequency only if skin is calm.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'hair-porosity',
    number: '02',
    pillar: 'hair',
    title: 'Hair Porosity & Crown Care',
    subtitle: 'Matching products to your cuticle, plus scalp health fundamentals.',
    lessons: [
      {
        id: 'hair-porosity',
        title: 'Understanding Porosity',
        minutes: 4,
        blocks: [
          {
            type: 'p',
            text: 'Porosity describes how easily your hair absorbs and holds moisture, governed by how tightly the cuticle scales lie. It — not hair type — should decide your products.',
          },
          {
            type: 'table',
            head: ['Porosity', 'Cuticle', 'Use', 'Avoid'],
            rows: [
              ['Low', 'Tightly closed', 'Light oils (argan, grapeseed), humectants, warmth', 'Heavy butters, protein overload'],
              ['Medium', 'Balanced', 'Regular conditioning, sulfate-free cleanse', 'Overprocessing'],
              ['High', 'Open, gaps', 'L.O.C. method, shea, castor, protein treatments', 'Harsh heat, skipping sealants'],
            ],
          },
        ],
      },
      {
        id: 'hair-scalp',
        title: 'Scalp Health & Micro-circulation',
        minutes: 3,
        blocks: [
          {
            type: 'p',
            text: 'Hair health starts at the follicle. Scalp massage increases blood flow, delivering oxygen and nutrients to the bulb.',
          },
          {
            type: 'steps',
            items: [
              'Use pads of the fingers, never nails.',
              'Small circles from hairline to nape, 3–5 minutes daily.',
              'Clarify every 2–4 weeks to remove buildup — especially for low porosity.',
              'Protect at night with a silk or satin bonnet or pillowcase.',
            ],
          },
        ],
      },
      {
        id: 'hair-washday',
        title: 'Designing Your Wash Day',
        minutes: 3,
        blocks: [
          {
            type: 'list',
            items: [
              'Fine or oily scalp: every 2–3 days.',
              'Medium texture: 1–2x per week.',
              'Coily or high porosity: every 7–10 days with mid-week moisture refresh.',
              'Deep condition weekly; log it in Progress → Hair to see your rhythm.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'posture-lymph',
    number: '03',
    pillar: 'body',
    title: 'Posture, Movement & Lymphatics',
    subtitle: 'Forward head correction, gua sha and lymphatic drainage protocols.',
    lessons: [
      {
        id: 'body-fhp',
        title: 'Correcting Forward Head Posture',
        minutes: 4,
        blocks: [
          {
            type: 'p',
            text: 'For every inch your head drifts forward, the load on your neck increases by roughly 10 lbs. "Tech neck" also shortens the neck visually and softens the jawline.',
          },
          {
            type: 'steps',
            items: [
              'Chin tucks: back against a wall, glide chin straight back (double chin), hold 5s. 10 reps.',
              'Doorway pec stretch: forearms on frame, lean through, 2 x 30s.',
              'Wall angels: slide arms up and down keeping contact, 10 reps.',
              'Screen height: top of the screen at eye level.',
            ],
          },
        ],
      },
      {
        id: 'body-lymph',
        title: 'Lymphatic Drainage & Gua Sha',
        minutes: 5,
        blocks: [
          {
            type: 'callout',
            title: 'Always drain the exits first',
            text: 'Clear the neck (collarbone and sides of neck) before working the face, so fluid has somewhere to go.',
          },
          {
            type: 'steps',
            items: [
              'Apply face oil for slip. Hold the stone at a 15° angle, almost flat.',
              'Neck: sweep downward toward the collarbone, 5x each side.',
              'Jaw: chin to earlobe, then down the neck.',
              'Cheeks: nose to ear. Under-eye: very light, inner to outer corner.',
              'Forehead: center outward to temples, then down to the neck.',
            ],
          },
          {
            type: 'p',
            text: 'Body dry brushing follows the same rule: always brush toward the heart — up the legs to the groin, along the arms to the armpits.',
          },
        ],
      },
      {
        id: 'body-movement',
        title: 'Movement for Grace',
        minutes: 3,
        blocks: [
          {
            type: 'list',
            items: [
              'Strength 3x/week builds the posture muscles (glutes, upper back, deep core).',
              'Daily walking moves lymph — the lymphatic system has no pump but muscle.',
              'Anterior pelvic tilt: glute bridges + hip-flexor lunge stretch daily.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'mindset-magnetism',
    number: '04',
    pillar: 'mindset',
    title: 'Mindset & Psychological Magnetism',
    subtitle: 'The Non-Needy framework, vocal posture and unhurried composure.',
    lessons: [
      {
        id: 'mind-nonneedy',
        title: 'The Non-Needy Framework',
        minutes: 5,
        blocks: [
          {
            type: 'p',
            text: 'Neediness is placing a higher priority on others’ perception of you than on your own. Magnetism comes from the opposite: acting from fullness rather than lack.',
          },
          {
            type: 'list',
            items: [
              'Investment: give attention freely, without keeping score.',
              'Outcome independence: state your preference, then release attachment to the reply.',
              'Boundaries: a calm "no" signals self-respect more than any outfit.',
              'Full life: your schedule, interests and standards exist with or without approval.',
            ],
          },
        ],
      },
      {
        id: 'mind-voice',
        title: 'Vocal Posture',
        minutes: 4,
        blocks: [
          {
            type: 'p',
            text: 'Elegance is rooted in unhurried composure. Slow cadence and comfortable silence project intrinsic authority.',
          },
          {
            type: 'steps',
            items: [
              'Breathe from the diaphragm — belly expands, shoulders stay down.',
              'Speak 10–15% slower than feels natural.',
              'Downward inflection at the end of statements; avoid "upspeak".',
              'The 3-second rule: pause after someone finishes before you answer.',
            ],
          },
        ],
      },
      {
        id: 'mind-presence',
        title: 'Non-Reactive Presence',
        minutes: 3,
        blocks: [
          {
            type: 'list',
            items: [
              'Soft face: relax the jaw and the space between the brows.',
              'Still hands: no fidgeting, no nervous nodding.',
              'Eye contact for full sentences, breaking sideways rather than down.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'color-capsule',
    number: '05',
    pillar: 'image',
    title: 'Color Theory & Capsule Wardrobe',
    subtitle: 'Undertone testing, your palette and silhouette ratios.',
    lessons: [
      {
        id: 'image-undertone',
        title: 'Undertone Testing',
        minutes: 4,
        blocks: [
          {
            type: 'table',
            head: ['Undertone', 'Veins', 'Metal', 'Palette'],
            rows: [
              ['Warm', 'Green / olive', 'Gold, rose gold', 'Camel, cream, olive, terracotta'],
              ['Cool', 'Blue / purple', 'Silver, platinum', 'Optic white, navy, emerald, berry'],
              ['Neutral', 'Blue-green mix', 'Both', 'Soft white, taupe, dusty rose, sage'],
            ],
          },
          {
            type: 'p',
            text: 'Hold each color under your chin in daylight. The right shade evens skin tone and brightens the eyes; the wrong one casts shadows and highlights redness.',
          },
        ],
      },
      {
        id: 'image-capsule',
        title: 'Building a 12-Piece Capsule',
        minutes: 5,
        blocks: [
          {
            type: 'steps',
            items: [
              'Choose 2 base neutrals from your palette (e.g. camel + cream).',
              'Add 1–2 accent colors that flatter your undertone.',
              '4 tops, 3 bottoms, 2 layers, 1 dress, 2 pairs of shoes.',
              'Every top should work with every bottom.',
            ],
          },
          {
            type: 'callout',
            title: 'Quality markers',
            text: 'Natural fibers, finished seams, lined tailoring and a garment that hangs rather than clings.',
          },
        ],
      },
      {
        id: 'image-silhouette',
        title: 'Silhouette Ratios',
        minutes: 3,
        blocks: [
          {
            type: 'p',
            text: 'The eye reads proportion before detail. The most flattering outfits follow the golden ratio — roughly 1/3 to 2/3 — rather than splitting the body in half.',
          },
          {
            type: 'list',
            items: [
              'Short top + long bottom (or tucked top + high waist) = 1/3 : 2/3.',
              'Long top + short bottom = 2/3 : 1/3.',
              'Define the waist to balance volume above or below.',
              'Monochrome columns add visual height.',
            ],
          },
        ],
      },
    ],
  },
]

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug)
}

export function personalNote(pillar: PillarId, diag: Diagnostics): string | null {
  switch (pillar) {
    case 'skin':
      if (diag.skinType === 'oily' || diag.skinType === 'combination')
        return 'For your skin: lead with niacinamide in the morning and salicylic acid 2–3 nights a week.'
      if (diag.skinType === 'dry') return 'For your skin: ceramides and hyaluronic acid on damp skin are your foundation.'
      if (diag.skinType === 'sensitive')
        return 'For your skin: keep it fragrance-free and introduce actives at half frequency.'
      if (diag.skinType === 'normal') return 'For your skin: focus on prevention — vitamin C, retinoid and daily SPF.'
      return null
    case 'hair':
      if (diag.porosity === 'low') return 'For your hair: light oils and gentle warmth; clarify every 2–3 weeks.'
      if (diag.porosity === 'high') return 'For your hair: L.O.C. layering, butters to seal and a monthly protein treatment.'
      if (diag.porosity === 'normal') return 'For your hair: maintain with weekly deep conditioning.'
      return null
    case 'body':
      if (diag.posture === 'forward-head') return 'For your posture: chin tucks daily are your highest-leverage habit.'
      if (diag.posture === 'rounded-shoulders') return 'For your posture: open the chest and strengthen your upper back.'
      if (diag.posture === 'pelvic-tilt') return 'For your posture: glute bridges and hip-flexor release every day.'
      if (diag.posture === 'aligned') return 'Your posture is aligned — maintain it with strength work.'
      return null
    case 'image':
      if (diag.undertone) return `Your undertone is ${diag.undertone}. Build your capsule from the ${diag.undertone} palette.`
      return null
    default:
      return null
  }
}
