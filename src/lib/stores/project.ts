import type { User, Projects, Teams } from '$lib/types/projects';
import { writable, type Writable } from 'svelte/store';

export const currentProject: Writable<any> = writable();

export type SortOption = 'a-z' | 'z-a';
export const projectSort: Writable<SortOption> = writable('a-z');

export const recentlyEdited: Writable<Projects[]> = writable([]);

export const tasksCompletedThisDay: Writable<number> = writable(0);

export const invitedTeamMembers = writable<User[] | null>();
export const userTeams = writable<Teams[]>();

export const searchQuery = writable<string>();
export let dateFilter = writable<'soon' | 'today' | 'overdue' | 'unset' | null>(null);
export let filterTags = writable<string[]>();
