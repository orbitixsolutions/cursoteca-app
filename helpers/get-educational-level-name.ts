import { EDUCATIONAL_LEVELS } from '@/constants'

export function getEducationalLevelName(level: string) {
  if (level === 'NONE') return 'Ninguno'
  const LEVEL = EDUCATIONAL_LEVELS.find((l) => l.value === level)   

  return LEVEL?.label
}
