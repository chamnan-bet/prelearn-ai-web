import {
  collection, doc, getDocs, getDoc,
  setDoc, updateDoc, query, orderBy, increment
} from 'firebase/firestore'
import { db } from './db'

export const fetchPatterns = async (subject) => {
  const q = query(
    collection(db, 'subjects', subject, 'patterns'),
    orderBy('order')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const fetchPatternById = async (subject, patternId) => {
  const snap = await getDoc(doc(db, 'subjects', subject, 'patterns', patternId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export const seedPatterns = async (subject, patterns) => {
  for (const pattern of patterns) {
    const { id, ...data } = pattern
    await setDoc(doc(db, 'subjects', subject, 'patterns', id), {
      ...data,
      masteredCount: 0
    })
  }
}

// Called whenever any user marks a pattern as mastered
export const incrementMasteredCount = async (subject, patternId) => {
  await updateDoc(doc(db, 'subjects', subject, 'patterns', patternId), {
    masteredCount: increment(1)
  })
}
