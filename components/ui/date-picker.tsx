import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useImperativeHandle, useRef } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { CalendarProps } from '@/components/ui/calendar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { add, format, Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { cn } from '@/lib/utils'

function genMonths(locale: Locale) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), 'MMMM', { locale }),
  }))
}

function genYears(startYear = 1985) {
  const currentYear = new Date().getFullYear()

  const years = []
  for (let i = startYear; i <= currentYear; i++) {
    years.push({
      value: i,
      label: i.toString(),
    })
  }
  years.sort((a, b) => b.value - a.value)

  return years
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  startYear = 1985,
  ...props
}: CalendarProps & { startYear?: number }) {
  const MONTHS = React.useMemo(
    () => genMonths(props.locale || enUS),
    [props.locale]
  )
  const YEARS = React.useMemo(() => genYears(startYear), [startYear])

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center',
        month: 'space-y-4 capitalize',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className='h-4 w-4' />,
        IconRight: () => <ChevronRight className='h-4 w-4' />,
        CaptionLabel: ({ displayMonth }) => {
          return (
            <div className='inline-flex gap-2'>
              <Select
                defaultValue={displayMonth.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setMonth(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className='w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground capitalize'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem
                      key={month.value}
                      className='capitalize'
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={displayMonth.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setFullYear(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className='w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem
                      key={year.value}
                      value={year.value.toString()}
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

type ClassNames = {
  calendar?: string
  calendarButton?: string
  wrapper?: string
}

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  classNames?: ClassNames
  className?: string
  disableFutureDates?: boolean
  startYear?: number
} & Pick<
  CalendarProps,
  'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'
>

type DatePickerRef = {
  value?: Date
} & Omit<HTMLButtonElement, 'value'>

const DatePicker = React.forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      locale = enUS,
      value,
      className,
      classNames,
      onChange,
      startYear = 1985,
      disableFutureDates = false,
      disabled = false,
      placeholder = 'Selecciona una fecha',
      ...props
    },
    ref
  ) => {
    const [month, setMonth] = React.useState<Date>(value ?? new Date())
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleSelect = (newDay: Date | undefined) => {
      if (!newDay) return
      if (!value) {
        onChange?.(newDay)
        setMonth(newDay)
        return
      }
      const diff = newDay.getTime() - value.getTime()
      const diffInDays = diff / (1000 * 60 * 60 * 24)
      const newDateFull = add(value, { days: Math.ceil(diffInDays) })
      onChange?.(newDateFull)
      setMonth(newDateFull)
    }

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current!,
        value,
      }),
      [value]
    )

    return (
      <Popover>
        <PopoverTrigger
          asChild
          disabled={disabled}
        >
          <Button
            variant='outline'
            className={cn(
              'w-full justify-between text-left font-normal',
              !value && 'text-muted-foreground',
              classNames?.calendarButton
            )}
            ref={buttonRef}
          >
            {value ? (
              <span className='capitalize'>
                {format(value, 'PP', { locale })}
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', classNames?.wrapper)}>
          <Calendar
            mode='single'
            selected={value}
            month={month}
            onSelect={(d) => handleSelect(d)}
            onMonthChange={handleSelect}
            initialFocus
            className={cn(className, classNames?.calendar)}
            startYear={startYear}
            locale={locale}
            disabled={
              disableFutureDates
                ? (date) => date > new Date() || date < new Date('1985-01-01')
                : false
            }
            {...props}
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
export type { DatePickerProps }
