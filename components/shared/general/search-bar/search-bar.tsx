'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBarProps } from '@/components/shared/general/search-bar/search-bar.type'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'

const WAIT_BEFORE_DEBOUNCE = 500

export function SearchBar(props: SearchBarProps) {
  const { queryParam, placeholder, className, type = 'text' } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)
  const DEFAULT_VALUE = searchParams.get(queryParam)?.toString()

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, WAIT_BEFORE_DEBOUNCE)

  return (
    <Input
      className={cn('w-full', className)}
      defaultValue={DEFAULT_VALUE}
      type={type}
      onChange={(e) => handleSearch(e.target.value.toLowerCase())}
      placeholder={placeholder}
    />
  )
}
