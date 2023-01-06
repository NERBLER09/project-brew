import { writable, type Writable } from "svelte/store"

// Stores used outside the primary UI
const signUpEmail = writable("")

// Stores used inside the primary UI
const userSession = writable()
const userData: Writable<any> = writable()
const userId = writable()

export {
  signUpEmail,
  userSession,
  userData,
  userId
}
