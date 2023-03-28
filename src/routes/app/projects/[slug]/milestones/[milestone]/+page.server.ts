import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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

  const { data: tasks } = await supabaseClient
    .from('tasks')
    .select()
    .eq('milestone', milestoneId)
    .eq('project', event.params.slug);

  const { data: roadmap } = await supabaseClient
    .from('roadmap')
    .select()
    .eq('milestone', milestoneId);

  if (!err) {
    return { milestone: { ...milestone, tasks: tasks ?? [], roadmap: roadmap ?? [] } };
  }
  throw error(404, `Failed to fetch milestone ${err.message}`);
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const { request, params } = event;
    const { session, supabaseClient } = await getSupabase(event);
    if (!session) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' });
    }

    const data = await request.formData();
    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const target_date = data.get('target-date') as string;

    const { error: err } = await supabaseClient.from("roadmap").insert({ name, description, target: target_date, milestone: params.milestone })

    if (!err) {
      return { success: true };
    } else {
      return fail(400, { failCreate: true, errMsg: err.message });
    }

  }
} satisfies Actions
