<script lang="ts">
    import { correctWord } from "$lib/correctWordStore"
    

    export let printedWord: string []
    export let letterIndex: number
    export let validate: boolean

    $: validateBg = () => {
        if ( validate && $correctWord[letterIndex].toUpperCase() === printedWord[letterIndex]) {
            return "bg-green-500"
        } else if ( validate && $correctWord.toUpperCase().includes(printedWord[letterIndex])) {
            return "bg-orange-500"
        } else if (validate) {
            return "bg-gray-500"
        } else {
            return "bg-transparent"
        }
    }

    let voidSpot: string = ""

</script>

<div class="h-14 w-14 {validateBg()} border-[3px] rounded-md border-yellow-50 text-white font-black text-4xl flex items-center justify-center leading-none m-1">
    {#if printedWord[letterIndex] === undefined}
        {voidSpot}
    {:else}
        {printedWord[letterIndex]}
    {/if}
</div>