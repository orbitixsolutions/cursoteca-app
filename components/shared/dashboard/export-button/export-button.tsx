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
import { getExactAge } from '@/helpers/get-date-of-born'
import { formatDateToString } from '@/helpers/get-current-date'
import { Download } from 'lucide-react'
import { getGenderName } from '@/helpers/get-gender'

export function ExportButton(props: ExportButtonProps) {
  const { data, name } = props
  const NO_ITEMS = data.length === 0

  const tableHeaderData = [
    'Cursos',
    'Categorias',
    'Nombres',
    'Apellidos',
    'Generos',
    'Telefonos',
    'Correos',
    'Fechas de Nacimiento',
    'Edades',
    'Documentos',
    'Departamentos',
    'Direcciones',
    'Nivel Educacional',
  ]

  const dataTable = useMemo(() => {
    return data.map(({ inscription, course }) => ({
      Curso: course.title,
      Categoria: getCategoryName(course.category),
      Nombres: inscription.firstNames,
      Apellidos: inscription.lastNames,
      Genero: getGenderName(inscription.gender),
      Telefono: inscription.phoneNumber,
      Correo: inscription.email,
      'Dia de Nacimiento': formatDateToString(inscription.dateOfBorn),
      Edad: getExactAge(inscription.dateOfBorn),
      Documento: inscription.documentId,
      Departamento: inscription.province,
      Direccion: inscription.address,
      'Nivel educativo': getEducationalLevelName(inscription.educationalLevel),
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
          <p>{`Descargar (CSV)`}</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcelTable}>
          <Download />
          <p>{`Descargar (Excel)`}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
