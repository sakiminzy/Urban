export function mergeItemsById(primaryItems, fallbackItems) {
  const mergedItems = new Map()

  fallbackItems.forEach((item) => {
    mergedItems.set(item.id, item)
  })

  primaryItems.forEach((item) => {
    mergedItems.set(item.id, item)
  })

  return Array.from(mergedItems.values())
}
