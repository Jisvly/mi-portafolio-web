'use strict';

/* ── Scroll animations ─────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ── Navbar scroll ─────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Hamburger menu ────────────────────────────────────────── */
function initHamburgerMenu() {
  const hamburger =
    document.querySelector('.hamburger') ||
    document.querySelector('.navbar-toggle');
  const navMenu =
    document.querySelector('.nav-menu') ||
    document.querySelector('.navbar-menu');

  if (!hamburger || !navMenu) return;

  const mobileQuery = window.matchMedia('(max-width: 900px)');

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', toggleMenu);

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileQuery.matches) closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (!mobileQuery.matches) closeMenu();
  });
}

/* ── Smooth scroll ─────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight =
        document.querySelector('.navbar')?.offsetHeight || 64;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight;

      window.scrollTo({ top, behavior: 'smooth' });

      const navMenu =
        document.querySelector('.nav-menu') ||
        document.querySelector('.navbar-menu');
      const hamburger =
        document.querySelector('.hamburger') ||
        document.querySelector('.navbar-toggle');

      navMenu?.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Stars canvas ────────────────────────────────────────────── */
function initStars(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const STAR_COUNT = 120;
  let stars = [];
  let animationId = null;

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent ? parent.offsetWidth : window.innerWidth;
    canvas.height = parent ? parent.offsetHeight : window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.phase += star.speed;
      const alpha = 0.2 + (Math.sin(star.phase) + 1) * 0.4;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 240, 255, ${alpha})`;
      ctx.fill();
    });

    animationId = requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });

  return () => cancelAnimationFrame(animationId);
}

/* ── Bubbles ─────────────────────────────────────────────────── */
function initBubbles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = getComputedStyle(container);
  if (style.position === 'static') {
    container.style.position = 'relative';
  }
  container.style.overflow = 'hidden';

  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.random() * 32 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 5;

    bubble.style.cssText = `
      position: absolute;
      bottom: -${size}px;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(0, 229, 255, 0.12);
      border: 1px solid rgba(0, 229, 255, 0.35);
      pointer-events: none;
      animation: bubbleRise ${duration}s ease-in ${delay}s infinite;
    `;

    container.appendChild(bubble);
  }
}

/* ── Petals ──────────────────────────────────────────────────── */
function initPetals(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = getComputedStyle(container);
  if (style.position === 'static') {
    container.style.position = 'relative';
  }
  container.style.overflow = 'hidden';

  for (let i = 0; i < 20; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = Math.random() * 14 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 8;
    const delay = Math.random() * 10;
    const rotation = Math.random() * 360;

    petal.style.cssText = `
      position: absolute;
      top: -20px;
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.4}px;
      background: linear-gradient(135deg, #ff6eb4, #ff9ed0);
      border-radius: 50% 0 50% 50%;
      opacity: 0.7;
      pointer-events: none;
      transform: rotate(${rotation}deg);
      animation: petalFall ${duration}s linear ${delay}s infinite;
    `;

    container.appendChild(petal);
  }
}

/* ── Clouds ──────────────────────────────────────────────────── */
function initClouds(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = getComputedStyle(container);
  if (style.position === 'static') {
    container.style.position = 'relative';
  }
  container.style.overflow = 'hidden';

  for (let i = 0; i < 8; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';

    const width = Math.random() * 80 + 60;
    const top = Math.random() * 70 + 5;
    const left = Math.random() * 80;
    const duration = Math.random() * 4 + 5;
    const delay = Math.random() * 3;

    cloud.style.cssText = `
      position: absolute;
      top: ${top}%;
      left: ${left}%;
      width: ${width}px;
      height: ${width * 0.45}px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50px;
      box-shadow:
        ${width * 0.25}px ${width * 0.1}px 0 rgba(255, 255, 255, 0.06),
        ${width * 0.5}px ${width * 0.05}px 0 rgba(255, 255, 255, 0.05);
      pointer-events: none;
      animation: cloudFloat ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(cloud);
  }
}

/* ── Counter ─────────────────────────────────────────────────── */
function animateCounter(id, target, duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;

  const end = Number(target);
  if (Number.isNaN(end)) return;

  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(end * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = end;
    }
  }

  requestAnimationFrame(step);
}

/* ── Accordion ───────────────────────────────────────────────── */
function initAccordion(selectorOrElement) {
  const root =
    typeof selectorOrElement === 'string'
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;
  if (!root) return;

  const items = root.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;

    body.style.maxHeight = '0';
    body.style.overflow = 'hidden';
    body.style.transition = 'max-height 0.35s ease';

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.accordion-body');
        if (otherBody) otherBody.style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });
}

/* ── Tabs ────────────────────────────────────────────────────── */
function initTabs(selectorOrElement) {
  const root =
    typeof selectorOrElement === 'string'
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;
  if (!root) return;

  const buttons = root.querySelectorAll('.tab-btn');
  const panels = root.querySelectorAll('.tab-panel');
  if (!buttons.length || !panels.length) return;

  function activate(tabId) {
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.tab === tabId);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      if (tabId) activate(tabId);
    });
  });

  const firstTab = buttons[0].dataset.tab;
  if (firstTab) activate(firstTab);
}

/* ── Carousel ────────────────────────────────────────────────── */
function initCarousel(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const track = root.querySelector('.carousel-track');
  const prevBtn = root.querySelector('.carousel-prev');
  const nextBtn = root.querySelector('.carousel-next');
  if (!track) return;

  const slides = track.children;
  if (!slides.length) return;

  let index = 0;

  track.style.display = 'flex';
  track.style.transition = 'transform 0.45s ease';

  Array.from(slides).forEach((slide) => {
    slide.style.flex = '0 0 100%';
    slide.style.minWidth = '100%';
  });

  const viewport = root.querySelector('.carousel-viewport') || root;
  if (getComputedStyle(viewport).overflow === 'visible') {
    viewport.style.overflow = 'hidden';
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  goTo(0);
}

/* ── Boot ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbarScroll();
  initHamburgerMenu();
  initSmoothScroll();

  const starsCanvas = document.getElementById('stars-canvas');
  if (starsCanvas) initStars('stars-canvas');

  const bubblesContainer = document.getElementById('bubbles-container');
  if (bubblesContainer) initBubbles('bubbles-container');

  const petalsContainer = document.getElementById('petals-container');
  if (petalsContainer) initPetals('petals-container');

  const cloudsContainer = document.getElementById('clouds-container');
  if (cloudsContainer) initClouds('clouds-container');

  document.querySelectorAll('[data-counter]').forEach((el) => {
    if (!el.id) return;
    const target = parseInt(el.dataset.counter, 10);
    const duration = parseInt(el.dataset.duration, 10) || 2000;
    if (!Number.isNaN(target)) animateCounter(el.id, target, duration);
  });

  document.querySelectorAll('.accordion, .accordion-cursos').forEach((root) => initAccordion(root));

  document.querySelectorAll('.tabs, .tabs-formacion').forEach((root) => initTabs(root));

  const carousel = document.querySelector('.carousel');
  if (carousel) initCarousel('.carousel');
});
