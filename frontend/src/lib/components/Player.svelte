<script lang="ts">
	import { player } from "$lib/store";
    import type { Player } from "$lib/models/player";
	import { onMount } from "svelte";

    
    function returnPlayerState (state) {
        // if state stopped, play if paused play if playing pause
        if (state ==="stopped") {
            return "playing";
        }
        if (state === "paused") {
            return "playing";
        }
        if (state === "playing") {
            return "paused";
        }
    }

</script>
<section class="fixed bottom-0 bg-primary w-full text-white">
    PLAYER
    {#if $player}
        <button on:click={() => $player.state = returnPlayerState($player.state)}>{ $player.state }</button>
    {/if}
</section>