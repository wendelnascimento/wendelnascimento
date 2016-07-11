'use strict';

let button = document.getElementById('intro-button');
let hexagon = document.getElementById('intro');
// let about = document.getElementById('about');

let hexagonFill = () => {
	event.preventDefault();
	hexagon.classList.add('animate-grow');
};

let scrollAbout = () => {
	
};

button.addEventListener('click', hexagonFill, false);
hexagon.addEventListener('transitionend', scrollAbout, false);
