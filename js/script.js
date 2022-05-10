let pokemonRepository=(
    function(){

        let pokemonList=[
    {
        name:'Bulbasaur',
        height:0.7,
        types:'grass'
    },
    {
        name:'Ivysaur',
        height:1,
        types:'poison'
    },
    {
        name:"Venusaur",
        height:2,
        types:'monster'
    },
    {
        name:"Charmander",
        height:2.5,
        types:'Lizard'
    }
    ];

    //comparing two arrays if they are equal(for validation purposes)
    function areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }

          return false;
        });
      }

      return false;
    }

    

    //declaration of public functions  
    function getAll(){
        return pokemonList
    };

    function add(newPokemon){
        //validation
        if(typeof newPokemon==='object' && newPokemon.constructor === Object && areEqual(Object.keys(pokemonList[0]),Object.keys(newPokemon[0]))){
          return pokemonList.push(newPokemon)  
        }else{
            console.log('Input is not an object or it\'s not equal to the object key properties of pokemonList.' )
        }   
    };

    function addListItem(pokemon){
        //define pokemon name variable 
        let name=pokemon.name;
        //select list
        let pokemonList= document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText=name;
        button.classList.add('btn-class');
        listItem.append(button);
        pokemonList.append(listItem);
        button.addEventListener('click',()=>{showDetails(pokemon)})

    };

    //function to handle click event on button in addListItem
    function showDetails(pokemon){
        console.log(pokemon.name)
    }

    
    //returning public functions
    return{
        getAll:getAll,
        add:add,
        addListItem:addListItem,
    };

    }
    )();


pokemonRepository.getAll().forEach(pokemon=>{
    pokemonRepository.addListItem(pokemon)
    })

