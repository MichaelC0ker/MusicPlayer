// import { moveToPlaylist } from "./data.js";

//load all songs to the frontend 
 const setSongs = () => {
	console.log("kk")
	console.log(songs)
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

		const newArticle = document.createElement('ARTICLE');
		newArticle.className = 'playlist-cover';
		
		const newCover = document.createElement('IMG');
		newCover.src = 'assets/images/AfterHours.jpg';

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



// let playlistCard = document.querySelector('.playlist-card')
// console.log(playlistCard)
// window.addEventListener("DOMContentLoaded", (event) =>{
// 	let playlistCard = document.querySelector('.playlist-card')
// 	if(playlistCard){
// 		console.log("addedEventListener")
// 		playlistCard.addEventListener('click',() => {moveToPlaylist()})
// 	}else{
// 		console.log("didn't add event listener")
// 	}

// })