const weatherAPI = 'http://api.weatherstack.com/current'; //? 1) no const for URL

//? 2) No API Key variable

// GLOBAL VARIABLES
let weatherURL;
let search;

// LOCATING ELEMENTS
const formInput = document.getElementById('cityInput'); //? 3) 'cityInput is #cityInput'

let weatherFetch = () => {

    search = formInput.value;
    weatherURL = `${weatherAPI}?access_key=${key}&query=${search}`;

    async function weather() {
        let res = await fetch(weatherURL); 
        let data = await res.json();
        //? 4) missing await in both res and data variables

        weatherCard(data);
    }

    weather()
    
    cityLocation = search;
}

function weatherCard(apiData) {

    formInput.value = '';
    wCardDisplay.style = 'display: visible';
    //? 5) wCardDisplay.style is set to "revisible" instead of visible

    // VARIABLES
    let location = apiData.location;
    let current = apiData.current;
    let fahDeg = 32;
    let temp = current.temperature * 1.8 + fahDeg;
    let fLike = current.feelslike * 1.8 + fahDeg;
    //? 6) temp/fLike not calculating C to F conversion
    let precip = apiData.current.precip;

    //  CREATE / LOCATE
    const city = document.getElementById('jumboCity');
    const mainCard = document.querySelector('.displayCard');
    const cardDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardBodyDiv = document.createElement('div');
    const bodyDiv = document.createElement('div');
    const header = document.createElement('h5');
    const ul = document.createElement('ul');
    
    //!TESTING - keeping in main build
    // temp = 80;
    // precip = 80;
    // console.log('Temp:', temp);
    // console.log('Perc:', precip);

    // Swapping background image in Jumbotron depending on the weather conditions provide.  Very basic.
    switch(true) {
        //? 7) setAttributes has "styles" instead of "style"
            case precip >= 75 && temp < 33:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/01-coldSnow.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case precip >= 75 && temp <= 75:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/02-warmRain.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case precip >= 75 && temp > 75:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/03-summerRain.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case temp < 33:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/04-winter.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
                )
                break;
            case temp < 75:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/05-spring.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case temp > 75:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/06-summer.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            default:
                jumbo.setAttribute(
                    'style', 
                    'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
    }

    // CLEANUP
    while(mainCard.firstChild) {
        //? 8) has console.log(mainCard.firstChild) instead of remove()
        mainCard.firstChild.remove();
    }    

    // ATTRIBUTES
    city.innerText = `${location.name}, ${location.region}`;
    cardDiv.className = ' row no-gutters';
    imgDiv.className = 'col-md-4';
    cardImg.className = 'card-img';
    cardImg.src =  current.weather_icons[0];
    cardImg.alt = current.weather_descriptions[0];
    cardBodyDiv.className = 'col-md-8';
    bodyDiv.className = 'card-body';
    header.className = 'card-title';
    ul.innerHTML = `
        <li>Temp:       ${temp.toFixed(1)} &#x2109;</li>
        <li>Feels Like: ${fLike.toFixed(1)} &#x2109;</li>
        <li>Humidity:   ${current.humidity}%</li>
        <li>UV Index:   ${current.uv_index}</li>
        <li>Wind Dir:   ${current.wind_dir}</li>
    `;  //? 9) Humidity - Wind Dir doesn't have <current.> for their values.

    // INPUT VALUES
    header.innerText = current.weather_descriptions[0];

    // BUILD CARD
    imgDiv.appendChild(cardImg);
    cardDiv.appendChild(imgDiv);
    bodyDiv.appendChild(header);
    bodyDiv.appendChild(ul);  //? 10) not appending <ul> to bodyDiv
    cardBodyDiv.appendChild(bodyDiv);
    cardDiv.appendChild(cardBodyDiv);
    mainCard.appendChild(cardDiv);

    // When it is ok to search weatherstack again, the background will switch back to the main background image of Puzzles Pieces.    
    setInterval(() => {
        jumbo.setAttribute(
            'style', 
            'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
        )
    }, 65000); // 1 min 5 secs
    //? 11*) Removed setInterval from Broken only to see if they will incorporate anything.
}
