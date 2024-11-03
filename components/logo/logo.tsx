import { cn } from '@/lib/utils'
import { LogoProps } from './logo.type'
import Image from 'next/image'
import Link from 'next/link'

export function Logo(props: LogoProps) {
  const { className, url, alt, src } = props

  return (
    <Link href={url}>
      <Image
        className={cn('size-16 rounded-lg', className)}
        width={512}
        height={512}
        src={src}
        alt={alt}
      />
    </Link>
  )
}
