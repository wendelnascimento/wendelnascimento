import scroller from './scroll';

class ScrollOnClick {
	constructor(className)  {
		this._className = className;
	}

	init() {
		let elements = document.querySelectorAll(this._className);
		for(let i = 0; i < elements.length; i++) {
			elements[i].addEventListener('click', this.onClick);
		}
	}

	onClick() {
		let target = event.target;

		event.stopPropagation();
		event.preventDefault();

		if(!(target instanceof HTMLAnchorElement)) {
			target = target.closest('a');
		}


		scroller.to(document.querySelector(target.getAttribute('href')));
	}
}
export default ScrollOnClick;
