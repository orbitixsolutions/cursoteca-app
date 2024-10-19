import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import { useCurrentUser } from '@/services/hooks/use-session'
import { AvatarFallback } from '@/components/ui/avatar'
import { ChevronsUpDown, LogOut, Sun, User } from 'lucide-react'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { handleSignout } from '@/services/helpers/sign-out'
import { ModeToggle } from '@/components/mode-toggle/mode-toggle'

export function DashboardDropdown() {
  const session = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarFallback className='rounded-lg'>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{session?.name}</span>
            <span className='truncate text-xs'>{session?.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side='bottom'
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarFallback className='rounded-lg'>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{session?.name}</span>
              <span className='truncate text-xs'>{session?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignout}>
            <div className='flex items-center gap-2'>
              <LogOut />
              Cerrar sesión
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
