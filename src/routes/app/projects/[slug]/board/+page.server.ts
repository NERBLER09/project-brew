import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  const params = event.params;
  const projectId = params.slug;

  event.depends('project:board');

  const { data: lists } = await supabaseClient
    .from('lists')
    .select()
    .eq('project', projectId)
    .order('position', { ascending: true });

  const { data: tasks } = await supabaseClient.from('tasks').select('*, sub_tasks(*)').eq('project', projectId);


  const { project } = await event.parent();

  if (lists) {
    return {
      lists: lists || [],
      project: {
        ...project,
        tasks: tasks ?? []
      }
    };
  }

  return error(404, 'Failed to fetch project board lists');
}) satisfies PageServerLoad;
