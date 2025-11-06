// Sparkle Cursor Effect (from https://webdesign.tutsplus.com/javascript-sparkle-cursor--cms-109158t)
// This script creates sparkles that follow the mouse cursor.

if (typeof window !== 'undefined') {
  let color = "#fff7b2"; // Always use this color for sparkles #fff7b2
  let sparkles = 50;

  let x = 400;
  let y = 300;
  let ox = 400;
  let oy = 300;
  let swide = window.innerWidth;
  let shigh = window.innerHeight;
  let sleft = window.pageXOffset;
  let sdown = window.pageYOffset;
  let tiny = [];
  let star = [];
  let starv = [];
  let starx = [];
  let stary = [];
  let tinyv = [];
  let tinyx = [];
  let tinyy = [];

  function sparkle() {
    let c;
    if (x !== ox || y !== oy) {
      ox = x;
      oy = y;
      for (c = 0; c < sparkles; c++) if (!starv[c]) {
        star[c].style.left = (starx[c] = x) + "px";
        star[c].style.top = (stary[c] = y) + "px";
        star[c].style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
        star[c].style.background = color;
        // star[c].style.backgroundColor = color;
        star[c].style.opacity = 1;
        star[c].style.display = "block";
        starv[c] = 50;
        break;
      }
    }
    for (c = 0; c < sparkles; c++) {
      if (starv[c]) update_star(c);
      if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
  }

  function update_star(i) {
    if (--starv[i] === 25) {
      star[i].style.opacity = 0.5;
    }
    if (starv[i] > 0) {
      stary[i] += 1 + Math.random() * 3;
      starx[i] += (i % 5 - 2) / 2;
      star[i].style.top = stary[i] + "px";
      star[i].style.left = starx[i] + "px";
    } else {
      star[i].style.display = "none";
      tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
      tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
      tiny[i].style.background = color;
      tiny[i].style.backgroundColor = color;
      tiny[i].style.opacity = 0.7;
      tiny[i].style.display = "block";
      tinyv[i] = 10;
    }
  }

  function update_tiny(i) {
    if (--tinyv[i] === 5) {
      tiny[i].style.opacity = 0.3;
    }
    if (tinyv[i] > 0) {
      tinyy[i] += 1 + Math.random() * 2;
      tinyx[i] += (i % 5 - 2) / 2;
      tiny[i].style.top = tinyy[i] + "px";
      tiny[i].style.left = tinyx[i] + "px";
    } else {
      tiny[i].style.display = "none";
    }
  }

  function mouse(e) {
    y = e.clientY;
    x = e.clientX;
  }

  function set_width() {
    swide = window.innerWidth;
    shigh = window.innerHeight;
  }

  function createDiv(height, width) {
    let div = document.createElement("div");
    div.style.position = "fixed";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.pointerEvents = "none";
    div.style.zIndex = 9999;
    return div;
  }

  window.addEventListener("mousemove", mouse, false);
  window.addEventListener("resize", set_width, false);

  for (let i = 0; i < sparkles; i++) {
  let s = createDiv(8, 8);
  s.style.borderRadius = "50%";
  s.style.boxShadow = `0 0 8px 2px ${color}`;
  s.style.background = color;
  s.style.backgroundColor = color;
  s.style.display = "none";
  document.body.appendChild((star[i] = s));
  starv[i] = 0;
  let t = createDiv(4, 4);
  t.style.borderRadius = "50%";
  t.style.boxShadow = `0 0 6px 1px ${color}`;
  t.style.background = color;
  t.style.backgroundColor = color;
  t.style.display = "none";
  document.body.appendChild((tiny[i] = t));
  tinyv[i] = 0;
  }
  set_width();
  sparkle();
}