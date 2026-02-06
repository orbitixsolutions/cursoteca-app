import { LosPinosHeroImg } from '@/assets/ecas/images'
import { LosPinosLogo } from '@/assets/ecas/logos'

export type EcaConfigProps = {
  name: string
  description: string
  id: string
  image: string
  logo: string
  path: string
}

export const ECAS_CONFIG: EcaConfigProps[] = [
  {
    name: 'Los pinos',
    description: 'Institucion de todos y para todos.',
    id: 'los-pinos',
    image: LosPinosHeroImg.src,
    logo: LosPinosLogo.src,
    path: 'los-pinos',
  },
]
