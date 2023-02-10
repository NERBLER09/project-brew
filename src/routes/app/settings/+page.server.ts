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

    const { error: err } = await supabaseClient.from("profiles").update({ name }).eq("id", session.user.id)
    if (err) {
      throw error(403, err.message)
    }
  }
} satisfies Actions
