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
    "zeha nach *$1",
    "viertl *$2",
    "zwanzg nache *$1",
    "fünf vor halbe *$2",
    "halb *$2",
    "fünf nach halbe *$2",
    "zeha nach halbe *$2",
    "dreiviertl *$2",
    "zeha vor *$2",
    "fünf vor *$2"
  ]
};

let text_scale = 3.5;
let timeout_unlocked = 1;
let timeout_locked = 2.5 * 60;
let drawTimeout;

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

function getTimeString(date) {
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

function getDetailString(date) {
  let da = date.toString().split(" ");
  let time = da[4].split(":");
  let hours = time[0], minutes = time[1], seconds = time[2];
  let datestr = da[2] + '. ' + da[1];
  return `${hours}:${minutes}:${seconds} - ${datestr}`;
}

function draw() {
  let date = new Date();
  let time_string = getTimeString(date).replace('*', '');
  // print(time_string);
  g.setFont('Vector', (h - 24 * 2) / text_scale);
  g.setFontAlign(0, 0);
  g.clearRect(0, 24, w, h);
  g.setColor(g.theme.fg);
  g.drawString(g.wrapString(time_string, w).join("\n"), w / 2, h / 2);
  if (!Bangle.isLocked()) {
    g.setFont("12x20", 1);
    g.drawString(getDetailString(date), w / 2, h - 10, true);
    queueDraw(timeout_unlocked);
  } else {
    queueDraw(timeout_locked);
  }
}

g.clear();
draw();

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
  draw(); // draw immediately, queue redraw
});

Bangle.setUI('clock');
Bangle.loadWidgets();
Bangle.drawWidgets();
