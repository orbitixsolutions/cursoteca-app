'use client'

import { EDUCATIONAL_LEVELS, SELECT_DEPARTAMENTS } from '@/constants'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RangeBar } from '@/components/shared/general/range-bar/range-bar'
import { SearchBar } from '@/components/shared/general/search-bar'
import { SelectSearchBar } from '@/components/shared/general/select-search-bar'
import { Button } from '@/components/ui/button'

export function InscriptionFilter() {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
      <SearchBar
        queryParam='course'
        placeholder='Buscar curso'
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='justify-start'
          >
            Buscar por nombre
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[480px] max-w-[950px]'>
          <div className='flex items-center space-x-2'>
            <SearchBar
              queryParam='firstName'
              placeholder='Primer nombre'
            />
            <SearchBar
              queryParam='secondName'
              placeholder='Segundo nombre'
            />
          </div>
        </PopoverContent>
      </Popover>

      <RangeBar queryParam='age' />

      <SelectSearchBar
        queryParam='departament'
        placeholder='Filtrar por departameto'
        items={SELECT_DEPARTAMENTS}
      />

      <SelectSearchBar
        queryParam='educationalLevel'
        placeholder='Filtrar por nivel educativo'
        items={EDUCATIONAL_LEVELS}
      />
    </div>
  )
}
