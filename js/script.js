let pokemonRepository=(
    function(){
    // declaration of variables
    let pokemonList=[];
    let pokemonContainer=document.querySelector('.pokemon-container');
    let loader=document.querySelector('.loader');
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //declaration of functions 

    function showLoadingMessage(){
        loader.classList.add('showLoading');
        pokemonContainer.style.display = "none";
    };

    function hideLoadingMessage(){
        loader.classList.add('hideLoading');
        pokemonContainer.style.display = "grid";
    };

    function add(newPokemon){
        return pokemonList.push(newPokemon) 
    };

    // populate pokemonList array
    function loadList(){
        showLoadingMessage();
        return fetch(apiUrl).then(function(response){
            return response.json()
        }).then(function(json){
            return json.results.forEach(function(item){
                //loop through and create object for each pokemon
                let pokemon={
                    name:item.name,
                    detailsUrl:item.url
                };
                //add pushes pokemon into pokemonList
                add(pokemon); 
                hideLoadingMessage();
            });
        }).catch(function(e){
            console.error(e);
            hideLoadingMessage();
        })
    };

    //function to handle click event on button in addListItem
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);

        });
    }

    function loadDetails(item){
        let url=item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });

    };
    
 
    function getAll(){
        return pokemonList
    };

    function addListItem(pokemon){
        //select list
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText=pokemon.name;
        button.classList.add('btn-class');
        listItem.append(button);
        pokemonContainer.append(listItem);
        button.addEventListener('click',()=>{showDetails(pokemon)})

    };

    //returning public functions
    return{
        getAll:getAll,
        add:add,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails
    };

    }
    )();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
    });


