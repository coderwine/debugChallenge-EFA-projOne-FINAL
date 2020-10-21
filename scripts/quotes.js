const progURL = 'https://programming-quotes-api.herokuapp.com/quotes'
//? 1) no URL

// LOCATING ELEMENTS
const jumbo = document.querySelector('.jumbotron');
const subBtn = document.getElementById('start-btn'); //? 2) "#" in front of <start-btn>
const foodMain = document.querySelector('.foodCart');
const nxtBtn = document.getElementById('nxtBtn');
const navFoot = document.querySelector('.quote');
const wCardDisplay = document.querySelector('.displayCard');

// GLOBAL VARIABLES
let cycle = 1;
let cityLocation;

// DEFAULT VALUES
navFoot.style = 'display: none';
nxtBtn.style = 'display: none';
wCardDisplay.style = 'display: none';
jumbo.setAttribute(
    'style', 
    'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
)

// LISTENERS
subBtn.addEventListener('click', startSearch);
nxtBtn.addEventListener('click', cleanUp);
//? 3) both <addEventListeners()> are set as <eventListener()>

// FETCH
let fetchQuote = () => {
    
    fetch(progURL)
        .then(res => res.json())
        .then(json => display(json))
        .catch(err => console.log(err));
        //? 4) ";" after both .then()
}

// DISPLAY 
function display (data) {

    jumbo.style = 'height: 80vh';

    // CREATE ELEMENTS
    const name = document.createElement('h4');
    const para = document.createElement('para');

    // BUILD VARIABLES
    let x = Math.floor((Math.random()*500)+1) //? 5) Math.random() is x.random()
    let quoteObj = data[x];
    let bgFoot;
    
    // Modifies styling depending on the cycle value.  
    if(cycle % 2 === 0) {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-primary quote';
        subBtn.className = 'btn btn-success';
    } else {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-success quote';
        subBtn.className = 'btn btn-primary';
    }

    // ELEMENT ATTRIBUTES
    navFoot.className = bgFoot;  //? 6) navFoot.className is set as navFoot.class
    navFoot.style = "display: grid";
    nxtBtn.style ='display: visible';
    name.innerText = quoteObj.author;
    para.innerText = quoteObj.en;

    // APPEND BUILD
    navFoot.appendChild(name);
    navFoot.appendChild(para);

    cycle++
}

// CLEAR PREVIOUS
function cleanUp() {
    while(navFoot.firstChild) {
        navFoot.firstChild.remove();
    }
    fetchQuote()

    // Created to reload browser after 2 minutes due to Weather API restrictions.  This also helps correct the jumbotron background bug for the moment.
    setInterval(() => {
        window.location.reload()
    }, 120000);

}

function startSearch(e) {
    e.preventDefault();

    weatherFetch();  //? 7*) invoking weatherFetching() instead of weatherFetch();
    cleanUp();
    zomFetch();  //? 8*) Not being invoked at all.
}


