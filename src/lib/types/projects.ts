import type { Json } from './supabase';

export interface User {
	avatar_url: string | null;
	banner: string | null;
	bio: string | null;
	email: string;
	id: string;
	invited_projects: number[] | null;
	location: string | null;
	name: string;
	team_members: string[] | null;
	role: string | null;
	notifcations_settings: NotficationSettings;
}

export interface List {
	id: number;
	list_name: string;
	project: number;
	status: string;
	user_id: string;
	position: number;
}

export interface Projects {
	banner: string | null;
	default_view: string;
	description: string | null;
	id: number;
	invited_people: string[] | null;
	pinned: boolean;
	project_name: string;
	tags: string | null;
	team: string | null;
	user_id: string;
}

export interface Task {
	assigned: string[] | null;
	description: string | null;
	due_date: string | null;
	id: number;
	is_priority: boolean;
	list: number;
	milestone: string | null;
	name: string;
	priority_level: string | null;
	project: number;
	status: string;
	tags: string[] | null;
	user_id: string;
}

export interface NotficationSettings {
	push: {
		dueTask: boolean;
		invited: boolean;
		timerUp: boolean;
		assigned: boolean;
	};
	email: {
		dueTask: boolean;
		invited: boolean;
		assigned: boolean;
	};
}

export interface Notification {
	id: string;
	message: string;
	sent: string | null;
	sentBy: User | null;
	target_user: string;
	type: string;
	title: string | null;
}

export interface TeamMembers {
	id: string;
	role: string;
	team: string;
	user_id: string;
}

export interface Teams {
	banner: string | null;
	dashboard_settings: Json;
	description: string | null;
	id: string;
	name: string;
}

export interface ProjectMember {
	id: string;
	project: number;
	role: string;
	user_id: string;
}

export interface SubTask {
	completed: boolean;
	id: string;
	list: number;
	name: string;
	project: number;
	task: number;

}
