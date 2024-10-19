import { Home, Inbox, Settings, SheetIcon, Users } from 'lucide-react'

export const REGISTRATIONS_STEPS = [
  {
    title: '1. Sitio de inscripciones',
    description:
      'Primero ingresa al sitio oficial donde encontraras todos los cursos disponibles que encontraras en el siguiente botón',
    button: true,
    button_text: 'Cursos disponibles',
    arrow: true,
  },
  {
    title: '2. Llena el formulario',
    description:
      'Después de escoger tu curso, llena un simple formulario para postularse a la vacante.',
    button: false,
    button_text: null,
    arrow: true,
  },
  {
    title: '3. Etapa de ingreso',
    description:
      'Después de llenar el formulario se te avisará por medio de tu cuenta de la Fundación los Pinos si haz sido aceptado o si aún no eres el tipo de estudiante que busca el curso',
    button: false,
    button_text: null,
    arrow: false,
  },
]

export const ROLES = [
  {
    name: 'Directivo',
    value: 'DIRECTIVE',
    label: 'directive',
  },
  {
    name: 'Administrador',
    value: 'ADMIN',
    label: 'admin',
  },
  {
    name: 'Estudiante',
    value: 'STUDENT',
    label: 'student',
  },
  {
    name: 'Usuario',
    value: 'USER',
    label: 'user',
  },
]

export const SIDEBAR_ITEMS = [
  {
    title: 'Inicio',
    url: '/',
    icon: Home,
  },
  {
    title: 'Administradores',
    url: '/admin',
    icon: Users,
  },
  {
    title: 'Cursos',
    url: '/courses',
    icon: SheetIcon,
  },
  {
    title: 'Inscriptos',
    url: '/incriptions',
    icon: Inbox,
  },
  {
    title: 'Configuraciones',
    url: '/settings',
    icon: Settings,
  },
]
