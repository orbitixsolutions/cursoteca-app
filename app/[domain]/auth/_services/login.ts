// 'use server'

// import * as z from 'zod'

// import { LoginSchema } from '@/schemas'
// import { signIn } from '@/auth'
// import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
// import { AuthError } from 'next-auth'

// export const login = async (
//   values: z.infer<typeof LoginSchema>,
//   domain: string
// ) => {
//   const validateFields = LoginSchema.safeParse(values)

//   if (!validateFields.success) {
//     return { message: 'Campos invalidos.', status: 403 }
//   }

//   const { email, password } = validateFields.data

//   try {
//     await signIn('credentials', {
//       email,
//       password,
//       redirectTo: `/${domain}${DEFAULT_LOGIN_REDIRECT}`,
//     })

//     return { message: 'Sesion iniciada!', status: 201 }
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return { message: 'Credenciales invalidas!', status: 500 }
//         default:
//           return { message: 'Ocurrio un error!', status: 500 }
//       }
//     }

//     throw error
//   }
// }
