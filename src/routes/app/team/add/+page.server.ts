import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    redirect(303, '/');
  }

  event.depends('app:team-members');

  const { data: users, error: err } = await supabaseClient
    .from('profiles')
    .select()
    .neq("id", session.user.id)

  if (users) {
    return {
      users
    };
  }

  error(404, err?.message);
}) satisfies PageServerLoad;
