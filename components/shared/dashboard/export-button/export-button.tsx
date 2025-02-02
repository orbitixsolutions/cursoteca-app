'use client'

import * as XLSX from 'xlsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { downloadCvsFile } from '@/helpers/download-csv'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { ExportButtonProps } from '@/components/shared/dashboard/export-button/export-button.type'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { getCategoryName } from '@/helpers/get-course-category'
import { getAge, getDateOfBorn } from '@/helpers/get-date-of-born'
import { Download } from 'lucide-react'

export function ExportButton(props: ExportButtonProps) {
  const { data, name } = props
  const NO_ITEMS = data.length === 0

  const tableHeaderData = [
    'Cursos',
    'Categorias',
    'Nombres',
    'Telefonos',
    'Correos',
    'Fecha de Nacimiento',
    'Edades',
    'Documentos',
    'Provincias',
    'Nivel Educacional',
  ]

  const dataTable = useMemo(() => {
    return data.map(({ inscription, course }) => ({
      curso: course.title,
      categoria: getCategoryName(course.category),
      nombre: `${inscription.firstNames} ${inscription.lastNames}`,
      telefono: inscription.phoneNumber,
      correo: inscription.email,
      dia_nacimiento: getDateOfBorn(inscription.dateOfBorn),
      edad: getAge(inscription.dateOfBorn),
      documento: inscription.documentId,
      provincia: inscription.province,
      nivel_educativo: getEducationalLevelName(inscription.educationalLevel),
    }))
  }, [data])

  const handleExportCsvTable = () => {
    if (NO_ITEMS) return toast.error('No hay datos para exportar.')

    const csv = convertArrayToCSV(dataTable, { header: tableHeaderData })
    downloadCvsFile({ csv, name })
  }

  const handleExportExcelTable = () => {
    if (data.length === 0) return toast.error('No hay datos para exportar.')
    const NAME = `${name}.xlsx`

    const worksheet = XLSX.utils.json_to_sheet(dataTable)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, `${name} - Hoja 1`)
    XLSX.writeFile(workbook, NAME)
  }

  if (NO_ITEMS) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Exportar tabla</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Descargar para:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportCsvTable}>
          <Download />
          <p>Descargar (CSV)</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcelTable}>
          <Download />
          <p>Descargar (Excel)</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// export function ExportExcelButton(props: ExportButtonProps) {
//   const { data } = props

//   const dataTable = useMemo(() => {
//     return data.map(({ inscription, course }) => ({
//       curso: course.title,
//       categoria: getCategoryName(course.category),
//       nombre: `${inscription.firstNames} ${inscription.lastNames}`,
//       telefono: inscription.phoneNumber,
//       correo: inscription.email,
//       dia_nacimiento: getDateOfBorn(inscription.dateOfBorn),
//       edad: getAge(inscription.dateOfBorn),
//       documento: inscription.documentId,
//       provincia: inscription.province,
//       nivel_educativo: getEducationalLevelName(inscription.educationalLevel),
//     }))
//   }, [data])

//   const handleExportTable = () => {
//     if (data.length === 0) return toast.error('No hay datos para exportar.')

//     const worksheet = XLSX.utils.json_to_sheet(dataTable)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')
//     XLSX.writeFile(workbook, 'Alumnos.xlsx')
//   }

//   return (
//     <div className='flex items-center gap-4 mt-8'>
//       <Button onClick={handleExportTable}>Exportar Tabla</Button>
//     </div>
//   )
// }
