import { doc, setDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './db'

export const markPatternMastered = async (uid, patternId) => {
  await setDoc(doc(db, 'users', uid, 'progress', patternId), {
    masteredAt: serverTimestamp()
  })
}

export const fetchMasteredPatterns = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'progress'))
  const progressMap = new Map()
  snap.docs.forEach(d => {
    const data = d.data()
    const date = data.masteredAt ? data.masteredAt.toDate() : new Date()
    progressMap.set(d.id, date)
  })
  return progressMap
}
