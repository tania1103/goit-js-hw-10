import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_n26W6k4t9GkAjuraq0tPENrlvIKev0dhksy7P3E7lyiHnqF3jK03jYNi1XR8GnLq';

export function fetchBreeds() {
  document.querySelector('p.loader').classList.remove('hidden');
  document.querySelector('select.breed-select').classList.add('hidden');
  document.querySelector('p.error').classList.add('hidden');

  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      document.querySelector('p.loader').classList.add('hidden');
      document.querySelector('select.breed-select').classList.remove('hidden');
      return response.data;
    })
    .catch(error => {
      document.querySelector('p.loader').classList.add('hidden');
      document.querySelector('p.error').classList.remove('hidden');
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  document.querySelector('p.loader').classList.remove('hidden');
  document.querySelector('div.cat-info').classList.add('hidden');
  document.querySelector('p.error').classList.add('hidden');

  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      document.querySelector('p.loader').classList.add('hidden');
      document.querySelector('div.cat-info').classList.remove('hidden');
      return response.data[0];
    })
    .catch(error => {
      document.querySelector('p.loader').classList.add('hidden');
      document.querySelector('p.error').classList.remove('hidden');
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}