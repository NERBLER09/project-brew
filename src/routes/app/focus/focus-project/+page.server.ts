import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  event.depends("app:all-projects")

  const { data, error: err } = await supabaseClient
    .from('projects')
    .select()
    .eq('user_id', session.user.id);

  const { data: invited, error: err2 } = await supabaseClient
    .from("projects")
    .select()
    .contains("invited_people", [session.user.id]);

  if (data && invited) {
    const allProjects = [...data, ...invited]
    return { all: allProjects };
  }
  if (err) {
    throw error(404, err.message);
  }
}) satisfies PageServerLoad;


