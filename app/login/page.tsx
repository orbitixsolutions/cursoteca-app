import { LoginForm } from '@/app/login/_components/login-form'

export default function LoginPage() {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='space-y-5 w-full max-w-[440px]'>
        <h2 className='text-xl font-bold text-center'>Iniciar sesión</h2>
        <LoginForm />
      </div>
    </section>
  )
}
