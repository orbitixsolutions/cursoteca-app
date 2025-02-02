'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Fragment } from 'react'
import { useEca } from '@/app/[eca]/provider'
import { CircleArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@uidotdev/usehooks'
import Link from 'next/link'

export const INSCRIPTIONS_STEPS = [
  {
    title: '1. Sitio de inscripciones',
    description:
      'Primero ingresa al sitio oficial donde encontrarás todos los cursos disponibles actualmente además de los requisitos necesarios para cada curso.',
    button: true,
    button_text: 'Cursos disponibles',
    arrow: true,
  },
  {
    title: '2. Completa el formulario',
    description:
      'Después de seleccionar tu curso de interés, completa el formulario correspondiente para postularte al mismo.',
    button: false,
    button_text: null,
    arrow: true,
  },
  {
    title: '3. Etapa de selección',
    description:
      'Después de completar el formulario se te comunicará a través de WhatsApp las convocatorias para las instancias de selección.',
    button: false,
    button_text: null,
    arrow: false,
  },
]

export function InscriptionSteps() {
  const { data } = useEca()

  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)'
  )

  if (!data) return null

  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
      {INSCRIPTIONS_STEPS.map((step, index) => (
        <Fragment key={index}>
          <li className='flex items-center size-full'>
            <Card className='size-full flex flex-col items-center justify-center text-center'>
              <CardHeader>
                <CardTitle className='text-base md:text-3xl'>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-xs md:text-base'>{step.description}</p>
              </CardContent>
              {step.button && (
                <CardFooter>
                  <Button asChild>
                    <Link href={`/${data.path}/courses`}>
                      Cursos disponibles
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </li>
          {step.arrow ||
            (isMediumDevice && <CircleArrowRight className='size-10' />)}
        </Fragment>
      ))}
    </ul>
  )
}
