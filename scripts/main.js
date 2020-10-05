const progURL = 'https://programming-quotes-api.herokuapp.com/quotes'

// LOCATION
const jumbo = document.getElementById('jumbo');
const startBtn = document.getElementById('start-btn');
const foodMain = document.querySelector('.foodCart');
const nxtBtn = document.getElementById('nxtBtn');
const navFoot = document.querySelector('.quote');
const toast = document.getElementsByClassName('toast-body');

// GLOBAL VARIABLES
let cycle = 1;
let cityLocation;

// DEFAULT VALUES
navFoot.style = 'display: none';
nxtBtn.style = 'display: none';

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

