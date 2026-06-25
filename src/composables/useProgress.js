import { ref } from 'vue'
import { fetchMasteredPatterns, markPatternMastered } from '@/services/progress'

// Module-level — shared across all components (same pattern as useAuth)
const masteredIds = ref(new Set())

export function useProgress() {
  const loadProgress = async (uid) => {
    if (!uid) { masteredIds.value = new Set(); return }
    masteredIds.value = await fetchMasteredPatterns(uid)
  }

  const markMastered = async (uid, patternId) => {
    if (!uid) return
    await markPatternMastered(uid, patternId)
    // Optimistic update — no need to re-fetch
    masteredIds.value = new Set([...masteredIds.value, patternId])
  }

  return { masteredIds, loadProgress, markMastered }
}
