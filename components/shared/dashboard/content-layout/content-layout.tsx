'use client'

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ContentLayoutProps } from '@/components/shared/dashboard/content-layout/content-layout.type'
import { getEcaName } from '@/helpers/get-eca-name'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

export function ContentLayout(props: ContentLayoutProps) {
  const { title, children } = props
  const { open, isMobile } = useSidebar()

  const { eca } = useParams<{ eca: string }>()
  const { ECA_NAME } = getEcaName(eca)

  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <SidebarInset
      className={cn(
        'transition-[margin-left] ease-linear duration-200 bg-transparent',
        open ? 'ml-[--sidebar-width]' : 'ml-0',
        isMobile && 'ml-0'
      )}
    >
      <header className='flex flex-1 z-50 items-center sticky top-0 border-b py-5 px-5 bg-background/70 backdrop-blur-2xl'>
        <SidebarTrigger />
        <Separator
          orientation='vertical'
          className='mx-2 h-4'
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className='min-h-[calc(100svh_-_8rem)] p-8 container mx-auto space-y-5'>
        {children}
      </div>

      <footer className='flex flex-1 border-t bg-background/70 backdrop-blur-2xl'>
        <div className='mx-4 md:mx-8 flex h-14 items-center'>
          <p className='text-xs md:text-sm leading-loose text-muted-foreground text-left'>
            Admin Panel - {ECA_NAME} {CURRENT_YEAR}
          </p>
        </div>
      </footer>
    </SidebarInset>
  )
}
