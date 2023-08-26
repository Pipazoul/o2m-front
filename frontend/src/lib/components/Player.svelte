<script lang="ts">
	import { player } from "$lib/stores/store";
    import type { Player } from "$lib/models/player";
	import { onMount } from "svelte";
    import SnapStream from '$lib/utils/snapstream';
    import Audiostream from '$lib/utils/snapstream';

    let snapStream;

    function handleContextReady() {
        snapStream.play();
    }

    function connectSnapStream() {
        snapStream = new Audiostream();
        snapStream.on('contextReady', handleContextReady);  

    }

    function stopSnapStream() {
        snapStream.stop();
    }

   
    
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

    <button on:click={connectSnapStream}>Connect SnapStream</button>
    <button on:click={stopSnapStream}>Stop SnapStream</button>


    PLAYER
    {#if $player}
        <button on:click={() => $player.state = returnPlayerState($player.state)}>{ $player.state }</button>
    {/if}

</section>