const apiBaseUrl = 'https://34.255.93.84:5000';

const fetchAllSongs = () => {
  fetch(apiBaseUrl + "/song/all", {
    method: "POST",
    body: JSON.stringify({
        "username": "admin",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => console.log(response.json()));
}

fetchAllSongs();
