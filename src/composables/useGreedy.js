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

  // Sort descending by marks at risk — greedily pick the highest impact first
  return [...unmastered].sort(
    (a, b) => parseMarks(b.marks) - parseMarks(a.marks)
  )[0]
}
