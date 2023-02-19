import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  default: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const data = await event.request.formData()
    const email = data.get("email") as string
    const password = data.get("password") as string

    const { error: err } = await supabaseClient.auth.signInWithPassword({ email, password })
    if (err) {
      return fail(403, { message: err.message, fail: true })
    }
    else {
      throw redirect(303, "/app/home")
    }
  }
} satisfies Actions
