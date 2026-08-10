/* =====================================================
   QUANTUM OPS ELITE — ANIMATIONS & INTERACTIONS
   ===================================================== */

/* ---------- Scroll Progress ---------- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Fade-up on Scroll ---------- */
function initFadeUp() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close others
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---------- Smooth Anchor Links ---------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Demo Modal ---------- */
function initDemoModal() {
  const openBtns = document.querySelectorAll('[data-open-demo]');
  const modal = document.querySelector('.demo-modal');
  const closeBtn = document.querySelector('.demo-close');
  if (!modal) return;

  const open = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Demo panel switching
  const navBtns = modal.querySelectorAll('.demo-nav-btn');
  const panels = modal.querySelectorAll('.demo-panel');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.panel;
      navBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = modal.querySelector(`[data-panel-content="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ---------- Animated Numbers (simple) ---------- */
function animateValue(el, start, end, duration) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = end.toLocaleString();
    return;
  }

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function initNumberAnimations() {
  const numbers = document.querySelectorAll('[data-animate-number]');
  if (!numbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseInt(el.dataset.animateNumber, 10);
        animateValue(el, 0, end, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(el => observer.observe(el));
}

/* ---------- Init All ---------- */
function initAnimations() {
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initFadeUp();
  initFAQ();
  initSmoothAnchors();
  initDemoModal();
  initNumberAnimations();
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

window.QuantumAnimations = { init: initAnimations };
