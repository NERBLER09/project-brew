import type { Teams } from '$lib/types/projects';
import { writable } from 'svelte/store';

export const currentTeam = writable<Teams>();
