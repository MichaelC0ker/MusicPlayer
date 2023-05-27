const fetchAllSongs = () => {
  fetch(api_endpoint + "/song/all", {
    method: "POST",
    body: JSON.stringify({
        "username": sessionStorage.getItem("username"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => console.log(response.json()));
}

fetchAllSongs();
