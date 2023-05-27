

const fetchAllSongs = () => {
  fetch("http://localhost:5000"+"/song/all", {
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
