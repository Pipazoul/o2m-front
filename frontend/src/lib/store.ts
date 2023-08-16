import { get, writable } from 'svelte/store';
export const modal = writable(false);
export const loginModal = writable(false);
import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_URL} from '$env/static/public'

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);
export let currentPlaylists = writable([]);
export let currentPlaylist = writable([]);
export let currentPlaylistId = writable("");
export let playerState = writable(null);

const socket = new WebSocket('ws://localhost:6680/mopidy/ws/');

socket.addEventListener("open", () => {
    console.log("Opened");
    const request = {"jsonrpc": "2.0", "id": 1, "method": "core.playlists.as_list"};
    socket.send(JSON.stringify(request));
    // subscribe to currentPlaylistId
    currentPlaylistId.subscribe((currentPlaylistId) => {

        if (currentPlaylistId) {
            console.log("currentPlaylistId", currentPlaylistId);
            const request = {"jsonrpc": "2.0", "id": 2, "method": "core.playlists.lookup", "params": {"uri": currentPlaylistId}};
            socket.send(JSON.stringify(request));            
        }
    });
  });
  socket.addEventListener("message", (event) => {
    console.log("Received response:", event.data);
    const response = JSON.parse(event.data);
    if (response.result) {
        // response.id 1 is the playlists list
        if (response.id == 1) {
            currentPlaylists.set(response.result);
        }
        // response.id 2 is the playlist
        if (response.id == 2) {
            console.log("currentPlaylist", response.result);
            currentPlaylist.set(response.result.tracks);
        }
    }

  });
  socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
  socket.close();
});


pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
});


export async function watchUserChange() {
    const getUser = await pb.collection("users").getOne(get(currentUser).id, {});
    currentUser.set(getUser);
    // subscribe to the user data
    pb.collection("users").subscribe('*', async ({action,  record}) => {
        if (action === "update") {
            currentUser.set(record);
        }
    });
}

