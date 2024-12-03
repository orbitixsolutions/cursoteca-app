import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EcaHeaderProps } from '@/components/shared/general/eca-header/eca-header.type'
import { ModeToggle } from '@/components/shared/general/mode-toggle'
import { currentRole } from '@/lib/session'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function EcaHeader(props: EcaHeaderProps) {
  const { data } = props

  const ROLE = await currentRole()

  if (!data) return null

  return (
    <header className='max-w-[1280px] w-full mx-auto py-4 md:py-8 px-4 md:px-8'>
      <div className='flex items-center justify-between'>
        <Link href={`/${data.path}`}>
          <Image
            src={data.logo}
            alt={data.name}
            width={1000}
            height={1000}
            className='size-8 md:size-16 object-cover'
          />
        </Link>

        <div className='flex items-center space-x-1 md:space-x-4'>
          <div className='hidden md:block'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href={`/${data.path}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
          </div>

          <ModeToggle />

          <div className='block md:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${data.path}`}>Inicio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${data.path}/courses`}>Cursos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${data.path}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
