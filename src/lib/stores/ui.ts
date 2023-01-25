import { writable, type Writable } from "svelte/store";

export const showMobileNav = writable(true)
export const showMobileSettingsNav = writable(false)

export const showProjectsSort = writable(false)
export const showNewProjectPrompt = writable(false)
export const showAboutProjectPrompt: Writable<boolean> = writable(false)
