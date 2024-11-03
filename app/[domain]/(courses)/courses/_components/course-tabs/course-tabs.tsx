'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { COURSE_CATEGORIES } from '@/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function CourseTabs() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams as any)
  const { replace } = useRouter()

  useEffect(() => {
    if (!params.get('category')) {
      params.set('category', 'all')

      const q = `${params.toString()}`
      replace(`${pathname}?${q}`, { scroll: false })
    }
  }, [])

  const handleChange = (value: string) => {
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }

    const q = `${params.toString()}`
    replace(`${pathname}?${q}`, { scroll: false })
  }

  return (
    <div className='w-[720px] mx-auto'>
      <Tabs
        defaultValue='all'
        onValueChange={handleChange}
        className='w-full'
      >
        <TabsList className='grid grid-cols-4'>
          <TabsTrigger value='all'>Todos</TabsTrigger>
          {COURSE_CATEGORIES.slice(1, 4).map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.name}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
