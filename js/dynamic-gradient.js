/**
 * Dynamic Gradient & Spotlight Controller
 * Inspired by the reference portfolio's dynamic dual-layer radial gradient,
 * tailored specifically to #220C3F (Dark Purple) and Deep Velvet Black (#06020c).
 * 
 * Visual Principle:
 * - Inner layer: Subtle luminous white specular core highlight (depth & glass luminescence)
 * - Outer layer: Expansive #220C3F aura blooming into luminous violet and transitioning
 *   smoothly into velvety obsidian black.
 * - Fluid requestAnimationFrame lerp tracking for desktop mouse movements (60-120fps).
 * - Smooth touch tracking for mobile and tablet screens.
 * - Organic ambient breathing drift when idle or on mobile before interaction.
 * - Respects prefers-reduced-motion for complete accessibility.
 */

(function () {
  'use strict';

  function initDynamicGradient() {
    const spotlight = document.getElementById('dynamic-spotlight');
    if (!spotlight) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Viewport dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
    }, { passive: true });

    // Target position and current interpolated position
    let targetX = width * 0.5;
    let targetY = height * 0.35;
    let currentX = targetX;
    let currentY = targetY;

    let isUserInteracting = false;
    let idleTimer = null;
    let animTime = 0;

    function resetIdleTimer() {
      isUserInteracting = true;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isUserInteracting = false;
      }, 3500);
    }

    // Mouse tracking on desktop
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      resetIdleTimer();
    }, { passive: true });

    // Touch tracking on mobile/tablet
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        resetIdleTimer();
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        resetIdleTimer();
      }
    }, { passive: true });

    // If reduced motion is requested, render static center gradient and return
    if (prefersReducedMotion) {
      applySpotlight(targetX, targetY);
      return;
    }

    // Animation frame loop with smooth lerp physics
    function updateFrame() {
      animTime += 0.015;

      // When user is idle (or on mobile before touch), apply subtle organic ambient drift
      if (!isUserInteracting) {
        const driftRadiusX = width * 0.22;
        const driftRadiusY = height * 0.18;
        const centerX = width * 0.5;
        const centerY = height * 0.42;

        targetX = centerX + Math.cos(animTime * 0.7) * driftRadiusX;
        targetY = centerY + Math.sin(animTime * 1.1) * driftRadiusY;
      }

      // Smooth linear interpolation (lerp)
      const ease = 0.09;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      applySpotlight(currentX, currentY);

      requestAnimationFrame(updateFrame);
    }

    function applySpotlight(x, y) {
      const px = Math.round(x);
      const py = Math.round(y);
      spotlight.style.background = `
        radial-gradient(240px at ${px}px ${py}px, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 35%, transparent 70%),
        radial-gradient(780px at ${px}px ${py}px, rgba(110, 48, 191, 0.32) 0%, rgba(54, 21, 96, 0.45) 28%, rgba(34, 12, 63, 0.65) 55%, rgba(6, 2, 12, 0.75) 75%, transparent 85%)
      `;
    }

    requestAnimationFrame(updateFrame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicGradient);
  } else {
    initDynamicGradient();
  }
})();
