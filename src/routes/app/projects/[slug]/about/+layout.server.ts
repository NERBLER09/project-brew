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

  const { project } = await event.parent()
  const project_name = project.project_name
  const description = project.description
  const id = project.id
  const banner = project.banner
  const project_members = project.project_members
  const team_name = project.team_name

  event.depends('project:about');

  const { data: userTeams } = await supabaseClient
    .from('teams')
    .select('*, team_members!inner(user_id)')
    .eq('team_members.user_id', session.user.id);

  if (project) {
    return {
      project: {
        project_name,
        id,
        banner,
        description,
        tags: project.tags ?? [],
        user_teams: userTeams ?? [],
        invited_people: project_members ?? []
      },
      team_name
    };
  }

  if (errProject) {
    redirect(303, '/app/projects/not-invited');
  }
}) satisfies LayoutServerLoad;
