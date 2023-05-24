


function validateSongInput() {
    let text = "";
    let songURL = document.getElementById("song-path-input").value;




    //simple validation on user input
    let valid = true;
    if (songURL === "") {
        text = "Input song path";
        valid = false;
    } else if (!songURL.includes("\\")) {
        console.log(!songURL.includes("\\"));
        console.log(songURL);
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

function validatePlaylistInput() {
    let text = "";

    let playlistName = document.getElementById("playlist-name-input").value;

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


function storeSongData(){
   // let coverPath = document.getElementById("cover-path-input").value;

    const song = document.getElementById("song-file-input").files[0]
 
    jsmediatags.read(song, {
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
        picture = `data:${format};base64,${window.btoa(base64String)}`
        picture = base64String
        songTitle = tag.tags.title
        artist = tag.tags.artist
        albumName = tag.tags.album
        genre = tag.tags.genre
        songURL ="C:\Users\Documents\MusicPlayer\public\assets\music"
       // test = songURL.replaceAll("\\","\\\\")
        test2 = songURL.replace(/\\/g, "/");
        console.log(test2)

         //inserting into database
         fetch("http://localhost:5000/song", {
            method: "POST",
            body: JSON.stringify({
              "username": "Michael",
              "title": songTitle,
              "song_url": "C:\Users\\Documents\\MusicPlayer\public\assets\music",
              "duration": 3000,
              "genre": genre,
              "album": {
                "title": albumName,
                "release_year": 2020
              },
              "artist": artist,
              "coverart": "picture"
  
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
    })
  
}
function onSubmitSong(){
   let submit = validateSongInput();
   storeSongData();

   if(submit){
    console.log("we're moving");
    storeSongData();
    window.location.href = "index.html";
   }
}



function onSubmitPlaylist(){
    let submit = validatePlaylistInput();
    if(submit){
     console.log("we're moving");
     //window.location.href = "index.html";
    }
 }


    
//add submit function for playlist

