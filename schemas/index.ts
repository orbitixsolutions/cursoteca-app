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

export const CreateCourseSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres.',
  }),
  description: z.string().min(3, {
    message: 'La descripción debe tener al menos 3 caracteres.',
  }),
  category: z.enum(['ALL', 'NONE', 'LOGISTICS', 'PHARMACEUTICALS', 'OTHERS'], {
    message: 'Selecciona una categoría.',
  }),
  isVisible: z.boolean({
    message: 'Por favor ingresa el estado del curso.',
  }),
  eca: z.string().min(1, {
    message: 'La ECA es obligatoria.',
  }),
})