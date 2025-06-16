import { SELECT_GENDER } from "@/constants"
import { GENDER_ENUM } from "@prisma/client"

export function getGenderName(gender: GENDER_ENUM) {
  if (gender === 'NONE') return 'Ninguno'
  const GENDER = SELECT_GENDER.find((c) => c.value === gender)
  return GENDER?.label
}