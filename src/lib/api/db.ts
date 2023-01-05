import { supabase } from "$lib/supabase"

const getUserProjects = async (uuid: string) => {
  const { data, error } = await supabase.from("projects").select().eq("owner", uuid)
  if (error) {
    return new Error(`Failed to fetch user projects: ${error.message}`)
  }
  return data
}

export {
  getUserProjects
}
