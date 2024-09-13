import { Button } from '@/components/ui/button'

export default function SiteHomePage() {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-dvh'>
      <div className='space-y-2'>
        <h2 className='text-2xl text-cente'>Cursoteca App</h2>
        <Button>Click me</Button>
      </div>
    </div>
  )
}
