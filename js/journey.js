(function () {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------------
  // CONTENT
  // ---------------------------------------------------------------------
  const DATA = [
    {
      period: 'Apr 2023 — Feb 2024',
      title: 'BEM FMIPA Unpad',
      role: 'Internal Relations',
      bullets: [
        'Led Capacity Building, 80+ strong',
        'Safari MIPA: concept to launch',
        'Feedback loops that shipped fixes',
      ],
      images: [
        'assets/journey/bem-stuban.jpg',
        'assets/journey/bem-mipa-awards.jpeg',
        'assets/journey/bem-sertifikat.jpg',
      ],
    },
    {
      period: 'Sep 2024 — Jan 2025',
      title: 'Bangkit Academy',
      role: 'Android Cohort',
      bullets: [
        '6/6 certifications cleared',
        'ILT: pitch, present, ship',
        'Journaling app, live in 4mo',
      ],
      images: ['assets/journey/bangkit-briefing.jpeg', 'assets/journey/bangkit-sertifikat.jpg'],
    },
    {
      period: 'Aug 2025 — Feb 2026',
      title: 'Danone Indonesia',
      role: 'Finance Automation',
      bullets: [
        'VBA-powered SAP workflow automation',
        'SO Release: manual to automated',
        'I2C dashboards, rebuilt for trust',
      ],
      images: [
        'assets/journey/danone-signage.jpg',
        'assets/journey/danone-office.jpg',
        'assets/journey/danone-sertifikat.jpg',
      ],
    },
    {
      period: 'Jul 2026 — Present',
      title: 'ParagonCorp',
      role: 'HSE Data Analyst',
      bullets: [
        'Power BI, live ERT status',
        'Power Apps inspection workflow',
        'Compliance dashboards, digitized',
      ],
      images: ['assets/journey/paragon-signage.jpg', 'assets/journey/paragon-team.jpeg'],
    },
  ];

  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const pin = document.querySelector('.journey-pin');
  const dots = gsap.utils.toArray('[data-dot]');
  const fill = document.querySelector('[data-fill]');
  const indexEl = document.querySelector('[data-stage="index"]');
  const periodEl = document.querySelector('[data-stage="period"]');
  const titleEl = document.querySelector('[data-stage="title"]');
  const roleEl = document.querySelector('[data-stage="role"]');
  const bulletEls = [0, 1, 2].map((i) =>
    document.querySelector(`[data-stage="bullet${i}"]`)
  );
  const photoImg = document.querySelector('[data-carousel-img]');
  const photoCount = document.querySelector('[data-carousel-count]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  if (!pin || !titleEl) return;

  const listEl = document.querySelector('.journey-stage__list');
  const progressEl = document.querySelector('.journey-progress');

  function updateMobileLayout() {
    if (!listEl || !progressEl) return;
    if (window.innerWidth > 960) {
      pin.removeAttribute('data-mobile-layout');
      return;
    }

    pin.removeAttribute('data-mobile-layout');
    const listRect = listEl.getBoundingClientRect();
    const progressRect = progressEl.getBoundingClientRect();
    const hasClippingRisk = listRect.bottom > progressRect.top - 4;
    if (hasClippingRisk) pin.setAttribute('data-mobile-layout', 'tags');
  }

  function hash(a, b) {
    const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#';

  function morphText(el, fromText, toText, t) {
    const len = Math.max(fromText.length, toText.length);
    let out = '';
    for (let i = 0; i < len; i++) {
      const a = fromText[i] || '';
      const b = toText[i] || '';
      if (a === b) {
        out += a;
        continue;
      }
      const jitter = (hash(i, 3) - 0.5) * 0.12;
      const start = Math.max(0, Math.min(1, (i / len) * 0.55 + jitter));
      const end = Math.min(1, start + 0.28);
      if (t <= start) {
        out += a || ' ';
      } else if (t >= end) {
        out += b || '';
      } else {
        const glyph =
          SCRAMBLE_CHARS[
            Math.floor(hash(i, Math.floor(t * 20)) * SCRAMBLE_CHARS.length)
          ];
        out += `<span class="decrypt-char">${glyph}</span>`;
      }
    }
    el.innerHTML = out;
  }

  function showStatic(index) {
    const d = DATA[index];
    titleEl.textContent = d.title;
    roleEl.textContent = d.role;
    bulletEls.forEach((el, i) => {
      if (el) el.textContent = d.bullets[i];
    });
  }

  function morphFields(fromIndex, toIndex, t) {
    const a = DATA[fromIndex];
    const b = DATA[toIndex];
    morphText(titleEl, a.title, b.title, t);
    morphText(roleEl, a.role, b.role, t);
    bulletEls.forEach((el, i) => {
      if (el) morphText(el, a.bullets[i], b.bullets[i], t);
    });
  }

  let currentLabelIndex = -1;
  function updateLabels(index) {
    if (currentLabelIndex === index) return;
    currentLabelIndex = index;
    if (indexEl) {
      indexEl.textContent =
        String(index + 1).padStart(2, '0') + ' / ' + String(DATA.length).padStart(2, '0');
    }
    if (periodEl) periodEl.textContent = DATA[index].period;
  }


  let currentExperience = -1;
  let photoIndex = 0;

  function renderPhoto() {
    if (!photoImg) return;
    const images = DATA[currentExperience].images;
    photoImg.removeAttribute('data-loaded');
    photoImg.src = images[photoIndex];
    photoImg.alt = `${DATA[currentExperience].title} — photo ${photoIndex + 1}`;
    photoImg.onload = () => photoImg.setAttribute('data-loaded', 'true');
    if (photoCount) photoCount.textContent = `${photoIndex + 1} / ${images.length}`;
    const singlePhoto = images.length <= 1;
    if (prevBtn) prevBtn.disabled = singlePhoto;
    if (nextBtn) nextBtn.disabled = singlePhoto;
  }

  function updateCarousel(index) {
    if (currentExperience === index) return;
    currentExperience = index;
    photoIndex = 0;
    renderPhoto();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const images = DATA[currentExperience].images;
      photoIndex = (photoIndex - 1 + images.length) % images.length;
      renderPhoto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const images = DATA[currentExperience].images;
      photoIndex = (photoIndex + 1) % images.length;
      renderPhoto();
    });
  }

  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute('data-active', 'true');
      else dot.removeAttribute('data-active');
    });
  }

  if (prefersReducedMotion) {
    showStatic(0);
    updateLabels(0);
    updateCarousel(0);
    setActiveDot(0);
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const DWELL = 0.9;
  const TRANSITION = 0.5;

  const blocks = [];
  DATA.forEach((_, i) => {
    blocks.push({ type: 'dwell', panel: i, weight: DWELL });
    if (i < DATA.length - 1) {
      blocks.push({ type: 'transition', from: i, to: i + 1, weight: TRANSITION });
    }
  });
  const totalWeight = blocks.reduce((sum, b) => sum + b.weight, 0);

  function render(overallProgress) {
    let pos = Math.max(0, Math.min(1, overallProgress)) * totalWeight;
    let block = blocks[blocks.length - 1];
    let local = 1;

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (pos <= b.weight || i === blocks.length - 1) {
        block = b;
        local = Math.max(0, Math.min(1, pos / b.weight));
        break;
      }
      pos -= b.weight;
    }

    if (block.type === 'dwell') {
      showStatic(block.panel);
      updateLabels(block.panel);
      updateCarousel(block.panel);
      setActiveDot(block.panel);
    } else {
      morphFields(block.from, block.to, local);
      const targetIndex = local >= 0.5 ? block.to : block.from;
      updateLabels(targetIndex);
      updateCarousel(targetIndex);
      setActiveDot(targetIndex);
    }

    if (fill) fill.style.width = overallProgress * 100 + '%';
  }

  render(0); // initial paint before any scroll
  updateMobileLayout();

  const st = ScrollTrigger.create({
    trigger: pin,
    start: 'top top',
    end: () => '+=' + window.innerHeight * totalWeight,
    pin: true,
    scrub: 0.4,
    anticipatePin: 1,
    onUpdate: (self) => render(self.progress),
  });

  window.addEventListener('load', () => {
    updateMobileLayout();
    ScrollTrigger.refresh();
  });
  window.addEventListener('resize', () => {
    updateMobileLayout();
    ScrollTrigger.refresh();
  });
})();