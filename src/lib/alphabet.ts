import { writable } from "svelte/store"

export let correctLetters = writable<string[]>([])
export let includedLetters = writable<string[]>([])
export let notIncludedLetters = writable<string[]>([])

export const alphabet: string[][] = [ 
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], 
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"], 
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"] 
] 