import { writable, type Writable } from 'svelte/store'

export const navbarOpen: Writable<boolean> = writable(false)