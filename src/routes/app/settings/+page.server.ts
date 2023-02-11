import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, type Actions } from "@sveltejs/kit";

export const actions = {
  account: async (event) => {
    const { request } = event;
    const { session, supabaseClient } = await getSupabase(event);
    if (!session) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' });
    }

    const data = await request.formData()
    const name = data.get("name") as string
    const location = data.get("location") as string
    const bio = data.get("bio") as string
    const file = data.get("profile") as File;

    let avatar_url = ""

    if (file.size !== 0) {
      const { error: coverErr } = await supabaseClient
        .storage
        .from("project-covers")
        .upload(`${session.user.id}/avatar.png`, file, {
          cacheControl: '3600',
          upsert: false
        })
      const { data: url } = supabaseClient.storage.from("project-covers").getPublicUrl(`${session.user.id}/avatar.png`)
      avatar_url = url.publicUrl
    }

    const { error: err } = await supabaseClient.from("profiles").update({ name, location, bio, avatar_url }).eq("id", session.user.id)
    if (err) {
      throw error(403, err.message)
    }
  }
} satisfies Actions
