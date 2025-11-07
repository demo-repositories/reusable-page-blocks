export function pluralize(number: number, singular: string, plural?: string) {
  return number === 1 ? singular : (plural ?? `${singular}s`)
}

export function enumerate(
  number: number | undefined = 0,
  singular: string,
  plural: string = `${singular}s`
) {
  return `${number} ${number === 1 ? singular : plural}`
}
