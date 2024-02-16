<script lang="ts">
    import { alphabet, correctLetters, includedLetters, notIncludedLetters } from "$lib/alphabet"
    import { userGuessWord } from "$lib/correctWordStore"
    import { getContext } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

    $: validateBg = (letter: string) => {
        if ( $correctLetters.includes(letter) ) {
            return "bg-green-500"
        } else if ( $includedLetters.includes(letter) ) {
            return "bg-orange-500"
        } else if ( $notIncludedLetters.includes(letter) ) {
            return "bg-gray-500"
        } else {
            return "bg-transparent"
        }
    }

    const enterPressed = getContext('enterPressed')
    const backspacePressed = getContext('backspacePressed')
    const updateUserGuessWord = getContext('updateUserGuessWord')
    
    function handleButton(letter: string): MouseEventHandler<HTMLButtonElement> {
        if ( letter === 'DEL' ) {
            return () => {
                if (backspacePressed) {
                    backspacePressed()
                } else {
                    console.log('backspacePressed context está devolviendo null')
                }
            }
        } else if ( letter === 'ENTER' && $userGuessWord.length < 4 ) {
            return (e) => {
                if (enterPressed) {
                    enterPressed()
                } else {
                    console.log('enterPressed context está devolviendo null')
                }
            }
        } else if (letter !== 'DEL' && letter !== 'ENTER') {
            return () => {
                userGuessWord.update((value) => [...value, letter])
                updateUserGuessWord()
            }
        } else {
            return console.log("Algo va mal en el teclado de pantalla")
        }
    }

    $: console.log($userGuessWord.length)
</script>
<div class="mt-2">
    {#each alphabet as line}
        <div class="flex justify-center">
            {#each line as letter}
                <button class="text-white text-3xl font-bold {validateBg(letter)} border-2 border-white rounded-md m-1 p-1" on:click={handleButton(letter)}>{letter}</button>
            {/each}
        </div>
    {/each}
</div>