import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  new: async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (!session) {
      redirect(303, '/');
    }

    const form = await event.request.formData();
    const name = form.get('name') as string;
    const description = form.get('description') as string;
    const cover = form.get('banner') as File;
    let cover_url = '';

    if (cover.size !== 0 && cover.size < 5000000) {
      const { error: bannerErr } = await supabaseClient.storage
        .from('teams')
        .upload(`${session.user.id}/${name}.png`, cover, {
          cacheControl: '3600',
          upsert: true
        });
      if (bannerErr) {
        return fail(400, { message: `Failed to upload banner: ${bannerErr}` });
      }

      const { data: url } = supabaseClient.storage
        .from('teams')
        .getPublicUrl(`${session.user.id}/${name}.png`);
      cover_url = url.publicUrl;
    } else if (cover.size !== 0 && cover.size > 5000000)
      return fail(400, { message: 'Cover file to large. Must be under 5mb in size.' });

    const { data: team, error: createErr } = await supabaseClient
      .from('teams')
      .insert({ name, description: description ?? '', banner: cover_url })
      .select()
      .limit(1)
      .single();

    if (createErr) {
      return fail(400, { message: `Failed to create team: ${createErr.message}` });
    }
    await supabaseClient
      .from('team_members')
      .insert({ role: 'owner', user_id: session.user.id, team: team.id });

    return { success: true, team_id: team.id };
  }
} satisfies Actions;
