import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  let params = event.params;
  const projectId = params.slug;

  event.depends('project:about');

  // Grabs project info
  const { data: project, error: errProject } = await supabaseClient
    .from('projects')
    .select()
    .eq('id', projectId)
    .limit(1)
    .single();

  const { data: userTeams } = await supabaseClient
    .from('teams')
    .select('*, team_members!inner(user_id)')
    .eq('team_members.user_id', session.user.id);

  if (project) {
    return {
      project: {
        ...project,
        tags: JSON.parse(project?.tags ?? '[]') ?? [],
        user_teams: userTeams ?? []
      }
    };
  }

  if (errProject) {
    throw redirect(303, '/app/projects/not-invited');
  }
}) satisfies LayoutServerLoad;
