import type { User } from "$lib/types/projects"
import { writable, type Writable } from "svelte/store"

// Stores used outside the primary UI
const signUpEmail = writable("")

// Stores used inside the primary UI
const userSession = writable()
const userData: Writable<User> = writable()
const userId = writable()

export const invitedTeamMembers = writable<User[]>()

export let currentUsers: Writable<any> = writable()

export {
  signUpEmail,
  userSession,
  userData,
  userId
}
