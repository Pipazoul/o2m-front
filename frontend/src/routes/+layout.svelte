<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { watchUserChange } from "../lib/store";
  import Nav from "$lib/components/Nav.svelte";
  import Player from "$lib/components/Player.svelte";
  import Mopidy from "mopidy";

  const mopidy = new Mopidy({
  webSocketUrl: "ws://localhost:6680/mopidy/ws/",
  });

    onMount(() => {
       watchUserChange();
    });
  </script>
  <div class="flex">
    <Nav/>
    <slot />
  </div>
  <Player/>

