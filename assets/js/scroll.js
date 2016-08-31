let scroll = {
	on: (fn) => {
		window.addEventListener('scroll', () => window.requestAnimationFrame(fn));
	},

	to: (el, {duration = 200, easing = 'linear'} = {}) => {
		el = el instanceof Array ? el[0] : el;

		let target = el.offsetTop;
		let delta = target - window.pageYOffset;
		let body = document.body;
		let style = body.style;

		style.transform = `translate3d(0,${delta}px,0)`;
		style.WebkitTransform = `translate3d(0,${delta}px,0)`;
		window.scrollTo(0, target);

		style.transition = `transform ${duration}ms ${easing}`;
		style.WebkitTransition = `-webkit-transform ${duration}ms ${easing}`;
		style.transform = 'translate3d(0,0,0)';
		style.WebkitTransform = 'translate3d(0,0,0)';

		let end = () => {body.removeAttribute('style');};
		body.addEventListener('transitionend', end);
		body.addEventListener('webkitTransitionEnd', end);
	}
};

export default scroll;