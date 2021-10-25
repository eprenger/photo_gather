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
  searchVideos(searchValue);
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

function generateVideos(data) {
  data.videos.forEach((video) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <img src=${video.image}></img>
    <div class="gallery-info" >
    <p><a class="videographer-link" href=${video.user.url} target="_blank">${video.user.name}</a></p>
    <a href=${video.url} target="_blank">Download</a>
    </div>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedVideos() {
  fetchLink = "https://api.pexels.com/videos/popular?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generateVideos(data);
}

async function searchVideos(query) {
  clearSearch();
  fetchLink = `https://api.pexels.com/videos/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generateVideos(data);
}

function clearSearch() {
  gallery.innerHTML = "";
  // searchInput.value = ""; //clears input box of search text (not necessary)
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/videos/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/videos/popular?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generateVideos(data);
}

curatedVideos();
