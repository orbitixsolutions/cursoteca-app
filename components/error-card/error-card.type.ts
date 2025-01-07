export type ErrorCardProps = {
  message: string
  title?: string
  delay?: number
  status: boolean
  onChange: React.Dispatch<
    React.SetStateAction<{
      message: string
      active: boolean
    }>
  >
}
