import { userData } from "$lib/stores/user";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  event.depends("app:all-projects")

  const { data: projects, error: projectsErr } = await supabaseClient
    .from('projects')
    .select()
    .eq('user_id', session.user.id);


  const { data: user, error: err } = await supabaseClient.from('profiles').select().eq('id', session.user.id);
  if (user && !projectsErr) {
    if (user?.length === 0) throw redirect(303, '/welcome');

    userData.set(user[0])

    const pinned = projects.filter((value) => value.pinned);

    return {
      name: user[0]?.name,
      avatar_url: user[0].avatar_url,
      all: projects,
      pinned
    }
  }

  throw error(404, err?.message)
}) satisfies PageServerLoad
