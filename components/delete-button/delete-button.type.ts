export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  removeImage?: boolean
  onDelete: (
    itemId: string
  ) => Promise<{ message: string; status: boolean | number }>
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  removeImage?: boolean
  onDelete: (
    itemId: string
  ) => Promise<{ message: string; status: boolean | number }>
}
