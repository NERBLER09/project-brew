import type { User } from './projects';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			lists: {
				Row: {
					id: number;
					list_name: string;
					project: number;
					status: string;
					user_id: string;
				};
				Insert: {
					id?: number;
					list_name: string;
					project: number;
					status?: string;
					user_id: string;
				};
				Update: {
					id?: number;
					list_name?: string;
					project?: number;
					status?: string;
					user_id?: string;
				};
			};
			notifications: {
				Row: {
					id: string;
					message: string;
					sent: string | null;
					sentBy: User | null;
					target_user: string;
					title: string | null;
				};
				Insert: {
					id?: string;
					message: string;
					sent?: string | null;
					sentBy?: Json | null;
					target_user: string;
					title?: string | null;
					type?: string;
				};
				Update: {
					id?: string;
					message?: string;
					sent?: string | null;
					sentBy?: Json | null;
					target_user?: string;
					title?: string | null;
					type?: string;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					banner: string | null;
					bio: string | null;
					email: string;
					id: string;
					invited_projects: number[] | null;
					location: string | null;
					name: string;
					notifcations_settings: Json;
					role: string | null;
					team_members: string[] | null;
					your_activity: Json[] | null;
				};
				Insert: {
					avatar_url?: string | null;
					banner?: string | null;
					bio?: string | null;
					email: string;
					id: string;
					invited_projects?: number[] | null;
					location?: string | null;
					name: string;
					notifcations_settings?: Json;
					role?: string | null;
					team_members?: string[] | null;
					your_activity?: Json[] | null;
				};
				Update: {
					avatar_url?: string | null;
					banner?: string | null;
					bio?: string | null;
					email?: string;
					id?: string;
					invited_projects?: number[] | null;
					location?: string | null;
					name?: string;
					notifcations_settings?: Json;
					role?: string | null;
					team_members?: string[] | null;
					your_activity?: Json[] | null;
				};
			};
			projects: {
				Row: {
					banner: string | null;
					description: string | null;
					id: number;
					invited_people: string[] | null;
					pinned: boolean;
					project_name: string;
					tags: string | null;
					team: string | null;
					user_id: string;
				};
				Insert: {
					banner?: string | null;
					description?: string | null;
					id?: number;
					invited_people?: string[] | null;
					pinned?: boolean;
					project_name?: string;
					tags?: string | null;
					team?: string | null;
					user_id: string;
				};
				Update: {
					banner?: string | null;
					description?: string | null;
					id?: number;
					invited_people?: string[] | null;
					pinned?: boolean;
					project_name?: string;
					tags?: string | null;
					team?: string | null;
					user_id?: string;
				};
			};
			tasks: {
				Row: {
					assigned: string[] | null;
					description: string | null;
					due_date: string | null;
					id: number;
					is_priority: boolean;
					list: number;
					name: string;
					project: number;
					status: string;
					tags: string[] | null;
					user_id: string;
				};
				Insert: {
					assigned?: string[] | null;
					description?: string | null;
					due_date?: string | null;
					id?: number;
					is_priority?: boolean;
					list: number;
					name?: string;
					project: number;
					status: string;
					tags?: string[] | null;
					user_id: string;
				};
				Update: {
					assigned?: string[] | null;
					description?: string | null;
					due_date?: string | null;
					id?: number;
					is_priority?: boolean;
					list?: number;
					name?: string;
					project?: number;
					status?: string;
					tags?: string[] | null;
					user_id?: string;
				};
			};
			team_members: {
				Row: {
					id: string;
					role: string;
					team: string;
					user_id: string;
				};
				Insert: {
					id?: string;
					role: string;
					team: string;
					user_id: string;
				};
				Update: {
					id?: string;
					role?: string;
					team?: string;
					user_id?: string;
				};
			};
			teams: {
				Row: {
					banner: string | null;
					dashboard_settings: Json;
					description: string | null;
					id: string;
					name: string;
				};
				Insert: {
					banner?: string | null;
					dashboard_settings?: Json;
					description?: string | null;
					id?: string;
					name: string;
				};
				Update: {
					banner?: string | null;
					dashboard_settings?: Json;
					description?: string | null;
					id?: string;
					name?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
