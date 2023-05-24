
const setSongs = () => {
	
	for(const i of songs){

		let song = i;
		
		const lists = document.querySelector('.playlist-screen');
		
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className = 'list';

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
		
		const newCover = document.createElement('IMG');
		newCover.src = song.cover;

		const newP = document.createElement('P');
		newP.className = 'playlist-name';
		newP.innerText = song.name;

		//Appending Elements
		lists.appendChild(newSection);
		newSection.appendChild(newArticle);
		newArticle.appendChild(newCover);
		newSection.appendChild(newP);
	}
};
