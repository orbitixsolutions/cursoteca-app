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
} from '@/components/ui/sidebar'
import { SIDEBAR_DATA } from '@/data/menu-list'
import { GalleryVerticalEnd } from 'lucide-react'
import { SidebarDropdown } from '@/components/shared/dashboard/sidebar-dropdown'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getEcaName } from '@/helpers/get-eca-name'

export function SidebarDashboard() {
  const { eca } = useParams<{ eca: string }>()
  const { DOMAIN, ECA_NAME } = getEcaName(eca)

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
            >
              <Link href={`/${DOMAIN}/dashboard`}>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    Dashboard: {ECA_NAME}
                  </span>
                  <span className='truncate text-xs'>v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_DATA.sidebar_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/${DOMAIN}/${item.url}`}>
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
        <SidebarDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
