import { writable, type Writable } from "svelte/store";

export const currentProject: Writable<any> = writable()