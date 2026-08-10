/**
 * QUANTUM OPS ELITE — ANIMATIONS & INTERACTION CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Navbar Scroll Transformation
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    // Navbar blur background toggle
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Simulated Hero Dashboard Live Data Fluctuation
  if (!prefersReducedMotion) {
    const revEl = document.getElementById('hero-rev');
    const chartBars = document.querySelectorAll('.bars-container .chart-bar');

    setInterval(() => {
      if (revEl) {
        const base = 128450;
        const randomDelta = Math.floor(Math.random() * 400) - 200;
        const updated = base + randomDelta;
        revEl.textContent = `$${updated.toLocaleString('en-US')}.00`;
      }

      chartBars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 55) + 35;
        bar.style.setProperty('--height', `${randomHeight}%`);
      });
    }, 3500);
  }

  // 3. FAQ Accordion Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
});
