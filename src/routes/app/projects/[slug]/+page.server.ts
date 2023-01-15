import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect, type Actions } from "@sveltejs/kit";
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
      id: project.id,
      description: project?.description,
      banner: project?.banner,
      tags: JSON.parse(project?.tags) || [],
      lists: lists || []
    }
  }

  throw error(404, errProject?.message)
}) satisfies PageServerLoad

export const actions: Actions = {
  newTask: async (event) => {
    const { request, params } = event
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' })
    }

    const data = await request.formData()
    const name = data.get("name")
    const description = data.get("description")
    const dueDate = data.get("date")
    const isPriority = data.get("priority")
    const list = data.get("list-id")
    const project = params.slug

    const { error } = await supabaseClient.from('tasks').insert({
      list,
      project,
      name,
      description,
      due_date: dueDate?.toString(),
      is_priority: isPriority,
      user_id: session.user.id,
      status: "other"
    })
    console.log(error)
  }
}
