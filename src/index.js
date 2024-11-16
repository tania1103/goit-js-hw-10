import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector("#breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const error = document.querySelector(".error");

function showLoader(show) {
  loader.classList.toggle("hidden", !show);
}

function showError(show) {
  error.classList.toggle("hidden", !show);
}

function populateBreeds() {
  showLoader(true);
  fetchBreeds()
    .then(breeds => {
      breedSelect.innerHTML += breeds.map(
        breed => `<option value="${breed.id}">${breed.name}</option>`
      ).join("");
      new SlimSelect({ select: "#breed-select" });
    })
    .catch(() => showError(true))
    .finally(() => showLoader(false));
}

function showCatDetails(breedId) {
  showLoader(true);
  catInfo.classList.add("hidden");
  fetchCatByBreed(breedId)
    .then(cat => {
      document.querySelector(".cat-image").src = cat.url;
      document.querySelector(".cat-name").textContent = cat.breeds[0].name;
      document.querySelector(".cat-description").textContent = cat.breeds[0].description;
      document.querySelector(".cat-temperament").textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catInfo.classList.remove("hidden");
    })
    .catch(() => showError(true))
    .finally(() => showLoader(false));
}

breedSelect.addEventListener("change", event => {
  const breedId = event.target.value;
  if (breedId) showCatDetails(breedId);
});

// Initialize
populateBreeds();