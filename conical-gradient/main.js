// if meterSize is changed here it also needs to be changed
// to the same value in the css for .conic-gradient 
const meterSize = 80;
const meterRadius = meterSize / 2;
// width of the color band
const meterWidth = 6;

// sets meter to value in input element
function updateMeter() {
  let angle = +document.getElementById("angle").value;
  setMeter(angle);
}

//sets meter to specific angle
function setMeter(a) {
  if (a > 360) a = 360;
  if (a <= 0) {
    let meter = `<circle cx="${meterRadius}" cy="${meterRadius}" r="${meterRadius}" fill="lightgray" />
    <circle cx="${meterRadius}" cy="${meterRadius}" r="${
      meterRadius - meterWidth
    }" fill="white" />`;

    document.getElementById("meter").innerHTML = meter;
    document.getElementById("angle").value = 0;
    return;
  }
  // flip angle so guage increments from the correct direction
  let angle = 360 - a;
  // convert angle to radians
  let radians = angle * (Math.PI / 180);
  // polar to cartesian transformation
  let endX = meterRadius + meterRadius * Math.cos(radians);
  let endY = meterRadius - meterRadius * Math.sin(radians);
  // set arc to be drawn correctly
  let largeArcFlag = angle > 180 ? 1 : 0;
  // define svg arc path and center circle
  let meter = `
  <path d="
    M ${meterSize} ${meterRadius} 
    A ${meterRadius} ${meterRadius} 0 ${largeArcFlag} 0 ${endX} ${endY} 
    L ${meterRadius} ${meterRadius}" 
    stroke="lightgray" 
    fill="lightgray" 
    stroke-width="1" />
  <circle 
    cx="${meterRadius}" 
    cy="${meterRadius}" 
    r="${meterRadius - meterWidth}" 
    fill="white" />`;

  document.getElementById("meter").innerHTML = meter;
  document.getElementById("angle").value = a;
}

// add n to current angle and update meter
function adjustMeter(n) {
  let angle = +document.getElementById("angle").value;
  angle += n;
  setMeter(angle);
}

// sweep meter from 0-360-0
function sweepMeter() {
  const sweepTimer = setInterval(function () {
    updateSweep(sweepTimer);
  }, 18);
}

// this does the actual setting during sweep
let a = 0;
let up = true;
function updateSweep(timer) {
  if (up) {
    a++;
    if (a > 360) {
      a = 359;
      up = false;
    }
  } else {
    a--;
    if (a <= 0) {
      clearTimeout(timer);
      up = true;
    }
  }
  setMeter(a);
}

// init a blank meter on page load
document.addEventListener("DOMContentLoaded", function (event) {
  let meterContainer = `
    <svg
      id="meter"
      width="${meterSize}"
      height="${meterSize}"
      style="transform: rotate(-0.25turn);"
    ></svg>`;
  document.getElementById("meter-container").innerHTML = meterContainer;

  let meter = `<circle cx="${meterRadius}" cy="${meterRadius}" r="${meterRadius}" fill="lightgray" />
    <circle cx="${meterRadius}" cy="${meterRadius}" r="${
    meterRadius - meterWidth
  }" fill="white" />`;
  document.getElementById("meter").innerHTML = meter;
  document.getElementById("angle").value = 0;
});
