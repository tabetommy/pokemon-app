let pokemonRepository = (function () {
  let pokemonList = [];
//   let loader = document.querySelector('.loader');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=90';

  /* function showLoadingMessage(){
        loader.classList.add('showLoading');
        pokemonContainer.style.display = "none";
    };

    function hideLoadingMessage(){
        loader.classList.add('hideLoading');
        pokemonContainer.style.display = "grid";
    };*/

  // push pokemons from loadlist into pokemonList var
  function add(newPokemon) {
    return pokemonList.push(newPokemon);
  }

  // populate pokemonList array
  function loadList() {
    // showLoadingMessage();
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
          //hideLoadingMessage();
        });
      })
      .catch(function (e) {
        console.error(e);
        //hideLoadingMessage();
      });
  }

  //function to handle click event on button in addListItem
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let name = pokemon.name;
      let height = pokemon.height;
      let type = pokemon.types[0].type.name;
      let imageUrl = pokemon.imageUrl;
      loadModal(name, height, type, imageUrl);
    });
  }

  //pass data to modal dynamically
  function loadModal(name, height, type, imageUrl) {
    //selecting html modal elements
    let exampleModalLabel = document.querySelector('#exampleModalLabel');
    let pokemonImg = document.querySelector('#image');
    let pokemonHeight = document.querySelector('#height');
    let pokemonType = document.querySelector('#type');

    exampleModalLabel.innerText = name;
    pokemonImg.src = imageUrl;
    pokemonHeight.innerText = `Height: ${height}`;
    pokemonType.innerText = `Type: ${type}`;
  }

  // fetches pokemon details from the details url and assigns it to an object item
  function loadDetails(item) {
    let url = item.detailsUrl;
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
    let pokemonContainer = document.querySelector('#pokemon-container');
    let pokemonDiv = document.querySelector('#pokemon-div');
    let button = document.createElement('button');
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
    // myFunction:myFunction
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
    let name = pokemonName.textContent.toLowerCase();
    //show if searchQuery is contained in name of pokemon within button
    if (name.includes(searchQuery)) {
      pokemonName.style.display = 'block';
    } else {
      pokemonName.style.display = 'none';
    }
  }
}

search.addEventListener('keyup', searchFunction);
