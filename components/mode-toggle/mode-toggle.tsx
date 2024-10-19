'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='flex flex-1 items-center gap-2 h-full'
    >
      <SunIcon className='w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100' />
      <MoonIcon className='absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0' />
      Cambiar tema
    </div>
  )
}
