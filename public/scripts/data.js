//display data on next screen
let songs = [];
let playlists = [];
let playlist_id = -1 ;

const setSongs = () => {
	console.log("kk")
	console.log('songs: ',songs)
	for(const i of songs){
		console.log(i)
		let song = i;
		
		const playlist = document.getElementById('playlist-screen');
		console.log(typeof playlist);
		console.log(playlist);

		
		
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className = 'list';
		newSection.setAttribute("id", `song${song.id}`);
		newSection.addEventListener('click', () => {
			console.log(newSection.id)
	    })

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
		
		const newCover = document.createElement('IMG');
		newCover.src = 'assets/images/banner2.jpg';

		const newP = document.createElement('P');
		newP.className = 'playlist-name';
		newP.innerText = song.title;

		//Appending Elements
		playlist.appendChild(newSection);
		newSection.appendChild(newArticle);
		newArticle.appendChild(newCover);
		newSection.appendChild(newP);
	}
};

const setPlaylist = () => {

	for(const i of playlists){

		let playlist = i;
        console.log(playlist);

		
		const playlistGroup = document.getElementById('all-playlists-group');
		
		//created elements
		const playlist_Card = document.createElement('SECTION');
		playlist_Card.className = 'playlist-card';

        playlist_Card.addEventListener('click', () => {
            songs = playlist.songs
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

async function getPlaylists(){
	const response = await fetch("http://localhost:5000/playlist/all", {
        method: "POST",
        body: JSON.stringify({
            "username": "Tsepo",  
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    playlists = (await response.json()).playlists;
    console.log(playlists)
    setPlaylist();
}


async function getSinglePlaylist(playlist_id){

    const response = await fetch("http://localhost:5000/playlist/" + playlist_id , {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    });

    songs = (await response.json()).songs;
    console.log(songs);
    setSongs();
}










