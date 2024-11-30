type downloadCvsFileProps = {
  csv: string
  name: string
}

export function downloadCvsFile(props: downloadCvsFileProps) {
  const { csv, name } = props

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = (link.href = URL.createObjectURL(blob))

  link.setAttribute('href', url)
  link.setAttribute('download', `${name}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
