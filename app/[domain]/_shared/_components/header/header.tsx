'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useParams } from 'next/navigation'
import { useCurrentRole } from '@/services/hooks/use-session'
import { UserDropdown } from '@/app/[domain]/_shared/_components/user-dropdown'
import Link from 'next/link'

export function Header() {
  const { domain } = useParams<{ domain: string }>()
  const ROLE = useCurrentRole()

  const DOMAIN = decodeURIComponent(domain)

  return (
    <header className='px-8 py-4 border-b flex items-center justify-between border-gray-400/50'>
      <div className='flex items-center gap-6'>
        <h2 className='text-xl font-bold uppercase'>
          {DOMAIN.replaceAll('-', ' ')}
        </h2>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href={`/${DOMAIN}/dashboard`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {ROLE === 'DIRECTIVE' && (
              <NavigationMenuItem>
                <Link
                  href={`/${DOMAIN}/admin`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Admin
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <UserDropdown />
    </header>
  )
}
