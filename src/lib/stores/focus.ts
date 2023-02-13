import type { Projects } from "$lib/types/projects";
import { writable } from "svelte/store";

export const focusMinutes = writable(0)

export const focusProject = writable<Projects | null>(null)
