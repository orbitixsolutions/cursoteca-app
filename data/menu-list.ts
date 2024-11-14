import { Box, Lock, Settings2, Users } from 'lucide-react'

export const SIDEBAR_DATA = {
  sidebar_items: [
    {
      title: 'Administradores',
      url: 'dashboard/admin',
      icon: Lock,
    },
    {
      title: 'Cursos',
      url: 'dashboard/courses',
      icon: Box,
    },
    {
      title: 'Inscriptos',
      url: 'dashboard/inscriptions',
      icon: Users,
    },
    {
      title: 'Configuraciones',
      url: 'dashboard/settings',
      icon: Settings2,
    },
  ],
}
