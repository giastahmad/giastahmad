(function () {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const ICON_GITHUB =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
  const ICON_EXTERNAL =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8.64 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.86a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.64a.5.5 0 0 0 .5-.5z"/><path fill="currentColor" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.79L6.15 9.15a.5.5 0 1 0 .7.7L15 1.71V5.5a.5.5 0 0 0 1 0v-5z"/></svg>';

  const panel = modal.querySelector('.project-modal__panel');
  const els = {
    eyebrow: document.getElementById('projectModalEyebrow'),
    title: document.getElementById('projectModalTitle'),
    meta: document.getElementById('projectModalMeta'),
    imageWrap: document.getElementById('projectModalImage'),
    image: document.getElementById('projectModalImageImg'),
    imagePrev: document.getElementById('projectModalImagePrev'),
    imageNext: document.getElementById('projectModalImageNext'),
    imageCount: document.getElementById('projectModalImageCount'),
    overview: document.getElementById('projectModalOverview'),
    stack: document.getElementById('projectModalStack'),
    description: document.getElementById('projectModalDescription'),
    links: document.getElementById('projectModalLinks'),
  };

  let lastFocused = null;
  let images = [];
  let imageIndex = 0;

  /**
   * Shape of `data`:
   * {
   *   eyebrow: string,        // e.g. "PROJECT 01 — DATA ENGINEERING"
   *   title: string,
   *   meta: string,           // e.g. "Mar 2026 — Jun 2026 · Universitas Padjadjaran"
   *   images: string[],       // one or more image URLs (carousel if >1)
   *   overview: string,
   *   stack: string[],        // tech stack labels
   *   description: string,    // supports \n\n for paragraphs and leading "• " for bullets
   *   links: { label: string, url: string }[]
   * }
   */
  function open(data) {
    if (!data) return;
    els.eyebrow.textContent = data.eyebrow || '';
    els.title.textContent = data.title || '';
    els.meta.textContent = data.meta || '';
    els.overview.textContent = data.overview || '';

    els.description.innerHTML = '';
    const blocks = String(data.description || '')
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean);
    blocks.forEach((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      const isBulletBlock = lines.length > 0 && lines.every((l) => l.startsWith('•'));
      if (isBulletBlock) {
        const ul = document.createElement('ul');
        ul.className = 'project-modal__bullets';
        lines.forEach((l) => {
          const li = document.createElement('li');
          li.textContent = l.replace(/^•\s*/, '');
          ul.appendChild(li);
        });
        els.description.appendChild(ul);
      } else {
        const p = document.createElement('p');
        p.textContent = block;
        els.description.appendChild(p);
      }
    });

    els.stack.innerHTML = '';
    (data.stack || []).forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      els.stack.appendChild(li);
    });

    els.links.innerHTML = '';
    (data.links || []).forEach((link) => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const isGithub = /github\.com/i.test(link.url || '');
      a.innerHTML = `${isGithub ? ICON_GITHUB : ICON_EXTERNAL}<span>${link.label}</span>`;
      els.links.appendChild(a);
    });

    images = (data.images && data.images.length ? data.images : (data.image ? [data.image] : []));
    imageIndex = 0;
    renderImage();

    lastFocused = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.setAttribute('data-open', 'true'));
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
    panel.querySelector('.project-modal__close').focus();
  }

  function renderImage() {
    const hasImages = images.length > 0;
    const multi = images.length > 1;

    els.imageWrap.setAttribute('data-has-image', hasImages ? 'true' : 'false');
    els.imageWrap.setAttribute('data-multi', multi ? 'true' : 'false');
    els.imagePrev.hidden = !multi;
    els.imageNext.hidden = !multi;
    els.imageCount.hidden = !multi;

    if (hasImages) {
      els.image.setAttribute('data-loaded', 'false');
      els.image.src = images[imageIndex];
      els.image.alt = els.title.textContent
        ? `${els.title.textContent} — screenshot ${imageIndex + 1}`
        : `Screenshot ${imageIndex + 1}`;
    } else {
      els.image.removeAttribute('src');
      els.image.alt = '';
    }

    if (multi) {
      const pad = (n) => String(n).padStart(2, '0');
      els.imageCount.textContent = `${pad(imageIndex + 1)} / ${pad(images.length)}`;
    }
  }

  function showPrevImage() {
    if (images.length < 2) return;
    imageIndex = (imageIndex - 1 + images.length) % images.length;
    renderImage();
  }

  function showNextImage() {
    if (images.length < 2) return;
    imageIndex = (imageIndex + 1) % images.length;
    renderImage();
  }

  els.image.addEventListener('load', () => els.image.setAttribute('data-loaded', 'true'));
  els.imagePrev.addEventListener('click', showPrevImage);
  els.imageNext.addEventListener('click', showNextImage);

  function close() {
    modal.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 200);
    if (lastFocused) lastFocused.focus();
  }

  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  window.ProjectModal = { open, close };
})();