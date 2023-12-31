import type { LayoutServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    redirect(303, "/");
  }

  event.depends("app:user-info")

  const { data: user, error: err } = await supabaseClient.from('profiles').select().eq('id', session.user.id).limit(1).single();
  if (user) {
    return {
      ...user
    }
  }

  error(404, err?.message);
}) satisfies LayoutServerLoad 
