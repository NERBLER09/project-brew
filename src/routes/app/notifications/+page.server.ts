import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  event.depends("app:notifications")

  const { data: notfications, error: err } = await supabaseClient.from("notifications").select().eq("target_user", session.user.id)

  if (notfications) {
    return { notfications }
  }

  throw error(404, err.message)
}) satisfies PageServerLoad
