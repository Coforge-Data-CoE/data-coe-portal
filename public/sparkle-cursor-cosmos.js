// // Sparkle effect for Cosmos cards only
// (function() {
//   let color = "#7ed6ff";
//   let sparkles = 20;
//   let cosmosCards = [];
//   let active = false;
//   let x = 0, y = 0;
//   let star = [], starv = [], starx = [], stary = [];
//   let tiny = [], tinyv = [], tinyx = [], tinyy = [];

//   function createDiv(height, width) {
//     let div = document.createElement("div");
//     div.style.position = "fixed";
//     div.style.height = height + "px";
//     div.style.width = width + "px";
//     div.style.pointerEvents = "none";
//     div.style.zIndex = 9999;
//     return div;
//   }

//   function sparkle() {
//     if (!active) {
//       setTimeout(sparkle, 40);
//       return;
//     }
//     let c;
//     for (c = 0; c < sparkles; c++) if (!starv[c]) {
//       star[c].style.left = (starx[c] = x) + "px";
//       star[c].style.top = (stary[c] = y) + "px";
//       star[c].style.background = color;
//       star[c].style.opacity = 1;
//       star[c].style.display = "block";
//       starv[c] = 30;
//       break;
//     }
//     for (c = 0; c < sparkles; c++) {
//       if (starv[c]) update_star(c);
//       if (tinyv[c]) update_tiny(c);
//     }
//     setTimeout(sparkle, 40);
//   }

//   function update_star(i) {
//     if (--starv[i] === 15) {
//       star[i].style.opacity = 0.5;
//     }
//     if (starv[i] > 0) {
//       stary[i] += 1 + Math.random() * 2;
//       starx[i] += (i % 5 - 2) / 2;
//       star[i].style.top = stary[i] + "px";
//       star[i].style.left = starx[i] + "px";
//     } else {
//       star[i].style.display = "none";
//       tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
//       tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
//       tiny[i].style.background = color;
//       tiny[i].style.opacity = 0.7;
//       tiny[i].style.display = "block";
//       tinyv[i] = 8;
//     }
//   }

//   function update_tiny(i) {
//     if (--tinyv[i] === 4) {
//       tiny[i].style.opacity = 0.3;
//     }
//     if (tinyv[i] > 0) {
//       tinyy[i] += 1 + Math.random() * 1.5;
//       tinyx[i] += (i % 5 - 2) / 2;
//       tiny[i].style.top = tinyy[i] + "px";
//       tiny[i].style.left = tinyx[i] + "px";
//     } else {
//       tiny[i].style.display = "none";
//     }
//   }

//   function cardMouseMove(e) {
//     x = e.clientX;
//     y = e.clientY;
//     active = true;
//   }
//   function cardMouseLeave() {
//     active = false;
//     // Hide all sparkles immediately
//     for (let i = 0; i < sparkles; i++) {
//       if (star[i]) star[i].style.display = "none";
//       if (tiny[i]) tiny[i].style.display = "none";
//       starv[i] = 0;
//       tinyv[i] = 0;
//     }
//   }

//   function setup() {
//     cosmosCards = document.querySelectorAll('.cosmos-card');
//     cosmosCards.forEach(card => {
//       card.addEventListener('mousemove', cardMouseMove);
//       card.addEventListener('mouseleave', cardMouseLeave);
//     });
//     for (let i = 0; i < sparkles; i++) {
//       let s = createDiv(8, 8);
//       s.style.borderRadius = "50%";
//       s.style.boxShadow = "0 0 8px 2px #7ed6ff";
//       s.style.display = "none";
//       document.body.appendChild((star[i] = s));
//       starv[i] = 0;
//       let t = createDiv(4, 4);
//       t.style.borderRadius = "50%";
//       t.style.boxShadow = "0 0 6px 1px #7ed6ff";
//       t.style.display = "none";
//       document.body.appendChild((tiny[i] = t));
//       tinyv[i] = 0;
//     }
//     sparkle();
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', setup);
//   } else {
//     setup();
//   }
// })();


(function() {
  const colors = [
    "#FFD700",
    "#FF8C00",
    "#FF4500",
    "#FB68EE",
    "#FF69B4",
    "#00CED1"
  ];

  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-trail");

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 5;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 10;

    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 10px ${color}`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.position = "fixed";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = 9999;
    sparkle.style.borderRadius = "50%";

    document.body.appendChild(sparkle);

    sparkle.animate(
      [
        {
          opacity: 1,
          transform: "translate(-50%,-50%) scale(1)"
        },
        {
          opacity: 0,
          transform: `translate(calc(-50% + ${
            Math.cos(angle) * distance
          }px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`
        }
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards"
      }
    );
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  function addCardListeners(card) {
    card.addEventListener("mousemove", (e) => {
      createSparkle(e.clientX, e.clientY);
    });
    card.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      createSparkle(touch.clientX, touch.clientY);
    }, { passive: false });
  }

  function setup() {
    const cards = document.querySelectorAll('.cosmos-card');
    cards.forEach(addCardListeners);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();