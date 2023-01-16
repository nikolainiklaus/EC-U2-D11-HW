const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c8d3e2f7dmshec218d5aed25c05p118058jsn8e8659f165da",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const searchArtist = () => {
  var list = document.getElementById("modal-list");
  list.innerHTML = "";
  let counter = document.getElementById("counter");
  counter.innerHTML = "";
  document.getElementById("song-list").innerHTML = "";
  let artist = document.getElementById("artist-input").value;
  console.log(artist);

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`,
    options
  )
    .then((response) => response.json())
    .then((response) => renderArtists(response))
    .catch((err) => console.error(err));
};

const renderArtists = (response) => {
  console.log(response.data);
  let songs = response.data;
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    console.log(song);
    document.getElementById("song-list").innerHTML += ` 
    <div class="card-body col-3">
    <img class="card-img-top" src="${song.album.cover_medium}" alt="Card image cap">
    <h5 class="card-title">${song.title}</h5>
    <h6 class="card-title">${song.album.title}</h6>
  </div>`;
  }
};

const countUniques = () => {
  let artist = document.getElementById("artist-input").value;
  console.log(artist);

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`,
    options
  )
    .then((response) => response.json())
    .then((response) => countFunction(response))
    .catch((err) => console.error(err));
};

const countFunction = (response) => {
  let uniqueAlbums = [];
  let songs = response.data;
  for (let song of songs) {
    if (uniqueAlbums.includes(song.album.title)) {
    } else {
      uniqueAlbums.push(song.album.title);
    }
  }
  console.log(uniqueAlbums.length);
  console.log(response.data.length);
  let searchbox = document.getElementById("search-box");
  let counter = document.createElement("h6");
  counter.id = "counter";
  counter.innerText = `${response.data.length} songs from ${uniqueAlbums.length} unique albums`;
  searchbox.appendChild(counter);
};

const songList = () => {
  let artist = document.getElementById("artist-input").value;
  console.log(artist);

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`,
    options
  )
    .then((response) => response.json())
    .then((response) => renderModal(response))
    .catch((err) => console.error(err));
};

const renderModal = (response) => {
  var list = document.getElementById("modal-list");
  let songs = response.data;

  for (let song of songs) {
    list.innerHTML += ` <li>${song.title}</li>`;
  }
};
