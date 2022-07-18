7// adapted from https://github.com/hallettj/Fuzzy-Text-International/

let fuzzy_string = {
  "hours": [
    "zwölfe",
    "oins",
    "zwoi",
    "dreie",
    "viere",
    "fünfe",
    "sechse",
    "siebene",
    "achte",
    "neune",
    "zehne",
    "elfe"
  ],
  "minutes": [
    "*$1",
    "fünf nach *$1",
    "zea nach *$1",
    "viertl *$2",
    "zwanzg nach *$1",
    "fünf vor halbe *$2",
    "halbe *$2",
    "fünf nach halbe *$2",
    "zea nach halbe *$2",
    "dreiviertl *$2",
    "zea vor *$2",
    "fünf vor *$2"
  ]
};
img = img = {
  width: 100, height: 100, bpp: 3,
  transparent: 2,
  buffer: require("heatshrink").decompress(atob("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"))
};

let timeout_clock = 1;
let timeout_fuzzy = 2.5 * 60;
let timeout_steps = 2;
let timeout_battery = 2.5 * 60;
let drawTimeout;

let screens = ["fuzzy", "clock", "steps", "battery"];
let screen_index = 0;


function queueDraw(seconds) {
  let millisecs = seconds * 1000;
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function () {
    drawTimeout = undefined;
    draw();
  }, millisecs - (Date.now() % millisecs));
}

const h = g.getHeight();
const w = g.getWidth();

function getFuzzyTimeString(date) {
  let segment = Math.round((date.getMinutes() * 60 + date.getSeconds() + 1) / 300);
  let hour = date.getHours() + Math.floor(segment / 12);
  f_string = fuzzy_string.minutes[segment % 12];
  if (f_string.includes('$1')) {
    f_string = f_string.replace('$1', fuzzy_string.hours[(hour) % 12]);
  } else {
    f_string = f_string.replace('$2', fuzzy_string.hours[(hour + 1) % 12]);
  }
  return f_string;
}

function getTimeString(date) {
  let da = date.toString().split(" ");
  let time = da[4].split(":");
  let hours = time[0], minutes = time[1], seconds = time[2];
  return `${hours}:${minutes}:${seconds}`;
}

function getDateString(date) {
  let da = date.toString().split(" ");
  return `${da[0]} ${da[2]}. ${da[1]} ${da[3]}`;
}

function drawString1(text) {
  g.setFont('Vector', 30);
  g.drawString(text, w / 2, h / 2 + 30);
}

function drawString2(text) {
  g.setFont('Vector', 15);
  g.drawString(text, w / 2, h / 2 + 60);
}

function draw() {
  let date = new Date();

  g.clearRect(0, 24, w, h);
  g.setColor(g.theme.fg);
  g.setFontAlign(0, 0);
  g.drawImage(img, 40, 0);

  switch (screens[screen_index]) {
    case "fuzzy":
      let time_string = getFuzzyTimeString(date).replace('*', '');
      g.setFont('Vector', 30);
      g.drawString(g.wrapString(time_string, w).join("\n"), w / 2, h / 2 + 40);
      queueDraw(timeout_fuzzy);
      break;
    case "clock":
      drawString1(getTimeString(date));
      drawString2(getDateString(date));
      queueDraw(timeout_clock);
      break;
    case "steps":
      drawString1(Bangle.getStepCount());
      drawString2("Schritte");
      queueDraw(timeout_steps);
      break;
    case "battery":
      drawString1(`${E.getBattery()}%`);
      drawString2("Batterie");
      queueDraw(timeout_battery);
      break;
  }
}

g.clear();
draw();
queueDraw(1); // draw after widgets

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (on) {
    draw(); // draw immediately, queue redraw
  } else { // stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});

Bangle.on('lock', on => {
  screen_index = 0;
  queueDraw(1); // draw after widgets
});

Bangle.on('swipe', function (directionLR, directionUD) {
  if (directionLR + directionUD > 0) {
    screen_index += 1;
    if (screen_index == screens.length) screen_index = 0;
  } else {
    screen_index -= 1;
    if (screen_index == -1) screen_index = screens.length - 1;
  }
  draw();
});

Bangle.setUI('clock');
Bangle.loadWidgets();
Bangle.drawWidgets();
