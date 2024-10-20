import { COURSE_CATEGORIES } from '@/constants'

export function getCategoryName(category: string) {
  if (category === 'NONE') return 'Ninguno'
  const CATEGORY = COURSE_CATEGORIES.find((c) => c.value === category)

  return CATEGORY?.label
}
