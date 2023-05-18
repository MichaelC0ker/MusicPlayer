
const setPlaylist = () => {
	
	for(const i of playlists){

		let playlist = i;
		
		const lists = document.querySelector('.playlists');
		
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className = 'list';

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
		
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
