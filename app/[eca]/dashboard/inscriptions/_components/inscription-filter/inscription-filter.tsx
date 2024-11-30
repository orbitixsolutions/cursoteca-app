'use client'

import { RangeBar } from '@/components/shared/general/range-bar/range-bar'
import { SearchBar } from '@/components/shared/general/search-bar'
import { SelectSearchBar } from '@/components/shared/general/select-search-bar'
import {
  EDUCATIONAL_LEVELS,
  INSCRIPTION_STATUS,
  SELECT_PROVINCES,
} from '@/constants'

export function InscriptionFilter() {
  return (
    <div className='flex items-center justify-between space-x-4'>
      <div className='flex items-center space-x-4'>
        <SearchBar
          queryParam='name'
          placeholder='Buscar por nombre'
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
      </div>
      <RangeBar queryParam='age' />
    </div>
  )
}
