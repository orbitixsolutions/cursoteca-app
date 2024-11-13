import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers(props: ProvidersProps) {
  const { children } = props

  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
