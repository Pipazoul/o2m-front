<script lang="ts">
  import { currentPlaylists } from "$lib/store";
</script>
<section class="flex flex-col">
    {#each $currentPlaylists as playlist}
    <a href="/playlists/{playlist.uri}">{playlist.name}</a>
    {/each}

</section>