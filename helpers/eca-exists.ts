import { ECAS_CONFIG } from "@/lib/ecas.config"

export function ecaExists(domain: string | undefined) {
  const ECA_EXISTS = ECAS_CONFIG.some((eca) => eca.id === domain)
  return ECA_EXISTS
}
