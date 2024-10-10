import { currentRole } from '@/data/auth'
import { Header } from '@/app/[domain]/_shared/_components/header'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ROLE = await currentRole()
  if (ROLE === 'USER' || ROLE === 'STUDENT') return redirect('/')

  return (
    <>
      <Header />
      <main className='space-y-20 md:space-y-12 py-20 md:p-12 container mx-auto'>
        {children}
      </main>
    </>
  )
}
