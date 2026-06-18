import { getDatabase } from "firebase/database";
import { app } from "./firebase";

export const db = getDatabase(app);

// Add functions to read/write questions or AI warnings here
// e.g. export const fetchQuestions = async () => { ... }