'use client'

import { SearchBar } from '@/components/shared/general/search-bar'
import { SelectSearchBar } from '@/components/shared/general/select-search-bar'
import { SELECT_PROVINCES } from '@/constants'

export function InscriptionFilter() {
  return (
    <div className='flex items-center space-x-4'>
      <SearchBar
        queryParam='name'
        placeholder='Buscar por nombre'
      />
      <SearchBar
        queryParam='age'
        type='number'
        placeholder='Buscar por edad'
      />
      <SelectSearchBar
        queryParam='province'
        placeholder='Buscar por ubicación'
        items={SELECT_PROVINCES}
      />
    </div>
  )
}
