import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  event.depends('milestone:open');

  const milestoneId = event.params.milestone;

  const { data: milestone, error: err } = await supabaseClient
    .from('milestones')
    .select()
    .eq('id', milestoneId)
    .limit(1)
    .single();

  const { data: tasks } = await supabaseClient.from('tasks').select().eq('milestone', milestoneId).eq("project", event.params.slug);

  if (!err) {
    return { milestone: { ...milestone, tasks: tasks ?? [] } };
  }
  throw error(404, `Failed to fetch milestone ${err.message}`);
}) satisfies PageServerLoad;
