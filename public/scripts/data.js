//store data on front end
//display data on next screen

let songs = [];
let playlists =[];
let playlistSongs = [];

//const playlistCard = document.querySelector('.playlist-card')

async function getAllSongs(){
	const response = await fetch("https://34.244.5.94/"+"/song/all", {
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
    const response = await fetch("https://34.244.5.94/"+"/playlist/all", {
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


async function getSinglePlaylist(playlist_id){
    const response = await fetch("https://34.244.5.94/"+ "/playlist/" + playlist_id , {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});
songs = (await response.json()).songs;
console.log(songs)
setSongs()
//playlist = (await response.json()).songs;
//console.log(songs)
//setSongs()
}



