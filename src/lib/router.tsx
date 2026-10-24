import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react'

interface RouterContextType {
  pathname: string
  push: (href: string) => void
  replace: (href: string) => void
  back: () => void
  forward: () => void
}

function resolvePath(href: string): string {
  if (!href) return '/'
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  const cleaned = href.split('?')[0].split('#')[0] || '/'
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/'
  // Support hash routing fallback if the host environment uses hashes
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return resolvePath(window.location.hash.slice(1))
  }
  return resolvePath(window.location.pathname)
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
})

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(getCurrentPath)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getCurrentPath())
    }
    const handleHashChange = () => {
      setPathname(getCurrentPath())
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const push = useCallback((href: string) => {
    const target = resolvePath(href)
    try {
      window.history.pushState({}, '', target)
    } catch {
      // In restricted iframes, fallback to hash
      window.location.hash = target
    }
    setPathname(target)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const replace = useCallback((href: string) => {
    const target = resolvePath(href)
    try {
      window.history.replaceState({}, '', target)
    } catch {
      window.location.hash = target
    }
    setPathname(target)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }, [])

  const forward = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.forward()
    }
  }, [])

  return (
    <RouterContext.Provider value={{ pathname, push, replace, back, forward }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  return {
    push: ctx.push,
    replace: ctx.replace,
    back: ctx.back,
    forward: ctx.forward,
    refresh: () => {},
  }
}

export function usePathname() {
  const ctx = useContext(RouterContext)
  return ctx.pathname
}

export function notFound() {
  throw new Error('Not Found')
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  replace?: boolean
  children?: ReactNode
}

export function Link({ href, replace = false, onClick, children, ...props }: LinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !props.target &&
      href.startsWith('/')
    ) {
      e.preventDefault()
      if (replace) {
        router.replace(href)
      } else {
        router.push(href)
      }
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default Link
