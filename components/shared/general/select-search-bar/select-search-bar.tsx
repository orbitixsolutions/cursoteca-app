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
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export function SelectSearchBar(props: SelectSearchbarProps) {
  const { queryParam, placeholder, items, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)
  const DEFAULT_VALUE = searchParams.get(queryParam)?.toString()

  const onChange = (value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <div className='flex items-center space-x-1'>
      <div className='flex-1'>
        <Select
          key={DEFAULT_VALUE}
          defaultValue={DEFAULT_VALUE}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={cn('w-full', className)}>
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

      {DEFAULT_VALUE && (
        <Button
          variant='ghost'
          size='icon'
          disabled={!DEFAULT_VALUE}
          className='rounded-full'
          onClick={() => onChange('')}
        >
          <X />
        </Button>
      )}
    </div>
  )
}
