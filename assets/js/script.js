const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('#pokemonGif');

const pokemonValue = document.querySelector('.form');
const input = document.querySelector('.searchBar');
const previewBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

let pokemonId = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status === 200)  {
            const data = await apiResponse.json();
            return data;
    }


}

const showPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';

        pokemonId = data.id;

    } else {
        pokemonName.innerHTML = 'Não encontrado :('
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }

}

pokemonValue.addEventListener('submit', (event) => {
    event.preventDefault();
    showPokemon(input.value.toLowerCase());
});

previewBtn.addEventListener('click', () => {

    if (pokemonId > 1) {
        pokemonId -= 1;
        showPokemon(pokemonId);
    }
});

nextBtn.addEventListener('click', () => {
    pokemonId += 1;
    showPokemon(pokemonId);
});


showPokemon('1');

