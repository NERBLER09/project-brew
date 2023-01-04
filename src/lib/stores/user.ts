import { goto } from "$app/navigation"
import { supabase } from "$lib/supabase"
import { writable, type Writable } from "svelte/store"

// Stores used outside the primary UI
const signUpEmail = writable("")

// Stores used inside the primary UI
const userSession = writable()
const userData: Writable<any> = writable()
const userId = writable()

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case "SIGNED_IN":
      console.log("Welcome user")
      userSession.set(session)
      userId.set(session?.user.id)
      if (!location.pathname.includes("/app")) {
        goto("/app/home")
      }
      break
    case "SIGNED_OUT":
      console.log("Shutting down")
      data.subscription.unsubscribe()
      goto("/")
      break
    default:
      data.subscription.unsubscribe()
      goto("/")
      break
  }
})

export {
  signUpEmail,
  userSession,
  userData,
  userId
}
