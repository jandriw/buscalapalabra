<script lang="ts">
    import Word from "../components/Word.svelte"
    import Keyboard from "../components/Keyboard.svelte"
    import { correctWords } from "$lib/correctWord"
    import { correctWord, userGuessWord } from "$lib/correctWordStore"
    import { correctLetters, includedLetters, notIncludedLetters } from "$lib/alphabet"
	import { onMount, setContext } from "svelte"

    type State = 'playing' | 'won' | 'lost'

    type CheckResult = {
        correctLetter: string[];
        includedLetter: string[];
        notIncludedLetter: string[];
    }

    let state: State = 'playing'
    let currentGuess: string[] = []
    let currentGuessIndex: number = 0
    let userGuesses: string[][] = []
    let lastWord: string = ''
    const voidWord: string[] = ["", "", "", "", ""]

    function resetGame(): undefined {
        //reset variables & state
        state = 'playing'
        currentGuess = []
        currentGuessIndex = 0
        userGuesses = []
        lastWord = ''

        //reset stores
        correctLetters.set([])
        includedLetters.set([])
        notIncludedLetters.set([])
        userGuessWord.set([])

        //New correct word
        updateCorrectWord()

    }

    function checkWord(): CheckResult {
        const correctLetter = new Set<string>()
        const includedLetter = new Set<string>()
        const notIncludedLetter = new Set<string>()

        for (let i = 0; i < 5; i++) {
            const checkLetter = $correctWord[i].toUpperCase()
            const tryLetter = lastWord[i]

            if (checkLetter === tryLetter) {
                correctLetter.add(tryLetter)
            } else if ($correctWord.toUpperCase().includes(tryLetter)) {
                includedLetter.add(tryLetter)
            } else {
                notIncludedLetter.add(tryLetter)
            }
        }

        return {
                correctLetter: Array.from(correctLetter),
                includedLetter: Array.from(includedLetter),
                notIncludedLetter: Array.from(notIncludedLetter)
        }
        
    }

    const handleKeydown = (e: KeyboardEvent) => {
        const {key} = e

        if (e.code === "Backspace") {
            backspacePressed()
        } else if (e.key.length === 1 && e.key.match(/[a-z]/i) && currentGuess.length < 5) {
            let letter = e.key.toUpperCase()
            currentGuess = [...currentGuess, letter]
            userGuessWord.update(() => currentGuess)
        } else if (e.code === "Enter" && currentGuess.length < 5) {
            console.log("la palabra debe tener 4 letras")
        } else if (e.code === "Enter" && currentGuess.length > 4) {
            enterPressed()
        }
    }

    function updateUserGuessWord() {
        currentGuess = $userGuessWord
    }

    setContext('updateUserGuessWord', updateUserGuessWord)

    function backspacePressed(): void {
        currentGuess.pop()
        currentGuess = currentGuess       
    }

    setContext('backspacePressed', backspacePressed)

    function enterPressed(): void {
        //Check word and update boardIndex
        userGuesses = [...userGuesses, currentGuess]
        lastWord = currentGuess.join("").toUpperCase()
        let checked = checkWord()
            
        if (checked) {
            correctLetters.update(() => checked.correctLetter)
            includedLetters.update(() => checked.includedLetter)
            notIncludedLetters.update((value) => [...value, ...checked.notIncludedLetter])
        }
        
        currentGuess = []
        userGuessWord.update(() => [])
        currentGuessIndex += 1
    }

    setContext('enterPressed', enterPressed)

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    function updateCorrectWord() {
        let correctWordId : number = getRandomInt(correctWords.length)
        $correctWord = correctWords[correctWordId]
        console.log($correctWord)
    }

    onMount( 
        () => updateCorrectWord()
    )

    function gameWon() {
        state = 'won'
    }

    function gameLost() {
        state = 'lost'
    }

    $: {
        console.log($userGuessWord)
    }

    $: lastWord === $correctWord.toUpperCase() && gameWon()
    $: currentGuessIndex >= 6 && lastWord !== $correctWord.toUpperCase() && gameLost()

    $: stateBg = () => {
        if ( state === 'won') {
            return "bg-green-200 border-4 border-green-500"
        } else if ( state === 'lost') {
            return "bg-red-200 border-4 border-red-500"
        } else {
            return "bg-transparent"
        }
    }

</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="flex flex-col">
    <h1 class="text-white text-5xl font-bold my-3 m-auto"> Busca la Palabra</h1>

    <div class="m-auto">
        {#each Array(6) as _, i}
            {#if i === currentGuessIndex}
                <Word printedWord={currentGuess} />
            {:else if i < currentGuessIndex}
                <Word printedWord={userGuesses[i]} validate={true}/>
            {:else}
                <Word printedWord={voidWord} />
            {/if}
        {/each}
    </div>

    <div class="m-auto h-24 w-96 {stateBg()} rounded-md flex justify-center content-center">
        <!--Resultados-->
        {#if state === 'won'}
            <h1 class="text-green-500 text-2xl font-bold m-auto"> 🎉 !!Has Ganado!! 🎉 </h1>
        {:else if state === 'lost'}
            <div class="m-auto">
                <h1 class="text-red-500 text-2xl font-bold"> 💩 Has Perdido... 💩 </h1>
                <h1 class="text-red-500 text-2xl font-bold"> Buscabas: "{$correctWord}" </h1>
            </div>
        {/if}
    </div>

    <div class="m-auto">
        {#if state === 'playing'}
            <Keyboard />
        {:else}
            <button on:click={() => resetGame()}>Nueva Partida</button>
        {/if}
    </div>
</div>
