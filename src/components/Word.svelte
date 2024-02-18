<script lang="ts">
    import Letter from '../components/Letter.svelte'

    export let printedWord: string[]
    export let validate: boolean = false

    let i: number = 0 

</script>

<div class="flex mb-0.5">
    {#each Array(5) as _, i }
        <div>
            <Letter {printedWord} letterIndex={i} {validate} />
        </div>
    {/each}
    
</div>