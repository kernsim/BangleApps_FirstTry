/**** custom version of Bangle.drawWidgets (does not clear the widget areas) ****/

Bangle.drawWidgets = function () {
  var w = g.getWidth(), h = g.getHeight();

  var pos = {
    tl:{x:0,   y:0,    r:0, c:0}, // if r==1, we're right->left
    tr:{x:w-1, y:0,    r:1, c:0},
    bl:{x:0,   y:h-24, r:0, c:0},
    br:{x:w-1, y:h-24, r:1, c:0}
  };

  if (global.WIDGETS) {
    for (var wd of WIDGETS) {
      var p = pos[wd.area];
      if (!p) continue;

      wd.x = p.x - p.r*wd.width;
      wd.y = p.y;

      p.x += wd.width*(1-2*p.r);
      p.c++;
    }

    g.reset();                                 // also loads the current theme

    if (pos.tl.c || pos.tr.c) {
      g.setClipRect(0,h-24,w-1,h-1);
      g.reset();                           // also (re)loads the current theme
    }

    if (pos.bl.c || pos.br.c) {
      g.setClipRect(0,h-24,w-1,h-1);
      g.reset();                           // also (re)loads the current theme
    }

    try {
      for (wd of WIDGETS) {
        g.clearRect(wd.x,wd.y, wd.x+wd.width-1,23);
        wd.draw(wd);
      }
    } catch (e) { print(e); }
  }
};

Graphics.prototype.setFontUndo = function(scale) {
  // Actual height 19 (20 - 2)
  this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKqKAqooCqigKqKAAAACgAAKAAAoAACgAAAAAAAAACgAAKAAAoAACgAAAAAAKCgAoKAKqqAqqoCqqgKqqAKCgAoKAKqqAqqoCqqgKqqAKCgAoKAAAAAKgoAqCgKqKAqooKiioqKKiooqKiioKKqAoqoCgqAKCoAAAACoCgKgKAiCoCIKgKioAqKgACoAAKgACoAAKgACoqAKioCoIgKgiAoCoCgKgAAAAKqgAqqAKqqAqqoKiioqKKiooqKiioKAKAoAoCgCgKAKAAAACgAAKAAAoAACgAAAAAAKqgAqqAKqqAqqoCgCgKAKAAAACgCgKAKAqqoCqqgCqoAKqgAAAACigAKKAAqoACqgAqoACqgAKqAAqoAAqoACqgAKKAAooAAAAAAoAACgAAKAAAoAAqqACqoAKqgAqqAAKAAAoAACgAAKAAAAAAACoAAKgAAqAACoAAAAAoAACgAAKAAAoAACgAAKAAAoAACgAAKAAAoAACgAAKAAAAAAACgAAKAAAoAACgAAAAAAoAACgAAqAACoAAqAACoAAqAACoAAqAACoAAqAACoAAqAACoAAKAAAoAAAAAACqoAKqgCqqgKqqAoAoCgCgKAKAoAoCqqgKqqAKqgAqqAAAAAqqoCqqgKqqAqqoAAAAKCqAoKoCiqgKKqAoooCiigKKKAoooCqigKqKAKgoAqCgAAAAoAoCgCgKAKAoAoCiigKKKAoooCiigKqqAqqoAqqACqoAAAACqAAKoAAqoACqgAAKAAAoAACgAAKAAqqoCqqgKqqAqqoAAAAKoKAqgoCqigKqKAoooCiigKKKAoooCiqgKKqAoKgCgqAAAAAKqgAqqAKqqAqqoCiigKKKAoooCiigKKqAoqoCgqAKCoAAAACgAAKAAAoAACgAAKAAAoAACgAAKAAAqqoCqqgCqqAKqoAAAACqoAKqgCqqgKqqAoooCiigKKKAoooCqqgKqqAKqgAqqAAAAAKgAAqAAKqAAqoACigAKKAAooACigAKqqAqqoAqqgCqqAAAACgCgKAKAoAoCgCgAAAAoAqCgCoKAKgoAqAAAAAKAAAoAAKoAAqgAKqgAqqAKgqAqCoCgCgKAKAAAAAoKACgoAKCgAoKACgoAKCgAoKACgoAKCgAoKACgoAKCgAAAAKAKAoAoCoKgKgqAKqgAqqAAqgACqAACgAAKAAAAACgAAKAAAoAACgAAKKKAoooCiigKKKAqoACqgACoAAKgAAAAACqqAKqoCqqgKqqAoAACgAAKCoAoKgCiqgKKqAoooCiigKqqAqqoAqqACqoAAAAAqqgCqqAqqoCqqgKKAAooACigAKKAAqqoCqqgCqqAKqoAAAAKqqAqqoCqqgKqqAoooCiigKKKAoooCqqgKqqAKCgAoKAAAAAKqgAqqAKqqAqqoCgCgKAKAoAoCgCgKAKAoAoCgCgKAKAAAACqqgKqqAqqoCqqgKAKAoAoCoKgKgqAKqgAqqAAqgACqAAAAACqoAKqgCqqgKqqAoooCiigKKKAoooCgCgKAKAoAoCgCgAAAAKqoAqqgKqqAqqoCigAKKAAooACigAKAAAoAACgAAKAAAAAAAqqACqoAqqoCqqgKAKAoAoCiigKKKAoqoCiqgKKqAoqoAAAAKqqAqqoCqqgKqqAAoAACgAAKAAAoACqqgKqqAqqoCqqgAAAAoAoCgCgKAKAoAoCqqgKqqAqqoCqqgKAKAoAoCgCgKAKAAAAAAKAAAoAACoAAKgAAKAAAoAACgAAKAqqoCqqgKqoAqqgAAAAKqqAqqoCqqgKqqACqAAKoACqoAKqgCoKgKgqAoAoCgCgAAAAqqgCqqAKqqAqqoAACgAAKAAAoAACgAAKAAAoAACgAAKAAAACqqgKqqAqqoCqqgCoAAKgAAKgAAqAAKgAAqAAKqqAqqoCqqgKqqAAAACqqgKqqAqqoCqqgCoAAKgAAKgAAqAAqqoCqqgKqqAqqoAAAACqoAKqgCqqgKqqAoAoCgCgKAKAoAoCqqgKqqAKqgAqqAAAAAqqoCqqgKqqAqqoCigAKKAAooACigAKqAAqoAAqAACoAAAAAAqqACqoAqqoCqqgKAKAoAoCgKgKAqAqqoCqqgCqqAKqoAAAAKqqAqqoCqqgKqqAooACigAKKgAoqACqqgKqqAKioAqKgAAAAKgoAqCgKqKAqooCiigKKKAoooCiigKKqAoqoCgqAKCoAAAACgAAKAAAoAACgAAKqqAqqoCqqgKqqAoAACgAAKAAAoAAAAAAKqoAqqgCqqgKqqAAAoAACgAAKAAAoCqqgKqqAqqgCqqAAAAAqqACqoAKqoAqqgAAKgAAqAACoAAKgKqoAqqgCqoAKqgAAAACqqgKqqAqqoCqqgACoAAKgACoAAKgAAKgAAqAKqqAqqoCqqgKqqAAAACoKgKgqAqqoCqqgAqgACqAAKoAAqgAqqoCqqgKgqAqCoAAAAKoAAqgACqgAKqAAAqoACqgAKqAAqoCqgAKqAAqgACqAAAAAAoCoCgKgKCqAoKoCiqgKKqAqooCqigKoKAqgoCoCgKgKAAAACqqgKqqAqqoCqqgKAKAoAoAAAAKAAAoAACoAAKgAAKgAAqAAAqAACoAACoAAKgAAKgAAqAAAqAACoAACgAAKAAAACgCgKAKAqqoCqqgKqqAqqoAAA"), 32, atob("DQULDw0RDQUHBw0NBQ0FEQ0FDQ0NDQ0NDQ0FBQsNCw0RDQ0NDQ0NDQ0NDQ0NDw0NDQ0NDQ0NDQ8NDQ0HEQc="), 22+(scale<<8)+(1<<16));
  return this;
};

