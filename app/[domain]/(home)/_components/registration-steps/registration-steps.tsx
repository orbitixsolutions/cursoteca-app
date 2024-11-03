'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { REGISTRATIONS_STEPS } from '@/constants'
import { CircleArrowRight } from 'lucide-react'
import { Fragment } from 'react'

export function RegistrationSteps() {
  return (
    <ul className='flex items-center justify-center space-x-4 md:space-x-8 h-[320px]'>
      {REGISTRATIONS_STEPS.map((step, index) => (
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
                  <RainbowButton>{step.button_text}</RainbowButton>
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
