let pokemonRepository=(
    function(){

    //1.1 declaration of variables
    let pokemonList=[];
    let pokemonContainer=document.querySelector('.pokemon-container');
    let loader=document.querySelector('.loader');
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';


    //1.2 declaration of functions 

   /* function showLoadingMessage(){
        loader.classList.add('showLoading');
        pokemonContainer.style.display = "none";
    };

    function hideLoadingMessage(){
        loader.classList.add('hideLoading');
        pokemonContainer.style.display = "grid";
    };*/

    function add(newPokemon){
        return pokemonList.push(newPokemon) 
    };

    // populate pokemonList array
    function loadList(){
       // showLoadingMessage();
        return fetch(apiUrl).then(function(response){
            return response.json()
        }).then(function(json){
            return json.results.forEach(function(item){
                //loop through and create object for each pokemon
                let pokemon={
                    name:item.name,
                    detailsUrl:item.url
                };
                //console.log(`here:${pokemon.detailsUrl}`)
                //add pushes pokemon into pokemonList
                add(pokemon); 
                //hideLoadingMessage();
            });
        }).catch(function(e){
            console.error(e);
            //hideLoadingMessage();
        })
    };

    //function to handle click event on button in addListItem
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            let name=pokemon.name;
            let height=pokemon.height;
            let type=pokemon.types[0].type.name;
            let imageUrl=pokemon.imageUrl
            loadModal(name,height,type,imageUrl);
        });
    }

    //pass data to modal dynamically
    function loadModal(name,height,type,imageUrl){

          let exampleModalLabel=document.querySelector('#exampleModalLabel');
          let pokemonImg=document.querySelector('#image');
          let pokemonHeight=document.querySelector('#height');
          let pokemonType=document.querySelector('#type');
          

          exampleModalLabel.innerText=name;
          pokemonImg.src=imageUrl;
          pokemonHeight.innerText=`Height: ${height}`;
          pokemonType.innerText=`Type: ${type}`;
    }





    function loadDetails(item){
        let url=item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            //console.log(`height here: ${item.imageUrl}`)
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
        let listClassArray=['group-list-item','d-flex','justify-content-center',
        'align-items-center','my-2']
        listItem.classList.add(...listClassArray);
        let button = document.createElement('button');
        button.innerText=pokemon.name;
        //button.classList.add('btn-class');
        let btnClassArray=['btn','btn-primary','btn-lg']
        button.classList.add(...btnClassArray);
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target','#exampleModal');
        listItem.append(button);
        pokemonContainer.append(listItem);
        button.addEventListener('click',()=>{showDetails(pokemon)})

    };

    // //hide Modal function
    // function hideModal() {
    //     let modalContainer = document.querySelector('#modal-container');
    //     modalContainer.classList.remove('is-visible');
    // };

    // //show modal
    // function showModal(name,height,type,imageUrl){

    //     // let mainModalContainer=document.querySelector('#exampleModal');
    //     // mainModalContainer.innerHTML='';



    //     let modalContainer=document.querySelector('#modal-container');
    //     //clear modal container content
    //     modalContainer.innerHTML='';

    //     let modal=document.createElement('div');
    //     modal.classList.add('modal');

    //     let modalHeader=document.createElement('div');
    //     modalHeader.classList.add('modal-header');

    //     let closeButtonElement=document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText='Close';
    //     closeButtonElement.addEventListener('click',hideModal);

    //     let titleElement = document.createElement('h1');
    //     titleElement.innerText = name; 

    //     let modalDetails=document.createElement('div');
    //     modalDetails.classList.add('modal-details');


    //     //fetch pokemon images
    //     function fetchPokemonImage(){
    //         console.log(imageUrl)
    //         return fetch(imageUrl)
    //         .then(function(response){
    //             return response.json();
    //         })
    //         .then(function(image){
    //             console.log(image)
    //           pokemonImgUrl(image);
    //         })
    //         .catch(function(error){
    //             console.error(error)
    //         });
    //     };
          

    //     function pokemonImgUrl(image){
    //         let pokemonImg=document.createElement('img');
    //         pokemonImg.src=imageUrl;
    //         pokemonImg.alt=image;
    //         return pokemonImg
    //     };
        

    //     let modalSpecs=document.createElement('div');
    //     modalSpecs.classList.add('modal-specifications');


    //     let pokemonHeight = document.createElement('p');
    //     pokemonHeight.innerText = `Height: ${height}`;

    //     let pokemonType = document.createElement('p');
    //     pokemonType.innerText = `Type: ${type}`;

    //     modalHeader.appendChild(titleElement);
    //     modalHeader.appendChild(closeButtonElement);
        

    //     modalSpecs.appendChild(pokemonHeight);
    //     modalSpecs.appendChild(pokemonType);

    //     modalDetails.appendChild(pokemonImgUrl());
    //     modalDetails.appendChild(modalSpecs)

    //     modal.appendChild(modalHeader);
    //     modal.appendChild(modalDetails);
        

    //     modalContainer.appendChild(modal);


    //     modalContainer.classList.add('is-visible');
    // };

     
    // // hide modal implementation for escape key event
    // window.addEventListener('keydown', (e) => {
    //     let modalContainer = document.querySelector('#modal-container');
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //       hideModal();  
    //     }
    //   })
  
    // //hide modal implementation for clicking out of modal event
    // document.querySelector('#modal-container').addEventListener('click', (e) => {
    //     // Since this is also triggered when clicking INSIDE the modal We only want to close if the user clicks directly on the overlay
    //     let target = e.target;
    //     if (target === document.querySelector('#modal-container')) {
    //       hideModal();
    //     }
    //   });
  

    //returning public functions
    return{
        getAll:getAll,
        add:add,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
    };

    }
    )();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
    });


