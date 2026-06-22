import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/auth'

// Module-level refs — shared across every component that calls useAuth()
const user = ref(null)
const authReady = ref(false)

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
  authReady.value = true
})

export function useAuth() {
  return { user, authReady }
}
