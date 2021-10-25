//variables
const auth = "563492ad6f91700001000001a911b1722c4b44108764f2165c86e2c3";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

//functions
function updateInput(e) {
  searchValue = e.target.value;
}

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated/?page=1&per_page=15",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search/?page=1&per_page=15&query=${query}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
