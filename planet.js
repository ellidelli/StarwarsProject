let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let charactersUl;
let filmsUl

const baseUrl = `https://swapi.online/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    surfaceWaterSpan = document.querySelector('span#surfaceWater');
    diameterSpan = document.querySelector('span#diameter');
    rotationPeriodSpan = document.querySelector('span#rotationPeriod');
    terrainSpan = document.querySelector('span#terrain');
    gravitySpan = document.querySelector('span#gravity');
    orbitalPeriodSpan = document.querySelector('span#orbitalPeriod');
    populationSpan = document.querySelector('span#population');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id);
  });

  async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id)
        planet.characters = await fetchCharacters(planet)
        planet.films = await fetchFilms(planet)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }

  async function fetchPlanet(id) {
    let planetURL = `${baseUrl}/planets/${id}`;
    return await fetch(planetURL)
      .then(res => res.json())
  }

  async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const character = await fetch(url)
      .then(res => res.json())
    return character;
  }

  async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }

  const renderPlanet = planet => {
    // About plant
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    surfaceWaterSpan.textContent = planet?.surface_water;
    diameterSpan.textContent = planet?.diameter;
    rotationPeriodSpan.textContent = planet?.rotation_period;
    terrainSpan.textContent = planet?.terrain;
    gravitySpan.textContent = planet?.gravity;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    populationSpan.textContent = planet?.population;
    // Characters
    const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterLis.join("")
    // Films
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("")

  }