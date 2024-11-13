import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

export const handleSignout = async () => {
  toast.success('Sesión cerrada.')
  await signOut()
}
