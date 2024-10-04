import { Header } from './_components/header'
import { Hero } from './_sections/hero'
import { Registrations } from './_sections/registrations'

export default function SiteHomePage() {
  return (
    <>
      <Header />
      <main className='max-w-7xl container mx-auto py-12 md:py-24 space-y-12 md:space-y-24 max-md:px-2'>
        <Hero />
        <Registrations />
      </main>
    </>
  )
}
