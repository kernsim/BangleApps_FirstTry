// adapted from https://github.com/hallettj/Fuzzy-Text-International/

let fuzzy_string = {
  "hours":[
    "zwölfe",
    "einse",
    "zwoie",
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
  "minutes":[
    "*$1",
    "fünf nach *$1",
    "zehn nach *$1",
    "viertel *$2",
    "zwanzig nach *$1",
    "fünfezwanzg nach *$1",
    "halb *$2",
    "fünf nach halb *$2",
    "zehn nach halb *$2",
    "dreiviertel *$2",
    "zehn vor *$2",
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

function draw(lcdOn) {
  let date = new Date();
  let time_string = getTimeString(date).replace('*', '');
  // print(time_string);
  g.setFont('Vector', (h-24*2)/text_scale);
  g.setFontAlign(0, 0);
  g.clearRect(0, 24, w, h);
  g.setColor(g.theme.fg);
  g.drawString(g.wrapString(time_string, w).join("\n"), w/2, h/2);
  var da = date.toString().split(" ");
  var time = da[4].substr(0, 5).split(":");
  var hours = time[0], minutes = time[1];
  var datestr = da[2] + ' ' + da[1] + ' ' + da[3];
  g.setFont("12x20", 1);
  g.setFontAlign(0, 0);
  g.drawString(`${hours}:${minutes} `+datestr , w/2, h-10, true);
  //date.getHours()+':'+date.getMinutes()+" - "+ date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear(), g.getWidth()/2, g.getHeight()-20, true);
  queueDraw(timeout);
}

g.clear();
draw(true);

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
