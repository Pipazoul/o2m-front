<script lang="ts">
	import { player } from "$lib/store";
    import type { Player } from "$lib/models/player";
	import { onMount } from "svelte";

    let audioStream: MediaStream;

    onMount(() => {
        /**console.log("### Player ###", $player);
        // onpen a ws socket to snapcast server an listen audio binary data*

        const streamUrl = "ws://localhost:1780/stream";
        const ws = new WebSocket(streamUrl);
        ws.binaryType = "arraybuffer";
        ws.onopen = () => {
            console.log("### WS OPEN ###");
        };
        ws.onmessage = (event) => {
            //console.log("### WS MESSAGE ###");
            //const data = event.data;
            //console.log(data);
            //const blob = new Blob([data], { type: "audio/ogg; codecs=opus" });
            //const audio = document.createElement("audio");
            //audio.src = URL.createObjectURL(blob);
            
        };
        ws.onclose = () => {
            console.log("### WS CLOSE ###");
        };
        ws.onerror = (error) => {
            console.log("### WS ERROR ###");
            console.log(error);
        };**/


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
    PLAYER
    {#if $player}
        <button on:click={() => $player.state = returnPlayerState($player.state)}>{ $player.state }</button>
    {/if}



</section>