export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lists: {
        Row: {
          id: number
          list_name: string
          project: number
          status: string
          user_id: string
        }
        Insert: {
          id?: number
          list_name: string
          project: number
          status?: string
          user_id: string
        }
        Update: {
          id?: number
          list_name?: string
          project?: number
          status?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banner: string | null
          bio: string | null
          email: string
          id: string
          invited_projects: number[] | null
          location: string | null
          name: string
          team_members: string[] | null
        }
        Insert: {
          avatar_url?: string | null
          banner?: string | null
          bio?: string | null
          email: string
          id: string
          invited_projects?: number[] | null
          location?: string | null
          name: string
          team_members?: string[] | null
        }
        Update: {
          avatar_url?: string | null
          banner?: string | null
          bio?: string | null
          email?: string
          id?: string
          invited_projects?: number[] | null
          location?: string | null
          name?: string
          team_members?: string[] | null
        }
      }
      projects: {
        Row: {
          banner: string | null
          description: string | null
          id: number
          invited_people: string[] | null
          pinned: boolean
          project_name: string
          tags: string | null
          user_id: string
        }
        Insert: {
          banner?: string | null
          description?: string | null
          id?: number
          invited_people?: string[] | null
          pinned?: boolean
          project_name?: string
          tags?: string | null
          user_id: string
        }
        Update: {
          banner?: string | null
          description?: string | null
          id?: number
          invited_people?: string[] | null
          pinned?: boolean
          project_name?: string
          tags?: string | null
          user_id?: string
        }
      }
      tasks: {
        Row: {
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
        Insert: {
          assigned?: string[] | null
          description?: string | null
          due_date?: string | null
          id?: number
          is_priority?: boolean
          list: number
          name?: string
          project: number
          status: string
          tags?: string[] | null
          user_id: string
        }
        Update: {
          assigned?: string[] | null
          description?: string | null
          due_date?: string | null
          id?: number
          is_priority?: boolean
          list?: number
          name?: string
          project?: number
          status?: string
          tags?: string[] | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
