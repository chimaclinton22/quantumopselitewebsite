/**
 * QUANTUM OPS ELITE — MAIN CONTROLLER & DYNAMIC DATA LOADER
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Mobile Menu Drawer Toggles
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => mobileDrawer.classList.remove('active'));
    });
  }

  // 2. Interactive Live Demo Modal Toggles & Tab Switching
  const demoModal = document.getElementById('demo-modal');
  const openDemoBtns = [
    document.getElementById('open-demo-btn'),
    document.getElementById('drawer-demo-btn'),
    document.getElementById('flagship-demo-trigger')
  ];
  const closeDemoBtn = document.getElementById('demo-close-btn');
  const closeDemoBg = document.getElementById('demo-modal-close-bg');

  openDemoBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => demoModal.classList.add('active'));
    }
  });

  if (closeDemoBtn) closeDemoBtn.addEventListener('click', () => demoModal.classList.remove('active'));
  if (closeDemoBg) closeDemoBg.addEventListener('click', () => demoModal.classList.remove('active'));

  // Demo Modal Tabs
  const demoTabs = document.querySelectorAll('.demo-tab');
  const demoContents = document.querySelectorAll('.demo-tab-content');

  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      demoTabs.forEach(t => t.classList.remove('active'));
      demoContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // POS Checkout Simulator
  const posBtn = document.getElementById('demo-pos-checkout');
  if (posBtn) {
    posBtn.addEventListener('click', () => {
      const itemSelect = document.getElementById('demo-pos-item');
      const qtyInput = document.getElementById('demo-pos-qty');
      const price = parseFloat(itemSelect.value);
      const qty = parseInt(qtyInput.value) || 1;
      const total = price * qty;
      const itemName = itemSelect.options[itemSelect.selectedIndex].text.split(' - ')[0];

      const receipt = document.getElementById('receipt-details');
      receipt.innerHTML = `
        <strong>Item:</strong> ${itemName}<br>
        <strong>Quantity:</strong> ${qty}<br>
        <strong>Total Amount:</strong> <span class="text-success">$${total.toFixed(2)}</span><br>
        <span class="badge badge-success" style="margin-top:8px; display:inline-block;">Transaction Complete</span>
      `;
    });
  }

  // 3. Dynamic Content Rendering with Fallbacks
  loadPortfolio();
  loadAcademy();
  loadTestimonials();
});

// Render Portfolio
async function loadPortfolio() {
  const container = document.getElementById('portfolio-container');
  if (!container) return;

  const data = await fetchPortfolioProjects();
  
  if (data && data.length > 0) {
    container.innerHTML = data.map(project => `
      <div class="portfolio-card glass-card">
        <span class="portfolio-cat">${project.category || 'System Concept'}</span>
        <h3>${project.title}</h3>
        <p>${project.description || ''}</p>
        <a href="${project.demo_url || '#'}" class="btn btn-secondary btn-sm" style="margin-top:auto; width:fit-content;">View Case Study</a>
      </div>
    `).join('');
  } else {
    // Fallback Showcase Items
    container.innerHTML = `
      <div class="portfolio-card glass-card">
        <span class="portfolio-cat">FLAGSHIP PRODUCT</span>
        <h3>Quantum OPS Business Tracker</h3>
        <p>Real inventory, sales POS, and net profit audit engine built with zero-dependency architecture.</p>
        <button onclick="document.getElementById('demo-modal').classList.add('active')" class="btn btn-secondary btn-sm" style="margin-top:auto; width:fit-content;">Launch Interactive Demo</button>
      </div>
      <div class="portfolio-card glass-card">
        <span class="portfolio-cat">E-COMMERCE CONCEPT</span>
        <h3>Next-Gen High-Speed Digital Store</h3>
        <p>Modern store architecture optimized for under 500ms global page loads and instant conversion.</p>
        <a href="#request" class="btn btn-secondary btn-sm" style="margin-top:auto; width:fit-content;">Request Similar System</a>
      </div>
      <div class="portfolio-card glass-card">
        <span class="portfolio-cat">ANALYTICS DASHBOARD</span>
        <h3>Corporate Intelligence Telemetry</h3>
        <p>Real-time visualizer aggregating multi-location sales operations into unified dashboards.</p>
        <a href="#request" class="btn btn-secondary btn-sm" style="margin-top:auto; width:fit-content;">Request Similar System</a>
      </div>
    `;
  }
}

// Render Academy
async function loadAcademy() {
  const container = document.getElementById('academy-container');
  if (!container) return;

  const data = await fetchAcademyCourses();

  if (data && data.length > 0) {
    container.innerHTML = data.map(course => `
      <div class="academy-card glass-card">
        <span class="badge badge-warning" style="width:fit-content; margin-bottom:12px;">${course.level}</span>
        <h3>${course.title}</h3>
        <p>${course.description || ''}</p>
        <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; padding-top:16px;">
          <span style="font-size:1.2rem; font-weight:800; color:var(--purple-bright);">$${course.price}</span>
          <a href="#request" class="btn btn-primary btn-sm">Enroll Now</a>
        </div>
      </div>
    `).join('');
  } else {
    container.innerHTML = `
      <div class="academy-card glass-card">
        <span class="badge badge-warning" style="width:fit-content; margin-bottom:12px;">All Levels</span>
        <h3>Building Custom Business Systems</h3>
        <p>Learn how to architect, design, and deploy vanilla web platforms connected directly to database backends.</p>
        <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; padding-top:16px;">
          <span style="font-size:1.2rem; font-weight:800; color:var(--purple-bright);">$199.00</span>
          <a href="#request" class="btn btn-primary btn-sm">Enroll Now</a>
        </div>
      </div>
      <div class="academy-card glass-card">
        <span class="badge badge-warning" style="width:fit-content; margin-bottom:12px;">Intermediate</span>
        <h3>Supabase Real-Time Architecture</h3>
        <p>Master Row Level Security, live table listeners, and database design for modern web applications.</p>
        <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; padding-top:16px;">
          <span style="font-size:1.2rem; font-weight:800; color:var(--purple-bright);">$149.00</span>
          <a href="#request" class="btn btn-primary btn-sm">Enroll Now</a>
        </div>
      </div>
    `;
  }
}

// Render Testimonials
async function loadTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  const data = await fetchTestimonials();

  if (data && data.length > 0) {
    container.innerHTML = data.map(t => `
      <div class="glass-card">
        <p style="font-style:italic; margin-bottom:16px;">"${t.message}"</p>
        <strong>${t.name}</strong><br>
        <span class="text-muted" style="font-size:0.85rem;">${t.role || ''} ${t.company ? 'at ' + t.company : ''}</span>
      </div>
    `).join('');
  } else {
    container.innerHTML = `
      <div class="glass-card">
        <p style="font-style:italic; margin-bottom:16px;">"The custom business tracker transformed how we audit stock across our store locations. We immediately identified inventory leakage."</p>
        <strong>Operations Director</strong><br>
        <span class="text-muted" style="font-size:0.85rem;">Retail Operations</span>
      </div>
      <div class="glass-card">
        <p style="font-style:italic; margin-bottom:16px;">"Ultra-fast website, no framework bloat. Our client conversion rates increased significantly within weeks of launching."</p>
        <strong>Founder</strong><br>
        <span class="text-muted" style="font-size:0.85rem;">Enterprise Logistics</span>
      </div>
    `;
  }
}
