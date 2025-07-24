import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    redirect(303, "/");
  }

  const { data, error: err } = await supabaseClient
    .from('projects')
    .select('*, project_members!inner(*), tasks(*)')
    .eq('project_members.user_id', session.user.id);

  if (data) {
    return { all: data }
  }

  error(404, err.message);

}) satisfies PageServerLoad
