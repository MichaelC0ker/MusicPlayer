import { api_endpoint } from "./constants"

const fetchSong = (songId) => {
  fetch(api_endpoint+"/song/" + songId, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response) => console.log(response.json()))
}

const deleteSong = (songId) => {
  fetch(api_endpoint+"/song/5", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => console.log(response.json()))
}
