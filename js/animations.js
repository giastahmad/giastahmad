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
    .set('#navbar', { opacity: 0, y: -14 })
    .set('.hero__ascii-layer', { opacity: 0 })

    .to('#navbar', { opacity: 1, y: 0, duration: 0.6 }, 0.05)
    .to('.hero__ascii-layer', { opacity: 1, duration: 0.8 }, 0.18)
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