export function sortByType<T extends { type: string; title?: string }>(
  a: T,
  b: T
) {
  const nameA = a.title ?? a.type
  const nameB = b.title ?? b.type
  return nameA.localeCompare(nameB)
}
