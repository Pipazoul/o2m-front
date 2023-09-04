<script lang="ts">
	import { player } from "$lib/stores/store";
    import type { Player } from "$lib/models/player";
	import { onMount } from "svelte";
    import SnapStream from '$lib/utils/snapstream';
    import SnapControl from '$lib/utils/snapcontrol';
    import Audiostream from '$lib/utils/snapstream';

    let snapStream;

    onMount(() => {
        //let snapcontrol = new SnapControl("ws://localhost:1780");
        let setStream = new SnapStream("ws://localhost:1780");
    });

    
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
    <div class="bg-red-600">
        <p>SnapStream</p>
    
    </div>

    PLAYER
    {#if $player}
        <button on:click={() => $player.state = returnPlayerState($player.state)}>{ $player.state }</button>
    {/if}
</section>