import { useAppData } from '@/lib/store'
import { cn } from '@/lib/utils'
import { BookOpen, LineChart, Sparkles, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

const NAV = [
  { href: '/', label: 'Today', icon: Sparkles },
  { href: '/academy', label: 'Academy', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: LineChart },
  { href: '/settings', label: 'Profile', icon: UserRound },
]

export function AppShell({ children }: { children: ReactNode }) {
  const { data } = useAppData()
  const router = useRouter()
  const pathname = usePathname()

  const needsOnboarding = data !== null && !data.onboarded

  useEffect(() => {
    if (needsOnboarding) router.replace('/onboarding')
  }, [needsOnboarding, router])

  if (data === null || needsOnboarding) {
    return <SplashScreen />
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md md:max-w-2xl flex-col bg-cream md:border-x md:border-border/60 md:shadow-2xl md:shadow-plum/5">
      <main key={pathname} className="flex-1 animate-page-in px-5 pb-32 pt-[max(env(safe-area-inset-top),1.75rem)]">
        {children}
      </main>
      <BottomNav pathname={pathname} />
    </div>
  )
}

function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-cream/95 backdrop-blur-xl"
    >
      <ul className="mx-auto grid max-w-md md:max-w-2xl grid-cols-4 px-2 pt-2">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className="group flex flex-col items-center gap-1 rounded-2xl py-1.5"
              >
                <span
                  className={cn(
                    'flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300',
                    active ? 'bg-plum text-gold shadow-sm' : 'text-plum/50 group-hover:text-plum',
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={active ? 2 : 1.6} aria-hidden="true" />
                </span>
                <span className={cn('text-[10px] tracking-wide', active ? 'font-semibold text-plum' : 'text-plum/55')}>
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function SplashScreen() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream" aria-busy="true">
      <p className="animate-pulse font-serif text-2xl italic text-plum/70 tracking-wide">The Her Effect</p>
    </div>
  )
}
