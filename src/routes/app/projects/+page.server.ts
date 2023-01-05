import { supabase } from "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  // const { data, error: err } = await supabase.from('projects').select().eq('owner', session.user.id);
  const { data, error: err } = await supabase.from('projects').select().eq('user_id', session.user.id);
  if (data) {
    return { projects: data }
  }

  throw error(parseInt(err.code), err.message)
}) satisfies PageServerLoad
