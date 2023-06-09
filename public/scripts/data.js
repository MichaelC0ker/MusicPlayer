//display data on next screen

let songs = [];
let playlists = [];
let currentPlaylist;

const setSongs = () => {
console.log('storage',localStorage);
    if(localStorage.getItem('songs') !== null){
        songs = JSON.parse(localStorage.getItem('songs'));
        songCount(songs);
    }

    if(localStorage.getItem('Playlist') !== null){
        currentPlaylist = JSON.parse(localStorage.getItem('Playlist'));
        songs = currentPlaylist.songs
        setPlaylistDetails(currentPlaylist);
        console.log('curerent: ',currentPlaylist)
    }

	console.log("kk")
	console.log('songs: ',songs)
	for(const i of songs){
		console.log(i)
		let song = i;
		
		const playlist = document.getElementById('playlist-screen');

		//created elements
		const playlistItem = document.createElement('SECTION');
		playlistItem.className = 'list';
		playlistItem.addEventListener('click', () => {
            localStorage.removeItem('song');
			localStorage.setItem('song',JSON.stringify(song))
            window.location.href = 'playing.html';
        })

        const newArticle = document.createElement('ARTICLE');
        newArticle.className = 'playlist-cover';

        const newCover = document.createElement('IMG');
        newCover.src = 'assets/images/banner2.jpg';

        const newP = document.createElement('P');
        newP.className = 'playlist-name';
        newP.innerText = song.title;

        //Appending Elements
        playlist.appendChild(playlistItem);
        playlistItem.appendChild(newArticle);
        newArticle.appendChild(newCover);
        playlistItem.appendChild(newP);
    }
};

const setPlaylist = () => {

    for (const i of playlists) {

        let playlist = i;
        console.log(playlist);
		
		const playlistGroup = document.getElementById('all-playlists-group');
		
		//created elements
		const playlist_Card = document.createElement('SECTION');
		playlist_Card.className = 'playlist-card';

        playlist_Card.addEventListener('click', () => {
            localStorage.clear();
            localStorage.setItem('Playlist',JSON.stringify(playlist))
            window.location.href = 'Playlists.html';
        })
        
        const newCover = document.createElement('IMG');
        newCover.className = 'playlist-card-cover';
        newCover.src = 'assets/images/banner2.jpg';

        const playlist_name = document.createElement('P');
        playlist_name.className = 'playlist-card-name';
        playlist_name.innerText = playlist.title;

        //Appending Elements
        playlistGroup.appendChild(playlist_Card);
        playlist_Card.appendChild(newCover);
        playlist_Card.appendChild(playlist_name);
    }
};

async function getAllSongs(){
	const response = await fetch(api_endpoint + "/song/all", {
        method: "POST",
        body: JSON.stringify({
            "username": sessionStorage.getItem("username"),
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    songs = (await response.json()).songs;
}

async function getPlaylists(){
	const response = await fetch(api_endpoint + "/playlist/all", {
        method: "POST",
        body: JSON.stringify({
            "username": sessionStorage.getItem("username"),  
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    playlists = (await response.json()).playlists;
    //console.log(playlists)
    setPlaylist();
}


async function getSinglePlaylist(playlist_id) {

    const response = await fetch(api_endpoint + "/playlist/" + playlist_id , {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    });

    songs = (await response.json()).songs;
    //console.log(songs);
    setSongs();
}

async function loadAllTracks(){
    const playistName = document.getElementById('playistName');

    if(playistName.innerText === 'All Tracks'){
        await getAllSongs();
        localStorage.clear();
        localStorage.setItem('songs',JSON.stringify(songs));
        setSongs();
        //window.location.href = 'Playlists.html';
    }
}

function setPlaylistDetails(playlist) {
    const playistName = document.getElementById('playistName');
    const playlistDescription = document.getElementById('playlistDescription');

    playistName.innerText = playlist.title;
    playlistDescription.innerText = playlist.description;
    songCount(playlist.songs);
}

function songCount(songs) {
    const songCount = document.getElementById('songCount');

    if (songs.length !== undefined) {
        songCount.innerText = songs.length + ' songs';
        return;
    }
    songCount.innerText = '0 songs';
}

function goToAllTrack(){
    localStorage.clear();
    window.location.href = 'Playlists.html';
}

allSongs = []

async function getAllSongDetails(){
    const response = await fetch(api_endpoint + "/song/all", {
        method: "POST",
        body: JSON.stringify({
            "username":  sessionStorage.getItem("username"),
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

    for(const song of allSongs){
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
    console.log(currentPlaylist)

   const response = await fetch(api_endpoint + "/playlist/song", {
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
