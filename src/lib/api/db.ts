import { supabase } from "$lib/supabase"

const getUserProjects = async (uuid: string | undefined) => {
  const { data, error } = await supabase.from("projects").select().eq("owner", uuid)
  if (error) {
    return new Error(`Failed to fetch user projects: ${error.message}`)
  }
  return data
}

const getProjectLists = async (project_id: string) => {
  const { data, error } = await supabase.from("list").select().eq("project", project_id)
  if (error) {
    return new Error(`Failed to fetch list: ${error.message}`)
  }
  return data
}

const getListTasks = async (project_id: string, list_id: string) => {
  const { data, error } = await supabase.from("tasks").select().eq("project", project_id).eq("list", list_id)
  if (error) {
    return new Error(`Failed to fetch tasks: ${error.message}`)
  }
  return data
}

export {
  getUserProjects,
  getProjectLists,
  getListTasks
}
