import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  function showError() {
    error.style.display = 'block';
  }

  function hideError() {
    error.style.display = 'none';
  }

  function populateBreeds(breeds) {
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  }

  function displayCatInfo(cat) {
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
  }

  breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;
    if (!breedId) return;

    showLoader();
    hideError();
    catInfo.innerHTML = '';

    fetchCatByBreed(breedId)
      .then(cat => {
        displayCatInfo(cat);
        hideLoader();
      })
      .catch(() => {
        showError();
        hideLoader();
      });
  });

  showLoader();
  fetchBreeds()
    .then(breeds => {
      populateBreeds(breeds);
      hideLoader();
    })
    .catch(() => {
      showError();
      hideLoader();
    });
});
