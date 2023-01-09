import type { LayoutServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  const { data: user, error: err } = await supabaseClient.from('profiles').select().eq('id', session.user.id).limit(1).single();
  if (user) {
    return {
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email,
      banner: user.banner,
      bio: user.bio
    }
  }

  throw error(404, err?.message)
}) satisfies LayoutServerLoad 
