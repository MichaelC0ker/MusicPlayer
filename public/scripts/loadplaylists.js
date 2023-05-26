
const setPlaylist = () => {
	
	for(const i of playlists){

		let playlist = i;
		
		const lists = document.getElementById('all-playlists-group');
		//a.onclick = 
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className ='playlist-card';
		newSection.id = playlist.id;
		newSection.onclick = "navigateToPlaylist(this.id)";
		
		const newCover = document.createElement('IMG');
		newCover.className = 'playlist-card-cover'
		newCover.src = "https://media.istockphoto.com/id/1141495869/photo/3d-render-blue-pink-neon-round-frame-circle-ring-shape-empty-space-ultraviolet-light-80s.jpg?s=612x612&w=0&k=20&c=s_k3XrnKy9qRzTR2vdLg_BC6smrY1WymKpBsBfAvLNU=";

		const newP = document.createElement('P');
		newP.className = 'playlist-card-name';
		newP.innerText = playlist.title;

		//Appending Elements
		lists.appendChild(newSection);
		newSection.appendChild(newCover);
		newSection.appendChild(newP);

		
	}
};

const setPlaylistSelection = (playlistId)  =>{
	sessionStorage.setItem("playlistId", playlistId);
}

document.("myBtn").addEventListener("click", displayDate);



