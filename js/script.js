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

pokemonList.forEach(pokemon=>{
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
