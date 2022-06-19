const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';

    function hideLoadingMessage(){
        const loadingMessage = document.querySelector('.load');
        loadingMessage.classList.add('hide')   
    };

  // push pokemons from loadlist into pokemonList var
  function add(newPokemon) {
    return pokemonList.push(newPokemon);
  }

  // populate pokemonList array
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json.results.forEach(function (item) {
          //loop through and create object for each pokemon
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          //add pushes pokemon into pokemonList
          add(pokemon);
          hideLoadingMessage();
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //function to handle click event on button in addListItem
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      const name = pokemon.name;
      const height = pokemon.height;
      const type = pokemon.types[0].type.name;
      const imageUrl = pokemon.imageUrl;
      loadModal(name, height, type, imageUrl);
    });
  }

  //pass data to modal dynamically
  function loadModal(name, height, type, imageUrl) {
    //selecting html modal elements
    const exampleModalLabel = document.querySelector('#exampleModalLabel');
    const pokemonImg = document.querySelector('#image');
    const pokemonHeight = document.querySelector('#height');
    const pokemonType = document.querySelector('#type');

    exampleModalLabel.innerText = name;
    pokemonImg.src = imageUrl;
    pokemonHeight.innerText = `Height: ${height}`;
    pokemonType.innerText = `Type: ${type}`;
  }

  // fetches pokemon details from the details url and assigns it to an object item
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //return pokemon list array
  function getAll() {
    return pokemonList;
  }

  //creates and renders a div containing pokemon on the dom
  function addListItem(pokemon) {
    const pokemonContainer = document.querySelector('#pokemon-container');
    const pokemonDiv = document.querySelector('#pokemon-div');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-name');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    pokemonDiv.append(button);
    pokemonContainer.append(pokemonDiv);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  //returning public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
   
  };
})();

//iterate poemon array and render in HTML
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().map(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// search and display pokemon by value of input
function searchFunction(event) {
  const search = document.getElementById('search');
  const pokemonNames = document.getElementsByClassName('pokemon-name');
  const { value } = event.target;
  const searchQuery = value.toLowerCase();
  for (const pokemonName of pokemonNames) {
    const name = pokemonName.textContent.toLowerCase();
    //show if searchQuery is contained in name of pokemon within button
    if (name.includes(searchQuery)) {
      pokemonName.style.display = 'block';
    } else {
      pokemonName.style.display = 'none';
    }
  }
}

search.addEventListener('keyup', searchFunction);


