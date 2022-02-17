const container = document.querySelector('#mons');

axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100')
  .then(function (response) {

    // an array of character objects will be stored in this variable. 
    let mons = response.data;
console.log(mons);

    // let's create an array with just the names of the characters (strings only)
    // we will use this array of strings to  populate the autocomplete.
    // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    
    console.log(typeof mons.results);
    const pokemonNames = mons.results.map( pokemon => pokemon.results)
    // const pokemonNames = mons.map( pokemon => pokemon.results)
// const pokemonNames = mons.results.keys(0);
console.log(pokemonNames);

    // create the autocomplete using the character data. 
    const autoCompleteJS = new autoComplete({
      placeHolder: "Search for Pokemon...",
          data: {
              src: pokemonNames
          }
      });
      // whenever a character is selected, 
      // find the character in the characters array,
      // and pass the data along for rendering
      autoCompleteJS.input.addEventListener("selection",  (event) => {
        // using the array filter to locate the character 
        // whose name matches the autocomplete. 
        // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        const [selected] = pokemon.filter( 
            pokemon => pokemon.results.name == event.detail.selection.value 
          ) ;
        renderPokemon(selected); 
      }); 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


  const renderPokemon  = (pokemon) => {

    // reset the contents of the container to remove previous result.
    container.innerHTML = '';
    
    // create a template for character details.
    // popuate it with data 
    let characterDetails = document.createElement('div');
    characterDetails.classList.add('characterDetails'); 
    characterDetails.innerHTML = 
      `<img src="${pokemon.sprites.front_shiny}">
      <p>${pokemon.results.name}</p>`;

    // add everything to the page.
    container.appendChild(characterDetails); 


  }