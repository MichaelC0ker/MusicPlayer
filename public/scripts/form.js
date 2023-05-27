function addPlaylistToDatabase(playlistName, playlistDescription, username) {

  //adding file details to database
  fetch(apiBaseUrl + "/playlist", {
    method: "POST",
    body: JSON.stringify({
      "title": playlistName,
      "description": playlistDescription,
      "username": sessionStorage.getItem("username"),
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
  } else if (playlistDescription === "") {
    text = "Input playlist description";
    valid = false;
  }

  //display error message for invalid input
  if (!valid) {
    var toast = document.getElementById("validation-toast");
    toast.className = "show";
    toast.innerHTML = text
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
  } else {
    addPlaylistToDatabase(playlistName, playlistDescription, "Tsepo")
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


    //inserting  song into database
    fetch(api_endpoint + "/song", {
      method: "POST",
      body: JSON.stringify({
        "username": sessionStorage.getItem("username"),
        "title": songTitle,
        "song_url": "test",
        "duration": 3000,
        "genre": genre,
        "album": {
          "title": albumName,
          "release_year": 2020
        },
        "artist": artist,
        "coverart": "test"

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


async function storeSongData() {
  const songs = document.getElementById("song-file-input").files

  //storing song into database


  //storing song file into s3 bucket
  //adding song file to s3 bucket

  for(let song of songs){

    if (song) {
      
      const request = {
        method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      const aws_cred_req = await fetch(api_endpoint + "/credentials");
      const aws_cred_json = await aws_cred_req.json();

      let file = song;
      let fileName = file.name;
      let userID = sessionStorage.getItem("username", request);
      let filePath = 'music/' + userID +"#"+fileName; //we create a music folder and seperate them by usernames 
      const urlPrefix =   "https://music-player-web-app.s3.eu-west-1.amazonaws.com/"
      // let fileUrl = 'https://' + REGION + '/music-player-web-app/' + filePath;

      var s3 = new AWS.S3({
        region: aws_cred_json.AWS_REGION,
        accessKeyId: aws_cred_json.AWS_ACCESS_KEY,
        secretAccessKey: aws_cred_json.AWS_SECRET_ACCESS_KEY,
        apiVersion: '2008-10-17',
        params: { Bucket: "music-player-web-app" }
      });

      s3.upload({
        Key: filePath,
        Body: file
      }, function (err, data) {
        if (err) {
          console.log(err)
          reject('error');
        }
        console.log(data)
        alert('Successfully Uploaded!');
      });

      jsmediatags.read(song, {
        onSuccess: function (tag) {
          console.log('song meta data: ',tag)
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

          songURL = urlPrefix + encodeURIComponent(filePath)

        //inserting  song into database
        fetch(api_endpoint + "/song", {
          method: "POST",
          body: JSON.stringify({
            "username": sessionStorage.getItem("username"),
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
            .then((response) => {
              console.log(response.json())
              console.log('Song added successfully!!!');
            })
        },
        onError: function (error) {
          console.log(error)
        }
      })

      
    }
  }

  //window.location.href = "index.html";
}

function onSubmitSong() {
//  let submit = validateSongInput();

    storeSongData();
    console.log("we're moving");
    // storeSongData();

}




function onSubmitPlaylist() {
  let submit = validatePlaylistInput();
  if (submit) {
    window.location.href = "index.html";
  }
}



//add submit function for playlist

