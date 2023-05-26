import { api_endpoint } from "./constants";


function validateSongInput() {
  let text = "";
  let songURL = document.getElementById("song-path-input").value;


  //simple validation on user input
  let valid = true;
  if (songURL === "") {
    text = "Input song path";
    valid = false;
  } else if (!songURL.includes("\\")) {
    text = "Input valid song path";
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

function addPlaylistToDatabase(playlistName,playlistDescription,username){
  fetch(api_endpoint+"/playlist", {
      method: "POST",
      body: JSON.stringify({
        "title": playlistName,
        "description": playlistDescription,
        "username": "Michael",
        "songs": []
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => console.log(response.json()))
}

function validatePlaylistInput() {
  let text = "";

  let playlistName = document.getElementById("playlist-name-input").value;

  let playlistDescription = document.getElementById("playlist-description").value;



  //simple validation on user input
  let valid = true;

  if (playlistName === "") {
    text = "Input playlist name";
    valid = false;
  }else if(playlistDescription === ""){
    text = "Input playlist description";
    valid = false;
  }

  //display error message for invalid input
  if (!valid) {
    var toast = document.getElementById("validation-toast");
    toast.className = "show";
    toast.innerHTML = text
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
  }else{
    addPlaylistToDatabase(playlistName,playlistDescription,"Michael")
  }

  return valid;
}

function formatURL(urlString) {
  let formattedUrlString = urlString.substring(0) //essentially pass by value 
  //formattedUrlString = formattedUrlString.replaceAll("\\", "\\\\")
  return formattedUrlString
}


const id3Handlers = {
  onSuccess: function (tag) {
    console.log(tag)
    // Array buffer to base64
    const data = tag.tags.picture.data
    const format = tag.tags.picture.format
    let base64String = ""
    for (let i = 0; i < data.length; i++) {
      base64String += String.fromCharCode(data[i])
    }
    // document.querySelector("#cover").src = `data:${format};base64,${window.btoa(base64String)}`
    picture = String.raw`data:${format};base64,${window.btoa(base64String)}`
    songTitle = tag.tags.title
    artist = tag.tags.artist
    albumName = tag.tags.album
    genre = tag.tags.genre

    urlElement = document.getElementById("song-path-input")
    songURL = urlElement.value


     //inserting into database
     fetch(api_endpoint+"/song", {
        method: "POST",
        body: JSON.stringify({
          "username": "tlholo",
          "title": songTitle,
          "song_url": songURL,
          "duration": 3000,
          "genre": genre,
          "album": {
            "title": albumName,
            "release_year": 2020
          },
          "artist": artist,
          "coverart": picture

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => console.log(response.json()))
  },
  onError: function (error) {
    console.log(error)
  }
};


function storeSongData() {
  const song = document.getElementById("song-file-input").files[0]
  jsmediatags.read(song, id3Handlers)
}

function onSubmitSong() {
  let submit = validateSongInput();

  if (submit) {
    storeSongData();
    console.log("we're moving");
    // storeSongData();
    //window.location.href = "index.html";
  }
}




function onSubmitPlaylist() {
  let submit = validatePlaylistInput();
  if (submit) {
    window.location.href = "index.html";
  }
}



//add submit function for playlist

