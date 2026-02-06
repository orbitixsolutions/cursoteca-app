import { STATUS_ENUM } from '@prisma/client'

export function getClassByStatus(status: STATUS_ENUM) {
  switch (status) {
    case 'INTERVIEW':
      return 'text-blue-500'
    case 'STAGE_1':
      return 'text-green-500'
    case 'STAGE_2':
      return 'text-yellow-500'
    case 'STAGE_3':
      return 'text-orange-500'
    case 'APPROVED':
      return 'text-teal-500'
    case 'NOT_APPROVED':
      return 'text-red-500'
    case 'ALTERNATE':
      return 'text-purple-500'
    default:
      return 'text-gray-500'
  }
}

export function getNameByStatus(status: STATUS_ENUM) {
  switch (status) {
    case 'INTERVIEW':
      return 'Entrevista'
    case 'STAGE_1':
      return 'Etapa 1'
    case 'STAGE_2':
      return 'Etapa 2'
    case 'STAGE_3':
      return 'Etapa 3'
    case 'APPROVED':
      return 'Aprobado'
    case 'NOT_APPROVED':
      return 'No Aprobado'
    case 'ALTERNATE':
      return 'Alt. Aprobado'
    default:
      return 'Sin Estado'
  }
}
