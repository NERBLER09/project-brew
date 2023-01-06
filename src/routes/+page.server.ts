import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session } = await getSupabase(event)
  if (session) {
    throw redirect(302, "/app/home")
  }

  return {}
}) satisfies PageServerLoad 
