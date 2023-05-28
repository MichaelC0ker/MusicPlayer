// const setListener = () => {
//     addToPlaylistButton = document.getElementById("add-to-playlist-btn")
//     addToPlaylistButton.addEventListener("click", setVisibility);
//     console.log("listener set")
// }

allSongs = []

async function getAllSongDetails(){
    const response = await fetch("http://localhost:5000/song/all", {
        method: "POST",
        body: JSON.stringify({
            "username":  "Tsepo",
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    allSongs = (await response.json()).songs;
    displayAllSongs();
    console.log('sond details: ',allSongs);
}


function setVisibility() {
    let x = document.getElementById("add-to-playlist-box");
    if (x.style.display === "none") {
        x.style.display = "flex";
        if(allSongs=[]){
            getAllSongDetails().then( )
        }
    } else {
        x.style.display = "none";
    }
}
function displayAllSongs(){

    for(song of allSongs){
        console.log('list item: ',song.id)
        const songList = document.getElementById("song-option-list");

        const newSongOption = document.createElement('LI');
 
        newSongOption.className = "song-option-li";
        newSongOption.innerText = song.title;
        newSongOption.id = song.id;
        newSongOption.onclick = () => addSongToPlaylist(song.id);

        //Appending Elements
        songList.appendChild(newSongOption);

    }
}

async function addSongToPlaylist(songId) {
    console.log("songID: ",songId);

    let x = document.getElementById(songId);
    console.log("selected song with id " + x.id)

   const response = await fetch("http://localhost:5000/playlist/song", {
        method: "POST",
        body: JSON.stringify({
            "playlist_id": currentPlaylist.id,
            "song_id":songId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

}



// setListener();