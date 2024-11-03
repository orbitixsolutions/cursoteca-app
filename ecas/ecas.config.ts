import { LosPinosLogo } from '@/assets/ecas/logos'
import { HeroImg } from '@/assets/ecas/images'

export type EcaProps = {
  name: string
  id: string
  description: string
  logo: string
  image: string
  color: string
}

export const ECAS = [
  {
    name: 'Los Pinos',
    id: 'los-pinos',
    description:
      'Los Pinos es un programa de educación que busca darle a los estudiantes la oportunidad de aprender de manera gratuita y en un ambiente de calidad.',
    logo: LosPinosLogo.src,
    image: HeroImg.src,
    color: '',
  },
  {
    name: 'Test',
    id: 'test',
    description:
      'Los Test es un programa de educación que busca darle a los estudiantes la oportunidad de aprender de manera gratuita y en un ambiente de calidad.',
    logo: LosPinosLogo.src,
    image: HeroImg.src,
    color: '',
  },
]
