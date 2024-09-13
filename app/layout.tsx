import '@/styles/globals.css'
import { inter } from '@/styles/fonts'
import { Providers } from './providers'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'

const title = 'Cursoteca | Platforms.'
const description = 'Cursoteca es una plataforma de educación.'

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='es'
      suppressHydrationWarning
    >
      <body className={cn(inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
