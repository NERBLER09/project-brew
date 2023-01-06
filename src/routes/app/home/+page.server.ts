import { userData } from "$lib/stores/user";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  const { data: user, error: err } = await supabaseClient.from('profiles').select().eq('id', session.user.id);
  if (user) {
    if (user?.length === 0) throw redirect(303, '/welcome');

    console.log(user)
    userData.set(user[0])

    return {
      name: user[0]?.name,
      avatar_url: user[0].avatar_url
    }
  }

  throw error(404, err?.message)
}) satisfies PageServerLoad
