export function getEcaName(domain: string | undefined) {
  if (!domain) return { DOMAIN: 'Indefinido', ECA_NAME: 'Indefinido' }

  const DOMAIN = decodeURIComponent(domain)
  const ECA_NAME = capitalizeLetters(DOMAIN.split('-').join(' '))

  return { DOMAIN, ECA_NAME }
}

export function capitalizeLetters(string: string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase())
}
