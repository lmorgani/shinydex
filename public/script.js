// This code was adapted from the Bob's Burgers Search code (https://github.com/nsitu/BobsBurgersSearch)

const container = document.querySelector('#mons');

axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000')
  .then(function (response) {

    // an array of character objects will be stored in this variable. 
    let mons = response.data;

console.log(mons);

    // let's create an array with just the names of the characters (strings only)
    // we will use this array of strings to  populate the autocomplete.
    // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    
    console.log(typeof mons.results);
    const pokemonNames = mons.results.map( pokemon => pokemon.name)
    // const pokemonNames = mons.map( pokemon => pokemon.results)
// const pokemonNames = mons.results.keys(0);
console.log(pokemonNames);

    // create the autocomplete using the character data. 
    const autoCompleteJS = new autoComplete({
      placeHolder: "Search for Pokémon...",
          data: {
              src: pokemonNames
          },
          // This code is from https://tarekraafat.github.io/autoComplete.js/ to target the number of results given in the autocomplete dropdown.
      resultsList: {
          maxResults: 15,
    }
  });
      

            // whenever a character is selected, 
      // find the character in the characters array,
      // and pass the data along for rendering
      autoCompleteJS.input.addEventListener("selection",  (event) => {
        // using the array filter to locate the character 
        // whose name matches the autocomplete. 
        // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
       
        const [selected] = mons.results.filter( 
            pokemon => pokemon.name == event.detail.selection.value 
          ) ;
          console.log(selected);
        // pokemonNames.includes(event.detail.selection.value)
        // console.log(pokemonNames.includes(event.detail.selection.value))
        // let test = pokemonNames.get(event.detail.selection.value)
        // console.log(test)
        renderPokemon(selected); 

      }); 

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  const renderPokemon  = (pokemon) => {
    console.log(pokemon)

    axios.get(pokemon.url)
    .then(function (response) {
console.log(response.data)
let pokemon = response.data
let endpoint = pokemon.location_area_encounters

axios.get(endpoint)
.then(function (response) {
let encounters = response.data
console.log(encounters)
// reset the contents of the container to remove previous result.
container.innerHTML = '';
    
// create a template for character details.
// popuate it with data 
let characterDetails = document.createElement('div');
characterDetails.classList.add('characterDetails');

// Used toUpperCase() from https://www.w3schools.com/jsref/jsref_touppercase.asp to try and change the display name of the Pokemon.
// let str = pokemon.name;
// let test = str.toUpperCase();

let imageblock = 
  `<p class="name">${pokemon.name}</p>
  <img class="pokepic" src="${pokemon.sprites.other.home.front_shiny}">
  `;
  for (type of pokemon.types) {
    console.log(type)
    imageblock +=  `
    <div class="widget types">
    <label>Type:</label>
    <p class="type">${type.type.name}
    </p>
    </div>`;
  }
  // for (ability of pokemon.abilities) {
  //   console.log(ability)
  //   imageblock += `<p class="ability">${ability.ability.name}</p>`;
  // }
  for (encounter of encounters) {
    console.log(encounter)
    imageblock += `
    <div class="widget types">
    <label>Location:</label>
    <p class="location">${encounter.location_area.name} <br> Encounter Chance: ${encounter.version_details[0].encounter_details[0].chance}%</p>
    </div>
    `;
  }
  characterDetails.innerHTML = imageblock

// add everything to the page.
container.appendChild(characterDetails);
    })

  })

  

  }