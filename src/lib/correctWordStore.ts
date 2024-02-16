import { writable } from 'svelte/store'

export let correctWord = writable<string>('Svelte')
export let userGuessWord = writable<string[]>([])