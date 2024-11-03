'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useCourses } from '@/app/[domain]/(courses)/courses/provider'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { EcaHeaderProps } from './eca-header.type'

export function EcaHeader(props: EcaHeaderProps) {
  const { urlPrefix, config } = props

  if (!config) return null

  const URL_PREFIX = config.id

  const ECA_LOGO = {
    src: config.logo,
    alt: `Logo de ${config.name}`,
    url: `/${URL_PREFIX}`,
  }

  return (
    <header className='px-5 container mx-auto max-w-7xl flex items-center justify-between py-6 md:py-12'>
      <Logo {...ECA_LOGO} />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={`/${URL_PREFIX}/courses?category=all`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Cursos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={`/${URL_PREFIX}`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
