const rarityValues = {
  basic: 1,
  rare: 2,
  unique: 3
}

// Sort by rarity
export function sortByRarity (a, b) {
  // Use the rarityValues for comparison
  console.log(rarityValues[a.rarity.toLowerCase()], rarityValues[b.rarity.toLowerCase()])
  return rarityValues[a.rarity.toLowerCase()] - rarityValues[b.rarity.toLowerCase()]
}

export function sortByCollection (a, b) {
  const collectionA = a.collection.toUpperCase()
  const collectionB = b.collection.toUpperCase()

  if (collectionA < collectionB) return -1
  if (collectionA > collectionB) return 1
  return 0 // equal collections
}

export function sortByRarityAndType (a, b) {
  // First compare the rarity
  const rarityComparison = rarityValues[a.rarity.toLowerCase()] - rarityValues[b.rarity.toLowerCase()]

  // If the rarities are equal, then compare the type
  if (rarityComparison === 0) {
    const typeA = a.type.toUpperCase()
    const typeB = b.type.toUpperCase()

    if (typeA < typeB) return -1
    if (typeA > typeB) return 1
    return 0 // equal types
  } else {
    return rarityComparison
  }
}
// Now, to sort your collection by rarity, you can simply call this function as:
