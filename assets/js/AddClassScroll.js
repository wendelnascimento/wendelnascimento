'use strict';

import scroll from './scroll';

class AddClassScroll {
	constructor(elem1, elem2, eventListener1, eventListener2, elemClass, scroll, elem1DefaultAction)  {
		this.elem1 = document.querySelector(elem1);
		this.elem2 = document.querySelector(elem2);
		this.eventListener1 = eventListener1;
		this.eventListener2 = eventListener2;
		this.elemClass = elemClass;
		this.scroll = scroll;
		this.elem1DefaultAction = elem1DefaultAction;
	}

	eventListeners() {
		this.elem1.addEventListener(this.eventListener1, this.addClass, false);
		this.elem2.addEventListener(this.eventListener2, scroll.to(this.elem2), false);
	}

	addClass() {
		if (this.elem1DefaultAction)
			event.preventDefault();
		this.elem2.classList.add(this.elemClass);
	}	
}

// let button = document.getElementById('intro-button');
// let hexagon = document.getElementById('intro');
// // let about = document.getElementById('about');

// let hexagonFill = element => {
// 	event.preventDefault();
// 	hexagon.classList.add('animate-grow');
// };

// let scrollAbout = () => {
	
// };



// button.addEventListener('click', hexagonFill, false);
// hexagon.addEventListener('transitionend', scrollAbout, false);
export default AddClassScroll;