const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
let film = {};
let characters =[];
let planets = [];

//fetch the film from the id within the url
async function getFilm() {
    let url = `https://swapi2.azurewebsites.net/api/films/${id}`;

    try {
        const fetchedFilm = await fetch(url).then(res => res.json());
        film = fetchedFilm;
        console.log("Film information is ", film);
    } catch(ex) {
        console.error("Error reading the film", ex);
    }
}

//fetch the characters of the film
async function getCharacters() {
    let url = `https://swapi2.azurewebsites.net/api/films/${id}/characters`

    try {
        const fetchedChars = await fetch(url).then(res => res.json());
        characters = [...fetchedChars];
        console.log("characters: ", characters);
    } catch (ex) {
        console.log("Error reading the characters", ex)
    }
}

//fetch the planets of the film
async function getPlanets() {
    let url = `https://swapi2.azurewebsites.net/api/films/${id}/planets`

    try {
        const fetchedPlanets = await fetch(url).then(res => res.json());
        planets = [...fetchedPlanets];
        console.log("Planets: ", planets);
    } catch (ex) {
        console.log("Error reading the planets", ex)
    }
}

//render the film information with the given data
function renderFilm() {
    //general info
    let filmTitle = document.getElementById("name")
    let filmEpisode = document.getElementById("episode")
    let filmRelease = document.getElementById("release")
    let filmDirector = document.getElementById("director")
    filmTitle.textContent = film.title
    filmEpisode.textContent = film.episode_id
    filmRelease.textContent = film.release_date
    filmDirector.textContent = film.director
    
    //show characters
    let charactersList = document.querySelector("#charactersList")
    const divs = characters.map(character => {
        const el = document.createElement('div');
        el.addEventListener('click', () => goToCharacterPage(character.id));
        el.textContent = character.name;
        return el;
      })
      charactersList.replaceChildren(...divs)

    //show planets
    let planetsList = document.querySelector("#planets")
    const div = planets.map(planet => {
        const el = document.createElement('a');
        el.addEventListener('click', () => goToPlanetPage(planet.id));
        el.textContent = planet.name;
        return el
    })
    planetsList.replaceChildren(...div)
}

//reroute logic
const goToCharacterPage = id => window.location = `/character.html?id=${id}`
const goToPlanetPage = id => window.location = `/planet.html?id=${id}`

//call get film once the page reloads
getFilm().then(() => {
    getCharacters().then(() => {
        getPlanets().then(() => {
            renderFilm()
        })
    })
});
