import { AppShell } from '@/components/her/app-shell'
import { Dashboard } from '@/components/dashboard/dashboard'
import { AcademyIndex } from '@/components/academy/academy-index'
import { ModuleView } from '@/components/academy/module-view'
import { ProgressView } from '@/components/progress/progress-view'
import { SettingsView } from '@/components/settings/settings-view'
import { OnboardingWizard } from '@/components/onboarding/wizard'
import { getModule } from '@/lib/content/academy'
import { RouterProvider, usePathname } from '@/lib/router'

function AppRoutes() {
  const pathname = usePathname()

  if (pathname === '/onboarding') {
    return <OnboardingWizard />
  }

  // Academy sub-routes: /academy/:slug
  if (pathname.startsWith('/academy/')) {
    const slug = pathname.replace('/academy/', '').split('/')[0]
    const mod = getModule(slug)
    return (
      <AppShell>
        {mod ? <ModuleView module={mod} /> : <AcademyIndex />}
      </AppShell>
    )
  }

  if (pathname === '/academy') {
    return (
      <AppShell>
        <AcademyIndex />
      </AppShell>
    )
  }

  if (pathname === '/progress') {
    return (
      <AppShell>
        <ProgressView />
      </AppShell>
    )
  }

  if (pathname === '/settings') {
    return (
      <AppShell>
        <SettingsView />
      </AppShell>
    )
  }

  // Default route '/'
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  )
}
