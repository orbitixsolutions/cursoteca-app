import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Por favor ingrese un email válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
})

export const CreateAdminSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor ingrese un email válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
  eca: z.string().min(1, {
    message: 'La ECA es obligatoria.',
  }),
  role: z.enum(['ADMIN', 'DIRECTIVE', 'USER']),
})
