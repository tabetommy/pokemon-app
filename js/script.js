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

    //declaration of public functions && Object.keys(newPokemon).length===3 
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
    }

    
    //returning public functions
    return{
        getAll:getAll,
        add:add
    };

    }
    )();


pokemonRepository.getAll().forEach(pokemon=>{
    //define pokemon name variable
    let name=pokemon.name;
    //define pokemon height variable
    let height=pokemon.height;
    //printout pokemon name and height with a twist(adding Wow that's big for heights greater than or equal to 2)
    if(height>=2){
        document.write(name + '(height:' + height + ')- Wow that\'s big<br>')
    }else{
        document.write(name + '(height:' + height + ')<br>')
    };
    })

