export function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function capitalizeLetters(string: string) {
  return string.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
