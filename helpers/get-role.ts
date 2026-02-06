export function getRole(role: string) {
  if (role === 'ADMIN') return 'Administrador'
  if (role === 'DIRECTIVE') return 'Directivo'
  if (role === 'USER') return 'Usuario'

  return 'Indefinido'
}
