import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RangeBarProps } from '@/components/shared/general/range-bar/range-bar.type'
import { Slider } from '@/components/ui/slider'

export function RangeBar(props: RangeBarProps) {
  const { queryParam } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)
  const DEFAULT_VALUE = searchParams.get(queryParam)

  const handleSearch = (value: number[]) => {
    const N = value.join('-')

    if (N !== '0') {
      searchParams.set(queryParam, N)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <div className='flex items-center gap-3'>
      <p className='text-sm'>Rango por edad</p>
      <Slider
        className='w-[300px]'
        defaultValue={[Number(DEFAULT_VALUE)]}
        value={[Number(DEFAULT_VALUE)]}
        onValueChange={handleSearch}
        formatLabel={(value) => `${value} Años`}
        max={80}
        step={1}
      />
    </div>
  )
}
