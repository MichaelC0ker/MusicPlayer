const apiBaseUrl = 'https://34.255.93.84:5000';

const fetchSong = (songId) => {
  fetch(apiBaseUrl+"/song/" + songId, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response) => console.log(response.json()))
}

const deleteSong = (songId) => {
  fetch(apiBaseUrl+"/song/5", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => console.log(response.json()))
}
