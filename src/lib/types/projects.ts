export interface User {
  avatar_url: string | null
  banner: string | null
  bio: string | null
  email: string
  id: string
  invited_projects: number[] | null
  location: string | null
  name: string
  team_members: string[] | null
  role: string | null
}

export interface List {
  id: number
  list_name: string
  project: number
  status: string
  user_id: string
}

export interface Projects {
  banner?: string | null
  description?: string | null
  id?: number
  invited_people?: string[] | null
  pinned?: boolean
  project_name?: string
  tags?: string | null
  user_id?: string
}

export interface Task {
  assigned: string[] | null
  description: string | null
  due_date: string | null
  id: number
  is_priority: boolean
  list: number
  name: string
  project: number
  status: string
  tags: string[] | null
  user_id: string
}

export interface NotficationSettings {
  push: {
    dueTask: boolean,
    invited: boolean,
    timerUp: boolean,
    assigned: boolean
  },
  email: {
    dueTask: boolean,
    invited: boolean,
    assigned: boolean
  }
}
