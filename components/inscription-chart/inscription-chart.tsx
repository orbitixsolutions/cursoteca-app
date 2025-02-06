'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InscriptionChartProps } from '@/components/inscription-chart/inscription-chart.type'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

const CONFIG = {
  inscriptions: {
    label: 'Inscriptos',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

export function InscriptionChart(props: InscriptionChartProps) {
  const { data: COURSES } = props

  const DATA = COURSES.map((item) => ({
    course: item.title,
    inscriptions: item.enrollment.length,
  }))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Ver estadisticas</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[480px]'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Inscriptos - Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CONFIG}>
              <BarChart
                accessibilityLayer
                data={DATA}
                layout='vertical'
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey='course'
                  type='category'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis
                  dataKey='inscriptions'
                  type='number'
                  hide
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='line' />}
                />
                <Bar
                  dataKey='inscriptions'
                  layout='vertical'
                  fill='var(--color-inscriptions)'
                  radius={4}
                >
                  <LabelList
                    dataKey='course'
                    position='insideLeft'
                    offset={8}
                    className='fill-[--color-label]'
                    fontSize={12}
                  />
                  <LabelList
                    dataKey='inscriptions'
                    position='right'
                    offset={8}
                    className='fill-foreground'
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
