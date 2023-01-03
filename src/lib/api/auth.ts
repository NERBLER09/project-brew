// Includes commonly used and related functions for user auth

import { supabase } from "$lib/supabase"

const handleEmailPasswordLogin = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(`Failed to login user: ${error.message}`)
}

export {
  handleEmailPasswordLogin
}
