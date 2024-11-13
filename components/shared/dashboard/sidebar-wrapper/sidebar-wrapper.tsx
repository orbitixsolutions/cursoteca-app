'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { useSidebarToggle } from '@/store/use-sidebar-toggle'
import { useStore } from '@/store/use-store'
import { SidebarDashboard } from '@/components/shared/dashboard/sidebar-dashboard'

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const sidebarHook = useStore(useSidebarToggle, (state) => state)
  if (!sidebarHook) return null

  return (
    <SidebarProvider
      open={sidebarHook.isOpen}
      onOpenChange={sidebarHook.setIsOpen}
    >
      <SidebarDashboard />

      {children}
    </SidebarProvider>
  )
}
