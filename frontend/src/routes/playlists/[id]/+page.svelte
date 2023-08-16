<script lang="ts">
    import { page } from '$app/stores';
    import { currentPlaylist, currentPlaylistId } from '$lib/store';
	import { onMount } from 'svelte';
    const playlistId : string = $page.params.id;

    $currentPlaylistId = playlistId;

    $: console.log($currentPlaylist);

</script>
<section>
    {#if $currentPlaylist}
        {#each $currentPlaylist as track}
            <div>{track.name}</div>
        {/each}

    {/if}
</section>