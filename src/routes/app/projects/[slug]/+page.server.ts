import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  let params = event.params

  const projectId = params.slug

  // Grabs project info 
  const { data: project, error: errProject } = await supabaseClient.from('projects').select().eq('user_id', session.user.id).eq("id", projectId).limit(1).single()
  const { data: lists } = await supabaseClient.from("lists").select().eq("project", projectId)
  if (project?.user_id !== session.user.id) throw redirect(301, "/app/projects/not-invited")
  if (project) {
    return {
      name: project?.project_name,
      description: project?.description,
      banner: project?.banner,
      tags: JSON.parse(project?.tags) || [],
      lists: lists || []
    }
  }

  throw error(404, errProject?.message)
}) satisfies PageServerLoad
