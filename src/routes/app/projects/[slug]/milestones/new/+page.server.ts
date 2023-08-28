import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { supabaseClient } = await getSupabase(event);
  const projectId = event.params.slug;

  const { data: invited } = await supabaseClient
    .from('project_members')
    .select()
    .eq('project', projectId);
  const invitedUserIds = invited?.map((item) => item.user_id) ?? [];

  const { data: users } = await supabaseClient
    .from('profiles')
    .select()
    .in('id', [...invitedUserIds]);
  if (users) {
    return {
      test: 'test',
      project: {
        invited: {
          users
        }
      }
    };
  }
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
    const start_date = data.get('start-date') as string;
    const end_date = data.get('end-date') as string;
    const leader = data.get('lead') as string;

    const { data: milestone, error: err } = await supabaseClient
      .from('milestones')
      .insert({
        name,
        description,
        start_date,
        end_date,
        project: parseInt(params.slug),
        owner: session.user.id,
        leader: leader ? leader : null
      })
      .select()
      .limit(1)
      .single();

    if (!err) {
      return { success: true, milestone: milestone.id };
    } else {
      return fail(400, { failCreate: true, errMsg: err.message });
    }
  }
} satisfies Actions;
