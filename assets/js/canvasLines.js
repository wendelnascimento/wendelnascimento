'use strict';

import TweenLite from 'gsap';

let self;

export default class CanvasLines {
	constructor(width, height, container, canvas, context, target, animateContainer) {
		this._width = width;
		this._height = height;
		this._container = container;
		this._canvas = canvas;
		this._context = context;
		this._target = target;
		this._animateContainer = animateContainer;
		this._points = [];
		self = this;
	}

	initContainer() {
		this._target = {
			x: this._width,
			y: this._height
		};

		this._container = document.querySelector(this._container);
		this._container.style.height = `${this._height}px`;

		this._canvas = document.querySelector(this._canvas);
		this._canvas.width = this._width;
		this._canvas.height = this._height;
    
		this._context = this._canvas.getContext(this._context);


		for(let x = 0; x < this._width; x = x + this._width / 20) {
			for(let y = 0; y < this._height; y = y + this._height / 20) {
				let px = x + Math.random() * this._width / 20;
				let py = y + Math.random() * this._height / 20;
				let p = {
					x: px,
					originX: px,
					y: py,
					originY: py
				};
				this._points.push(p);
			}
		}

		for(let i = 0; i < this._points.length; i++) {
			let closest = [];
			let p1 = this._points[i];

			for(let j = 0; j < this._points.length; j++) {
				let p2 = this._points[j];

				if(!(p1 == p2)) {
					let placed = false;

					for(let k = 0; k < 5; k++) {
						if(!placed) {
							if(closest[k] == undefined) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
					let c = new Circle(this._points[i], 2 + Math.random() * 5, 'rgba(0,0,0,0.3)');
					for(let k = 0; k < 5; k++) {
						if(!placed) {
							if(c.getDistance(p1, p2) < c.getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}    
					}
				}
			}
			p1.closest = closest;
		}

		for(let i = 0; i < this._points.length; i++) {
			let c = new Circle(this._points[i], 2 + Math.random() * 5, 'rgba(0,0,0,0.3)');
			this._points[i].circle = c;
		}
	}

	addListeners() {
		if(!('ontouchstart' in window))
			window.addEventListener('mousemove', this.mouseMove.bind(this));
		window.addEventListener('scroll', this.scrollCheck.bind(this));
		window.addEventListener('resize', this.resize.bind(this));
	}

	mouseMove(e) {
		let posx = 0;
		let posy = 0;

		if(e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if(e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		this._target.x = posx;
		this._target.y = posy;
	}

	scrollCheck() {
		if(document.body.scrollTop > this._height)
			this._animateContainer = false;
		else
      this._animateContainer = true;
	}

	resize() {
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._container.style.height = `${this._height}px`;
		this._canvas.width = this._width;
		this._canvas.height = this._height;
	}

	initAnimation() {
		this.animate();
		for(let i = 0; i < this._points.length; i++) {
			this.shiftPoint(this._points[i]);
		}
	}

	animate() {
		if(self._animateContainer) {
			self._context.clearRect(0, 0, self._width, self._height);
			for(let i = 0; i < self._points.length; i++) {
				if(Math.abs(self._points[i].circle.getDistance(self._target, self._points[i])) < 4000) {
					self._points[i].active = 0.1;
					self._points[i].circle.active = 0.1;
				}
				else if(Math.abs(self._points[i].circle.getDistance(self._target, self._points[i])) < 20000) {
					self._points[i].active = 0.07;
					self._points[i].circle.active = 0.07;
				}
        else if(Math.abs(self._points[i].circle.getDistance(self._target, self._points[i])) < 40000) {
	        self._points[i].active = 0.06;
	        self._points[i].circle.active = 0.06;
        }
        else {
	        self._points[i].active = 0.05;
	        self._points[i].circle.active = 0.05;
        }

				self.drawLines(self._points[i]);
				self._points[i].circle.draw();
			} 
		}
		requestAnimationFrame(self.animate);
	}

	shiftPoint(p) {
		TweenLite.to(p, 3 + 2 * Math.random(), {
			x: p.originX - 50 + Math.random() * 100,
			y: p.originY - 50 + Math.random() * 100,
			ease: Circ.easeInOut,
			onComplete: () => {
				this.shiftPoint(p);
			}
		});
	}

	drawLines(p) {
		if(!p.active)
			return;
    
		for(var i = 0; i < p.closest.length; i++) {
			this._context.beginPath();
			this._context.moveTo(p.x, p.y);
			this._context.lineTo(p.closest[i].x, p.closest[i].y);
			this._context.strokeStyle = `rgba(0,0,0,${p.active})`;
			this._context.stroke();
		}
	}
}

class Circle {
	constructor(pos, rad, color) {
		this._pos = pos;
		this._radius = rad;
		this._color = color;
	}

	draw() {
		if(!this.active)
			return;
		self._context.beginPath();
		self._context.arc(this._pos.x, this._pos.y, this._radius, 0, 2 * Math.PI, false);
		self._context.fillStyle = `rgba(0,0,0,${this.active})`;
		self._context.fill();
	}

	getDistance(p1, p2) {
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}
}

// export default function canvasLines() {

//     						var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

//     // Main
//     						initHeader();
//     						initAnimation();
//     						addListeners();
  
//     						function initHeader() {
//         						width = window.innerWidth;
//         						height = window.innerHeight;
//         						target = {x: width, y: height};

//         						largeHeader = document.getElementById('intro');
//         						largeHeader.style.height = height+'px';

//         						canvas = document.getElementById('canvas-lines');
//         						canvas.width = width;
//         						canvas.height = height;
//         						ctx = canvas.getContext('2d');

//         // create points
//         						points = [];
//         						for(var x = 0; x < width; x = x + width/20) {
//             						for(var y = 0; y < height; y = y + height/20) {
//                 						var px = x + Math.random()*width/20;
//                 						var py = y + Math.random()*height/20;
//                 						var p = {x: px, originX: px, y: py, originY: py };
//                 						points.push(p);
//             }
//         }

//         // for each point find the 5 closest points
//         						for(var i = 0; i < points.length; i++) {
//             						var closest = [];
//             						var p1 = points[i];
//             						for(var j = 0; j < points.length; j++) {
//                 						var p2 = points[j]
//                 						if(!(p1 == p2)) {
//                     						var placed = false;
//                     						for(var k = 0; k < 5; k++) {
//                         						if(!placed) {
//                             						if(closest[k] == undefined) {
//                                 						closest[k] = p2;
//                                 						placed = true;
//                             }
//                         }
//                     }

//                     						for(var k = 0; k < 5; k++) {
//                         						if(!placed) {
//                             						if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
//                                 						closest[k] = p2;
//                                 						placed = true;
//                             }
//                         }
//                     }
//                 }
//             }
//             						p1.closest = closest;
//         }

//         // assign a circle to each point
//         						for(var i in points) {
//             						var c = new Circle(points[i], 2+Math.random()*5, 'rgba(0,0,0,0.3)');
//             						points[i].circle = c;
//         }
//     }

//     // Event handling
//     						function addListeners() {
//         						if(!('ontouchstart' in window)) {
//             						window.addEventListener('mousemove', mouseMove);
//         }
//         						window.addEventListener('scroll', scrollCheck);
//         						window.addEventListener('resize', resize);
//     }

//     						function mouseMove(e) {
//         						var posx = 0;
//         						var posy = 0;
//         						if (e.pageX || e.pageY) {
//             						posx = e.pageX;
//             						posy = e.pageY;
//         }
//         						else if (e.clientX || e.clientY)    {
//             						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//             						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//         }
//         						target.x = posx;
//         						target.y = posy;
//     }

//     						function scrollCheck() {
//         						if(document.body.scrollTop > height) animateHeader = false;
//         						else animateHeader = true;
//     }

//     						function resize() {
//         						width = window.innerWidth;
//         						height = window.innerHeight;
//         						largeHeader.style.height = height+'px';
//         						canvas.width = width;
//         						canvas.height = height;
//     }

//     // animation
//     						function initAnimation() {
//         						animate();
//         						for(var i in points) {
//             						shiftPoint(points[i]);
//         }
//     }

//     						function animate() {
//         						if(animateHeader) {
//             						ctx.clearRect(0,0,width,height);
//             						for(var i in points) {
//                 // detect points in range
//                 						if(Math.abs(getDistance(target, points[i])) < 4000) {
//                     						points[i].active = 0.1;
//                     						points[i].circle.active = 0.1;
//                 } else if(Math.abs(getDistance(target, points[i])) < 20000) {
//                     						points[i].active = 0.07;
//                     						points[i].circle.active = 0.07;
//                 } else if(Math.abs(getDistance(target, points[i])) < 40000) {
//                     						points[i].active = 0.06;
//                     						points[i].circle.active = 0.06;
//                 } else {
//                     						points[i].active = 0.05;
//                     						points[i].circle.active = 0.05;
//                 }

//                 						drawLines(points[i]);
//                 						points[i].circle.draw();
//             }
//         }
//         						requestAnimationFrame(animate);
//     }

//     						function shiftPoint(p) {
//         						TweenLite.to(p, 3+2*Math.random(), {x:p.originX-50+Math.random()*100,
//             y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
//             onComplete: function() {
//                 						shiftPoint(p);
//             }});
//     }

//     // Canvas manipulation
//     						function drawLines(p) {
//         						if(!p.active) return;
//         						for(var i in p.closest) {
//             						ctx.beginPath();
//             						ctx.moveTo(p.x, p.y);
//             						ctx.lineTo(p.closest[i].x, p.closest[i].y);
//             						ctx.strokeStyle = 'rgba(0,0,0,'+ p.active+')';
//             						ctx.stroke();
//         }
//     }

//     						function Circle(pos,rad,color) {
//         						var _this = this;

//         // constructor
//         						(function() {
//             						_this.pos = pos || null;
//             						_this.radius = rad || null;
//             						_this.color = color || null;
//         })();

//         						this.draw = function() {
//             						if(!_this.active) return;
//             						ctx.beginPath();
//             						ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
//             						ctx.fillStyle = 'rgba(0,0,0,'+ _this.active+')';
//             						ctx.fill();
//         };
//     }

//     // Util
//     						function getDistance(p1, p2) {
//         						return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
//     }
    
// }