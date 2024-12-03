'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { useSidebarToggle } from '@/store/use-sidebar-toggle'
import { useStore } from '@/store/use-store'
import { SidebarDashboard } from '@/components/shared/dashboard/sidebar-dashboard'
import { useMediaQuery } from '@uidotdev/usehooks'

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const isMediumDevice = useMediaQuery('only screen and (max-width : 769px)')

  const sidebarHook = useStore(useSidebarToggle, (state) => state)
  if (!sidebarHook) return null

  if (isMediumDevice)
    return (
      <div className='min-h-[calc(100svh_-_8rem)] w-full grid place-items-center px-16'>
        <p className='text-4xl text-balance font-bold text-center opacity-60'>
          Panel no disponible en dispositivos móviles
        </p>
      </div>
    )

  return (
    <SidebarProvider
      open={sidebarHook.isOpen}
      onOpenChange={sidebarHook.setIsOpen}
    >
      <SidebarDashboard />

      <div className='flex-1 flex flex-col mx-auto w-full'>{children}</div>
    </SidebarProvider>
  )
}
