/**
 * Dijkstra's algorithm — finds the optimal study order through the pattern graph.
 *
 * How it differs from Greedy:
 *   Greedy picks the single highest-risk pattern each time with no awareness of
 *   how patterns connect. Dijkstra finds the minimum-cost PATH through the graph,
 *   so connected high-risk patterns get pulled forward together.
 *
 * Cost function:
 *   cost(pattern) = 4 − marksAtRisk
 *   High marks at risk → low cost → Dijkstra visits it sooner.
 *   p001 (−3 marks) → cost 1   (visit early)
 *   p005 (−2 marks) → cost 2
 *   p014 (−1 mark)  → cost 3   (visit later)
 *
 * Edge relaxation:
 *   When Dijkstra visits pattern A, it checks A's neighbors in the graph.
 *   If dist[A] + cost(neighbor) < dist[neighbor], update dist[neighbor].
 *   This "pulls forward" patterns connected to high-risk patterns — unlike Greedy,
 *   topic clusters stay together in the study order.
 *
 * Time complexity: O(V²) with linear scan for min — fine for V ≤ 30.
 *
 * @param {Array}  patterns    - full pattern list (may include masteredCount from Firestore)
 * @param {Set}    masteredIds - patterns the user has already mastered
 * @param {object} graph       - adjacency list from patternGraph.js
 * @returns {Array} pattern objects in optimal study order
 */
export function dijkstraStudyPath(patterns, masteredIds, graph) {
  const parseMarks = (str) => {
    const m = str?.match(/(\d+)/)
    return m ? parseInt(m[1]) : 1
  }

  const unmastered = patterns.filter(p => !masteredIds.has(p.id))
  if (!unmastered.length) return []

  const patternMap = new Map(patterns.map(p => [p.id, p]))

  // Low cost = high priority (inverted marks at risk)
  const cost = (p) => 4 - parseMarks(p.marks)

  // Initialize: each unmastered pattern starts with its own direct cost
  const dist = new Map()
  for (const p of unmastered) {
    dist.set(p.id, cost(p))
  }

  const visited = new Set()
  const order = []

  while (order.length < unmastered.length) {
    // Pick unvisited node with minimum distance — priority queue via linear scan
    let minId = null
    let minDist = Infinity

    for (const [id, d] of dist) {
      if (!visited.has(id) && d < minDist) {
        minDist = d
        minId = id
      }
    }

    if (minId === null) break

    visited.add(minId)
    order.push(minId)

    // Relax edges — update neighbor distances if a cheaper path exists through minId
    for (const neighborId of (graph[minId] ?? [])) {
      if (visited.has(neighborId) || !dist.has(neighborId)) continue

      const neighbor = patternMap.get(neighborId)
      if (!neighbor) continue

      const relaxed = minDist + cost(neighbor)
      if (relaxed < dist.get(neighborId)) {
        dist.set(neighborId, relaxed)
      }
    }
  }

  return order.map(id => patternMap.get(id)).filter(Boolean)
}
