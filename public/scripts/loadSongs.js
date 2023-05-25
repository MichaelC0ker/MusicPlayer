import { moveToPlaylist } from "./data.js";
//load all songs to the frontend 
export const setSongs = () => {
	console.log("kk")
	for(const i of songs){
		console.log(i)
		let song = i;
		
		const lists = document.getElementsByClassName ('playlist-screen');
		
		//created elements
		const newSection = document.createElement('SECTION');
		newSection.className = 'list';
		//newSection.setAttribute("id", song.id);

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
		
		const newCover = document.createElement('IMG');
		newCover.src = 'assets/images/AfterHours.jpg';

		const newP = document.createElement('P');
		newP.className = 'playlist-name';
		newP.innerText = song.title;

		//Appending Elements
		lists.appendChild(newSection);
		newSection.appendChild(newArticle);
		newArticle.appendChild(newCover);
		newSection.appendChild(newP);
	}
};

let playlistCard = document.querySelector('.playlist-card')
console.log(playlistCard)
window.addEventListener("DOMContentLoaded", (event) =>{
	let playlistCard = document.querySelector('.playlist-card')
	if(playlistCard){
		console.log("addedEventListener")
		playlistCard.addEventListener('click',() => {moveToPlaylist()})
	}else{
		console.log("didn't add event listener")
	}

})