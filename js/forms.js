/* =====================================================
   QUANTUM OPS ELITE — FORMS HANDLING
   ===================================================== */

function initProjectRequestForm() {
  const form = document.getElementById('project-request-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!statusEl || !submitBtn) return;

    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name || !email) {
      showStatus(statusEl, 'Please fill in your name and email.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(statusEl, 'Please enter a valid email address.', 'error');
      return;
    }

    // Disable button
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const formData = {
        name: form.name.value.trim(),
        business_name: form.business_name?.value.trim() || '',
        email: form.email.value.trim(),
        phone: form.phone?.value.trim() || '',
        business_type: form.business_type?.value || '',
        project_type: form.project_type?.value.trim() || '',
        budget: form.budget?.value || '',
        timeline: form.timeline?.value || '',
        message: form.message?.value.trim() || ''
      };

      await window.QuantumSupabase.submitProjectRequest(formData);

      showStatus(statusEl, 'Thank you! Your project request has been received. We will contact you shortly.', 'success');
      form.reset();
    } catch (err) {
      console.error('Project request error:', err);
      showStatus(statusEl, 'Something went wrong. Please try again or contact us via WhatsApp.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = `form-status ${type}`;
  el.style.display = 'block';

  // Auto-hide success after 8s
  if (type === 'success') {
    setTimeout(() => {
      el.style.display = 'none';
    }, 8000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initForms() {
  initProjectRequestForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}

window.QuantumForms = { init: initForms };
