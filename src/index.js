const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const msg_error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let storedBreeds = [];

fetch(`https://api.thecatapi.com/v1/breeds`, {
  headers: {
    'x-api-key': 'live_rfV2x2ropS4pZ5RcmVUZYfglPKyBOu57OibpbNegtVBoRk8GypFOoEC6eJdhhhQw',
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
    msg_error.style.display = 'block';
  });

function showBreedImage(index) {
  const breed = storedBreeds[index];
  catInfo.innerHTML = `
    <img src="${breed.image.url}" id="breed_image" />
    <p id="breed_json">${breed.temperament}</p>
    <a id="wiki_link" href="${breed.wikipedia_url}">${breed.wikipedia_url}</a>
  `;
}

breedSelect.addEventListener('change', function () {
  const selectedIndex = breedSelect.value;
  showBreedImage(selectedIndex);
});

