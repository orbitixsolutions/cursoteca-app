import { Header } from './_components/header'
import { Hero } from './_sections/hero'
import { Registrations } from './_sections/registrations'
import { StartingNow } from './_sections/starting-now'

export default function SiteHomePage() {
  return (
    <>
      <Header />
      <main className='max-w-7xl container mx-auto py-12 md:py-24 space-y-16 md:space-y-32 max-md:px-2'>
        <Hero />
        <Registrations />
        <StartingNow />
      </main>
    </>
  )
}
