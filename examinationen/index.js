// i den här inlämningsuppgift bestämde jag mig att skriva mina kommentar på engelska så att jag kan 
// berätta om min kod lite snyggare och lättare

const BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/';
const modal = document.querySelector('.modal');
let planets; // Declare planets, planet and planetInfo as global variables
let planet; 
let planetInfo; 

async function getAPIKey() { // in this function I grab a new API key every time the site is initialized by the browser
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST",
   
});
    const data = await response.json();
    return data.key;
}

async function getPlanets() { // in this function I make use of the fetched key and grab required data from the API 
        const key = await getAPIKey();
        
        const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
            headers: { 
                "x-zocom": `${key}`, 
        },
    });

        const data = await response.json();
        planets = data.bodies;
        clickOnPlanets();
        return data;
    }

function showPlanetInfo(planet) { // in this function I grab each planet and differentiate it from the rest

    console.log(planet)
    
    // the code below creates an info card with JSX for each individual object in the solar system
    
    return `
    <article class="planet-info"> 
     
        <h1>${planet.name.toUpperCase()}</h1>
        <h3 class="latin-name">${planet.latinName.toUpperCase()}</h3>
        <h3 class="type">${planet.type.toUpperCase()}</h3>
        <p class="description">${planet.desc}</p>
        <p class="rotation"><b>Rotation:</b> <br>${planet.rotation} D</p>
        <p class="temperature"><b>Temperatur:</b> <br> Högsta: ${planet.temp.day} °C <br> Lägsta: ${planet.temp.night} °C</p>
        <p class="circumference"><b>Omkrets:</b> <br> ${planet.circumference} km</p>
        <p class="distance"><b>Distans från solen:</b> <br> ${planet.distance} km</p>
        <p class="orbital-period"><b>Året har:</b> <br> ${planet.orbitalPeriod} dagar</p>
        <p class="moons-title"><b>Månar:</b> <br><br> <p class="moons">${planet.moons}</p></p> 
        </p>

    </article>`
}

function clickOnPlanets() { // in this function I apply a click event on each planet element (CSS) as well as 
                            // the sun (to which I gave the same class as the rest for convenience reasons)
    const planetsElems = document.querySelectorAll('.planet'); 

    planetsElems.forEach(planet => {
        planet.addEventListener('click', (e) => {
            const name = e.target.getAttribute('id');
            popInfoCard(name)
        });
    });
}

function popInfoCard(planetName) { // in this function I assign classes to a prexisting modal element so that it works as I want it to. 
                                    // I also assign each planet info card to the modal so that it opens the one I want
    const clickedPlanet = planets.find(planet => planet.name.toLowerCase() === planetName); // assigns a variable to respective planet name

    const template = showPlanetInfo(clickedPlanet);

    modal.innerHTML = template;

    modal.classList.add('open');
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) { // this event listener opens the modal upon clicking on an element
            closeInfoCard(); // it also makes use of its closing function
        }
    });
}

function closeInfoCard() { // this function closes the modal
    modal.classList.remove('open')
}

getPlanets();
