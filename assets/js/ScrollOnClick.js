'use strict';

import scroller from './scroll';

class ScrollOnClick {
	constructor(elem, scroll, eventListener, elemDefaultAction)  {
		this._elem = document.querySelector(elem);
		this._scroll = document.querySelector(scroll);
		this._eventListener = eventListener;
		this._elemDefaultAction = elemDefaultAction;
	}

	get scroll() {
		return this._scroll;
	}

	set scroll(elem) {
		this._scroll = elem;
	}

	get elemDefaultAction() {
		return this._elemDefaultAction;
	}

	set elemDefaultAction(value) {
		this._elemDefaultAction = value;
	}

	eventListeners() {
		this._elem.addEventListener(this._eventListener, () => { 
			if(this._elemDefaultAction)
				event.preventDefault();
			scroller.to(this._scroll);
		}, false);
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
export default ScrollOnClick;