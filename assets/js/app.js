import ScrollOnClick from './ScrollOnClick';
import scss from '../scss/main.scss';
import fontAwesome from '../../node_modules/font-awesome/scss/font-awesome.scss';
import canvasLines from './canvasLines';

let introCanvas = new canvasLines(window.innerWidth, window.innerHeight, '#intro', '#canvas-lines', '2d', null, true);

// canvasLines();
introCanvas.initContainer();
introCanvas.initAnimation();
introCanvas.addListeners();

let intro = new ScrollOnClick('#intro-button', '#about', 'click', true);
intro.eventListeners();

