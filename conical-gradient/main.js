const meterSize = 80;
const meterRadius = meterSize / 2;
const meterWidth = 6;

function updateMeter() {
  let angle = +document.getElementById("angle").value;
  setMeter(angle);
}

function setMeter(a) {
  if (a > 360) a = 360;
  if (a <= 0) {
    let path = `<circle cx="${meterRadius}" cy="${meterRadius}" r="${meterRadius}" fill="lightgray" />
    <circle cx="${meterRadius}" cy="${meterRadius}" r="${
      meterRadius - meterWidth
    }" fill="white" />`;

    document.getElementById("meter").innerHTML = path;
    document.getElementById("angle").value = 0;
    return;
  }
  let angle = 360 - a;
  let radians = angle * (Math.PI / 180);

  let endX = meterRadius + meterRadius * Math.cos(radians);
  let endY = meterRadius - meterRadius * Math.sin(radians);

  let largeArcFlag = angle > 180 ? 1 : 0;

  let path = `<path d="M ${meterSize} ${meterRadius} A ${meterRadius} ${meterRadius} 0 ${largeArcFlag} 0 ${endX} ${endY} L ${meterRadius} ${meterRadius}" stroke="lightgray" fill="lightgray" stroke-width="1" />
  <circle cx="${meterRadius}" cy="${meterRadius}" r="${
    meterRadius - meterWidth
  }" fill="white" />`;

  document.getElementById("meter").innerHTML = path;

  document.getElementById("angle").value = a;
}

function adjustMeter(n) {
  let angle = +document.getElementById("angle").value;
  angle += n;
  setMeter(angle);
}

function sweepMeter() {
  const sweepTimer = setInterval(function () {
    updateSweep(sweepTimer);
  }, 18);
}

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

document.addEventListener("DOMContentLoaded", function (event) {
  let meterContainer = `
    <svg
      id="meter"
      width="${meterSize}"
      height="${meterSize}"
      style="transform: rotate(-0.25turn);"
    ></svg>`;
  document.getElementById("meter-container").innerHTML = meterContainer;

  let path = `<circle cx="${meterRadius}" cy="${meterRadius}" r="${meterRadius}" fill="lightgray" />
    <circle cx="${meterRadius}" cy="${meterRadius}" r="${
    meterRadius - meterWidth
  }" fill="white" />`;
  document.getElementById("meter").innerHTML = path;

  document.getElementById("angle").value = 0;
});
