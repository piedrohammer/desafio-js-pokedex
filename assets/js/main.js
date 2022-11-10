const content = document.getElementById('content')
const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('load-more');
const maxRecords = 151;
const limit = 10;
let offset = 0;
let pokemon = "squirtle";

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons)
        const newHtml = pokemons.map((pokemon) => `
            <a class="pokemon-info" href="#${pokemon.name}">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            </a>
        `).join('');
        pokemonList.innerHTML += newHtml
    });

    window.addEventListener("hashchange", pokemonInfo);

    function pokemonInfo() {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            console.log(window.location.hash)
            if (window.location.hash == '') {
                location.reload(true)
            }

            const pokemonFilter = pokemons.filter(function (el) {
                return `#${el.name}` == window.location.hash
            });

            console.log(pokemonFilter);

            const pokemon = pokemonFilter.map((pokemon) => `
                <section class="detail-content ${pokemon.type}">
                    <a class="detail-return" href=""><i class="fa-solid fa-arrow-left"></i></a>
                    <div class="detail-header">
                        <div class="detail-name-type">
                            <h1>${pokemon.name}</h1>
                            ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                        </div>
                        <div class="detail-poke-number">
                            <span class="detail-number">#${pokemon.number}</span>
                        </div>
                    </div>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    <div class="detail-box">
                        <h4>About</h4>
                        <p>Species <b>${pokemon.name}</b></p>
                        <p>Height <b>${pokemon.name}</b></p>
                        <p>Weight <b>${pokemon.name}</b></p>
                        <p>Abilities <b>${pokemon.name}</b></p>
                        <h4>About</h4>
                        <p>Egg Groups <b>${pokemon.name}</b></p>
                        <p>Egg Cycle <b>${pokemon.name}</b></p>
                    </div>
                </section>
            `).join('');

            content.innerHTML = pokemon;
        })
    }
};


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})