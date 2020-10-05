// Documentation: https://weatherstack.com/documentation
const weatherAPI = 'http://api.weatherstack.com/current';
const key = '66414ad6f05cff8b25112a864c5779e8';

// GLOBAL VARIABLES
let weatherURL;
let search;

// LOCATION
// const form = document.querySelector('form');
const formInput = document.getElementById('cityInput');

let weatherFetch = () => {

    search = formInput.value;
    weatherURL = `${weatherAPI}?access_key=${key}&query=${search}`;

    async function weather() {
        let res = await fetch(weatherURL);
        let data = await res.json();
        weatherCard(data);
    }

    weather()
    
    cityLocation = search;
}

function weatherCard(apiData) {
    console.log(apiData);
    formInput.value = '';

    // VARIABLES
    let location = apiData.location;
    let current = apiData.current;
    let fahDeg = 32;
    let temp = current.temperature + fahDeg
    let fLike = current.feelslike + fahDeg
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
    
    // BACKGROUND
    // switch(true) {
    //     case prec > 75 && Math.floor(temp) < 32:
    //         jumbo.style = 'background: url(../assets/01-coldSnow.jpg)';
    //         break;
    //     case prec > 75 && Math.floor(temp) < 75:
    //         jumbo.style = 'background: url(../assets/02-warmRain.jpg)';
    //         break;
    //     case prec > 75 && Math.floor(temp) > 75:
    //         jumbo.style = 'background: url(../assets/03-summerRain.jpg)';
    //         break;
    //     case Math.floor(temp) < 32:
    //         jumbo.style = 'background: url(../assets/04-winter.jpg)';
    //         break;
    //     case Math.floor(temp) < 75:
    //         jumbo.style = 'background: url(../assets/05-spring.jpg)';
    //         break;
    //     case Math.floor(temp) > 75:
    //         jumbo.style = 'background: url(../assets/06-summer.jpg)';
    //         break;
    //     default:
    //         jumbo.style = 'background: url(../assets/baseBG-IMG.jpg)';
    //         break;
    // }

    // CLEANUP
    while(mainCard.firstChild) {
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
    `;

    // INPUT VALUES
    header.innerText = current.weather_descriptions[0];

    // BUILD CARD
    imgDiv.appendChild(cardImg);
    cardDiv.appendChild(imgDiv);
    bodyDiv.appendChild(header);
    bodyDiv.appendChild(ul);
    cardBodyDiv.appendChild(bodyDiv);
    cardDiv.appendChild(cardBodyDiv);
    mainCard.appendChild(cardDiv);

}

function background() {

}
/*
TODO:
    - temp < 32F - cold image *done
    - temp > 32F but < 75 - "Spring Iamge" *done
    - temp > 75 - "Summer Image"  *done
    - rain > 75% & temp < 32 - "Cold Rainy Image" *done
    - rain > 75% & temp > 32 < 75 - "Spring Rain" *done
    - rain > 75% & temp > 75 "Hot Rain" *done
    - base image *done
    - win image *done
*/