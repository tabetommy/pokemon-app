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
    }
];

for (let i=0;i<pokemonList.length;i++){
    //define pokemon name variable
    let name=pokemonList[i].name;
    //defien pokemon height variable
    let height=pokemonList[i].height;
    //printout pokemon name and height with a twist(adding Wow that's big for heights greater than or equal to 2)
    if(height>=2){
        document.write(name + '(height:' + height + ')- Wow that\'s big<br>')
    }else{
        document.write(name + '(height:' + height + ')<br>')
    };
};