function  validateSongInput() {
    let text = "";

    let songName = document.getElementById("song-name-input").value;
    let songArtist = document.getElementById("artist-name-input").value;
    let songURL = document.getElementById("song-path-input").value;
    let coverURL = document.getElementById("cover-path-input").value;



    //simple validation on user input
    let valid = true;
    if (songName === "") {
        text = "Input song name";
        valid = false;
    } else if (songArtist === "") {
        text = "Input artist name";
        valid = false;
    } else if (songURL === "") {
        text = "Input song path";
        valid = false;
    } else if (!songURL.includes("\\")) {
        console.log(!songURL.includes("\\"));
        console.log(songURL);
        text = "Input valid song path";
        valid = false;
    } else if (coverURL === "") {
        text = "Input cover path";
        valid = false;
    } else if (!coverURL.includes("\\")) {
        text = "Input valid cover path";
        valid = false;
    }

    //display error message for invalid input
    if (!valid) {
        var toast = document.getElementById("validation-toast");
        toast.className = "show";
        toast.innerHTML = text
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
    }

    return valid;
}

function validatePlaylistInput() {

    let text = "";

    let playlistName = document.getElementById("playlist-name-input").value;
    let coverPath = document.getElementById("cover-path-input").value;

    //simple validation on user input
    let valid = true;

    if (playlistName === "") {
        text = "Input playlist name";
        valid = false;
    } else if (coverPath === "") {
        text = "Input path to playlist cover";
        valid = false;
    } else if (!coverPath.includes("\\")) {
        text = "Input valid cover path";
        valid = false;
    } 

    //display error message for invalid input
    if (!valid) {
        var toast = document.getElementById("validation-toast");
        toast.className = "show";
        toast.innerHTML = text
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
    }

    return valid;
}

function onSubmitSong(){
   let submit = validateSongInput();
   if(submit){
    console.log("we're moving");
    window.location.href = "index.html";

   }
}
    
//add submit function for playlist

