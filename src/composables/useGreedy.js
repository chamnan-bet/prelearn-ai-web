// Greedy algorithm: always recommend the unmastered pattern with the highest marks at risk.
// Time complexity O(n log n) — n = unmastered patterns (≤ 30).

const parseMarks = (str) => {
  const m = str?.match(/(\d+)/)
  return m ? parseInt(m[1]) : 1
}

/**
 * @param {Array}  patterns   - full pattern list
 * @param {Set}    masteredIds - set of pattern IDs the user has mastered
 * @returns the single best pattern to study next, or null if all mastered
 */
export function greedyNextPattern(patterns, masteredIds) {
  const unmastered = patterns.filter(p => !masteredIds.has(p.id))
  if (!unmastered.length) return null

  return [...unmastered].sort((a, b) => {
    // Primary: higher marks at risk → study first
    const marksDiff = parseMarks(b.marks) - parseMarks(a.marks)
    if (marksDiff !== 0) return marksDiff
    // Tiebreaker: fewer global masteries → still hard for most users → higher priority
    // masteredCount comes from Firestore when available, otherwise 0
    return (a.masteredCount ?? 0) - (b.masteredCount ?? 0)
  })[0]
}
