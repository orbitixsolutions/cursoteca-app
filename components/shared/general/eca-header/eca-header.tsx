import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { EcaHeaderProps } from '@/components/shared/general/eca-header/eca-header.type'
import { ModeToggle } from '@/components/shared/general/mode-toggle'
import { currentRole } from '@/lib/session'
import Image from 'next/image'
import Link from 'next/link'

export async function EcaHeader(props: EcaHeaderProps) {
  const { data } = props

  const ROLE = await currentRole()

  if (!data) return null

  return (
    <header className='max-w-[1280px] w-full mx-auto py-4 px-8'>
      <div className='flex items-center justify-between'>
        <Link href={`/${data.path}`}>
          <Image
            src={data.logo}
            alt={data.name}
            width={1000}
            height={1000}
            className='size-16 object-cover'
          />
        </Link>

        <div className='flex items-center space-x-4'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href={`/${data.path}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Inicio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href={`/${data.path}/courses`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Cursos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {ROLE !== 'USER' && ROLE && (
                <NavigationMenuItem>
                  <Link
                    href={`/${data.path}/dashboard`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
