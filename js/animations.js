/**
 * Animations
 * - Renders the ASCII portrait and keeps it scaled to fit its container
 *   (prevents horizontal overflow at any viewport width)
 * - GSAP load-in timeline (navbar, portrait reveal, staggered hero text)
 * - GSAP ScrollTrigger reveals for later sections
 * - About statement: particle-assembly text effect
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

  /* ---- About statement: particle assembly ----
     Splits each phrase into per-character spans, scatters them randomly,
     then converges them into place once the section scrolls into view.
     Runs once. Text is left untouched entirely when reduced motion is
     preferred (handled by the early return above). */
  const statement = document.querySelector('.about-statement__visual');
  if (statement) {
    const phrases = statement.querySelectorAll('[data-particle]');
    const dots = statement.querySelectorAll('[data-particle-dot]');
    const chars = [];

    phrases.forEach((phrase) => {
      const text = phrase.textContent;
      phrase.textContent = '';
      [...text].forEach((ch) => {
        if (ch === ' ') {
          phrase.appendChild(document.createTextNode('\u00A0'));
          return;
        }
        const span = document.createElement('span');
        span.className = 'particle-char';
        span.textContent = ch;
        phrase.appendChild(span);
        chars.push(span);
      });
    });

    gsap.set(chars, {
      opacity: 0,
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-36, 36),
      rotate: () => gsap.utils.random(-20, 20),
      scale: 0.4,
      filter: 'blur(5px)',
    });
    gsap.set(dots, { scale: 0 });

    ScrollTrigger.create({
      trigger: statement,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        const particleTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        particleTl
          .to(chars, {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            stagger: { each: 0.014, from: 'random' },
          })
          .to(
            dots,
            { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.08 },
            '-=0.3'
          );
      },
    });
  }
})();