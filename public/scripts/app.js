//Section
const musicPlayerSection = document.querySelector('.music-player');

//Music
let currentMusic = 0;

const music = document.querySelector('#audio-source');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

//Buttons
const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('article.fa-redo');
const volumeBtn = document.querySelector('article.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');
const backBtn = document.querySelector('.music-player .back-btn');

//Music Player Back Button Click Event
// backBtn.addEventListener('click', () => {
// 	musicPlayerSection.classList.remove('active');
// })

//Play Button Click event
playBtn.addEventListener('click', () => {
	music.play();
	playBtn.classList.remove('active');
	pauseBtn.classList.add('active');
})

//Pause Button Click event
pauseBtn.addEventListener('click', () => {
	music.pause();
	pauseBtn.classList.remove('active');
	playBtn.classList.add('active');
})

//Function for setting music up
const setMusic = () => {
	let song
	seekBar.value = 0;

	if(localStorage.getItem('song') !== null){
        song = JSON.parse(localStorage.getItem('song'));
		console.log('song; ',song)
        localStorage.clear();
    }
	console.log(song);
	//currentMusic = i;
	
	music.src = song.song_url;
	songName.innerHTML = song.title;
	artistName.innerHTML = song.artistResult;
	coverImage.src = "assets/images/banner2.jpg";
	setTimeout(() => {
		seekBar.max = music.duration;
		musicDuration.innerHTML = formatTime(music.duration);
	}, 300);
	
	currentMusicTime.innerHTML = '00 : 00'
	
}

//setMusic(0);

//format time
const formatTime = (time) => {
	let minutes = Math.floor(time/60);
	if(minutes < 10){
		minutes = `0` + minutes;
	}
	
	let secs = Math.floor(time%60);
	if(secs < 10){
		secs = `0` + secs;
	}
	
	return `${minutes} : ${secs}`
}

//Seek bar event
setInterval(() => {
	seekBar.value = music.currentTime;
	currentMusicTime.innerHTML = formatTime(music.currentTime);
	
	if(Math.floor(music.currentTime) === Math.floor(seekBar.max)){
		if(repeatBtn.className.includes('active')){
			setMusic(currentMusic);
			playBtn.click();
		}
		else{
			forwardBtn.click();
		}
	}
}, 500);

seekBar.addEventListener('change', () => {
	music.currentTime = seekBar.value;
})

//Forward button 
forwardBtn.addEventListener('click', () => {
	if(currentMusic >= songs.length - 1){
		currentMusic = 0;
	}
	else{
		currentMusic++;
	}
	setMusic(currentMusic);
	playBtn.click();
});

//Backward button 
backwardBtn.addEventListener('click', () => {
	if(currentMusic === 0){
		currentMusic = songs.length - 1;
	}
	else{
		currentMusic--;
	}
	setMusic(currentMusic);
	playBtn.click();
});

//Repeat button
repeatBtn.addEventListener('click', () => {
	repeatBtn.classList.toggle('active');
})

//volume
volumeBtn.addEventListener('click', () => {
	volumeBtn.classList.toggle('active');
	volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
	music.volume = volumeSlider.value;
})

//Load Your Playlist
/*const setPlaylist = () => {
	let playlist = playlists[0];console.log('k')
	
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
};*/