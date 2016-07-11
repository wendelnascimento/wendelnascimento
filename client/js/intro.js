"use strict";
let button = document.getElementById("intro-button");
let hexagon = document.getElementById("intro");
button.addEventListener("click", hexagonFill, false);

function hexagonFill() {
  hexagon.classList.add("animate-grow");
}
