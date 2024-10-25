import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { currentUser } from '@/data/auth'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DashboardSidebar } from '@/app/[domain]/dashboard/_components/dashboard-sidebar'
import { DashboardBreadcrumbs } from '@/app/[domain]/dashboard/_components/dashboard-breadcrumbs'

export default async function DashboardLayout({
  children,
  params: { domain },
}: {
  children: React.ReactNode
  params: { domain: string }
}) {
  const USER = await currentUser()

  const USER_ECA = USER?.ecaId
  const ROLE = USER?.role

  if (USER_ECA === undefined) return redirect('/')

  if (USER_ECA !== domain) return redirect(`/${USER_ECA}/dashboard`)

  if (ROLE === 'USER' || ROLE === 'STUDENT') return redirect('/')

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator
            orientation='vertical'
            className='mr-2 h-4'
          />
          <DashboardBreadcrumbs />
        </header>
        <main className='flex flex-1 flex-col gap-4 p-8 container mx-auto'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
