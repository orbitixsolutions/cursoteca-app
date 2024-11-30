'use client'

import { convertArrayToCSV } from 'convert-array-to-csv'
import { downloadCvsFile } from '@/helpers/download-csv'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { ExportButtonProps } from '@/components/shared/dashboard/export-button/export-button.type'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { getCategoryName } from '@/helpers/get-course-category'
import { getAge, getDateOfBorn } from '@/helpers/get-date-of-born'

export function ExportButton(props: ExportButtonProps) {
  const { data } = props

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

  const handleExportTable = () => {
    if (data.length === 0) return toast.error('No hay datos para exportar.')

    const csv = convertArrayToCSV(dataTable, { header: tableHeaderData })
    downloadCvsFile({ csv, name: 'Inscriptos' })
  }

  return (
    <div className='flex items-center gap-4 mt-8'>
      <Button onClick={handleExportTable}>Exportar Tabla</Button>
    </div>
  )
}
