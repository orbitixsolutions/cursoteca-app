import { ECAS_CONFIG } from '@/lib/ecas.config'

export function getEcaData(domain: string | undefined) {
  if (!domain) return undefined
  const DOMAIN = decodeURIComponent(domain)

  const ECA_DATA = ECAS_CONFIG.find((e) => e.id === DOMAIN)
  return ECA_DATA
}
