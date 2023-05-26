
const setPlaylist = () => {
	
	for(const i of playlists){

		let playlist = i;
		
<<<<<<< HEAD
		const lists = document.querySelector('.playlists');
		
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className = 'list';

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
=======
		const lists = document.getElementById('all-playlists-group');
		//a.onclick = 
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className ='playlist-card';
		newSection.id = playlist.id;
		newSection.onclick = "navigateToPlaylist(this.id)";
>>>>>>> 83cf5f4 (starting to add individual playlist screen)
		
		const newCover = document.createElement('IMG');
		newCover.src = playlist.cover;

		const newP = document.createElement('P');
		newP.className = 'playlist-name';
		newP.innerText = playlist.name;

		//Appending Elements
		lists.appendChild(newSection);
		newSection.appendChild(newArticle);
		newArticle.appendChild(newCover);
		newSection.appendChild(newP);
	}
};
<<<<<<< HEAD
=======

const setPlaylistSelection = (playlistId)  =>{
	sessionStorage.setItem("playlistId", playlistId);
}

document.("myBtn").addEventListener("click", displayDate);



>>>>>>> 83cf5f4 (starting to add individual playlist screen)
