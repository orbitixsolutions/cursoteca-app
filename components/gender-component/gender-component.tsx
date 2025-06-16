import { FemaleIcon } from '@/assets/icons/female-icon'
import { GenderComponentProps } from './gender-component.props'
import { MaleIcon } from '@/assets/icons/male-icon'
import { cn } from '@/lib/utils'

const SIZE = 'size-5'

export function GenderComponent(props: GenderComponentProps) {
  const { gender } = props

  if (gender === 'MALE')
    return <MaleIcon className={cn(SIZE, 'text-blue-400')} />

  if (gender === 'FEMALE')
    return <FemaleIcon className={cn(SIZE, 'text-pink-400')} />

  return null
}
