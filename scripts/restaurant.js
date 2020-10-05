//Documentation: https://developers.zomato.com/api#headline1

const zomKey = '9262491e575911ed73c7c6774571941d';
const zomURL = 'https://developers.zomato.com/api/v2.1';

const zomHead = {
    headers: {
        'user-key' : zomKey
    }
}

// console.log(foodMain);

// DISPLAY
let getFood = (data) => {
    console.log('getFood: ', data.collections);
    let collections = data.collections;
    let cycle = []

    // CLEAN UP
    while(foodMain.firstChild) {
        foodMain.firstChild.remove();
    }

    //TODO: Need to account for cities that have no collections available. Account for cities that have less than 3 / 2 responses.
    for(let i = 0; i < 3; i++) {
        let randomPOS = Math.floor(Math.random() * collections.length);

        let posFunc = () => {
            i === 2 && cycle[0] != randomPOS && cycle[1] != randomPOS ?
            cycle.push(randomPOS) : i === 1 && cycle[1] != randomPOS ? 
            cycle.push(randomPOS) : cycle.push(randomPOS);

        // console.log('Cycle: ', cycle);
        // console.log('Loop Index: ', i);
        // console.log('Rando: ', randomPOS);
        // console.log('Cycle POS -1: ', cycle[i]);
        }

        posFunc();

    }
    
    console.log('After loop: ', cycle);

    for(let j = 0; j < cycle.length; j++) {
        let cyclePOS = cycle[j];
        // console.log(cyclePOS);
        // console.log(collections[cyclePOS].collection.image_url);
        // console.log(collections[cyclePOS].collection.share_url);
        // console.log(collections[cyclePOS].collection.title);

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
        resDiv.style = `
            background-image: url(${foodImg});
        `;
        resTitle.innerText = foodTitle;

        // BUILD
        resDiv.appendChild(resTitle);
        resLink.appendChild(resDiv);
        foodMain.appendChild(resLink);
    }

}

// FETCH

async function zomFetch() {

    // SET VARIABLES
    let zomCityId;

    let loc = cityLocation;
    let foodURL = `${zomURL}/cities?q=${loc}`;

    let restCity = await fetch(foodURL, zomHead);
    let zomRes = await restCity.json();
    // console.log('zomRes: ', zomRes)

    let zomArr = zomRes.location_suggestions;
    // console.log('zomArr: ', zomArr);

    zomArr.length === 0 ? zomCityId = null : zomCityId = zomArr[0].id;
    // console.log('city ID:', zomCityId);

    if(zomCityId === null) {
        // console.log(`${loc} doesn't have any collections.`);
        noCollection(loc);

    } else {
        let reviewURL = `${zomURL}/collections?city_id=${zomCityId}`;
        let revFetch = await fetch(reviewURL, zomHead);
        let revRes = await revFetch.json();

        getFood(revRes);
    }
        
}

function noCollection(city) {
    console.log(`${city} does not have any collections!`);

    setTimeout(() => {
        alert(`${city} does not have any restuarants listed.`);

        //TODO: add toast from Bootstrap:
        // alert(toast.innerText = `${city} currently doesn't have any restaurants listed.`)
        // toast.innerText = `${city} currently doesn't have any restaurants listed.`
        // $('.toast').toast(toast.innerText = `${city} currently doesn't have any restaurants listed.`);
    }, 1000)
}

