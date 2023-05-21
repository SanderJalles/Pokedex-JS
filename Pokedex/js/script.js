const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const nextPoke = document.querySelector('.button.btn-next');
const prevPoke = document.querySelector('.button.btn-prev');

let searchPokemon = 1



const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    const data = fetchpokemon(pokemon);
    if (data) {
        console.log(data)

        data.then((resultado) => {
            var objeto = resultado.name
            var id = resultado.id
            pokemonImage.style.display = 'block'
            pokemonName.innerHTML = objeto;
            pokemonNumber.innerHTML = id;
            pokemonImage.src = resultado['sprites']['versions']['generation-v']['black-white']['animated'].front_default
            input.value = ''
            searchPokemon = id
            if (
                resultado.sprites &&
                resultado.sprites.versions &&
                resultado.sprites.versions['generation-v'] &&
                resultado.sprites.versions['generation-v']['black-white'] &&
                resultado.sprites.versions['generation-v']['black-white'].animated &&
                resultado.sprites.versions['generation-v']['black-white'].animated['front-default']
            ) {
                pokemonImage.src = resultado.sprites.versions['generation-v']['black-white'].animated['front-default'];
            } else {
                // Lida com o caso em que alguma propriedade está indefinida ou ausente
            }

        }).catch(function(erro){
            pokemonName.innerHTML = 'Not found';
            pokemonImage.style.display = 'none'
        })
    } 


}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})
renderPokemon(searchPokemon)

nextPoke.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})
prevPoke.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})