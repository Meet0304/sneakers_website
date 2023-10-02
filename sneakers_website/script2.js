// Animatables
var list = document.querySelector('[data-anim=list]'),
	listBg = document.querySelector('[data-anim=list-bg]'),
	items = document.querySelectorAll('[data-anim=list-item]'),
	ripple = document.querySelector('[data-anim=ripple]'),
	ripple = document.querySelector('[data-anim=ripple]'),
	btnBg = document.querySelector('[data-anim=btn-bg]'),
	btnLabel = document.querySelector('[data-anim=btn-label]'),
	btnShadow = document.querySelector('[data-anim=btn-shadow]'),
	frontGroup = document.querySelector('[data-anim=front-group]'),
	frontWheels = document.querySelectorAll('[data-anim=front-wheel]'),
	frontWheelBack = document.querySelector('[data-anim=front-wheel-back]'),
	backWheels = document.querySelectorAll('[data-anim=back-wheel]'),
	backWheelsBack = document.querySelectorAll('[data-anim=back-wheel-back]'),
	containerParts = document.querySelectorAll('[data-anim=container-part]'),
	containerLip = document.querySelector('[data-anim=container-lip]'),
	container = document.querySelector('[data-anim=container]'),
	truckBtn = document.querySelector('[data-anim=truck-btn]'),
	shippedBtn = document.querySelector('[data-anim=btn-shipped]');

// Interactive
var btnArea = document.querySelector('[data-click=btn]');

// Listeners
btnArea.addEventListener('click', btnHandler);

// Handlers
function btnHandler(e) {
	getBtnTl( getClickCoords(e) ).play();
	shipItTl.restart();
}

// Animations
TweenLite.defaultEase = Back.easeOut.config(1);

function getBtnTl(coords) {
	var btnTl = new TimelineMax({ paused:true });

	btnTl
		.fromTo(btnShadow, 0, { autoAlpha:1 }, { autoAlpha:0 }, 0)
		.to(ripple, 0, { x: coords.x, y:coords.y }, 0)
		.fromTo(ripple, 0.5, { autoAlpha:0.5, scale: 0,}, { autoAlpha:0, scale: 20, transformOrigin: 'center', ease: Power1.easeOut }, 0);

	return btnTl;
}

var shipItTl = new TimelineMax({ paused:true, onComplete:reset }),
	listTl = new TimelineMax({ paused:true }),
	truckTl = new TimelineMax({ paused:true });

shipItTl
	.add( listTl.play(), 0 )
	.add( truckTl.play(), 0.2 );

listTl
	.to(list, 0.3, { y:-10, ease: Power1.easeInOut}, 0)
	.to(list, 0.05, { y:0, ease: Power1.easeIn}, 0.3)
	.fromTo(items[0], 0.15, { y:0 }, { y:85, ease: Linear.easeNone }, 0.35)
	.fromTo(items[1], 0.15, { y:0 }, { y:138, ease: Linear.easeNone }, 0.35)
	.fromTo(items[2], 0.15, { y:0 }, { y:178, ease: Linear.easeNone }, 0.35)
	.fromTo(items, 0, { autoAlpha:1 }, { autoAlpha:0 }, 0.5)
	.to([btnBg, btnLabel], 0.15, { scaleX: 1.05, transformOrigin: 'center', ease:Power1.easeInOut, repeat:1, yoyo:true }, 0.5)
	.to([btnBg, btnLabel], 0.15, { scaleY: 0.95, ease:Power1.easeInOut, repeat:1, yoyo:true }, 0.5);


