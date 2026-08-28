/**
 * Main
 * - App bootstrap
 * - Reusable project-detail modal controller.
 *   No project data is wired up yet (see brief §10) — this just gives
 *   the Project section a working, accessible modal architecture that
 *   a later project-card click handler can call into via
 *   window.ProjectModal.open(data).
 */
(function () {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const panel = modal.querySelector('.project-modal__panel');
  const els = {
    eyebrow: document.getElementById('projectModalEyebrow'),
    title: document.getElementById('projectModalTitle'),
    image: document.getElementById('projectModalImage'),
    overview: document.getElementById('projectModalOverview'),
    stack: document.getElementById('projectModalStack'),
    description: document.getElementById('projectModalDescription'),
    links: document.getElementById('projectModalLinks'),
  };

  let lastFocused = null;

  /**
   * Shape of `data`:
   * {
   *   eyebrow: string,       // e.g. "PROJECT 01"
   *   title: string,
   *   image: string,         // background-image URL, optional
   *   overview: string,
   *   stack: string[],       // tech stack labels
   *   description: string,
   *   links: { label: string, url: string }[]
   * }
   */
  function open(data) {
    if (!data) return;
    els.eyebrow.textContent = data.eyebrow || '';
    els.title.textContent = data.title || '';
    els.overview.textContent = data.overview || '';
    els.description.textContent = data.description || '';

    els.image.style.backgroundImage = data.image ? `url(${data.image})` : 'none';
    els.image.style.backgroundSize = 'cover';
    els.image.style.backgroundPosition = 'center';

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
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      els.links.appendChild(a);
    });

    lastFocused = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.setAttribute('data-open', 'true'));
    document.body.style.overflow = 'hidden';
    panel.querySelector('.project-modal__close').focus();
  }

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
    if (e.key === 'Escape' && modal.getAttribute('data-open') === 'true') {
      close();
    }
  });

  window.ProjectModal = { open, close };
})();