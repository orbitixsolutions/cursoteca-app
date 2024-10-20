// ZOD SCHEMAS //
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico no es válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
})

export const AdminSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'El correo electrónico no es válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
  ecaId: z.string().min(1, {
    message: 'La id de la eca es requerida.',
  }),
  role: z.enum(['DIRECTIVE', 'ADMIN', 'STUDENT', 'USER'], {
    message: 'Selecciona al menos un rol.',
  }),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'El correo electrónico no es válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
})

export const CourseSchema = z.object({
  title: z.string().min(1, {
    message: 'Por favor ingresa el nombre del curso.',
  }),
  category: z.enum(['NONE', 'LOGISTICS', 'PHARMACEUTICALS', 'OTHERS'], {
    message: 'Selecciona una categoría.',
  }),
  ecaId: z.string().min(1, {
    message: 'La id de la eca es requerida.',
  }),
  description: z.string().min(1, {
    message: 'Por favor ingresa la descripción del curso.',
  }),
  isVisible: z.boolean({
    message: 'Por favor ingresa el estado del curso.',
  }),
})
