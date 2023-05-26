

const fetchAllSongs = () => {
  fetch("https://34.244.5.94/"+"/song/all", {
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
