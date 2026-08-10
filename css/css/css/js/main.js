/* ==========================================================================
   QUANTUM OPS ELITE — CORE ENGINE & SUPABASE DB INTEGRATION
   ========================================================================== */

// 1. SUPABASE CLIENT INITIALIZATION
// Replace with your actual Supabase URL and Anon Key when ready
const SUPABASE_URL = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollTrackers();
  initMobileNavigation();
  initInteractiveDashboard();
  initProjectIntakeForm();
});

/* --------------------------------------------------------------------------
   2. SCROLL PROGRESS BAR & NAVBAR BLUR
   -------------------------------------------------------------------------- */
function initScrollTrackers() {
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (progressBar && totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 7, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        navbar.style.background = 'rgba(7, 7, 15, 0.75)';
        navbar.style.boxShadow = 'none';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   3. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const openMenuBtn = document.getElementById('openMobileMenu');
  const closeMenuBtn = document.getElementById('closeMobileMenu');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!drawer) return;

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   4. HERO DASHBOARD INTERACTIVE ANIMATION & DATA SIMULATION
   -------------------------------------------------------------------------- */
function initInteractiveDashboard() {
  const chartBars = document.querySelectorAll('.chart-bars .bar');
  const revVal = document.getElementById('hero-live-rev');
  const stockVal = document.getElementById('hero-live-stock');

  if (!chartBars.length) return;

  chartBars.forEach((bar, index) => {
    bar.style.cursor = 'pointer';
    bar.addEventListener('click', () => {
      chartBars.forEach(b => b.classList.remove('active'));
      bar.classList.add('active');

      // Dynamic calculation mapped to HTML elements
      const simulatedRevenue = (184500 + (index * 15200)).toLocaleString();
      const simulatedStock = 1420 - (index * 42);

      if (revVal) revVal.textContent = `₦${simulatedRevenue}`;
      if (stockVal) stockVal.textContent = `${simulatedStock.toLocaleString()}`;
    });
  });
}

/* --------------------------------------------------------------------------
   5. SUPABASE PROJECT INTAKE FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initProjectIntakeForm() {
  const intakeForm = document.getElementById('projectIntakeForm');
  const alertContainer = document.getElementById('formAlertContainer');
  const submitBtn = document.getElementById('submitBtn');

  if (!intakeForm) return;

  intakeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const businessName = document.getElementById('businessName')?.value.trim() || '';
    const phoneWhatsapp = document.getElementById('phoneWhatsapp')?.value.trim() || '';
    const systemType = document.getElementById('systemType')?.value || '';
    const projectDetails = document.getElementById('projectDetails')?.value.trim() || '';

    if (!fullName || !businessName || !phoneWhatsapp || !systemType || !projectDetails) {
      showAlert('Please fill out all required form fields.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting Request...</span>';
    }

    try {
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('lead_submissions')
          .insert([
            {
              full_name: fullName,
              business_name: businessName,
              phone_whatsapp: phoneWhatsapp,
              system_type: systemType,
              project_details: projectDetails,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;
      } else {
        // Fallback simulation when Supabase credentials are pending
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      showAlert('🚀 Request registered! Our engineering team will reach out on WhatsApp within 24 hours.', 'success');
      intakeForm.reset();

    } catch (err) {
      console.error('Submission error:', err);
      showAlert('❌ Submission failed. Please tap the WhatsApp button below to message us directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Project Request Direct to Supabase</span>';
      }
    }
  });

  function showAlert(message, type) {
    if (!alertContainer) return;
    
    alertContainer.innerHTML = `<div class="status-alert ${type}">${message}</div>`;
    alertContainer.style.marginBottom = '1.5rem';

    const alertBox = alertContainer.querySelector('.status-alert');
    if (alertBox) {
      alertBox.style.padding = '1rem';
      alertBox.style.borderRadius = '10px';
      alertBox.style.fontSize = '0.9rem';
      alertBox.style.fontWeight = '600';

      if (type === 'success') {
        alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
        alertBox.style.border = '1px solid #10B981';
        alertBox.style.color = '#10B981';
      } else {
        alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
        alertBox.style.border = '1px solid #EF4444';
        alertBox.style.color = '#EF4444';
      }
    }
  }
}
