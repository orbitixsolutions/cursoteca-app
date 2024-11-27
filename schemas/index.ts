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
  ageRange: z.array(
    z
      .number()
      .min(1, {
        message: 'El rango de edad es obligatorio.',
      })
      .max(80, {
        message: 'El rango de edad no puede superar los 80 años.',
      })
  ),
  educationalLevel: z.enum(
    ['PRIMARY', 'BASIC_CYCLE', 'SECONDARY', 'UNIVERSITY', 'NONE'],
    {
      message: 'Selecciona un nivel educativo.',
    }
  ),
})

export const InscriptionSchema = z.object({
  firstNames: z.string().min(1, {
    message: 'Ingrese su nombre.',
  }),
  lastNames: z.string().min(1, {
    message: 'Ingrese su apellido.',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Ingrese su número de teléfono.',
  }),
  email: z.string().email({
    message: 'Ingrese su email.',
  }),
  documentId: z.string().min(1, {
    message: 'Ingrese su documento.',
  }),
  eca: z.string().min(1, {
    message: 'La ECA es obligatoria.',
  }),
  dateOfBorn: z.date({
    message: 'Ingrese la fecha de nacimiento.',
  }),
  province: z.string().min(1, {
    message: 'Ingrese el provincia.',
  }),
  address: z.string().min(1, {
    message: 'Ingrese la dirección.',
  }),
  lastNameInstitution: z.string().min(1, {
    message: 'Ingrese el nombre de su ultima institución.',
  }),
  educationalLevel: z.enum(
    ['PRIMARY', 'BASIC_CYCLE', 'SECONDARY', 'UNIVERSITY', 'NONE'],
    {
      message: 'Debes seleccionar un nivel educativo.',
    }
  ),
})
