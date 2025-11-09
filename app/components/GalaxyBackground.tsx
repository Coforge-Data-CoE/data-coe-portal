import React from "react";

const GalaxyBackground: React.FC = React.memo(() => {
  // Generate random stars
  const stars = Array.from({ length: 120 }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.7 + 0.3;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'white',
          opacity,
          boxShadow: `0 0 ${size * 6}px #fff, 0 0 ${size * 12}px #29B5E8`,
        }}
      />
    );
  });
  // Swirl and glow with galaxy colors
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Swirl effect with galaxy colors */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '900px',
        height: '900px',
        transform: 'translate(-50%, -50%)',
        // background: 'radial-gradient(ellipse at center, #130e4bff 0%, #062553ff 50%, #030c23ff 100%)',
        opacity: 0.32,
        filter: 'blur(32px)',
        zIndex: 1,
      }} />
      {/* Stars */}
      {stars}
      {/* Center glow with violet/blue */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '320px',
        height: '320px',
        transform: 'translate(-50%, -50%)',
        // background: 'radial-gradient(circle, #fff 0%, #1C165D 40%, #0D3168 80%, transparent 100%)',
        opacity: 0.22,
        filter: 'blur(16px)',
        zIndex: 2,
      }} />
    </div>
  );
});

export default GalaxyBackground;
