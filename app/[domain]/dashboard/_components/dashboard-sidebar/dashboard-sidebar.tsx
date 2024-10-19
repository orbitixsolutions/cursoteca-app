'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { AppWindow } from 'lucide-react'
import { SIDEBAR_ITEMS } from '@/constants'
import { usePathname } from 'next/navigation'
import { DashboardDropdown } from '@/app/[domain]/dashboard/_components/dashboard-dropdown'
import Link from 'next/link'

export function DashboardSidebar() {
  const pathname = usePathname()
  const NAV_URL = pathname.split('/').slice(0, 3).join('/')

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row gap-2 px-4 py-5'>
        <AppWindow />
        <p className='line-clamp-1'>
          <span className='font-semibold'>Dashboard</span>
        </p>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='space-x-3'>
            <span>Administrar</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`${NAV_URL}${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DashboardDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
