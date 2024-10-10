import { ECAS } from "@/ecas/ecas.config"

export function ecaExists(domain: string) {
  const ECA_EXISTS = ECAS.some((eca) => eca.id === domain)
  return ECA_EXISTS
}
