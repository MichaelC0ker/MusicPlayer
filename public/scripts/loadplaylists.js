
const setPlaylist = () => {

	for(const i of playlists){

		let playlist = i;
		
		const playlistGroup = document.getElementById('all-playlists-group');
		
		//created elements
		const playlist_Card = document.createElement('SECTION');
		playlist_Card.className = 'playlist-card';
		
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
