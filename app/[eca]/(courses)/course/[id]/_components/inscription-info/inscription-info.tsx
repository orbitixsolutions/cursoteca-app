'use client'

import { useEffect } from 'react'
import { InscriptionProps } from '@/app/[eca]/(courses)/course/[id]/_types'
import { InscriptionForm } from '@/app/[eca]/(courses)/course/[id]/_components/inscription-form'
import { InscriptionStatus } from '@/app/[eca]/(courses)/course/[id]/_components/inscription-status'
import { useInscription } from '@/app/[eca]/(courses)/course/[id]/provider'

export function InscriptionInfo(props: InscriptionProps) {
  const { data } = props

  const { documentId, saveDocumentId } = useInscription()

  const STUDENT = documentId !== ''
  const API_URL = `/api/v0/admin/students`

  useEffect(() => {
    if (STUDENT) {
      fetch(`${API_URL}/${documentId}`).then((res) =>
        res.json().then((DATA) => {
          if (!DATA) return
          saveDocumentId(DATA.documentId)
        })
      )
    }
  }, [documentId, STUDENT, API_URL, saveDocumentId])

  return (
    <>{STUDENT ? <InscriptionStatus data={data} /> : <InscriptionForm />}</>
  )
}
