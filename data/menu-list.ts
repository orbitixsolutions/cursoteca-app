import { Box, Home, Lock, Settings2 } from 'lucide-react'

export const SIDEBAR_DATA = {
  sidebar_items: [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Administradores',
      url: '/dashboard/admin',
      icon: Lock,
    },
    {
      title: 'Cursos',
      url: '/dashboard/courses',
      icon: Box,
    },
    {
      title: 'Configuraciones',
      url: '/dashboard/settings',
      icon: Settings2,
    },
  ],
}
