/* Animated burgundy ASCII waves, anchored to document coordinates. */
(function () {
  const layer = document.getElementById('asciiWaves');
  if (!layer) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tileHeight = 720;
  const glyphs = ' .:-=+*#%@'; // Light to dense: character shape determines visual weight.
  const waveSpeed = 0.00066;
  const tiles = [];
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#800020';
  let width = 0;
  let pageHeight = 0;
  let scale = 1;
  let phase = 0;
  let frame = null;
  let layoutFrame = null;
  let lastTime = 0;

  function drawTile(tile) {
    const { ctx, offset } = tile;
    if (!ctx) return;
    const cell = width < 640 ? 14 : 16;
    ctx.clearRect(0, 0, width, tileHeight);
    ctx.fillStyle = accent;
    ctx.font = '13px Consolas, "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Sample beyond tile boundaries so characters remain continuous at the seams.
    for (let y = Math.floor(offset / cell) * cell - cell; y < offset + tileHeight + cell; y += cell) {
      for (let x = cell / 2; x < width; x += cell) {
        const u = x / 340;
        const v = y / 340;
        const field = Math.sin(u * 1.8 + Math.sin(v * 1.4 + phase) * 1.25 - phase * 0.7)
          + Math.cos(v * 1.9 - u * 0.6 + phase * 0.65)
          + Math.sin(u * 1.1 + v * 1.3 + phase * 0.4) * 0.45;
        // Broad empty areas surrounded by bands of increasingly dense characters.
        const density = Math.max(0, Math.min(1, (field + 0.35) / 1.9));
        const glyph = glyphs[Math.min(glyphs.length - 1, Math.floor(density * glyphs.length))];
        if (glyph === ' ') continue;
        const edge = Math.min(1, (x + 40) / 160, (width - x + 40) / 160);
        const verticalFade = Math.max(0, Math.min(1, y / 120, (pageHeight - y) / 120));
        // Keep size and opacity consistent; only fade at the page edges.
        ctx.globalAlpha = 0.42 * edge * verticalFade * (width < 640 ? 0.85 : 1);
        ctx.fillText(glyph, x, y - offset);
      }
    }
    ctx.globalAlpha = 1;
  }

  function draw() {
    tiles.forEach(drawTile);
  }

  function updateTiles() {
    // Reuse only enough canvases for the viewport, even during long pinned sections.
    const first = Math.max(0, Math.floor(window.scrollY / tileHeight));
    const count = Math.max(0, Math.min(
      Math.ceil(window.innerHeight / tileHeight) + 1,
      Math.ceil(pageHeight / tileHeight) - first
    ));
    while (tiles.length > count) tiles.pop().canvas.remove();
    while (tiles.length < count) {
      const canvas = document.createElement('canvas');
      canvas.style.height = `${tileHeight}px`;
      layer.appendChild(canvas);
      tiles.push({ canvas, ctx: canvas.getContext('2d'), offset: -1 });
    }
    tiles.forEach((tile, index) => {
      const offset = (first + index) * tileHeight;
      const pixelWidth = Math.round(width * scale);
      const pixelHeight = Math.round(tileHeight * scale);
      let dirty = offset !== tile.offset;
      tile.offset = offset;
      tile.canvas.style.top = `${offset}px`;
      if (tile.canvas.width !== pixelWidth || tile.canvas.height !== pixelHeight) {
        tile.canvas.width = pixelWidth;
        tile.canvas.height = pixelHeight;
        if (tile.ctx) tile.ctx.setTransform(scale, 0, 0, scale, 0, 0);
        dirty = true;
      }
      if (dirty) drawTile(tile);
    });
  }

  function resize() {
    layoutFrame = null;
    width = document.documentElement.clientWidth;
    // Measure normal content, never the background's own scroll overflow.
    pageHeight = Math.max(window.innerHeight, document.body.offsetHeight);
    layer.style.height = `${pageHeight}px`;
    scale = Math.min(window.devicePixelRatio || 1, 1.5);
    updateTiles();
    draw();
  }

  function scheduleResize() {
    if (layoutFrame === null) layoutFrame = requestAnimationFrame(resize);
  }

  function animate(now) {
    if (now - lastTime >= 1000 / 24) {
      phase += Math.min(now - lastTime, 100) * waveSpeed;
      lastTime = now;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    draw();
    if (!reducedMotion.matches && !document.hidden) {
      lastTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  new ResizeObserver(scheduleResize).observe(document.body);
  window.addEventListener('resize', scheduleResize, { passive: true });
  window.addEventListener('scroll', updateTiles, { passive: true });
  window.addEventListener('load', scheduleResize);
  document.addEventListener('visibilitychange', syncAnimation);
  reducedMotion.addEventListener('change', syncAnimation);
  resize();
  syncAnimation();
})();
