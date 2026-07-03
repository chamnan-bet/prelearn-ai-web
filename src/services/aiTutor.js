import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase'

const askAiTutorFn = httpsCallable(functions, 'askAiTutor')

export async function askAiTutor({ question, patternContext, history }) {
  const { data } = await askAiTutorFn({ question, patternContext, history })
  return data.reply
}
