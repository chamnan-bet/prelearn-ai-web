import { getFirestore } from 'firebase/firestore'
import { app } from './firebase'

export const db = getFirestore(app)

// Add functions to read/write questions or user data here
// e.g. export const fetchQuestions = async () => { ... }