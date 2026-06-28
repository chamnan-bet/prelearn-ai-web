import { ref } from 'vue'
import { fetchMasteredPatterns, markPatternMastered } from '@/services/progress'

// Module-level — shared across all components (same pattern as useAuth)
const masteredIds = ref(new Set())
const progressDates = ref(new Map())

export function useProgress() {
  const loadProgress = async (uid) => {
    if (!uid) {
      masteredIds.value = new Set()
      progressDates.value = new Map()
      return
    }
    const progressMap = await fetchMasteredPatterns(uid)
    masteredIds.value = new Set(progressMap.keys())
    progressDates.value = progressMap
  }

  const markMastered = async (uid, patternId) => {
    if (!uid) return
    await markPatternMastered(uid, patternId)
    // Optimistic update — no need to re-fetch
    masteredIds.value = new Set([...masteredIds.value, patternId])
    
    const newDates = new Map(progressDates.value)
    newDates.set(patternId, new Date())
    progressDates.value = newDates
  }

  return { masteredIds, progressDates, loadProgress, markMastered }
}
