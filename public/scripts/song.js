const fetchSong = (songId) => {
  fetch("https://34.244.5.94.nip.io:5000/song/" + songId, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response) => console.log(response.json()))
}

const deleteSong = (songId) => {
  fetch("https://34.244.5.94.nip.io:5000/song/5", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => console.log(response.json()))
}
