import { getAuth } from "firebase/app";
import { app } from "./firebase";

export const auth = getAuth(app);

// You can add your login, signup, and signout functions here
// e.g. export const loginUser = async (email, password) => { ... }