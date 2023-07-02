<script>
    import "../app.css";
    import { onMount } from "svelte";
	import { watchUserChange } from "../lib/store";
	import Nav from "$lib/components/Nav.svelte";
	import Player from "$lib/components/Player.svelte";

    onMount(() => {
       watchUserChange();
    });
  </script>
  <div class="flex">
    <Nav/>
    <slot />
  </div>
  <Player/>

