//variables
const auth = "563492ad6f91700001000001a911b1722c4b44108764f2165c86e2c3";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

//functions
function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <img src=${photo.src.large}></img>
    <div class="gallery-info" >
    <p><a class="photographer-link" href=${photo.photographer_url} target="_blank">${photo.photographer}</a></p>
    <a href=${photo.src.original} target="_blank">Download</a>
    </div>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated/?page=1&per_page=15";
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function searchPhotos(query) {
  clearSearch();
  fetchLink = `https://api.pexels.com/v1/search/?page=1&per_page=15&query=${query}`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

function clearSearch() {
  gallery.innerHTML = "";
  // searchInput.value = ""; //clears input box of search text (not necessary)
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=${currentSearch}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

curatedPhotos();