truckTl
	.set(frontGroup, { x:-50, scale:0.84, transformOrigin: 'left top', autoAlpha:1 })
	.set([frontWheels, frontWheelBack], { y:-25, autoAlpha:1 })
	.set(frontWheels[1], { autoAlpha:0 })
	.set(container, { scale:0.98, transformOrigin: 'right top', autoAlpha:1 })
	.set([containerParts,containerLip], { y:-15, autoAlpha:1 })
	.set(containerParts[2], { autoAlpha:0.5 })
	.set([backWheels, backWheelsBack], { y:-30, autoAlpha:1 })
	.to(container, 0.5, { scale:1 }, 0)
	.staggerTo(containerParts, 0.5, { y:0 }, -0.1, 0.2)
	.to(containerLip, 0.5, { y:0 }, 0.6)
	.staggerTo(backWheelsBack, 0.5, { y:0 }, -0.1, 0.55)
	.staggerTo(backWheels, 0.5, { y:0 }, 0.1, 0.6)
	.to(frontGroup, 0.6, { scale:1, x:0, ease: Back.easeOut.config(1.4) }, 0.7)
	.to(frontWheelBack, 0.5, { y:0 }, 0.8)
	.to(frontWheels, 0.5, { y:0, ease:Back.easeOut.config(5.4) }, 0.9)
	.to(frontWheels[1], 0, { autoAlpha:1 }, 1.05)
	.to(shippedBtn, 0, { autoAlpha:1 }, 1.05)
	.fromTo(truckBtn, 1.2, { x:0 }, { x:'+=1000', ease: Back.easeIn.config(0.5) }, 1.4)
	.fromTo(truckBtn, 0.5, { autoAlpha:1 }, { autoAlpha:0, ease: Power1.easeIn }, 2);

function reset() {
	
	// var	resetTl = new TimelineMax({ paused:false });
	
	// resetTl
	// 	.set(items, { y:0 })
	// 	.set(truckBtn, { x:0 })
	// 	.set(frontGroup, { x:-50, scale:0.84, transformOrigin: 'left top', autoAlpha:1 })
	// 	.set([frontWheels, frontWheelBack], { y:-25, autoAlpha:1 })
	// 	.set(frontWheels[1], { autoAlpha:0 })
	// 	.set(container, { scale:0.98, transformOrigin: 'right top', autoAlpha:1 })
	// 	.set([containerParts,containerLip], { y:-15, autoAlpha:1 })
	// 	.set(containerParts[2], { autoAlpha:0.5 })
	// 	.set([backWheels, backWheelsBack], { y:-30, autoAlpha:1 })
	// 	.to(items, 0.5, { autoAlpha:1, y:0, ease: Power1.easeInOut }, 0.01)
	// 	.to(truckBtn, 0.5, { autoAlpha:1, ease: Power1.easeInOut }, 0.01);

	// // resetTl.restart();
};

// Functions
function getClickCoords(e) {

	var svgRect = document.querySelector('#ship-it').getBoundingClientRect(),
		btnRect = document.querySelector('[data-anim=btn-bg]').getBoundingClientRect(),
		pixelCoordSample = btnRect.left-svgRect.left,
		svgCoordSample = 88,
		normFactor = pixelCoordSample/svgCoordSample,
		src = {
			x: e.clientX,
			y: e.clientY,
			xMin: btnRect.left,
			xMax: btnRect.left + btnRect.width,
			yMin: btnRect.top,
			yMax: btnRect.top + btnRect.height
		},		
		rpl = {
			xMin: -(btnRect.width)/2/normFactor,
			xMax: (btnRect.width)/2/normFactor,
			yMin: -(btnRect.height)/2/normFactor,
			yMax: (btnRect.height)/2/normFactor,
			offset: parseInt(ripple.getAttribute('r')),
		};

	var coords = {
		x: map(src.x, src.xMin, src.xMax, rpl.xMin, rpl.xMax) + rpl.offset,
		y: map(src.y, src.yMin, src.yMax, rpl.yMin, rpl.yMax) + rpl.offset
	};
	
	return coords;
}

// Returns a value on destination range based on the input value on source range
function map(value, sourceMin, sourceMax, destinationMin, destinationMax) {
	return destinationMin + (destinationMax - destinationMin) * ((value - sourceMin) / (sourceMax - sourceMin)) || 0;
}