import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
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

  const { data: invited_people } = await supabaseClient
    .from('project_members')
    .select()
    .eq('project', projectId);

  const { data: userTeams } = await supabaseClient
    .from('teams')
    .select('*, team_members!inner(user_id)')
    .eq('team_members.user_id', session.user.id);

  if (project) {
    return {
      project: {
        ...project,
        tags: JSON.parse(project?.tags ?? '[]') ?? [],
        user_teams: userTeams ?? [],
        invited_people: invited_people ?? []
      }
    };
  }

  if (errProject) {
    throw redirect(303, '/app/projects/not-invited');
  }
}) satisfies LayoutServerLoad;
