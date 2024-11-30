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
import Link from 'next/link'

export const INSCRIPTIONS_STEPS = [
  {
    title: '1. Sitio de inscripciones',
    description:
      'Primero ingresa al sitio oficial donde encontraras todos los cursos disponibles que encontraras en el siguiente botón.',
    button: true,
    button_text: 'Cursos disponibles',
    arrow: true,
  },
  {
    title: '2. Llena el formulario',
    description:
      'Después de escoger tu curso, llena un simple formulario para postularse a la vacante.',
    button: false,
    button_text: null,
    arrow: true,
  },
  {
    title: '3. Etapa de ingreso',
    description:
      'Después de llenar el formulario se te avisará por medio de tu cuenta si haz sido aceptado o si aún no eres el tipo de estudiante que busca el curso.',
    button: false,
    button_text: null,
    arrow: false,
  },
]

export function InscriptionSteps() {
  const { data } = useEca()
  if (!data) return null

  return (
    <ul className='flex items-center justify-center space-x-4 md:space-x-8 h-[320px]'>
      {INSCRIPTIONS_STEPS.map((step, index) => (
        <Fragment key={index}>
          <li className='flex items-center size-full w-[200px] md:w-[400px] h-full'>
            <Card className='size-full flex flex-col items-center justify-center text-center'>
              <CardHeader>
                <CardTitle className='text-lg md:text-3xl'>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
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
          {step.arrow && <CircleArrowRight className='size-10' />}
        </Fragment>
      ))}
    </ul>
  )
}
