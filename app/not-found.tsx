import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4'>404</h1>
        <h2 className='text-3xl font-semibold mb-4'>¡Pagina no encontrada!</h2>
        <p className='text-xl mb-8'>
          ¡Ups! La pagina a la que estas intentando acceder no esta disponible
        </p>
        <Button asChild>
          <Link href='/'>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
