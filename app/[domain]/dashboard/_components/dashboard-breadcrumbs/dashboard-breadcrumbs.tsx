'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { SIDEBAR_ITEMS } from '@/constants'
import { usePathname } from 'next/navigation'

export function DashboardBreadcrumbs() {
  const pathname = usePathname()

  const LAST_PATH = `/${pathname.split('/').findLast((item) => item) }`
  const CURRENT_ROUTE = SIDEBAR_ITEMS.find((item) => item.url === LAST_PATH)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block'>
          {CURRENT_ROUTE?.title}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
