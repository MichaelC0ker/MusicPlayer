//store data on front end
//display data on next screen
let songs = [];
const playlistCard = document.querySelector('.playlist-card')

async function getAllSongs(){
	const response = await fetch("http://localhost:5000/song/all", {
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
