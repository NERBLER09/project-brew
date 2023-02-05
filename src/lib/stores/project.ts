import type { Projects } from "$lib/types/projects";
import { parseInt } from "lodash";
import { writable, type Writable } from "svelte/store";

export const currentProject: Writable<any> = writable()

export type SortOption = "a-z" | "z-a"
export const projectSort: Writable<SortOption> = writable("a-z")

export const recentlyEdited: Writable<Projects[]> = writable([])

export const tasksCompletedThisDay: Writable<number> = writable(0)
