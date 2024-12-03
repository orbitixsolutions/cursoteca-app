'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  EDUCATIONAL_LEVELS,
  INSCRIPTION_STATUS,
  SELECT_PROVINCES,
} from '@/constants'
import { RangeBar } from '@/components/shared/general/range-bar/range-bar'
import { SearchBar } from '@/components/shared/general/search-bar'
import { SelectSearchBar } from '@/components/shared/general/select-search-bar'
import { Button } from '@/components/ui/button'

export function InscriptionFilter() {
  return (
    <div className='flex items-center justify-between space-x-4'>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Buscar por nombre</Button>
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

      <SearchBar
        queryParam='course'
        placeholder='Buscar curso'
      />

      <SelectSearchBar
        queryParam='educationalLevel'
        placeholder='Filtrar por nivel educativo'
        items={EDUCATIONAL_LEVELS.slice(1, 5)}
      />

      <SelectSearchBar
        queryParam='province'
        placeholder='Filtrar por ubicación'
        items={SELECT_PROVINCES}
      />

      <SelectSearchBar
        queryParam='status'
        placeholder='Filtrar por estado'
        items={INSCRIPTION_STATUS}
      />

      <RangeBar queryParam='age' />
    </div>
  )
}
