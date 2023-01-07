import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  const { data, error: err } = await supabaseClient.from('projects').select().eq('user_id', session.user.id);
  if (data) {
    const pinned = data.filter(value => value.pinned)
    return { all: data, pinned }
  }

  throw error(404, err.message)
}) satisfies PageServerLoad

export const actions: Actions = {
  new: async (event) => {
    const { request } = event
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' })
    }

    const data = await request.formData()
    const description = data.get("description")
    const project_name = data.get("name")
    const { error: err } = await supabaseClient.from("projects").insert({ description, project_name, user_id: session.user.id })

    if (!error) {
      throw redirect(301, "Project created successfully")
    }
  }
}
