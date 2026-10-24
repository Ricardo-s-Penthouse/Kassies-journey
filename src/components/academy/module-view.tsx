'use client'

import { Button, Eyebrow, Segmented } from '@/components/her/primitives'
import { personalNote, type Block, type Module } from '@/lib/content/academy'
import { useAppData } from '@/lib/store'
import { Check, ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function ModuleView({ module: m }: { module: Module }) {
  const { data, update } = useAppData()
  const [lessonId, setLessonId] = useState(m.lessons[0].id)
  if (!data) return null

  const idx = m.lessons.findIndex((l) => l.id === lessonId)
  const lesson = m.lessons[idx]
  const isDone = data.lessonsDone.includes(lesson.id)
  const note = personalNote(m.pillar, data.diagnostics)

  const toggleDone = () => {
    update((d) => ({
      ...d,
      lessonsDone: isDone ? d.lessonsDone.filter((x) => x !== lesson.id) : [...d.lessonsDone, lesson.id],
    }))
    if (!isDone && idx < m.lessons.length - 1) {
      setLessonId(m.lessons[idx + 1].id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <article className="space-y-5">
      <Link
        href="/academy"
        className="-ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-plum/70 hover:text-plum"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Academy
      </Link>

      <header className="space-y-2">
        <Eyebrow>Module {m.number}</Eyebrow>
        <h1 className="font-serif text-[2rem] font-semibold leading-[1.05] text-balance text-plum">{m.title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{m.subtitle}</p>
      </header>

      {note ? (
        <div className="flex gap-3 rounded-3xl border border-gold/40 bg-cream p-4">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-plum">{note}</p>
        </div>
      ) : null}

      <Segmented
        label="Lessons"
        value={lessonId}
        onChange={setLessonId}
        options={m.lessons.map((l, i) => ({
          value: l.id,
          label: `${data.lessonsDone.includes(l.id) ? '✓ ' : ''}${i + 1}. ${l.title}`,
        }))}
      />

      <section key={lesson.id} className="animate-page-in space-y-4 rounded-3xl bg-card p-5" aria-labelledby="lesson-title">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
            Lesson {idx + 1} · {lesson.minutes} min read
          </p>
          <h2 id="lesson-title" className="mt-1 font-serif text-2xl font-semibold leading-tight text-plum">
            {lesson.title}
          </h2>
        </div>
        {lesson.blocks.map((b, i) => (
          <LessonBlock key={i} block={b} />
        ))}
      </section>

      <Button onClick={toggleDone} variant={isDone ? 'ghost' : 'gold'} className="w-full">
        {isDone ? (
          <>
            <Check className="size-4" aria-hidden="true" /> Completed
          </>
        ) : idx < m.lessons.length - 1 ? (
          'Mark complete & continue'
        ) : (
          'Mark module complete'
        )}
      </Button>
    </article>
  )
}

function LessonBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-sm leading-relaxed text-plum/85 text-pretty">{block.text}</p>
    case 'h':
      return <h3 className="font-serif text-lg font-semibold text-plum">{block.text}</h3>
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-plum/85">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol className="space-y-2.5">
          {block.items.map((it, i) => (
            <li key={it} className="flex gap-3 rounded-2xl bg-cream p-3 text-sm leading-relaxed text-plum/85">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-plum text-[11px] font-semibold text-gold">
                {i + 1}
              </span>
              {it}
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="rounded-2xl bg-plum p-4 text-cream">
          <p className="font-serif text-lg font-semibold text-gold">{block.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-cream/85">{block.text}</p>
        </div>
      )
    case 'table':
      return (
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[480px] border-separate border-spacing-0 overflow-hidden rounded-2xl text-left text-xs">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="bg-plum px-3 py-2.5 font-semibold text-cream first:rounded-tl-2xl last:rounded-tr-2xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r[0]} className="even:bg-cream/60 odd:bg-cream">
                  {r.map((c, i) => (
                    <td key={i} className={`border-t border-border px-3 py-2.5 align-top text-plum/85 ${i === 0 ? 'font-semibold text-plum' : ''}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}
