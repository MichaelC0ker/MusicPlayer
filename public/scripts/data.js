//store data on front end
//display data on next screen
import { api_endpoint } from "./constants";
let songs = [];
const playlistCard = document.querySelector('.playlist-card')

async function getAllSongs(){
	const response = await fetch(api_endpoint+"/song/all", {
    method: "POST",
    body: JSON.stringify({
          "username": "Tsepo",  
        }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});

songs = (await response.json()).songs;
console.log(songs)
setSongs()
}
