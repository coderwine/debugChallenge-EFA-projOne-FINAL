const zomURL = 'https://developers.zomato.com/api/v2.1'; //? 1) URL is incomplete

// API KEY setup
const zomHead = {  //? 2) key needs to be stored in header
    headers: {
        'user-key' : zomKey
    }
}

// DISPLAY
let getFood = (data) => {

    let collections = data.collections;
    let cycle = []

    // CLEAN UP
    while(foodMain.firstChild) {  //? 3) while conditional / remove method not properly written out.
        foodMain.firstChild.remove();
    }

    // Randomly pulls 3 items from the collections array within Zomato and stores the values.  These values will be used for our display.
    function cyclePush() {

        let randomPOS = Math.floor(Math.random() * collections.length);  //? 4) - Math.floor() removed

        posFun(randomPOS);
    }

    // Checks if cycle length is 3 or less for displaying
    cycle.length < 4 ? cyclePush() : null;

    // Checks to see if duplicates exist and corrects if there are any.
    function posFun(num) {  //? 5) if/else conditionals not checking parameter being passed.
        if(cycle.length === 2) {
            num !== cycle[1] || num !== cycle[0] ? cycle.push(num) : cyclePush();
        } else if (cycle.length === 1) {
            num !== cycle[0] ? cycle.push(num) : null;
            cyclePush();
        } else if (cycle.length === 0) {
            cycle.push(num)
            cyclePush();
        } else {
            null;
        }
    }

    // Checks to see if Collections Array has less than 3 values.
    collections.length >= 3 ? cyclePush() : collections.length === 2 ? cycle.push(0) && cycle.push(1) : collections.length === 1 ? cycle.push(0) : null; 
    
    // Builds 3 collection cards for city
    for(let j = 0; j < cycle.length; j++) {  //? 6) forLoop starts at 5 - conditional won't return true.
        let cyclePOS = cycle[j];

        // SET VARIABLES:
        let foodImg = collections[cyclePOS].collection.image_url;
        let foodShare = collections[cyclePOS].collection.share_url;
        let foodTitle = collections[cyclePOS].collection.title;

        // CREATE
        let resLink = document.createElement('a');
        let resDiv = document.createElement('div');
        let resTitle = document.createElement('h4');

        // ATTRIBUTES
        resLink.href = foodShare;
        resLink.alt = foodTitle;
        resLink.target = '_blank';
        resDiv.className = 'rest-Images';
        resDiv.alt = foodTitle;
        resDiv.style = `
            background-image: url(${foodImg});
        `;
        resTitle.innerText = foodTitle;

        // BUILD
        resDiv.appendChild(resTitle);
        resLink.appendChild(resDiv);
        foodMain.appendChild(resLink); //? 7) missing - not appending to foodMain
    }

}

// FETCH

async function zomFetch() {

    // SET VARIABLES
    let zomCityId;

    let loc = cityLocation;
    let foodURL = `${zomURL}/cities?q=${loc}`;

    // Seeks location to find ID
    let restCity = await fetch(foodURL, zomHead);
    let zomRes = await restCity.json();

    let zomArr = zomRes.location_suggestions;  //? 8) Not drilling into location_suggestions

    // Once ID is found, stored to use in new URL
    zomArr.length === 0 ? zomCityId = null : zomCityId = zomArr[0].id;

    if(zomCityId === null) {
        noCollection(loc);

    } else {
        let reviewURL = `${zomURL}/collections?city_id=${zomCityId}`;
        let revFetch = await fetch(reviewURL, zomHead);
        let revRes = await revFetch.json();

        getFood(revRes);  //? 9) missing
    }
        
}

// IF NO COLLECTIONS EXIST IN CITY
function noCollection(city) {
    setTimeout(() => {
        alert(`${city} does not have any restuarants listed.`);
    }, 1000) //? 10) Time measurement missing
}

