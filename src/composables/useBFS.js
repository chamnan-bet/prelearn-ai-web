/**
 * BFS over the pattern graph starting from startId.
 *
 * How it works:
 *  1. Start at the current pattern (startId) — mark it visited
 *  2. Enqueue its neighbors with hop = 1
 *  3. For each item dequeued: if hop < maxHops, enqueue its unvisited neighbors
 *  4. Collect all visited IDs (except startId) → look them up in allPatterns
 *
 * At maxHops=1 this is simply the direct neighbors.
 * At maxHops=2 it also includes neighbors-of-neighbors.
 *
 * Time complexity: O(V + E) — V=patterns (≤30), E=edges (≤90). Always instant.
 *
 * @param {string} startId      - pattern ID to start from
 * @param {object} graph        - adjacency list  { p001: ['p002', 'p003'], ... }
 * @param {Array}  allPatterns  - full pattern array (to look up objects by ID)
 * @param {number} maxHops      - how many hops to explore (default 1)
 * @returns {Array} pattern objects reachable within maxHops
 */
export function bfsRelatedPatterns(startId, graph, allPatterns, maxHops = 1) {
  const visited = new Set([startId])
  const queue = [{ id: startId, hop: 0 }]
  const relatedIds = []

  while (queue.length) {
    const { id, hop } = queue.shift()
    if (hop >= maxHops) continue

    for (const neighborId of (graph[id] ?? [])) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId)
        relatedIds.push(neighborId)
        queue.push({ id: neighborId, hop: hop + 1 })
      }
    }
  }

  return allPatterns.filter(p => relatedIds.includes(p.id))
}
