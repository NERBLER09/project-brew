import { supabase } from "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  const { data, error: err } = await supabase.from('projects').select().eq('owner', session.user.id);
  if (data) {
    const pinned = data.filter(value => value.pinned)
    return { all: data, pinned }
  }

  throw error(404, err.message)
}) satisfies PageServerLoad
