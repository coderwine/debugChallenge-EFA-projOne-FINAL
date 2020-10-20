const progURL = 'https://programming-quotes-api.herokuapp.com/quotes'

// LOCATION
// const jumbo = document.getElementById('jumbo');
const jumbo = document.querySelector('.jumbotron');
const startBtn = document.getElementById('start-btn');
const foodMain = document.querySelector('.foodCart');
const nxtBtn = document.getElementById('nxtBtn');
const navFoot = document.querySelector('.quote');
const toast = document.getElementsByClassName('toast-body');
const wCardDisplay = document.querySelector('.displayCard');

// GLOBAL VARIABLES
let cycle = 1;
let cityLocation;

// DEFAULT VALUES
navFoot.style = 'display: none';
nxtBtn.style = 'display: none';
wCardDisplay.style = 'display: none';
// jumbo.style = 'height: 100vh';
jumbo.setAttribute(
    'style', 
    'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
    // 'background: url("../assets/04-winter.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
)

// LISTENERS
startBtn.addEventListener('click', startSearch);
nxtBtn.addEventListener('click', cleanUp);

// FETCH
let fetchProg = () => {
    
    fetch(progURL)
        .then(res => res.json())
        .then(json => display(json))
        .catch(err => console.log(err));
}

// DISPLAY 
function display (data) {

    jumbo.style = 'height: 80vh';

    // CREATE
    const name = document.createElement('h4');
    const para = document.createElement('para');

    let x = Math.floor((Math.random()*500)+1)
    let quoteObj = data[x];
    let bgFoot;
    
    if(cycle % 2 === 0) {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-primary quote';
        startBtn.className = 'btn btn-success';
    } else {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-success quote';
        startBtn.className = 'btn btn-primary';
    }

    // ATTRIBUTES
    navFoot.className = bgFoot;
    navFoot.style = "display: grid";
    nxtBtn.style ='display: grid';
    name.innerText = quoteObj.author;
    para.innerText = quoteObj.en;

    // APPEND
    navFoot.appendChild(name);
    navFoot.appendChild(para);

    cycle++
}

// CLEAR PREVIOUS
function cleanUp() {
    while(navFoot.firstChild) {
        navFoot.firstChild.remove();
    }
    
    fetchProg()
}

function startSearch(e) {
    e.preventDefault();
    weatherFetch();
    cleanUp();
    zomFetch();
}
