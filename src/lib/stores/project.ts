import type { User, Projects, Teams } from '$lib/types/projects';
import { writable, type Writable } from 'svelte/store';

export const currentProject: Writable<Projects> = writable();

export type SortOption = 'a-z' | 'z-a';
export const projectSort: Writable<SortOption> = writable('a-z');

export const recentlyEdited: Writable<Projects[]> = writable([]);

export const tasksCompletedThisDay: Writable<number> = writable(0);

export const invitedTeamMembers = writable<User[] | null>();
export const userTeams = writable<Teams[]>();

export const searchQuery = writable<string>();
export const dateFilter = writable<'soon' | 'today' | 'overdue' | 'unset' | null>(null);
export const priorityFilter = writable<'high' | 'med' | 'low' | 'none' | 'unset' | null>();
export const filterTags = writable<string[]>();
export const showProjectAside = writable(true);

export interface SortOptions {
	date: 'ascending' | 'descending' | null;
	priority: 'ascending' | 'descending' | null;
	status: 'ascending' | 'descending' | null;
}
export const sortOptions = writable<SortOptions>({ date: null, priority: null, status: null });

export interface MilestoneFilter {
	name: string;
	id: string;
}
export const milestoneFilter = writable<MilestoneFilter | null>();
