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
    "zwanzg nache *$1",
    "fünf vor halbe *$2",
    "halb *$2",
    "fünf nach halbe *$2",
    "zea nach halbe *$2",
    "dreiviertl *$2",
    "zea vor *$2",
    "fünf vor *$2"
  ]
};
img = img = {
  width : 100, height : 100, bpp : 3,
  transparent : 2,
  buffer : require("heatshrink").decompress(atob("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"))
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
  g.drawImage(img, 30, 10);
  let date = new Date();
  let time_string = getTimeString(date).replace('*', '');
  // print(time_string);
  g.setFont('Vector', (h - 24 * 2) / text_scale);
  g.setFontAlign(0, 0);
  g.clearRect(0, 24, w, h);
  g.setColor(g.theme.fg);
  g.drawImage(img, 40, 0);
  g.drawString(g.wrapString(time_string, w).join("\n"), w / 2, h / 2 + 30);
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
