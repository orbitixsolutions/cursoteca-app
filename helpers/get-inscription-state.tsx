import { INSCRIPTION_STATUS } from '@/constants'

export function getInscriptionState(status: string) {
  if (!status) return 'Inactivo'
  
  const STATUS = INSCRIPTION_STATUS.find((s) => s.value === status)
  return STATUS?.label
}
