import { Box, Lock, Users, Users2 } from 'lucide-react'

export const SIDEBAR_DIRECTIVE_ITEMS = {
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
      title: 'Candidatos',
      url: 'dashboard/candidates',
      icon: Users2,
    },
  ],
}

export const SIDEBAR_ADMIN_ITEMS = {
  sidebar_items: [
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
      title: 'Candidatos',
      url: 'dashboard/candidates',
      icon: Users2,
    },
  ],
}
