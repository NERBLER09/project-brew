import type { LayoutServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  event.depends("app:data")

  const { data: notifications, error: err } = await supabaseClient.from('notifications').select().eq('target_user', session.user.id);
  if (notifications) {
    return {
      notifications
    }
  }

  throw error(404, err?.message)
}) satisfies LayoutServerLoad 
