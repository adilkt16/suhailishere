/**
 * Animations Controller
 * Handles scroll-triggered reveal animations and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

function initScrollAnimations() {
  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');

  // Immediately reveal elements already inside or near the viewport on load
  function checkInitialVisibility() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.95 && rect.bottom >= 0) {
        el.classList.add('active');
      }
    });
  }
  checkInitialVisibility();
  window.addEventListener('scroll', checkInitialVisibility, { passive: true, once: true });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to prevent repeated reflows
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => {
    if (!el.classList.contains('active')) {
      revealObserver.observe(el);
    }
  });

  // Fallback timer: ensure all content becomes visible even if observer or scroll didn't fire
  setTimeout(() => {
    revealElements.forEach(el => el.classList.add('active'));
  }, 900);
}

