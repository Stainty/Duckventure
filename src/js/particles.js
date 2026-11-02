/* ---------- canvas ---------- */
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = innerWidth  * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', resize);
  resize();

/* ---------- частицы "Кря" ---------- */
  function spawn(x, y) {
    if (!isWindowFocused()) return;
    const isMobile = window.innerWidth <= 600;
    const scale = Math.max(0.65, Math.min(1.0, window.innerWidth / 768));
    const n = isMobile ? (6 + (Math.random() * 5 | 0)) : (8 + (Math.random() * 8 | 0));
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI;          // 0°..180° — весь верхний разброс
      const speed = (90 + Math.random() * 320) * scale;
      particles.push({
        x: x + (Math.random() - .5) * (20 * scale),
        y: y + (Math.random() - .5) * (14 * scale),
        vx: Math.cos(ang) * speed,
        vy: -Math.sin(ang) * speed,
        size: Math.round((12 + Math.random() * 20) * scale), // адаптивный аккуратный размер
        alpha: .18 + Math.random() * .72,
        hue: Math.random() * 360 | 0,
        sat: 65 + Math.random() * 35 | 0,
        light: 55 + Math.random() * 22 | 0,
      });
    }
  }
