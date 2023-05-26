//store data on front end
//display data on next screen
import { api_endpoint } from "./constants";
let songs = [];
let playlists =[];
let viewPlaylist = [];

//const playlistCard = document.querySelector('.playlist-card')

async function getAllSongs(){
	const response = await fetch(api_endpoint+"/song/all", {
    method: "POST",
    body: JSON.stringify({
          "username": "Michael",  
        }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});

songs = (await response.json()).songs;
console.log(songs)
setSongs()
}

async function getAllPlaylists(){
    const response = await fetch(api_endpoint+"/playlist/all", {
    method: "POST",
    body: JSON.stringify({
          "username": "Michael"  
        }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});
playlists = (await response.json()).playlists;
console.log(playlists)
setPlaylist()
//playlist = (await response.json()).songs;
//console.log(songs)
//setSongs()
}



