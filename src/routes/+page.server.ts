import { userId } from "$lib/stores/user";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session } = await getSupabase(event)
  if (session) {
    userId.set(session.user.id)
    throw redirect(302, "/app/home")
  }

  return {}
}) satisfies PageServerLoad 
