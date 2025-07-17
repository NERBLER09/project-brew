import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    redirect(303, '/');
  }

  const params = event.params;
  const projectId = params.slug;

  event.depends("project:pages")

  const { data: pages, error: err } = await supabaseClient.from('pages')
    .select("*")
    .eq('project', projectId);

  return {
    pages
  }
}) satisfies LayoutServerLoad;
