import Notiflix from 'notiflix';

const API_URL = `https://api.thecatapi.com/v1/breeds`;
const API_KEY = 'live_rfV2x2ropS4pZ5RcmVUZYfglPKyBOu57OibpbNegtVBoRk8GypFOoEC6eJdhhhQw';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const msg_error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const textError = msg_error.textContent;
msg_error.style.display = 'none'

let storedBreeds = [];

fetch(API_URL, {
  headers: {
    'x-api-key': API_KEY,
  },
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    data = data.filter(img => img.image?.url != null);
    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      if (!breed.image) continue;

      option.value = i;
      option.innerHTML = `${breed.name}`;
      breedSelect.appendChild(option);
    }

    showBreedImage(0);
    loader.style.display = 'none';
    msg_error.style.display = 'none'
    breedSelect.style.display = 'block';
  })
  .catch(function (error) {
    console.log(error);
    loader.style.display = 'none';
    Notiflix.Notify.failure(textError);
  });
  
  function showBreedImage(index) {
    const breed = storedBreeds[index];
    catInfo.innerHTML = `
      <img src="${breed.image.url}" class="breed_image" />
      <div class="breed-details">
      <p class="breed_name">${breed.name}</p>
      <p class="breed_description" href="${breed.wikipedia_url}">${breed.description}</p>
      <p class="breed_json">${breed.temperament}</p>
      </div>`;
  }
  
  breedSelect.addEventListener('change', function () {
    const selectedIndex = breedSelect.value;
    showBreedImage(selectedIndex);
  });