function getImg() {
  return  {
    width : 176, height : 176, bpp : 3,
    transparent : 2,
    buffer : require("heatshrink").decompress(atob("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"))
  };
}

// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}


let screens = ["fullscreen", "widgets"];
let screen_index = 0;

function draw() {
  // queue draw in one minute
  queueDraw();

  g.reset().clear(); // Rect(0,24,g.getWidth(),g.getHeight());
  g.drawImage(getImg(),0,0);


  // Draw time
  let date = new Date();
  let da = date.toString().split(" ");
  let time = da[4].split(":");
  let hours = time[0], minutes = time[1];
  g.setFontAlign(0,0).setFont("Undo:2");
  g.setColor(1,1,1);
  g.drawString(`${hours}`, 92, 176/2);
  g.drawString(`${minutes}`, 140, 125);
  
  switch (screens[screen_index]) {
    case "fullscreen":
      // for (let wd of global.WIDGETS) {wd.draw=()=>{};wd.area="";}
      break;
    case "widgets":
      Bangle.drawWidgets();
      break;
  }
}

Bangle.loadWidgets();

// Clear the screen once, at startup
//g.setTheme({bg:"#000",fg:"#fff",dark:false}).clear();
// draw immediately at first, queue update
g.reset().clear();
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

Bangle.on('lock', function(isLocked) {
  print("LOCK");
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = undefined;
  draw();
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

// Show launcher when middle button pressed
Bangle.setUI("clock");
