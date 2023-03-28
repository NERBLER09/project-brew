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
          position: number
          project: number
          status: string
          user_id: string
        }
        Insert: {
          id?: number
          list_name: string
          position?: number
          project: number
          status?: string
          user_id: string
        }
        Update: {
          id?: number
          list_name?: string
          position?: number
          project?: number
          status?: string
          user_id?: string
        }
      }
      milestones: {
        Row: {
          description: string | null
          end_date: string | null
          id: string
          name: string
          owner: string | null
          project: number
          start_date: string
        }
        Insert: {
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          owner?: string | null
          project: number
          start_date: string
        }
        Update: {
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          owner?: string | null
          project?: number
          start_date?: string
        }
      }
      notifications: {
        Row: {
          id: string
          message: string
          sent: string | null
          sentBy: Json | null
          target_user: string
          title: string | null
          type: string
        }
        Insert: {
          id?: string
          message: string
          sent?: string | null
          sentBy?: Json | null
          target_user: string
          title?: string | null
          type?: string
        }
        Update: {
          id?: string
          message?: string
          sent?: string | null
          sentBy?: Json | null
          target_user?: string
          title?: string | null
          type?: string
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
          notifcations_settings: Json
          role: string | null
          team_members: string[] | null
          your_activity: Json[] | null
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
          notifcations_settings?: Json
          role?: string | null
          team_members?: string[] | null
          your_activity?: Json[] | null
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
          notifcations_settings?: Json
          role?: string | null
          team_members?: string[] | null
          your_activity?: Json[] | null
        }
      }
      project_members: {
        Row: {
          id: string
          project: number
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          project: number
          role?: string
          user_id: string
        }
        Update: {
          id?: string
          project?: number
          role?: string
          user_id?: string
        }
      }
      projects: {
        Row: {
          banner: string | null
          default_view: string
          description: string | null
          id: number
          invited_people: string[] | null
          pinned: boolean
          project_name: string
          tags: string | null
          team: string | null
          user_id: string
        }
        Insert: {
          banner?: string | null
          default_view?: string
          description?: string | null
          id?: number
          invited_people?: string[] | null
          pinned?: boolean
          project_name?: string
          tags?: string | null
          team?: string | null
          user_id: string
        }
        Update: {
          banner?: string | null
          default_view?: string
          description?: string | null
          id?: number
          invited_people?: string[] | null
          pinned?: boolean
          project_name?: string
          tags?: string | null
          team?: string | null
          user_id?: string
        }
      }
      roadmap: {
        Row: {
          assigned: string[] | null
          description: string | null
          id: string
          milestone: string
          name: string
          target: string
        }
        Insert: {
          assigned?: string[] | null
          description?: string | null
          id?: string
          milestone: string
          name: string
          target: string
        }
        Update: {
          assigned?: string[] | null
          description?: string | null
          id?: string
          milestone?: string
          name?: string
          target?: string
        }
      }
      sub_tasks: {
        Row: {
          completed: boolean
          id: string
          list: number
          name: string
          project: number
          task: number
        }
        Insert: {
          completed?: boolean
          id?: string
          list: number
          name: string
          project: number
          task: number
        }
        Update: {
          completed?: boolean
          id?: string
          list?: number
          name?: string
          project?: number
          task?: number
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
          milestone: string | null
          name: string
          priority_level: string | null
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
          milestone?: string | null
          name?: string
          priority_level?: string | null
          project: number
          status?: string
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
          milestone?: string | null
          name?: string
          priority_level?: string | null
          project?: number
          status?: string
          tags?: string[] | null
          user_id?: string
        }
      }
      team_members: {
        Row: {
          id: string
          role: string
          team: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          team: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          team?: string
          user_id?: string
        }
      }
      teams: {
        Row: {
          banner: string | null
          dashboard_settings: Json
          description: string | null
          id: string
          name: string
        }
        Insert: {
          banner?: string | null
          dashboard_settings?: Json
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          banner?: string | null
          dashboard_settings?: Json
          description?: string | null
          id?: string
          name?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
