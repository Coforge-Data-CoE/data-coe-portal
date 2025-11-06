// Sparkle effect: 4-pointed stars (light yellow to brown) and circles, for use on specific elements or globally as needed.
(function() {
  const starColors = [
    '#fff7b2', // light yellow
    '#ffe08a',
    '#ffd166',
    '#e1a95f',
    '#d08e67ff', // brown
    '#b4613bff'  // darker brown
  ];
  const circleColors = [
    '#fff7b2', '#ffe08a', '#ffd166', '#e1a95f', '#b97a56', '#a0522d'
  ];

  function createStar(x, y) {
    const star = document.createElement('div');
    const color = starColors[Math.floor(Math.random() * starColors.length)];
  const size = Math.random() * 8 + 6; // 6-14px
    star.style.position = 'fixed';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.pointerEvents = 'none';
    star.style.zIndex = 9999;
    star.style.clipPath = 'polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)';
    star.style.background = color;
    star.style.boxShadow = `0 0 12px 2px ${color}`;
    star.style.opacity = 1;
    document.body.appendChild(star);
    // Appear after a short delay, then fall and fade
    setTimeout(() => {
      let frame = 0, frames = 30 + Math.floor(Math.random() * 10); // 30-40 frames
      let sx = x, sy = y;
      let vx = (Math.random() - 0.5) * 2; // horizontal drift
      let vy = 1 + Math.random() * 2; // vertical fall speed
      function animate() {
        frame++;
        sx += vx;
        sy += vy;
        star.style.left = `${sx}px`;
        star.style.top = `${sy}px`;
        star.style.opacity = 1 - frame / frames;
        if (frame < frames) {
          requestAnimationFrame(animate);
        } else {
          star.remove();
        }
      }
      animate();
    }, 80 + Math.random() * 120); // 80-200ms delay
  }

  function createCircle(x, y) {
    const circle = document.createElement('div');
    const color = circleColors[Math.floor(Math.random() * circleColors.length)];
  const size = Math.random() * 6 + 4; // 4-10px
    circle.style.position = 'fixed';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.borderRadius = '50%';
    circle.style.background = color;
    circle.style.boxShadow = `0 0 8px 1px ${color}`;
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = 9999;
    circle.style.opacity = 1;
    document.body.appendChild(circle);
    setTimeout(() => {
      let frame = 0, frames = 24 + Math.floor(Math.random() * 8); // 24-32 frames
      let sx = x, sy = y;
      let vx = (Math.random() - 0.5) * 1.5;
      let vy = 1 + Math.random() * 1.5;
      function animate() {
        frame++;
        sx += vx;
        sy += vy;
        circle.style.left = `${sx}px`;
        circle.style.top = `${sy}px`;
        circle.style.opacity = 1 - frame / frames;
        if (frame < frames) {
          requestAnimationFrame(animate);
        } else {
          circle.remove();
        }
      }
      animate();
    }, 80 + Math.random() * 120); // 80-200ms delay
  }

  function sparkleHandler(e) {
    // 60% chance star, 40% circle
    if (Math.random() < 0.6) {
      createStar(e.clientX, e.clientY);
    } else {
      createCircle(e.clientX, e.clientY);
    }
  }

  function setup() {
    window.addEventListener('mousemove', sparkleHandler);
    window.addEventListener('touchmove', function(e) {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        sparkleHandler({ clientX: touch.clientX, clientY: touch.clientY });
      }
    }, { passive: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
