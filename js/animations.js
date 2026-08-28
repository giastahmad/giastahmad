/**
 * Animations
 * - Renders the ASCII portrait and keeps it scaled to fit its container
 *   (prevents horizontal overflow at any viewport width)
 * - GSAP load-in timeline (navbar, portrait reveal, staggered hero text)
 * - GSAP ScrollTrigger reveals for later sections
 * - Fully respects prefers-reduced-motion
 */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     ASCII portrait: inject + responsive scale
     ----------------------------------------------------------------------- */
  const asciiEl = document.getElementById('asciiPortrait');
  const asciiWrap = asciiEl ? asciiEl.closest('.terminal-card__body') : null;

  function fitAsciiPortrait() {
    if (!asciiEl || !asciiWrap) return;
    // Reset transform to measure natural size at base font-size.
    asciiEl.style.transform = 'scale(1)';
    const wrapWidth = asciiWrap.clientWidth;
    const naturalWidth = asciiEl.scrollWidth;
    const naturalHeight = asciiEl.scrollHeight;
    if (!naturalWidth) return;

    const scale = Math.min(1.6, wrapWidth / naturalWidth);
    asciiEl.style.transform = `scale(${scale})`;
    // Collapse the wrapper's reserved space to the scaled size so no
    // extra whitespace (or clipping) appears below/right of the art.
    asciiWrap.style.height = `${naturalHeight * scale}px`;
  }

  if (asciiEl) {
    asciiEl.textContent = typeof ASCII_PORTRAIT !== 'undefined' ? ASCII_PORTRAIT : '';
    fitAsciiPortrait();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitAsciiPortrait, 120);
    });
    // Fonts loading late can change measured widths — refit once ready.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitAsciiPortrait);
    }
  }

  /* -----------------------------------------------------------------------
     GSAP setup
     ----------------------------------------------------------------------- */
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (prefersReducedMotion) {
    // Ensure everything is simply visible; skip motion entirely.
    gsap.set('[data-animate]', { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
    return;
  }

  /* ---- Load-in timeline ---- */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set('.hero__text-col [data-animate="text"]', { opacity: 0, y: 22 })
    .set('.terminal-card', { opacity: 0, y: 16 })
    .set('#navbar', { opacity: 0, y: -14 })

    .to('#navbar', { opacity: 1, y: 0, duration: 0.6 }, 0.05)
    .to('.terminal-card', { opacity: 1, y: 0, duration: 0.7 }, 0.15)
    .fromTo(
      '.terminal-card__body',
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power4.inOut' },
      0.25
    )
    .to(
      '.hero__text-col [data-animate="text"]',
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
      0.35
    );

  /* ---- Scroll reveals for later sections ---- */
  const revealSections = gsap.utils.toArray('[data-animate="section"]');
  revealSections.forEach((el) => {
    const inner = el.querySelector('.placeholder-section__inner');
    if (!inner) return;
    gsap.fromTo(
      inner,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
})();