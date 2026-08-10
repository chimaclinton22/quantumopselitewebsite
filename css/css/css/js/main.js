/* ==========================================================================
   QUANTUM OPS ELITE — INTERACTIVE SUPABASE JS ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DYNAMIC YEARS & COPYRIGHT AUTO-UPDATE
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. MOBILE DRAWER NAVIGATION TOGGLE
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ------------------------------------------------------------------------
  // 3. SCROLL PROGRESS BAR & NAVBAR BLUR ON SCROLL
  // ------------------------------------------------------------------------
  const progressBar = document.getElementById('scrollProgressBar');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    // Progress Bar Calculation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Navbar Backdrop Adjustments
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 7, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      } else {
        navbar.style.background = 'rgba(7, 7, 15, 0.75)';
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // ------------------------------------------------------------------------
  // 4. LIVE HERO DASHBOARD INTERACTIVE ANIMATION
  // ------------------------------------------------------------------------
  const metricValues = document.querySelectorAll('.dash-value');
  
  // Subtle pulse animation on interactive metric refresh
  const triggerMetricPulse = () => {
    metricValues.forEach(el => {
      el.style.transition = 'color 0.3s ease';
      el.style.color = 'var(--accent-glow)';
      setTimeout(() => {
        el.style.color = '#FFF';
      }, 400);
    });
  };

  // Pulse metrics periodically for live-system feel
  setInterval(triggerMetricPulse, 8000);

  // ------------------------------------------------------------------------
  // 5. SUPABASE PROJECT INTAKE FORM SUBMISSION
  // ------------------------------------------------------------------------
  const intakeForm = document.getElementById('projectIntakeForm');
  const formStatus = document.getElementById('formStatusMessage');

  if (intakeForm) {
    intakeForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = intakeForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing Request...</span>';
      }

      if (formStatus) {
        formStatus.style.display = 'none';
        formStatus.className = '';
      }

      // Collect Form Data
      const formData = {
        full_name: document.getElementById('fullName')?.value || '',
        email: document.getElementById('emailAddress')?.value || '',
        phone: document.getElementById('phoneNumber')?.value || '',
        project_type: document.getElementById('projectType')?.value || '',
        estimated_budget: document.getElementById('estimatedBudget')?.value || '',
        project_details: document.getElementById('projectDetails')?.value || '',
        submitted_at: new Date().toISOString()
      };

      try {
        // Direct integration with Supabase client (configured in index.html)
        if (typeof window.supabaseClient !== 'undefined') {
          const { data, error } = await window.supabaseClient
            .from('project_leads')
            .insert([formData]);

          if (error) throw error;

          if (formStatus) {
            formStatus.className = 'status-box status-success';
            formStatus.textContent = '🚀 Inquiry Received! Our engineering team will contact you within 24 hours.';
            formStatus.style.display = 'block';
          }

          intakeForm.reset();
        } else {
          // Fallback if Supabase credentials are missing/pending configuration
          console.warn('Supabase client not initialized. Local mock response triggered.');
          
          if (formStatus) {
            formStatus.className = 'status-box status-success';
            formStatus.textContent = '🚀 Request logged locally. Connect your Supabase credentials in index.html to receive direct leads!';
            formStatus.style.display = 'block';
          }
          intakeForm.reset();
        }
      } catch (err) {
        console.error('Supabase Submission Error:', err);
        if (formStatus) {
          formStatus.className = 'status-box status-error';
          formStatus.textContent = '❌ Submission error. Please verify your connection or contact us directly via WhatsApp.';
          formStatus.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});
