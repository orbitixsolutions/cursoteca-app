'use server'

import * as z from 'zod'

import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/lib/users'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { message: 'Campos invalidos.', status: 403 }
  }

  const { email, password } = validateFields.data

  const USER = await getUserByEmail(email)
  const ECA_ID = USER?.eca

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: `/${ECA_ID}/dashboard`,
    })

    return { message: 'Sesion iniciada!', status: 201 }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Credenciales invalidas!', status: 500 }
        default:
          return { message: 'Ocurrio un error!', status: 500 }
      }
    }

    throw error
  }
}
