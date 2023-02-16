import type { Projects } from "$lib/types/projects";
import { writable } from "svelte/store";

export const focusMinutes = writable(0)

export const focusProject = writable<Projects | null>(null)

interface FocusOptions {
  minutes: number,
  seconds: number,
  blockedURLS: string[]
}
export const focusOptions = writable<FocusOptions>({ minutes: 25, seconds: 0, blockedURLS: [] })
