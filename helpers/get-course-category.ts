export const COURSE_CATEGORIES = [
  {
    name: 'none',
    value: 'NONE',
    label: 'Ninguno',
  },
  {
    name: 'logistics',
    value: 'LOGISTICS',
    label: 'Logistica',
  },
  {
    name: 'pharmaceuticals',
    value: 'PHARMACEUTICALS',
    label: 'Farmaceútica',
  },
  {
    name: 'others',
    value: 'OTHERS',
    label: 'Otros',
  },
]

export function getCategoryName(category: string) {
  if (category === 'NONE') return 'Ninguno'
  const CATEGORY = COURSE_CATEGORIES.find((c) => c.value === category)

  return CATEGORY?.label
}
