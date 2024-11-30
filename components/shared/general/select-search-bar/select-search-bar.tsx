'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SelectSearchbarProps } from '@/components/shared/general/select-search-bar/select-search-bar.type'
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const WAIT_BEFORE_DEBOUNCE = 500

export function SelectSearchBar(props: SelectSearchbarProps) {
  const { queryParam, placeholder, items, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)
  const DEFAULT_VALUE = searchParams.get(queryParam)?.toString()

  const onChange = useDebouncedCallback((value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, WAIT_BEFORE_DEBOUNCE)

  return (
    <div className='flex items-center space-x-1'>
      <div>
        <Select
          key={DEFAULT_VALUE}
          defaultValue={DEFAULT_VALUE}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={cn('w-[320px]', className)}>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value.toLocaleLowerCase()}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant='ghost'
        size='icon'
        disabled={!DEFAULT_VALUE}
        className='rounded-full'
        onClick={() => onChange('')}
      >
        <X />
      </Button>
    </div>
  )
}
