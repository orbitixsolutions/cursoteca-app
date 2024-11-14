'use client'

import { Hero } from '@/app/[eca]/(home)/_sections/hero'
import { Inscriptions } from '@/app/[eca]/(home)/_sections/inscriptions'
import { StartingNow } from '@/app/[eca]/(home)/_sections/starting-now'

export default function HomeEcaPage() {
  return (
    <div className='space-y-24'>
      <Hero />
      <Inscriptions />
      <StartingNow />
    </div>
  )
}
