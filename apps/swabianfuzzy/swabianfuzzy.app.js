// adapted from https://github.com/hallettj/Fuzzy-Text-International/

let fuzzy_string = {
  "hours":[
    "Zwölwe",
    "Oinse",
    "Zwoie",
    "Dreie",
    "Viere",
    "Fünfe",
    "Sechse",
    "Siebene",
    "Achte",
    "Neine",
    "Zehne",
    "Elfe"
  ],
  "minutes":[
    "*$1",
    "fünf noch *$1",
    "zea noch *$1",
    "viertel *$2",
    "zwanzig noch *$1",
    "fünfezwanzg noch *$1",
    "halbe *$2",
    "fünf nach halb *$2",
    "zeha nach halb *$2",
    "dreiviertel *$2",
    "zeha vor *$2",
    "fünf vor *$2"
  ]
};

let text_scale = 3.5;
let timeout = 2.5*60;
let drawTimeout;

function queueDraw(seconds) {
  let millisecs = seconds * 1000;
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, millisecs - (Date.now() % millisecs));
}

const h = g.getHeight();
const w = g.getWidth();

function getTimeString(date) {
  let segment = Math.round((date.getMinutes()*60 + date.getSeconds() + 1)/300);
  let hour = date.getHours() + Math.floor(segment/12);
  f_string = fuzzy_string.minutes[segment % 12];
  if (f_string.includes('$1')) {
    f_string = f_string.replace('$1', fuzzy_string.hours[(hour) % 12]);
  } else {
    f_string = f_string.replace('$2', fuzzy_string.hours[(hour + 1) % 12]);
  }
    return f_string;
}

function draw() {
  let time_string = getTimeString(new Date()).replace('*', '');
  // print(time_string);
  g.setFont('Vector', (h-24*2)/text_scale);
  g.setFontAlign(0, 0);
  g.clearRect(0, 24, w, h-24);
  g.setColor(g.theme.fg);
  g.drawString(g.wrapString(time_string, w).join("\n"), w/2, h/2);
  queueDraw(timeout);
}

g.clear();
draw();

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (on) {
    draw(); // draw immediately, queue redraw
  } else { // stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});

Bangle.setUI('clock');
Bangle.loadWidgets();
Bangle.drawWidgets();
