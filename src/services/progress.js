import { doc, setDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './db'

export const markPatternMastered = async (uid, patternId) => {
  await setDoc(doc(db, 'users', uid, 'progress', patternId), {
    masteredAt: serverTimestamp()
  })
}

export const fetchMasteredPatterns = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'progress'))
  return new Set(snap.docs.map(d => d.id))
}
