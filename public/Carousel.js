
function setPlaylist(i){

	const lists = document.querySelector('.slideshow-container');

	let playlist = playlists[i];
	
	//created elements
	const newSection = document.createElement('SECTION');
	newSection.className = 'playlist-container';
	
	const newSectionTwo = document.createElement('SECTION');
	newSectionTwo.className = 'carousel-cover';

	const newCover = document.createElement('IMG');
	newCover.src = playlist.cover;

	const newP = document.createElement('P');
	newP.className = 'MessageInfo';
	newP.innerText =  `${i + 1} / ${playlists.length}`;
	
	const newPtag = document.createElement('P');
	newPtag.className = 'Info';
	newPtag.innerText = playlist.name;

	//Appending Elements
	lists.appendChild(newSection);
	newSection.appendChild(newSectionTwo);
	newSectionTwo.appendChild(newP);
	newSectionTwo.appendChild(newCover);
	newSectionTwo.appendChild(newPtag);
};


let slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {

  let slides = document.getElementsByClassName("playlist-container");

  if (n > slides.length) {
		slidePosition = 1
	}

  if (n < 1) {
		slidePosition = slides.length
	}

  for (const slide of slides) {
    slide.style.display = "none";
  }

  slides[slidePosition-1].style.display = "block";
	setPlaylist(slidePosition-1);

} 