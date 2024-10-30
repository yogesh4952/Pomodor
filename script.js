let start = document.getElementById("start");
let reset = document.getElementById("reset");
let pause = document.getElementById("pause");

let wm = document.getElementById("w_minutes");
let ws = document.getElementById("w_seconds");

let bm = document.getElementById("b_minutes");
let bs = document.getElementById("b_seconds");

let startTimer;

// Load stored values on page load
window.onload = function () {
  if (localStorage.getItem("wm")) {
    wm.innerText = localStorage.getItem("wm");
    ws.innerText = localStorage.getItem("ws");
    bm.innerText = localStorage.getItem("bm");
    bs.innerText = localStorage.getItem("bs");
    document.getElementById("counter").innerText =
      localStorage.getItem("counter");
  } else {
    wm.innerText = 25;
    ws.innerText = "00";
    bm.innerText = 5;
    bs.innerText = "00";
  }
};

// Start button logic
start.addEventListener("click", () => {
  if (startTimer == undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("Timer is already started!");
  }
});

// Reset button logic
reset.addEventListener("click", function () {
  wm.innerText = 25;
  ws.innerText = "00";

  bm.innerText = 5;
  bs.innerText = "00";

  document.getElementById("counter").innerText = 0;

  // Clear stored values in localStorage
  localStorage.clear();
  stopInterval();
});

// Pause button logic
pause.addEventListener("click", () => {
  stopInterval();
});

// Timer function logic
function timer() {
  // Work Timer
  if (ws.innerText != 0) {
    ws.innerText--;
  } else if (wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }

  // Break Timer
  if (wm.innerText == 0 && ws.innerText == 0) {
    if (bs.innerText != 0) {
      bs.innerText--;
    } else if (bm.innerText != 0 && bs.innerText == 0) {
      bs.innerText = 59;
      bm.innerText--;
    }
  }

  // If both work and break timers are at 0, reset to initial values
  if (
    wm.innerText == 0 &&
    ws.innerText == 0 &&
    bm.innerText == 0 &&
    bs.innerText == 0
  ) {
    wm.innerText = 25;
    ws.innerText = "00";
    bm.innerText = 5;
    bs.innerText = "00";
    document.getElementById("counter").innerText++;
  }

  // Save current timer values to localStorage
  localStorage.setItem("wm", wm.innerText);
  localStorage.setItem("ws", ws.innerText);
  localStorage.setItem("bm", bm.innerText);
  localStorage.setItem("bs", bs.innerText);
  localStorage.setItem("counter", document.getElementById("counter").innerText);
}

// Stop the interval timer
function stopInterval() {
  clearInterval(startTimer);
  startTimer = undefined;
}
