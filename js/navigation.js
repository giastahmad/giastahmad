/**
 * Navigation
 * - Smooth scroll to sections (accounting for fixed navbar height)
 * - Active-section indicator via IntersectionObserver
 * - Mobile menu toggle
 */
(function () {
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = Array.from(document.querySelectorAll('.section'));
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function getNavHeight() {
    return navbar ? navbar.getBoundingClientRect().height : 0;
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - getNavHeight() + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const section = link.getAttribute('data-section');
      if (!section) return;
      e.preventDefault();
      closeMobileMenu();
      scrollToSection(section);
      history.pushState(null, '', '#' + section);
    });
  });

  function setActive(id) {
    navLinks.forEach((link) => {
      const match = link.getAttribute('data-section') === id;
      if (match) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${getNavHeight() + 10}px 0px -55% 0px`,
        threshold: 0,
      }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ---- Mobile menu ---- */
  function openMobileMenu() {
    mobileMenu.setAttribute('data-open', 'true');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.setAttribute('data-open', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('data-open') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  window.Navigation = { scrollToSection };
})();