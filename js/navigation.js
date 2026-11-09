/**
 * Navigation Controller
 * Handles smooth scrolling, section tracking, sticky subnav pill states,
 * and mobile navigation drawers & dropdowns.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

function initNavigation() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopSubnavBtns = document.querySelectorAll('.subnav-btn');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  const mobileDropdown = document.querySelector('.mobile-subnav-dropdown');
  const mobileTrigger = document.querySelector('.mobile-subnav-trigger');
  const mobileActiveLabel = document.querySelector('.mobile-subnav-trigger .active-label-text');
  
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');
  
  const speedDialItems = document.querySelectorAll('.speed-dial-item');
  const speedDialWrap = document.querySelector('.speed-dial-wrap');
  const speedDialTrigger = document.querySelector('.speed-dial-trigger');

  // --- Smooth Scroll to Target with Header/Pill Offset ---
  function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const offset = 85; // Compensation for sticky subnav pill
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = targetElement.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Handle initial hash in URL if present
  if (window.location.hash) {
    const initialTarget = window.location.hash.substring(1);
    if (document.getElementById(initialTarget)) {
      setTimeout(() => {
        scrollToSection(initialTarget);
      }, 100);
    }
  }

  // Bind clicks on all navigation triggers
  document.querySelectorAll('a[href^="#"], button[data-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('href')?.substring(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        scrollToSection(targetId);

        // Close mobile drawer if open
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          closeMobileDrawer();
        }

        // Close mobile dropdown if open
        if (mobileDropdown && mobileDropdown.classList.contains('open')) {
          mobileDropdown.classList.remove('open');
        }

        // Close speed dial if open
        if (speedDialWrap && speedDialWrap.classList.contains('open')) {
          speedDialWrap.classList.remove('open');
        }
      }
    });
  });

  // --- Mobile Drawer Toggle ---
  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileDrawer);
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileDrawer();
      }
      if (mobileDropdown && mobileDropdown.classList.contains('open')) {
        mobileDropdown.classList.remove('open');
      }
      if (speedDialWrap && speedDialWrap.classList.contains('open')) {
        speedDialWrap.classList.remove('open');
      }
    }
  });

  // --- Mobile Subnav Dropdown Toggle ---
  if (mobileTrigger && mobileDropdown) {
    mobileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target)) {
        mobileDropdown.classList.remove('open');
      }
    });
  }

  // --- Speed Dial Click Toggle (Mobile/Touch Friendly) ---
  if (speedDialTrigger && speedDialWrap) {
    speedDialTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      speedDialWrap.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!speedDialWrap.contains(e.target)) {
        speedDialWrap.classList.remove('open');
      }
    });
  }

  // --- IntersectionObserver for Active Section Indication ---
  let currentActiveId = '';

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id && id !== currentActiveId) {
          currentActiveId = id;
          updateActiveNavState(id);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  function updateActiveNavState(activeId) {
    // 1. Update Desktop Subnav Pill
    desktopSubnavBtns.forEach(btn => {
      const target = btn.getAttribute('data-target');
      if (target === activeId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Update Mobile Subnav Dropdown
    mobileMenuItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === activeId) {
        item.classList.add('active');
        if (mobileActiveLabel) {
          const label = item.querySelector('.menu-label')?.textContent || item.textContent;
          mobileActiveLabel.textContent = label.trim();
        }
      } else {
        item.classList.remove('active');
      }
    });

    // 3. Update Top Header Links
    document.querySelectorAll('.header-link, .mobile-drawer-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

