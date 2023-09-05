import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, type Actions } from '@sveltejs/kit';
import lodash from 'lodash';

export const actions: Actions = {
  default: async (event) => {
    const { request } = event;
    const { session, supabaseClient } = await getSupabase(event);
    if (!session) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' });
    }

    const data = await request.formData();
    const description = data.get('description') as string;
    const project_name = data.get('name') as string;
    const formTags = data.get('tags') as string;
    const tags = formTags?.split(',') || null;
    const cover = data.get('banner') as File;

    let coverURL = null;

    if (cover && cover.size < 5000000) {
      const ccName = lodash(project_name);

      const { error: coverErr } = await supabaseClient.storage
        .from('project-covers')
        .upload(`${session.user.id}/${ccName}.png`, cover, {
          cacheControl: '3600',
          upsert: true
        });

      if (coverErr) {
        return fail(400, { message: `Failed to upload cover: ${coverErr.message}` });
      }

      const { data: url } = supabaseClient.storage
        .from('project-covers')
        .getPublicUrl(`${session.user.id}/${ccName}.png`);
      coverURL = url.publicUrl;
    } else if (cover.size > 5000000) {
      return fail(400, { message: 'Cover is larger then 5mb' });
    }

    const { data: project, error: err } = await supabaseClient
      .from('projects')
      .insert({
        description: description ?? '',
        project_name,
        user_id: session.user.id,
        tags: tags ?? null,
        banner: coverURL
      })
      .select()
      .limit(1)
      .single();

    console.log(err);

    if (!err) {
      await supabaseClient.from('project_members').insert({
        user_id: session.user.id,
        role: 'owner',
        project: project.id
      });

      return { success: true, id: project.id };
    } else {
      return fail(400, { message: `Failed to create project: ${err.message}` });
    }
  }
};
