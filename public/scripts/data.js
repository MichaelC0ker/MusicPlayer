//store data on front end
//display data on next screen
let songs = [];
const playlistCard = document.querySelector('.playlist-card')

async function getAllSongs(){
	const response = await fetch("https://34.244.5.94.nip.io:5000/song/all", {
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
<<<<<<< HEAD
=======

async function getAllPlaylists(){
    const response = await fetch("http://localhost:5000/playlist/all", {
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



>>>>>>> 83cf5f4 (starting to add individual playlist screen)
