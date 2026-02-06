export type SelectSearchbarProps = {
  placeholder: string
  className?: string
  queryParam: string
  items: Array<{
    label: string
    value: string
  }>
}
